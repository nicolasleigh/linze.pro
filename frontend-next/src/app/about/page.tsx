import { redirectToPreferredLocale } from "@/lib/locale-routing";

export default async function LegacyAboutPage() {
  await redirectToPreferredLocale("/about");
}
