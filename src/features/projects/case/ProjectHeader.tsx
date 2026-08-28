import { Badge, Cluster, Container, Stack } from "@/components/ui";
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
 * The editorial top of the case — establishes, at a glance (Sprint §5, §6):
 * what it is, its nature, whether it was solo or a team, when, the roles, and
 * the core stack. Empty fields never render; nothing is invented.
 */
export function ProjectHeader({ project }: { project: ProjectDetail }) {
  const period = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const authorship = project.contribution?.authorship;
  const technologies = (project.technologies ?? []).filter((t) => t?.name);
  const notice =
    isAnonymized(project) && project.confidentialityNotice
      ? project.confidentialityNotice
      : null;

  return (
    <Container size="prose" as="header">
      <Stack gap="md" data-animate="rise">
        <Cluster gap="xs">
          <Badge tone="accent">{projectTypeLabel(project.projectType)}</Badge>
          {authorship && AUTHORSHIP_SHORT[authorship] ? (
            <Badge tone="outline">{AUTHORSHIP_SHORT[authorship]}</Badge>
          ) : null}
        </Cluster>

        <h1 id="project-title" className="text-3xl sm:text-4xl">
          {project.title}
        </h1>

        {project.shortDescription ? (
          <p className="text-fg-muted text-lg text-pretty">
            {project.shortDescription}
          </p>
        ) : null}

        {notice ? (
          <p className="border-border bg-bg-subtle text-fg-muted rounded-md border p-4 text-sm">
            {notice}
          </p>
        ) : null}

        {period || roles ? (
          <dl className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-8">
            {period ? (
              <div>
                <dt className="text-fg-muted font-mono text-xs tracking-[0.12em] uppercase">
                  Período
                </dt>
                <dd className="mt-0.5">{period}</dd>
              </div>
            ) : null}
            {roles ? (
              <div>
                <dt className="text-fg-muted font-mono text-xs tracking-[0.12em] uppercase">
                  Minha atuação
                </dt>
                <dd className="mt-0.5">{roles}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {technologies.length ? (
          <Cluster gap="xs" aria-label="Tecnologias principais">
            {technologies.slice(0, 6).map((tech) => (
              <Badge key={tech._id} tone="outline" mono>
                {tech.name}
              </Badge>
            ))}
          </Cluster>
        ) : null}
      </Stack>
    </Container>
  );
}
