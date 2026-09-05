import { defineQuery } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { HomeData } from "../types";

/**
 * One round trip for the whole Home ("Modular Surfaces" direction). Four
 * modules, no N+1:
 *
 * - `profile` — identity for the hero.
 * - `projects` — public projects newest first (`featured` carried so the page
 *   can prefer it); each carries its roles + technology names for the
 *   FeaturedProject module.
 * - `experiences` — the four most recent roles with the fuller projection the
 *   TrajectorySelector needs (summary, responsibilities, skills, technologies,
 *   related public projects). Same ordering as `/experiencia`.
 * - `featuredSkills` — up to six featured skills for the KnowledgeExplorer,
 *   each with its **real contexts** (experiences + public projects) and the
 *   technologies that appear *in those contexts* — never a Skill→Technology
 *   edge.
 *
 * The public gate (`status == "published" && visibility != "private"`) is
 * inlined into every project projection so a private/unpublished project can
 * never reach the Home.
 */
export const homeQuery = defineQuery(`{
  "profile": *[_type == "profile"][0] {
    name,
    headline,
    shortSummary,
    publicLocation,
    resumeUrl,
    professionalEmail,
    "links": coalesce(links, []),
    photo{ "alt": coalesce(alt, ""), asset, hotspot, crop }
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
    period,
    "roles": contribution.roles,
    "technologies": technologies[]->{ _id, name, "slug": slug.current }
  },

  "experiences": *[_type == "experience"] | order(
    coalesce(period.ongoing, false) desc,
    period.startDate desc
  )[0...4] {
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
      _id, title, "slug": slug.current, visibility
    }
  },

  "featuredSkills": *[_type == "skill" && featured == true && defined(slug.current)]
    | order(lower(name) asc)[0...6] {
      _id,
      name,
      "slug": slug.current,
      category,
      shortDescription,
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
    }
}`);

export function getHome() {
  return sanityFetch<HomeData>({
    query: homeQuery,
    tags: [
      CACHE_TAGS.profile,
      CACHE_TAGS.projects,
      CACHE_TAGS.experience,
      CACHE_TAGS.knowledge,
      CACHE_TAGS.skills,
    ],
    fallback: {
      profile: null,
      projects: [],
      experiences: [],
      featuredSkills: [],
    },
  });
}
