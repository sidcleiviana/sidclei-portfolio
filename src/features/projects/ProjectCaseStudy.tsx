import { SanityImage } from "@/components/content/SanityImage";
import { Container, Section, Surface } from "@/components/ui";
import {
  buildCaseSections,
  shouldShowToc,
  type CaseSection,
} from "@/domain/caseSections";
import { hasContribution } from "@/domain/contribution";
import type { ProjectDetail } from "@/sanity/types";

import { EvidenceList } from "./EvidenceList";
import { MetricList } from "./MetricList";
import { ProjectContentBlocks } from "./ProjectContentBlocks";
import { CaseHeading } from "./case/CaseHeading";
import { ProjectContribution } from "./case/ProjectContribution";
import { ProjectHeader } from "./case/ProjectHeader";
import { ProjectMeta } from "./case/ProjectMeta";
import { ProjectNav } from "./case/ProjectNav";
import { ProjectToc } from "./case/ProjectToc";

const PROSE = "max-w-[var(--container-prose)]";

type Neighbor = { slug: string; title: string } | null;

/**
 * The case study as a navigable technical piece, not an article. A navy
 * opening, then modular sections on graphite with a contextual side nav. The
 * Sprint 2 CMS-driven block system is preserved unchanged. Every section is
 * conditional — a lean project still reads as a finished page.
 */
export function ProjectCaseStudy({
  project,
  prev,
  next,
}: {
  project: ProjectDetail;
  prev: Neighbor;
  next: Neighbor;
}) {
  const blocks = project.contentBlocks ?? [];
  const metrics = project.metrics ?? [];
  const evidence = project.evidence ?? [];
  const contribution = hasContribution(project.contribution)
    ? project.contribution
    : null;
  const context = project.context?.trim() || null;
  const problem = project.problem?.trim() || null;
  const hasResults = metrics.length > 0;
  const hasEvidence = evidence.length > 0;
  const hasRelations = Boolean(
    (project.skills ?? []).some((s) => s?.name) ||
      (project.technologies ?? []).some((t) => t?.name) ||
      (project.links ?? []).some((l) => l?.url) ||
      project.relatedExperience
  );

  const sections: CaseSection[] = buildCaseSections({
    hasContribution: Boolean(contribution),
    hasContext: Boolean(context),
    hasProblem: Boolean(problem),
    blocks,
    hasResults,
    hasEvidence,
    hasRelations,
  });
  const showToc = shouldShowToc(sections);

  return (
    <article className="pb-4">
      <Surface kind="deep" pad="md" className="pb-14 sm:pb-16">
        <ProjectHeader project={project} />
      </Surface>

      {project.coverImage?.asset ? (
        <Container size="wide" className="mt-10">
          <SanityImage
            image={project.coverImage}
            priority
            sizes="(min-width: 900px) 60rem, 100vw"
            ratio={16 / 9}
            className="w-full rounded-[var(--radius)]"
          />
        </Container>
      ) : null}

      <Section spacing="lg">
        <Container size="wide">
          <div
            className={
              showToc
                ? "xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-16"
                : undefined
            }
          >
            {showToc ? (
              <div>
                <ProjectToc sections={sections} />
              </div>
            ) : null}

            <div className="flex min-w-0 flex-col gap-16 sm:gap-20">
              {contribution ? (
                <section id="contribuicao" className="scroll-mt-24">
                  <CaseHeading>Minha contribuição</CaseHeading>
                  <ProjectContribution contribution={contribution} />
                </section>
              ) : null}

              {context ? (
                <section id="contexto" className={`scroll-mt-24 ${PROSE}`}>
                  <CaseHeading>Contexto</CaseHeading>
                  <p className="text-fg-muted text-md leading-7 text-pretty">
                    {context}
                  </p>
                </section>
              ) : null}

              {problem ? (
                <section id="problema" className={`scroll-mt-24 ${PROSE}`}>
                  <CaseHeading>Problema</CaseHeading>
                  <p className="text-fg-muted text-md leading-7 text-pretty">
                    {problem}
                  </p>
                </section>
              ) : null}

              {blocks.length ? <ProjectContentBlocks blocks={blocks} /> : null}

              {hasResults ? (
                <section id="resultados" className="scroll-mt-24">
                  <CaseHeading>Resultados</CaseHeading>
                  <MetricList metrics={metrics} />
                </section>
              ) : null}

              {hasEvidence ? (
                <section id="evidencias" className="scroll-mt-24">
                  <CaseHeading>Evidências</CaseHeading>
                  <EvidenceList evidence={evidence} />
                </section>
              ) : null}

              {hasRelations ? (
                <section id="relacoes" className="scroll-mt-24">
                  <ProjectMeta project={project} />
                </section>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <ProjectNav prev={prev} next={next} />
    </article>
  );
}
