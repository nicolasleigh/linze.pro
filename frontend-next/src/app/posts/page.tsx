import { redirectToPreferredLocale } from "@/lib/locale-routing";

export default async function LegacyPostsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    if (["q", "tag", "year"].includes(key) && typeof value === "string") params.set(key, value);
  }
  await redirectToPreferredLocale(`/posts${params.size ? `?${params}` : ""}`);
}
