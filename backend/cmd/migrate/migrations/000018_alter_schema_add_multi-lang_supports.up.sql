-- Backup old posts table
ALTER TABLE IF EXISTS posts
RENAME TO posts_test;

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  about_en TEXT NOT NULL,
  about_zh TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_zh TEXT NOT NULL,
  user_id BIGINT NOT NULL,
  tags VARCHAR(100)[],
  version INT DEFAULT 0,
  photo TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP(0) with time zone NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP(0) with time zone NOT NULL DEFAULT NOW()
);

-- Add foreign key constraint
ALTER TABLE posts
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts (user_id);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN (tags);

