package main

// import (
// 	"database/sql"
// 	"log"

// 	"github.com/nicolasleigh/social/internal/db"
// 	"github.com/nicolasleigh/social/internal/env"
// 	"github.com/nicolasleigh/social/internal/store"
// )

// func main() {
// 	addr := env.GetString("DB_ADDR", "postgres://admin:adminpassword@localhost:5432/social?sslmode=disable")
// 	conn, err := db.New(addr, 3, 3, "15m")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer conn.Close()
// 	store := store.NewStorage(conn)

// 	db.Seed(store, &sql.DB{})
// }
