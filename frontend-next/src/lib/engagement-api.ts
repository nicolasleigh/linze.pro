export type Engagement = {
  viewCount: number;
  likeCount: number;
  liked: boolean;
  created?: boolean;
  counted?: boolean;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_BLOG_API_URL ?? "/api/v1").replace(
  /\/$/,
  "",
);

function isEngagement(value: unknown): value is Engagement {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.viewCount === "number" &&
    typeof candidate.likeCount === "number" &&
    typeof candidate.liked === "boolean"
  );
}

async function requestEngagement(
  slug: string,
  path = "",
  init?: RequestInit,
): Promise<Engagement> {
  const response = await fetch(
    `${apiBaseUrl}/posts/${encodeURIComponent(slug)}/engagement${path}`,
    {
      ...init,
      credentials: "include",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Engagement request failed with ${response.status}`);
  }

  const payload: unknown = await response.json();
  const data =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>).data
      : null;

  if (!isEngagement(data)) {
    throw new Error("Engagement response is invalid");
  }

  return data;
}

export function getEngagement(slug: string, signal?: AbortSignal) {
  return requestEngagement(slug, "", { signal });
}

export function likePost(slug: string) {
  return requestEngagement(slug, "/like", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
}

export function recordPostView(slug: string) {
  return requestEngagement(slug, "/view", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  });
}
