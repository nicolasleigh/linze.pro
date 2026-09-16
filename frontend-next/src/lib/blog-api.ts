import { cache } from "react";

import type {
  BlogLocale,
  LocalizedPostDetail,
  LocalizedPostResult,
  PostDetail,
  PostResult,
  PostSummary,
  PostsResult,
  TagsResult,
} from "@/types/post";

const defaultApiBaseUrl = "https://linze.pro/api/v1";
const apiBaseUrl = (process.env.BLOG_API_URL ?? defaultApiBaseUrl).replace(
  /\/$/,
  "",
);

type ApiPost = {
  slug: string;
  titleEn: string;
  titleZh: string;
  aboutEn: string;
  aboutZh: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  photo: string;
  viewNum: number;
  likeNum: number;
  availableLocales?: BlogLocale[];
};

type ApiPostDetail = ApiPost & {
  contentZh: string;
  version: number;
  user: {
    username: string;
  };
};

type ApiLocalizedPost = {
  postSlug: string;
  locale: BlogLocale;
  title: string;
  description: string;
  content: string;
  version: number;
  sourceUpdatedAt?: string;
  updatedAt: string;
  requestedLocale: BlogLocale;
  resolvedLocale: BlogLocale;
  fallback: boolean;
  availableLocales: BlogLocale[];
  tags: string[];
  photo: string;
  author: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiPost(value: unknown): value is ApiPost {
  if (!isRecord(value)) return false;

  return (
    typeof value.slug === "string" &&
    typeof value.titleEn === "string" &&
    typeof value.titleZh === "string" &&
    typeof value.aboutEn === "string" &&
    typeof value.aboutZh === "string" &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string") &&
    typeof value.created_at === "string" &&
    typeof value.updated_at === "string" &&
    typeof value.photo === "string" &&
    typeof value.viewNum === "number" &&
    typeof value.likeNum === "number" &&
    (value.availableLocales === undefined ||
      (Array.isArray(value.availableLocales) &&
        value.availableLocales.every(isBlogLocale)))
  );
}

function isApiPostDetail(value: unknown): value is ApiPostDetail {
  if (!isApiPost(value)) return false;

  const detail = value as unknown as Record<string, unknown>;

  return (
    typeof detail.contentZh === "string" &&
    typeof detail.version === "number" &&
    isRecord(detail.user) &&
    typeof detail.user.username === "string"
  );
}

function isBlogLocale(value: unknown): value is BlogLocale {
  return value === "zh-CN" || value === "en-US";
}

function isApiLocalizedPost(value: unknown): value is ApiLocalizedPost {
  if (!isRecord(value)) return false;

  return (
    typeof value.postSlug === "string" &&
    isBlogLocale(value.locale) &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.content === "string" &&
    typeof value.version === "number" &&
    typeof value.updatedAt === "string" &&
    isBlogLocale(value.requestedLocale) &&
    isBlogLocale(value.resolvedLocale) &&
    typeof value.fallback === "boolean" &&
    Array.isArray(value.availableLocales) &&
    value.availableLocales.every(isBlogLocale) &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string") &&
    typeof value.photo === "string" &&
    typeof value.author === "string" &&
    typeof value.publishedAt === "string" &&
    typeof value.viewCount === "number" &&
    typeof value.likeCount === "number"
  );
}

function parsePosts(payload: unknown, locale: BlogLocale): PostSummary[] | null {
  if (
    !isRecord(payload) ||
    !Array.isArray(payload.data) ||
    !payload.data.every(isApiPost)
  ) {
    return null;
  }

  return payload.data.map((post) => {
    const inferredLocales: BlogLocale[] = ["zh-CN"];
    if (post.titleEn) inferredLocales.push("en-US");

    return {
      slug: post.slug,
      title: locale === "en-US" && (post.availableLocales ?? inferredLocales).includes("en-US")
        ? post.titleEn || post.titleZh || post.slug
        : post.titleZh || post.titleEn || post.slug,
      description: locale === "en-US" && (post.availableLocales ?? inferredLocales).includes("en-US")
        ? post.aboutEn || post.aboutZh
        : post.aboutZh || post.aboutEn,
      tags: post.tags,
      publishedAt: post.created_at,
      updatedAt: post.updated_at,
      photo: post.photo,
      viewCount: post.viewNum,
      likeCount: post.likeNum,
      availableLocales:
        post.availableLocales && post.availableLocales.length > 0
          ? post.availableLocales
          : inferredLocales,
    };
  });
}

export async function getRecentPosts(limit = 12, locale: BlogLocale = "zh-CN"): Promise<PostsResult> {
  const searchParams = new URLSearchParams({ page: "1", limit: String(limit) });

  try {
    const response = await fetch(`${apiBaseUrl}/posts?${searchParams}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300, tags: ["posts"] },
    });

    if (!response.ok) {
      return { ok: false, reason: "request-failed" };
    }

    const posts = parsePosts(await response.json(), locale);

    return posts
      ? { ok: true, posts }
      : { ok: false, reason: "invalid-response" };
  } catch {
    return { ok: false, reason: "request-failed" };
  }
}

export async function getAllTags(): Promise<TagsResult> {
  try {
    const response = await fetch(`${apiBaseUrl}/posts/tags`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300, tags: ["posts", "post-tags"] },
    });

    if (!response.ok) {
      return { ok: false, reason: "request-failed" };
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || typeof payload.data !== "string") {
      return { ok: false, reason: "invalid-response" };
    }

    const tags = [
      ...new Set(
        payload.data
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ].sort((left, right) => left.localeCompare(right));

    return { ok: true, tags };
  } catch {
    return { ok: false, reason: "request-failed" };
  }
}

export async function getPostBySlug(slug: string): Promise<PostResult> {
  const postUrl = new URL(`${apiBaseUrl}/post/${encodeURIComponent(slug)}`);
  postUrl.searchParams.set("lang", "zh");

  try {
    const response = await fetch(postUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300, tags: ["posts", `post:${slug}`] },
    });

    if (response.status === 404) {
      return { ok: false, reason: "not-found" };
    }

    if (!response.ok) {
      return { ok: false, reason: "request-failed" };
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || !isApiPostDetail(payload.data)) {
      return { ok: false, reason: "invalid-response" };
    }

    const post = payload.data;
    const detail: PostDetail = {
      slug: post.slug,
      title: post.titleZh || post.slug,
      description: post.aboutZh,
      content: post.contentZh,
      tags: post.tags,
      publishedAt: post.created_at,
      updatedAt: post.updated_at,
      photo: post.photo,
      viewCount: post.viewNum,
      likeCount: post.likeNum,
      availableLocales: post.availableLocales ?? ["zh-CN"],
      author: post.user.username,
      version: post.version,
    };

    return { ok: true, post: detail };
  } catch {
    return { ok: false, reason: "request-failed" };
  }
}

async function getLegacyLocalizedPost(
  slug: string,
  requestedLocale: BlogLocale,
): Promise<LocalizedPostResult> {
  const load = async (locale: BlogLocale) => {
    const url = new URL(`${apiBaseUrl}/post/${encodeURIComponent(slug)}`);
    url.searchParams.set("lang", locale === "zh-CN" ? "zh" : "en");
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300, tags: ["posts", `post:${slug}`] },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("legacy post request failed");

    const payload: unknown = await response.json();
    if (!isRecord(payload) || !isRecord(payload.data)) return null;
    return payload.data;
  };

  try {
    let resolvedLocale = requestedLocale;
    let post = await load(requestedLocale);
    const requestedContentKey =
      requestedLocale === "zh-CN" ? "contentZh" : "contentEn";

    if (
      !post ||
      typeof post[requestedContentKey] !== "string" ||
      post[requestedContentKey] === ""
    ) {
      resolvedLocale = requestedLocale === "zh-CN" ? "en-US" : "zh-CN";
      post = await load(resolvedLocale);
    }
    if (!post) return { ok: false, reason: "not-found" };

    const titleKey = resolvedLocale === "zh-CN" ? "titleZh" : "titleEn";
    const descriptionKey = resolvedLocale === "zh-CN" ? "aboutZh" : "aboutEn";
    const contentKey = resolvedLocale === "zh-CN" ? "contentZh" : "contentEn";
    const user = post.user;
    if (
      typeof post.slug !== "string" ||
      typeof post[titleKey] !== "string" ||
      typeof post[descriptionKey] !== "string" ||
      typeof post[contentKey] !== "string" ||
      !Array.isArray(post.tags) ||
      !post.tags.every((tag) => typeof tag === "string") ||
      typeof post.created_at !== "string" ||
      typeof post.updated_at !== "string" ||
      typeof post.photo !== "string" ||
      typeof post.viewNum !== "number" ||
      typeof post.likeNum !== "number" ||
      typeof post.version !== "number" ||
      !isRecord(user) ||
      typeof user.username !== "string"
    ) {
      return { ok: false, reason: "invalid-response" };
    }

    const availableLocales: BlogLocale[] = [];
    if (typeof post.titleZh === "string" && post.titleZh)
      availableLocales.push("zh-CN");
    if (typeof post.titleEn === "string" && post.titleEn)
      availableLocales.push("en-US");

    return {
      ok: true,
      post: {
        slug: post.slug,
        title: post[titleKey],
        description: post[descriptionKey],
        content: post[contentKey],
        tags: post.tags,
        publishedAt: post.created_at,
        updatedAt: post.updated_at,
        photo: post.photo,
        viewCount: post.viewNum,
        likeCount: post.likeNum,
        availableLocales,
        author: user.username,
        version: post.version,
        requestedLocale,
        resolvedLocale,
        fallback: requestedLocale !== resolvedLocale,
      },
    };
  } catch {
    return { ok: false, reason: "request-failed" };
  }
}

export const getLocalizedPostBySlug = cache(async function getLocalizedPostBySlug(
  slug: string,
  locale: BlogLocale,
): Promise<LocalizedPostResult> {
  const postUrl = new URL(
    `${apiBaseUrl}/posts/${encodeURIComponent(slug)}/localized`,
  );
  postUrl.searchParams.set("lang", locale);

  try {
    const response = await fetch(postUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      next: {
        revalidate: 300,
        tags: ["posts", `post:${slug}`, `post:${slug}:${locale}`],
      },
    });

    if (response.status === 404) {
      return getLegacyLocalizedPost(slug, locale);
    }
    if (!response.ok) {
      return { ok: false, reason: "request-failed" };
    }

    const payload: unknown = await response.json();
    if (!isRecord(payload) || !isApiLocalizedPost(payload.data)) {
      return { ok: false, reason: "invalid-response" };
    }

    const post = payload.data;
    const detail: LocalizedPostDetail = {
      slug: post.postSlug,
      title: post.title,
      description: post.description,
      content: post.content,
      tags: post.tags,
      publishedAt: post.publishedAt,
      updatedAt: post.sourceUpdatedAt ?? post.updatedAt,
      photo: post.photo,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      author: post.author,
      version: post.version,
      requestedLocale: post.requestedLocale,
      resolvedLocale: post.resolvedLocale,
      fallback: post.fallback,
      availableLocales: post.availableLocales,
    };

    return { ok: true, post: detail };
  } catch {
    return { ok: false, reason: "request-failed" };
  }
});
