import { redirect } from "next/navigation";

import { preferredLocale } from "@/lib/locale-routing";

type LegacyArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyArticlePage({
  params,
}: LegacyArticlePageProps) {
  const { slug } = await params;
  const locale = await preferredLocale();
  redirect(`/${locale}/posts/${encodeURIComponent(slug)}`);
}
