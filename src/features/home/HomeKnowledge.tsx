import Link from "next/link";

import { Container, Kicker, Surface } from "@/components/ui";
import {
  KnowledgeExplorer,
  type ExplorerEntity,
} from "@/features/knowledge/KnowledgeExplorer";
import type { HomeData } from "@/sanity/types";

/**
 * The knowledge preview on the Home — the relational explorer scoped to the
 * featured skills, on a paper surface. Selecting a chip reveals the real
 * contexts and the technologies present in them. Renders nothing without
 * featured skills.
 */
export function HomeKnowledge({
  skills,
}: {
  skills: HomeData["featuredSkills"];
}) {
  const items: ExplorerEntity[] = skills
    .filter((s) => s.name)
    .map((s) => ({
      _id: s._id,
      kind: "skill",
      name: s.name as string,
      slug: s.slug,
      category: s.category,
      shortDescription: s.shortDescription,
      contextExperiences: s.contextExperiences ?? [],
      contextProjects: s.contextProjects ?? [],
      contextTechnologies: s.contextTechnologies ?? [],
    }));

  if (!items.length) return null;

  return (
    <Surface kind="paper" pad="lg">
      <Container size="wide">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <Kicker>Conhecimento</Kicker>
          <Link
            href="/conhecimento"
            className="u-label hover:text-fg rounded-sm"
          >
            Ver conhecimento completo →
          </Link>
        </div>
        <KnowledgeExplorer groups={[{ label: null, items }]} />
      </Container>
    </Surface>
  );
}
