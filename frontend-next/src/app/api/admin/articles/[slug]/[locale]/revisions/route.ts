import { adminApiError, forwardBackendResponse } from "@/lib/admin-route";
import { getAdminSession, getBackendApiUrl } from "@/lib/admin-session";
import { isBlogLocale } from "@/lib/i18n";

type RouteContext = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) return adminApiError("会话无效或已过期", 401);

  const { slug, locale } = await params;
  if (!isBlogLocale(locale)) return adminApiError("不支持的文章语言", 400);

  try {
    const response = await fetch(
      getBackendApiUrl(
        `/posts/${encodeURIComponent(slug)}/translations/${locale}/revisions`,
      ),
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
