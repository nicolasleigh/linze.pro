import { revalidatePath, revalidateTag } from "next/cache";

import { blogLocales } from "@/lib/i18n";

export function revalidatePublishedContent(slug?: string) {
  revalidateTag("posts", { expire: 0 });
  revalidateTag("post-tags", { expire: 0 });
  if (slug) revalidateTag(`post:${slug}`, { expire: 0 });
  for (const locale of blogLocales) {
    revalidatePath(`/${locale}/posts`);
    revalidatePath(`/${locale}/rss.xml`);
    if (slug) {
      revalidateTag(`post:${slug}:${locale}`, { expire: 0 });
      revalidatePath(`/${locale}/posts/${slug}`);
    }
  }
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
}
