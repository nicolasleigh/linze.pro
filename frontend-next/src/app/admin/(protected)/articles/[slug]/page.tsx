import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleManager } from "@/components/article-manager";
import { isBlogLocale } from "@/lib/i18n";

type EditArticlePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string | string[] }>;
};

export const metadata: Metadata = { title: "编辑文章" };

export default async function EditAdminArticlePage({
  params,
  searchParams,
}: EditArticlePageProps) {
  const { slug } = await params;
  if (!slug) notFound();
  const rawLocale = (await searchParams).locale;
  const localeValue = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale;
  const locale = localeValue && isBlogLocale(localeValue) ? localeValue : "zh-CN";

  return <ArticleManager initialSlug={slug} initialLocale={locale} />;
}
