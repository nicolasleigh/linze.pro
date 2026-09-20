# Linze.pro

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](README.md) · [简体中文](README.zh-CN.md)

> A bilingual personal portfolio and engineering blog rebuilt with Next.js and Go.

Linze.pro is a real-world portfolio project rather than a static landing page. It combines a bilingual blog, Markdown article management, anonymous engagement, a Go API, PostgreSQL persistence, optional Redis acceleration, and production-oriented observability.

The repository contains two frontends:

- **Next.js frontend**: the actively developed frontend and recommended entry point.
- **Vue frontend**: the legacy SPA kept for compatibility and migration history.

## Architecture

    Browser
        |
        v
    Caddy reverse proxy (optional deployment layer)
        |
        +--> Next.js 16 App Router / React 19 --> Go API
        +--> Legacy Vue 3 + Vite SPA -------> Go API
                                                    |
                                                    +--> PostgreSQL
                                                    +--> Redis (optional)
                                                    +--> Cloudinary (image upload)
                                                    +--> SendGrid (optional email)
                                                    +--> Prometheus / Jaeger (optional)

Caddy is provided as Caddyfile-example. The local Compose files run application services directly and do not start Caddy.

## Implemented capabilities

### Public content platform

- Locale-aware routes for zh-CN and en-US
- Home, article list, article detail, projects, about and RSS pages
- Markdown rendering with article metadata
- Fallback when a requested translation is unavailable
- Canonical URLs, Open Graph metadata, sitemap and robots rules
- Previous/next navigation, reading progress and engagement UI

### Markdown article management

- Admin login and protected article management pages
- Markdown import and translation updates
- Separate article, localized translation and revision data models
- Optimistic version checks for concurrent edits
- On-demand Next.js path/tag revalidation after content updates

### Anonymous engagement

- Signed HttpOnly visitor cookie without requiring registration
- Visitor identifiers hashed before persistence
- PostgreSQL uniqueness constraints for idempotent likes
- Daily per-visitor view deduplication
- Redis-backed engagement rate limiting when Redis is enabled

### Backend and observability

- Go 1.23.4 HTTP server using net/http and go-chi/chi
- Request ID, real IP, logging, recovery, CORS, rate limiting and timeout middleware
- JWT authentication and role-based authorization
- PostgreSQL access through database/sql and explicit SQL
- Context propagation into database, Redis, Cloudinary and SendGrid boundaries
- Root Context, graceful shutdown, readiness draining and managed goroutines
- Prometheus metrics at /metrics
- OpenTelemetry traces exported over OTLP/gRPC when enabled
- Manual spans around HTTP, Store and Redis boundaries

The project deliberately does not currently use Kafka, RabbitMQ, WebSocket, SSE, gRPC, Elasticsearch, RAG, Embeddings, Vector Database or an LLM Agent runtime. They are not required by the current blog domain.

## Technology stack

| Area             | Technology                                               | Role                                                                  |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| Main frontend    | Next.js 16.3.4, React 19.3, TypeScript 5.9               | App Router, Server Components, localized rendering and route handlers |
| Styling/content  | Tailwind CSS 4, react-markdown, GFM, rehype highlighting | UI and Markdown presentation                                          |
| Legacy frontend  | Vue 3.5, Vite 6, Pinia                                   | Existing SPA kept as migration reference                              |
| Backend          | Go 1.23.4, net/http, Chi 5                               | REST API, middleware and lifecycle management                         |
| Database         | PostgreSQL                                               | Users, posts, translations, revisions, comments and engagement        |
| Cache/rate limit | Redis 6.2, go-redis/v9                                   | Optional cache, deduplication and engagement limits                   |
| Authentication   | JWT, Basic Auth, bcrypt                                  | API authentication and protected operations                           |
| Observability    | Prometheus, OpenTelemetry, Jaeger, Grafana               | Metrics and request tracing                                           |
| Deployment       | Docker, Docker Compose, Caddy example                    | Local and production-like packaging                                   |
| Automation       | GitHub Actions                                           | Backend/frontend validation and optional SSH deployment               |

## Repository layout

    backend/                  Go API, migrations and Dockerfile
    backend/cmd/api/           HTTP entrypoint, routes and handlers
    backend/internal/          Auth, store, cache, mailer and observability
    frontend-next/             Active Next.js frontend and admin surface
    frontend/                  Legacy Vue 3 + Vite frontend
    monitoring/                Prometheus and Grafana provisioning
    compose.yaml               Production-like Compose stack
    Caddyfile-example          Reverse proxy routing example
    Makefile                   Development, migration and deployment helpers
    docs/                      Content and project documentation

## Local development

### Prerequisites

- Go 1.23.4+
- Node.js 22+
- npm
- Docker / Docker Compose
- make
- golang-migrate

### Start dependencies

    docker compose -f backend/docker-compose.yaml up -d db redis

Create the ignored file backend/.envrc. Do not commit it. Local development needs values equivalent to:

    ADDR=:8085
    CORS_ALLOWED_ORIGIN=http://localhost:3000
    DB_DSN=postgres://admin:adminpassword@localhost:5432/social?sslmode=disable
    REDIS_ENABLED=true
    REDIS_ADDR=localhost:6379
    AUTH_TOKEN_SECRET=local-only-change-me
    VISITOR_SECRET=local-only-change-me

For the Next.js frontend:

    cp frontend-next/.env.example frontend-next/.env.local

Run migrations and start:

    cd backend
    make migrate/up
    cd ..
    make dev

Or run applications separately:

    make backend/dev
    make frontend/dev

| Service            | URL                                 |
| ------------------ | ----------------------------------- |
| Next.js frontend   | http://localhost:3000               |
| Go API             | http://localhost:8085               |
| Health check       | http://localhost:8085/api/v1/health |
| Readiness check    | http://localhost:8085/api/v1/ready  |
| Prometheus metrics | http://localhost:8085/metrics       |

## Optional observability stack

    docker compose --profile observability up -d

Enable tracing through backend environment variables:

    OTEL_ENABLED=true
    OTEL_SERVICE_NAME=linze-blog-api
    OTEL_EXPORTER_OTLP_ENDPOINT=jaeger:4317
    OTEL_EXPORTER_OTLP_INSECURE=true
    OTEL_TRACES_SAMPLER_ARG=1.0

Local endpoints:

- Grafana: http://localhost:3001
- Prometheus: http://localhost:9090
- Jaeger UI: http://localhost:16686
- Jaeger OTLP/gRPC: localhost:4317

The default Grafana credentials are for local development only.

## API surface

The API is versioned under /api/v1.

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

Generated Swagger assets are under backend/docs.

## Testing and CI

Backend:

    cd backend
    go test ./...
    go test -race ./...
    go vet ./...
    go build ./cmd/api

Frontend:

    cd frontend-next
    npm ci
    npm run lint
    npm run typecheck
    npm run build

GitHub Actions runs these checks for backend and frontend changes.

## Deployment notes

The root compose.yaml describes a production-like topology with PostgreSQL, Go API, Next.js, Redis and optional observability services. It expects deployment-only files such as backend/.envrc and db_password.txt; keep them outside Git.

Caddyfile-example shows routing for the Next.js site, /api/v1, the legacy Vue build and optional static files.

The current CD workflow can pull main and rebuild backend/frontend containers over SSH. It is not a complete zero-downtime deployment system; production should add strict migration failure handling, readiness-based rollout and rollback.

## License

Released under the MIT License. See LICENSE.
