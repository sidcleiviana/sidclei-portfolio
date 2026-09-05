import { Container, Rule } from "@/components/ui";
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
 * The monumental top of the case (Sprint 7 §16): an index mark, the title set
 * as a graphic element, the roles, a strong rule, then the stack. Empty fields
 * never render; nothing is invented. The anonymised note is an editorial aside,
 * not a warning (Sprint 7 §48).
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
    <Container size="editorial" as="header">
      <div data-animate="rise">
        <p className="u-label">
          <span className="text-accent tabular-nums">01</span> /{" "}
          {projectTypeLabel(project.projectType)}
          {authorshipLabel ? (
            <span className="text-fg-faint"> · {authorshipLabel}</span>
          ) : null}
          {period ? <span className="text-fg-faint"> · {period}</span> : null}
        </p>

        <h1
          id="project-title"
          className="font-display mt-8 max-w-[16ch] text-[clamp(2.75rem,8.5vw,6.25rem)] leading-[0.98] tracking-[var(--tracking-display)] text-balance"
        >
          {project.title}
        </h1>

        {project.shortDescription ? (
          <p className="text-fg-muted mt-10 max-w-[var(--container-prose)] text-xl leading-8 text-pretty">
            {project.shortDescription}
          </p>
        ) : null}

        {roles ? (
          <p className="u-label mt-8">
            <span className="text-fg-faint">Minha atuação</span> {roles}
          </p>
        ) : null}

        <Rule weight="accent" className="mt-14" />

        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-12">
          {technologies.length ? (
            <div className="sm:col-span-8">
              <p className="u-label text-fg-faint mb-2.5 text-[0.65rem]">
                Stack
              </p>
              <ul className="text-fg-faint flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs">
                {technologies.map((tech) => (
                  <li key={tech._id}>{tech.name}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {notice ? (
            <p className="text-fg-muted border-l border-[var(--color-border-strong)] pl-4 text-sm text-pretty sm:col-span-4">
              {notice}
            </p>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
