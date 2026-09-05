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
 * 7.1: the title dominates the hierarchy; metadata is small mono; the stack is
 * clearly tertiary (§6, §7).
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
    <ul
      className={`text-fg-faint font-mono text-xs tracking-tight ${className}`}
    >
      {shown.map((t) => (
        <li key={t._id}>{t.name}</li>
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
  /** 1-based row number for the `feature` / `index` variants. */
  index?: number;
}) {
  const year = formatDateRange(project.period);
  const roles = rolesSummary(project.contribution);
  const type = projectTypeLabel(project.projectType);
  const href = `/projects/${project.slug}`;
  const technologies = project.technologies ?? [];
  const num = typeof index === "number" ? String(index).padStart(2, "0") : null;

  if (variant === "feature") {
    return (
      <article className="group relative grid gap-x-8 gap-y-8 lg:grid-cols-12">
        <p className="u-label lg:col-span-12">
          {num ? <span className="text-fg-faint">{num} / </span> : null}
          <span>{type}</span>
          {year ? <span className="text-fg-faint"> / {year}</span> : null}
        </p>

        <h3 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] tracking-[var(--tracking-display)] lg:col-span-8">
          <Link
            href={href}
            className="group-hover:text-accent rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>

        <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-10 lg:items-end lg:text-right">
          {roles ? (
            <p className="u-label">
              <span className="text-fg-faint">Atuação</span>
              <br className="hidden lg:block" /> {roles}
            </p>
          ) : null}
          <TechList items={technologies} limit={6} />
        </div>

        {project.shortDescription ? (
          <p className="text-fg-muted max-w-[46ch] text-lg leading-8 text-pretty lg:col-span-7">
            {project.shortDescription}
          </p>
        ) : null}

        <span className="u-label text-fg group-hover:text-accent inline-flex items-center gap-2 lg:col-span-3 lg:col-start-10 lg:justify-end">
          Abrir case <span className="u-arrow text-base">→</span>
        </span>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group relative border-t border-[var(--color-border-strong)] pt-4">
        <p className="u-label">
          <span>{type}</span>
          {year ? <span className="text-fg-faint"> · {year}</span> : null}
        </p>
        <h3 className="font-display mt-2 text-xl leading-tight">
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
    <article className="hover:bg-bg-tonal focus-within:bg-bg-tonal hover:border-[var(--color-accent)] focus-within:border-[var(--color-accent)] group relative -mx-4 grid grid-cols-12 gap-x-8 gap-y-5 border-t-2 border-[var(--color-rule)] px-4 py-12 transition-colors">
      <p
        aria-hidden
        className="font-display text-fg-faint col-span-2 text-3xl tabular-nums sm:col-span-1 sm:text-4xl"
      >
        {num}
      </p>

      <div className="col-span-12 sm:col-span-8">
        <p className="u-label">
          <span>{type}</span>
          {year ? <span className="text-fg-faint"> · {year}</span> : null}
          {roles ? <span className="text-fg-faint"> · {roles}</span> : null}
        </p>
        <h2 className="font-display mt-3 text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.02] tracking-[var(--tracking-tight)]">
          <Link
            href={href}
            className="group-hover:text-accent rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h2>
        {project.shortDescription ? (
          <p className="text-fg-muted mt-4 max-w-[54ch] text-pretty">
            {project.shortDescription}
          </p>
        ) : null}
      </div>

      <div className="col-span-12 flex items-end justify-between sm:col-span-3 sm:flex-col sm:items-end sm:justify-start sm:gap-8">
        <TechList items={technologies} limit={5} className="sm:text-right" />
        <span
          aria-hidden
          className="u-arrow text-fg-muted group-hover:text-accent text-lg"
        >
          →
        </span>
      </div>
    </article>
  );
}
