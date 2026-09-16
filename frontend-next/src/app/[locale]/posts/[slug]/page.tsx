import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { ArticleContent } from "@/components/article-content";
import { ArticleEngagement } from "@/components/article-engagement";
import { ArticleTableOfContents } from "@/components/article-table-of-contents";
import { PageTransition } from "@/components/page-transition";
import {
  articleTransitionName,
  buildTableOfContents,
  estimateReadingTime,
} from "@/lib/article";
import { getLocalizedPostBySlug, getRecentPosts } from "@/lib/blog-api";
import { articleMessages, blogLocales, isBlogLocale, localizedPath } from "@/lib/i18n";

export const revalidate = 300;
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function requireLocale(value: string) {
  if (!isBlogLocale(value)) notFound();
  return value;
}

function formatDate(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === "en-US" ? "Unknown date" : "日期未知";
  }
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function generateStaticParams() {
  const result = await getRecentPosts(100);
  if (!result.ok) return [];

  return result.posts.flatMap((post) =>
    blogLocales.map((locale) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const result = await getLocalizedPostBySlug(slug, locale);

  if (!result.ok) {
    return {
      title: result.reason === "not-found" ? (locale === "en-US" ? "Article not found" : "文章未找到") : (locale === "en-US" ? "Article unavailable" : "文章暂时不可用"),
      robots: { index: false, follow: false },
    };
  }

  const { post } = result;
  const canonicalLocale = post.fallback ? post.resolvedLocale : locale;
  const canonicalPath = `/${canonicalLocale}/posts/${post.slug}`;
  const languages = Object.fromEntries(
    post.availableLocales.map((item) => [item, `/${item}/posts/${post.slug}`]),
  );
  languages["x-default"] = `/${post.availableLocales.includes("zh-CN") ? "zh-CN" : post.resolvedLocale}/posts/${post.slug}`;
  const images = post.photo ? [{ url: post.photo, alt: post.title }] : [];

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalPath, languages },
    robots: post.fallback ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      locale: post.resolvedLocale.replace("-", "_"),
      alternateLocale: post.availableLocales
        .filter((item) => item !== post.resolvedLocale)
        .map((item) => item.replace("-", "_")),
      url: canonicalPath,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: {
      card: post.photo ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function LocalizedArticlePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const copy = articleMessages[locale];
  const result = await getLocalizedPostBySlug(slug, locale);

  if (!result.ok && result.reason === "not-found") notFound();
  if (!result.ok) {
    return (
      <PageTransition>
        <main
          id="main-content"
          className="article-page page-shell"
          lang={locale}
        >
          <section
            className="collection-state"
            aria-labelledby="article-unavailable-title"
          >
            <span aria-hidden="true">API / OFFLINE</span>
            <div>
              <h1 id="article-unavailable-title">{copy.unavailableTitle}</h1>
              <p>{copy.unavailableBody}</p>
            </div>
            <Link href={localizedPath(locale, "/posts")} transitionTypes={["nav-back"]}>
              {copy.back}
            </Link>
          </section>
        </main>
      </PageTransition>
    );
  }

  const { post } = result;
  const tableOfContents = buildTableOfContents(post.content);
  const readingMinutes = estimateReadingTime(post.content);
  const articleUrl = `https://linze.pro/${post.resolvedLocale}/posts/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        inLanguage: post.resolvedLocale,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        image: post.photo || undefined,
        author: { "@type": "Person", name: post.author },
        keywords: post.tags.join(", "),
        mainEntityOfPage: articleUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.home,
            item: `https://linze.pro/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.posts,
            item: `https://linze.pro/${locale}/posts`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <main
        id="main-content"
        className="article-page page-shell"
        lang={post.resolvedLocale}
        data-available-locales={post.availableLocales.join(",")}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <nav className="breadcrumbs" aria-label={locale === "en-US" ? "Breadcrumb" : "面包屑导航"}>
          <Link href={localizedPath(locale)} transitionTypes={["nav-back"]}>
            {copy.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={localizedPath(locale, "/posts")} transitionTypes={["nav-back"]}>
            {copy.posts}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.article}</span>
        </nav>

        <header className="article-header page-intro">
          <div className="article-language-row">
            <p className="section-kicker">ARTICLE / {post.tags.join(" · ")}</p>
            <nav className="article-language-switch" aria-label={copy.language}>
              {blogLocales.map((item) => {
                const available = post.availableLocales.includes(item);
                const current = item === post.resolvedLocale;
                const label = item === "zh-CN" ? "中文" : "EN";

                if (current) {
                  return (
                    <span
                      key={item}
                      lang={item}
                      aria-current="page"
                      data-state="current"
                    >
                      {label}
                    </span>
                  );
                }

                if (!available) {
                  const unavailableLabel = copy.languageUnavailable(
                    item === "zh-CN" ? "中文" : "English",
                  );

                  return (
                    <span
                      key={item}
                      lang={item}
                      aria-disabled="true"
                      aria-label={unavailableLabel}
                      title={unavailableLabel}
                      data-state="disabled"
                    >
                      {label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item}
                    href={`/${item}/posts/${post.slug}`}
                    hrefLang={item}
                    lang={item}
                    replace
                    data-state="available"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {post.fallback ? (
            <p className="article-language-fallback" role="status">
              <span aria-hidden="true">↳</span> {copy.fallback}
            </p>
          ) : null}

          <ViewTransition
            name={articleTransitionName(post.slug)}
            share="title-morph"
            default="none"
          >
            <h1>{post.title}</h1>
          </ViewTransition>
          {post.description ? (
            <p className="article-deck">{post.description}</p>
          ) : null}

          <dl className="article-facts">
            <div>
              <dt>{copy.published}</dt>
              <dd>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt, locale)}
                </time>
              </dd>
            </div>
            <div>
              <dt>{copy.readingTime}</dt>
              <dd>{copy.minutes(readingMinutes)}</dd>
            </div>
            <div>
              <dt>{copy.author}</dt>
              <dd>{post.author}</dd>
            </div>
          </dl>

          <ArticleEngagement
            slug={post.slug}
            locale={locale}
            initialViewCount={post.viewCount}
            initialLikeCount={post.likeCount}
          />

          <ul className="article-header-tags" aria-label={copy.topics}>
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link href={{ pathname: localizedPath(locale, "/posts"), query: { tag } }}>
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </header>

        <div className="article-layout">
          {tableOfContents.length > 0 ? (
            <ArticleTableOfContents
              items={tableOfContents}
              label={copy.contents}
            />
          ) : (
            <aside className="article-toc">
              <div className="article-toc-heading">
                <p>{copy.contents}</p>
              </div>
              <span>{copy.noSections}</span>
            </aside>
          )}
          <ArticleContent content={post.content} />
        </div>

        <footer className="article-footer motion-section">
          <p>{copy.completed}</p>
          <Link href={localizedPath(locale, "/posts")} transitionTypes={["nav-back"]}>
            {copy.back} <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </main>
    </PageTransition>
  );
}
