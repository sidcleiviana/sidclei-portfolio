import { groq } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { SiteSettings } from "../types";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    defaultOgImage,
    "primaryNav": coalesce(primaryNav, []),
    footerNote
  }
`;

export function getSiteSettings() {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: [CACHE_TAGS.siteSettings],
    fallback: null,
  });
}
