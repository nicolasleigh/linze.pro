package store

import (
	"context"
	"database/sql"
	"errors"
)

type Image struct {
	ID  int64  `json:"id"`
	Url string `json:"url"`
}

type ImageStore struct {
	db *sql.DB
}

func (s *ImageStore) Create(ctx context.Context, url string) error {
	query := `INSERT INTO images (url) VALUES ($1)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_, err := s.db.ExecContext(ctx, query, url)

	if err != nil {
		return err
	}
	return nil
}

func (s *ImageStore) Get(ctx context.Context) ([]Image, error) {
	query := `SELECT id, url FROM images`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	images := make([]Image, 0)

	rows, err := s.db.QueryContext(ctx, query)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}
	defer rows.Close()

	for rows.Next() {
		var image Image
		err := rows.Scan(&image.ID, &image.Url)
		if err != nil {
			return nil, err
		}
		images = append(images, image)
	}

	return images, nil
}
