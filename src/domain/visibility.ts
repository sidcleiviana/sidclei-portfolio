import type { ProjectVisibility } from "@/sanity/types";

/** Anything carrying a visibility flag (query results have `... | null`). */
type HasVisibility = { visibility?: ProjectVisibility | null };

/**
 * Defense in depth. The GROQ queries already exclude `visibility == "private"`
 * (see src/sanity/queries/projects.ts), but any code path that renders a
 * project publicly runs it through this predicate too, so a mistake in a query
 * can never leak private content (Sprint §20, §57, docs/architecture.md).
 */
export function isPubliclyVisible(project: HasVisibility): boolean {
  return project.visibility === "public" || project.visibility === "anonymized";
}

export function filterPubliclyVisible<T extends HasVisibility>(
  projects: T[]
): T[] {
  return projects.filter(isPubliclyVisible);
}

export function isAnonymized(project: HasVisibility): boolean {
  return project.visibility === "anonymized";
}
