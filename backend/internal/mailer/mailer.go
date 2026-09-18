package mailer

import (
	"context"
	"embed"
)

const (
	FromName            = "GopherSocial"
	maxRetries          = 3
	UserWelcomeTemplate = "user_invitation.tmpl"
)

//go:embed "templates"
var FS embed.FS

type Client interface {
	Send(ctx context.Context, templateFile, username, email string, data any, isSandbox bool) error
}
