import Link from "next/link";

import { Tag } from "@/components/ui";
import { rolesSummary } from "@/domain/contribution";
import { formatDateRange } from "@/domain/dateRange";
import { projectTypeLabel } from "@/domain/projectType";
import type {
  Contribution,
  DateRange,
  ProjectType,
} from "@/sanity/types";

type CardProject = {
  _id: string;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  projectType: ProjectType | null;
  technologies?: Array<{ _id: string; name: string | null } | null> | null;
  period?: DateRange | null;
  contribution?: Contribution | null;
};

/**
 * One project as a border-separated row — type / period / roles as mono meta,
 * the title as the reading anchor, description, then the stack. Not a boxed
 * card: the collection reads as a composed list, not a grid.
 */
export function ProjectCard({ project }: { project: CardProject }) {
  const type = projectTypeLabel(project.projectType);
  const year = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const technologies = (project.technologies ?? [])
    .map((t) => t?.name)
    .filter((n): n is string => Boolean(n));

  return (
    <article className="group border-border relative grid gap-x-8 gap-y-4 border-t py-8 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="u-label">
          {type}
          {year ? <span className="text-fg-faint"> · {year}</span> : null}
          {roles ? <span className="text-fg-faint"> · {roles}</span> : null}
        </p>
        <h2 className="font-display mt-2 text-lg font-bold sm:text-xl">
          <Link
            href={`/projects/${project.slug}`}
            className="group-hover:text-accent rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h2>
        {project.shortDescription ? (
          <p className="text-fg-muted mt-2 max-w-[58ch] text-sm text-pretty">
            {project.shortDescription}
          </p>
        ) : null}
      </div>

      {technologies.length ? (
        <div className="flex flex-wrap gap-x-3 gap-y-1 sm:max-w-[16rem] sm:justify-end sm:text-right">
          {technologies.slice(0, 6).map((name) => (
            <Tag key={name}>{name}</Tag>
          ))}
        </div>
      ) : null}
    </article>
  );
}
