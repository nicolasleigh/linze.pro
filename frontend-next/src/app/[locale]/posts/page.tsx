import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";

import { PageTransition } from "@/components/page-transition";
import { getAllTags, getRecentPosts } from "@/lib/blog-api";
import { articleTransitionName } from "@/lib/article";
import { isBlogLocale, localizedPath } from "@/lib/i18n";
import type { BlogLocale, PostSummary } from "@/types/post";

type PostsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string | string[];
    tag?: string | string[];
    year?: string | string[];
  }>;
};

export const revalidate = 300;

const copy = {
  "zh-CN": {
    title: "技术文章", filteredTitle: "筛选技术文章", description: "关于 React、Next.js、Go、部署和全栈工程实践的技术文章。", intro: "记录项目中的架构取舍、实现细节与问题复盘。内容来自实际开发过程，而不是技术名词的简单罗列。", recent: "近期文章", unavailable: "文章暂时没有加载成功", unavailableBody: "内容服务可能正在更新，请稍后重新尝试。", reload: "重新加载", search: "搜索文章", searchPlaceholder: "搜索标题、摘要或标签", topics: "主题", topicFilter: "按主题筛选", all: "全部", archive: "归档", yearFilter: "按年份筛选", allYears: "全部年份", results: "筛选结果", archiveTitle: "文章归档", unit: "篇", empty: "文章正在整理中", emptyBody: "新的技术记录会在这里发布。", noResults: "没有匹配的文章", noResultsBody: "可以尝试缩短关键词，或清除当前主题与年份筛选。", clear: "清除筛选", reads: "次阅读", likes: "个喜欢", read: (title: string) => `阅读《${title}》`, tags: (title: string) => `${title}的标签`, unknownDate: "日期未知" },
  "en-US": {
    title: "Writing", filteredTitle: "Filtered writing", description: "Notes on React, Next.js, Go, deployment and full-stack engineering.", intro: "Architecture decisions, implementation details and lessons from real projects—not a list of technology buzzwords.", recent: "Recent posts", unavailable: "Posts are temporarily unavailable", unavailableBody: "The content service may be updating. Please try again shortly.", reload: "Reload", search: "Search posts", searchPlaceholder: "Search titles, summaries or tags", topics: "Topics", topicFilter: "Filter by topic", all: "All", archive: "Archive", yearFilter: "Filter by year", allYears: "All years", results: "Results", archiveTitle: "Post archive", unit: "posts", empty: "Posts are being prepared", emptyBody: "New engineering notes will appear here.", noResults: "No matching posts", noResultsBody: "Try a shorter query or remove topic and year filters.", clear: "Clear filters", reads: "reads", likes: "likes", read: (title: string) => `Read ${title}`, tags: (title: string) => `Tags for ${title}`, unknownDate: "Unknown date" },
} as const;

function formatDate(value: string, locale: BlogLocale) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? copy[locale].unknownDate : new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function firstParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function normalizeFilters(params: Awaited<PostsPageProps["searchParams"]>) {
  return {
    query: firstParam(params.q).slice(0, 80),
    tag: firstParam(params.tag).slice(0, 60),
    year: /^\d{4}$/.test(firstParam(params.year))
      ? firstParam(params.year)
      : "",
  };
}

function postYear(post: PostSummary, locale: BlogLocale) {
  const date = new Date(post.publishedAt);
  return Number.isNaN(date.getTime())
    ? copy[locale].unknownDate
    : String(date.getUTCFullYear());
}

function buildPostsHref(locale: BlogLocale, filters: { query: string; tag: string; year: string }) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.year) params.set("year", filters.year);
  const query = params.toString();
  const path = localizedPath(locale, "/posts");
  return query ? `${path}?${query}` : path;
}

export async function generateMetadata({
  params,
  searchParams,
}: PostsPageProps): Promise<Metadata> {
  const filters = normalizeFilters(await searchParams);
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const hasFilters = Boolean(filters.query || filters.tag || filters.year);

  return {
    title: hasFilters ? copy[locale].filteredTitle : copy[locale].title,
    description: copy[locale].description,
    alternates: { canonical: localizedPath(locale, "/posts"), languages: { "zh-CN": "/zh-CN/posts", "en-US": "/en-US/posts", "x-default": "/zh-CN/posts" } },
    robots: hasFilters ? { index: false, follow: true } : undefined,
  };
}

function PostsListSkeleton({ locale }: { locale: BlogLocale }) {
  return (
    <section aria-label={locale === "en-US" ? "Loading posts" : "正在加载文章"} aria-busy="true">
      <div className="collection-toolbar">
        <h2>{copy[locale].recent}</h2>
      </div>
      <div className="article-skeleton">
        {[0, 1, 2].map((item) => (
          <div key={item}>
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    </section>
  );
}

async function PostsIndex({ params, searchParams }: PostsPageProps) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const messages = copy[locale];
  const [queryParams, result, tagsResult] = await Promise.all([
    searchParams,
    getRecentPosts(100, locale),
    getAllTags(),
  ]);

  const filters = normalizeFilters(queryParams);

  if (!result.ok) {
    return (
      <section
        className="collection-state"
        aria-labelledby="posts-unavailable-title"
      >
        <span aria-hidden="true">API / OFFLINE</span>
        <div>
          <h2 id="posts-unavailable-title">{messages.unavailable}</h2>
          <p>{messages.unavailableBody}</p>
        </div>
        <Link href={localizedPath(locale, "/posts")} prefetch={false}>
          {messages.reload}
        </Link>
      </section>
    );
  }

  const allPosts = result.posts;
  const fallbackTags = [...new Set(allPosts.flatMap((post) => post.tags))].sort(
    (left, right) => left.localeCompare(right),
  );
  const tags = tagsResult.ok ? tagsResult.tags : fallbackTags;
  const years = [...new Set(allPosts.map((post) => postYear(post, locale)))].sort((left, right) =>
    right.localeCompare(left),
  );
  const normalizedQuery = filters.query.toLocaleLowerCase(locale);
  const filteredPosts = allPosts.filter((post) => {
    const matchesQuery =
      !normalizedQuery ||
      [post.title, post.description, ...post.tags]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(normalizedQuery);
    const matchesTag = !filters.tag || post.tags.includes(filters.tag);
    const matchesYear = !filters.year || postYear(post, locale) === filters.year;
    return matchesQuery && matchesTag && matchesYear;
  });
  const groupedPosts = years
    .map((year) => ({
      year,
      posts: filteredPosts.filter((post) => postYear(post, locale) === year),
    }))
    .filter((group) => group.posts.length > 0);
  const hasFilters = Boolean(filters.query || filters.tag || filters.year);
  const articleIndexBySlug = new Map(
    filteredPosts.map((post, index) => [post.slug, index + 1]),
  );

  return (
    <>
      <section className="discovery-panel" aria-label={locale === "en-US" ? "Search and filter posts" : "文章搜索与筛选"}>
        <form
          className="post-search"
          action={localizedPath(locale, "/posts")}
          method="get"
          role="search"
        >
          <label htmlFor="post-query">{messages.search}</label>
          <div>
            <input
              id="post-query"
              name="q"
              type="search"
              defaultValue={filters.query}
              maxLength={80}
              placeholder={messages.searchPlaceholder}
            />
            {filters.tag ? (
              <input type="hidden" name="tag" value={filters.tag} />
            ) : null}
            {filters.year ? (
              <input type="hidden" name="year" value={filters.year} />
            ) : null}
            <button type="submit">{messages.search}</button>
          </div>
        </form>

        <div className="filter-group">
          <p>{messages.topics}</p>
          <nav aria-label={messages.topicFilter}>
            <Link
              href={buildPostsHref(locale, { ...filters, tag: "" })}
              aria-current={!filters.tag ? "page" : undefined}
            >
              {messages.all}
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={buildPostsHref(locale, { ...filters, tag })}
                aria-current={filters.tag === tag ? "page" : undefined}
              >
                {tag}
              </Link>
            ))}
          </nav>
        </div>

        <div className="filter-group">
          <p>{messages.archive}</p>
          <nav aria-label={messages.yearFilter}>
            <Link
              href={buildPostsHref(locale, { ...filters, year: "" })}
              aria-current={!filters.year ? "page" : undefined}
            >
              {messages.allYears}
            </Link>
            {years.map((year) => (
              <Link
                key={year}
                href={buildPostsHref(locale, { ...filters, year })}
                aria-current={filters.year === year ? "page" : undefined}
              >
                {year}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="collection-toolbar">
        <h2 id="recent-posts-title">{hasFilters ? messages.results : messages.archiveTitle}</h2>
        <p>
          {String(filteredPosts.length).padStart(2, "0")} /{" "}
          {String(allPosts.length).padStart(2, "0")} {messages.unit}
        </p>
      </div>

      {allPosts.length === 0 ? (
        <section
          className="collection-state"
          aria-labelledby="posts-empty-title"
        >
          <span aria-hidden="true">00 / POSTS</span>
          <div>
            <h2 id="posts-empty-title">{messages.empty}</h2>
            <p>{messages.emptyBody}</p>
          </div>
        </section>
      ) : filteredPosts.length === 0 ? (
        <section
          className="collection-state"
          aria-labelledby="posts-no-results-title"
        >
          <span aria-hidden="true">00 / MATCH</span>
          <div>
            <h2 id="posts-no-results-title">{messages.noResults}</h2>
            <p>{messages.noResultsBody}</p>
          </div>
          <Link href={localizedPath(locale, "/posts")}>{messages.clear}</Link>
        </section>
      ) : (
        <section aria-labelledby="recent-posts-title">
          {groupedPosts.map((group) => (
            <section
              className="archive-group"
              key={group.year}
              aria-labelledby={`archive-${group.year}`}
            >
              <header>
                <h3 id={`archive-${group.year}`}>{group.year}</h3>
                <span>{String(group.posts.length).padStart(2, "0")}</span>
              </header>
              <ol className="article-list">
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <article>
                      <div className="article-index">
                        {String(articleIndexBySlug.get(post.slug)).padStart(
                          2,
                          "0",
                        )}
                      </div>
                      <div className="article-copy">
                        <div className="article-meta">
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt, locale)}
                          </time>
                          <span>{post.viewCount} {messages.reads}</span>
                          <span>{post.likeCount} {messages.likes}</span>
                        </div>
                        <ViewTransition
                          name={articleTransitionName(post.slug)}
                          share="title-morph"
                          default="none"
                        >
                          <h4 lang={post.availableLocales.includes(locale) ? locale : locale === "en-US" ? "zh-CN" : "en-US"}>
                            <Link href={localizedPath(locale, `/posts/${post.slug}`)}>
                              {post.title}
                            </Link>
                          </h4>
                        </ViewTransition>
                        {post.description ? <p lang={post.availableLocales.includes(locale) ? locale : locale === "en-US" ? "zh-CN" : "en-US"}>{post.description}</p> : null}
                        {!post.availableLocales.includes(locale) ? <small>{locale === "en-US" ? "Original language · translation not yet available" : "原文 · 暂无当前语言译本"}</small> : null}
                        <ul
                          className="article-tags"
                          aria-label={messages.tags(post.title)}
                        >
                          {post.tags.map((tag) => (
                            <li key={tag}>
                              <Link
                                href={buildPostsHref(locale, {
                                  query: "",
                                  tag,
                                  year: "",
                                })}
                              >
                                #{tag}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        className="article-status"
                        href={localizedPath(locale, `/posts/${post.slug}`)}
                        aria-label={messages.read(post.title)}
                      >
                        ↗
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </section>
      )}
    </>
  );
}

export default async function PostsPage({ params, searchParams }: PostsPageProps) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const locale = rawLocale;
  return (
    <PageTransition>
      <main id="main-content" className="collection-page page-shell">
        <header className="collection-header page-intro">
          <p className="section-kicker">WRITING / ENGINEERING NOTES</p>
          <h1>{copy[locale].title}</h1>
          <p>{copy[locale].intro}</p>
        </header>

        <Suspense fallback={<PostsListSkeleton locale={locale} />}>
          <PostsIndex params={params} searchParams={searchParams} />
        </Suspense>
      </main>
    </PageTransition>
  );
}
