"use client";

import { ErrorFallback } from "@/components/error-fallback";
import { usePathname } from "next/navigation";

import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const en = usePathname().startsWith("/en-US");
  return (
    <html lang={en ? "en-US" : "zh-CN"}>
      <body>
        <title>{en ? "System error" : "系统异常"} · Linze.pro</title>
        <ErrorFallback
          error={error}
          retry={retry}
          label="ROOT / ERROR"
          title={en ? "Site temporarily unavailable" : "网站暂时无法显示"}
          description={en ? "The page shell could not render. Try again or visit later if the problem continues." : "页面框架没有正常完成渲染。可以重新尝试；如果问题持续存在，请稍后再访问。"}
        />
      </body>
    </html>
  );
}
