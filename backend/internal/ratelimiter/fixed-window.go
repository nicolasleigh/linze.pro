// Package ratelimiter 提供用于控制客户端访问频率的限流器实现。
package ratelimiter

import (
	"context"
	"sync"
	"time"
)

// FixedWindowRateLimiter 基于固定时间窗口算法实现的内存级限流器。
//
// 核心特性：
// 1. 并发安全：内部采用互斥锁（sync.Mutex）保证高并发环境下计数的原子性与一致性。
// 2. 避免竞态：在写锁保护下统一完成首次访问判断、计数初始化与重置协程调度，杜绝 Check-then-act 竞态。
// 3. 优雅停机（Graceful Shutdown）：结合 context.Context 与 sync.WaitGroup，在服务关闭时能够主动唤醒并回收所有等待窗口超时的协程，避免协程泄漏。
type FixedWindowRateLimiter struct {
	sync.Mutex                     // 互斥锁，用于保护 clients 映射表及 closed 状态的并发安全
	clients map[string]int         // 记录各客户端（IP）在当前时间窗口内的累计请求次数
	limit   int                    // 单个时间窗口内允许的最大请求次数
	window  time.Duration          // 固定时间窗口的持续时间（例如 1 分钟、1 小时）
	ctx     context.Context        // 控制后台重置协程生命周期的上下文
	cancel  context.CancelFunc     // 用于触发优雅停机、提前取消后台重置协程的取消函数
	closed  bool                   // 标记限流器是否已经关闭，防止关闭后接收新请求
	workers sync.WaitGroup         // 追踪当前存活的后台重置协程数量，确保停机时所有协程已安全退出
}

// NewFixedWindowLimiter 创建并初始化一个基于固定时间窗口的限流器实例。
//
// 参数：
// - limit: 单个时间窗口内允许的最大请求数。
// - window: 时间窗口时长（如 time.Minute）。
func NewFixedWindowLimiter(limit int, window time.Duration) *FixedWindowRateLimiter {
	ctx, cancel := context.WithCancel(context.Background())
	return &FixedWindowRateLimiter{
		clients: make(map[string]int),
		limit:   limit,
		window:  window,
		ctx:     ctx,
		cancel:  cancel,
	}
}

// Allow 检查并判断指定客户端 IP 的当前请求是否被允许通过。
//
// 返回值：
// - bool: true 表示允许放行；false 表示超出频率限制或限流器已关闭。
// - time.Duration: 当被限流拦截时，建议客户端重试前需要等待的退避时长（即整个窗口时长）。
func (rl *FixedWindowRateLimiter) Allow(ip string) (bool, time.Duration) {
	rl.Lock()
	defer rl.Unlock()

	// 若限流器已处于关闭状态，直接拒绝一切新请求
	if rl.closed {
		return false, 0
	}

	count, exists := rl.clients[ip]

	// 场景 1：IP 在当前窗口内首次发起请求（或上一窗口计数已到期被清理）
	// 注意：此处在同一个写锁临界区内完成计数初始化并派发重置协程，
	// 能够彻底避免读写锁分离时并发请求同时判定 IP 不存在而重复派发多个重置协程的 Check-then-act 竞态问题。
	if !exists {
		rl.clients[ip] = 1
		rl.workers.Add(1)
		go rl.resetCount(ip)
		return true, 0
	}

	// 场景 2：请求计数已达到或超出限制阈值，予以拦截
	if count >= rl.limit {
		return false, rl.window
	}

	// 场景 3：仍在限额之内，计数器递增并予以放行
	rl.clients[ip] = count + 1
	return true, 0
}

// resetCount 在后台独立协程中运行，负责在时间窗口到期后清理指定 IP 的计数记录。
//
// 实现细节：
// - 使用 time.NewTimer 替代 time.Sleep，使得定时器可以被显式 Stop 并监听外部取消信号。
// - 使用 select 多路复用同时监听时间到期（timer.C）与服务停机（rl.ctx.Done()）。
// - 执行完毕后通过 rl.workers.Done() 通知 WaitGroup，保证优雅停机等待的准确性。
func (rl *FixedWindowRateLimiter) resetCount(ip string) {
	defer rl.workers.Done()

	timer := time.NewTimer(rl.window)
	defer timer.Stop()

	select {
	case <-timer.C:
		// 窗口时间自然到期，获取互斥锁并移除该 IP 记录，下一个请求将开启全新的时间窗口
		rl.Lock()
		delete(rl.clients, ip)
		rl.Unlock()
	case <-rl.ctx.Done():
		// 服务正在停机，收到 context 取消信号，立即退出协程，杜绝协程泄漏
		return
	}
}

// Close 优雅关闭限流器，释放所有关联资源：
// 1. 设置 closed 标记为 true，后续 Allow 请求将被直接拦截；
// 2. 调用 cancel() 发送取消信号，提前中断所有仍在休眠等待窗口到期的 resetCount 协程；
// 3. 在锁外调用 rl.workers.Wait()，阻塞等待所有后台重置协程完全退出（避免死锁）；
// 4. 清理内部 clients 映射，释放内存占用。
func (rl *FixedWindowRateLimiter) Close() {
	rl.Lock()
	if rl.closed {
		rl.Unlock()
		return
	}
	rl.closed = true
	rl.cancel()
	rl.Unlock()

	// 必须在互斥锁释放后等待所有工作协程退出，否则若协程在退出前尝试获取锁会导致死锁
	rl.workers.Wait()

	rl.Lock()
	rl.clients = make(map[string]int)
	rl.Unlock()
}
