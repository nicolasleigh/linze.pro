package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"go.uber.org/zap"
)

func TestVisitorIdentityMiddleware(t *testing.T) {
	app := &application{
		config: config{
			env:     "development",
			visitor: visitorConfig{secret: "test-visitor-secret"},
		},
	}

	var firstHash string
	handler := app.VisitorIdentityMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		firstHash = getVisitorHash(r)
		w.WriteHeader(http.StatusNoContent)
	}))

	firstRequest := httptest.NewRequest(http.MethodGet, "/api/v1/posts/example/engagement", nil)
	firstResponse := httptest.NewRecorder()
	handler.ServeHTTP(firstResponse, firstRequest)

	if firstHash == "" {
		t.Fatal("expected visitor hash in request context")
	}

	cookies := firstResponse.Result().Cookies()
	if len(cookies) != 1 {
		t.Fatalf("expected one visitor cookie, got %d", len(cookies))
	}
	if !cookies[0].HttpOnly || cookies[0].SameSite != http.SameSiteLaxMode {
		t.Fatal("visitor cookie is missing security attributes")
	}

	var secondHash string
	secondHandler := app.VisitorIdentityMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		secondHash = getVisitorHash(r)
		w.WriteHeader(http.StatusNoContent)
	}))
	secondRequest := httptest.NewRequest(http.MethodGet, "/api/v1/posts/example/engagement", nil)
	secondRequest.AddCookie(cookies[0])
	secondResponse := httptest.NewRecorder()
	secondHandler.ServeHTTP(secondResponse, secondRequest)

	if secondHash != firstHash {
		t.Fatalf("expected stable visitor hash, got %q then %q", firstHash, secondHash)
	}
	if len(secondResponse.Result().Cookies()) != 0 {
		t.Fatal("valid visitor cookie should not be replaced")
	}
}

func TestSameOriginWriteMiddleware(t *testing.T) {
	app := &application{logger: zap.NewNop().Sugar()}
	handler := app.SameOriginWriteMiddleware(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}))

	tests := []struct {
		name   string
		origin string
		want   int
	}{
		{name: "same origin", origin: "https://linze.pro", want: http.StatusNoContent},
		{name: "cross origin", origin: "https://example.com", want: http.StatusForbidden},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			request := httptest.NewRequest(http.MethodPut, "https://linze.pro/api/v1/posts/example/engagement/like", nil)
			request.Header.Set("Origin", test.origin)
			response := httptest.NewRecorder()
			handler.ServeHTTP(response, request)

			if response.Code != test.want {
				t.Fatalf("expected status %d, got %d", test.want, response.Code)
			}
		})
	}
}
