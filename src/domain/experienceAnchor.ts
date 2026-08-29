/**
 * `experience` has no slug in the schema (Sprint 3 schema audit). We derive a
 * deterministic anchor from company + role so a case study can link straight
 * to the right step of `/experiencia`. Same inputs → same anchor on both
 * sides. No schema change.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function experienceAnchor(exp: {
  company?: string | null;
  role?: string | null;
}): string {
  const parts = [exp.company, exp.role].filter(Boolean).join("-");
  return slugify(parts || "experiencia") || "experiencia";
}

/**
 * Anchors for a whole list, de-duplicated (two roles at the same company get a
 * `-2`, `-3` suffix in list order).
 */
export function uniqueExperienceAnchors<
  T extends { company?: string | null; role?: string | null },
>(experiences: T[]): string[] {
  const seen = new Map<string, number>();
  return experiences.map((exp) => {
    const base = experienceAnchor(exp);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  });
}
