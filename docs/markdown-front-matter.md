# Markdown Front-Matter 规范文档

本文档定义了 **Linze.pro** 博客系统（Go API 后端与 Next.js 前端）在文章导入、多语言翻译版本发布时所采用的 **Markdown YAML Front-Matter** 元数据格式规范与校验规则。

---

## 1. 结构与格式要求

- **分隔符**：文档开头必须以 `---` 起始，并以独立的 `---` 闭合。
- **换行符**：支持标准 Unix 换行符（`\n`）与 Windows 换行符（`\r\n`），解析器会自动进行归一化处理。
- **YAML 语法**：两个 `---` 之间的内容必须为合法的 YAML 格式。
- **正文内容**：闭合分隔符之后为 Markdown 正文内容。正文不能为空，且最大字符限制为 **200,000** 字符。

---

## 2. 字段详细规范

| 字段名称          | 类型       | 是否必填 | 约束与长度限制                      | 说明                                                                                   |
| :---------------- | :--------- | :------- | :---------------------------------- | :------------------------------------------------------------------------------------- |
| **`title`**       | `string`   | **必填** | 最大 150 字符，不可为空白           | 文章标题。                                                                             |
| **`slug`**        | `string`   | 条件必填 | 最大 150 字符，严格 Kebab-Case 格式 | 文章全局唯一别名 / URL 路径标识。导入时若未通过接口显式指定，则此字段为必填。          |
| **`locale`**      | `string`   | 条件必填 | `zh-CN` 或 `en-US`                  | 本语言版本代号。导入时若未通过接口显式指定，则此字段为必填。                           |
| **`description`** | `string`   | 可选     | 最大 500 字符                       | 文章摘要与 SEO Meta 描述。若未提供，将尝试回退读取 `summary` 字段。                    |
| **`summary`**     | `string`   | 可选     | 最大 500 字符                       | 备用描述字段。仅在 `description` 为空时生效。                                          |
| **`tags`**        | `[]string` | 可选     | 最多 12 个标签                      | 文章标签列表，系统会自动去除前后空白并去重。                                           |
| **`photo`**       | `string`   | 可选     | 合法 URL 链接                       | 文章封面大图 URL（如 Cloudinary 图片地址）。                                           |
| **`date`**        | `string`   | 可选     | `YYYY-MM-DD` 或 RFC3339 格式        | 文章原始发布日期（决定博客列表排序与年份归档）。若未提供，新文章默认使用系统当前时间。 |
| **`updated`**     | `string`   | 可选     | `YYYY-MM-DD` 或 RFC3339 格式        | 文章写作/更新日期。若未提供，将使用系统提交时间。                                      |

---

## 3. 校验规则与细节

### 3.1 文章别名（Slug）规则

- **正则表达式**：`^[a-z0-9]+(?:-[a-z0-9]+)*$`
- **规则要求**：
  - 只能包含小写英文字母（`a-z`）、数字（`0-9`）和短横线（`-`）。
  - 不能以短横线开头或结尾。
  - 不能包含连续短横线（例如禁止 `building--agent`）。
  - 合法示例：`building-go-agents`, `react-19-hooks`, `nextjs-app-router`
  - 非法示例：`My_Post`（含大写和下划线）, `-slug-`（首尾有短横线）, `go--agent`（连续短横线）

### 3.2 语言代码（Locale）归一化规则

系统仅支持以下两种语言，支持以下别名自动映射归一化：

- **中文（简体）**：`zh-CN`（输入 `zh`、`zh-cn`、`zh_cn` 将自动归一化为 `zh-CN`）
- **英文（美国）**：`en-US`（输入 `en`、`en-us`、`en_us` 将自动归一化为 `en-US`）

### 3.3 标签清洗与去重（Tags）

- 支持 YAML 行内数组 `[Go, Web]` 或多行列表形式：
  ```yaml
  tags:
    - Go
    - AI Agent
  ```
- 自动剔除首尾空白字符串与纯空标签。
- 自动去重并保持原文中的出现顺序。
- 超过 12 个标签时将触发错误：`a post can have at most 12 tags`。

### 3.4 时间格式（Date 与 Updated）

- **`date`**：文章的原始发布时间，直接对应数据库主表 `posts.created_at`，决定博客前台的**发布时间排序**与**年份归档**。
- **`updated`**：文章的更新/修订时间，对应多语言子表 `post_translations.source_updated_at`，用于展示文章的最后修改日期。

两者均支持以下两种标准格式：

1. **短日期格式**（推荐）：`YYYY-MM-DD`（如 `2025-05-20`）
2. **RFC3339 完整时间**：`YYYY-MM-DDTHH:MM:SSZ`（如 `2025-05-20T10:00:00Z`）

---

## 4. 示例模版

### 4.1 中文文章全字段模版 (`zh-CN`)

```markdown
---
slug: building-go-agents
locale: zh-CN
title: 使用 Go 构建现代 AI Agent 架构
description: 深入解析如何基于 Go 语言构建高性能、可扩展的自主智能体系统，涵盖工具调用、状态管理与执行循环。
tags:
  - Go
  - AI Agent
  - 系统架构
photo: https://res.cloudinary.com/example/image/upload/v1/covers/agent.webp
date: 2025-05-20
updated: 2026-09-16
---

# 使用 Go 构建现代 AI Agent 架构

这里是文章正文内容...
```

### 4.2 英文文章对应版本模版 (`en-US`)

同一篇文章的英文版本使用相同的 `slug`，但拥有独立的 `locale`、`title`、`description` 和正文：

```markdown
---
slug: building-go-agents
locale: en-US
title: Building Modern AI Agents with Go
description: An in-depth dive into designing high-performance and extensible autonomous agent architectures with Go.
tags:
  - Go
  - AI Agent
  - Architecture
photo: https://res.cloudinary.com/example/image/upload/v1/covers/agent.webp
date: 2025-05-20
updated: 2026-09-16
---

# Building Modern AI Agents with Go

Here is the article content in English...
```

### 4.3 极简可用模版

最少仅需提供必填字段：

```markdown
---
slug: quick-start-notes
locale: zh-CN
title: 快速入门笔记
---

正文从这里开始。
```

---

## 5. 常见报错与排查

| 错误信息                                                        | 原因                                  | 解决方法                                             |
| :-------------------------------------------------------------- | :------------------------------------ | :--------------------------------------------------- |
| `markdown front-matter is required`                             | 文档首行未以 `---` 开头               | 确保文件第 1 行紧接着输入 `---`，不要留空行。        |
| `markdown front-matter is not closed`                           | 缺少闭合的 `---` 分隔线               | 检查元数据末尾是否包含独立的 `---`。                 |
| `front-matter title is required`                                | 缺少 `title` 字段或标题为空           | 在 YAML 头部添加非空的 `title` 字段。                |
| `markdown content is required`                                  | 正文内容为空                          | 在闭合的 `---` 之后输入正文内容。                    |
| `slug must contain lowercase letters, numbers and hyphens only` | `slug` 包含大写字母、下划线或非法字符 | 转换为纯小写字母与短中划线连接，如 `my-first-post`。 |
| `locale must be zh-CN or en-US`                                 | 语言代码不在支持列表内                | 将 `locale` 设置为 `zh-CN` 或 `en-US`。              |
| `a post can have at most 12 tags`                               | 标签数量超过上限                      | 缩减 `tags` 列表至 12 个以内。                       |
| `front-matter date must be RFC3339 or YYYY-MM-DD`               | 发布日期格式不合规                    | 修正日期格式为标准 `2025-05-20`。                    |
| `front-matter updated must be RFC3339 or YYYY-MM-DD`            | 更新日期格式不合规                    | 修正日期格式为标准 `2026-09-16`。                    |
