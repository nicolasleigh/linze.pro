import { notFound } from "next/navigation";

import { isBlogLocale } from "@/lib/i18n";
import { createRssFeed } from "@/lib/rss-feed";

export const revalidate = 300;

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) notFound();
  return createRssFeed(locale);
}
