CREATE TABLE IF NOT EXISTS likes (
  id bigserial PRIMARY KEY,
  post_id bigint UNIQUE NOT NULL REFERENCES posts(id),
  like_num int NOT NULL DEFAULT 1,
  view_num int NOT NULL DEFAULT 1,
  created_at timestamp(0) with time zone NOT NULL DEFAULT NOW()
)