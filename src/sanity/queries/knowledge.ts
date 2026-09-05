import { defineQuery } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type {
  KnowledgeHubData,
  KnowledgeMapData,
  SkillDetail,
  TechnologyDetail,
} from "../types";

/**
 * `/conhecimento` — the explorer, in one round trip. Every skill and every
 * technology carries its **real contexts**: the experiences and public
 * projects that reference it. A skill additionally carries the technologies
 * present *in those contexts* — never a `Skill -> Technology` edge (Sprint §7):
 * co-occurrence in the same experience/project is a context, not a relation.
 * The public gate is inlined into every project subquery.
 */
export const knowledgeHubQuery = defineQuery(`{
  "skills": *[_type == "skill" && defined(slug.current)] | order(featured desc, lower(name) asc) {
    _id, name, "slug": slug.current, category, shortDescription, featured,
    "contextExperiences": *[_type == "experience" && references(^._id)]
      | order(coalesce(period.ongoing, false) desc, period.startDate desc) {
        _id, company, role
      },
    "contextProjects": *[
      _type == "project" && references(^._id)
      && status == "published" && visibility != "private"
    ] | order(coalesce(publishedAt, period.startDate, "") desc) {
      _id, title, "slug": slug.current, visibility
    },
    "contextTechnologies": array::unique(
      *[_type == "experience" && references(^._id)].technologies[]->name
      + *[
          _type == "project" && references(^._id)
          && status == "published" && visibility != "private"
        ].technologies[]->name
    )
  },
  "technologies": *[_type == "technology" && defined(slug.current)] | order(lower(name) asc) {
    _id, name, "slug": slug.current, category,
    "contextExperiences": *[_type == "experience" && references(^._id)]
      | order(coalesce(period.ongoing, false) desc, period.startDate desc) {
        _id, company, role
      },
    "contextProjects": *[
      _type == "project" && references(^._id)
      && status == "published" && visibility != "private"
    ] | order(coalesce(publishedAt, period.startDate, "") desc) {
      _id, title, "slug": slug.current, visibility
    }
  }
}`);

/**
 * Skill detail: the competence, plus every real context it appears in —
 * experiences (inverse of `experience.skills`) and public projects (inverse of
 * `project.skills`). No `Skill -> Technology` edge is queried or implied
 * (Sprint §7).
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
  },
  "contextTechnologies": array::unique(
    *[_type == "experience" && references(^._id)].technologies[]->name
    + *[
        _type == "project" && references(^._id)
        && status == "published" && visibility != "private"
      ].technologies[]->name
  )
}`);

/** Technology detail — same shape as {@link skillBySlugQuery} without context tech. */
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
    tags: [
      CACHE_TAGS.knowledge,
      CACHE_TAGS.skills,
      CACHE_TAGS.technologies,
      CACHE_TAGS.experience,
      CACHE_TAGS.projects,
    ],
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

/**
 * `/conhecimento/mapa` — one relational projection, no N+1 (Sprint 9 §B, §43).
 * Just the entities and the reference lists needed to derive the 5 real edge
 * types in `src/domain/knowledgeGraph.ts`. No content blocks, no evidence, no
 * responsibilities. Projects pass the public gate inline; a private/unpublished
 * project never appears here, so its edges never exist. No `Skill -> Technology`
 * relation is queried (§3, §42).
 */
export const knowledgeMapQuery = defineQuery(`{
  "experiences": *[_type == "experience"] | order(
      coalesce(period.ongoing, false) desc, period.startDate desc
    ) {
    _id, company, role, period,
    "skillRefs": skills[]._ref,
    "technologyRefs": technologies[]._ref
  },
  "projects": *[
    _type == "project" && status == "published" && visibility != "private"
  ] | order(coalesce(publishedAt, period.startDate, "") desc) {
    _id, title, "slug": slug.current, projectType, visibility,
    "roles": contribution.roles,
    "experienceRef": relatedExperience._ref,
    "skillRefs": skills[]._ref,
    "technologyRefs": technologies[]._ref
  },
  "skills": *[_type == "skill" && defined(slug.current)] | order(
      featured desc, lower(name) asc
    ) {
    _id, name, "slug": slug.current, category, featured
  },
  "technologies": *[_type == "technology" && defined(slug.current)] | order(
      lower(name) asc
    ) {
    _id, name, "slug": slug.current, category
  }
}`);

export function getKnowledgeMap() {
  return sanityFetch<KnowledgeMapData>({
    query: knowledgeMapQuery,
    tags: [
      CACHE_TAGS.knowledge,
      CACHE_TAGS.skills,
      CACHE_TAGS.technologies,
      CACHE_TAGS.experience,
      CACHE_TAGS.projects,
    ],
    fallback: {
      experiences: [],
      projects: [],
      skills: [],
      technologies: [],
    },
  });
}
