import { defineQuery } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { ExperienceEntry } from "../types";

/**
 * One round trip for the whole `/experiencia` page (Sprint §40 — no N+1):
 * every experience, newest first (a current role sorts above a finished one),
 * and per experience its **public** related projects via the inverse of
 * `project.relatedExperience`. The projects subquery repeats the exact public
 * gate (`status == "published" && visibility != "private"`) so a private or
 * unpublished project can never leak through the relation (Sprint §8).
 * The project projection is light — cards only, no content blocks (Sprint §41).
 */
export const experiencesQuery = defineQuery(`*[_type == "experience"] | order(
    coalesce(period.ongoing, false) desc,
    period.startDate desc
  ) {
    _id,
    company,
    role,
    period,
    location,
    summary,
    responsibilities,
    "skills": skills[]->{ _id, name, "slug": slug.current, category },
    "technologies": technologies[]->{ _id, name, "slug": slug.current, category },
    "projects": *[
      _type == "project"
      && references(^._id)
      && status == "published"
      && visibility != "private"
    ] | order(coalesce(publishedAt, period.startDate, "") desc) {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      projectType,
      visibility,
      "technologies": technologies[]->{ _id, name, "slug": slug.current, category }
    }
  }`);

export function getExperiences() {
  return sanityFetch<ExperienceEntry[]>({
    query: experiencesQuery,
    tags: [CACHE_TAGS.experience, CACHE_TAGS.projects],
    fallback: [],
  });
}
