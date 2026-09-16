import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const adminSessionCookie = "linze_admin_session";

const defaultApiBaseUrl = "https://linze.pro/api/v1";

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  role: {
    name: string;
    level: number;
  };
};

export type AdminSession = {
  token: string;
  user: AdminUser;
};

export function getBackendApiUrl(path: string) {
  const baseUrl = (process.env.BLOG_API_URL ?? defaultApiBaseUrl).replace(
    /\/$/,
    "",
  );
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function decodeTokenSubject(token: string) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const claims: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (typeof claims !== "object" || claims === null) return null;
    const subject = Number((claims as Record<string, unknown>).sub);
    return Number.isSafeInteger(subject) && subject > 0 ? subject : null;
  } catch {
    return null;
  }
}

function parseAdminUser(value: unknown): AdminUser | null {
  if (typeof value !== "object" || value === null) return null;
  const user = value as Record<string, unknown>;
  const role = user.role;
  if (
    typeof user.id !== "number" ||
    typeof user.username !== "string" ||
    typeof user.email !== "string" ||
    typeof role !== "object" ||
    role === null ||
    typeof (role as Record<string, unknown>).name !== "string" ||
    typeof (role as Record<string, unknown>).level !== "number"
  ) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: {
      name: String((role as Record<string, unknown>).name),
      level: Number((role as Record<string, unknown>).level),
    },
  };
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminSession | null> {
  const userID = decodeTokenSubject(token);
  if (!userID) return null;

  try {
    const response = await fetch(getBackendApiUrl(`/users/${userID}`), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const payload: unknown = await response.json();
    if (typeof payload !== "object" || payload === null) return null;
    const user = parseAdminUser((payload as Record<string, unknown>).data);
    if (!user || user.id !== userID || user.role.name !== "admin") return null;
    return { token, user };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const token = (await cookies()).get(adminSessionCookie)?.value;
  return token ? verifyAdminToken(token) : null;
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export function requestHasTrustedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost ?? request.headers.get("host");
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
}
