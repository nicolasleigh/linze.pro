import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin-logout-button";
import { requireAdminSession } from "@/lib/admin-session";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await requireAdminSession();

  return (
    <div className="admin-workspace page-shell">
      <header className="admin-workspace-header">
        <Link className="admin-workspace-brand" href="/admin">
          <span>LZ / CMS</span>
          <small>Content workspace</small>
        </Link>
        <nav aria-label="后台导航">
          <Link href="/admin">概览</Link>
          <Link href="/admin/articles">文章</Link>
          <Link href="/admin/articles/new">新建</Link>
          <Link href="/" target="_blank" rel="noreferrer">
            博客首页 ↗
          </Link>
        </nav>
        <div className="admin-account">
          <span>
            {user.username}
            <small>{user.email}</small>
          </span>
          <AdminLogoutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
