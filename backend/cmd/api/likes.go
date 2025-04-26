package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/nicolasleigh/social/internal/store"
)

func (app *application) updatePostLike(w http.ResponseWriter, r *http.Request) {
	postID, err := strconv.ParseInt(chi.URLParam(r, "postID"), 10, 64)
	if err != nil || postID < 1 {
		app.badRequestError(w, r, err)
		return
	}

	likeNum, err := app.store.PostLikes.UpdateLike(r.Context(), postID)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, likeNum); err != nil {
		app.internalServerError(w, r, err)
	}
}

func (app *application) getPostLike(w http.ResponseWriter, r *http.Request) {
	postID, err := strconv.ParseInt(chi.URLParam(r, "postID"), 10, 64)
	if err != nil || postID < 1 {
		app.badRequestError(w, r, err)
		return
	}

	likeNum, err := app.store.PostLikes.GetLike(r.Context(), postID)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, likeNum); err != nil {
		app.internalServerError(w, r, err)
	}
}

func (app *application) updatePostView(w http.ResponseWriter, r *http.Request) {
	postID, err := strconv.ParseInt(chi.URLParam(r, "postID"), 10, 64)
	if err != nil || postID < 1 {
		app.badRequestError(w, r, err)
		return
	}
	viewNum, err := app.store.PostLikes.UpdateView(r.Context(), postID)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, viewNum); err != nil {
		app.internalServerError(w, r, err)
	}
}

func (app *application) updateProjectLike(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	likeNum, err := app.store.ProjectLikes.UpdateLike(r.Context(), slug)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, likeNum); err != nil {
		app.internalServerError(w, r, err)
	}
}

func (app *application) getProjectLike(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	likeNum, err := app.store.ProjectLikes.GetLike(r.Context(), slug)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, likeNum); err != nil {
		app.internalServerError(w, r, err)
	}
}

func (app *application) updateProjectView(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	viewNum, err := app.store.ProjectLikes.UpdateView(r.Context(), slug)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, viewNum); err != nil {
		app.internalServerError(w, r, err)
	}
}
