ALTER TABLE IF EXISTS post_likes
RENAME TO post_likes_test;

CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_slug TEXT NOT NULL UNIQUE,
  like_num int NOT NULL DEFAULT 1,
  view_num int NOT NULL DEFAULT 1,
  created_at timestamp(0) with time zone NOT NULL DEFAULT NOW()
);

ALTER TABLE post_likes
ADD CONSTRAINT fk_posts 
FOREIGN KEY (post_slug) 
REFERENCES posts(slug)
ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_post_likes_slug ON post_likes (post_slug);
