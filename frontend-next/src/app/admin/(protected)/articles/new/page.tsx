import type { Metadata } from "next";

import { ArticleManager } from "@/components/article-manager";

export const metadata: Metadata = { title: "新建文章" };

export default function NewAdminArticlePage() {
  return <ArticleManager />;
}
