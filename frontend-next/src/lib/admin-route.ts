import "server-only";

import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-session";

export async function requireAdminApiSession() {
  const session = await getAdminSession();
  return session;
}

export async function forwardBackendResponse(response: Response) {
  const body = await response.text();
  return new NextResponse(body || null, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export function adminApiError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
