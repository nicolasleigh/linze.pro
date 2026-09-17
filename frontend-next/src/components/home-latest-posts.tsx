import Link from 'next/link';
import { ViewTransition } from 'react';

import { articleTransitionName } from '@/lib/article';
import { getRecentPosts } from '@/lib/blog-api';
import { localizedPath } from '@/lib/i18n';
import type { BlogLocale } from '@/types/post';

const messages = {
  'zh-CN': {
    unavailable: '文章服务暂时不可用',
    unavailableBody: '首页其他内容仍可正常浏览，你也可以稍后前往文章归档重试。',
    empty: '最新文章正在整理中',
    emptyBody: '新的技术记录发布后会优先出现在这里。',
    original: '原文 · 暂无中文译本',
    reads: '次阅读',
    likes: '个喜欢',
    read: (title: string) => `阅读《${title}》`,
  },
  'en-US': {
    unavailable: 'Writing is temporarily unavailable',
    unavailableBody: 'The rest of the homepage is still available. Try the writing archive again later.',
    empty: 'New writing is on the way',
    emptyBody: 'Fresh engineering notes will appear here when they are published.',
    original: 'Original language · English translation pending',
    reads: 'reads',
    likes: 'likes',
    read: (title: string) => `Read ${title}`,
  },
} as const;

function formatDate(value: string, locale: BlogLocale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return locale === 'en-US' ? 'Date unavailable' : '日期未知';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function HomeLatestPostsSkeleton({ locale }: { locale: BlogLocale }) {
  return (
    <div className='home-post-skeleton' aria-label={locale === 'en-US' ? 'Loading latest writing' : '正在加载最新文章'} aria-busy='true'>
      {[0, 1, 2].map((item) => (
        <div key={item}>
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

export async function HomeLatestPosts({ locale }: { locale: BlogLocale }) {
  const result = await getRecentPosts(3, locale);
  const copy = messages[locale];

  if (!result.ok) {
    return (
      <div className='home-post-state' role='status'>
        <span aria-hidden='true'>API / OFFLINE</span>
        <div>
          <h3>{copy.unavailable}</h3>
          <p>{copy.unavailableBody}</p>
        </div>
      </div>
    );
  }

  if (result.posts.length === 0) {
    return (
      <div className='home-post-state'>
        <span aria-hidden='true'>00 / POSTS</span>
        <div>
          <h3>{copy.empty}</h3>
          <p>{copy.emptyBody}</p>
        </div>
      </div>
    );
  }

  return (
    <ol className='home-post-list'>
      {result.posts.map((post, index) => {
        const hasTranslation = post.availableLocales.includes(locale);
        const contentLocale = hasTranslation ? locale : locale === 'en-US' ? 'zh-CN' : 'en-US';
        const postHref = localizedPath(locale, `/posts/${post.slug}`);

        return (
          <li key={post.slug}>
            <article>
              <span className='home-post-index' aria-hidden='true'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className='home-post-copy' lang={contentLocale}>
                <div className='home-post-meta'>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                  <span>{post.viewCount} {copy.reads}</span>
                  <span>{post.likeCount} {copy.likes}</span>
                  {!hasTranslation ? <em>{copy.original}</em> : null}
                </div>
                <ViewTransition name={articleTransitionName(post.slug)} share='title-morph' default='none'>
                  <h3>
                    <Link href={postHref}>{post.title}</Link>
                  </h3>
                </ViewTransition>
                {post.description ? <p>{post.description}</p> : null}
                <ul className='home-post-tags' aria-label={locale === 'en-US' ? `Topics for ${post.title}` : `${post.title}的主题`}>
                  {post.tags.slice(0, 4).map((tag) => (
                    <li key={tag}>#{tag}</li>
                  ))}
                </ul>
              </div>
              <Link className='home-post-arrow' href={postHref} aria-label={copy.read(post.title)}>
                ↗
              </Link>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
