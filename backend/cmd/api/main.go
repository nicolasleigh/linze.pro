package main

import (
	"context"
	"expvar"
	"fmt"
	"os"
	"os/signal"
	"runtime"
	"strconv"
	"syscall"
	"time"

	"github.com/nicolasleigh/social/internal/auth"
	"github.com/nicolasleigh/social/internal/db"
	"github.com/nicolasleigh/social/internal/env"
	"github.com/nicolasleigh/social/internal/mailer"
	"github.com/nicolasleigh/social/internal/observability"
	"github.com/nicolasleigh/social/internal/ratelimiter"
	"github.com/nicolasleigh/social/internal/store"
	"github.com/nicolasleigh/social/internal/store/cache"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

const version = "1.1.0"

func main() {
	if err := run(); err != nil {
		// run 返回前已经执行了数据库、Redis、限流器、Telemetry 和 Logger 的 defer。
		// 这里仅负责设置非零退出码，不再使用会跳过 defer 的 logger.Fatal。
		fmt.Fprintf(os.Stderr, "api failed: %v\n", err)
		os.Exit(1)
	}
}

func run() error {
	rootCtx, stop := signal.NotifyContext(
		context.Background(),
		syscall.SIGINT,
		syscall.SIGTERM,
	)
	defer stop()

	var dsnEnv string
	if os.Getenv("APP_ENV") == "production" {
		dsnEnv = os.Getenv("CLOUD_DB_DSN")
	} else {
		dsnEnv = os.Getenv("DB_DSN")
	}

	cfg := config{
		addr:            env.GetString("ADDR", ":8080"),
		apiURL:          env.GetString("EXTERNAL_URL", "localhost:8080"),
		shutdownTimeout: getDuration("SHUTDOWN_TIMEOUT", 15*time.Second),
		frontendURL:     env.GetString("FRONTEND_URL", "http://localhost:4000"),
		db: dbConfig{
			// addr:         env.GetString("DB_ADDR", "postgres://admin:adminpassword@localhost:5432/social?sslmode=disable"),
			addr:         dsnEnv,
			maxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
			maxIdleConns: env.GetInt("DB_MAX_IDLE_CONNS", 30),
			maxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
		},
		env: env.GetString("APP_ENV", "development"),
		mail: mailConfig{
			exp:       time.Hour * 24 * 3, // 3 days
			fromEmail: env.GetString("FROM_EMAIL", ""),
			sendGrid: sendGridConfig{
				apiKey: env.GetString("SENDGRID_API_KEY", ""),
			},
		},
		auth: authConfig{
			basic: basicConfig{
				user: env.GetString("AUTH_BASIC_USER", "admin"),
				pass: env.GetString("AUTH_BASIC_PASS", "admin"),
			},
			token: tokenConfig{
				secret: env.GetString("AUTH_TOKEN_SECRET", "not-secret"),
				exp:    time.Hour * 24 * 3,
				iss:    "linze.pro",
			},
		},
		redisCfg: redisConfig{
			addr:    env.GetString("REDIS_ADDR", "localhost:6379"),
			pw:      env.GetString("REDIS_PW", ""),
			db:      env.GetInt("REDIS_DB", 0),
			enabled: env.GetBool("REDIS_ENABLED", false),
		},
		rateLimiter: ratelimiter.Config{
			RequestsPerTimeFrame: env.GetInt("RATE_LIMITER_REQUESTS_COUNT", 20),
			TimeFrame:            time.Second * 5,
			Enabled:              env.GetBool("RATE_LIMITER_ENABLED", true),
		},
		visitor: visitorConfig{
			secret: env.GetString("VISITOR_SECRET", env.GetString("AUTH_TOKEN_SECRET", "")),
		},
	}

	// Logger
	logger := zap.Must(zap.NewProduction()).Sugar()
	defer logger.Sync()
	if cfg.visitor.secret == "" {
		if cfg.env == "production" {
			return fmt.Errorf("VISITOR_SECRET must be configured in production")
		}
		cfg.visitor.secret = "development-only-visitor-secret"
	}

	// Database
	db, err := db.New(cfg.db.addr, cfg.db.maxOpenConns, cfg.db.maxIdleConns, cfg.db.maxIdleTime)
	if err != nil {
		return fmt.Errorf("initialize database: %w", err)
	}

	defer db.Close()
	logger.Info("database connection pool established!")
	metrics := observability.NewMetrics()
	metrics.RegisterDB(db)

	tracing, err := observability.SetupTracing(rootCtx, observability.TracingConfig{
		Enabled:        env.GetBool("OTEL_ENABLED", false),
		ServiceName:    env.GetString("OTEL_SERVICE_NAME", "linze-blog-api"),
		ServiceVersion: version,
		Environment:    cfg.env,
		Endpoint:       env.GetString("OTEL_EXPORTER_OTLP_ENDPOINT", ""),
		Insecure:       env.GetBool("OTEL_EXPORTER_OTLP_INSECURE", cfg.env != "production"),
		SampleRatio:    getTraceSampleRatio(env.GetString("OTEL_TRACES_SAMPLER_ARG", "0.05")),
	})
	if err != nil {
		return fmt.Errorf("initialize telemetry: %w", err)
	}
	defer func() {
		if err := tracing.Shutdown(context.Background()); err != nil {
			logger.Errorw("telemetry shutdown failed", "error", err)
		}
	}()

	// Cache - redis
	var rdb *redis.Client
	if cfg.redisCfg.enabled {
		rdb = cache.NewRedisClient(cfg.redisCfg.addr, cfg.redisCfg.pw, cfg.redisCfg.db)
		logger.Info("redis cache connection established")
		defer func() {
			if err := rdb.Close(); err != nil {
				logger.Errorw("redis connection close failed", "error", err)
			}
		}()
	}

	// Rate limiter
	rateLimiter := ratelimiter.NewFixedWindowLimiter(
		cfg.rateLimiter.RequestsPerTimeFrame,
		cfg.rateLimiter.TimeFrame,
	)
	defer rateLimiter.Close()

	store := store.NewStorage(db)
	cacheStorage := cache.NewRedisStorage(rdb)

	mailer := mailer.NewSendgrid(cfg.mail.sendGrid.apiKey, cfg.mail.fromEmail)

	jwtAuthenticator := auth.NewJWTAuthenticator(cfg.auth.token.secret, cfg.auth.token.iss, cfg.auth.token.iss)

	app := &application{
		config:        cfg,
		store:         store,
		cacheStorage:  cacheStorage,
		logger:        logger,
		mailer:        mailer,
		authenticator: jwtAuthenticator,
		rateLimiter:   rateLimiter,
		metrics:       metrics,
		tracing:       tracing,
	}

	// Metrics collected
	expvar.NewString("version").Set(version)
	expvar.Publish("database", expvar.Func(func() any {
		return db.Stats()
	}))
	expvar.Publish("goroutines", expvar.Func(func() any {
		return runtime.NumGoroutine()
	}))

	if err := app.run(rootCtx, app.mount()); err != nil {
		return fmt.Errorf("run HTTP server: %w", err)
	}
	return nil
}

func getDuration(key string, fallback time.Duration) time.Duration {
	value := env.GetString(key, "")
	if value == "" {
		return fallback
	}

	duration, err := time.ParseDuration(value)
	if err != nil || duration <= 0 {
		return fallback
	}
	return duration
}

func getTraceSampleRatio(value string) float64 {
	ratio, err := strconv.ParseFloat(value, 64)
	if err != nil || ratio <= 0 || ratio > 1 {
		return 0.05
	}
	return ratio
}
