import { defineQuery } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { Profile } from "../types";

export const profileQuery = defineQuery(`*[_type == "profile"][0] {
    name,
    headline,
    shortSummary,
    about,
    publicLocation,
    photo,
    professionalEmail,
    resumeUrl,
    "links": coalesce(links, [])
  }`);

export function getProfile() {
  return sanityFetch<Profile | null>({
    query: profileQuery,
    tags: [CACHE_TAGS.profile],
    fallback: null,
  });
}
