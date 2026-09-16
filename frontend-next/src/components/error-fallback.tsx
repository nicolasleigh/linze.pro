"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SystemState } from "@/components/system-state";
import { isBlogLocale, localizedPath } from "@/lib/i18n";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  retry: () => void;
  label?: string;
  title?: string;
  description?: string;
};

export function ErrorFallback({
  error,
  retry,
  label = "SYSTEM / ERROR",
  title = "页面暂时无法显示",
  description = "这次请求没有正常完成。可以重新尝试，或者先返回首页继续浏览。",
}: ErrorFallbackProps) {
  const rawLocale = usePathname().split("/")[1];
  const locale = isBlogLocale(rawLocale) ? rawLocale : "zh-CN";
  const en = locale === "en-US";
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SystemState
      code="500"
      label={label}
      title={en && title === "页面暂时无法显示" ? "Page temporarily unavailable" : title}
      description={en && description === "这次请求没有正常完成。可以重新尝试，或者先返回首页继续浏览。" ? "The request did not complete. Try again or return home." : description}
      actions={
        <>
          <button type="button" onClick={() => retry()}>{en ? "Try again" : "重新尝试"}</button>
          <Link href={localizedPath(locale)}>{en ? "Back to home" : "返回首页"}</Link>
        </>
      }
    />
  );
}
