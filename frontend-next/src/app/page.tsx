import { redirectToPreferredLocale } from "@/lib/locale-routing";

export default async function RootPage() {
  await redirectToPreferredLocale();
}
