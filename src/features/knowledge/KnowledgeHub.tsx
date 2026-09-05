import { Container, Kicker, Section, Surface } from "@/components/ui";
import { groupByCategory } from "@/domain/knowledge";
import type { KnowledgeSkill, KnowledgeTechnology } from "@/sanity/types";

import {
  KnowledgeExplorer,
  type ExplorerEntity,
  type ExplorerGroup,
} from "./KnowledgeExplorer";

function toGroups(
  items: Array<KnowledgeSkill | KnowledgeTechnology>,
  kind: "skill" | "technology"
): ExplorerGroup[] {
  const withName = items.filter((i) => i.name);
  return groupByCategory(withName).map((group) => ({
    label: group.category,
    items: group.items.map<ExplorerEntity>((i) => ({
      _id: i._id,
      kind,
      name: i.name as string,
      slug: i.slug,
      category: i.category,
      shortDescription:
        "shortDescription" in i ? (i.shortDescription ?? null) : null,
      contextExperiences: i.contextExperiences ?? [],
      contextProjects: i.contextProjects ?? [],
      contextTechnologies:
        "contextTechnologies" in i
          ? ((i as KnowledgeSkill).contextTechnologies ?? [])
          : [],
    })),
  }));
}

/**
 * `/conhecimento` — the relational explorer. Competências on a tonal surface
 * (the relational register), Tecnologias on graphite (recessive — meios, não o
 * assunto). Selecting a chip reveals the real contexts; for a skill, the
 * technologies present in those contexts, labelled as such. Never a
 * Skill → Technology edge.
 */
export function KnowledgeHub({
  skills,
  technologies,
}: {
  skills: KnowledgeSkill[];
  technologies: KnowledgeTechnology[];
}) {
  const hasSkills = skills.some((s) => s.name);
  const hasTech = technologies.some((t) => t.name);

  return (
    <>
      <Section spacing="lg" aria-labelledby="knowledge-title">
        <Container size="wide">
          <Kicker>Conhecimento</Kicker>
          <h1
            id="knowledge-title"
            className="font-display mt-3 text-2xl font-extrabold sm:text-3xl"
          >
            O que sei fazer, e em que contexto
          </h1>
          <p className="text-fg-muted mt-3 max-w-[56ch] text-md text-pretty">
            Selecione uma competência ou tecnologia para ver as experiências e
            projetos reais em que apareceu.
          </p>
          {!hasSkills && !hasTech ? (
            <p className="text-fg-muted border-border mt-8 border-t pt-6 font-mono text-sm">
              Ainda não há competências ou tecnologias publicadas.
            </p>
          ) : null}
        </Container>
      </Section>

      {hasSkills ? (
        <Surface kind="tonal" pad="lg" id="competencias" aria-labelledby="competencias-title">
          <Container size="wide">
            <Kicker as="h2" id="competencias-title" className="mb-8">
              Competências
            </Kicker>
            <KnowledgeExplorer groups={toGroups(skills, "skill")} />
          </Container>
        </Surface>
      ) : null}

      {hasTech ? (
        <Section spacing="lg" id="tecnologias" aria-labelledby="tecnologias-title">
          <Container size="wide">
            <Kicker as="h2" id="tecnologias-title" className="mb-8">
              Tecnologias
            </Kicker>
            <KnowledgeExplorer groups={toGroups(technologies, "technology")} />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
