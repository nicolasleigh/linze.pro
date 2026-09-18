package store

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/lib/pq"
	"github.com/nicolasleigh/social/internal/observability"
)

// 系统支持的标准多语言标识常量。
const (
	LocaleZhCN = "zh-CN" // 中文（简体，中国大陆）
	LocaleEnUS = "en-US" // 英文（美国）
)

// PostTranslation 表示单篇博客文章在某一特定语言下的翻译记录。
type PostTranslation struct {
	PostSlug        string     `json:"postSlug"`                  // 所属文章的唯一 Slug 标识
	Locale          string     `json:"locale"`                    // 语言地区代码（如 zh-CN, en-US）
	Title           string     `json:"title"`                     // 该语言版本下的文章标题
	Description     string     `json:"description"`               // 该语言版本下的文章描述/摘要
	Content         string     `json:"content"`                   // 该语言版本下的 Markdown 正文
	Version         int        `json:"version"`                   // 当前翻译版本号（用于乐观并发控制与版本追踪）
	SourceUpdatedAt *time.Time `json:"sourceUpdatedAt,omitempty"` // 原始外部文档（如 Markdown 文件）的修改时间
	CreatedAt       time.Time  `json:"createdAt"`                 // 首次发布该语言版本的时间
	UpdatedAt       time.Time  `json:"updatedAt"`                 // 最近一次更新该语言版本的时间
	Tags            []string   `json:"tags,omitempty"`            // 关联的文章标签列表
	Photo           string     `json:"photo,omitempty"`           // 关联的文章封面图 URL
}

// PostTranslationRevision 表示某篇翻译的历史修订快照记录（省略正文以节约网络开销，用于版本审计展示）。
type PostTranslationRevision struct {
	PostSlug        string     `json:"postSlug"`                  // 文章 Slug
	Locale          string     `json:"locale"`                    // 语言地区代码
	Version         int        `json:"version"`                   // 当时的历史版本号
	Title           string     `json:"title"`                     // 当时保存的历史标题
	Description     string     `json:"description"`               // 当时保存的历史描述
	SourceUpdatedAt *time.Time `json:"sourceUpdatedAt,omitempty"` // 当时记录的源文档修改时间
	CreatedAt       time.Time  `json:"createdAt"`                 // 该版本快照创建的时间
}

// LocalizedPost 是对外提供文章多语言详情展示的聚合视图模型。
type LocalizedPost struct {
	PostTranslation
	RequestedLocale  string    `json:"requestedLocale"`  // 客户端发起请求时期望的语言代码
	ResolvedLocale   string    `json:"resolvedLocale"`   // 系统最终实际解析并返回的语言代码
	Fallback         bool      `json:"fallback"`         // 标记是否触发了语言降级回退（即实际语言与请求语言不一致）
	AvailableLocales []string  `json:"availableLocales"` // 该文章目前已发布的所有可用语言列表
	Tags             []string  `json:"tags"`             // 文章标签
	Photo            string    `json:"photo"`            // 文章封面图
	Author           string    `json:"author"`           // 文章作者用户名
	PublishedAt      time.Time `json:"publishedAt"`      // 文章首次发布时间（取自 posts 主表）
	ViewCount        int64     `json:"viewCount"`        // 文章累计浏览量（取自 post_likes 表）
	LikeCount        int64     `json:"likeCount"`        // 文章累计点赞数（取自 post_likes 表）
}

// TranslationDraft 是发布或更新多语言文章翻译时的输入数据传输对象（DTO）。
type TranslationDraft struct {
	Slug            string     // 文章唯一 Slug 标识
	Locale          string     // 目标语言代码（如 zh-CN, en-US）
	Title           string     // 标题
	Description     string     // 描述/摘要
	Content         string     // 正文内容
	Tags            []string   // 标签列表
	Photo           string     // 封面图 URL
	UserID          int64      // 操作用户 ID
	Version         int        // 目标更新的版本号（用于乐观锁校验）
	SourceUpdatedAt *time.Time // 源文件更新时间
	CreatedAt       *time.Time // 文章发布时间（若指定则覆盖默认系统当前时间）
}

// PostTranslationStore 负责文章多语言持久化相关的数据存取实现。
type PostTranslationStore struct {
	db *sql.DB
}

// Publish 发布某篇文章的新语言版本：
// 1. 在单事务中执行，确保主表、统计表与多语言翻译表的数据原子性；
// 2. 检查并确保 posts 父表及 post_likes 汇总表记录存在（ON CONFLICT DO NOTHING）；若指定了 CreatedAt 则写入自定义发布时间；
// 3. 插入 post_translations 新记录，初始版本号由数据库生成（默认为 1）；
// 4. 若 (post_slug, locale) 唯一约束冲突，捕获 PostgreSQL 23505 错误码并返回 ErrConflict（409）；
// 5. 调用 insertTranslationRevision 将第 1 版快照记录存入 post_translation_revisions 历史表；
// 6. 调用 syncLegacyTranslation 双写同步更新旧版 posts 主表对应语言字段及发布时间，保持向后兼容。
func (s *PostTranslationStore) Publish(ctx context.Context, draft *TranslationDraft) (*PostTranslation, error) {
	ctx, span := observability.StartSpan(ctx, "db.translation.publish")
	defer span.End()
	var translation PostTranslation
	err := withTx(s.db, ctx, func(tx *sql.Tx) error {
		legacyTitleEn, legacyTitleZh := draft.Title, draft.Title
		legacyAboutEn, legacyAboutZh := draft.Description, draft.Description
		legacyContentEn, legacyContentZh := draft.Content, draft.Content

		// 1. 确保 posts 主表中存在该文章的基础骨架记录（支持指定发布时间）
		_, err := tx.ExecContext(ctx, `INSERT INTO posts (
			slug, title_en, title_zh, about_en, about_zh,
			content_en, content_zh, user_id, tags, photo, created_at
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, COALESCE($11, NOW()))
		ON CONFLICT (slug) DO NOTHING;`,
			draft.Slug, legacyTitleEn, legacyTitleZh, legacyAboutEn, legacyAboutZh,
			legacyContentEn, legacyContentZh, draft.UserID, pq.Array(draft.Tags), draft.Photo,
			draft.CreatedAt,
		)
		if err != nil {
			return err
		}

		// 2. 确保 post_likes 互动统计记录已初始化
		_, err = tx.ExecContext(ctx, `INSERT INTO post_likes (post_slug, like_num, view_num)
			VALUES ($1, 0, 0) ON CONFLICT (post_slug) DO NOTHING;`, draft.Slug)
		if err != nil {
			return err
		}

		// 3. 插入多语言子表记录
		query := `INSERT INTO post_translations (
			post_slug, locale, title, description, content, source_updated_at, created_at
		) VALUES ($1,$2,$3,$4,$5,$6, COALESCE($7, NOW()))
		RETURNING post_slug, locale, title, description, content, version,
			source_updated_at, created_at, updated_at;`
		if err := tx.QueryRowContext(ctx, query,
			draft.Slug, draft.Locale, draft.Title, draft.Description,
			draft.Content, draft.SourceUpdatedAt, draft.CreatedAt,
		).Scan(
			&translation.PostSlug, &translation.Locale, &translation.Title,
			&translation.Description, &translation.Content, &translation.Version,
			&translation.SourceUpdatedAt, &translation.CreatedAt, &translation.UpdatedAt,
		); err != nil {
			if isUniqueViolation(err) {
				return ErrConflict
			}
			return err
		}

		// 4. 归档第 1 版修订历史快照
		if err := insertTranslationRevision(ctx, tx, &translation); err != nil {
			return err
		}

		// 5. 向后兼容同步旧表字段
		return syncLegacyTranslation(ctx, tx, draft)
	})
	if err != nil {
		return nil, err
	}
	translation.Tags = draft.Tags
	translation.Photo = draft.Photo
	return &translation, nil
}

// Update 更新某篇文章特定语言版本的翻译内容（基于乐观并发控制）：
// 1. 在单事务内根据 post_slug, locale 以及旧版本号 version 进行匹配更新；
// 2. 更新时使版本号自增（version = version + 1），若匹配不到行（sql.ErrNoRows）返回 ErrVersionConflict（409）；若传入了 CreatedAt 则同步更新创建时间；
// 3. 自动将最新产生的版本快照追加到 post_translation_revisions 表中；
// 4. 双写同步旧版 posts 主表中的对应语言字段及发布时间。
func (s *PostTranslationStore) Update(ctx context.Context, draft *TranslationDraft) (*PostTranslation, error) {
	ctx, span := observability.StartSpan(ctx, "db.translation.update")
	defer span.End()
	var translation PostTranslation
	err := withTx(s.db, ctx, func(tx *sql.Tx) error {
		query := `UPDATE post_translations SET
			title = $3, description = $4, content = $5,
			source_updated_at = $6,
			created_at = COALESCE($8, created_at),
			updated_at = NOW(), version = version + 1
		WHERE post_slug = $1 AND locale = $2 AND version = $7
		RETURNING post_slug, locale, title, description, content, version,
			source_updated_at, created_at, updated_at;`
		if err := tx.QueryRowContext(ctx, query,
			draft.Slug, draft.Locale, draft.Title, draft.Description,
			draft.Content, draft.SourceUpdatedAt, draft.Version, draft.CreatedAt,
		).Scan(
			&translation.PostSlug, &translation.Locale, &translation.Title,
			&translation.Description, &translation.Content, &translation.Version,
			&translation.SourceUpdatedAt, &translation.CreatedAt, &translation.UpdatedAt,
		); err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return ErrVersionConflict
			}
			return err
		}

		// 写入该版本更新的历史修订快照
		if err := insertTranslationRevision(ctx, tx, &translation); err != nil {
			return err
		}

		// 同步回写旧版 posts 表
		return syncLegacyTranslation(ctx, tx, draft)
	})
	if err != nil {
		return nil, err
	}
	translation.Tags = draft.Tags
	translation.Photo = draft.Photo
	return &translation, nil
}

// insertTranslationRevision 向 post_translation_revisions 表插入当前最新版本的历史修订记录快照。
func insertTranslationRevision(ctx context.Context, tx *sql.Tx, translation *PostTranslation) error {
	_, err := tx.ExecContext(ctx, `INSERT INTO post_translation_revisions (
		post_slug, locale, version, title, description, content, source_updated_at
	) VALUES ($1,$2,$3,$4,$5,$6,$7);`,
		translation.PostSlug, translation.Locale, translation.Version,
		translation.Title, translation.Description, translation.Content,
		translation.SourceUpdatedAt,
	)
	return err
}

// syncLegacyTranslation 保持与旧版 posts 表结构的双写同步：
// - zh-CN: 同步更新 posts 表的 title_zh, about_zh, content_zh;
// - en-US: 同步更新 posts 表的 title_en, about_en, content_en;
// - 使用 COALESCE 和 NULLIF 保证在未传 tags 或 photo 时不覆盖旧有数据；
// - 若传入了 CreatedAt，则同步更新 posts 表的 created_at 发布时间。
func syncLegacyTranslation(ctx context.Context, tx *sql.Tx, draft *TranslationDraft) error {
	var query string
	if draft.Locale == LocaleZhCN {
		query = `UPDATE posts SET title_zh=$2, about_zh=$3, content_zh=$4,
			tags=COALESCE($5, tags), photo=COALESCE(NULLIF($6, ''), photo),
			created_at=COALESCE($7, created_at), updated_at=NOW(), version=version+1
			WHERE slug=$1;`
	} else {
		query = `UPDATE posts SET title_en=$2, about_en=$3, content_en=$4,
			tags=COALESCE($5, tags), photo=COALESCE(NULLIF($6, ''), photo),
			created_at=COALESCE($7, created_at), updated_at=NOW(), version=version+1
			WHERE slug=$1;`
	}
	result, err := tx.ExecContext(ctx, query,
		draft.Slug, draft.Title, draft.Description, draft.Content,
		pq.Array(draft.Tags), draft.Photo, draft.CreatedAt,
	)
	if err != nil {
		return err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

// GetLocalized 获取文章的本地化展示详情（支持智能降级回退）：
// 1. 查询文章的所有翻译版本及公共元数据（标签、作者、点赞量等）；
// 2. 通过 chooseTranslation 执行三级降级匹配算法选出最佳内容；
// 3. 构建 LocalizedPost 聚合对象，包含实际命中语言及 Fallback 降级标记。
func (s *PostTranslationStore) GetLocalized(ctx context.Context, slug, requestedLocale string) (*LocalizedPost, error) {
	ctx, span := observability.StartSpan(ctx, "db.translation.get_localized")
	defer span.End()
	translations, metadata, err := s.getAll(ctx, slug)
	if err != nil {
		return nil, err
	}

	resolved := chooseTranslation(translations, requestedLocale)
	if resolved == nil {
		return nil, ErrNotFound
	}

	available := make([]string, 0, len(translations))
	for _, translation := range translations {
		available = append(available, translation.Locale)
	}

	return &LocalizedPost{
		PostTranslation:  *resolved,
		RequestedLocale:  requestedLocale,
		ResolvedLocale:   resolved.Locale,
		Fallback:         resolved.Locale != requestedLocale,
		AvailableLocales: available,
		Tags:             metadata.tags,
		Photo:            metadata.photo,
		Author:           metadata.author,
		PublishedAt:      metadata.publishedAt,
		ViewCount:        metadata.viewCount,
		LikeCount:        metadata.likeCount,
	}, nil
}

// GetAll 获取某篇文章当前发布的所有多语言版本列表。
func (s *PostTranslationStore) GetAll(ctx context.Context, slug string) ([]PostTranslation, error) {
	ctx, span := observability.StartSpan(ctx, "db.translation.list")
	defer span.End()
	translations, _, err := s.getAll(ctx, slug)
	return translations, err
}

// GetRevisions 获取某篇文章指定语言版本的全部修改历史记录（按版本号倒序排列）。
func (s *PostTranslationStore) GetRevisions(ctx context.Context, slug, locale string) ([]PostTranslationRevision, error) {
	ctx, span := observability.StartSpan(ctx, "db.translation.revisions")
	defer span.End()
	query := `SELECT post_slug, locale, version, title, description,
		source_updated_at, created_at
		FROM post_translation_revisions
		WHERE post_slug = $1 AND locale = $2
		ORDER BY version DESC;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, slug, locale)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	revisions := make([]PostTranslationRevision, 0)
	for rows.Next() {
		var revision PostTranslationRevision
		if err := rows.Scan(
			&revision.PostSlug, &revision.Locale, &revision.Version,
			&revision.Title, &revision.Description,
			&revision.SourceUpdatedAt, &revision.CreatedAt,
		); err != nil {
			return nil, err
		}
		revisions = append(revisions, revision)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	if len(revisions) == 0 {
		return nil, ErrNotFound
	}
	return revisions, nil
}

// postTranslationMetadata 内部结构体，用于在联表查询中暂存文章的公共元数据。
type postTranslationMetadata struct {
	tags        []string
	photo       string
	author      string
	publishedAt time.Time
	viewCount   int64
	likeCount   int64
}

// getAll 内部方法：联表（posts, users, post_likes）查询某文章的所有翻译版本及元数据，
// 按照 zh-CN 优先的规则进行排序。
func (s *PostTranslationStore) getAll(ctx context.Context, slug string) ([]PostTranslation, postTranslationMetadata, error) {
	ctx, span := observability.StartSpan(ctx, "db.translation.query_all")
	defer span.End()
	query := `SELECT t.post_slug, t.locale, t.title, t.description, t.content,
		t.version, t.source_updated_at, t.created_at, t.updated_at,
		p.tags, p.photo, u.username, p.created_at, l.view_num, l.like_num
		FROM post_translations t
		JOIN posts p ON p.slug = t.post_slug
		JOIN users u ON u.id = p.user_id
		JOIN post_likes l ON l.post_slug = p.slug
		WHERE t.post_slug = $1
		ORDER BY CASE t.locale WHEN 'zh-CN' THEN 0 ELSE 1 END;`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, query, slug)
	if err != nil {
		return nil, postTranslationMetadata{}, err
	}
	defer rows.Close()

	translations := make([]PostTranslation, 0, 2)
	var metadata postTranslationMetadata
	for rows.Next() {
		var translation PostTranslation
		if err := rows.Scan(
			&translation.PostSlug, &translation.Locale, &translation.Title,
			&translation.Description, &translation.Content, &translation.Version,
			&translation.SourceUpdatedAt, &translation.CreatedAt, &translation.UpdatedAt,
			pq.Array(&metadata.tags), &metadata.photo, &metadata.author,
			&metadata.publishedAt, &metadata.viewCount, &metadata.likeCount,
		); err != nil {
			return nil, postTranslationMetadata{}, err
		}
		translations = append(translations, translation)
	}
	if err := rows.Err(); err != nil {
		return nil, postTranslationMetadata{}, err
	}
	if len(translations) == 0 {
		return nil, postTranslationMetadata{}, ErrNotFound
	}
	for index := range translations {
		translations[index].Tags = append([]string(nil), metadata.tags...)
		translations[index].Photo = metadata.photo
	}
	return translations, metadata, nil
}

// chooseTranslation 多语言智能降级匹配算法（Fallback Strategy）：
// 1. 第一优先级：精确匹配客户端请求的语言（requestedLocale）；
// 2. 第二优先级：若未匹配到，默认降级为中文版本（LocaleZhCN = "zh-CN"）；
// 3. 第三优先级：若中文版本也不存在，降级使用已有翻译列表中的第 1 个语言版本；
// 4. 若列表为空则返回 nil。
func chooseTranslation(translations []PostTranslation, requestedLocale string) *PostTranslation {
	// 1. 精确匹配
	for index := range translations {
		if translations[index].Locale == requestedLocale {
			return &translations[index]
		}
	}
	// 2. 降级回退到中文
	for index := range translations {
		if translations[index].Locale == LocaleZhCN {
			return &translations[index]
		}
	}
	// 3. 兜底回退到第一个可用语言
	if len(translations) > 0 {
		return &translations[0]
	}
	return nil
}

// isUniqueViolation 判断错误是否为 PostgreSQL 的唯一约束冲突错误（Error Code: 23505）。
func isUniqueViolation(err error) bool {
	var pqErr *pq.Error
	return errors.As(err, &pqErr) && pqErr.Code == "23505"
}
