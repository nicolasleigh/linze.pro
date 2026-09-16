package store

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

// PostEngagement 表示文章互动统计与当前访客的交互状态聚合数据。
type PostEngagement struct {
	ViewCount int64 `json:"viewCount"` // 文章累计总浏览量
	LikeCount int64 `json:"likeCount"` // 文章累计总点赞数
	Liked     bool  `json:"liked"`     // 当前访客（基于 visitorHash）是否已点赞过该文章
}

// PostEngagementStore 负责处理文章点赞与浏览量统计的数据库操作。
type PostEngagementStore struct {
	db *sql.DB
}

// Get 查询指定文章的互动数据统计，并判断当前访客是否已点赞。
// 1. 从 post_likes 汇总表读取总浏览数和总点赞数；
// 2. 通过 EXISTS 子查询高效检查 post_like_visitors 明细表中是否存在当前访客的记录；
// 3. 若文章不存在（sql.ErrNoRows），返回 ErrNotFound 错误。
func (s *PostEngagementStore) Get(ctx context.Context, slug, visitorHash string) (*PostEngagement, error) {
	query := `SELECT l.view_num, l.like_num,
		EXISTS (
			SELECT 1 FROM post_like_visitors v
			WHERE v.post_slug = l.post_slug AND v.visitor_hash = $2
		)
		FROM post_likes l
		WHERE l.post_slug = $1;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var engagement PostEngagement
	err := s.db.QueryRowContext(ctx, query, slug, visitorHash).Scan(
		&engagement.ViewCount,
		&engagement.LikeCount,
		&engagement.Liked,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}

	return &engagement, nil
}

// Like 为指定文章记录访客点赞（支持原子去重与增量更新）：
// 1. 采用 CTE（通用表表达式）在单条 SQL 中完成明细插入与总量更新；
// 2. 前置存在性检查：通过 "SELECT $1, $2 FROM posts WHERE slug = $1" 确保只有当文章存在时才尝试插入，防止非法 slug 触发外键违规；
// 3. 幂等去重：通过 "ON CONFLICT DO NOTHING" 确保同一访客重复点赞时静默忽略；
// 4. 原子自增：若本次为首次点赞，inserted 返回 1 行，like_num + 1；若为重复点赞，COUNT(*) 为 0，like_num 保持不变；
// 5. 返回值：返回最新的 PostEngagement 数据，以及布尔值 created（true 表示本次为新点赞，false 表示此前已点过赞）。
func (s *PostEngagementStore) Like(ctx context.Context, slug, visitorHash string) (*PostEngagement, bool, error) {
	var engagement *PostEngagement
	var created bool

	err := withTx(s.db, ctx, func(tx *sql.Tx) error {
		query := `WITH inserted AS (
			INSERT INTO post_like_visitors (post_slug, visitor_hash)
			SELECT $1, $2 FROM posts WHERE slug = $1
			ON CONFLICT DO NOTHING
			RETURNING 1
		)
		UPDATE post_likes
		SET like_num = like_num + (SELECT COUNT(*) FROM inserted)
		WHERE post_slug = $1
		RETURNING view_num, like_num, EXISTS (SELECT 1 FROM inserted);`

		ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
		defer cancel()

		var result PostEngagement
		if err := tx.QueryRowContext(ctx, query, slug, visitorHash).Scan(
			&result.ViewCount,
			&result.LikeCount,
			&created,
		); err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return ErrNotFound
			}
			return err
		}

		result.Liked = true
		engagement = &result
		return nil
	})
	if err != nil {
		return nil, false, err
	}

	return engagement, created, nil
}

// RecordView 为指定文章记录访客浏览量（按自然日 UV 去重）：
// 1. 采用 (post_slug, visitor_hash, viewed_on) 作为联合唯一约束，保证同一访客在同一自然日（UTC）内多次刷新/访问仅计入 1 次有效浏览量；
// 2. 前置存在性检查：通过 "SELECT $1, $2, $3 FROM posts WHERE slug = $1" 确保文章存在才生成待插入数据；
// 3. 原子自增：若当日首次访问，inserted 产生 1 行，view_num + 1；若当日已访问过，COUNT(*) 为 0，view_num 不变；
// 4. 在同一事务中查询当前访客的点赞状态（likedQuery），组合成完整的互动数据返回；
// 5. 返回值：返回最新的 PostEngagement 数据，以及布尔值 counted（true 表示本次计入了新增浏览量，false 表示当日已计过）。
func (s *PostEngagementStore) RecordView(ctx context.Context, slug, visitorHash string, viewedOn time.Time) (*PostEngagement, bool, error) {
	var engagement *PostEngagement
	var counted bool

	err := withTx(s.db, ctx, func(tx *sql.Tx) error {
		query := `WITH inserted AS (
			INSERT INTO post_view_visitors (post_slug, visitor_hash, viewed_on)
			SELECT $1, $2, $3 FROM posts WHERE slug = $1
			ON CONFLICT DO NOTHING
			RETURNING 1
		)
		UPDATE post_likes
		SET view_num = view_num + (SELECT COUNT(*) FROM inserted)
		WHERE post_slug = $1
		RETURNING view_num, like_num, EXISTS (SELECT 1 FROM inserted);`

		ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
		defer cancel()

		var result PostEngagement
		if err := tx.QueryRowContext(ctx, query, slug, visitorHash, viewedOn.UTC().Format("2006-01-02")).Scan(
			&result.ViewCount,
			&result.LikeCount,
			&counted,
		); err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return ErrNotFound
			}
			return err
		}

		var likedQuery = `SELECT EXISTS (
			SELECT 1 FROM post_like_visitors
			WHERE post_slug = $1 AND visitor_hash = $2
		);`
		if err := tx.QueryRowContext(ctx, likedQuery, slug, visitorHash).Scan(&result.Liked); err != nil {
			return err
		}

		engagement = &result
		return nil
	})
	if err != nil {
		return nil, false, err
	}

	return engagement, counted, nil
}
