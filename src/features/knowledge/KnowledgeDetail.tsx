import type { ReactNode } from "react";
import Link from "next/link";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
import { Container, Kicker, Section, Surface, Tag } from "@/components/ui";
import { experienceAnchor } from "@/domain/experienceAnchor";
import { formatMonthRange } from "@/domain/monthRange";
import { isPubliclyVisible } from "@/domain/visibility";
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

function AppearedIn({ experiences }: { experiences: KnowledgeExperienceRef[] }) {
  if (!experiences.length) return null;
  return (
    <div className="relative pl-8">
      <AgentAnchor name="detail" active className="absolute top-1 left-1" />
      <Kicker as="h2" className="mb-4">
        Apareceu em
      </Kicker>
      <ul className="border-border border-t">
        {experiences.map((exp) => (
          <li key={exp._id} className="border-border border-b">
            <Link
              href={`/experiencia#${experienceAnchor(exp)}`}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
            >
              <span className="font-display group-hover:text-accent text-md font-bold">
                {[exp.role, exp.company].filter(Boolean).join(" · ")}
              </span>
              <span className="text-fg-faint font-mono text-xs">
                {formatMonthRange(exp.period)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemonstratedIn({ projects }: { projects: KnowledgeProjectRef[] }) {
  const visible = projects.filter(isPubliclyVisible);
  if (!visible.length) return null;
  return (
    <div>
      <Kicker as="h2" className="mb-2">
        Demonstrado em
      </Kicker>
      <div>
        {visible.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

/**
 * A relational fiche for a skill or technology. A tonal header, then the real
 * contexts — the experiences it appeared in and the public projects that
 * demonstrate it. For a skill, the technologies present in those contexts,
 * labelled as such (never attributed to the skill directly). Empty relations
 * are omitted, never shown as zero.
 */
export function KnowledgeDetail({
  kind,
  slug,
  name,
  category,
  description,
  aside,
  experiences,
  projects,
  contextTechnologies = [],
}: {
  kind: KnowledgeKind;
  slug?: string | null;
  name: string;
  category?: string | null;
  description?: string | null;
  aside?: ReactNode;
  experiences: KnowledgeExperienceRef[];
  projects: KnowledgeProjectRef[];
  contextTechnologies?: (string | null)[];
}) {
  const crumb = CRUMB[kind];
  const contextTech = contextTechnologies.filter((t): t is string => Boolean(t));
  const mapKind = kind === "skill" ? "skill" : "technology";

  return (
    <>
      <Surface kind="tonal" pad="md">
        <Container size="wide">
          <nav aria-label="Trilha de navegação">
            <ol className="u-label flex flex-wrap items-center gap-2">
              <li>
                <Link href="/conhecimento" className="hover:text-fg rounded-sm">
                  Conhecimento
                </Link>
              </li>
              <li aria-hidden className="text-fg-faint">/</li>
              <li>
                <Link href={crumb.href} className="hover:text-fg rounded-sm">
                  {crumb.label}
                </Link>
              </li>
            </ol>
          </nav>

          <h1 className="font-display mt-5 text-2xl font-extrabold sm:text-3xl">
            {name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            {category ? (
              <p className="u-label">
                <span className="text-fg-faint">Categoria</span> {category}
              </p>
            ) : null}
            {aside}
          </div>
          {slug ? (
            <Link
              href={`/conhecimento/mapa?node=${mapKind}:${slug}`}
              className="u-label text-accent mt-4 inline-flex items-center gap-1.5 rounded-sm hover:text-[var(--color-accent-strong)]"
            >
              Ver no mapa <span aria-hidden>→</span>
            </Link>
          ) : null}
          {description ? (
            <p className="text-fg-muted mt-5 max-w-[var(--container-prose)] text-md text-pretty">
              {description}
            </p>
          ) : null}
        </Container>
      </Surface>

      <Section spacing="lg">
        <Container size="wide">
          <div className="flex flex-col gap-12">
            <AppearedIn experiences={experiences} />
            <DemonstratedIn projects={projects} />

            {kind === "skill" && contextTech.length ? (
              <div>
                <Kicker as="h2" className="mb-2">
                  Tecnologias presentes nesses contextos
                </Kicker>
                <p className="text-fg-faint mb-3 max-w-[54ch] text-xs leading-snug">
                  Ferramentas usadas nas experiências e projetos acima — não
                  atribuídas diretamente à competência.
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {contextTech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ) : null}

            {!experiences.length && !projects.length ? (
              <p className="text-fg-muted border-border border-t pt-6 font-mono text-sm">
                Ainda sem contexto público registrado.
              </p>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
