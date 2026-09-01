import type { ReactNode } from "react";
import Link from "next/link";

import { Container, Section } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { isPubliclyVisible } from "@/domain/visibility";
import { PeriodBadge } from "@/features/experience/PeriodBadge";
import { ProjectCard } from "@/features/projects/ProjectCard";
import type {
  KnowledgeExperienceRef,
  KnowledgeProjectRef,
} from "@/sanity/types";

import type { KnowledgeKind } from "./KnowledgeBadge";

const CRUMB: Record<KnowledgeKind, { label: string; href: string }> = {
  skill: { label: "Competências", href: "/conhecimento#competencias" },
  technology: { label: "Tecnologias", href: "/conhecimento#tecnologias" },
};

function AppearedIn({
  experiences,
}: {
  experiences: KnowledgeExperienceRef[];
}) {
  if (!experiences.length) return null;
  return (
    <div>
      <h2 className="u-label text-fg-faint mb-4">Apareceu em</h2>
      <ol className="border-t border-[var(--color-rule)]">
        {experiences.map((exp, i) => (
          <li key={exp._id} className="border-b border-[var(--color-border)]">
            <Link
              href={`/experiencia#${experienceAnchor(exp)}`}
              className="group grid gap-x-6 gap-y-1 py-5 sm:grid-cols-12 sm:items-baseline"
            >
              <span
                aria-hidden
                className="u-label text-fg-faint tabular-nums sm:col-span-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display group-hover:text-accent text-xl sm:col-span-7 sm:text-2xl">
                {exp.role ?? exp.company}
              </span>
              <span className="u-label text-fg-muted flex flex-wrap gap-x-2 sm:col-span-4 sm:justify-end">
                <PeriodBadge period={exp.period} />
                {exp.role && exp.company ? <span>{exp.company}</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DemonstratedIn({ projects }: { projects: KnowledgeProjectRef[] }) {
  const visible = projects.filter(isPubliclyVisible);
  if (!visible.length) return null;
  return (
    <div>
      <h2 className="u-label text-fg-faint mb-4">Demonstrado em</h2>
      <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project._id} project={project} variant="compact" />
        ))}
      </div>
    </div>
  );
}

/**
 * A relational fiche for a skill or technology (Sprint 7 §22): the name set
 * large, the category, and the real contexts — the experiences it appeared in
 * and the public projects that demonstrate it. Empty relations are omitted,
 * never shown as zero. Related projects pass the public gate again (§47).
 */
export function KnowledgeDetail({
  kind,
  name,
  category,
  description,
  aside,
  experiences,
  projects,
}: {
  kind: KnowledgeKind;
  name: string;
  category?: string | null;
  description?: string | null;
  aside?: ReactNode;
  experiences: KnowledgeExperienceRef[];
  projects: KnowledgeProjectRef[];
}) {
  const crumb = CRUMB[kind];

  return (
    <Section spacing="lg" aria-labelledby="knowledge-detail-title">
      <Container size="editorial">
        <nav aria-label="Trilha de navegação">
          <ol className="u-label text-fg-muted flex flex-wrap items-center gap-2">
            <li>
              <Link href="/conhecimento" className="hover:text-fg rounded-sm">
                Conhecimento
              </Link>
            </li>
            <li aria-hidden className="text-fg-faint">
              /
            </li>
            <li>
              <Link href={crumb.href} className="hover:text-fg rounded-sm">
                {crumb.label}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mt-10 border-b border-[var(--color-rule)] pb-10">
          <h1
            id="knowledge-detail-title"
            className="font-display max-w-[16ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[var(--tracking-display)] text-balance"
          >
            {name}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            {category ? (
              <p className="u-label text-fg-muted">
                <span className="text-fg-faint">Categoria</span> {category}
              </p>
            ) : null}
            {aside}
          </div>
          {description ? (
            <p className="text-fg-muted mt-6 max-w-[var(--container-prose)] text-lg leading-8 text-pretty">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-14 flex flex-col gap-16">
          <AppearedIn experiences={experiences} />
          <DemonstratedIn projects={projects} />
        </div>
      </Container>
    </Section>
  );
}
