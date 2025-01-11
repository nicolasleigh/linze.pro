package main

import (
	"net/http"
)

func (app *application) internalServerError(w http.ResponseWriter, r *http.Request, err error) {
	// log.Printf("internal server error: %s; path: %s; error: %s", r.Method, r.URL.Path, err)
	app.logger.Errorw("internal server error", "method", r.Method, "path", r.URL.Path, "error", err)

	writeJSONError(w, http.StatusInternalServerError, "the server encounter a problem")
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
