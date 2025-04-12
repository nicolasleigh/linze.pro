CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_comments_content ON comments USING gin (content gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_posts_title ON posts USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING gin (tags);

CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);

CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts (user_id);

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments (post_id);

-- EXPLAIN ANALYSE SELECT * FROM comments WHERE content ILIKE '%post%';

-- SELECT * FROM comments WHERE content ILIKE '%post%';

-- do $$
-- BEGIN
-- for r in 1..100000 loop
-- INSERT INTO comments (post_id, user_id, content) VALUES (205, 100, 'Super duper OMG...');
-- end loop;
-- end;
-- $$;