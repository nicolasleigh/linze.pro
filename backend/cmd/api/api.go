package main

import (
	"context"
	"errors"
	"expvar"
	"fmt"
	"net"
	"net/http"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/nicolasleigh/social/docs" // This is required to generate swagger docs
	"github.com/nicolasleigh/social/internal/auth"
	"github.com/nicolasleigh/social/internal/env"
	"github.com/nicolasleigh/social/internal/mailer"
	"github.com/nicolasleigh/social/internal/observability"
	"github.com/nicolasleigh/social/internal/ratelimiter"
	"github.com/nicolasleigh/social/internal/store"
	"github.com/nicolasleigh/social/internal/store/cache"
	httpSwagger "github.com/swaggo/http-swagger/v2"
	"go.uber.org/zap"
)

type application struct {
	config        config
	store         store.Storage
	cacheStorage  cache.Storage
	logger        *zap.SugaredLogger
	mailer        mailer.Client
	authenticator auth.Authenticator
	rateLimiter   ratelimiter.Limiter
	metrics       *observability.Metrics
	tracing       *observability.Tracing
	ready         atomic.Bool
}

type config struct {
	addr            string
	db              dbConfig
	env             string
	apiURL          string
	shutdownTimeout time.Duration
	mail            mailConfig
	frontendURL     string
	auth            authConfig
	redisCfg        redisConfig
	rateLimiter     ratelimiter.Config
	visitor         visitorConfig
}

type visitorConfig struct {
	secret string
}

type authConfig struct {
	basic basicConfig
	token tokenConfig
}

type basicConfig struct {
	user string
	pass string
}

type tokenConfig struct {
	secret string
	exp    time.Duration
	iss    string
}

type mailConfig struct {
	exp       time.Duration
	sendGrid  sendGridConfig
	fromEmail string
}

type sendGridConfig struct {
	apiKey string
}

type dbConfig struct {
	addr         string
	maxOpenConns int
	maxIdleConns int
	maxIdleTime  string
}

type redisConfig struct {
	addr    string
	pw      string
	db      int
	enabled bool
}

func (app *application) mount() http.Handler {
	router := chi.NewRouter()

	// A good base middleware stack
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	// Basic CORS for more ideas, see: https://developer.github.com/v3/#cross-origin-resource-sharing
	allowedOrigins := []string{
		"https://linze.pro",
		"https://*.linze.pro",
		"http://localhost:*",
		"http://127.0.0.1:*",
	}
	if envOrigin := env.GetString("CORS_ALLOWED_ORIGIN", ""); envOrigin != "" {
		for _, o := range strings.Split(envOrigin, ",") {
			if trimmed := strings.TrimSpace(o); trimmed != "" {
				allowedOrigins = append(allowedOrigins, trimmed)
			}
		}
	}

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	router.Use(app.RateLimiterMiddleware)

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	router.Use(middleware.Timeout(60 * time.Second))

	metrics := app.metrics
	if metrics == nil {
		metrics = observability.NewMetrics()
		app.metrics = metrics
	}
	// Prometheus scrapes this endpoint over the private Docker network. The
	// production compose file binds the API port to localhost, so it is not
	// exposed through the public Caddy routes.
	router.Get("/metrics", metrics.Handler().ServeHTTP)

	router.Route("/api/v1", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Get("/health", app.healthCheckHandler)
			r.Get("/ready", app.readinessCheckHandler)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.BasicAuthMiddleware())
			r.Get("/debug/vars", expvar.Handler().ServeHTTP)
		})
		r.Group(func(r chi.Router) {
			docsURL := fmt.Sprintf("%s/swagger/doc.json", app.config.addr)
			r.Get("/swagger/*", httpSwagger.Handler(httpSwagger.URL(docsURL)))
		})
		r.Group(func(r chi.Router) {
			r.Route("/posts", func(r chi.Router) {
				r.Use(app.AuthTokenMiddleware)
				r.Post("/", app.checkPostOwnership("admin", app.createPostHandler))
			})
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			// 确保权限校验优先于文件解析。如果是非管理员发起请求，会在 checkPostOwnership 阶段直接被拒绝，
			// 避免未经授权的请求提前触发图片解析与 Cloudinary 上传，节省带宽与服务器资源
			uploadHandler := app.UploadImageMiddleware(http.HandlerFunc(app.uploadImage))
			r.Post("/upload-image", app.checkPostOwnership("admin", uploadHandler.ServeHTTP))
		})
		r.Group(func(r chi.Router) {
			r.Get("/images", app.getAllImages)
		})
		r.Group(func(r chi.Router) {
			r.Get("/posts", app.getAllPostsHandler)
			r.Get("/posts/tag", app.getPostByTag)
			r.Get("/posts/tags", app.getAllTags)
			r.Get("/posts/{slug}/localized", app.getLocalizedPost)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			r.Post("/posts/import", app.checkPostOwnership("admin", app.publishMarkdownTranslation))
			r.Put("/posts/{slug}/translations/{locale}", app.checkPostOwnership("admin", app.updateMarkdownTranslation))
			r.Get("/posts/{slug}/translations", app.checkPostOwnership("admin", app.getAllPostTranslations))
			r.Get("/posts/{slug}/translations/{locale}/revisions", app.checkPostOwnership("admin", app.getPostTranslationRevisions))
		})
		r.Group(func(r chi.Router) {
			r.Use(app.postContextMiddleware)
			r.Get("/post/{slug}", app.getPostHandler)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			r.Get("/post-all/{slug}", app.checkPostOwnership("admin", app.getPostForUpdate))
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			// r.Use(app.postContextMiddleware)
			r.Patch("/post/{slug}", app.checkPostOwnership("admin", app.updatePostHandler))
			// r.Delete("/post/{slug}", app.checkPostOwnership("admin", app.deletePostHandler))
		})
		r.Group(func(r chi.Router) {
			r.Put("/users/activate/{token}", app.activateUserHandler)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			r.Get("/users/{userID}", app.getUserHandler)
			r.Put("/users/{userID}/follow", app.followUserHandler)
			r.Put("/users/{userID}/unfollow", app.unfollowUserHandler)
			// r.Get("/users/feed", app.getUserFeedHandler)
		})
		r.Group(func(r chi.Router) {
			r.Post("/auth/user", app.registerUserHandler)
			r.Post("/auth/token", app.createTokenHandler)
		})
		r.Group(func(r chi.Router) {
			// 旧版 Vue 博客（vue.linze.pro）兼容路由：
			// 旧版前端在文章详情页阅读或点赞时依赖 GET /view/post/{slug}、GET /like/post/{slug} 与 POST /like/post/{slug}。
			// 新版 Next.js 博客已升级至基于访客指纹和防刷限流的新接口（/posts/{slug}/engagement/*），
			// 保留此组旧路由以确保旧版 Vue 博客部署在二级域名下时，文章浏览量自增与点赞功能正常运行，避免 404。
			r.Get("/like/post/{slug}", app.getPostLike)
			r.Post("/like/post/{slug}", app.updatePostLike)
			r.Get("/view/post/{slug}", app.updatePostView)
			r.Post("/like/project/{slug}", app.updateProjectLike)
			r.Get("/like/project/{slug}", app.getProjectLike)
			r.Get("/view/project/{slug}", app.updateProjectView)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.VisitorIdentityMiddleware)
			r.Use(app.SameOriginWriteMiddleware)
			r.Use(app.EngagementRateLimitMiddleware)
			r.Get("/posts/{slug}/engagement", app.getPostEngagement)
			r.Put("/posts/{slug}/engagement/like", app.likePost)
			r.Post("/posts/{slug}/engagement/view", app.recordPostView)
		})
	})

	// Metrics wrap the complete router so rejected requests (for example 401,
	// 403 and 429 responses from middleware) are included in the measurements.
	handler := metrics.HTTPMiddleware(observability.RoutePattern, router)
	return observability.HTTPMiddleware(observability.RoutePattern, handler)
}

// run 启动 HTTP 服务器并统一协调监听生命周期与优雅停机（Graceful Shutdown）。
// - rootCtx: 根级上下文（通常关联操作系统 SIGINT/SIGTERM 信号），当收到停机信号时取消。
// - mux: 包含全量路由与中间件链路的 HTTP 处理器。
func (app *application) run(rootCtx context.Context, mux http.Handler) error {
	docs.SwaggerInfo.Version = version
	docs.SwaggerInfo.Host = app.config.apiURL
	docs.SwaggerInfo.BasePath = "/api/v1"
	srv := http.Server{
		Addr:              app.config.addr,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
		WriteTimeout:      time.Second * 30,
		ReadTimeout:       time.Second * 10,
		IdleTimeout:       time.Minute,
		MaxHeaderBytes:    1 << 20, // 1 MiB
	}

	listener, err := net.Listen("tcp", srv.Addr)
	if err != nil {
		return err
	}

	// 只有端口成功绑定后才报告 ready，避免启动失败时短暂返回 200。
	app.ready.Store(true)

	// serveErr 用于接收 Server.Serve 的退出错误（容量为 1 避免协程阻塞）
	serveErr := make(chan error, 1)
	// serveWG 显式追踪服务监听协程的生命周期，保证停机退出时该协程已被妥善回收
	var serveWG sync.WaitGroup
	serveWG.Add(1)

	// 异步启动 HTTP 服务监听
	go func() {
		defer serveWG.Done()
		serveErr <- srv.Serve(listener)
	}()

	app.logger.Infow("server has started", "addr", app.config.addr, "env", app.config.env)

	// 通过 select 多路复用统一协调两类事件：
	// 1. 服务自身意外崩溃或启动失败（如端口被占用）
	// 2. 收到操作系统终止信号进行优雅停机
	select {
	case err := <-serveErr:
		// 分支 1：服务启动即失败（如端口占用）或运行时突发异常
		// 此时等待服务协程退出后立即返回错误，避免遗留悬挂的信号监听协程导致泄漏
		serveWG.Wait()
		if !errors.Is(err, http.ErrServerClosed) {
			return err
		}
	case <-rootCtx.Done():
		// 分支 2：捕获到系统的终止信号（SIGINT/SIGTERM），开始执行优雅停机
		// 先进入 draining 状态，让上游负载均衡器停止发送新流量。
		app.ready.Store(false)
		app.logger.Infow(
			"shutdown signal caught",
			"signal", "SIGINT/SIGTERM",
			"reason", rootCtx.Err(),
		)

		// 给正在处理中的存量请求预留可配置的退出窗口。
		shutdownTimeout := app.config.shutdownTimeout
		if shutdownTimeout <= 0 {
			shutdownTimeout = 15 * time.Second
		}
		ctx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
		shutdownErr := srv.Shutdown(ctx)
		cancel()

		// 等待后台 ListenAndServe 协程彻底完成退出，确保底层 socket 与端口已完全释放
		serveWG.Wait()
		if shutdownErr != nil {
			return shutdownErr
		}

		// 检查 ListenAndServe 返回的最终错误；若非预期的 ErrServerClosed（正常停机标志），则向上层传播真实错误
		if err := <-serveErr; err != nil && !errors.Is(err, http.ErrServerClosed) {
			return err
		}
	}

	app.logger.Infow("server has stopped", "addr", app.config.addr, "env", app.config.env)
	return nil
}
