import Link from "next/link";
import { headers } from "next/headers";

import { SystemState } from "@/components/system-state";
import { isBlogLocale, localizedPath } from "@/lib/i18n";

export default async function ProjectCaseNotFound() {
  const raw = (await headers()).get("x-site-locale") ?? "";
  const locale = isBlogLocale(raw) ? raw : "zh-CN";
  const en = locale === "en-US";
  return <SystemState code="404" label="CASE STUDY / NOT FOUND"
    title={en ? "This case study is not published" : "这个项目案例还没有发布"}
    description={en ? "Explore the published projects and their engineering decisions instead." : "可以先从项目索引了解已经整理完成的项目与工程判断。"}
    actions={<><Link href={localizedPath(locale, "/projects")}>{en ? "All projects" : "返回项目列表"}</Link><Link href={localizedPath(locale, "/posts")}>{en ? "Read writing" : "阅读技术文章"}</Link></>} />;
}
