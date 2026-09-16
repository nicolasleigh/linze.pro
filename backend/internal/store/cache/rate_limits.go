package cache

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

// fixedWindowScript 是基于 Redis 执行固定时间窗口限流的 Lua 脚本。
// 
// 核心设计考虑（原子性保证）：
// 1. 原子自增：每次请求到达时，原子递增计数器（INCR）；
// 2. 首击设置过期时间（PEXPIRE）：仅当计数器首次初始化（current == 1）时设置时间窗口 TTL（毫秒级精度）；
// 3. 规避死锁/孤儿键：若不用 Lua 脚本而拆分为两条 Redis 命令，一旦在 INCR 后系统宕机或网络中断导致未能设置 EXPIRE，
//    该键将永远常驻 Redis 且无法自动重置，导致该用户被永久封禁。通过 Lua 脚本可确保这两步操作的绝对原子性；
// 4. 返回值：返回当前时间窗口内已累计的请求次数。
var fixedWindowScript = redis.NewScript(`
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
return current
`)

// RateLimitStore 负责基于 Redis 缓存的高性能请求频率限制存储实现。
type RateLimitStore struct {
	rdb *redis.Client
}

// Allow 检查指定的限流 key 在给定的滑动/固定时间窗口内是否允许本次请求：
//
// 参数说明：
// - ctx: 上下文（支持链路超时与取消信号）
// - key: 限流维度的唯一标识（例如 "visitor:<visitorHash>" 或 "ip:<ipRiskKey>"）
// - limit: 窗口期内允许的最大请求上限（例如 30 次/分钟、120 次/分钟）
// - window: 统计时间窗口时长（例如 1 * time.Minute）
//
// 返回值：
// - bool: true 表示未超限（允许放行），false 表示已超限（触发限流拦截）
// - error: Redis 交互异常信息
func (s *RateLimitStore) Allow(ctx context.Context, key string, limit int64, window time.Duration) (bool, error) {
	count, err := fixedWindowScript.Run(
		ctx,
		s.rdb,
		[]string{"engagement:rate:" + key},
		window.Milliseconds(),
	).Int64()
	if err != nil {
		return false, err
	}
	return count <= limit, nil
}
