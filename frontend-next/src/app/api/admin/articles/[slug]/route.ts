import { adminApiError, forwardBackendResponse } from "@/lib/admin-route";
import { getAdminSession, getBackendApiUrl } from "@/lib/admin-session";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) return adminApiError("会话无效或已过期", 401);

  const { slug } = await params;
  try {
    const response = await fetch(
      getBackendApiUrl(`/posts/${encodeURIComponent(slug)}/translations`),
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        cache: "no-store",
      },
    );
    return forwardBackendResponse(response);
  } catch {
    return adminApiError("无法连接内容 API", 503);
  }
}
