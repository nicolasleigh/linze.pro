"use client";

import { usePathname } from "next/navigation";

import { ErrorFallback } from "@/components/error-fallback";

export default function PostsError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const en = usePathname().startsWith("/en-US/");
  return <ErrorFallback error={error} retry={retry} label="POSTS / ERROR"
    title={en ? "An unexpected problem occurred" : "文章页面出现了意外问题"}
    description={en ? "This is not the normal content-service offline state. Try again or return home." : "这不是正常的内容服务离线状态。可以重新尝试，或先返回首页继续浏览。"} />;
}
