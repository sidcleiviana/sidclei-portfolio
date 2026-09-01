import type { MetadataRoute } from "next";

import { siteUrl } from "@/sanity/env";
import { getKnowledgeSlugs, getProjectSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, knowledge] = await Promise.all([
    getProjectSlugs(),
    getKnowledgeSlugs(),
  ]);
  const base = siteUrl.replace(/\/$/, "");

  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/projects`, priority: 0.8 },
    { url: `${base}/experiencia`, priority: 0.8 },
    { url: `${base}/conhecimento`, priority: 0.7 },
    ...slugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      priority: 0.6,
    })),
    ...knowledge.skills.map((slug) => ({
      url: `${base}/conhecimento/competencias/${slug}`,
      priority: 0.4,
    })),
    ...knowledge.technologies.map((slug) => ({
      url: `${base}/conhecimento/tecnologias/${slug}`,
      priority: 0.4,
    })),
  ];
}
