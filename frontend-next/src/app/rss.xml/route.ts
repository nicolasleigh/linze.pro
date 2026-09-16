import { createRssFeed } from "@/lib/rss-feed";

export const revalidate = 300;

export async function GET() {
  return createRssFeed("zh-CN");
}
