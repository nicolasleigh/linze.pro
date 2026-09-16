import Link from "next/link";
import { headers } from "next/headers";

import { SystemState } from "@/components/system-state";
import { isBlogLocale, localizedPath } from "@/lib/i18n";

export default async function ArticleNotFound() {
  const raw = (await headers()).get("x-site-locale") ?? "";
  const locale = isBlogLocale(raw) ? raw : "zh-CN";
  const en = locale === "en-US";
  return <SystemState code="404" label="ARTICLE / NOT FOUND"
    title={en ? "Article not found" : "没有找到这篇文章"}
    description={en ? "It may have moved, been renamed or not yet been published." : "文章可能已经移动、改名，或者尚未公开发布。"}
    actions={<><Link href={localizedPath(locale, "/posts")}>{en ? "All posts" : "查看全部文章"}</Link><Link href={localizedPath(locale)}>{en ? "Home" : "返回首页"}</Link></>} />;
}
