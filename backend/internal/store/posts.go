package store

import (
	"context"
	"database/sql"
	"errors"

	"github.com/lib/pq"
)

type Post struct {
	ID        int64     `json:"id"`
	Content   string    `json:"content"`
	Title     string    `json:"title"`
	About     string    `json:"about"`
	Photo     string    `json:"photo"`
	UserID    int64     `json:"user_id"`
	Tags      []string  `json:"tags"`
	CreatedAt string    `json:"created_at"`
	UpdatedAt string    `json:"updated_at"`
	Version   int       `json:"version"`
	Comments  []Comment `json:"comments"`
	User      User      `json:"user"`
}

type PostWithMetadata struct {
	Post
	CommentCount int `json:"comments_count"`
}

type PostStore struct {
	db *sql.DB
}

func (s *PostStore) Create(ctx context.Context, post *Post) error {
	query := `INSERT INTO posts (content, title, user_id, tags, about, photo)
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at, updated_at`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	err := s.db.QueryRowContext(ctx, query, post.Content, post.Title, post.UserID, pq.Array(post.Tags), post.About, post.Photo).Scan(
		&post.ID,
		&post.CreatedAt,
		&post.UpdatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}

func (s *PostStore) GetByID(ctx context.Context, id int64) (*Post, error) {
	query := `SELECT posts.id, username, email, posts.title, posts.content, posts.created_at, posts.updated_at, posts.tags, posts.version, posts.about, posts.photo
	FROM posts
	JOIN users ON users.id = posts.user_id
	WHERE posts.id = $1;
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var post Post
	err := s.db.QueryRowContext(ctx, query, id).Scan(
		&post.ID,
		&post.User.Username,
		&post.User.Email,
		&post.Title,
		&post.Content,
		&post.CreatedAt,
		&post.UpdatedAt,
		pq.Array(&post.Tags),
		&post.Version,
		&post.About,
		&post.Photo,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}
	return &post, nil
}

func (s *PostStore) GetAll(ctx context.Context, limit, offset int) (*[]Post, error) {
	query := `SELECT p.id AS post_id, u.email, u.username, title, p.created_at, p.updated_at, tags, p.about, p.photo
	FROM posts AS p
	JOIN users AS u ON u.id = p.user_id
	ORDER BY p.created_at DESC
	LIMIT $1 OFFSET $2;
	`
	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	posts := make([]Post, 0)
	rows, err := s.db.QueryContext(ctx, query, limit, offset)
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
		var post Post
		err := rows.Scan(
			&post.ID,
			&post.User.Email,
			&post.User.Username,
			&post.Title,
			&post.CreatedAt,
			&post.UpdatedAt,
			pq.Array(&post.Tags),
			&post.About,
			&post.Photo,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return &posts, nil
}

func (s *PostStore) GetTags(ctx context.Context) (string, error) {
	query := `
	SELECT string_agg(DISTINCT tag, ',') AS tags
	FROM (
		SELECT unnest(tags) AS tag
		FROM posts
	) AS all_tags;
`
	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var tag string
	err := s.db.QueryRowContext(ctx, query).Scan(&tag)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return "", ErrNotFound
		default:
			return "", err
		}
	}

	return tag, nil
}

func (s *PostStore) GetByTag(ctx context.Context, limit, offset int, tag string) (*[]Post, error) {
	query := `SELECT p.id AS post_id, u.email, u.username, title, p.created_at, p.updated_at, tags, p.about, p.photo
	FROM posts AS p
	JOIN users AS u ON u.id = p.user_id
	WHERE $3 = ANY(p.tags)
	ORDER BY p.created_at DESC
	LIMIT $1 OFFSET $2;
	`
	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	posts := make([]Post, 0)
	rows, err := s.db.QueryContext(ctx, query, limit, offset, tag)
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
		var post Post
		err := rows.Scan(
			&post.ID,
			&post.User.Email,
			&post.User.Username,
			&post.Title,
			&post.CreatedAt,
			&post.UpdatedAt,
			pq.Array(&post.Tags),
			&post.About,
			&post.Photo,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return &posts, nil
}

func (s *PostStore) Delete(ctx context.Context, id int64) error {
	query := `DELETE FROM posts WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	res, err := s.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

func (s *PostStore) Update(ctx context.Context, post *Post) error {
	query := `UPDATE posts
	SET title = $1, content = $2, about = $3, tags = $4, version = version + 1
	WHERE id = $5 AND version = $6
	RETURNING version`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	// _, err := s.db.ExecContext(ctx, query, post.Title, post.Content, post.ID)
	err := s.db.QueryRowContext(ctx, query, post.Title, post.Content, post.About, pq.Array(post.Tags), post.ID, post.Version).Scan(&post.Version)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return ErrNotFound
		default:
			return err
		}
	}
	return nil
}

func (s *PostStore) GetUserFeed(ctx context.Context, userID int64, fq PaginatedFeedQuery) ([]PostWithMetadata, error) {
	// 	query := `SELECT
	// 	p.id,
	// 	p.user_id,
	// 	p.title,
	// 	p.content,
	// 	p.created_at,
	// 	p.version,
	// 	p.tags,
	// 	u.username,
	// 	COUNT(c.id) AS comments_count
	// FROM
	// 	posts p
	// 	LEFT JOIN comments c ON c.post_id = p.id
	// 	LEFT JOIN users u ON p.user_id = u.id
	// 	JOIN followers f ON f.follower_id = p.user_id
	// 		OR p.user_id = $1
	// WHERE
	// 	f.user_id = $1
	// 	OR p.user_id = $1
	// GROUP BY
	// 	p.id,
	// 	u.username
	// ORDER BY
	// 	p.created_at DESC;`

	// query := `SELECT
	// 	p.id,
	// 	p.user_id,
	// 	p.title,
	// 	p.content,
	// 	p.created_at,
	// 	p.version,
	// 	p.tags,
	// 	u.username,
	// 	COUNT(c.id) AS comments_count
	// FROM
	// 	posts p
	// 	LEFT JOIN comments c ON c.post_id = p.id
	// 	LEFT JOIN users u ON p.user_id = u.id
	// 	JOIN followers f ON f.follower_id = p.user_id
	// 		OR p.user_id = $1
	// WHERE
	// 	f.user_id = $1 AND
	// 	(p.title ILIKE '%' || $4 || '%' OR p.content ILIKE '%' || $4 || '%') AND
	// 	(p.tags @> $5 OR $5 = '{}' OR $5 IS NULL)
	// GROUP BY
	// 	p.id,
	// 	u.username
	// ORDER BY
	// 	p.created_at DESC
	// LIMIT $2 OFFSET $3;`

	query := `
	WITH FollowedPosts AS (
	    SELECT
	        p.id,
	        p.user_id,
	        p.title,
	        p.content,
	        p.created_at,
	        p.version,
	        p.tags,
	        u.username
	    FROM
	        posts p
	    LEFT JOIN
	        users u ON p.user_id = u.id
	    WHERE
	        (p.title ILIKE '%' || $4 || '%' OR p.content ILIKE '%' || $4 || '%') AND
					(p.tags @> $5 OR $5 = '{}' OR $5 IS NULL)
	        AND EXISTS (
	            SELECT 1
	            FROM followers f
	            WHERE f.user_id = $1
	            AND f.follower_id = p.user_id
	        )
	)

	SELECT
	    p.id,
	    p.user_id,
	    p.title,
	    p.content,
	    p.created_at,
	    p.version,
	    p.tags,
	    p.username,
	    COUNT(c.id) AS comments_count
	FROM
	    FollowedPosts p
	LEFT JOIN
	    comments c ON c.post_id = p.id
	GROUP BY
	    p.id,
	    p.user_id,
	    p.title,
	    p.content,
	    p.created_at,
	    p.version,
	    p.tags,
	    p.username
	ORDER BY p.created_at ` + fq.Sort + `
	LIMIT $2 OFFSET $3;
	`
	// "ORDER BY p.created_at $2" does not work.

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, userID, fq.Limit, fq.Offset, fq.Search, pq.Array(fq.Tags))
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var feed []PostWithMetadata
	for rows.Next() {
		var p PostWithMetadata
		err := rows.Scan(
			&p.ID,
			&p.UserID,
			&p.Title,
			&p.Content,
			&p.CreatedAt,
			&p.Version,
			pq.Array(&p.Tags),
			&p.User.Username,
			&p.CommentCount,
		)
		if err != nil {
			return nil, err
		}
		feed = append(feed, p)
	}
	return feed, nil
}
