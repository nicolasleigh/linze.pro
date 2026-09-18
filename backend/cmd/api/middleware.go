package main

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v5"
	"github.com/nicolasleigh/social/internal/observability"
	"github.com/nicolasleigh/social/internal/store"
	"go.opentelemetry.io/otel/attribute"
)

type imageUrlKey string

const imageUrlCtx imageUrlKey = "imageUrl"

const maxImageUploadBytes int64 = 10 << 20

func (app *application) AuthTokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			app.unauthorizedError(w, r, fmt.Errorf("authorization header is missing"))
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			app.unauthorizedError(w, r, fmt.Errorf("authorization header is malformed"))
			return
		}

		token := parts[1]
		jwtToken, err := app.authenticator.ValidateToken(token)
		if err != nil {
			app.unauthorizedError(w, r, err)
			return
		}
		// fmt.Print("jwtToken",jwtToken)

		claims := jwtToken.Claims.(jwt.MapClaims)

		userID, err := strconv.ParseInt(fmt.Sprintf("%.f", claims["sub"]), 10, 64)
		if err != nil {
			app.unauthorizedError(w, r, err)
			return
		}
		// fmt.Print("userID:",userID)

		var ctx = r.Context()

		// user, err := app.store.Users.GetByID(ctx, userID)
		// if err != nil {
		// 	app.unauthorizedError(w, r, err)
		// 	return
		// }
		user, err := app.getUser(ctx, userID)
		if err != nil {
			app.unauthorizedError(w, r, err)
			return
		}
		ctx = context.WithValue(ctx, userCtx, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (app *application) BasicAuthMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// read the auth header
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				app.unauthorizedBasicError(w, r, fmt.Errorf("authorization header is missing"))
				return
			}

			// parse it -> get the base64
			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || parts[0] != "Basic" {
				app.unauthorizedBasicError(w, r, fmt.Errorf("authorization header is malformed"))
				return
			}

			// decode it
			decoded, err := base64.StdEncoding.DecodeString(parts[1])
			if err != nil {
				app.unauthorizedBasicError(w, r, err)
				return
			}

			// check the credentials
			username := app.config.auth.basic.user
			pass := app.config.auth.basic.pass
			creds := strings.SplitN(string(decoded), ":", 2)
			if len(creds) != 2 || creds[0] != username || creds[1] != pass {
				app.unauthorizedBasicError(w, r, fmt.Errorf("invalid credentials"))
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func (app *application) checkPostOwnership(requiredRole string, next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := getUserFromContext(r)
		post := getPostFromCtx(r)

		// if it is the owner's post
		if post != nil && post.UserID == user.ID {
			next.ServeHTTP(w, r)
			return
		}

		// role check
		allowed, err := app.checkRolePrecedence(r.Context(), user, requiredRole)
		if err != nil {
			app.internalServerError(w, r, err)
			return
		}

		if !allowed {
			app.forbiddenError(w, r)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (app *application) checkRolePrecedence(ctx context.Context, user *store.User, roleName string) (bool, error) {
	role, err := app.store.Roles.GetByName(ctx, roleName)
	if err != nil {
		return false, err
	}
	return user.Role.Level >= role.Level, nil
}

func (app *application) getUser(ctx context.Context, userID int64) (*store.User, error) {
	ctx, span := observability.StartSpan(ctx, "user.get")
	span.SetAttributes(attribute.Int64("user.id", userID))
	defer span.End()

	if !app.config.redisCfg.enabled {
		return app.store.Users.GetByID(ctx, userID)
	}

	cacheCtx, cacheSpan := observability.StartSpan(ctx, "redis.user_cache.get")
	user, err := app.cacheStorage.Users.Get(cacheCtx, userID)
	cacheSpan.End()
	if err != nil {
		return nil, err
	}
	if user != nil {
		app.logger.Infow("cache hit", "key", "user", "id", userID)
	}
	if user == nil {
		app.logger.Infow("fetching from DB", "id", userID)
		user, err = app.store.Users.GetByID(ctx, userID)
		if err != nil {
			return nil, err
		}

		cacheCtx, cacheSpan := observability.StartSpan(ctx, "redis.user_cache.set")
		if err := app.cacheStorage.Users.Set(cacheCtx, user); err != nil {
			cacheSpan.End()
			return nil, err
		}
		cacheSpan.End()
	}

	return user, nil
}

func (app *application) RateLimiterMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if app.config.rateLimiter.Enabled {
			if allow, retryAfter := app.rateLimiter.Allow(r.RemoteAddr); !allow {
				if app.metrics != nil {
					app.metrics.RateLimitRejected("global")
				}
				app.rateLimitExceededResponse(w, r, retryAfter.String())
				return
			}
		}

		next.ServeHTTP(w, r)
	})
}

func (app *application) UploadImageMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		r.Body = http.MaxBytesReader(w, r.Body, maxImageUploadBytes)

		var cld, err = cloudinary.NewFromURL(os.Getenv("CLOUDINARY_URL"))
		if err != nil {
			app.internalServerError(w, r, err)
			return
		}
		err = r.ParseMultipartForm(maxImageUploadBytes)
		if err != nil {
			app.badRequestError(w, r, err)
			return
		}
		file, _, err := r.FormFile("image")
		if err != nil {
			app.badRequestError(w, r, err)
			return
		}
		defer file.Close()

		header := make([]byte, 512)
		n, err := file.Read(header)
		if err != nil && !errors.Is(err, io.EOF) {
			app.badRequestError(w, r, err)
			return
		}
		if !strings.HasPrefix(http.DetectContentType(header[:n]), "image/") {
			app.badRequestError(w, r, fmt.Errorf("uploaded file must be an image"))
			return
		}
		if _, err := file.Seek(0, io.SeekStart); err != nil {
			app.internalServerError(w, r, err)
			return
		}

		var ctx = r.Context()
		uploadResult, err := cld.Upload.Upload(
			ctx,
			file,
			uploader.UploadParams{
				Folder: "blog-post",
			})
		if err != nil {
			app.internalServerError(w, r, err)
			return
		}

		ctx = context.WithValue(ctx, imageUrlCtx, uploadResult.SecureURL)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
