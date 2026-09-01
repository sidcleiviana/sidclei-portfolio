import { MonoHeading } from "@/components/ui/MonoHeading";
import { isPubliclyVisible } from "@/domain/visibility";
import { ProjectCard } from "@/features/projects/ProjectCard";
import type { ExperienceProjectRef } from "@/sanity/types";

/**
 * "Projetos deste período" — the public projects that reference this
 * experience (Sprint 7 §19). The query already applies the public gate; this
 * re-filters with `isPubliclyVisible` as defense in depth (Sprint 7 §47).
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
      <div className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project._id} project={project} variant="compact" />
        ))}
      </div>
    </div>
  );
}
