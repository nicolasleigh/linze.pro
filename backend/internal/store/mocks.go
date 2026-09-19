package store

import (
	"context"
	"database/sql"
	"time"
)

func NewMockStore() Storage {
	return Storage{
		Users:     &MockUserStore{},
		PostLikes: &MockPostLikeStore{},
	}
}

type MockUserStore struct {
	// users []User
}

func (m *MockUserStore) Create(ctx context.Context, tx *sql.Tx, user *User) error {
	return nil
}

func (m *MockUserStore) GetByID(ctx context.Context, userID int64) (*User, error) {
	// return &User{}, nil
	return &User{
		ID: 45,
	}, nil
}

func (m *MockUserStore) CreateAndInvite(ctx context.Context, user *User, token string, invitationExp time.Duration) error {
	return nil
}

func (m *MockUserStore) Activate(ctx context.Context, token string) error {
	return nil
}

func (m *MockUserStore) Delete(ctx context.Context, userID int64) error {
	return nil
}

func (m *MockUserStore) GetByEmail(ctx context.Context, email string, password string) (*User, error) {
	return &User{}, nil
}

type MockPostLikeStore struct{}

func (m *MockPostLikeStore) UpdateLike(ctx context.Context, slug string) (int, error) {
	return 1, nil
}

func (m *MockPostLikeStore) GetLike(ctx context.Context, slug string) (int, error) {
	return 1, nil
}

func (m *MockPostLikeStore) UpdateView(ctx context.Context, slug string) (int, error) {
	return 1, nil
}
