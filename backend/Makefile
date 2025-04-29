include .envrc
MIGRATIONS_PATH = ./cmd/migrate/migrations

.PHONY: migration migrate/up migrate/down migrate/force get-health fmt run air seed gen-docs test

migration:
	@migrate create -seq -ext sql -dir ${MIGRATIONS_PATH} ${name}

migrate/up:
	@migrate -path ${MIGRATIONS_PATH} -database ${DB_ADDR} up

migrate/down:
	@migrate -path ${MIGRATIONS_PATH} -database ${DB_ADDR} down ${num}

migrate/force:
	@migrate -path ${MIGRATIONS_PATH} -database ${DB_ADDR} force ${version}

get-health:
	@curl http://localhost:4000/v1/health

fmt:
	@go fmt ./...

run:
	@go run cmd/api/*.go   

air:
	@air

seed:
	@go run cmd/migrate/seed/main.go

gen-docs:
	@swag init -g ./api/main.go -d cmd,internal && swag fmt

test:
	@go test -v ./...