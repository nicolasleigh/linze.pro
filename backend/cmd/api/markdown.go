package main

import (
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/nicolasleigh/social/internal/store"
	"gopkg.in/yaml.v3"
)

// markdownSlugPattern 定义文章别名（Slug）的正则表达式规范：
// 1. 仅允许包含小写字母（a-z）和数字（0-9）；
// 2. 多个单词之间通过单个连字符（-）连接（标准 Kebab-Case 格式）；
// 3. 禁止以连字符开头或结尾，禁止连续连字符（如 "--"）。
var markdownSlugPattern = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)

// markdownFrontMatter 表示 Markdown 文档顶部通过 "---" 包裹的 YAML 元数据。
// 用于在导入 Markdown 文章或多语言翻译时提取结构化配置。
type markdownFrontMatter struct {
	Slug        string   `yaml:"slug"`        // 文章唯一标识/别名（URL Slug）
	Locale      string   `yaml:"locale"`      // 语言代码（如 zh-CN, en-US）
	Title       string   `yaml:"title"`       // 文章标题
	Description string   `yaml:"description"` // 文章描述/摘要（SEO 描述）
	Summary     string   `yaml:"summary"`     // 文章摘要（若 description 未提供时的备选回退字段）
	Tags        []string `yaml:"tags"`        // 标签列表
	Photo       string   `yaml:"photo"`       // 封面图 URL
	Updated     string   `yaml:"updated"`     // 文章更新日期（支持 RFC3339 或 YYYY-MM-DD 格式）
}

// parsedMarkdown 封装了 Markdown 文档解析后的完整结果。
type parsedMarkdown struct {
	frontMatter markdownFrontMatter // 解析出的 YAML 元数据
	content     string              // 剥离 Front-Matter 后的 Markdown 正文内容
	updatedAt   *time.Time          // 转换后的标准更新时间对象（若未提供 updated 则为 nil）
}

// parseMarkdownDocument 解析并验证包含 YAML Front-Matter 的 Markdown 文档字符串：
// 1. 换行符归一化：将 Windows 换行符 "\r\n" 统一替换为 Unix 换行符 "\n"；
// 2. 结构提取：验证文档必须以 "---\n" 开头并以 "\n---\n" 闭合，分离 YAML 头部与 Markdown 正文；
// 3. YAML 反序列化：将头部解析为 markdownFrontMatter 结构体，支持 description 为空时使用 summary 填充；
// 4. 字段校验与边界防御：
//    - 标题（Title）与正文（Content）为必填项且不能为空；
//    - 标题长度上限为 150 字符；
//    - 描述长度上限为 500 字符；
//    - 正文长度上限为 200,000 字符；
// 5. 标签清洗：调用 normalizeTags 去除首尾空格与重复项，且每篇文章标签数最多 12 个；
// 6. 时间解析：若指定了 updated 字段，调用 parseMarkdownTime 解析为 *time.Time。
func parseMarkdownDocument(document string) (*parsedMarkdown, error) {
	// 统一换行符，确保跨操作系统（Windows / Unix）的一致性
	normalized := strings.ReplaceAll(document, "\r\n", "\n")
	if !strings.HasPrefix(normalized, "---\n") {
		return nil, fmt.Errorf("markdown front-matter is required")
	}

	// 定位 YAML Front-Matter 的闭合标记 "\n---\n"
	separator := strings.Index(normalized[4:], "\n---\n")
	if separator < 0 {
		return nil, fmt.Errorf("markdown front-matter is not closed")
	}
	separator += 4 // 加上前面跳过的 4 个字符偏移量

	// 反序列化 Front-Matter 中的 YAML 元数据
	var metadata markdownFrontMatter
	if err := yaml.Unmarshal([]byte(normalized[4:separator]), &metadata); err != nil {
		return nil, fmt.Errorf("invalid markdown front-matter: %w", err)
	}
	// 若未显式提供 description，则回退使用 summary 充当描述
	if metadata.Description == "" {
		metadata.Description = metadata.Summary
	}

	// 提取并截取 Markdown 正文（去除首尾空白）
	content := strings.TrimSpace(normalized[separator+5:])
	if strings.TrimSpace(metadata.Title) == "" {
		return nil, fmt.Errorf("front-matter title is required")
	}
	if content == "" {
		return nil, fmt.Errorf("markdown content is required")
	}
	if len(metadata.Title) > 150 {
		return nil, fmt.Errorf("title must not exceed 150 characters")
	}
	if len(metadata.Description) > 500 {
		return nil, fmt.Errorf("description must not exceed 500 characters")
	}
	if len(content) > 200_000 {
		return nil, fmt.Errorf("markdown content must not exceed 200000 characters")
	}

	// 清洗并去重标签，限制最大标签数量
	metadata.Tags = normalizeTags(metadata.Tags)
	if len(metadata.Tags) > 12 {
		return nil, fmt.Errorf("a post can have at most 12 tags")
	}

	// 解析更新时间（若有）
	var updatedAt *time.Time
	if metadata.Updated != "" {
		parsed, err := parseMarkdownTime(metadata.Updated)
		if err != nil {
			return nil, err
		}
		updatedAt = &parsed
	}

	return &parsedMarkdown{
		frontMatter: metadata,
		content:     content,
		updatedAt:   updatedAt,
	}, nil
}

// parseMarkdownTime 解析 Front-Matter 中给定的日期时间字符串。
// 支持 RFC3339（如 "2026-09-12T15:04:05Z"）与常用短日期 "YYYY-MM-DD" 两种格式。
func parseMarkdownTime(value string) (time.Time, error) {
	for _, layout := range []string{time.RFC3339, "2006-01-02"} {
		if parsed, err := time.Parse(layout, value); err == nil {
			return parsed, nil
		}
	}
	return time.Time{}, fmt.Errorf("front-matter updated must be RFC3339 or YYYY-MM-DD")
}

// normalizeTags 对传入的标签列表进行清洗和去重：
// 1. 去除每个标签两端的空白字符；
// 2. 忽略清洗后为空的标签；
// 3. 基于集合（Set）过滤重复标签；
// 4. 保持标签在原文中出现的初始先后顺序。
func normalizeTags(tags []string) []string {
	seen := make(map[string]struct{}, len(tags))
	result := make([]string, 0, len(tags))
	for _, tag := range tags {
		tag = strings.TrimSpace(tag)
		if tag == "" {
			continue
		}
		if _, exists := seen[tag]; exists {
			continue
		}
		seen[tag] = struct{}{}
		result = append(result, tag)
	}
	return result
}

// normalizeLocale 将传入的语言代码字符串归一化为系统标准常量格式（如 store.LocaleZhCN 或 store.LocaleEnUS）：
// - "zh", "zh-cn", "zh_cn" -> "zh-CN"
// - "en", "en-us", "en_us" -> "en-US"
// 若不属于受支持的语言范围，则返回错误。
func normalizeLocale(value string) (string, error) {
	switch strings.ToLower(strings.TrimSpace(value)) {
	case "zh", "zh-cn", "zh_cn":
		return store.LocaleZhCN, nil
	case "en", "en-us", "en_us":
		return store.LocaleEnUS, nil
	default:
		return "", fmt.Errorf("locale must be zh-CN or en-US")
	}
}

// validateMarkdownSlug 校验文章别名（Slug）的合法性：
// 必须严格匹配 Kebab-Case 格式（小写字母、数字和中划线），且总长度不能超过 150 个字符。
func validateMarkdownSlug(value string) error {
	if !markdownSlugPattern.MatchString(value) || len(value) > 150 {
		return fmt.Errorf("slug must contain lowercase letters, numbers and hyphens only")
	}
	return nil
}
