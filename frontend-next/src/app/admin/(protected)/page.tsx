import Link from "next/link";

import { getAdminPosts } from "@/lib/admin-posts";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "日期未知"
    : new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
}

export default async function AdminDashboardPage() {
  const result = await getAdminPosts();
  const posts = result.ok ? result.posts : [];
  const complete = posts.filter(
    (post) => post.availableLocales.length === 2,
  ).length;
  const missing = posts.length - complete;
  const recent = [...posts]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 5);

  return (
    <main id="main-content" className="admin-dashboard">
      <header className="admin-page-heading">
        <div>
          <p className="section-kicker">ADMIN / OVERVIEW</p>
          <h1>内容概览</h1>
        </div>
        <Link className="admin-primary-action" href="/admin/articles/new">
          新建文章 <span aria-hidden="true">＋</span>
        </Link>
      </header>

      {!result.ok ? (
        <section className="admin-service-warning" role="alert">
          <strong>内容服务暂不可用</strong>
          <p>{result.reason}，登录会话仍然有效。</p>
        </section>
      ) : null}

      <section className="admin-metrics" aria-label="内容统计">
        <div>
          <span>ARTICLE / TOTAL</span>
          <strong>{String(posts.length).padStart(2, "0")}</strong>
          <p>全部文章</p>
        </div>
        <div>
          <span>I18N / COMPLETE</span>
          <strong>{String(complete).padStart(2, "0")}</strong>
          <p>中英文完整</p>
        </div>
        <div data-warning={missing > 0 || undefined}>
          <span>I18N / MISSING</span>
          <strong>{String(missing).padStart(2, "0")}</strong>
          <p>缺少翻译</p>
        </div>
      </section>

      <section className="admin-recent" aria-labelledby="recent-updates-title">
        <header>
          <div>
            <p className="section-kicker">RECENT / UPDATES</p>
            <h2 id="recent-updates-title">最近更新</h2>
          </div>
          <Link href="/admin/articles">查看全部 →</Link>
        </header>
        {recent.length === 0 ? (
          <p className="admin-empty-copy">还没有可管理的文章。</p>
        ) : (
          <ol>
            {recent.map((post, index) => (
              <li key={post.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.slug}</p>
                </div>
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                <Link
                  href={`/admin/articles/${post.slug}?locale=${post.availableLocales[0] ?? "zh-CN"}`}
                >
                  编辑 →
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
