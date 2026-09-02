import Link from "next/link";

import { Badge } from "@/components/ui/Badge";

export type KnowledgeKind = "skill" | "technology";

const SEGMENT: Record<KnowledgeKind, string> = {
  skill: "competencias",
  technology: "tecnologias",
};

export function knowledgeHref(kind: KnowledgeKind, slug: string): string {
  return `/conhecimento/${SEGMENT[kind]}/${slug}`;
}

/**
 * A skill / technology badge that links into the Knowledge Hub when a slug is
 * known (Sprint §17, §19). At rest it reads at full text colour — never
 * disabled (7.1 §14); the link only adds hover accent and a focus ring.
 */
export function KnowledgeBadge({
  kind,
  slug,
  name,
  rel = false,
  relKeys,
}: {
  kind: KnowledgeKind;
  slug?: string | null;
  name?: string | null;
  /** Marks this item for the relational-highlight scope (Sprint 7 §25). */
  rel?: boolean;
  /** Comma-joined keys the relational island matches on (7.1 §21). */
  relKeys?: string;
}) {
  if (!name) return null;
  const mono = kind === "technology";
  const relAttr = rel ? { "data-rel": "", "data-rel-keys": relKeys ?? "" } : {};

  if (!slug) {
    return (
      <span {...relAttr}>
        <Badge tone="outline" mono={mono}>
          {name}
        </Badge>
      </span>
    );
  }

  return (
    <Link
      href={knowledgeHref(kind, slug)}
      className="hover:text-accent rounded-sm"
      {...relAttr}
    >
      <Badge tone="outline" mono={mono}>
        {name}
      </Badge>
    </Link>
  );
}
