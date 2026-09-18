package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/nicolasleigh/social/internal/store"
)

// maxMarkdownUploadBytes 限制 Markdown 文件上传的最大字节数（2 MB），防止超大文件耗尽内存或带宽。
const maxMarkdownUploadBytes int64 = 2 << 20

// updateTranslationPayload 定义更新文章翻译时的请求体结构。
type updateTranslationPayload struct {
	Markdown string `json:"markdown" validate:"required"`      // 包含 YAML Front-Matter 的 Markdown 文档全文
	Version  *int   `json:"version" validate:"required,gte=1"` // 目标更新的基准版本号（用于乐观并发控制，必须 >= 1）
}

// publishMarkdownTranslation 处理 Markdown 文件上传并发布为文章新语言版本（POST /posts/import）：
// 1. 限制请求体大小并解析 multipart/form-data 表单；
// 2. 从表单提取 "file" 字段并读取 Markdown 文档字节流；
// 3. 调用 parseMarkdownDocument 解析 YAML Front-Matter 元数据与正文；
// 4. 提取文章 slug（表单优先，Front-Matter 次之），校验格式且两者不可冲突；
// 5. 提取并归一化目标 locale（表单优先，Front-Matter 次之），校验语言合法性且两者不可冲突；
// 6. 从上下文获取当前管理员用户 ID；
// 7. 调用存储层 Publish 方法持久化翻译，若语言已存在则返回 409 Conflict；
// 8. 成功后返回 201 Created 及发布的翻译数据。
func (app *application) publishMarkdownTranslation(w http.ResponseWriter, r *http.Request) {
	// 限制请求体最大读取大小，防御大体积恶意上传
	r.Body = http.MaxBytesReader(w, r.Body, maxMarkdownUploadBytes)
	if err := r.ParseMultipartForm(maxMarkdownUploadBytes); err != nil {
		app.badRequestError(w, r, fmt.Errorf("markdown upload must not exceed 2 MB: %w", err))
		return
	}

	// 读取表单文件字段 "file"
	file, _, err := r.FormFile("file")
	if err != nil {
		app.badRequestError(w, r, fmt.Errorf("a markdown file is required: %w", err))
		return
	}
	defer file.Close()

	// 限制读取长度（max + 1 用于检测文件是否真实超限）
	document, err := io.ReadAll(io.LimitReader(file, maxMarkdownUploadBytes+1))
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}
	if int64(len(document)) > maxMarkdownUploadBytes {
		app.badRequestError(w, r, fmt.Errorf("markdown upload must not exceed 2 MB"))
		return
	}

	// 解析 Markdown 文档（校验 YAML Front-Matter 及正文内容规范）
	parsed, err := parseMarkdownDocument(string(document))
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}

	// 确定文章 slug：表单字段与 Front-Matter 字段如果同时提供，必须保持一致
	formSlug := strings.TrimSpace(r.FormValue("slug"))
	if formSlug != "" && parsed.frontMatter.Slug != "" && formSlug != parsed.frontMatter.Slug {
		app.badRequestError(w, r, fmt.Errorf("front-matter slug must match the submitted slug"))
		return
	}
	slug := firstNonEmpty(formSlug, parsed.frontMatter.Slug)
	if err := validateMarkdownSlug(slug); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	// 确定目标语言代码（locale）：表单字段与 Front-Matter 字段如果同时提供，必须保持一致
	formLocale := strings.TrimSpace(r.FormValue("locale"))
	locale, err := normalizeLocale(firstNonEmpty(formLocale, parsed.frontMatter.Locale))
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}
	if formLocale != "" && parsed.frontMatter.Locale != "" {
		frontMatterLocale, localeErr := normalizeLocale(parsed.frontMatter.Locale)
		if localeErr != nil || frontMatterLocale != locale {
			app.badRequestError(w, r, fmt.Errorf("front-matter locale must match the submitted locale"))
			return
		}
	}

	// 获取当前登录用户并调用底层存储发布翻译
	user := getUserFromContext(r)
	translation, err := app.store.PostTranslations.Publish(r.Context(), &store.TranslationDraft{
		Slug:            slug,
		Locale:          locale,
		Title:           strings.TrimSpace(parsed.frontMatter.Title),
		Description:     strings.TrimSpace(parsed.frontMatter.Description),
		Content:         parsed.content,
		Tags:            parsed.frontMatter.Tags,
		Photo:           parsed.frontMatter.Photo,
		UserID:          user.ID,
		SourceUpdatedAt: parsed.updatedAt,
		CreatedAt:       parsed.createdAt,
	})
	if err != nil {
		if app.metrics != nil {
			result := "error"
			if errors.Is(err, store.ErrConflict) {
				result = "conflict"
			}
			app.metrics.TranslationEvent("publish", result, locale)
		}
		app.handleTranslationError(w, r, err)
		return
	}

	if app.metrics != nil {
		app.metrics.TranslationEvent("publish", "success", locale)
	}

	if err := app.jsonResponse(w, http.StatusCreated, translation); err != nil {
		app.internalServerError(w, r, err)
	}
}

// updateMarkdownTranslation 处理更新指定文章特定语言版本的翻译内容（PUT /posts/{slug}/translations/{locale}）：
// 1. 从 URL 路径中提取并校验 slug 和 locale；
// 2. 读取并反序列化 JSON 请求体（updateTranslationPayload），校验基准 version；
// 3. 解析传入的 Markdown 文档全文；
// 4. 严格比对 Markdown Front-Matter 中的 slug 和 locale 是否与 URL 路径参数一致；
// 5. 调用存储层 Update 方法执行乐观并发更新（version = version + 1）；
// 6. 若版本号不匹配，存储层返回 ErrVersionConflict，接口返回 409 Conflict 报错；
// 7. 成功后返回 200 OK 及更新后的翻译实体。
func (app *application) updateMarkdownTranslation(w http.ResponseWriter, r *http.Request) {
	// 从 URL 提取并校验 slug
	slug := chi.URLParam(r, "slug")
	if err := validateMarkdownSlug(slug); err != nil {
		app.badRequestError(w, r, err)
		return
	}
	// 从 URL 提取并归一化 locale
	locale, err := normalizeLocale(chi.URLParam(r, "locale"))
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}

	// 解析并校验 JSON 请求负载
	var payload updateTranslationPayload
	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}
	if err := Validate.Struct(payload); err != nil {
		app.badRequestError(w, r, err)
		return
	}

	// 解析 Markdown 文档内容
	parsed, err := parseMarkdownDocument(payload.Markdown)
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}
	// Front-Matter 中的 slug 若存在，必须与 URL 中的一致
	if parsed.frontMatter.Slug != "" && parsed.frontMatter.Slug != slug {
		app.badRequestError(w, r, fmt.Errorf("front-matter slug must match the URL slug"))
		return
	}
	// Front-Matter 中的 locale 若存在，必须与 URL 中的一致
	if parsed.frontMatter.Locale != "" {
		frontMatterLocale, localeErr := normalizeLocale(parsed.frontMatter.Locale)
		if localeErr != nil || frontMatterLocale != locale {
			app.badRequestError(w, r, fmt.Errorf("front-matter locale must match the URL locale"))
			return
		}
	}

	// 执行带版本乐观锁的持久化更新
	translation, err := app.store.PostTranslations.Update(r.Context(), &store.TranslationDraft{
		Slug:            slug,
		Locale:          locale,
		Title:           strings.TrimSpace(parsed.frontMatter.Title),
		Description:     strings.TrimSpace(parsed.frontMatter.Description),
		Content:         parsed.content,
		Tags:            parsed.frontMatter.Tags,
		Photo:           parsed.frontMatter.Photo,
		Version:         *payload.Version,
		SourceUpdatedAt: parsed.updatedAt,
		CreatedAt:       parsed.createdAt,
	})
	if err != nil {
		if app.metrics != nil {
			result := "error"
			if errors.Is(err, store.ErrVersionConflict) {
				result = "version_conflict"
			}
			app.metrics.TranslationEvent("update", result, locale)
		}
		app.handleTranslationError(w, r, err)
		return
	}
	if app.metrics != nil {
		app.metrics.TranslationEvent("update", "success", locale)
	}

	if err := app.jsonResponse(w, http.StatusOK, translation); err != nil {
		app.internalServerError(w, r, err)
	}
}

// getLocalizedPost 处理公开读取文章本地化详情（GET /posts/{slug}/localized?lang=...）：
// 1. 从 URL 查询参数 "lang" 中提取并归一化请求语言代码；
// 2. 调用存储层 GetLocalized 查询文章，支持三级智能降级（Fallback Strategy）；
// 3. 设置响应头：
//   - "Content-Language": 标识实际返回内容的语言；
//   - "X-Content-Fallback": 当发生降级回退时，通过该响应头显式通知客户端当前并非请求的原语言；
//
// 4. 返回 200 OK 及 LocalizedPost 聚合数据。
func (app *application) getLocalizedPost(w http.ResponseWriter, r *http.Request) {
	locale, err := normalizeLocale(r.URL.Query().Get("lang"))
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}

	post, err := app.store.PostTranslations.GetLocalized(r.Context(), chi.URLParam(r, "slug"), locale)
	if err != nil {
		app.handleTranslationError(w, r, err)
		return
	}
	if app.metrics != nil && post.Fallback {
		app.metrics.TranslationFallback(post.RequestedLocale, post.ResolvedLocale)
	}

	// 设置标准语言响应头
	w.Header().Set("Content-Language", post.ResolvedLocale)
	// 若触发了语言降级，设置自定义响应头提示前端
	if post.Fallback {
		w.Header().Set("X-Content-Fallback", post.ResolvedLocale)
	}
	if err := app.jsonResponse(w, http.StatusOK, post); err != nil {
		app.internalServerError(w, r, err)
	}
}

// getAllPostTranslations 处理获取某篇文章的所有多语言版本列表（GET /posts/{slug}/translations）：
// 供后台管理界面查看当前文章已发布的所有语言版本。
func (app *application) getAllPostTranslations(w http.ResponseWriter, r *http.Request) {
	translations, err := app.store.PostTranslations.GetAll(r.Context(), chi.URLParam(r, "slug"))
	if err != nil {
		app.handleTranslationError(w, r, err)
		return
	}
	if err := app.jsonResponse(w, http.StatusOK, translations); err != nil {
		app.internalServerError(w, r, err)
	}
}

// getPostTranslationRevisions 处理获取某篇文章特定语言版本的修改历史快照记录（GET /posts/{slug}/translations/{locale}/revisions）：
// 1. 提取并校验 slug 和 locale；
// 2. 调用存储层查询版本历史记录（按版本号倒序排列）；
// 3. 返回 200 OK 及历史版本快照列表。
func (app *application) getPostTranslationRevisions(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	if err := validateMarkdownSlug(slug); err != nil {
		app.badRequestError(w, r, err)
		return
	}
	locale, err := normalizeLocale(chi.URLParam(r, "locale"))
	if err != nil {
		app.badRequestError(w, r, err)
		return
	}

	revisions, err := app.store.PostTranslations.GetRevisions(r.Context(), slug, locale)
	if err != nil {
		app.handleTranslationError(w, r, err)
		return
	}
	if err := app.jsonResponse(w, http.StatusOK, revisions); err != nil {
		app.internalServerError(w, r, err)
	}
}

// handleTranslationError 统一映射多语言操作中的错误类型到对应 HTTP 状态码：
// - store.ErrNotFound -> 404 Not Found
// - store.ErrConflict（语言已存在）或 store.ErrVersionConflict（版本并发冲突） -> 409 Conflict
// - 其他错误 -> 500 Internal Server Error
func (app *application) handleTranslationError(w http.ResponseWriter, r *http.Request, err error) {
	switch {
	case errors.Is(err, store.ErrNotFound):
		app.notFoundError(w, r, err)
	case errors.Is(err, store.ErrConflict), errors.Is(err, store.ErrVersionConflict):
		app.conflictError(w, r, err)
	default:
		app.internalServerError(w, r, err)
	}
}

// firstNonEmpty 辅助函数，依次遍历传入的字符串，返回第一个非空且去除首尾空白后的有效字符串；
// 若全部为空则返回空字符串。
func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return strings.TrimSpace(value)
		}
	}
	return ""
}
