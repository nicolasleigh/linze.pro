ALTER TABLE IF EXISTS posts
ADD COLUMN about TEXT NOT NULL DEFAULT '',
ADD COLUMN photo TEXT NOT NULL DEFAULT '';