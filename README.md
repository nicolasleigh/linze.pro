# 🌐 Linze.pro

**A modern, multilingual blog app built with Vue and Go to showcase my portfolio and share technical articles.**

------

## 📖 Project Overview

**Linze.pro** is a full-stack blog platform where I present my portfolio projects and publish technical articles in both **English** and **Chinese**. The app allows visitors to explore posts by tags, view blog statistics like views and likes, and learn more about me and my work.

As the admin, I can create and manage blog content via a secure backend interface. The platform is designed with a clean, responsive UI and built on a scalable architecture optimized for performance and security.

------

## 🎯 Motivation

I created Linze.pro as a personal platform to:

* **Showcase my portfolio** in a centralized, accessible format
* **Share technical insights** and experiences with a broader audience
* **Practice full-stack development** using modern technologies and real-world requirements
* **Explore multilingual content handling** for better accessibility

This project reflects my commitment to clean code, performance optimization, and elegant user experiences.

------

## 👨‍💻 My Role

I was the **sole designer and developer** of the entire project, responsible for:

* UI/UX design and responsive layout with **Vue.js** and **Tailwind CSS**
* Backend architecture, API design, and implementation using **Golang** and **chi**
* Database modeling and management with **PostgreSQL**
* Security implementations, including **JWT authentication**, **rate limiting**, and **CORS**
* Caching with **Redis** for better performance
* CI/CD setup with **GitHub Actions**
* **Dockerization** and deployment with **Docker Compose** and **Caddy**

------

## ⚙️ Development Process

1. **Frontend**: Built with Vue.js + Tailwind CSS to create a clean, mobile-friendly UI with multilingual support.
2. **Backend**: Developed a RESTful API using Go and chi, with strict CORS, JWT authentication, and logging.
3. **Database**: Structured PostgreSQL schemas to support blog posts, tags, user stats, and translations.
4. **DevOps**: Containerized the app using Docker and managed deployments via Docker Compose and Caddy.
5. **CI/CD & Testing**: Implemented automated GitHub Actions workflows and wrote unit/integration tests.

------

## 🛠️ Tech Stack

| Layer          | Technologies                                  |
| -------------- | --------------------------------------------- |
| **Frontend**   | Vue.js, Tailwind CSS                          |
| **Backend**    | Golang, chi                                   |
| **Database**   | PostgreSQL                                    |
| **Middleware** | JWT, Redis, CORS, Rate Limiting, Logging      |
| **DevOps**     | Docker, Docker Compose, GitHub Actions, Caddy |
| **Docs**       | Swagger (for backend API documentation)       |

------

## ✨ Key Features

* **🌍 Multilingual Support**: English and Chinese content with proper i18n structure
* **🏷️ Tag Filtering**: Users can filter posts by tags for easier content discovery
* **📊 Blog Analytics**: View and like counters provide insight into post popularity
* **🛠 Admin Interface**: Secure admin panel for creating, editing, and managing posts

------

## 🧠 Challenges & Solutions

* **Multilingual Support**: Designed a flexible schema in PostgreSQL to support multiple languages without redundancy.
* **Security**: Applied JWT-based authentication, strict CORS settings, and rate-limiting to protect the API.
* **Performance**: Integrated Redis caching to minimize database load and improve response times.

------

## 📚 What I Learned

* Gained hands-on experience in building and deploying full-stack apps with **Golang and Vue**
* Learned best practices for building **multilingual apps**
* Improved skills in **containerization**, **CI/CD**, and **backend optimization**
* Understood how to design **secure, scalable APIs** with production-readiness in mind

------

## 🚀 Future Improvements

* 🔍 **SEO Optimization** – Improve visibility and ranking of posts in search engines

------

## 🔐 Anonymous engagement configuration

The Go API requires a private `VISITOR_SECRET` in production. It signs the anonymous,
HttpOnly visitor cookie and hashes visitor identifiers before they are persisted. Use
a long random value and keep it out of source control. Development falls back to a
development-only value when the variable is omitted.

After updating the environment, apply the latest database migration before starting
the API. Browser traffic should reach `/api/v1` through the same-origin Caddy proxy;
the Next.js development server proxies that path to `BLOG_API_URL`.

------

## 📝 Markdown articles and translations

Each article keeps shared identity and metrics in `posts`, while localized Markdown
content lives in `post_translations`. Chinese and English are independent versions
of the same slug and every save creates a row in `post_translation_revisions`.

```md
---
slug: building-go-agents
locale: zh-CN
title: 使用 Go 构建 Agent
description: 从工具调用到执行循环
tags: [Go, AI Agent]
photo: https://example.com/cover.webp
updated: 2026-09-12
---

# 正文
```

Public articles use `/{locale}/posts/{slug}`. When the requested translation is
missing, the API falls back to Chinese and then to any available translation while
returning the requested and resolved locales explicitly.

The public Next.js site also has localized home, writing, projects, case-study,
about, error, and RSS pages under `/zh-CN` and `/en-US`. The site-wide language
control replaces the current history entry and preserves search filters. Legacy
unprefixed URLs redirect according to `Accept-Language`; locale-specific URLs are
the canonical, indexable pages. The sitemap includes localized alternates, while
article alternates include only translations that actually exist. The admin area
remains at `/admin` with its existing Chinese editorial UI.

Authenticated management endpoints:

```text
POST /api/v1/posts/import
PUT  /api/v1/posts/{slug}/translations/{locale}
GET  /api/v1/posts/{slug}/translations
```

The Next.js content backend is available at `/admin/login`. It authenticates
against the Go API, verifies the `admin` role, and stores the short-lived JWT in
an HttpOnly, same-site cookie. Browser-side article requests go through protected
Next.js route handlers, so the bearer token is never exposed to client code.

After signing in, `/admin` shows content and translation completeness metrics,
`/admin/articles` provides the searchable article index, and the create/edit
workbench supports Markdown upload, independent Chinese/English versions,
optimistic locking, cache revalidation, and translation revision history.

------

## 🚀 CI/CD & Deployment

This project uses **GitHub Actions** for continuous integration and automated deployment:

- **Backend CI (`.github/workflows/ci-backend.yml`)**: Runs `go mod verify`, `go vet`, race detector tests (`go test -race`), and binary compilation on pull requests and pushes to `main`/`develop`.
- **Frontend CI (`.github/workflows/ci-frontend.yml`)**: Runs ESLint, TypeScript typecheck, and production Next.js standalone build on pull requests and pushes to `main`/`develop`.
- **Production CD (`.github/workflows/cd-deploy.yml`)**: Triggered on push to `main` (or manual trigger). Validates tests and builds before securely SSHing into the cloud server to pull the latest code, build/restart Docker containers (`blog-backend` and `blog-frontend`), and apply database migrations.

### Required GitHub Secrets

Configure these secrets in your repository settings (**Settings > Secrets and variables > Actions**):

| Secret | Description | Example |
| :--- | :--- | :--- |
| `SERVER_HOST` | Remote server IP / domain | `106.14.126.186` |
| `SERVER_USER` | SSH user | `nicolas` |
| `SERVER_SSH_KEY` | Private SSH key (ED25519 or RSA) | `-----BEGIN OPENSSH PRIVATE KEY----- ...` |
| `SERVER_PORT` | SSH port (optional, default: 22) | `22` |

------

## 📌 Summary

**Linze.pro** is more than just a blog — it’s a dynamic platform for content publishing, a portfolio hub, and a real-world demonstration of my full-stack development capabilities.

By combining a performant Go backend with a clean Vue frontend and robust DevOps practices, I’ve built a secure, scalable, and user-friendly application ready for real-world use.

------

## 📬 Contact

**Author**: Nicolas Leigh
 **Website**: [https://linze.pro](https://linze.pro/)
 **GitHub**: [@nicolasleigh](https://github.com/nicolasleigh)
