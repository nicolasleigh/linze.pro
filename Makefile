include ./backend/.envrc
MIGRATIONS_PATH=./cmd/migrate/migrations

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
