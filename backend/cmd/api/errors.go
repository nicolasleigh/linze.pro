package main

import (
	"net/http"
)

func (app *application) internalServerError(w http.ResponseWriter, r *http.Request, err error) {
	// log.Printf("internal server error: %s; path: %s; error: %s", r.Method, r.URL.Path, err)
	app.logger.Errorw("internal server error", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusInternalServerError, "the server encounter a problem")
}

func (app *application) forbiddenError(w http.ResponseWriter, r *http.Request) {
	app.logger.Warnw("forbidden", "method", r.Method, "path", r.URL.Path, "error")

	writeJSONError(w, http.StatusForbidden, "forbidden")
}

func (app *application) badRequestError(w http.ResponseWriter, r *http.Request, err error) {
	// log.Printf("bad request error: %s; path: %s; error: %s", r.Method, r.URL.Path, err)
	app.logger.Warnw("bad request", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusBadRequest, err.Error())
}

func (app *application) notFoundError(w http.ResponseWriter, r *http.Request, err error) {
	// log.Printf("not found error: %s; path: %s; error: %s", r.Method, r.URL.Path, err)
	app.logger.Warnw("not found error", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusNotFound, "not found")
}

func (app *application) conflictError(w http.ResponseWriter, r *http.Request, err error) {
	// log.Printf("conflict error: %s; path: %s; error: %s", r.Method, r.URL.Path, err)
	app.logger.Errorw("conflict error", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusConflict, err.Error())
}

func (app *application) unauthorizedError(w http.ResponseWriter, r *http.Request, err error) {
	app.logger.Warnw("unauthorized error", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusUnauthorized, "unauthorized")
}

func (app *application) emailOrPasswordError(w http.ResponseWriter, r *http.Request, err error) {
	app.logger.Warnw("unauthorized error", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusUnauthorized, "Email or password is incorrect")
}

func (app *application) unauthorizedBasicError(w http.ResponseWriter, r *http.Request, err error) {
	app.logger.Warnw("unauthorized basic error", "method", r.Method, "path", r.URL.Path, "error", err)
	w.Header().Set("WWW-Authenticate", `Basic realm="restricted", charset="UTF-8"`)

	writeJSONError(w, http.StatusUnauthorized, "unauthorized")
}

func (app *application) rateLimitExceededResponse(w http.ResponseWriter, r *http.Request, retryAfter string) {
	app.logger.Warnw("rate limit exceeded", "method", r.Method, "path", r.URL.Path)
	w.Header().Set("Retry-After", retryAfter)
	writeJSONError(w, http.StatusTooManyRequests, "rate limit exceeded, retry after: "+retryAfter)
}
