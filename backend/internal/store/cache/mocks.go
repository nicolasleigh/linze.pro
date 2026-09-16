package cache

import (
	"context"
	"time"

	"github.com/nicolasleigh/social/internal/store"
)

func NewMockStore() Storage {
	return Storage{
		Users:      &MockUserStore{},
		Views:      &MockViewStore{},
		RateLimits: &MockRateLimitStore{},
	}
}

type MockRateLimitStore struct{}

func (m MockRateLimitStore) Allow(context.Context, string, int64, time.Duration) (bool, error) {
	return true, nil
}

type MockViewStore struct{}

func (m MockViewStore) Seen(context.Context, string, string, string) (bool, error) {
	return false, nil
}

func (m MockViewStore) MarkSeen(context.Context, string, string, string) error {
	return nil
}

type MockUserStore struct{}

func (m MockUserStore) Get(ctx context.Context, id int64) (*store.User, error) {
	return nil, nil
}

func (m MockUserStore) Set(ctx context.Context, user *store.User) error {
	return nil
}
