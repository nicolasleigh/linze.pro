import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  adminSessionCookie,
  getAdminSession,
  getBackendApiUrl,
  requestHasTrustedOrigin,
  verifyAdminToken,
} from "@/lib/admin-session";

type LoginPayload = {
  email?: unknown;
  password?: unknown;
};

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "会话无效或已过期" }, { status: 401 });
  }
  return NextResponse.json({ user: session.user });
}

export async function POST(request: Request) {
  if (!requestHasTrustedOrigin(request)) {
    return NextResponse.json({ error: "请求来源无效" }, { status: 403 });
  }

  let input: LoginPayload;
  try {
    input = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ error: "登录参数格式不正确" }, { status: 400 });
  }

  const email = typeof input.email === "string" ? input.email.trim() : "";
  const password = typeof input.password === "string" ? input.password : "";
  if (!email || !password || email.length > 255 || password.length > 72) {
    return NextResponse.json({ error: "请输入有效的邮箱和密码" }, { status: 400 });
  }

  try {
    const response = await fetch(getBackendApiUrl("/auth/token"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      return NextResponse.json(
        { error: response.status === 401 ? "邮箱或密码错误" : "登录失败，请稍后重试" },
        { status: response.status },
      );
    }
    if (typeof payload !== "object" || payload === null) {
      return NextResponse.json({ error: "登录响应格式不正确" }, { status: 502 });
    }

    const data = (payload as Record<string, unknown>).data;
    if (typeof data !== "object" || data === null) {
      return NextResponse.json({ error: "登录响应格式不正确" }, { status: 502 });
    }
    const token = (data as Record<string, unknown>).token;
    if (typeof token !== "string") {
      return NextResponse.json({ error: "登录响应缺少令牌" }, { status: 502 });
    }

    const session = await verifyAdminToken(token);
    if (!session) {
      return NextResponse.json({ error: "该账号没有后台管理权限" }, { status: 403 });
    }

    (await cookies()).set(adminSessionCookie, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });
    return NextResponse.json({ user: session.user });
  } catch {
    return NextResponse.json({ error: "无法连接认证服务" }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!requestHasTrustedOrigin(request)) {
    return NextResponse.json({ error: "请求来源无效" }, { status: 403 });
  }
  (await cookies()).delete(adminSessionCookie);
  return new NextResponse(null, { status: 204 });
}
