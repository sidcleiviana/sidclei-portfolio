import { Container } from "@/components/ui";
import { rolesSummary } from "@/domain/contribution";
import { formatDateRange } from "@/domain/dateRange";
import { projectTypeLabel } from "@/domain/projectType";
import { isAnonymized } from "@/domain/visibility";
import type { ProjectDetail } from "@/sanity/types";

const AUTHORSHIP_SHORT: Record<string, string> = {
  individual: "Individual",
  team: "Em equipe",
  participation: "Participação",
};

/**
 * The case opening — navy-deep. Type / authorship / period as mono meta, the
 * title, the description, the roles, then the stack. Empty fields never
 * render; nothing is invented. The anonymised note is a discreet aside.
 */
export function ProjectHeader({ project }: { project: ProjectDetail }) {
  const period = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const authorship = project.contribution?.authorship;
  const authorshipLabel = authorship ? AUTHORSHIP_SHORT[authorship] : null;
  const technologies = (project.technologies ?? []).filter((t) => t?.name);
  const notice =
    isAnonymized(project) && project.confidentialityNotice
      ? project.confidentialityNotice
      : null;

  return (
    <Container size="wide" as="header">
      <p className="u-label">
        {projectTypeLabel(project.projectType)}
        {authorshipLabel ? (
          <span className="text-fg-faint"> · {authorshipLabel}</span>
        ) : null}
        {period ? <span className="text-fg-faint"> · {period}</span> : null}
      </p>

      <h1
        id="project-title"
        className="font-display mt-5 max-w-[20ch] text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.03] tracking-[var(--tracking-tight)]"
      >
        {project.title}
      </h1>

      {project.shortDescription ? (
        <p className="text-fg-muted mt-6 max-w-[var(--container-prose)] text-md text-pretty">
          {project.shortDescription}
        </p>
      ) : null}

      {roles ? (
        <p className="u-label mt-6">
          <span className="text-fg-faint">Minha atuação</span> {roles}
        </p>
      ) : null}

      <div className="border-border-strong mt-10 grid gap-x-10 gap-y-6 border-t pt-6 sm:grid-cols-12">
        {technologies.length ? (
          <div className="sm:col-span-8">
            <p className="u-label mb-2">Stack</p>
            <ul className="text-fg-faint flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
              {technologies.map((tech) => (
                <li key={tech._id}>{tech.name}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {notice ? (
          <p className="text-fg-muted border-border-strong border-l pl-4 text-sm text-pretty sm:col-span-4">
            {notice}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
