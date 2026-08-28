import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Cluster } from "@/components/ui/Cluster";
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
    <Card as="article" interactive className="flex flex-col overflow-hidden">
      {project.coverImage?.asset ? (
        <div className="border-border bg-bg-subtle border-b">
          <SanityImage
            image={project.coverImage}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
            ratio={16 / 9}
            className="w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Cluster gap="xs" className="text-fg-muted text-xs">
          <Badge tone="accent">{projectTypeLabel(project.projectType)}</Badge>
          {period ? <span>{period}</span> : null}
        </Cluster>

        <h3 className="text-lg leading-snug">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-fg-muted line-clamp-3 text-sm">
          {project.shortDescription}
        </p>

        {roles ? (
          <p className="text-fg-muted text-xs">
            <span className="text-fg font-medium">Minha contribuição:</span>{" "}
            {roles}
          </p>
        ) : null}

        {technologies.length ? (
          <Cluster gap="xs" className="mt-auto pt-2">
            {technologies.slice(0, 6).map((tech) => (
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
