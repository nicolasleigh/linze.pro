package cache

import (
	"context"
	"time"

	"github.com/nicolasleigh/social/internal/store"
	"github.com/redis/go-redis/v9"
)

type Storage struct {
	Users interface {
		Get(context.Context, int64) (*store.User, error)
		Set(context.Context, *store.User) error
	}
	Views interface {
		Seen(context.Context, string, string, string) (bool, error)
		MarkSeen(context.Context, string, string, string) error
	}
	RateLimits interface {
		Allow(context.Context, string, int64, time.Duration) (bool, error)
	}
}

func NewRedisStorage(rdb *redis.Client) Storage {
	return Storage{
		Users:      &UserStore{rdb: rdb},
		Views:      &ViewStore{rdb: rdb},
		RateLimits: &RateLimitStore{rdb: rdb},
	}
}
