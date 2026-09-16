import type { Metadata } from "next";
import Link from "next/link";

import { AdminArticleList } from "@/components/admin-article-list";
import { getAdminPosts } from "@/lib/admin-posts";

export const metadata: Metadata = { title: "文章管理" };

export default async function AdminArticlesPage() {
  const result = await getAdminPosts();

  return (
    <main id="main-content" className="admin-articles-page">
      <header className="admin-page-heading">
        <div>
          <p className="section-kicker">CONTENT / ARTICLES</p>
          <h1>文章管理</h1>
          <p>检查语言完整度、搜索内容，并进入对应语言版本继续编辑。</p>
        </div>
        <Link className="admin-primary-action" href="/admin/articles/new">
          新建文章 <span aria-hidden="true">＋</span>
        </Link>
      </header>

      {result.ok ? (
        <AdminArticleList posts={result.posts} />
      ) : (
        <section className="admin-service-warning" role="alert">
          <strong>文章列表加载失败</strong>
          <p>{result.reason}</p>
        </section>
      )}
    </main>
  );
}
