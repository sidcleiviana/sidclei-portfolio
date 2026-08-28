import type { ProjectListItem } from "@/sanity/types";

import { ProjectCard } from "./ProjectCard";

export function ProjectList({ projects }: { projects: ProjectListItem[] }) {
  if (!projects.length) {
    return (
      <p className="border-border text-muted rounded-[var(--radius)] border border-dashed p-8 text-center text-sm">
        Nenhum projeto publicado ainda.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project._id} className="flex">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
