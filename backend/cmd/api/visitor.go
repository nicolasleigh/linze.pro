package main

import (
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"net"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/nicolasleigh/social/internal/observability"
)

// visitorKey 是用于在 request context 中存储访客信息的私有类型，避免与其他包的 context key 发生冲突。
type visitorKey string

// visitorHashCtx 是在 request context 中存取脱敏后的访客哈希的 key。
const visitorHashCtx visitorKey = "visitorHash"

// visitorCookieName 根据环境返回访客 Cookie 的名称。
// 在生产环境中采用 RFC 6265bis 规范的 "__Host-" 前缀（"__Host-blog_vid"），
// 强制要求 HTTPS、仅当前域名生效（禁止跨子域）且 Path=/，能有效防止子域名 Cookie 劫持与投毒（Cookie Tossing）；
// 开发环境使用普通名称 "blog_vid" 以适配本地 HTTP 调试。
func (app *application) visitorCookieName() string {
	if app.config.env == "production" {
		return "__Host-blog_vid"
	}
	return "blog_vid"
}

// signVisitorID 使用应用配置的密钥通过 HMAC-SHA256 对原始 visitorID 进行签名，
// 并返回 URL 安全的 Base64 编码字符串（不含填充等号），防止客户端伪造访客 ID。
func (app *application) signVisitorID(visitorID string) string {
	mac := hmac.New(sha256.New, []byte(app.config.visitor.secret))
	_, _ = mac.Write([]byte(visitorID))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

// visitorToken 将原始 visitorID 和对应的 HMAC 签名拼接为 "<visitorID>.<signature>" 格式，
// 用于写入 Cookie 作为客户端访客凭据。
func (app *application) visitorToken(visitorID string) string {
	return visitorID + "." + app.signVisitorID(visitorID)
}

// parseVisitorToken 解析并校验访客 Cookie 中的 token。
// 通过恒定时间比较（hmac.Equal）验证签名，防止时序攻击（Timing Attack）；
// 校验成功返回原始 visitorID 和 true，若格式非法或签名不匹配则返回 false。
func (app *application) parseVisitorToken(token string) (string, bool) {
	visitorID, signature, found := strings.Cut(token, ".")
	if !found || visitorID == "" || signature == "" {
		return "", false
	}

	expected := app.signVisitorID(visitorID)
	if !hmac.Equal([]byte(signature), []byte(expected)) {
		return "", false
	}
	return visitorID, true
}

// newVisitorID 使用密码学安全随机源（crypto/rand）生成 24 字节（192 位熵）的随机 ID，
// 并返回 URL 安全的 Base64 字符串，确保每个新访客的 ID 全局唯一且不可被预测。
func newVisitorID() (string, error) {
	value := make([]byte, 24)
	if _, err := rand.Read(value); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(value), nil
}

// hashVisitorID 对原始 visitorID 进行加盐（"visitor:"）的 HMAC-SHA256 哈希脱敏并返回 16 进制字符串。
// 作用：数据库和 Redis 中仅存储该脱敏哈希（用于点赞去重、统计阅读量），而不直接存储明文 Cookie ID。
// 即使数据库被泄露，攻击者也无法反向推导客户端的真实 Cookie 凭据。
func (app *application) hashVisitorID(visitorID string) string {
	mac := hmac.New(sha256.New, []byte(app.config.visitor.secret))
	_, _ = mac.Write([]byte("visitor:" + visitorID))
	return hex.EncodeToString(mac.Sum(nil))
}

// VisitorIdentityMiddleware 访客身份识别中间件：
// 1. 尝试从 Cookie 中读取并验签访客令牌；
// 2. 若 Cookie 不存在或验签失败（被篡改），则新生成一个随机 visitorID，并通过 Set-Cookie 写回客户端；
//   - HttpOnly: 阻止客户端 JavaScript 脚本读取，防御 XSS 窃取；
//   - Secure: 生产环境下强制仅 HTTPS 发送；
//   - SameSite: Lax 模式，抵御大部分跨站请求伪造（CSRF）；
//   - MaxAge: 1 年有效期；
//
// 3. 将脱敏后的 visitorHash 注入到 request context 中，供后续 Handler 和限流中间件使用。
func (app *application) VisitorIdentityMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var visitorID string
		cookie, err := r.Cookie(app.visitorCookieName())
		if err == nil {
			visitorID, _ = app.parseVisitorToken(cookie.Value)
		}

		if visitorID == "" {
			visitorID, err = newVisitorID()
			if err != nil {
				app.internalServerError(w, r, err)
				return
			}

			http.SetCookie(w, &http.Cookie{
				Name:     app.visitorCookieName(),
				Value:    app.visitorToken(visitorID),
				Path:     "/",
				MaxAge:   int((365 * 24 * time.Hour).Seconds()),
				HttpOnly: true,
				Secure:   app.config.env == "production",
				SameSite: http.SameSiteLaxMode,
			})
		}

		ctx := context.WithValue(r.Context(), visitorHashCtx, app.hashVisitorID(visitorID))
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// getVisitorHash 从 request context 中提取已注入的脱敏访客哈希标识。
func getVisitorHash(r *http.Request) string {
	visitorHash, _ := r.Context().Value(visitorHashCtx).(string)
	return visitorHash
}

// SameOriginWriteMiddleware 同源写保护中间件：
// 针对数据修改操作（如 POST / PUT 等非安全请求）提供防 CSRF 与跨站攻击保护：
// 1. 放行 GET、HEAD、OPTIONS 等安全读请求；
// 2. 检查现代浏览器 Fetch 元数据头 "Sec-Fetch-Site"，若为 "cross-site" 直接拒绝（403 Forbidden）；
// 3. 校验 "Origin" 请求头，仅允许来自后端自身 Host 或配置的 frontendURL，并在开发环境下宽容放行 localhost。
func (app *application) SameOriginWriteMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet || r.Method == http.MethodHead || r.Method == http.MethodOptions {
			next.ServeHTTP(w, r)
			return
		}

		if strings.EqualFold(r.Header.Get("Sec-Fetch-Site"), "cross-site") {
			app.forbiddenError(w, r)
			return
		}

		if origin := r.Header.Get("Origin"); origin != "" {
			parsed, err := url.Parse(origin)
			allowed := err == nil && strings.EqualFold(parsed.Host, r.Host)
			if !allowed && err == nil && app.config.frontendURL != "" {
				frontend, frontendErr := url.Parse(app.config.frontendURL)
				allowed = frontendErr == nil && strings.EqualFold(parsed.Host, frontend.Host)
			}
			if !allowed && err == nil && app.config.env != "production" {
				requestHost := strings.Split(r.Host, ":")[0]
				allowed = parsed.Hostname() == "localhost" && requestHost == "localhost"
			}
			if !allowed {
				app.forbiddenError(w, r)
				return
			}
		}

		next.ServeHTTP(w, r)
	})
}

// EngagementRateLimitMiddleware 互动限流中间件：
// 为点赞、浏览等写操作提供基于 Redis 滑动窗口的双重速率限制，防止恶意脚本/爬虫刷赞刷量：
// 1. 读请求或未开启 Redis 时直接放行；
// 2. 限制维度一（访客维度）：每分钟单个访客（Cookie 对应哈希）最多允许 30 次互动请求；
// 3. 限制维度二（IP 维度）：每分钟单个 IP 最多允许 120 次互动请求，防止恶意用户不断清空 Cookie 绕过访客限流；
// 4. 容灾降级（Fail-Open）：若 Redis 出现故障，记录警告日志并放行请求，优先保障博客正常可用；
// 5. 触发限流时返回 429 Too Many Requests。
func (app *application) EngagementRateLimitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet || !app.config.redisCfg.enabled || app.cacheStorage.RateLimits == nil {
			next.ServeHTTP(w, r)
			return
		}

		host, _, err := net.SplitHostPort(r.RemoteAddr)
		if err != nil {
			host = r.RemoteAddr
		}
		ipRiskKey := app.hashVisitorID("ip:" + host)
		window := time.Minute

		visitorCtx, visitorSpan := observability.StartSpan(r.Context(), "redis.rate_limit.visitor")
		visitorAllowed, visitorErr := app.cacheStorage.RateLimits.Allow(
			visitorCtx, "visitor:"+getVisitorHash(r), 30, window,
		)
		visitorSpan.End()
		ipCtx, ipSpan := observability.StartSpan(r.Context(), "redis.rate_limit.ip")
		ipAllowed, ipErr := app.cacheStorage.RateLimits.Allow(
			ipCtx, "ip:"+ipRiskKey, 120, window,
		)
		ipSpan.End()
		if visitorErr != nil || ipErr != nil {
			app.logger.Warnw("engagement rate limit unavailable", "error", errors.Join(visitorErr, ipErr))
			next.ServeHTTP(w, r)
			return
		}
		if !visitorAllowed || !ipAllowed {
			if app.metrics != nil {
				if !visitorAllowed {
					app.metrics.RateLimitRejected("engagement_visitor")
				}
				if !ipAllowed {
					app.metrics.RateLimitRejected("engagement_ip")
				}
			}
			app.rateLimitExceededResponse(w, r, window.String())
			return
		}

		next.ServeHTTP(w, r)
	})
}
