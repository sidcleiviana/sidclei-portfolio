import type { ProjectListItem, ProjectVisibility } from "@/sanity/types";

/**
 * Defense in depth. The GROQ queries already exclude `visibility == "private"`
 * (see src/sanity/queries/projects.ts), but any code path that renders a
 * project publicly runs it through this predicate too, so a mistake in a query
 * can never leak private content (Sprint §20, §57, docs/architecture.md).
 */
export function isPubliclyVisible(
  project:
    Pick<ProjectListItem, "visibility"> | { visibility?: ProjectVisibility }
): boolean {
  return project.visibility === "public" || project.visibility === "anonymized";
}

export function filterPubliclyVisible<
  T extends { visibility?: ProjectVisibility },
>(projects: T[]): T[] {
  return projects.filter(isPubliclyVisible);
}

export function isAnonymized(project: {
  visibility?: ProjectVisibility;
}): boolean {
  return project.visibility === "anonymized";
}
