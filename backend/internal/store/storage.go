package store

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

var (
	ErrNotFound          = errors.New("resource not found")
	QueryTimeoutDuration = time.Second * 5
	ErrConflict          = errors.New("resource already exists")
	ErrVersionConflict   = errors.New("resource was modified by another request")
	ErrEmailOrPassError  = errors.New("password is incorrect")
)

type Storage struct {
	Posts interface {
		Create(context.Context, *Post) error
		// GetByID(context.Context, int64) (*Post, error)
		GetBySlug(ctx context.Context, slug, lang string) (*Post, error)
		Delete(context.Context, string) error
		Update(context.Context, *Post) error
		// GetUserFeed(context.Context, int64, PaginatedFeedQuery) ([]PostWithMetadata, error)
		GetAll(context.Context, int, int) (*[]Post, error)
		GetAllLang(context.Context, string) (*Post, error)
		GetTags(context.Context) (string, error)
		GetByTag(context.Context, int, int, string) (*[]Post, error)
	}
	PostTranslations interface {
		Publish(context.Context, *TranslationDraft) (*PostTranslation, error)
		Update(context.Context, *TranslationDraft) (*PostTranslation, error)
		GetLocalized(context.Context, string, string) (*LocalizedPost, error)
		GetAll(context.Context, string) ([]PostTranslation, error)
		GetRevisions(context.Context, string, string) ([]PostTranslationRevision, error)
	}
	Users interface {
		Create(context.Context, *sql.Tx, *User) error
		GetByID(context.Context, int64) (*User, error)
		CreateAndInvite(ctx context.Context, user *User, token string, exp time.Duration) error
		Activate(context.Context, string) error
		Delete(context.Context, int64) error
		GetByEmail(context.Context, string, string) (*User, error)
	}
	Comments interface {
		Create(context.Context, *Comment) error
		GetByPostID(context.Context, int64) ([]Comment, error)
	}
	Followers interface {
		Follow(ctx context.Context, followerID, userID int64) error
		Unfollow(ctx context.Context, followerID, userID int64) error
	}
	Roles interface {
		GetByName(context.Context, string) (*Role, error)
	}
	PostLikes interface {
		UpdateLike(context.Context, string) (int, error)
		GetLike(context.Context, string) (int, error)
		UpdateView(context.Context, string) (int, error)
	}
	PostEngagements interface {
		Get(context.Context, string, string) (*PostEngagement, error)
		Like(context.Context, string, string) (*PostEngagement, bool, error)
		RecordView(context.Context, string, string, time.Time) (*PostEngagement, bool, error)
	}
	ProjectLikes interface {
		UpdateLike(context.Context, string) (int, error)
		GetLike(context.Context, string) (int, error)
		UpdateView(context.Context, string) (int, error)
	}
	Images interface {
		Create(context.Context, string) error
		Get(context.Context) ([]Image, error)
	}
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Posts:            &PostStore{db},
		PostTranslations: &PostTranslationStore{db},
		Users:            &UserStore{db},
		Comments:         &CommentStore{db},
		Followers:        &FollowerStore{db},
		Roles:            &RoleStore{db},
		PostLikes:        &PostLikeStore{db},
		PostEngagements:  &PostEngagementStore{db},
		ProjectLikes:     &ProjectLikeStore{db},
		Images:           &ImageStore{db},
	}
}

// Transaction wrapper
func withTx(db *sql.DB, ctx context.Context, fn func(*sql.Tx) error) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	if err := fn(tx); err != nil {
		_ = tx.Rollback()
		return err
	}

	return tx.Commit()
}
