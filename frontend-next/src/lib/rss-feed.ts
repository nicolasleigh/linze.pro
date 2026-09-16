import { siteContent } from "@/content/site";
import { getSiteContent } from "@/content/localized";
import { getRecentPosts } from "@/lib/blog-api";
import type { BlogLocale } from "@/types/post";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRfc822Date(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toUTCString();
}

export async function createRssFeed(locale: BlogLocale) {
  const content = getSiteContent(locale);
  const result = await getRecentPosts(20, locale);
  const posts = result.ok ? result.posts.filter((post) => post.availableLocales.includes(locale)) : [];
  const feedUrl = `${siteContent.url}/${locale}/rss.xml`;
  const lastBuildDate = posts
    .map(
      (post) => toRfc822Date(post.updatedAt) ?? toRfc822Date(post.publishedAt),
    )
    .find(Boolean);
  const items = posts
    .map((post) => {
      const postUrl = `${siteContent.url}/${locale}/posts/${encodeURIComponent(post.slug)}`;
      const publishedAt = toRfc822Date(post.publishedAt);
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${postUrl}</link>`,
        `<guid isPermaLink="true">${postUrl}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        publishedAt ? `<pubDate>${publishedAt}</pubDate>` : "",
        categories,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(`${siteContent.name} · ${locale === "en-US" ? "Writing" : "技术文章"}`)}</title>`,
    `<link>${siteContent.url}/${locale}</link>`,
    `<description>${escapeXml(content.description)}</description>`,
    `<language>${locale}</language>`,
    `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
    lastBuildDate ? `<lastBuildDate>${lastBuildDate}</lastBuildDate>` : "",
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
