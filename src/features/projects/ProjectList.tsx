import { Container, Surface } from "@/components/ui";
import { rolesList } from "@/domain/contribution";
import { projectTypeLabel } from "@/domain/projectType";
import { FeaturedProjectCard } from "@/features/home/FeaturedProjectCard";
import type { ProjectListItem } from "@/sanity/types";

import { ProjectCard } from "./ProjectCard";

/**
 * `/projects` — the first project is lifted onto a paper surface with the
 * interactive integrations composition; the rest are a composed list of rows.
 * The mix (one feature + rows) keeps it from reading as a grid of cards.
 */
export function ProjectList({ projects }: { projects: ProjectListItem[] }) {
  if (!projects.length) {
    return (
      <Container size="wide">
        <p className="text-fg-muted border-border border-t pt-6 font-mono text-sm">
          Nenhum projeto publicado ainda.
        </p>
      </Container>
    );
  }

  const [lead, ...rest] = projects;

  return (
    <>
      {lead?.slug && lead.title ? (
        <Surface kind="paper" pad="lg" className="mt-4">
          <Container size="wide">
            <FeaturedProjectCard
              project={{
                title: lead.title,
                slug: lead.slug,
                shortDescription: lead.shortDescription,
                typeLabel: projectTypeLabel(lead.projectType),
                roles: rolesList(lead.contribution),
                technologies: (lead.technologies ?? [])
                  .map((t) => t?.name)
                  .filter((n): n is string => Boolean(n)),
              }}
            />
          </Container>
        </Surface>
      ) : null}

      {rest.length ? (
        <Container size="wide" className="mt-4">
          {rest.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </Container>
      ) : null}
    </>
  );
}
