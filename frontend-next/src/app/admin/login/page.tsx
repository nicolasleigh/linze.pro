import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "管理员登录",
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main id="main-content" className="admin-login-page page-shell">
      <section className="admin-login-intro">
        <p className="section-kicker">PRIVATE / CONTENT SYSTEM</p>
        <h1>内容后台</h1>
        <p>发布 Markdown、维护中英文版本，并追踪每篇文章的版本状态。</p>
        <Link href="/">返回公开站点 ↗</Link>
      </section>
      <section className="admin-login-panel" aria-labelledby="admin-login-title">
        <header>
          <span>ADMIN / AUTH</span>
          <h2 id="admin-login-title">验证身份</h2>
        </header>
        <AdminLoginForm />
      </section>
    </main>
  );
}
