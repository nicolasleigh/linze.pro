import type { MetadataRoute } from "next";

import { projectCaseStudies } from "@/content/project-case-studies";
import { siteContent } from "@/content/site";
import { getRecentPosts } from "@/lib/blog-api";
import { blogLocales, localizedPath } from "@/lib/i18n";

function validDate(value: string): Date | undefined {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = blogLocales.flatMap((locale) =>
    ["", "/posts", "/projects", "/about"].map((path) => ({
      url: `${siteContent.url}${localizedPath(locale, path)}`,
      changeFrequency: path === "" || path === "/posts" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/posts" ? 0.9 : path === "/projects" ? 0.8 : 0.7,
      alternates: { languages: Object.fromEntries(blogLocales.map((item) => [item, `${siteContent.url}${localizedPath(item, path)}`])) },
    })),
  );
  const projectRoutes: MetadataRoute.Sitemap = Object.keys(projectCaseStudies).flatMap((slug) =>
    blogLocales.map((locale) => ({
      url: `${siteContent.url}${localizedPath(locale, `/projects/${encodeURIComponent(slug)}`)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: Object.fromEntries(blogLocales.map((item) => [item, `${siteContent.url}${localizedPath(item, `/projects/${encodeURIComponent(slug)}`)}`])) },
    })),
  );
  const result = await getRecentPosts(100);

  if (!result.ok) {
    return [...staticRoutes, ...projectRoutes];
  }

  const seenSlugs = new Set<string>();
  const articleRoutes: MetadataRoute.Sitemap = result.posts.flatMap((post) => {
    if (!post.slug || seenSlugs.has(post.slug)) return [];
    seenSlugs.add(post.slug);

    return post.availableLocales.map((locale) => ({
      url: `${siteContent.url}/${locale}/posts/${encodeURIComponent(post.slug)}`,
      lastModified: validDate(post.updatedAt) ?? validDate(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: locale === "zh-CN" ? 0.7 : 0.65,
      alternates: { languages: Object.fromEntries(post.availableLocales.map((item) => [item, `${siteContent.url}/${item}/posts/${encodeURIComponent(post.slug)}`])) },
    }));
  });

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
