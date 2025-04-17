package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/nicolasleigh/social/internal/store"
)

type postKey string

const postCtx postKey = "post"

type CreatePostPayload struct {
	Title   string   `json:"title" validate:"required,max=100"`
	About   string   `json:"about" validate:"required,max=500"`
	Content string   `json:"content" validate:"required,max=5000"`
	Tags    []string `json:"tags" validate:"required"`
	Photo   string   `json:"photo" validate:"required"`
}

type UpdatePostPayload struct {
	Title   string   `json:"title" validate:"omitempty,max=100"`
	About   string   `json:"about" validate:"omitempty,max=500"`
	Content string   `json:"content" validate:"omitempty,max=5000"`
	Tags    []string `json:"tags" validate:"omitempty"`
	Photo   string   `json:"photo" validate:"omitempty"`
}

func (app *application) createPostHandler(w http.ResponseWriter, r *http.Request) {
	var payload CreatePostPayload
	var tags []string
	json.Unmarshal([]byte(r.FormValue("tags")), &tags)
	imageUrl := getImageUrlFromContext(r)
	user := getUserFromContext(r)
	payload.Title = r.FormValue("title")
	payload.About = r.FormValue("about")
	payload.Content = r.FormValue("content")
	payload.Tags = tags
	payload.Photo = imageUrl

	// fmt.Println("tags", tags)
	// fmt.Println("title", r.FormValue("title"))
	// fmt.Println("about", r.FormValue("about"))
	// fmt.Println("content", r.FormValue("content"))
	// fmt.Println("imageUrl", imageUrl)
	// fmt.Println("user", user)

	// if err := readJSON(w, r, &payload); err != nil {
	// 	app.badRequestError(w, r, err)
	// 	return
	// }

	if err := Validate.Struct(payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	post := &store.Post{
		Title:   payload.Title,
		About:   payload.About,
		Content: payload.Content,
		Tags:    payload.Tags,
		Photo:   payload.Photo,
		UserID:  user.ID,
	}

	ctx := r.Context()

	if err := app.store.Posts.Create(ctx, post); err != nil {
		app.internalServerError(w, r, err)
		return
	}

	if err := app.jsonResponse(w, http.StatusCreated, post); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) uploadImage(w http.ResponseWriter, r *http.Request) {
	imageUrl := getImageUrlFromContext(r)
	if err := app.jsonResponse(w, http.StatusOK, imageUrl); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) getPostHandler(w http.ResponseWriter, r *http.Request) {
	post := getPostFromCtx(r)

	comments, err := app.store.Comments.GetByPostID(r.Context(), post.ID)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	post.Comments = comments

	if err := app.jsonResponse(w, http.StatusOK, post); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) getAllPostsHandler(w http.ResponseWriter, r *http.Request) {
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	offset := (page - 1) * limit

	posts, err := app.store.Posts.GetAll(r.Context(), limit, offset)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, posts); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) getAllTags(w http.ResponseWriter, r *http.Request) {
	tag, err := app.store.Posts.GetTags(r.Context())
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, tag); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) getPostByTag(w http.ResponseWriter, r *http.Request) {
	tag := r.URL.Query().Get("tag")
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	offset := (page - 1) * limit

	posts, err := app.store.Posts.GetByTag(r.Context(),limit,offset,tag)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}


	if err := app.jsonResponse(w, http.StatusOK, posts); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) deletePostHandler(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "postID")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}
	ctx := r.Context()
	if err := app.store.Posts.Delete(ctx, id); err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (app *application) updatePostHandler(w http.ResponseWriter, r *http.Request) {
	post := getPostFromCtx(r)

	var payload UpdatePostPayload
	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	if err := Validate.Struct(payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	if payload.Title != "" {
		post.Title = payload.Title
	}

	if payload.Content != "" {
		post.Content = payload.Content
	}

	if err := app.store.Posts.Update(r.Context(), post); err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, post); err != nil {
		app.internalServerError(w, r, err)
	}
}

func (app *application) postContextMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "postID")
		fmt.Print(idParam)
		id, err := strconv.ParseInt(idParam, 10, 64)
		if err != nil {
			app.internalServerError(w, r, err)
			return
		}
		ctx := r.Context()
		post, err := app.store.Posts.GetByID(ctx, id)
		if err != nil {
			switch {
			case errors.Is(err, store.ErrNotFound):
				app.notFoundError(w, r, err)
			default:
				app.internalServerError(w, r, err)
			}
			return
		}
		ctx = context.WithValue(ctx, postCtx, post)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func getPostFromCtx(r *http.Request) *store.Post {
	post := r.Context().Value(postCtx).(*store.Post)
	return post
}

func getImageUrlFromContext(r *http.Request) string {
	imageUrl := r.Context().Value(imageUrlCtx).(string)
	return imageUrl
}
