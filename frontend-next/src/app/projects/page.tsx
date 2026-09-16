import { redirectToPreferredLocale } from "@/lib/locale-routing";

export default async function LegacyProjectsPage() {
  await redirectToPreferredLocale("/projects");
}
