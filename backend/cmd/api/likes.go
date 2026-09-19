package main

import (
	"errors"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nicolasleigh/social/internal/store"
)

// updatePostLike 用于旧版 Vue 博客兼容：自增文章点赞数 (POST /api/v1/like/post/{slug})
func (app *application) updatePostLike(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	likeNum, err := app.store.PostLikes.UpdateLike(r.Context(), slug)
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

// getPostLike 用于旧版 Vue 博客兼容：获取文章点赞数 (GET /api/v1/like/post/{slug})
func (app *application) getPostLike(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	likeNum, err := app.store.PostLikes.GetLike(r.Context(), slug)
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

// updatePostView 用于旧版 Vue 博客兼容：自增文章浏览量 (GET /api/v1/view/post/{slug})
func (app *application) updatePostView(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	viewNum, err := app.store.PostLikes.UpdateView(r.Context(), slug)
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
