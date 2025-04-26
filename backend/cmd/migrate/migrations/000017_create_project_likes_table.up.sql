CREATE TABLE IF NOT EXISTS project_likes (
  project_slug TEXT NOT NULL UNIQUE PRIMARY KEY,
  like_num int NOT NULL DEFAULT 1,
  view_num int NOT NULL DEFAULT 1,
  created_at timestamp(0) with time zone NOT NULL DEFAULT NOW()
)