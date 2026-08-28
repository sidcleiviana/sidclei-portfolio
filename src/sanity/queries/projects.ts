import { groq } from "next-sanity";

import { CACHE_TAGS, sanityFetch } from "../fetch";
import type { ProjectDetail, ProjectListItem } from "../types";

/**
 * The public gate. A project is only ever exposed when it is published AND its
 * visibility is not "private" (Sprint §20, §57). This lives in the query itself
 * so private content never leaves the CMS, regardless of the UI.
 */
const PUBLIC_FILTER = `_type == "project" && status == "published" && visibility != "private"`;

const listFields = groq`
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  projectType,
  featured,
  visibility,
  coverImage,
  period,
  contribution,
  "technologies": technologies[]->{
    _id, name, "slug": slug.current, category, icon
  }
`;

export const projectsListQuery = groq`
  *[${PUBLIC_FILTER}] | order(
    featured desc,
    coalesce(publishedAt, period.startDate, "") desc,
    title asc
  ) {
    ${listFields}
  }
`;

export const projectSlugsQuery = groq`
  *[${PUBLIC_FILTER} && defined(slug.current)].slug.current
`;

export const projectBySlugQuery = groq`
  *[${PUBLIC_FILTER} && slug.current == $slug][0] {
    ${listFields},
    context,
    problem,
    publishedAt,
    "skills": skills[]->{ _id, name, "slug": slug.current, category },
    relatedExperience->{ _id, company, role, period },
    relatedEducation->{ _id, institution, course },
    "links": coalesce(links, []),
    "evidence": coalesce(evidence, []),
    "metrics": coalesce(metrics, []),
    "contentBlocks": coalesce(contentBlocks[]{ ... }, []),
    confidentialityNotice,
    seo
  }
`;

export function getProjects() {
  return sanityFetch<ProjectListItem[]>({
    query: projectsListQuery,
    tags: [CACHE_TAGS.projects],
    fallback: [],
  });
}

export function getProjectSlugs() {
  return sanityFetch<string[]>({
    query: projectSlugsQuery,
    tags: [CACHE_TAGS.projects],
    fallback: [],
  });
}

export function getProjectBySlug(slug: string) {
  return sanityFetch<ProjectDetail | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [CACHE_TAGS.projects, `${CACHE_TAGS.project}:${slug}`],
    fallback: null,
  });
}
