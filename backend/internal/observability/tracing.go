package observability

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
	oteltrace "go.opentelemetry.io/otel/trace"
)

// TracingConfig 定义了 OpenTelemetry 分布式链路追踪的配置项。
type TracingConfig struct {
	Enabled        bool    // 是否开启链路追踪；关闭时将降级为 No-op（无操作）模式，无需部署 Collector
	ServiceName    string  // 服务标识名（如 "social-api"），用于在链路大盘中区分不同微服务
	ServiceVersion string  // 服务版本号（如 Git Commit Hash 或语义化版本 "v1.0.0"）
	Environment    string  // 部署环境（如 "production", "staging", "development"）
	Endpoint       string  // OTLP 接收端（如 Jaeger 或 Collector）的 gRPC 地址（如 "localhost:4317" 或 "jaeger:4317"）
	Insecure       bool    // 是否使用非加密明文 gRPC 传输（本地开发或内网通信通常设为 true）
	SampleRatio    float64 // 根链路概率采样比例（0.0 ~ 1.0，如 0.05 代表采样 5% 的请求）
}

// Tracing 包装了 OpenTelemetry 的 TracerProvider 实例，负责管理追踪生命周期与平滑停机。
type Tracing struct {
	provider *trace.TracerProvider // 核心的 TracerProvider，负责构建 Tracer、管理采样与批量导出
}

// SetupTracing 初始化并配置基于 OTLP/gRPC 协议的 Trace 导出器。
//
// 设计亮点：
// 1. 若 cfg.Enabled 为 false，直接返回空的 Tracing 实例（No-op 模式），不初始化网络连接，
//    确保本地纯开发环境下无需启动额外的 Collector 容器即可正常运行；
// 2. 使用 ParentBased 采样策略：若上游调用已决定采样，则继承采样决策；否则按配置的比率（SampleRatio）采样；
// 3. 采用 Batcher 异步批处理导出，避免阻塞业务主流程。
func SetupTracing(ctx context.Context, cfg TracingConfig) (*Tracing, error) {
	if !cfg.Enabled {
		return &Tracing{}, nil
	}
	if strings.TrimSpace(cfg.Endpoint) == "" {
		return nil, fmt.Errorf("OTEL_EXPORTER_OTLP_ENDPOINT is required when OTEL_ENABLED=true")
	}
	// 校验采样比率，若不在有效开区间 (0, 1] 内，兜底采用 5% (0.05) 的默认采样率
	if cfg.SampleRatio <= 0 || cfg.SampleRatio > 1 {
		cfg.SampleRatio = 0.05
	}

	// 兼容清洗 Endpoint 格式：若配置传入包含协议头的 URL（如 "http://collector:4317"），
	// gRPC 客户端只接受 "host:port"，因此利用 url.Parse 提取 Host 部分
	endpoint := cfg.Endpoint
	if parsed, err := url.Parse(endpoint); err == nil && parsed.Host != "" {
		endpoint = parsed.Host
	}

	// 配置 gRPC 连接选项
	options := []otlptracegrpc.Option{otlptracegrpc.WithEndpoint(endpoint)}
	if cfg.Insecure {
		options = append(options, otlptracegrpc.WithInsecure())
	}
	exporter, err := otlptracegrpc.New(ctx, options...)
	if err != nil {
		return nil, fmt.Errorf("create OTLP trace exporter: %w", err)
	}

	// 构建实体资源标识（Resource）：定义产生遥测数据的服务元数据
	res, err := resource.New(ctx,
		resource.WithAttributes(
			semconv.ServiceName(cfg.ServiceName),
			semconv.ServiceVersion(cfg.ServiceVersion),
			semconv.DeploymentEnvironment(cfg.Environment),
		),
		resource.WithHost(),    // 自动捕获主机名信息
		resource.WithProcess(), // 自动捕获进程 PID、可执行文件路径与运行环境
	)
	if err != nil {
		return nil, fmt.Errorf("create telemetry resource: %w", err)
	}

	// 构建 TracerProvider：
	// 1. WithResource：附加服务与进程元数据；
	// 2. WithSampler：采用父级继承优先的比例采样器（ParentBased + TraceIDRatioBased）；
	// 3. WithBatcher：开启异步批量缓冲上传，降低网络与系统开销。
	provider := trace.NewTracerProvider(
		trace.WithResource(res),
		trace.WithSampler(trace.ParentBased(trace.TraceIDRatioBased(cfg.SampleRatio))),
		trace.WithBatcher(exporter),
	)

	// 设置为全局默认的 TracerProvider，供全局 otel.Tracer(...) 调用
	otel.SetTracerProvider(provider)
	return &Tracing{provider: provider}, nil
}

// Shutdown 在服务优雅退出（Graceful Shutdown）时调用，
// 负责在最多 5 秒超时内将内存缓冲池中未发送的 Span 强制冲洗（Flush）到收集器，
// 防止进程退出导致最后时刻的链路追踪数据丢失。
func (t *Tracing) Shutdown(ctx context.Context) error {
	if t == nil || t.provider == nil {
		return nil
	}
	shutdownCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	return t.provider.Shutdown(shutdownCtx)
}

// Tracer 从全局 TracerProvider 获取指定检测范围（Instrumentation Scope）的 Tracer。
// 参数 name 按照 OpenTelemetry 规范推荐使用包或模块的导入路径。
func Tracer(name string) oteltrace.Tracer {
	return otel.Tracer(name)
}

// StartSpan 便捷辅助函数，供业务逻辑层快速开启一个子 Span。
// 默认采用项目根模块路径 "github.com/nicolasleigh/social" 作为 Instrumentation Scope 标识。
func StartSpan(ctx context.Context, name string, options ...oteltrace.SpanStartOption) (context.Context, oteltrace.Span) {
	return otel.Tracer("github.com/nicolasleigh/social").Start(ctx, name, options...)
}

// HTTPMiddleware 是 HTTP 服务端链路追踪中间件。
// 它为每个进来的 HTTP 请求创建一个服务端根 Span，并在业务处理完毕后提取标准化的路由模板作为 Span 名称与属性。
// 使用路由模板（如 "/posts/{slug}"）而非原始 URL，可防止不同文章 Slug 污染链路大盘。
func HTTPMiddleware(routeResolver func(*http.Request) string, next http.Handler) http.Handler {
	// 获取专属 HTTP 中间件层的 Tracer
	tracer := Tracer("github.com/nicolasleigh/social/http")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 开启请求级 Server Span，初始命名为类似 "HTTP GET"
		ctx, span := tracer.Start(r.Context(), "HTTP "+r.Method)

		// 包装 ResponseWriter 以便在下游处理完毕后捕获 HTTP 状态码与响应字节数
		sw := &traceStatusWriter{ResponseWriter: w}
		// 将携带 Span 信息的上下文注入请求对象，传递给下游 Handler
		next.ServeHTTP(sw, r.WithContext(ctx))

		// 下游执行完毕后解析标准化路由模板（例如 "/api/v1/posts/{slug}"）
		route := routeResolver(r)
		if route == "" {
			route = "unknown"
		}
		status := sw.status
		if status == 0 {
			// 若下游未显式调用 WriteHeader 便结束，Go net/http 默认视为 200 OK
			status = http.StatusOK
		}

		// 按照 OpenTelemetry 语义约定注入标准 HTTP 属性
		span.SetAttributes(
			attribute.String("http.request.method", r.Method),
			attribute.String("http.route", route),
			attribute.Int("http.response.status_code", status),
		)
		// 将 Span 名称重命名为直观且低基数的 "METHOD /route" 形式（如 "GET /posts/{slug}"）
		span.SetName(r.Method + " " + route)

		// 如果状态码为 5xx 服务器内部错误，将该 Span 状态标记为 Error，以便在 Jaeger 大盘中高亮预警
		if status >= http.StatusInternalServerError {
			span.SetStatus(codes.Error, http.StatusText(status))
		}

		// 结束该 Span，计算总耗时并提交给异步批处理器
		span.End()
	})
}

// traceStatusWriter 是对 http.ResponseWriter 的装饰器包装。
// 核心作用：在完全保留 Go 标准库 net/http 原生行为语义的前提下，捕获下游返回的 HTTP 状态码与响应体字节数。
type traceStatusWriter struct {
	http.ResponseWriter
	status int // 记录写入的 HTTP 状态码（默认为 0）
	bytes  int // 累计写入响应体的总字节数
}

// WriteHeader 拦截下游对响应状态码的设置：
// 1. 保证幂等性：遵循 HTTP 规范，只记录第一次显式写入的状态码，忽略后续重复调用；
// 2. 将状态码传递给底层的 ResponseWriter。
func (w *traceStatusWriter) WriteHeader(status int) {
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
func (w *traceStatusWriter) Write(body []byte) (int, error) {
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
func (w *traceStatusWriter) Flush() {
	if w.status == 0 {
		w.WriteHeader(http.StatusOK)
	}
	if flusher, ok := w.ResponseWriter.(http.Flusher); ok {
		flusher.Flush()
	}
}

// Unwrap 实现 Go 1.20+ 的 http.ResponseController 解包协议，
// 使得上层能够沿着包装链解包获取底层原生 ResponseWriter，支持 Hijack 等高级网络控制。
func (w *traceStatusWriter) Unwrap() http.ResponseWriter { return w.ResponseWriter }
