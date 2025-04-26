package store

import (
	"context"
	"database/sql"
)

type PostLikeStore struct {
	db *sql.DB
}

type ProjectLikeStore struct {
	db *sql.DB
}

type PostLike struct {
	PostID  int64 `json:"post_id"`
	LikeNum int64 `json:"like_num"`
	ViewNum int64 `json:"view_num"`
}

type ProjectLike struct {
	ProjectID int64 `json:"project_id"`
	LikeNum   int64 `json:"like_num"`
	ViewNum   int64 `json:"view_num"`
}

func (s *PostLikeStore) UpdateLike(ctx context.Context, postID int64) (int, error) {
	query := `INSERT INTO post_likes (post_id, like_num)
	VALUES ($1, 1)
	ON CONFLICT (post_id)
	DO UPDATE SET like_num = post_likes.like_num + 1
	RETURNING post_likes.like_num;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var likeNum int
	err := s.db.QueryRowContext(ctx, query, postID).Scan(&likeNum)
	if err != nil {
		return 0, err
	}
	return likeNum, nil
}

func (s *PostLikeStore) GetLike(ctx context.Context, postID int64) (int, error) {
	query := `SELECT like_num FROM post_likes WHERE post_id = $1;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var likeNum int
	err := s.db.QueryRowContext(ctx, query, postID).Scan(&likeNum)
	if err != nil {
		return 0, err
	}
	return likeNum, nil
}

func (s *PostLikeStore) UpdateView(ctx context.Context, postID int64) (int, error) {
	query := `INSERT INTO post_likes (post_id, view_num)
	VALUES ($1, 1)
	ON CONFLICT (post_id)
	DO UPDATE SET view_num = post_likes.view_num + 1
	RETURNING post_likes.view_num;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var viewNum int
	err := s.db.QueryRowContext(ctx, query, postID).Scan(&viewNum)
	if err != nil {
		return 0, err
	}
	return viewNum, nil
}

func (s *ProjectLikeStore) UpdateLike(ctx context.Context, slug string) (int, error) {
	query := `INSERT INTO project_likes (project_slug, like_num)
	VALUES ($1, 1)
	ON CONFLICT (project_slug)
	DO UPDATE SET like_num = project_likes.like_num + 1
	RETURNING project_likes.like_num;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var likeNum int
	err := s.db.QueryRowContext(ctx, query, slug).Scan(&likeNum)
	if err != nil {
		return 0, err
	}
	return likeNum, nil
}

func (s *ProjectLikeStore) GetLike(ctx context.Context, slug string) (int, error) {
	query := `SELECT like_num FROM project_likes WHERE project_slug = $1;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var likeNum int
	err := s.db.QueryRowContext(ctx, query, slug).Scan(&likeNum)
	if err != nil {
		return 0, err
	}
	return likeNum, nil
}

func (s *ProjectLikeStore) UpdateView(ctx context.Context, slug string) (int, error) {
	query := `INSERT INTO project_likes (project_slug, view_num)
	VALUES ($1, 1)
	ON CONFLICT (project_slug)
	DO UPDATE SET view_num = project_likes.view_num + 1
	RETURNING project_likes.view_num;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var viewNum int
	err := s.db.QueryRowContext(ctx, query, slug).Scan(&viewNum)
	if err != nil {
		return 0, err
	}
	return viewNum, nil
}
