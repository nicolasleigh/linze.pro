package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/nicolasleigh/social/internal/store"
)

type postKey string

const postCtx postKey = "post"

type CreatePostPayload struct {
	Slug      string   `json:"slug" validate:"required,max=150"`
	TitleEn   string   `json:"titleEn" validate:"required,max=150"`
	AboutEn   string   `json:"aboutEn" validate:"max=500"`
	ContentEn string   `json:"contentEn" validate:"max=50000"`
	TitleZh   string   `json:"titleZh" validate:"max=150"`
	AboutZh   string   `json:"aboutZh" validate:"max=500"`
	ContentZh string   `json:"contentZh" validate:"max=50000"`
	Tags      []string `json:"tags" validate:"required"`
	Photo     string   `json:"photo" validate:"required"`
}

type UpdatePostPayload struct {
	TitleEn   string   `json:"titleEn" validate:"omitempty,max=150"`
	AboutEn   string   `json:"aboutEn" validate:"omitempty,max=500"`
	ContentEn string   `json:"contentEn" validate:"omitempty,max=50000"`
	TitleZh   string   `json:"titleZh" validate:"omitempty,max=150"`
	AboutZh   string   `json:"aboutZh" validate:"omitempty,max=500"`
	ContentZh string   `json:"contentZh" validate:"omitempty,max=50000"`
	Tags      []string `json:"tags" validate:"omitempty"`
	Photo     string   `json:"photo" validate:"omitempty"`
}

func (app *application) createPostHandler(w http.ResponseWriter, r *http.Request) {
	var payload CreatePostPayload
	var tags []string
	json.Unmarshal([]byte(r.FormValue("tags")), &tags)
	imageUrl := getImageUrlFromContext(r)
	user := getUserFromContext(r)
	payload.Slug = r.FormValue("slug")
	payload.TitleEn = r.FormValue("titleEn")
	payload.AboutEn = r.FormValue("aboutEn")
	payload.ContentEn = r.FormValue("contentEn")
	payload.TitleZh = r.FormValue("titleZh")
	payload.AboutZh = r.FormValue("aboutZh")
	payload.ContentZh = r.FormValue("contentZh")
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
		Slug:      payload.Slug,
		TitleEn:   payload.TitleEn,
		AboutEn:   payload.AboutEn,
		ContentEn: payload.ContentEn,
		TitleZh:   payload.TitleZh,
		AboutZh:   payload.AboutZh,
		ContentZh: payload.ContentZh,
		Tags:      payload.Tags,
		Photo:     payload.Photo,
		UserID:    user.ID,
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

func (app *application) getPostForUpdate(w http.ResponseWriter, r *http.Request) {

	slug := chi.URLParam(r, "slug")

	ctx := r.Context()
	post, err := app.store.Posts.GetAllLang(ctx, slug)
	if err != nil {
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

	posts, err := app.store.Posts.GetByTag(r.Context(), limit, offset, tag)
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
	slug := chi.URLParam(r, "slug")
	// id, err := strconv.ParseInt(idParam, 10, 64)
	// if err != nil {
	// 	app.internalServerError(w, r, err)
	// 	return
	// }
	ctx := r.Context()
	if err := app.store.Posts.Delete(ctx, slug); err != nil {
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
	// post := getPostFromCtx(r)
	slug := chi.URLParam(r, "slug")

	ctx := r.Context()
	post, err := app.store.Posts.GetAllLang(ctx, slug)
	if err != nil {
		switch {
		case errors.Is(err, store.ErrNotFound):
			app.notFoundError(w, r, err)
		default:
			app.internalServerError(w, r, err)
		}
		return
	}

	var payload UpdatePostPayload
	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	if err := Validate.Struct(payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	if payload.TitleEn != "" {
		post.TitleEn = payload.TitleEn
	}
	if payload.TitleZh != "" {
		post.TitleZh = payload.TitleZh
	}
	if payload.AboutEn != "" {
		post.AboutEn = payload.AboutEn
	}
	if payload.AboutZh != "" {
		post.AboutZh = payload.AboutZh
	}
	if payload.ContentEn != "" {
		post.ContentEn = payload.ContentEn
	}
	if payload.ContentZh != "" {
		post.ContentZh = payload.ContentZh
	}
	if len(payload.Tags) != 0 {
		post.Tags = payload.Tags
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
		slug := chi.URLParam(r, "slug")
		lang := r.URL.Query().Get("lang")

		ctx := r.Context()
		post, err := app.store.Posts.GetBySlug(ctx, slug, lang)
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
	post, ok := r.Context().Value(postCtx).(*store.Post)
	if ok {
		return post
	}
	return nil
}

func getImageUrlFromContext(r *http.Request) string {
	imageUrl := r.Context().Value(imageUrlCtx).(string)
	return imageUrl
}
