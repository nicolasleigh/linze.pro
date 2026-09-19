# 🌐 Linze.pro

[![CD Deploy](https://github.com/nicolasleigh/linze.pro/actions/workflows/cd-deploy.yml/badge.svg)](https://github.com/nicolasleigh/linze.pro/actions/workflows/cd-deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](README.md) | [简体中文](README.zh-CN.md)

> 现代化、高性能的全栈个人作品集与双语工程技术博客平台。基于 **Next.js 15 (App Router)**、**Golang**、**PostgreSQL** 和 **Redis** 构建，依托 **Docker**、**Caddy** 与 **OpenTelemetry** 实现高可用部署与企业级全链路可观测性。

---

## 📖 系统概述

**Linze.pro** 是一个企业级个人全栈工程平台，旨在展示开源作品、分享系统设计与深度工程实践。项目采用清晰的**双前端架构（Dual-Frontend）**与高性能后端服务：

1. **主生产平台（[linze.pro](https://linze.pro)）**：
   - 基于 **Next.js 15 (App Router)** 与 **React 19** 构建，采用服务端渲染（SSR）与静态生成（SSG）混合策略，兼具出色的首屏性能与搜索引擎优化（SEO）。
   - 完善的国际化体系（`/zh-CN` 与 `/en-US`），支持客户端语言协商、本地化替代标签（Alternate Tags）、动态站点地图（Sitemap）与 RSS 订阅。
   - 深度集成的后台内容管理系统（**Admin CMS**，位于 `/admin`），基于 HttpOnly JWT 安全 Cookie 鉴权、提供实时 Markdown 写作工作台、多语言版本修订记录与按需缓存重验证机制。
2. **历史交互归档站（[vue.linze.pro](https://vue.linze.pro)）**：
   - 原始 **Vue 3 + Vite** 单页应用（SPA），作为系统演进的在线活水归档完整保留，直观展示从客户端 SPA 到服务端现代架构的技术迭代轨迹。
3. **核心后端 API（`/api/v1`）**：
   - 高吞吐 **Go** RESTful 服务，采用规范的分层架构，集成 PostgreSQL 自动迁移、Redis 高速缓存、细粒度速率限制与分布式链路追踪。

---

## 🏗️ 架构拓扑

```text
                                  +-------------------+
                                  |     公网用户      |
                                  +---------+---------+
                                            | (HTTPS: 443)
                                            v
                     +----------------------------------------------+
                     |                Caddy 反向代理                |
                     +----------------------+-----------------------+
                                            |
                 +--------------------------+--------------------------+
                 | (linze.pro)              | (vue.linze.pro)          | (/api/v1/*)
                 v                          v                          v
       +--------------------+     +-------------------+      +--------------------+
       |   Next.js 15 主站  |     |  Vue 3 静态资源包 |      |   Go RESTful API   |
       |   (端口: 3000)     |     |  (静态文件服务)   |      |   (端口: 8085)     |
       |   - 公开 SSR/SSG   |     +-------------------+      |  - Chi 路由框架    |
       |   - 路由处理器 BFF |                                |  - JWT 鉴权        |
       |   - Admin CMS 后台 |----+                           |  - 访客分析统计    |
       +--------------------+    | (内网调用 /api/v1)        |  - 多语言内容接口  |
                                 +-------------------------->+--------------------+
                                                                       |
                                             +-------------------------+-------------------------+
                                             |                                                   |
                                             v                                                   v
                                   +-------------------+                               +-------------------+
                                   |   PostgreSQL 16   |                               |       Redis       |
                                   |   (端口: 5432)    |                               |   (端口: 6379)    |
                                   +-------------------+                               +-------------------+
```

---

## 🛠️ 技术栈矩阵

| 层次 / 领域                     | 技术选型                                      | 职责与亮点                                                      |
| :------------------------------ | :-------------------------------------------- | :-------------------------------------------------------------- |
| **主前端（Primary Frontend）**  | Next.js 15 (App Router), React 19, TypeScript | Server Components, SSG/SSR, 本地化路由处理器, Tailwind CSS      |
| **归档前端（Legacy Frontend）** | Vue 3, Vite, Pinia, Tailwind CSS              | 历史归档 SPA 演示站, i18next-vue                                |
| **后端服务（Backend API）**     | Go 1.23, `chi/v5`                             | RESTful API 架构, 严格 CORS 通配支持, JWT 鉴权, 速率限制        |
| **主数据库（Primary DB）**      | PostgreSQL 16                                 | 关系型业务数据存储, 本地化翻译分离模型, 版本修订表              |
| **高速缓存（Cache & Session）** | Redis 6.2                                     | 访问指标统计缓存, 频率控制计数器, 临时会话存储                  |
| **可观测性（Observability）**   | OpenTelemetry, Prometheus, Jaeger, Grafana    | 分布式链路追踪 (OTLP), 低基数指标采集导出, 自动化看板监控       |
| **反向代理与 TLS**              | Caddy 2                                       | 自动申请 Let's Encrypt 证书, HTTP/2 & HTTP/3 支持, 动态路由分流 |
| **容器化编排**                  | Docker, Docker Compose                        | 多阶段镜像构建, 隔离容器网络与轻量编排                          |
| **持续交付（CI / CD）**         | GitHub Actions                                | 自动化代码风格检查、数据竞态检测、零停机远程 SSH 自动部署       |

---

## ✨ 核心特性

### 1. 双语内容与 SEO 架构

- **双本地化路由体系**：原生支持 `/zh-CN` 与 `/en-US` 路由，根据客户端 `Accept-Language` 自动协商首选语言。
- **全维度搜索引擎优化**：提供规范链接（Canonical URL）、动态生成的本地化 XML Sitemap、Open Graph 社交元数据以及 RSS 订阅源。
- **多语言数据模型**：PostgreSQL 结构中将文章实体核心指标（`posts`）与本地化 Markdown 正文（`post_translations`）解耦，支持同一文章标识符（Slug）下的独立语言版本。

```markdown
---
slug: building-go-agents
locale: zh-CN
title: 使用 Go 构建 Agent
description: 从工具调用到执行循环
tags: [Go, AI Agent]
photo: https://example.com/cover.webp
updated: 2026-09-12
---

# 正文内容
```

### 2. 全栈内容管理系统（`/admin`）

- **企业级安全鉴权（BFF 架构）**：管理员凭据向 Go API 校验，JWT 令牌通过 Next.js 路由处理器封装在 HttpOnly、SameSite 的安全 Cookie 中，浏览器端 JS 永远无法接触裸 Token，有效防御 XSS。
- **全功能文章工作台**：支持实时 Markdown 预览、独立中英文保存、版本差异与历史记录（`post_translation_revisions`）以及乐观并发锁控制。
- **按需缓存重验证**：采用 Next.js On-Demand Tag / Path Revalidation，文章保存后秒级向公网刷新，无需耗费时间整站全量重构。
- **专属内容管理接口**：
  ```text
  POST /api/v1/posts/import
  PUT  /api/v1/posts/{slug}/translations/{locale}
  GET  /api/v1/posts/{slug}/translations
  ```

### 3. 访客分析与互动统计

- **隐私友好型追踪机制**：通过加盐加密的 `VISITOR_SECRET` 签署 HttpOnly 访客 Cookie，并在落库持久化前单向哈希访客标识，杜绝个人隐私泄露风险。
- **防刷去重计数**：针对阅读量（Views）与点赞量（Likes）实现带限流防护的去重聚合统计。

### 4. 企业级全链路可观测性

- **Prometheus 指标监控**：在内部 Docker 网络下暴露 `/metrics` 端口，实时监控 API 请求延迟分位数、HTTP 状态码分布与数据库连接池状态。
- **分布式链路追踪**：通过 OpenTelemetry 原生打点，基于 OTLP 协议将调用链直接上报至 Jaeger，提供精准的跨服务排障能力。
- **预配置监控看板**：集成 Grafana 并预置 Prometheus 与 Jaeger 数据源及仪表盘模板（可通过 `docker compose --profile observability up -d` 启动）。

---

## 🚀 本地开发与快速启动

### 环境依赖

- **Go** (1.23+)
- **Node.js** (v22+) & **npm**
- **Docker** & **Docker Compose**
- **Make**

### 快速启动步骤

1. **克隆项目代码**：

   ```bash
   git clone https://github.com/nicolasleigh/linze.pro.git
   cd linze.pro
   ```

2. **配置文件准备**：

   ```bash
   cp backend/.envrc.example backend/.envrc  # 配置数据库连接及各组件密钥
   cp frontend-next/.env.example frontend-next/.env.local
   ```

3. **使用 Make 启动服务**：

   ```bash
   # 同时启动 Go 后端 与 Next.js 主前端
   make dev

   # 使用 Air（热重载）启动 Go 后端并联调 Next.js 前端
   make dev/air

   # 启动包含 Prometheus、Jaeger、Grafana 的完整可观测性监控套件
   docker compose --profile observability up -d
   ```

4. **各服务访问地址**：
   - Next.js 主站前端：`http://localhost:3000`
   - Go 后端 API：`http://localhost:8085`
   - Grafana 监控看板：`http://localhost:3001`
   - Jaeger 链路追踪：`http://localhost:16686`
   - Prometheus 指标中心：`http://localhost:9090`

---

## 🚢 CI/CD 与自动化部署

本项目使用 **GitHub Actions** 进行自动化持续集成与部署：

- **后端 CI (`.github/workflows/ci-backend.yml`)**：自动化执行依赖校验 (`go mod verify`)、静态语法分析 (`go vet`)、并发竞态检测 (`go test -race ./...`) 以及二进制编译构建。
- **前端 CI (`.github/workflows/ci-frontend.yml`)**：执行 ESLint 代码检查、TypeScript 类型验证以及 Next.js 生产环境构建。
- **生产环境 CD (`.github/workflows/cd-deploy.yml`)**：主分支（`main`）代码合并后自动触发。在安全运行测试后，通过原生 SSH 连接云服务器执行：
  - 拉取最新代码 (`git pull origin main`)
  - 重新构建并平滑重启 Docker 容器 (`backend` 和 `frontend`)
  - 自动应用数据库增量变更 (`golang-migrate`)

### GitHub 部署机密配置

在 GitHub 仓库管理页面 (**Settings > Secrets and variables > Actions**) 配置以下 Secret：

| 机密名称         | 作用说明                  | 示例值                                    |
| :--------------- | :------------------------ | :---------------------------------------- |
| `SERVER_HOST`    | 云服务器 IP / 域名        | `106.14.126.186`                          |
| `SERVER_USER`    | SSH 登录用户名            | `nicolas`                                 |
| `SERVER_SSH_KEY` | SSH 私钥 (ED25519 或 RSA) | `-----BEGIN OPENSSH PRIVATE KEY----- ...` |
| `SERVER_PORT`    | SSH 端口 (可选，默认 22)  | `22`                                      |

### 旧版 Vue 博客更新与同步

归档的 Vue 3 静态页面由 Caddy 直接托管于云服务器目录 `/home/nicolas/linze.pro/vue-build/dist`：

```bash
make bs  # 在本地执行打包并将 dist 目录增量 rsync 同步至服务器
```

---

## 📄 开源许可与联系方式

- **作者**：Nicolas Leigh（李林泽）
- **主站**：[https://linze.pro](https://linze.pro)
- **旧版博客**：[https://vue.linze.pro](https://vue.linze.pro)
- **GitHub**：[@nicolasleigh](https://github.com/nicolasleigh)

本项目遵循 [MIT License](LICENSE) 开源协议。
