package observability

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHTTPMiddlewareUsesRouteTemplate(t *testing.T) {
	metrics := NewMetrics()
	handler := metrics.HTTPMiddleware(func(*http.Request) string {
		return "/api/v1/posts/{slug}"
	}, http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusCreated)
		_, _ = w.Write([]byte("ok"))
	}))

	req := httptest.NewRequest(http.MethodPost, "/api/v1/posts/private-slug", nil)
	res := httptest.NewRecorder()
	handler.ServeHTTP(res, req)

	if res.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d", res.Code)
	}

	metricsRes := httptest.NewRecorder()
	metrics.Handler().ServeHTTP(metricsRes, httptest.NewRequest(http.MethodGet, "/metrics", nil))
	body := metricsRes.Body.String()
	if !strings.Contains(body, `blog_http_requests_total{method="POST",route="/api/v1/posts/{slug}",status="201"} 1`) {
		t.Fatalf("expected route-template request metric, got:\n%s", body)
	}
	if strings.Contains(body, "private-slug") {
		t.Fatal("metrics must not contain raw slug cardinality")
	}
}

func TestBusinessMetrics(t *testing.T) {
	metrics := NewMetrics()
	metrics.LikeAttempt("request")
	metrics.LikeCreated()
	metrics.ViewAttempt("request")
	metrics.ViewDuplicate()
	metrics.RateLimitRejected("engagement_ip")

	res := httptest.NewRecorder()
	metrics.Handler().ServeHTTP(res, httptest.NewRequest(http.MethodGet, "/metrics", nil))
	body := res.Body.String()
	for _, metric := range []string{
		`blog_engagement_like_created_total 1`,
		`blog_engagement_view_duplicates_total 1`,
		`blog_security_rate_limit_rejected_total{scope="engagement_ip"} 1`,
	} {
		if !strings.Contains(body, metric) {
			t.Fatalf("expected %q in metrics output, got:\n%s", metric, body)
		}
	}
}

func TestSetupTracingDisabled(t *testing.T) {
	tracing, err := SetupTracing(context.Background(), TracingConfig{Enabled: false})
	if err != nil {
		t.Fatalf("disabled tracing should not fail: %v", err)
	}
	if err := tracing.Shutdown(context.Background()); err != nil {
		t.Fatalf("disabled tracing shutdown should be a no-op: %v", err)
	}
}
