//go:build ignore

package main

import (
	"context"
	"fmt"
	"log"

	"github.com/nicolasleigh/social/internal/db"
	"github.com/nicolasleigh/social/internal/env"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	username := env.GetString("ADMIN_USERNAME", "")
	email := env.GetString("ADMIN_EMAIL", "")
	password := env.GetString("ADMIN_PASSWORD", "")
	if password == "" {
		log.Fatal("环境变量 ADMIN_PASSWORD 不能为空，请设置后重试 (例如: ADMIN_PASSWORD='xxx' go run scripts/create_admin.go)")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("密码哈希失败: %v", err)
	}

	dsn := env.GetString("DB_DSN", env.GetString("DB_ADDR", "postgres://admin:adminpassword@localhost:5432/social?sslmode=disable"))
	database, err := db.New(dsn, 3, 3, "15m")
	if err != nil {
		log.Fatalf("连接数据库失败: %v", err)
	}
	defer database.Close()

	query := `
		INSERT INTO users (username, email, password, role_id, is_active)
		VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = 'admin'), true)
		ON CONFLICT (email) DO UPDATE 
		SET role_id = (SELECT id FROM roles WHERE name = 'admin'),
		    password = EXCLUDED.password,
		    is_active = true;
	`
	_, err = database.ExecContext(context.Background(), query, username, email, hash)
	if err != nil {
		log.Fatalf("创建管理员失败: %v", err)
	}

	fmt.Printf("✅ 管理员 %s (%s) 创建/更新成功！\n", username, email)
}