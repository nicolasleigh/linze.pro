package main

import (
	"context"
	"errors"
	"expvar"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/nicolasleigh/social/docs" // This is required to generate swagger docs
	"github.com/nicolasleigh/social/internal/auth"
	"github.com/nicolasleigh/social/internal/env"
	"github.com/nicolasleigh/social/internal/mailer"
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
}

type config struct {
	addr        string
	db          dbConfig
	env         string
	apiURL      string
	mail        mailConfig
	frontendURL string
	auth        authConfig
	redisCfg    redisConfig
	rateLimiter ratelimiter.Config
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
	router.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		// AllowedOrigins: []string{"https://*", "http://*"},
		AllowedOrigins: []string{env.GetString("CORS_ALLOWED_ORIGIN", "http://localhost:5173")},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
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

	router.Route("/api/v1", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Get("/health", app.healthCheckHandler)
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
				r.Use(app.UploadImageMiddleware)
				r.Use(app.AuthTokenMiddleware)
				r.Post("/", app.createPostHandler)
				r.Post("/image", app.uploadImage)
			})
			// r.Use(app.UploadImageMiddleware)
			// r.Use(app.AuthTokenMiddleware)
			// r.Post("/posts", app.createPostHandler)
			// r.Post("/posts/image", app.uploadImage)
		})
		r.Group(func(r chi.Router) {
			r.Get("/posts", app.getAllPostsHandler)
			r.Get("/posts/tag", app.getPostByTag)
			r.Get("/posts/tags", app.getAllTags)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.postContextMiddleware)
			r.Get("/post/{postID}", app.getPostHandler)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			r.Use(app.postContextMiddleware)
			r.Patch("/post/{postID}", app.checkPostOwnership("moderator", app.updatePostHandler))
			r.Delete("/post/{postID}", app.checkPostOwnership("admin", app.deletePostHandler))
		})
		r.Group(func(r chi.Router) {
			r.Put("/users/activate/{token}", app.activateUserHandler)
		})
		r.Group(func(r chi.Router) {
			r.Use(app.AuthTokenMiddleware)
			r.Get("/users/{userID}", app.getUserHandler)
			r.Put("/users/{userID}/follow", app.followUserHandler)
			r.Put("/users/{userID}/unfollow", app.unfollowUserHandler)
			r.Get("/users/feed", app.getUserFeedHandler)
		})
		r.Group(func(r chi.Router) {
			r.Post("/auth/user", app.registerUserHandler)
			r.Post("/auth/token", app.createTokenHandler)
		})
		r.Group(func(r chi.Router) {
			r.Post("/like/post/{postID}", app.updatePostLike)
			r.Get("/like/post/{postID}", app.getPostLike)
			r.Get("/view/post/{postID}", app.updatePostView)
		})
	})

	return router
}

func (app *application) run(mux http.Handler) error {
	docs.SwaggerInfo.Version = version
	docs.SwaggerInfo.Host = app.config.apiURL
	docs.SwaggerInfo.BasePath = "/v1"
	srv := http.Server{
		Addr:         app.config.addr,
		Handler:      mux,
		WriteTimeout: time.Second * 30,
		ReadTimeout:  time.Second * 10,
		IdleTimeout:  time.Minute,
	}

	shutdown := make(chan error)

	go func() {
		quit := make(chan os.Signal, 1)
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
		s := <-quit

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		app.logger.Infow("signal caught", "signal", s.String())

		shutdown <- srv.Shutdown(ctx)
	}()

	// log.Printf("server has started at %s", app.config.addr)
	app.logger.Infow("server has started", "addr", app.config.addr, "env", app.config.env)

	err := srv.ListenAndServe()
	if !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	err = <-shutdown
	if err != nil {
		return err
	}
	app.logger.Infow("server has stopped", "addr", app.config.addr, "env", app.config.env)
	return nil
}
