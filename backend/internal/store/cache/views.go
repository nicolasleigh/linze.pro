package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type ViewStore struct {
	rdb *redis.Client
}

func viewCacheKey(slug, visitorHash, date string) string {
	return fmt.Sprintf("post:view:seen:%s:%s:%s", slug, visitorHash, date)
}

func (s *ViewStore) Seen(ctx context.Context, slug, visitorHash, date string) (bool, error) {
	result, err := s.rdb.Exists(ctx, viewCacheKey(slug, visitorHash, date)).Result()
	if err != nil {
		return false, err
	}
	return result > 0, nil
}

func (s *ViewStore) MarkSeen(ctx context.Context, slug, visitorHash, date string) error {
	return s.rdb.Set(ctx, viewCacheKey(slug, visitorHash, date), "1", 25*time.Hour).Err()
}
