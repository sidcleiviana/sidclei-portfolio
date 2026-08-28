import type { MetadataRoute } from "next";

import { siteUrl } from "@/sanity/env";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/", "/dev/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
