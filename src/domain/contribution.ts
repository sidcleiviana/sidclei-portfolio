import type { Authorship } from "@/sanity/types";

export const AUTHORSHIP_LABELS: Record<Authorship, string> = {
  individual: "Projeto individual",
  team: "Projeto em equipe",
  participation: "Participação em projeto maior",
};

/** Structural subset — domain code does not depend on the `_type` tag. */
type ContributionLike = {
  authorship?: string | null;
  roles?: Array<string | null> | null;
};

export function authorshipLabel(
  value?: Authorship | string | null
): string | null {
  if (!value) return null;
  return AUTHORSHIP_LABELS[value as Authorship] ?? null;
}

export function isTeamProject(contribution?: ContributionLike | null): boolean {
  return (
    contribution?.authorship === "team" ||
    contribution?.authorship === "participation"
  );
}

/** A short "Backend · QA" summary of the roles, or null when none. */
export function rolesSummary(
  contribution?: ContributionLike | null
): string | null {
  const roles = (contribution?.roles ?? []).filter((role): role is string =>
    Boolean(role)
  );
  return roles.length ? roles.join(" · ") : null;
}
