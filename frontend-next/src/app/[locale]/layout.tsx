import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/content/localized";
import { blogLocales, isBlogLocale, localizedPath, siteMessages } from "@/lib/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return blogLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const content = getSiteContent(rawLocale);
  const home = localizedPath(rawLocale);

  return {
    title: {
      default: rawLocale === "zh-CN" ? `${content.identity.name} · Go 后端与 AI 全栈工程师` : `${content.identity.englishName} · Go Backend & AI Full-stack Engineer`,
      template: "%s · Linze.pro",
    },
    description: content.description,
    alternates: {
      canonical: home,
      languages: { "zh-CN": "/zh-CN", "en-US": "/en-US", "x-default": "/zh-CN" },
      types: { "application/rss+xml": localizedPath(rawLocale, "/rss.xml") },
    },
    openGraph: {
      type: "website",
      locale: rawLocale.replace("-", "_"),
      alternateLocale: blogLocales.filter((item) => item !== rawLocale).map((item) => item.replace("-", "_")),
      url: home,
      siteName: content.name,
      title: rawLocale === "zh-CN" ? `${content.identity.name} · Go 后端与 AI 全栈工程师` : `${content.identity.englishName} · Go Backend & AI Full-stack Engineer`,
      description: content.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isBlogLocale(rawLocale)) notFound();
  const copy = siteMessages[rawLocale];

  return (
    <div lang={rawLocale} data-locale={rawLocale}>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <SiteHeader locale={rawLocale} />
      {children}
      <SiteFooter locale={rawLocale} />
    </div>
  );
}
