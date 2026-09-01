import { defineQuery } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { KnowledgeHubData, SkillDetail, TechnologyDetail } from "../types";

/**
 * The public gate for related projects. A Skill / Technology must never reveal
 * that a private or unpublished project exists (Sprint §21). Inlined into every
 * relational subquery, exactly as `src/sanity/queries/projects.ts` does.
 */

/**
 * `/conhecimento` in one round trip (Sprint §23). Just the entities and their
 * categories — the hub does not show relation counts (a count would read as a
 * proficiency signal, Sprint §3). Relations live on the detail pages.
 */
export const knowledgeHubQuery = defineQuery(`{
  "skills": *[_type == "skill" && defined(slug.current)] | order(featured desc, lower(name) asc) {
    _id, name, "slug": slug.current, category, shortDescription, featured,
    "contexts": array::unique(*[_type == "experience" && references(^._id)].company)
  },
  "technologies": *[_type == "technology" && defined(slug.current)] | order(lower(name) asc) {
    _id, name, "slug": slug.current, category,
    "contexts": array::unique(*[_type == "experience" && references(^._id)].company)
  }
}`);

/**
 * Skill detail: the competence, plus every real context it appears in —
 * experiences (inverse of `experience.skills`) and public projects (inverse of
 * `project.skills`). No `Skill -> Technology` edge is queried or implied
 * (Sprint §7): co-occurrence in the same experience is not a relation.
 */
export const skillBySlugQuery = defineQuery(`*[
  _type == "skill" && slug.current == $slug
][0] {
  _id, name, "slug": slug.current, category, shortDescription, featured,
  "experiences": *[_type == "experience" && references(^._id)] | order(
    coalesce(period.ongoing, false) desc, period.startDate desc
  ) { _id, company, role, period },
  "projects": *[
    _type == "project" && references(^._id)
    && status == "published" && visibility != "private"
  ] | order(coalesce(publishedAt, period.startDate, "") desc) {
    _id, title, "slug": slug.current, shortDescription, projectType, visibility,
    "technologies": technologies[]->{ _id, name }
  }
}`);

/** Technology detail — same shape as {@link skillBySlugQuery}. */
export const technologyBySlugQuery = defineQuery(`*[
  _type == "technology" && slug.current == $slug
][0] {
  _id, name, "slug": slug.current, category, officialUrl,
  "experiences": *[_type == "experience" && references(^._id)] | order(
    coalesce(period.ongoing, false) desc, period.startDate desc
  ) { _id, company, role, period },
  "projects": *[
    _type == "project" && references(^._id)
    && status == "published" && visibility != "private"
  ] | order(coalesce(publishedAt, period.startDate, "") desc) {
    _id, title, "slug": slug.current, shortDescription, projectType, visibility,
    "technologies": technologies[]->{ _id, name }
  }
}`);

/** Slugs for `generateStaticParams` and the sitemap. */
export const knowledgeSlugsQuery = defineQuery(`{
  "skills": *[_type == "skill" && defined(slug.current)].slug.current,
  "technologies": *[_type == "technology" && defined(slug.current)].slug.current
}`);

export function getKnowledgeHub() {
  return sanityFetch<KnowledgeHubData>({
    query: knowledgeHubQuery,
    tags: [CACHE_TAGS.knowledge, CACHE_TAGS.skills, CACHE_TAGS.technologies],
    fallback: { skills: [], technologies: [] },
  });
}

export function getSkillBySlug(slug: string) {
  return sanityFetch<SkillDetail | null>({
    query: skillBySlugQuery,
    params: { slug },
    tags: [
      CACHE_TAGS.knowledge,
      CACHE_TAGS.skills,
      `skill:${slug}`,
      CACHE_TAGS.experience,
      CACHE_TAGS.projects,
    ],
    fallback: null,
  });
}

export function getTechnologyBySlug(slug: string) {
  return sanityFetch<TechnologyDetail | null>({
    query: technologyBySlugQuery,
    params: { slug },
    tags: [
      CACHE_TAGS.knowledge,
      CACHE_TAGS.technologies,
      `technology:${slug}`,
      CACHE_TAGS.experience,
      CACHE_TAGS.projects,
    ],
    fallback: null,
  });
}

export function getKnowledgeSlugs() {
  return sanityFetch<{ skills: string[]; technologies: string[] }>({
    query: knowledgeSlugsQuery,
    tags: [CACHE_TAGS.knowledge, CACHE_TAGS.skills, CACHE_TAGS.technologies],
    fallback: { skills: [], technologies: [] },
  });
}
