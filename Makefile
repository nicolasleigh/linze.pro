-include ./backend/.envrc
export BLOG_API_URL ?= http://localhost:8085/api/v1
MIGRATIONS_PATH=./cmd/migrate/migrations

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make dev                 - Start backend (Go) and Next.js frontend concurrently"
	@echo "  make dev/air             - Start backend (Air hot reload) and Next.js frontend concurrently"
	@echo "  make dev/vue             - Start backend (Go) and Vue frontend concurrently"
	@echo "  make backend/dev         - Start backend only (go run ./cmd/api)"
	@echo "  make backend/air         - Start backend only with Air"
	@echo "  make frontend/dev        - Start Next.js frontend only (npm run dev)"
	@echo "  make frontend/vue/dev    - Start Vue frontend only (npm run dev)"
	@echo "  make frontend/build      - Build Vue frontend"
	@echo "  make frontend/next/build - Build Next.js frontend"

# -----------------------------------------------------------------------------
# Local Development
# -----------------------------------------------------------------------------

.PHONY: dev
dev:
	@echo "Starting backend and Next.js frontend..."
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
	(cd backend && go run ./cmd/api) & \
	(cd frontend-next && npm run dev) & \
	wait

.PHONY: dev/air
dev/air:
	@echo "Starting backend (Air) and Next.js frontend..."
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
	(cd backend && air) & \
	(cd frontend-next && npm run dev) & \
	wait

.PHONY: dev/vue
dev/vue:
	@echo "Starting backend and Vue frontend..."
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
	(cd backend && go run ./cmd/api) & \
	(cd frontend && npm run dev) & \
	wait

.PHONY: backend/dev
backend/dev:
	@cd backend && go run ./cmd/api

.PHONY: backend/air
backend/air:
	@cd backend && air

.PHONY: frontend/dev
frontend/dev:
	@cd frontend-next && npm run dev

.PHONY: frontend/vue/dev
frontend/vue/dev:
	@cd frontend && npm run dev

.PHONY: frontend/next/build
frontend/next/build:
	@cd frontend-next && npm run build

# -----------------------------------------------------------------------------
# Production & Remote Deployments
# -----------------------------------------------------------------------------

.PHONY: res/send
res/send:
	@rsync -rP resources nicolas@106.14.126.186:~/linze.pro

.PHONY: curl/health/remote
curl/health/remote:
	curl -v https://linze.pro/api/v1/health

.PHONY: compose/build
compose/build:
	sudo docker compose up --build

.PHONY: compose/up
compose/up:
	sudo docker compose up -d

.PHONY: backend/createdb
backend/createdb:
	sudo docker exec -it blog-postgres createdb -U nicolas blog

.PHONY: backend/psql
backend/psql:
	sudo docker exec -it blog-postgres psql -U nicolas blog

.PHONY: backend/migrate/up
backend/migrate/up:
	sudo docker exec blog-backend migrate -database ${CLOUD_DB_DSN} -path ${MIGRATIONS_PATH} up

.PHONY: frontend/build
frontend/build:
	@cd frontend && npm run build && cd ..

.PHONY: frontend/send
frontend/send:
	@cd frontend && rsync -rP dist nicolas@106.14.126.186:~/linze.pro/vue-build && cd ..

.PHONY: bs
bs: frontend/build frontend/send
	@echo build and send finished!
