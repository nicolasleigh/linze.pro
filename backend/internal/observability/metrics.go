package observability

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/common/expfmt"
)

// Metrics 封装了应用程序所有 Prometheus 指标的集合与私有注册表。
// 使用私有 Registry（而不是全局默认的 prometheus.DefaultRegisterer），
// 可以保证单元测试与并发测试隔离，避免不同测试用例或嵌入式部署时互相污染全局状态。
type Metrics struct {
	registry *prometheus.Registry // 应用程序私有的 Prometheus 指标注册中心

	// --- HTTP 系统级指标 ---
	httpRequests      *prometheus.CounterVec   // HTTP 请求总数计数器（按 method, route, status 细分）
	httpDuration      *prometheus.HistogramVec // HTTP 请求处理耗时直方图（按 method, route 细分）
	httpInFlight      prometheus.Gauge         // 当前正在并发处理中的 HTTP 请求实时数量
	httpResponseBytes *prometheus.HistogramVec // HTTP 响应体体积直方图（按 method, route 细分）

	// --- 业务层指标：文章互动（点赞与浏览） ---
	likeAttempts   *prometheus.CounterVec // 文章点赞尝试总数（按 result 区分成功/失败）
	likeCreated    *prometheus.CounterVec // 首次成功创建的新点赞总数
	likeDuplicates *prometheus.CounterVec // 重复点赞被忽略的总数
	viewAttempts   *prometheus.CounterVec // 文章阅读量记录尝试总数（按 result 区分）
	viewCounted    *prometheus.CounterVec // 当日有效计入的新增阅读量总数
	viewDuplicates *prometheus.CounterVec // 当日重复访问被忽略的阅读量总数

	// --- 安全与流控指标 ---
	rateLimitRejected *prometheus.CounterVec // 触发限流被拦截拒绝的请求总数（按 scope 区分，如 IP/全局）

	// --- 业务层指标：国际化与多语言翻译 ---
	translationEvents   *prometheus.CounterVec // 翻译操作生命周期事件总数（按 operation, result, locale 区分）
	translationFallback *prometheus.CounterVec // 请求未命中目标语言而触发降级回退的总数（按 requested_locale, resolved_locale 区分）
}

// NewMetrics 构建并初始化 API 所需的完整指标集合，并完成指标注册。
func NewMetrics() *Metrics {
	m := &Metrics{registry: prometheus.NewRegistry()}

	// 初始化 HTTP 请求总数指标：namespace="blog", subsystem="http", name="requests_total"
	// 标签：method（GET/POST 等）、route（如 /posts/{slug} 路由模板）、status（HTTP 状态码字符串）
	m.httpRequests = prometheus.NewCounterVec(prometheus.CounterOpts{
		Namespace: "blog",
		Subsystem: "http",
		Name:      "requests_total",
		Help:      "Total number of HTTP requests handled by the API.",
	}, []string{"method", "route", "status"})

	// 初始化 HTTP 请求耗时指标（单位：秒），使用 Prometheus 官方推荐的默认耗时分桶（DefBuckets: 0.005s ~ 10s）
	m.httpDuration = prometheus.NewHistogramVec(prometheus.HistogramOpts{
		Namespace: "blog",
		Subsystem: "http",
		Name:      "request_duration_seconds",
		Help:      "HTTP request duration in seconds.",
		Buckets:   prometheus.DefBuckets,
	}, []string{"method", "route"})

	// 初始化在飞（正在并发处理）请求数指标
	m.httpInFlight = prometheus.NewGauge(prometheus.GaugeOpts{
		Namespace: "blog",
		Subsystem: "http",
		Name:      "requests_in_flight",
		Help:      "Number of HTTP requests currently being handled.",
	})

	// 初始化 HTTP 响应大小指标（单位：字节），使用适合 Web API 典型载荷的阶梯分桶（256B 到 1MB）
	m.httpResponseBytes = prometheus.NewHistogramVec(prometheus.HistogramOpts{
		Namespace: "blog",
		Subsystem: "http",
		Name:      "response_size_bytes",
		Help:      "HTTP response size in bytes.",
		Buckets:   []float64{256, 1024, 4 * 1024, 16 * 1024, 64 * 1024, 256 * 1024, 1 * 1024 * 1024},
	}, []string{"method", "route"})

	// 初始化业务级计数器指标
	m.likeAttempts = newBusinessCounter("engagement", "like_attempts_total", "Total article like attempts.", []string{"result"})
	m.likeCreated = newBusinessCounter("engagement", "like_created_total", "Total newly-created article likes.", nil)
	m.likeDuplicates = newBusinessCounter("engagement", "like_duplicates_total", "Total duplicate article like attempts.", nil)
	m.viewAttempts = newBusinessCounter("engagement", "view_attempts_total", "Total article view attempts.", []string{"result"})
	m.viewCounted = newBusinessCounter("engagement", "view_counted_total", "Total newly-counted article views.", nil)
	m.viewDuplicates = newBusinessCounter("engagement", "view_duplicates_total", "Total duplicate daily article views.", nil)
	m.rateLimitRejected = newBusinessCounter("security", "rate_limit_rejected_total", "Total requests rejected by a rate limiter.", []string{"scope"})
	m.translationEvents = newBusinessCounter("translation", "events_total", "Total translation lifecycle events.", []string{"operation", "result", "locale"})
	m.translationFallback = newBusinessCounter("translation", "fallback_total", "Total localized article responses that used a fallback locale.", []string{"requested_locale", "resolved_locale"})

	// 将所有应用层指标注册进私有 registry
	m.registry.MustRegister(m.httpRequests)
	m.registry.MustRegister(m.httpDuration)
	m.registry.MustRegister(m.httpInFlight)
	m.registry.MustRegister(m.httpResponseBytes)
	m.registry.MustRegister(m.likeAttempts)
	m.registry.MustRegister(m.likeCreated)
	m.registry.MustRegister(m.likeDuplicates)
	m.registry.MustRegister(m.viewAttempts)
	m.registry.MustRegister(m.viewCounted)
	m.registry.MustRegister(m.viewDuplicates)
	m.registry.MustRegister(m.rateLimitRejected)
	m.registry.MustRegister(m.translationEvents)
	m.registry.MustRegister(m.translationFallback)

	// 注册 Go 运行时指标（GC、Goroutine 数量、内存分配等）与进程级系统指标（CPU 占用、文件描述符等）
	m.registry.MustRegister(prometheus.NewGoCollector())
	m.registry.MustRegister(prometheus.NewProcessCollector(prometheus.ProcessCollectorOpts{}))
	return m
}

// newBusinessCounter 辅助函数，统一定义属于 "blog" 命名空间的业务级计数器向量。
func newBusinessCounter(subsystem, name, help string, labels []string) *prometheus.CounterVec {
	return prometheus.NewCounterVec(prometheus.CounterOpts{
		Namespace: "blog",
		Subsystem: subsystem,
		Name:      name,
		Help:      help,
	}, labels)
}

// RegisterDB 将 database/sql 的数据库连接池运行状态注册为 Prometheus 指标。
// 注意：该方法只能针对与该 Metrics 实例绑定的数据库实例调用一次。
// 这里使用 GaugeFunc 和 CounterFunc，在 Prometheus 每次抓取数据时按需拉取 db.Stats()，
// 避免了启动后台 goroutine 定时轮询的额外开销。
func (m *Metrics) RegisterDB(db *sql.DB) {
	stats := func() sql.DBStats { return db.Stats() }

	// registerGauge 辅助注册基于动态读取函数的 Gauge 指标
	registerGauge := func(name, help string, value func(sql.DBStats) float64) {
		m.registry.MustRegister(prometheus.NewGaugeFunc(prometheus.GaugeOpts{
			Namespace: "blog",
			Subsystem: "db",
			Name:      name,
			Help:      help,
		}, func() float64 { return value(stats()) }))
	}

	// registerCounter 辅助注册基于动态读取函数的 Counter 指标
	registerCounter := func(name, help string, value func(sql.DBStats) float64) {
		m.registry.MustRegister(prometheus.NewCounterFunc(prometheus.CounterOpts{
			Namespace: "blog",
			Subsystem: "db",
			Name:      name,
			Help:      help,
		}, func() float64 { return value(stats()) }))
	}

	// 注册连接池的关键指标：
	registerGauge("open_connections", "Current open database connections.", func(s sql.DBStats) float64 { return float64(s.OpenConnections) })
	registerGauge("in_use_connections", "Current database connections in use.", func(s sql.DBStats) float64 { return float64(s.InUse) })
	registerGauge("idle_connections", "Current idle database connections.", func(s sql.DBStats) float64 { return float64(s.Idle) })
	registerCounter("wait_count_total", "Total waits for a database connection.", func(s sql.DBStats) float64 { return float64(s.WaitCount) })
	registerCounter("wait_duration_seconds_total", "Total time spent waiting for a database connection.", func(s sql.DBStats) float64 { return s.WaitDuration.Seconds() })
}

// Handler 返回用于响应 Prometheus 抓取请求（如 GET /metrics）的 HTTP Handler。
func (m *Metrics) Handler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		// 收集私有 registry 中的全部指标数据
		families, err := m.registry.Gather()
		if err != nil {
			http.Error(w, "failed to gather metrics", http.StatusInternalServerError)
			return
		}
		// 使用标准的 Prometheus 文本格式 (Text format version 0.0.4) 序列化输出
		w.Header().Set("Content-Type", string(expfmt.FmtText))
		encoder := expfmt.NewEncoder(w, expfmt.FmtText)
		for _, family := range families {
			if err := encoder.Encode(family); err != nil {
				return
			}
		}
	})
}

// HTTPMiddleware 是用于记录 HTTP 系统级指标的中间件。
// 为防止指标标签发生“基数爆炸”，routeResolver 必须使用静态的路由模板（如 /posts/{slug}）而非具体的 URL 路径。
// routeResolver 在下游 handler 执行完毕后才被调用，因为此时 chi 路由匹配逻辑已执行完毕并将 RoutePattern 写入上下文。
func (m *Metrics) HTTPMiddleware(routeResolver func(*http.Request) string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		started := time.Now()
		m.httpInFlight.Inc()       // 并发处理中的请求数 +1
		defer m.httpInFlight.Dec() // 请求退出时并发数 -1

		// 使用 statusWriter 装饰原生 ResponseWriter，用于捕获下游写入的状态码与字节数
		sw := &statusWriter{ResponseWriter: w}
		next.ServeHTTP(sw, r)

		// 从请求上下文中提取标准化路由模板，避免将动态参数（如 ID/UUID）直接作为标签
		route := routeResolver(r)
		if route == "" {
			route = "unknown"
		}
		method := r.Method
		status := sw.status
		if status == 0 {
			// 若业务 handler 未显式调用 WriteHeader 便结束，Go net/http 默认视为 200 OK
			status = http.StatusOK
		}

		// 记录指标：请求总数、耗时直方图、响应体积直方图
		m.httpRequests.WithLabelValues(method, route, strconv.Itoa(status)).Inc()
		m.httpDuration.WithLabelValues(method, route).Observe(time.Since(started).Seconds())
		m.httpResponseBytes.WithLabelValues(method, route).Observe(float64(sw.bytes))
	})
}

// statusWriter 是对 http.ResponseWriter 的装饰器包装。
// 核心作用：在完全保留 Go 标准库 net/http 原生行为语义的前提下，捕获下游返回的 HTTP 状态码与响应体字节数。
type statusWriter struct {
	http.ResponseWriter
	status int // 记录写入的 HTTP 状态码（默认为 0）
	bytes  int // 累计写入响应体的总字节数
}

// WriteHeader 拦截下游对响应状态码的设置：
// 1. 保证幂等性：遵循 HTTP 规范，只记录第一次显式写入的状态码，忽略后续重复调用；
// 2. 将状态码传递给底层的 ResponseWriter。
func (w *statusWriter) WriteHeader(status int) {
	if w.status != 0 {
		return
	}
	w.status = status
	w.ResponseWriter.WriteHeader(status)
}

// Write 拦截响应内容的写入：
// 1. 若业务 handler 未显式调用 WriteHeader 就直接写数据，模拟 net/http 默认行为隐式置为 200 OK；
// 2. 统计实际写入的字节总数；
// 3. 将字节切片原样写入底层 ResponseWriter。
func (w *statusWriter) Write(body []byte) (int, error) {
	if w.status == 0 {
		w.WriteHeader(http.StatusOK)
	}
	n, err := w.ResponseWriter.Write(body)
	w.bytes += n
	return n, err
}

// Flush 实现 http.Flusher 接口：
// 若底层的 ResponseWriter 支持流式传输（如 SSE 或分块传输），透传调用 Flush()；
// 避免因包装结构体丢失 Flusher 接口导致下游流式断言失败。
func (w *statusWriter) Flush() {
	if w.status == 0 {
		w.WriteHeader(http.StatusOK)
	}
	if flusher, ok := w.ResponseWriter.(http.Flusher); ok {
		flusher.Flush()
	}
}

// Unwrap 实现 Go 1.20+ 的 http.ResponseController 解包协议，
// 使得上层能够沿着包装链解包获取底层原生 ResponseWriter，支持 Hijack 等高级网络控制。
func (w *statusWriter) Unwrap() http.ResponseWriter { return w.ResponseWriter }

// RoutePattern 从 chi 请求上下文中提取规范的路由模板字符串（如 "/api/v1/articles/{slug}"）。
// 集中在此处确保所有监控打点只使用低基数的路由模式，避免使用高基数的原始 URL 路径导致内存泄漏。
func RoutePattern(r *http.Request) string {
	if ctx := chi.RouteContext(r.Context()); ctx != nil {
		return ctx.RoutePattern()
	}
	return ""
}

// --- 业务埋点辅助方法（对外提供强类型、统一标签的打点接口） ---

// LikeAttempt 记录一次文章点赞尝试（result 可为 "created", "duplicate", "error" 等）
func (m *Metrics) LikeAttempt(result string) { m.likeAttempts.WithLabelValues(result).Inc() }

// LikeCreated 记录一次成功新增的点赞
func (m *Metrics) LikeCreated() { m.likeCreated.WithLabelValues().Inc() }

// LikeDuplicate 记录一次重复点赞操作
func (m *Metrics) LikeDuplicate() { m.likeDuplicates.WithLabelValues().Inc() }

// ViewAttempt 记录一次文章阅读量上报尝试
func (m *Metrics) ViewAttempt(result string) { m.viewAttempts.WithLabelValues(result).Inc() }

// ViewCounted 记录一次有效计入当日统计的文章阅读
func (m *Metrics) ViewCounted() { m.viewCounted.WithLabelValues().Inc() }

// ViewDuplicate 记录一次当日重复访问而被去重的文章阅读
func (m *Metrics) ViewDuplicate() { m.viewDuplicates.WithLabelValues().Inc() }

// RateLimitRejected 记录一次请求被速率限制器拒绝拦截（scope 通常为 "ip" 或 "global"）
func (m *Metrics) RateLimitRejected(scope string) {
	m.rateLimitRejected.WithLabelValues(scope).Inc()
}

// TranslationEvent 记录一次多语言翻译生命周期事件
// operation: 操作类型（如 "fetch", "cache_hit"）
// result: 执行结果（如 "success", "error"）
// locale: 涉及的目标语种代码（如 "zh-CN", "en-US"）
func (m *Metrics) TranslationEvent(operation, result, locale string) {
	m.translationEvents.WithLabelValues(operation, result, locale).Inc()
}

// TranslationFallback 记录一次请求的语种内容缺失而降级回退到默认语种的事件
// requested: 用户实际请求的语言代码
// resolved: 最终回退并采用的语言代码
func (m *Metrics) TranslationFallback(requested, resolved string) {
	m.translationFallback.WithLabelValues(requested, resolved).Inc()
}
