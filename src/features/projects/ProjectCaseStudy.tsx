import { SanityImage } from "@/components/content/SanityImage";
import { Container, Section } from "@/components/ui";
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

const PROSE = "mx-auto w-full max-w-[var(--container-prose)]";
const WIDE = "mx-auto w-full max-w-[var(--container-wide)]";

type Neighbor = { slug: string; title: string } | null;

/**
 * The whole case study composed from whatever the CMS provided. Every section
 * is conditional: a project with only a title, a description, a type and a few
 * technologies still reads as a finished page (Sprint §28); a project with
 * many blocks stays navigable (Sprint §29). Order is fixed for the framing
 * sections; the modular blocks keep the narrative order the editor chose.
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

  const sections: CaseSection[] = buildCaseSections({
    hasContribution: Boolean(contribution),
    hasContext: Boolean(context),
    hasProblem: Boolean(problem),
    blocks,
    hasResults,
    hasEvidence,
  });
  const showToc = shouldShowToc(sections);

  return (
    <article className="pb-8">
      <Section spacing="md">
        <ProjectHeader project={project} />
      </Section>

      {project.coverImage?.asset ? (
        <Container size="wide" className="mb-8">
          <SanityImage
            image={project.coverImage}
            priority
            sizes="(min-width: 900px) 52rem, 100vw"
            ratio={16 / 9}
            className="border-border w-full rounded-lg border"
          />
        </Container>
      ) : null}

      <Container>
        <div
          className={
            showToc
              ? "xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-12"
              : undefined
          }
        >
          {showToc ? (
            <div>
              <ProjectToc sections={sections} />
            </div>
          ) : null}

          <div className="flex min-w-0 flex-col gap-14">
            {contribution ? (
              <section id="contribuicao" className={`scroll-mt-24 ${PROSE}`}>
                <CaseHeading>Contribuição</CaseHeading>
                <ProjectContribution contribution={contribution} />
              </section>
            ) : null}

            {context ? (
              <section id="contexto" className={`scroll-mt-24 ${PROSE}`}>
                <CaseHeading>Contexto</CaseHeading>
                <p className="text-fg-muted leading-7 text-pretty">{context}</p>
              </section>
            ) : null}

            {problem ? (
              <section id="problema" className={`scroll-mt-24 ${PROSE}`}>
                <CaseHeading>Problema</CaseHeading>
                <p className="text-fg-muted leading-7 text-pretty">{problem}</p>
              </section>
            ) : null}

            {blocks.length ? <ProjectContentBlocks blocks={blocks} /> : null}

            {hasResults ? (
              <section id="resultados" className={`scroll-mt-24 ${WIDE}`}>
                <CaseHeading>Resultados</CaseHeading>
                <MetricList metrics={metrics} />
              </section>
            ) : null}

            {hasEvidence ? (
              <section id="evidencias" className={`scroll-mt-24 ${WIDE}`}>
                <CaseHeading>Evidências</CaseHeading>
                <EvidenceList evidence={evidence} />
              </section>
            ) : null}

            <div className={PROSE}>
              <ProjectMeta project={project} />
            </div>
          </div>
        </div>
      </Container>

      <ProjectNav prev={prev} next={next} />
    </article>
  );
}
