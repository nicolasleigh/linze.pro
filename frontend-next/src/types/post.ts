export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  photo: string;
  viewCount: number;
  likeCount: number;
  availableLocales: BlogLocale[];
};

export type PostDetail = PostSummary & {
  content: string;
  author: string;
  version: number;
};

export type BlogLocale = "zh-CN" | "en-US";

export type LocalizedPostDetail = PostDetail & {
  requestedLocale: BlogLocale;
  resolvedLocale: BlogLocale;
  fallback: boolean;
  availableLocales: BlogLocale[];
};

export type PostsResult =
  | { ok: true; posts: PostSummary[] }
  | { ok: false; reason: "request-failed" | "invalid-response" };

export type TagsResult =
  | { ok: true; tags: string[] }
  | { ok: false; reason: "request-failed" | "invalid-response" };

export type PostResult =
  | { ok: true; post: PostDetail }
  | { ok: false; reason: "not-found" | "request-failed" | "invalid-response" };

export type LocalizedPostResult =
  | { ok: true; post: LocalizedPostDetail }
  | { ok: false; reason: "not-found" | "request-failed" | "invalid-response" };
