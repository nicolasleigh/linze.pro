ALTER TABLE post_likes
  ALTER COLUMN like_num TYPE BIGINT,
  ALTER COLUMN view_num TYPE BIGINT,
  ALTER COLUMN like_num SET DEFAULT 0,
  ALTER COLUMN view_num SET DEFAULT 0;

INSERT INTO post_likes (post_slug, like_num, view_num)
SELECT slug, 0, 0 FROM posts
ON CONFLICT (post_slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS post_like_visitors (
  post_slug TEXT NOT NULL REFERENCES posts(slug) ON DELETE CASCADE,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_slug, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_post_like_visitors_visitor_hash
  ON post_like_visitors (visitor_hash);

CREATE TABLE IF NOT EXISTS post_view_visitors (
  post_slug TEXT NOT NULL REFERENCES posts(slug) ON DELETE CASCADE,
  visitor_hash TEXT NOT NULL,
  viewed_on DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_slug, visitor_hash, viewed_on)
);

CREATE INDEX IF NOT EXISTS idx_post_view_visitors_created_at
  ON post_view_visitors (created_at);
