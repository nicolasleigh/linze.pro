# 🌐 Linze.pro

[![CD Deploy](https://github.com/nicolasleigh/linze.pro/actions/workflows/cd-deploy.yml/badge.svg)](https://github.com/nicolasleigh/linze.pro/actions/workflows/cd-deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](README.md) | [简体中文](README.zh-CN.md)

> A modern, high-performance, full-stack portfolio and bilingual engineering publication platform built with **Next.js 15 (App Router)**, **Golang**, **PostgreSQL**, and **Redis**, backed by **Docker**, **Caddy**, and **OpenTelemetry**.

---

## 📖 System Overview

**Linze.pro** is an enterprise-grade personal engineering platform designed to showcase full-stack projects, publish technical writing, and demonstrate modern web architecture practices. It delivers a robust dual-frontend architecture:

1. **Main Production Platform ([linze.pro](https://linze.pro))**:
   - Built on **Next.js 15 (App Router)** & **React 19** with Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal performance and SEO.
   - Comprehensive internationalization (`/zh-CN` and `/en-US`) with language negotiation, localized alternates, sitemaps, and RSS feeds.
   - Embedded content management system (**Admin CMS**) at `/admin` featuring HttpOnly JWT authentication, Markdown workbench, multi-language revision tracking, and cache revalidation.
2. **Legacy Interactive Archive ([vue.linze.pro](https://vue.linze.pro))**:
   - The original **Vue 3 + Vite** single-page application (SPA), preserved as a live historical showcase demonstrating the architectural evolution from client-side SPA to hybrid server-rendered modern stack.
3. **Core API Backend (`/api/v1`)**:
   - High-throughput **Go** RESTful API with structured layering, PostgreSQL migrations, Redis caching, rate limiting, and distributed tracing.

---

## 🏗️ Architecture

```text
                                  +-------------------+
                                  |   Internet User   |
                                  +---------+---------+
                                            | (HTTPS: 443)
                                            v
                     +----------------------------------------------+
                     |                Caddy Reverse Proxy           |
                     +----------------------+-----------------------+
                                            |
                 +--------------------------+--------------------------+
                 | (linze.pro)              | (vue.linze.pro)          | (/api/v1/*)
                 v                          v                          v
       +--------------------+     +-------------------+      +--------------------+
       |  Next.js 15 App    |     |  Static Vue Dist  |      |   Go RESTful API   |
       |  (Port: 3000)      |     |  (Static Files)   |      |   (Port: 8085)     |
       |  - Public SSR/SSG  |     +-------------------+      |  - Chi Router      |
       |  - Route Handlers  |                                |  - Auth / JWT      |
       |  - Admin CMS       |----+                           |  - Analytics       |
       +--------------------+    | (Internal /api/v1)        |  - Translations    |
                                 +-------------------------->+--------------------+
                                                                       |
                                             +-------------------------+-------------------------+
                                             |                                                   |
                                             v                                                   v
                                   +-------------------+                               +-------------------+
                                   |   PostgreSQL 16   |                               |       Redis       |
                                   |  (Port: 5432)     |                               |  (Port: 6379)     |
                                   +-------------------+                               +-------------------+
```

---

## 🛠️ Tech Stack Matrix

| Domain                  | Technology                                    | Purpose & Highlights                                                          |
| :---------------------- | :-------------------------------------------- | :---------------------------------------------------------------------------- |
| **Primary Frontend**    | Next.js 15 (App Router), React 19, TypeScript | Server Components, SSG/SSR, localized route handlers, Tailwind CSS            |
| **Legacy Frontend**     | Vue 3, Vite, Pinia, Tailwind CSS              | Preserved SPA archive, i18next-vue                                            |
| **Backend API**         | Go 1.23, `chi/v5`                             | RESTful endpoints, clean architecture, JWT auth, CORS wildcard, rate limiting |
| **Primary Database**    | PostgreSQL 16                                 | Relational data, localized translation schema, revision history               |
| **Cache & Session**     | Redis 6.2                                     | Metrics caching, rate limit counters, temporary session store                 |
| **Observability**       | OpenTelemetry, Prometheus, Jaeger, Grafana    | Distributed tracing (OTLP), low-cardinality metrics export, dashboarding      |
| **Reverse Proxy & TLS** | Caddy 2                                       | Automatic Let's Encrypt TLS, HTTP/2 & HTTP/3, reverse proxy routing           |
| **Containerization**    | Docker, Docker Compose                        | Multi-stage Docker builds, container orchestration, networking                |
| **CI / CD**             | GitHub Actions                                | Automated lint, race detector tests, remote zero-downtime SSH deploy          |

---

## ✨ Key Features

### 1. Bilingual Content & SEO Architecture

- **Dual Locale Routing**: Native `/zh-CN` and `/en-US` route structures with automatic client preference detection via `Accept-Language`.
- **Search Engine Optimization**: Canonical tags, dynamic localized XML sitemaps, Open Graph metadata, and RSS feeds.
- **Translation Schema**: PostgreSQL tables split article identity (`posts`) from localized markdown content (`post_translations`), supporting independent slug-locale versions.

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

### 2. Full-Stack Editorial CMS (`/admin`)

- **Secure Authentication**: Admin authentication against Go API with token encapsulated in HttpOnly, SameSite cookies via Next.js Route Handlers (BFF architecture — browser never touches raw JWT).
- **Article Workbench**: Live Markdown preview, asset management, multi-language revision logs (`post_translation_revisions`), and optimistic locking.
- **Instant Revalidation**: Next.js On-Demand Tag & Path Revalidation ensures updates reflect immediately on production without full rebuilds.
- **Dedicated Management APIs**:
  ```text
  POST /api/v1/posts/import
  PUT  /api/v1/posts/{slug}/translations/{locale}
  GET  /api/v1/posts/{slug}/translations
  ```

### 3. Analytics & Engagement

- **Privacy-Friendly Visitor Tracking**: Signed HttpOnly visitor cookie with cryptographic salt (`VISITOR_SECRET`), hashing visitor identifiers before database persistence.
- **Engagement Counters**: Deduplicated view and like tracking with rate limiting protection.

### 4. Enterprise Observability & Monitoring

- **Prometheus Metrics**: Exported at `/metrics` over internal Docker network (API latency histograms, HTTP status counters, database connection pool statistics).
- **Distributed Tracing**: Native OpenTelemetry instrumentation sending traces via OTLP to Jaeger for end-to-end request tracing.
- **Pre-provisioned Dashboards**: Grafana pre-configured with Prometheus and Jaeger datasources (`docker compose --profile observability up -d`).

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Go** (1.23+)
- **Node.js** (v22+) & **npm**
- **Docker** & **Docker Compose**
- **Make**

### Quick Start

1. **Clone repository**:

   ```bash
   git clone https://github.com/nicolasleigh/linze.pro.git
   cd linze.pro
   ```

2. **Environment Configuration**:

   ```bash
   cp backend/.envrc.example backend/.envrc  # Configure DB credentials & secrets
   cp frontend-next/.env.example frontend-next/.env.local
   ```

3. **Start with Make**:

   ```bash
   # Start backend (Go) + Next.js frontend concurrently
   make dev

   # Or start backend with Air hot reload + Next.js frontend
   make dev/air

   # Start with full observability stack (Prometheus, Jaeger, Grafana)
   docker compose --profile observability up -d
   ```

4. **Service URLs**:
   - Next.js Frontend: `http://localhost:3000`
   - Go Backend API: `http://localhost:8085`
   - Grafana Dashboard: `http://localhost:3001`
   - Jaeger Tracing: `http://localhost:16686`
   - Prometheus: `http://localhost:9090`

---

## 🚢 CI/CD & Deployment

This project uses **GitHub Actions** for automated testing, builds, and cloud deployment:

- **Backend CI (`.github/workflows/ci-backend.yml`)**: Executes `go mod verify`, `go vet`, race detector tests (`go test -race ./...`), and binary compilation.
- **Frontend CI (`.github/workflows/ci-frontend.yml`)**: Runs ESLint, TypeScript validation, and Next.js production build.
- **Production CD (`.github/workflows/cd-deploy.yml`)**: On push to `main`, tests are re-verified, followed by automated SSH deployment to the production server:
  - Pulls latest commit from `origin/main`
  - Rebuilds and restarts Docker containers (`backend` and `frontend`)
  - Automatically executes database migrations (`golang-migrate`)

### Required GitHub Secrets

Configure these secrets in repository settings (**Settings > Secrets and variables > Actions**):

| Secret           | Description                      | Example                                   |
| :--------------- | :------------------------------- | :---------------------------------------- |
| `SERVER_HOST`    | Remote server IP / domain        | `106.14.126.186`                          |
| `SERVER_USER`    | SSH user                         | `nicolas`                                 |
| `SERVER_SSH_KEY` | Private SSH key (ED25519 or RSA) | `-----BEGIN OPENSSH PRIVATE KEY----- ...` |
| `SERVER_PORT`    | SSH port (optional, default: 22) | `22`                                      |

### Legacy Vue Blog Deployment

The archived Vue 3 SPA is served directly via Caddy from `/home/nicolas/linze.pro/vue-build/dist`:

```bash
make bs  # Builds frontend/dist locally and rsyncs to cloud server
```

---

## 📄 License & Contact

- **Author**: Nicolas Leigh
- **Website**: [https://linze.pro](https://linze.pro)
- **Legacy Blog**: [https://vue.linze.pro](https://vue.linze.pro)
- **GitHub**: [@nicolasleigh](https://github.com/nicolasleigh)

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
