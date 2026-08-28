import { Grid } from "@/components/ui/Grid";
import type { ProjectListItem } from "@/sanity/types";

import { ProjectCard } from "./ProjectCard";

export function ProjectList({ projects }: { projects: ProjectListItem[] }) {
  if (!projects.length) {
    return (
      <p className="border-border bg-bg-subtle text-fg-muted rounded-md border border-dashed p-8 text-center text-sm">
        Nenhum projeto publicado ainda.
      </p>
    );
  }

  return (
    <Grid minCol="18">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </Grid>
  );
}
