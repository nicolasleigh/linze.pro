package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/nicolasleigh/social/internal/ratelimiter"
)

func TestRateLimiterMiddleware(t *testing.T) {
	cfg := config{
		rateLimiter: ratelimiter.Config{
			RequestsPerTimeFrame: 20,
			TimeFrame:            time.Second * 5,
			Enabled:              true,
		},
		addr: ":8080",
	}

	app := newTestApplication(t, cfg)
	ts := httptest.NewServer(app.mount())
	defer ts.Close()

	client := &http.Client{}
	mockIP := "192.168.1.1"
	marginOfError := 2

	for i := 0; i < cfg.rateLimiter.RequestsPerTimeFrame+marginOfError; i++ {
		req, err := http.NewRequest("GET", ts.URL+"/api/v1/health", nil)
		if err != nil {
			t.Fatalf("could not create request: %v", err)
		}

		req.Header.Set("X-Forwarded-For", mockIP)

		resp, err := client.Do(req)
		if err != nil {
			t.Fatalf("could not send request: %v", err)
		}
		defer resp.Body.Close()

		if i < cfg.rateLimiter.RequestsPerTimeFrame {
			if resp.StatusCode != http.StatusOK {
				t.Errorf("expected status OK; got %v", resp.Status)
			}
		} else {
			if resp.StatusCode != http.StatusTooManyRequests {
				t.Errorf("expected status Too Many Requests; got %v", resp.Status)
			}
		}
	}
}

func TestCorsMiddleware(t *testing.T) {
	cfg := config{
		rateLimiter: ratelimiter.Config{
			RequestsPerTimeFrame: 100,
			TimeFrame:            time.Second * 5,
			Enabled:              false,
		},
		addr: ":8080",
	}

	app := newTestApplication(t, cfg)
	handler := app.mount()

	tests := []struct {
		origin      string
		expectAllow bool
	}{
		{"https://vue.linze.pro", true},
		{"https://linze.pro", true},
		{"https://new.linze.pro", true},
		{"http://localhost:5173", true},
		{"http://localhost:3000", true},
		{"https://malicious-site.com", false},
	}

	for _, tt := range tests {
		t.Run(tt.origin, func(t *testing.T) {
			req, err := http.NewRequest("GET", "/api/v1/health", nil)
			if err != nil {
				t.Fatalf("could not create request: %v", err)
			}
			req.Header.Set("Origin", tt.origin)

			rec := httptest.NewRecorder()
			handler.ServeHTTP(rec, req)

			allowedOrigin := rec.Header().Get("Access-Control-Allow-Origin")
			if tt.expectAllow {
				if allowedOrigin != tt.origin {
					t.Errorf("expected Access-Control-Allow-Origin %q; got %q", tt.origin, allowedOrigin)
				}
			} else {
				if allowedOrigin != "" {
					t.Errorf("expected no Access-Control-Allow-Origin; got %q", allowedOrigin)
				}
			}
		})
	}
}
