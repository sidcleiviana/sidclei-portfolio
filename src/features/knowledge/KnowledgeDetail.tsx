import type { ReactNode } from "react";
import Link from "next/link";

import { Container, Section, Stack } from "@/components/ui";
import { Grid } from "@/components/ui/Grid";
import { MonoHeading } from "@/components/ui/MonoHeading";
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

function RelatedExperiences({
  experiences,
}: {
  experiences: KnowledgeExperienceRef[];
}) {
  if (!experiences.length) return null;
  return (
    <div>
      <MonoHeading as="h2">Onde apareceu</MonoHeading>
      <ul className="border-border mt-3 divide-y border-y">
        {experiences.map((exp) => (
          <li key={exp._id} className="py-3">
            <Link
              href={`/experiencia#${experienceAnchor(exp)}`}
              className="group block rounded-sm"
            >
              <PeriodBadge period={exp.period} />
              <p className="group-hover:text-accent mt-1 font-medium">
                {exp.role ?? exp.company}
              </p>
              {exp.role && exp.company ? (
                <p className="text-fg-muted text-sm">{exp.company}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedProjects({ projects }: { projects: KnowledgeProjectRef[] }) {
  const visible = projects.filter(isPubliclyVisible);
  if (!visible.length) return null;
  return (
    <div>
      <MonoHeading as="h2">Projetos</MonoHeading>
      <Grid minCol="16" gap="gap-4" className="mt-3">
        {visible.map((project) => (
          <ProjectCard key={project._id} project={project} variant="compact" />
        ))}
      </Grid>
    </div>
  );
}

/**
 * Shared layout for `/conhecimento/competencias/[slug]` and
 * `/conhecimento/tecnologias/[slug]`. Answers "what is it (editorially, when a
 * description exists), and in which real contexts was it used" (Sprint §13,
 * §16). Sections with no relation simply do not render — never "0 experiências"
 * (Sprint §27). Related projects pass the public gate again (Sprint §21).
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
    <Section aria-labelledby="knowledge-detail-title">
      <Container size="prose">
        <Stack gap="lg">
          <nav aria-label="Trilha de navegação">
            <ol className="text-fg-muted flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link href="/conhecimento" className="hover:text-fg rounded-sm">
                  Conhecimento
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={crumb.href} className="hover:text-fg rounded-sm">
                  {crumb.label}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-fg">
                {name}
              </li>
            </ol>
          </nav>

          <div>
            <h1 id="knowledge-detail-title" className="text-3xl sm:text-4xl">
              {name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {category ? (
                <p className="text-fg-muted text-sm">{category}</p>
              ) : null}
              {aside}
            </div>
            {description ? (
              <p className="text-fg-muted mt-4 leading-7 text-pretty">
                {description}
              </p>
            ) : null}
          </div>

          <RelatedExperiences experiences={experiences} />
          <RelatedProjects projects={projects} />
        </Stack>
      </Container>
    </Section>
  );
}
