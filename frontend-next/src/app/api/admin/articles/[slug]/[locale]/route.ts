import { NextResponse } from "next/server";

import { adminApiError, forwardBackendResponse } from "@/lib/admin-route";
import {
  getAdminSession,
  getBackendApiUrl,
  requestHasTrustedOrigin,
} from "@/lib/admin-session";
import { isBlogLocale } from "@/lib/i18n";
import { revalidatePublishedContent } from "@/lib/revalidate-content";

type RouteContext = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function PUT(request: Request, { params }: RouteContext) {
  if (!requestHasTrustedOrigin(request)) {
    return adminApiError("请求来源无效", 403);
  }
  const session = await getAdminSession();
  if (!session) return adminApiError("会话无效或已过期", 401);

  const { slug, locale } = await params;
  if (!isBlogLocale(locale)) return adminApiError("不支持的文章语言", 400);

  try {
    const response = await fetch(
      getBackendApiUrl(
        `/posts/${encodeURIComponent(slug)}/translations/${locale}`,
      ),
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
        body: await request.text(),
        cache: "no-store",
      },
    );
    if (response.ok) {
      revalidatePublishedContent(slug);
    }
    return forwardBackendResponse(response);
  } catch {
    return NextResponse.json({ error: "文章更新请求失败" }, { status: 502 });
  }
}
