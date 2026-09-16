import type { BlogLocale } from "@/types/post";

export type TranslationRecord = {
  postSlug: string;
  locale: BlogLocale;
  title: string;
  description: string;
  content: string;
  version: number;
  sourceUpdatedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  photo?: string;
};

export type TranslationRevision = {
  postSlug: string;
  locale: BlogLocale;
  version: number;
  title: string;
  description: string;
  sourceUpdatedAt?: string;
  createdAt: string;
};

export class AdminApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

async function adminRequest(path: string, init?: RequestInit) {
  const response = await fetch(`/api/admin/articles${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      typeof (payload as Record<string, unknown>).error === "string"
        ? String((payload as Record<string, unknown>).error)
        : `Request failed with ${response.status}`;
    throw new AdminApiError(message, response.status);
  }
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Invalid API response");
  }
  return (payload as Record<string, unknown>).data;
}

export async function loadTranslations(slug: string) {
  const data = await adminRequest(`/${encodeURIComponent(slug)}`);
  if (!Array.isArray(data)) throw new Error("Invalid translation response");
  return data as TranslationRecord[];
}

export async function loadTranslationRevisions(
  slug: string,
  locale: BlogLocale,
) {
  const data = await adminRequest(
    `/${encodeURIComponent(slug)}/${locale}/revisions`,
  );
  if (!Array.isArray(data)) throw new Error("Invalid revision response");
  return data as TranslationRevision[];
}

export async function publishTranslation(
  markdown: string,
  slug: string,
  locale: BlogLocale,
) {
  const formData = new FormData();
  formData.set(
    "file",
    new File([markdown], `${slug || "article"}.${locale}.md`, {
      type: "text/markdown",
    }),
  );
  if (slug) formData.set("slug", slug);
  formData.set("locale", locale);

  return (await adminRequest("", {
    method: "POST",
    body: formData,
  })) as TranslationRecord;
}

export async function updateTranslation(
  markdown: string,
  slug: string,
  locale: BlogLocale,
  version: number,
) {
  return (await adminRequest(
    `/${encodeURIComponent(slug)}/${locale}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown, version }),
    },
  )) as TranslationRecord;
}
