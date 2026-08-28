import Link from "next/link";

import { SanityImage } from "@/components/content/SanityImage";
import { rolesSummary } from "@/domain/contribution";
import { formatDateRange } from "@/domain/dateRange";
import { projectTypeLabel } from "@/domain/projectType";
import type { ProjectListItem } from "@/sanity/types";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const period = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const technologies = project.technologies ?? [];

  return (
    <article className="border-border hover:border-muted relative flex flex-col overflow-hidden rounded-[var(--radius)] border transition-colors">
      {project.coverImage?.asset ? (
        <SanityImage
          image={project.coverImage}
          sizes="(min-width: 768px) 384px, 100vw"
          ratio={16 / 9}
          className="w-full object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-muted flex items-center gap-2 text-xs">
          <span className="bg-surface rounded px-2 py-0.5 font-medium">
            {projectTypeLabel(project.projectType)}
          </span>
          {period ? <span>{period}</span> : null}
        </div>

        <h3 className="text-base font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-muted line-clamp-3 text-sm">
          {project.shortDescription}
        </p>

        {roles ? (
          <p className="text-muted text-xs">
            <span className="text-foreground font-medium">
              Minha contribuição:
            </span>{" "}
            {roles}
          </p>
        ) : null}

        {technologies.length ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {technologies.slice(0, 6).map((tech) => (
              <li
                key={tech._id}
                className="border-border text-muted rounded border px-1.5 py-0.5 text-xs"
              >
                {tech.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
