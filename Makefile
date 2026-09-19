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
	@echo "  make obs/remote/start    - Start Prometheus, Jaeger, Grafana on cloud server"
	@echo "  make obs/remote/stop     - Stop Prometheus, Jaeger, Grafana on cloud server"
	@echo "  make obs/tunnel          - Open SSH port forwarding for Grafana, Jaeger, Prometheus"
	@echo "  make obs/tunnel/bg       - Open SSH tunnel in background"

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

.PHONY: deploy/prod
deploy/prod:
	git pull origin main
	docker compose up -d --build backend frontend
	-docker exec blog-backend migrate -database ${CLOUD_DB_DSN} -path ${MIGRATIONS_PATH} up
	docker image prune -f

.PHONY: envrc
envrc:
	scp backend/.envrc nicolas@106.14.126.186:~/linze.pro/backend/.envrc

# -----------------------------------------------------------------------------
# Observability & Remote Tunnels
# -----------------------------------------------------------------------------

REMOTE_SERVER ?= nicolas@106.14.126.186

.PHONY: obs/remote/start
obs/remote/start:
	@echo "Starting Prometheus, Jaeger, and Grafana on remote server..."
	ssh $(REMOTE_SERVER) "cd ~/linze.pro && docker compose --profile observability up -d prometheus jaeger grafana"

.PHONY: obs/remote/stop
obs/remote/stop:
	@echo "Stopping observability stack on remote server to free memory..."
	ssh $(REMOTE_SERVER) "cd ~/linze.pro && docker compose stop prometheus jaeger grafana"

.PHONY: obs/tunnel
obs/tunnel:
	@echo "Opening SSH tunnel for remote Observability stack..."
	@echo "  👉 Grafana:    http://localhost:3001 (admin / admin)"
	@echo "  👉 Jaeger:     http://localhost:16686"
	@echo "  👉 Prometheus: http://localhost:9090"
	@echo "Press Ctrl+C to close the tunnel."
	ssh -N -L 3001:localhost:3001 -L 16686:localhost:16686 -L 9090:localhost:9090 $(REMOTE_SERVER)

.PHONY: obs/tunnel/bg
obs/tunnel/bg:
	@echo "Opening background SSH tunnel for Grafana (3001), Jaeger (16686), Prometheus (9090)..."
	ssh -fN -L 3001:localhost:3001 -L 16686:localhost:16686 -L 9090:localhost:9090 $(REMOTE_SERVER)
	@echo "Tunnel established in background. Access at http://localhost:3001"