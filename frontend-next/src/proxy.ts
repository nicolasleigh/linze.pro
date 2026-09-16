import { NextResponse, type NextRequest } from "next/server";

import { isBlogLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1];
  if (!isBlogLocale(locale)) return NextResponse.next();

  const headers = new Headers(request.headers);
  headers.set("x-site-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/zh-CN/:path*", "/en-US/:path*"],
};
