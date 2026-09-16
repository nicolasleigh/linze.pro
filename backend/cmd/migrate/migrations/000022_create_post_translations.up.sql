CREATE TABLE IF NOT EXISTS post_translations (
  post_slug TEXT NOT NULL REFERENCES posts(slug) ON DELETE CASCADE,
  locale VARCHAR(10) NOT NULL CHECK (locale IN ('zh-CN', 'en-US')),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1 CHECK (version > 0),
  source_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_post_translations_locale_updated
  ON post_translations (locale, updated_at DESC);

CREATE TABLE IF NOT EXISTS post_translation_revisions (
  post_slug TEXT NOT NULL,
  locale VARCHAR(10) NOT NULL,
  version INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  source_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_slug, locale, version),
  FOREIGN KEY (post_slug, locale)
    REFERENCES post_translations(post_slug, locale) ON DELETE CASCADE
);

INSERT INTO post_translations (
  post_slug, locale, title, description, content, version,
  source_updated_at, created_at, updated_at
)
SELECT
  slug, 'zh-CN', title_zh, about_zh, content_zh,
  GREATEST(version, 1), updated_at, created_at, updated_at
FROM posts
WHERE title_zh <> '' OR content_zh <> ''
ON CONFLICT (post_slug, locale) DO NOTHING;

INSERT INTO post_translations (
  post_slug, locale, title, description, content, version,
  source_updated_at, created_at, updated_at
)
SELECT
  slug, 'en-US', title_en, about_en, content_en,
  GREATEST(version, 1), updated_at, created_at, updated_at
FROM posts
WHERE title_en <> '' OR content_en <> ''
ON CONFLICT (post_slug, locale) DO NOTHING;

INSERT INTO post_translation_revisions (
  post_slug, locale, version, title, description, content,
  source_updated_at, created_at
)
SELECT post_slug, locale, version, title, description, content,
  source_updated_at, updated_at
FROM post_translations
ON CONFLICT (post_slug, locale, version) DO NOTHING;
