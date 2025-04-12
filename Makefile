include .envrc
MIGRATIONS_PATH = ./cmd/migrate/migrations

.PHONY: migration migrate-up migrate-down get-health fmt run air seed gen-docs test

migration:
# https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
	@migrate create -seq -ext sql -dir $(MIGRATIONS_PATH) $(filter-out $@,$(MAKECMDGOALS))

migrate-up:
	@migrate -path $(MIGRATIONS_PATH) -database $(DB_ADDR) up

migrate-down:
	@migrate -path $(MIGRATIONS_PATH) -database $(DB_ADDR) down $(filter-out $@,$(MAKECMDGOALS))

get-health:
	@curl http://localhost:4000/v1/health $(filter-out $@,$(MAKECMDGOALS))

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