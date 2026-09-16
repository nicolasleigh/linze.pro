package main

import (
	"errors"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/nicolasleigh/social/internal/store"
)

// engagementResponse 定义返回给客户端的文章互动统计与访客状态响应体。
type engagementResponse struct {
	ViewCount int64 `json:"viewCount"`         // 文章累计总浏览量
	LikeCount int64 `json:"likeCount"`         // 文章累计总点赞数
	Liked     bool  `json:"liked"`             // 当前访客是否已点赞
	Created   *bool `json:"created,omitempty"` // 点赞操作结果：true 表示本次为新创建的点赞；false 表示此前已点赞过
	Counted   *bool `json:"counted,omitempty"` // 浏览量记录结果：true 表示本次计入当日新增有效浏览；false 表示当日已计过
}

// newEngagementResponse 辅助函数，将底层的 store.PostEngagement 数据模型转换为 HTTP 响应结构体。
func newEngagementResponse(value *store.PostEngagement) engagementResponse {
	return engagementResponse{
		ViewCount: value.ViewCount,
		LikeCount: value.LikeCount,
		Liked:     value.Liked,
	}
}

// getPostEngagement 处理获取单篇文章互动数据（GET /posts/{slug}/engagement）：
// 1. 从 URL 路径中提取文章 slug，并从请求上下文提取当前访客的脱敏哈希（visitorHash）；
// 2. 调用存储层查询该文章的累计浏览量、点赞量，以及当前访客是否已点赞；
// 3. 设置 HTTP 缓存响应头：
//    - "Cache-Control: private, no-store"：禁止公共 CDN / 中间代理缓存含有访客个性化状态（liked）的响应；
//    - "Vary: Cookie"：提示客户端和缓存层响应内容依赖访客 Cookie 凭证；
// 4. 返回 200 OK 及 JSON 数据。
func (app *application) getPostEngagement(w http.ResponseWriter, r *http.Request) {
	value, err := app.store.PostEngagements.Get(
		r.Context(),
		chi.URLParam(r, "slug"),
		getVisitorHash(r),
	)
	if err != nil {
		app.handleEngagementError(w, r, err)
		return
	}

	w.Header().Set("Cache-Control", "private, no-store")
	w.Header().Set("Vary", "Cookie")
	if err := app.jsonResponse(w, http.StatusOK, newEngagementResponse(value)); err != nil {
		app.internalServerError(w, r, err)
	}
}

// likePost 处理访客点赞请求（PUT /posts/{slug}/engagement/like）：
// 1. 经过前置中间件校验（访客身份 VisitorIdentityMiddleware、同源检查 SameOriginWriteMiddleware 及频率限制）；
// 2. 调用存储层执行原子幂等点赞：
//    - 若首次点赞，数据库插入点赞明细并将文章点赞数 +1，created 返回 true；
//    - 若重复点赞，触发 ON CONFLICT 静默忽略，点赞数不增加，created 返回 false；
// 3. 返回 200 OK，包含最新互动数据和 created 标记。
func (app *application) likePost(w http.ResponseWriter, r *http.Request) {
	value, created, err := app.store.PostEngagements.Like(
		r.Context(),
		chi.URLParam(r, "slug"),
		getVisitorHash(r),
	)
	if err != nil {
		app.handleEngagementError(w, r, err)
		return
	}

	response := newEngagementResponse(value)
	response.Created = &created
	w.Header().Set("Cache-Control", "private, no-store")
	if err := app.jsonResponse(w, http.StatusOK, response); err != nil {
		app.internalServerError(w, r, err)
	}
}

// recordPostView 处理记录有效浏览量请求（POST /posts/{slug}/engagement/view）：
// 采用「Redis 缓存前置拦截 + PostgreSQL 数据库保底」的高性能防刷架构：
// 1. 获取当前 UTC 日期（YYYY-MM-DD）；
// 2. Redis 快速过滤（Read Cache）：
//    - 若开启 Redis，先检查缓存中当前访客今日是否已阅读过该文章；
//    - 若已记录过（seen == true），直接从数据库读取当前互动数据并返回 counted=false，跳过昂贵的数据库写入，避免锁竞争；
// 3. 数据库原子记录（Database Fallback/Write）：
//    - 若缓存未命中或 Redis 未开启，调用存储层 RecordView 执行自然日 UV 去重写入；
// 4. 回写缓存（Write Cache）：
//    - 数据库写入成功后，在 Redis 中标记该访客今日已阅读；
// 5. 返回 200 OK，并携带 counted 标记说明本次是否新增了有效浏览量。
func (app *application) recordPostView(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	visitorHash := getVisitorHash(r)
	viewedOn := time.Now().UTC()
	date := viewedOn.Format("2006-01-02")

	// 1. Redis 缓存层前置快速去重拦截，减轻数据库写压力
	if app.config.redisCfg.enabled && app.cacheStorage.Views != nil {
		seen, err := app.cacheStorage.Views.Seen(r.Context(), slug, visitorHash, date)
		if err != nil {
			app.logger.Warnw("view cache read failed", "slug", slug, "error", err)
		} else if seen {
			// 今日已计过浏览量，跳过数据库写操作，直接查询当前数据并返回 counted = false
			value, err := app.store.PostEngagements.Get(r.Context(), slug, visitorHash)
			if err != nil {
				app.handleEngagementError(w, r, err)
				return
			}
			counted := false
			response := newEngagementResponse(value)
			response.Counted = &counted
			w.Header().Set("Cache-Control", "private, no-store")
			if err := app.jsonResponse(w, http.StatusOK, response); err != nil {
				app.internalServerError(w, r, err)
			}
			return
		}
	}

	// 2. 数据库持久化层原子写入（保证日 UV 唯一约束）
	value, counted, err := app.store.PostEngagements.RecordView(
		r.Context(), slug, visitorHash, viewedOn,
	)
	if err != nil {
		app.handleEngagementError(w, r, err)
		return
	}

	// 3. 异步回写 Redis 缓存，供后续请求快速命中
	if app.config.redisCfg.enabled && app.cacheStorage.Views != nil {
		if err := app.cacheStorage.Views.MarkSeen(r.Context(), slug, visitorHash, date); err != nil {
			app.logger.Warnw("view cache write failed", "slug", slug, "error", err)
		}
	}

	response := newEngagementResponse(value)
	response.Counted = &counted
	w.Header().Set("Cache-Control", "private, no-store")
	if err := app.jsonResponse(w, http.StatusOK, response); err != nil {
		app.internalServerError(w, r, err)
	}
}

// handleEngagementError 统一处理互动相关的业务异常与 HTTP 状态码映射：
// - store.ErrNotFound -> 404 Not Found
// - 其他错误 -> 500 Internal Server Error
func (app *application) handleEngagementError(w http.ResponseWriter, r *http.Request, err error) {
	if errors.Is(err, store.ErrNotFound) {
		app.notFoundError(w, r, err)
		return
	}
	app.internalServerError(w, r, err)
}
