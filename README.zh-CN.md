# Linze.pro

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](README.md) · [简体中文](README.zh-CN.md)

> 基于 Next.js 与 Go 重构的双语个人作品集与工程技术博客。

Linze.pro 不是简单的静态展示页，而是一个包含真实业务能力的个人项目：双语博客、Markdown 文章管理、匿名点赞与阅读量、Go REST API、PostgreSQL、可选 Redis，以及 Prometheus / OpenTelemetry 可观测性。

仓库保留两个前端：

- **Next.js 前端**：当前主线和推荐入口。
- **Vue 前端**：旧版 SPA，用于兼容和记录迁移过程。

## 系统架构

    浏览器
        |
        v
    Caddy 反向代理（可选部署层）
        |
        +--> Next.js 16 / React 19 ------> Go API
        +--> 旧版 Vue 3 + Vite ---------> Go API
                                             |
                                             +--> PostgreSQL
                                             +--> Redis（可选）
                                             +--> Cloudinary（图片上传）
                                             +--> SendGrid（可选邮件）
                                             +--> Prometheus / Jaeger（可选）

Caddy 配置示例见 Caddyfile-example。本地 Compose 默认不会启动 Caddy。

## 已实现能力

### 公开内容平台

- zh-CN 与 en-US 国际化路由
- 首页、文章列表、文章详情、Projects、About 和 RSS
- Markdown 内容和文章元数据渲染
- 请求语言版本缺失时的降级逻辑
- Canonical、Open Graph、Sitemap、robots 等 SEO 能力
- 上一篇/下一篇、阅读进度和文章互动模块

### Markdown 文章管理

- 管理员登录和受保护的文章管理页面
- Markdown 导入和翻译版本更新
- 文章主体、语言版本、修订记录分离的数据模型
- 基于版本号的乐观锁
- 内容更新后的 Next.js Path/Tag 按需重验证

### 匿名互动

- 签名 HttpOnly 访客 Cookie，无需注册
- 访客标识哈希后再持久化
- PostgreSQL 唯一约束保证点赞幂等
- 按自然日进行访客阅读量去重
- Redis 启用时提供互动接口限流

### Go 后端与可观测性

- Go 1.23.4、标准库 net/http、go-chi/chi
- Request ID、真实 IP、日志、Recovery、CORS、限流和超时中间件
- JWT 鉴权和基于角色的权限校验
- database/sql + 手写 SQL
- Context 贯穿数据库、Redis、Cloudinary 和 SendGrid 调用边界
- root Context、Graceful Shutdown、readiness draining 和后台 goroutine 管理
- /metrics Prometheus 指标端点
- 可选的 OpenTelemetry OTLP/gRPC 链路导出
- HTTP、Store、Redis 调用手动 Span

当前项目没有使用 Kafka、RabbitMQ、WebSocket、SSE、gRPC、Elasticsearch、RAG、Embedding、向量数据库或 LLM Agent。这些技术不是当前博客业务的必要组成部分。

## 技术栈

| 领域       | 技术                                                     | 用途                                                  |
| ---------- | -------------------------------------------------------- | ----------------------------------------------------- |
| 主前端     | Next.js 16.3.4、React 19.3、TypeScript 5.9               | App Router、Server Components、国际化和 Route Handler |
| 样式与内容 | Tailwind CSS 4、react-markdown、GFM、rehype highlighting | UI 和 Markdown 展示                                   |
| 旧版前端   | Vue 3.5、Vite 6、Pinia                                   | 历史 SPA 和迁移参考                                   |
| 后端       | Go 1.23.4、net/http、Chi 5                               | REST API、路由、中间件和生命周期                      |
| 数据库     | PostgreSQL                                               | 用户、文章、翻译、修订、评论和互动数据                |
| 缓存与限流 | Redis 6.2、go-redis/v9                                   | 可选缓存、阅读去重和互动限流                          |
| 鉴权       | JWT、Basic Auth、bcrypt                                  | API 鉴权和受保护操作                                  |
| 可观测性   | Prometheus、OpenTelemetry、Jaeger、Grafana               | 指标和链路追踪                                        |
| 部署       | Docker、Docker Compose、Caddy 示例                       | 本地和生产化打包                                      |
| 自动化     | GitHub Actions                                           | 前后端验证和可选 SSH 部署                             |

## 目录结构

    backend/                  Go API、迁移和 Dockerfile
    backend/cmd/api/           HTTP 入口、路由和 Handler
    backend/internal/          鉴权、Store、Cache、Mailer、Observability
    frontend-next/             当前 Next.js 前端与后台管理页面
    frontend/                  旧版 Vue 3 + Vite 前端
    monitoring/                Prometheus 和 Grafana 配置
    compose.yaml               生产化拓扑的 Compose 配置
    Caddyfile-example          反向代理示例
    Makefile                   开发、迁移和部署命令
    docs/                      内容和项目文档

## 本地开发

### 环境要求

- Go 1.23.4+
- Node.js 22+
- npm
- Docker / Docker Compose
- make
- golang-migrate

### 启动依赖

    docker compose -f backend/docker-compose.yaml up -d db redis

创建不会提交到 Git 的 backend/.envrc。至少需要类似配置：

    ADDR=:8085
    CORS_ALLOWED_ORIGIN=http://localhost:3000
    DB_DSN=postgres://admin:adminpassword@localhost:5432/social?sslmode=disable
    REDIS_ENABLED=true
    REDIS_ADDR=localhost:6379
    AUTH_TOKEN_SECRET=local-only-change-me
    VISITOR_SECRET=local-only-change-me

配置前端：

    cp frontend-next/.env.example frontend-next/.env.local

执行迁移并启动：

    cd backend
    make migrate/up
    cd ..
    make dev

也可以分别启动：

    make backend/dev
    make frontend/dev

| 服务            | 地址                                |
| --------------- | ----------------------------------- |
| Next.js         | http://localhost:3000               |
| Go API          | http://localhost:8085               |
| 健康检查        | http://localhost:8085/api/v1/health |
| Readiness       | http://localhost:8085/api/v1/ready  |
| Prometheus 指标 | http://localhost:8085/metrics       |

## 可选可观测性环境

    docker compose --profile observability up -d

后端环境变量示例：

    OTEL_ENABLED=true
    OTEL_SERVICE_NAME=linze-blog-api
    OTEL_EXPORTER_OTLP_ENDPOINT=jaeger:4317
    OTEL_EXPORTER_OTLP_INSECURE=true
    OTEL_TRACES_SAMPLER_ARG=1.0

本地地址：

- Grafana：http://localhost:3001
- Prometheus：http://localhost:9090
- Jaeger：http://localhost:16686
- Jaeger OTLP/gRPC：localhost:4317

Compose 中的 Grafana 默认账号只适用于本地开发。

## API 概览

接口统一位于 /api/v1：

    GET  /api/v1/posts
    GET  /api/v1/posts/{slug}/localized
    GET  /api/v1/posts/tags
    GET  /api/v1/posts/{slug}/engagement
    PUT  /api/v1/posts/{slug}/engagement/like
    POST /api/v1/posts/{slug}/engagement/view

    POST /api/v1/posts/import
    PUT  /api/v1/posts/{slug}/translations/{locale}
    GET  /api/v1/posts/{slug}/translations
    GET  /api/v1/posts/{slug}/translations/{locale}/revisions

Swagger 文件位于 backend/docs。

## 测试与 CI

后端：

    cd backend
    go test ./...
    go test -race ./...
    go vet ./...
    go build ./cmd/api

前端：

    cd frontend-next
    npm ci
    npm run lint
    npm run typecheck
    npm run build

GitHub Actions 会对前后端变更执行这些检查。

## 部署说明

根目录 compose.yaml 描述了 PostgreSQL、Go API、Next.js、Redis 和可选可观测性服务组成的生产化拓扑。它依赖 backend/.envrc、db_password.txt 等部署文件，这些文件必须放在仓库外部。

Caddyfile-example 展示了主域名、/api/v1、旧版 Vue 站点和静态资源的路由方式。

当前 CD Workflow 会通过 SSH 拉取 main 并重建前后端容器。它不是完整的零停机发布系统；生产环境还应补充严格的迁移失败处理、readiness 摘流和回滚策略。

## License

本项目使用 MIT License，详见 LICENSE。
