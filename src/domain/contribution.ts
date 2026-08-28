import type { Authorship, Contribution } from "@/sanity/types";

export const AUTHORSHIP_LABELS: Record<Authorship, string> = {
  individual: "Projeto individual",
  team: "Projeto em equipe",
  participation: "Participação em projeto maior",
};

export function authorshipLabel(value?: Authorship | string): string | null {
  if (!value) return null;
  return AUTHORSHIP_LABELS[value as Authorship] ?? null;
}

export function isTeamProject(contribution?: Contribution | null): boolean {
  return (
    contribution?.authorship === "team" ||
    contribution?.authorship === "participation"
  );
}

/** A short "Backend · QA" summary of the roles, or null when none. */
export function rolesSummary(
  contribution?: Contribution | null
): string | null {
  const roles = contribution?.roles?.filter(Boolean) ?? [];
  return roles.length ? roles.join(" · ") : null;
}
