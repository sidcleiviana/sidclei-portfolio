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
  responsibilities?: Array<string | null> | null;
  summary?: string | null;
  teamContext?: string | null;
};

function clean(list?: Array<string | null> | null): string[] {
  return (list ?? []).filter((v): v is string => Boolean(v && v.trim()));
}

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

/** Roles as an array ("Backend", "QA / Testes"). Never inferred from tech/skills. */
export function rolesList(contribution?: ContributionLike | null): string[] {
  return clean(contribution?.roles);
}

export function responsibilitiesList(
  contribution?: ContributionLike | null
): string[] {
  return clean(contribution?.responsibilities);
}

/** A short "Backend · QA" summary of the roles, or null when none. */
export function rolesSummary(
  contribution?: ContributionLike | null
): string | null {
  const roles = rolesList(contribution);
  return roles.length ? roles.join(" · ") : null;
}

/** True when the contribution object carries anything worth rendering. */
export function hasContribution(
  contribution?: ContributionLike | null
): boolean {
  if (!contribution) return false;
  return Boolean(
    contribution.authorship ||
    contribution.teamContext ||
    contribution.summary ||
    rolesList(contribution).length ||
    responsibilitiesList(contribution).length
  );
}
