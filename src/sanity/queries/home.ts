import { defineQuery } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { HomeData } from "../types";

/**
 * One round trip for the whole Home (Sprint §38): the profile identity, a light
 * list of public projects (newest first — `featured` is carried so the page can
 * prefer it), and the two most recent experiences for the career entry point.
 * Every projection is card-light — no content blocks, no evidence, no full
 * timeline (Sprint §39). The public gate is inlined in the projects filter so a
 * private/unpublished project can never reach the Home (Sprint §41).
 */
export const homeQuery = defineQuery(`{
  "profile": *[_type == "profile"][0] {
    name,
    headline,
    shortSummary,
    publicLocation,
    resumeUrl,
    professionalEmail,
    "links": coalesce(links, [])
  },
  "projects": *[
    _type == "project" && status == "published" && visibility != "private"
  ] | order(featured desc, coalesce(publishedAt, period.startDate, "") desc, title asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    projectType,
    featured,
    visibility,
    coverImage,
    "technologies": technologies[]->{ _id, name, "slug": slug.current, category }
  },
  "experiences": *[_type == "experience"] | order(
    coalesce(period.ongoing, false) desc,
    period.startDate desc
  )[0...2] {
    _id,
    company,
    role,
    period,
    location
  }
}`);

export function getHome() {
  return sanityFetch<HomeData>({
    query: homeQuery,
    tags: [CACHE_TAGS.profile, CACHE_TAGS.projects, CACHE_TAGS.experience],
    fallback: { profile: null, projects: [], experiences: [] },
  });
}
