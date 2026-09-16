import "server-only";

import { getBackendApiUrl } from "@/lib/admin-session";
import type { AdminPostSummary } from "@/types/admin";
import type { BlogLocale } from "@/types/post";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseLocale(value: unknown): value is BlogLocale {
  return value === "zh-CN" || value === "en-US";
}

function parsePost(value: unknown): AdminPostSummary | null {
  if (!isRecord(value) || typeof value.slug !== "string") return null;

  const titleZh = typeof value.titleZh === "string" ? value.titleZh : "";
  const titleEn = typeof value.titleEn === "string" ? value.titleEn : "";
  const availableLocales = Array.isArray(value.availableLocales)
    ? value.availableLocales.filter(parseLocale)
    : [];

  if (availableLocales.length === 0) {
    if (titleZh) availableLocales.push("zh-CN");
    if (titleEn) availableLocales.push("en-US");
  }

  return {
    slug: value.slug,
    title: titleZh || titleEn || value.slug,
    titleZh,
    titleEn,
    description: typeof value.aboutZh === "string" ? value.aboutZh : "",
    tags: Array.isArray(value.tags)
      ? value.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    updatedAt: typeof value.updated_at === "string" ? value.updated_at : "",
    publishedAt: typeof value.created_at === "string" ? value.created_at : "",
    viewCount: typeof value.viewNum === "number" ? value.viewNum : 0,
    likeCount: typeof value.likeNum === "number" ? value.likeNum : 0,
    availableLocales,
  };
}

export async function getAdminPosts(): Promise<
  | { ok: true; posts: AdminPostSummary[] }
  | { ok: false; reason: string }
> {
  try {
    const response = await fetch(getBackendApiUrl("/posts?page=1&limit=200"), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      return { ok: false, reason: `内容 API 返回 ${response.status}` };
    }

    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.data)) {
      return { ok: false, reason: "内容 API 响应格式不正确" };
    }
    const posts = payload.data.map(parsePost).filter((post) => post !== null);
    return { ok: true, posts };
  } catch {
    return { ok: false, reason: "无法连接内容 API" };
  }
}
