import { Grid } from "@/components/ui/Grid";
import { MonoHeading } from "@/components/ui/MonoHeading";
import { isPubliclyVisible } from "@/domain/visibility";
import { ProjectCard } from "@/features/projects/ProjectCard";
import type { ExperienceProjectRef } from "@/sanity/types";

/**
 * "Projetos deste período" — the public projects that reference this
 * experience (Sprint §18). The query already applies the public gate; this
 * filters again with `isPubliclyVisible` as defense in depth (Sprint §8).
 */
export function ExperienceProjects({
  projects,
}: {
  projects: ExperienceProjectRef[];
}) {
  const visible = projects.filter(isPubliclyVisible);
  if (!visible.length) return null;

  return (
    <div>
      <MonoHeading>Projetos deste período</MonoHeading>
      <Grid minCol="16" gap="gap-4" className="mt-3">
        {visible.map((project) => (
          <ProjectCard key={project._id} project={project} variant="compact" />
        ))}
      </Grid>
    </div>
  );
}
