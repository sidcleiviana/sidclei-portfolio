import { Tag, TagLink } from "@/components/ui";

export type KnowledgeKind = "skill" | "technology";

const SEGMENT: Record<KnowledgeKind, string> = {
  skill: "competencias",
  technology: "tecnologias",
};

export function knowledgeHref(kind: KnowledgeKind, slug: string): string {
  return `/conhecimento/${SEGMENT[kind]}/${slug}`;
}

/**
 * A skill / technology name that deep-links into the Knowledge Hub when a slug
 * is known. Recessive mono metadata; the link only adds a hover accent.
 */
export function KnowledgeBadge({
  kind,
  slug,
  name,
}: {
  kind: KnowledgeKind;
  slug?: string | null;
  name?: string | null;
}) {
  if (!name) return null;
  const tone = kind === "skill" ? "accent" : "muted";
  if (!slug) return <Tag tone={tone}>{name}</Tag>;
  return (
    <TagLink href={knowledgeHref(kind, slug)} tone={tone}>
      {name}
    </TagLink>
  );
}
