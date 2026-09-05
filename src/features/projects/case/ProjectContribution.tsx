import { Tag } from "@/components/ui";
import {
  authorshipLabel,
  isTeamProject,
  responsibilitiesList,
  rolesList,
} from "@/domain/contribution";
import type { Contribution } from "@/sanity/types";

/**
 * Makes authorship unambiguous without reading like a disclaimer. Solo
 * projects get one line; team / participation projects name the team context
 * and *Sidclei's* roles — only what the CMS states, never inferred.
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
        <p className="font-display text-md font-bold">
          {label ?? "Contribuição"}
        </p>
        {team && contribution.teamContext ? (
          <p className="text-fg-muted mt-1 text-sm">{contribution.teamContext}</p>
        ) : null}
        {roles.length ? (
          <div className="mt-4">
            <p className="u-label mb-2">{team ? "Minha atuação" : "Atuação"}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {roles.map((role) => (
                <Tag key={role} tone="accent">
                  {role}
                </Tag>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="sm:col-span-8">
        {responsibilities.length ? (
          <ul className="text-fg-muted flex flex-col gap-2">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span aria-hidden className="text-fg-faint">—</span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {contribution.summary ? (
          <p className="text-fg-muted mt-5 text-sm text-pretty">
            {contribution.summary}
          </p>
        ) : null}
      </div>
    </div>
  );
}
