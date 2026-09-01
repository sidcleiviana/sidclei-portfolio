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
 * known (Sprint §17, §19). Appearance is unchanged from a plain `Badge`
 * (Sprint §32) — the link only adds a focus ring and pointer. Falls back to a
 * non-interactive badge when there is no slug.
 */
export function KnowledgeBadge({
  kind,
  slug,
  name,
  rel = false,
}: {
  kind: KnowledgeKind;
  slug?: string | null;
  name?: string | null;
  /** Marks this item for the CSS relational-highlight scope (Sprint 7 §25). */
  rel?: boolean;
}) {
  if (!name) return null;
  const mono = kind === "technology";
  const relAttr = rel ? { "data-rel": "" } : {};

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
      className="hover:text-fg rounded-sm"
      {...relAttr}
    >
      <Badge tone="outline" mono={mono}>
        {name}
      </Badge>
    </Link>
  );
}
