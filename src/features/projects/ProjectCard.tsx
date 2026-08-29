import Link from "next/link";

import { SanityImage } from "@/components/content/SanityImage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Cluster } from "@/components/ui/Cluster";
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
 * Structural minimum a card needs. `ProjectListItem` (home / `/projects`) and
 * the light experience-projects projection both satisfy it — one component,
 * no divergent copy (Sprint §30).
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

export function ProjectCard({
  project,
  variant = "default",
}: {
  project: CardProject;
  variant?: "default" | "compact";
}) {
  const compact = variant === "compact";
  const period = compact ? null : formatDateRange(project.period);
  const roles = compact ? null : rolesSummary(project.contribution);
  const technologies = project.technologies ?? [];
  const techLimit = compact ? 3 : 6;

  return (
    <Card as="article" interactive className="flex flex-col overflow-hidden">
      {!compact && project.coverImage?.asset ? (
        <div className="border-border bg-bg-subtle border-b">
          <SanityImage
            image={project.coverImage}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
            ratio={16 / 9}
            className="w-full object-cover"
          />
        </div>
      ) : null}

      <div
        className={`flex flex-1 flex-col gap-2.5 ${compact ? "p-4" : "gap-3 p-5"}`}
      >
        <Cluster gap="xs" className="text-fg-muted text-xs">
          <Badge tone="accent">{projectTypeLabel(project.projectType)}</Badge>
          {period ? <span>{period}</span> : null}
        </Cluster>

        <h3
          className={
            compact ? "text-base leading-snug" : "text-lg leading-snug"
          }
        >
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>

        {project.shortDescription ? (
          <p
            className={`text-fg-muted text-sm ${compact ? "line-clamp-2" : "line-clamp-3"}`}
          >
            {project.shortDescription}
          </p>
        ) : null}

        {roles ? (
          <p className="text-fg-muted text-xs">
            <span className="text-fg font-medium">Minha contribuição:</span>{" "}
            {roles}
          </p>
        ) : null}

        {technologies.length ? (
          <Cluster gap="xs" className="mt-auto pt-2">
            {technologies.slice(0, techLimit).map((tech) => (
              <Badge key={tech._id} tone="outline" mono>
                {tech.name}
              </Badge>
            ))}
          </Cluster>
        ) : null}
      </div>
    </Card>
  );
}
