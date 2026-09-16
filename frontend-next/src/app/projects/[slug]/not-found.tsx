import Link from "next/link";

import { SystemState } from "@/components/system-state";

export default function ProjectCaseNotFound() {
  return (
    <SystemState
      code="404"
      label="CASE STUDY / NOT FOUND"
      title="这个项目案例还没有发布"
      description="可以先从项目索引了解已经整理完成的项目与工程判断。"
      actions={
        <>
          <Link href="/projects">返回项目列表</Link>
          <Link href="/posts">阅读技术文章</Link>
        </>
      }
    />
  );
}
