import type { MetadataRoute } from "next";

import { siteUrl } from "@/sanity/env";
import { getProjectSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const base = siteUrl.replace(/\/$/, "");

  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/projects`, priority: 0.8 },
    ...slugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      priority: 0.6,
    })),
  ];
}
