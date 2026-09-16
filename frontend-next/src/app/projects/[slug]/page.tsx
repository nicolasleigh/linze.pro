import { redirectToPreferredLocale } from "@/lib/locale-routing";

export default async function LegacyProjectCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await redirectToPreferredLocale(`/projects/${encodeURIComponent(slug)}`);
}
