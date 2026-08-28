import { Badge, Cluster } from "@/components/ui";
import {
  authorshipLabel,
  isTeamProject,
  responsibilitiesList,
  rolesList,
} from "@/domain/contribution";
import type { Contribution } from "@/sanity/types";

/**
 * Makes authorship unambiguous without reading like a legal disclaimer
 * (Sprint §3, §13). Solo projects get one line. Team / participation projects
 * name the team context and *Sidclei's* roles — never inferred from tech or
 * skills, only what the CMS states.
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
    <div className="border-border bg-surface rounded-md border p-5">
      <p className="font-medium">{label ?? "Contribuição"}</p>

      {team && contribution.teamContext ? (
        <p className="text-fg-muted mt-1 text-sm">{contribution.teamContext}</p>
      ) : null}

      {roles.length ? (
        <div className="mt-4">
          <p className="text-fg-muted font-mono text-xs tracking-[0.12em] uppercase">
            {team ? "Minha atuação" : "Atuação"}
          </p>
          <Cluster gap="xs" className="mt-2">
            {roles.map((role) => (
              <Badge key={role} tone="accent">
                {role}
              </Badge>
            ))}
          </Cluster>
        </div>
      ) : null}

      {responsibilities.length ? (
        <ul className="text-fg-muted mt-4 space-y-1.5 text-sm">
          {responsibilities.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                aria-hidden
                className="bg-fg-muted mt-2 h-1 w-1 shrink-0 rounded-full"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {contribution.summary ? (
        <p className="text-fg-muted mt-4 text-sm leading-6">
          {contribution.summary}
        </p>
      ) : null}
    </div>
  );
}
