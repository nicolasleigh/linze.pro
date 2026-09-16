import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";

import { siteContent } from "@/content/site";
import { isBlogLocale } from "@/lib/i18n";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.url),
  title: {
    default: `${siteContent.identity.name} · 全栈开发者`,
    template: "%s · Linze.pro",
  },
  description: siteContent.description,
  applicationName: siteContent.name,
  authors: [{ name: siteContent.identity.name, url: "/about" }],
  creator: siteContent.identity.name,
  publisher: siteContent.identity.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: siteContent.name,
    title: `${siteContent.identity.name} · 全栈开发者`,
    description: siteContent.description,
  },
  twitter: {
    card: "summary",
    title: `${siteContent.identity.name} · 全栈开发者`,
    description: siteContent.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#09101c" },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestedLocale = (await headers()).get("x-site-locale") ?? "";
  const locale = isBlogLocale(requestedLocale) ? requestedLocale : "zh-CN";
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
