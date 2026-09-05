import { Container, Kicker, Surface } from "@/components/ui";
import { rolesList } from "@/domain/contribution";
import { projectTypeLabel } from "@/domain/projectType";
import { isPubliclyVisible } from "@/domain/visibility";
import type { HomeProjectRef } from "@/sanity/types";

import { FeaturedProjectCard, type FeaturedProjectView } from "./FeaturedProjectCard";

/**
 * The evidence surface — paper, advancing over the graphite ground. Prefers a
 * project flagged `featured`; falls back to the most recent. Renders nothing
 * when there is no public project.
 */
export function FeaturedProject({ projects }: { projects: HomeProjectRef[] }) {
  const visible = projects.filter(isPubliclyVisible);
  const chosen = visible.find((p) => p.featured) ?? visible[0];
  if (!chosen?.slug || !chosen.title) return null;

  const view: FeaturedProjectView = {
    title: chosen.title,
    slug: chosen.slug,
    shortDescription: chosen.shortDescription,
    typeLabel: projectTypeLabel(chosen.projectType),
    roles: rolesList({ roles: chosen.roles }),
    technologies: (chosen.technologies ?? [])
      .map((t) => t?.name)
      .filter((n): n is string => Boolean(n)),
  };

  return (
    <Surface kind="paper" pad="lg">
      <Container size="wide">
        <Kicker className="mb-8">Trabalho em destaque</Kicker>
        <FeaturedProjectCard project={view} />
      </Container>
    </Surface>
  );
}
