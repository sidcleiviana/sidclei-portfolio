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

const PROSE = "max-w-[var(--container-prose)]";
const WIDE = "max-w-[var(--container-wide)]";

type Neighbor = { slug: string; title: string } | null;

/**
 * The whole case study, composed from whatever the CMS provided (Sprint 2
 * modular system, preserved). Sprint 7: a monumental header, framing sections
 * carry an editorial number, measures separate narrative (prose) from media
 * (wide). Every section is conditional — a lean project still reads as a
 * finished editorial page.
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

  // Editorial numbering for the fixed framing sections, in render order.
  let n = 0;
  const num = () => (n += 1);

  return (
    <article className="pb-8">
      <Section spacing="md">
        <ProjectHeader project={project} />
      </Section>

      {project.coverImage?.asset ? (
        <Container size="editorial" className="mb-12">
          <SanityImage
            image={project.coverImage}
            priority
            sizes="(min-width: 900px) 60rem, 100vw"
            ratio={16 / 9}
            className="w-full"
          />
        </Container>
      ) : null}

      <Container size="editorial">
        <div
          className={
            showToc
              ? "xl:grid xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-16"
              : undefined
          }
        >
          {showToc ? (
            <div>
              <ProjectToc sections={sections} />
            </div>
          ) : null}

          <div className="flex min-w-0 flex-col gap-16">
            {contribution ? (
              <section id="contribuicao" className={`scroll-mt-24 ${WIDE}`}>
                <CaseHeading index={num()}>Contribuição</CaseHeading>
                <ProjectContribution contribution={contribution} />
              </section>
            ) : null}

            {context ? (
              <section id="contexto" className={`scroll-mt-24 ${PROSE}`}>
                <CaseHeading index={num()}>Contexto</CaseHeading>
                <p className="text-fg-muted text-lg leading-8 text-pretty">
                  {context}
                </p>
              </section>
            ) : null}

            {problem ? (
              <section id="problema" className={`scroll-mt-24 ${PROSE}`}>
                <CaseHeading index={num()}>Problema</CaseHeading>
                <p className="text-fg-muted text-lg leading-8 text-pretty">
                  {problem}
                </p>
              </section>
            ) : null}

            {blocks.length ? <ProjectContentBlocks blocks={blocks} /> : null}

            {hasResults ? (
              <section id="resultados" className={`scroll-mt-24 ${WIDE}`}>
                <CaseHeading index={num()}>Resultados</CaseHeading>
                <MetricList metrics={metrics} />
              </section>
            ) : null}

            {hasEvidence ? (
              <section id="evidencias" className={`scroll-mt-24 ${WIDE}`}>
                <CaseHeading index={num()}>Evidências</CaseHeading>
                <EvidenceList evidence={evidence} />
              </section>
            ) : null}

            <div className={WIDE}>
              <ProjectMeta project={project} />
            </div>
          </div>
        </div>
      </Container>

      <ProjectNav prev={prev} next={next} />
    </article>
  );
}
