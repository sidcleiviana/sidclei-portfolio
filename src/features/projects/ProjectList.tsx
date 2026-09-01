import type { ProjectListItem } from "@/sanity/types";

import { ProjectCard } from "./ProjectCard";

/**
 * `/projects` as an editorial collection of works — a numbered list bound by
 * rules, not a grid of cards (Sprint 7 §15).
 */
export function ProjectList({ projects }: { projects: ProjectListItem[] }) {
  if (!projects.length) {
    return (
      <p className="text-fg-muted border-t border-[var(--color-border)] pt-6 font-mono text-sm">
        Nenhum projeto publicado ainda.
      </p>
    );
  }

  return (
    <div className="border-b border-[var(--color-rule)]">
      {projects.map((project, i) => (
        <ProjectCard
          key={project._id}
          project={project}
          variant="index"
          index={i + 1}
        />
      ))}
    </div>
  );
}
