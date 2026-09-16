import Link from "next/link";
import { headers } from "next/headers";

import { SystemState } from "@/components/system-state";
import { isBlogLocale, localizedPath } from "@/lib/i18n";

export default async function NotFound() {
  const rawLocale = (await headers()).get("x-site-locale") ?? "";
  const locale = isBlogLocale(rawLocale) ? rawLocale : "zh-CN";
  const en = locale === "en-US";
  return (
    <SystemState
      code="404"
      label="ROUTE / NOT FOUND"
      title={en ? "This page could not be found" : "这里没有你要找的页面"}
      description={en ? "The link may have moved or the address may be incorrect. Start again from writing or projects." : "链接可能已经失效，或者地址输入有误。你可以从文章与项目索引重新开始。"}
      actions={
        <>
          <Link href={localizedPath(locale, "/posts")}>{en ? "Explore writing" : "浏览文章"}</Link>
          <Link href={localizedPath(locale, "/projects")}>{en ? "View projects" : "查看项目"}</Link>
        </>
      }
      suggestions={
        <nav aria-label={en ? "404 quick navigation" : "404 页面快捷导航"}>
          <p>{en ? "Or go to" : "也可以前往"}</p>
          <ul>
            <li><Link href={localizedPath(locale)}>{en ? "Home" : "首页"}</Link></li>
            <li><Link href={localizedPath(locale, "/about")}>{en ? "About" : "关于"}</Link></li>
            <li><a href="mailto:nicolas.leigh@qq.com">{en ? "Contact" : "联系我"}</a></li>
          </ul>
        </nav>
      }
    />
  );
}
