import { Badge } from "@/components/ui";
import {
  authorshipLabel,
  isTeamProject,
  responsibilitiesList,
  rolesList,
} from "@/domain/contribution";
import type { Contribution } from "@/sanity/types";

/**
 * Makes authorship unambiguous without reading like a disclaimer (Sprint 7
 * §16). Solo projects get one line; team / participation projects name the team
 * context and *Sidclei's* roles — only what the CMS states, never inferred.
 */
export function ProjectContribution({
  contribution,
}: {
  contribution: Contribution;
}) {
  const label = authorshipLabel(contribution.authorship);
  const team = isTeamProject(contribution);
  const roles = rolesList(contribution);
  const responsibilities = responsibilitiesList(contribution);

  return (
    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-12">
      <div className="sm:col-span-4">
        <p className="font-display text-xl">{label ?? "Contribuição"}</p>
        {team && contribution.teamContext ? (
          <p className="text-fg-muted mt-1 text-sm">
            {contribution.teamContext}
          </p>
        ) : null}
        {roles.length ? (
          <div className="mt-4">
            <p className="u-label text-fg-faint">
              {team ? "Minha atuação" : "Atuação"}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {roles.map((role) => (
                <Badge key={role} tone="accent">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="sm:col-span-8">
        {responsibilities.length ? (
          <ul className="text-fg-muted space-y-2">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-fg-faint">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {contribution.summary ? (
          <p className="text-fg-muted mt-5 text-pretty">
            {contribution.summary}
          </p>
        ) : null}
      </div>
    </div>
  );
}
