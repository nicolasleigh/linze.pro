import { NextResponse } from "next/server";

import { adminApiError, forwardBackendResponse } from "@/lib/admin-route";
import {
  getAdminSession,
  getBackendApiUrl,
  requestHasTrustedOrigin,
} from "@/lib/admin-session";
import { revalidatePublishedContent } from "@/lib/revalidate-content";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return adminApiError("会话无效或已过期", 401);

  try {
    const response = await fetch(getBackendApiUrl("/posts?page=1&limit=200"), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    return forwardBackendResponse(response);
  } catch {
    return adminApiError("无法连接内容 API", 503);
  }
}

export async function POST(request: Request) {
  if (!requestHasTrustedOrigin(request)) {
    return adminApiError("请求来源无效", 403);
  }
  const session = await getAdminSession();
  if (!session) return adminApiError("会话无效或已过期", 401);

  try {
    const formData = await request.formData();
    const response = await fetch(getBackendApiUrl("/posts/import"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: formData,
      cache: "no-store",
    });
    if (response.ok) {
      revalidatePublishedContent();
    }
    return forwardBackendResponse(response);
  } catch {
    return NextResponse.json({ error: "文章发布请求失败" }, { status: 502 });
  }
}
