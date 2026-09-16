"use client";

import { ErrorFallback } from "@/components/error-fallback";

export default function PostsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <ErrorFallback
      error={error}
      retry={retry}
      label="POSTS / ERROR"
      title="文章页面出现了意外问题"
      description="这不是正常的内容服务离线状态。可以重新尝试，或先返回首页继续浏览。"
    />
  );
}
