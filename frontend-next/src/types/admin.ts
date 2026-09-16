import type { BlogLocale } from "@/types/post";

export type AdminPostSummary = {
  slug: string;
  title: string;
  titleZh: string;
  titleEn: string;
  description: string;
  tags: string[];
  updatedAt: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  availableLocales: BlogLocale[];
};
