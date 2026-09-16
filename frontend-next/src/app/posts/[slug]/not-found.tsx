import Link from "next/link";

import { SystemState } from "@/components/system-state";

export default function ArticleNotFound() {
  return (
    <SystemState
      code="404"
      label="ARTICLE / NOT FOUND"
      title="没有找到这篇文章"
      description="文章可能已经移动、改名，或者尚未公开发布。"
      actions={
        <>
          <Link href="/posts">查看全部文章</Link>
          <Link href="/">返回首页</Link>
        </>
      }
    />
  );
}
