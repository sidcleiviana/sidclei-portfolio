import Link from "next/link";

import { rolesSummary } from "@/domain/contribution";
import { formatDateRange } from "@/domain/dateRange";
import { projectTypeLabel } from "@/domain/projectType";
import type {
  Contribution,
  DateRange,
  ProjectType,
  SanityImage as SanityImageType,
} from "@/sanity/types";

/**
 * Structural minimum a project reference needs. `ProjectListItem`, the home
 * projection and the light experience / knowledge projections all satisfy it —
 * one component, three editorial variants, no divergent copy (Sprint 7 §14).
 */
type CardProject = {
  _id: string;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  projectType: ProjectType | null;
  technologies?: Array<{ _id: string; name: string | null }> | null;
  coverImage?: SanityImageType | null;
  period?: DateRange | null;
  contribution?: Contribution | null;
};

type Variant = "feature" | "index" | "compact";

function TechList({
  items,
  limit,
  className = "",
}: {
  items: Array<{ _id: string; name: string | null }>;
  limit: number;
  className?: string;
}) {
  const shown = items.filter((t) => t?.name).slice(0, limit);
  if (!shown.length) return null;
  return (
    <ul className={`font-mono text-xs tracking-tight ${className}`}>
      {shown.map((t) => (
        <li key={t._id} className="text-fg-muted">
          {t.name}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({
  project,
  variant = "index",
  index,
}: {
  project: CardProject;
  variant?: Variant;
  /** 1-based row number for the `index` variant. */
  index?: number;
}) {
  const year = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const type = projectTypeLabel(project.projectType);
  const href = `/projects/${project.slug}`;
  const technologies = project.technologies ?? [];

  if (variant === "feature") {
    return (
      <article className="group grid gap-x-8 gap-y-6 lg:grid-cols-12">
        <p className="u-label lg:col-span-12">
          {typeof index === "number" ? (
            <span className="text-fg-faint tabular-nums">
              {String(index).padStart(2, "0")} /{" "}
            </span>
          ) : null}
          <span>{type}</span>
          {year ? <span className="text-fg-faint"> / {year}</span> : null}
        </p>

        <div className="lg:col-span-8">
          <h3 className="font-display text-3xl leading-[1.05] tracking-[var(--tracking-tight)] sm:text-4xl xl:text-5xl">
            <Link
              href={href}
              className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          {project.shortDescription ? (
            <p className="text-fg-muted mt-5 max-w-[46ch] text-lg text-pretty">
              {project.shortDescription}
            </p>
          ) : null}
          {roles ? (
            <p className="u-label mt-5">
              <span className="text-fg-faint">Minha atuação</span> {roles}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:items-end">
          <TechList items={technologies} limit={6} className="lg:text-right" />
          <span className="u-label text-fg group-hover:text-accent inline-flex items-center gap-2">
            Abrir case <span className="u-arrow">→</span>
          </span>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group relative border-t border-[var(--color-border)] pt-4">
        <p className="u-label">
          <span>{type}</span>
          {year ? <span className="text-fg-faint"> · {year}</span> : null}
        </p>
        <h3 className="font-display mt-2 text-lg">
          <Link
            href={href}
            className="group-hover:text-accent rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        {project.shortDescription ? (
          <p className="text-fg-muted mt-1.5 line-clamp-2 text-sm text-pretty">
            {project.shortDescription}
          </p>
        ) : null}
        <TechList items={technologies} limit={3} className="mt-3 flex gap-4" />
      </article>
    );
  }

  // index — the /projects collection row
  return (
    <article className="group relative grid gap-x-8 gap-y-4 border-t border-[var(--color-rule)] py-10 sm:grid-cols-12">
      <p aria-hidden className="u-label text-fg-faint sm:col-span-1">
        {typeof index === "number" ? String(index).padStart(2, "0") : null}
      </p>

      <div className="sm:col-span-8">
        <p className="u-label">
          <span>{type}</span>
          {year ? <span className="text-fg-faint"> · {year}</span> : null}
          {roles ? <span className="text-fg-faint"> · {roles}</span> : null}
        </p>
        <h2 className="font-display mt-3 text-2xl leading-tight sm:text-3xl">
          <Link
            href={href}
            className="group-hover:text-accent rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h2>
        {project.shortDescription ? (
          <p className="text-fg-muted mt-3 max-w-[52ch] text-pretty">
            {project.shortDescription}
          </p>
        ) : null}
      </div>

      <div className="flex items-start justify-between sm:col-span-3 sm:flex-col sm:items-end sm:gap-6">
        <TechList items={technologies} limit={5} className="sm:text-right" />
        <span
          aria-hidden
          className="u-arrow text-fg group-hover:text-accent text-lg"
        >
          →
        </span>
      </div>
    </article>
  );
}
