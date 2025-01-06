include .envrc
MIGRATIONS_PATH = ./cmd/migrate/migrations

.PHONY: migrate-create
migration:
# https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
	@migrate create -seq -ext sql -dir $(MIGRATIONS_PATH) $(filter-out $@,$(MAKECMDGOALS))

.PHONY: migrate-up
migrate-up:
	@migrate -path $(MIGRATIONS_PATH) -database $(DB_ADDR) up

PHONY: migrate-down
migrate-down:
	@migrate -path $(MIGRATIONS_PATH) -database $(DB_ADDR) down $(filter-out $@,$(MAKECMDGOALS))

get-health:
	@curl http://localhost:4000/v1/health $(filter-out $@,$(MAKECMDGOALS))

fmt:
	@go fmt ./...