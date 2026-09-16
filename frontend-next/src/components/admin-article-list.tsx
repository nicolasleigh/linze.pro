"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { AdminPostSummary } from "@/types/admin";

type TranslationFilter = "all" | "complete" | "missing";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "日期未知"
    : new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
}

export function AdminArticleList({ posts }: { posts: AdminPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [translationFilter, setTranslationFilter] =
    useState<TranslationFilter>("all");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");
    return posts.filter((post) => {
      const complete = post.availableLocales.length === 2;
      const matchesTranslation =
        translationFilter === "all" ||
        (translationFilter === "complete" ? complete : !complete);
      const matchesQuery =
        !normalizedQuery ||
        [post.slug, post.titleZh, post.titleEn, ...post.tags]
          .join(" ")
          .toLocaleLowerCase("zh-CN")
          .includes(normalizedQuery);
      return matchesTranslation && matchesQuery;
    });
  }, [posts, query, translationFilter]);

  return (
    <>
      <section className="admin-list-toolbar" aria-label="文章筛选">
        <label>
          <span>搜索文章</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="标题、Slug 或标签"
          />
        </label>
        <label>
          <span>翻译状态</span>
          <select
            value={translationFilter}
            onChange={(event) =>
              setTranslationFilter(event.target.value as TranslationFilter)
            }
          >
            <option value="all">全部文章</option>
            <option value="complete">中英文完整</option>
            <option value="missing">缺少翻译</option>
          </select>
        </label>
        <p>
          {String(filteredPosts.length).padStart(2, "0")} / {posts.length} 篇
        </p>
      </section>

      {filteredPosts.length === 0 ? (
        <section className="admin-empty-state">
          <p>没有匹配的文章。</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTranslationFilter("all");
            }}
          >
            清除筛选
          </button>
        </section>
      ) : (
        <ol className="admin-article-list">
          {filteredPosts.map((post, index) => {
            const primaryLocale = post.availableLocales[0] ?? "zh-CN";
            return (
              <li key={post.slug}>
                <article>
                  <span className="admin-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="admin-row-copy">
                    <p>{post.slug}</p>
                    <h2>{post.title}</h2>
                    <div>
                      <time dateTime={post.updatedAt}>
                        更新于 {formatDate(post.updatedAt)}
                      </time>
                      <span>{post.viewCount} 阅读</span>
                      <span>{post.likeCount} 喜欢</span>
                    </div>
                  </div>
                  <div className="admin-locale-status" aria-label="语言版本">
                    {(["zh-CN", "en-US"] as const).map((locale) => {
                      const available = post.availableLocales.includes(locale);
                      return (
                        <span key={locale} data-available={available || undefined}>
                          {locale === "zh-CN" ? "中文" : "EN"}
                          <small>{available ? "已发布" : "缺失"}</small>
                        </span>
                      );
                    })}
                  </div>
                  <div className="admin-row-actions">
                    <Link
                      href={`/admin/articles/${post.slug}?locale=${primaryLocale}`}
                    >
                      编辑
                    </Link>
                    <Link href={`/${primaryLocale}/posts/${post.slug}`}>
                      预览 ↗
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
