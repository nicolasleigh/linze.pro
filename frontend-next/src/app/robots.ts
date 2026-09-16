import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${siteContent.url}/sitemap.xml`,
    host: siteContent.url,
  };
}
