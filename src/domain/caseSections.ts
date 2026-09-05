import type { ContentBlock } from "@/sanity/types";

export type CaseSection = { id: string; label: string };

/** Stable anchor for a content block (used by the in-page table of contents). */
export function blockAnchorId(block: { _key: string }): string {
  return `sec-${block._key}`;
}

const DEFAULT_HEADINGS: Record<string, string> = {
  architectureBlock: "Arquitetura",
  technicalDecisionsBlock: "Decisões técnicas",
  learningBlock: "Aprendizados",
};

/** Blocks that are punctuation, not sections — never in the table of contents. */
const NON_SECTION_BLOCKS = new Set([
  "richTextBlock",
  "imageBlock",
  "calloutBlock",
]);

/**
 * The label a block contributes to the table of contents, or null when the
 * block is inline punctuation (rich text, images, callouts) rather than a
 * navigable section (Sprint §11).
 */
export function blockHeading(block: ContentBlock): string | null {
  if (NON_SECTION_BLOCKS.has(block._type)) return null;
  const b = block as Record<string, unknown>;
  const explicit =
    (typeof b.heading === "string" && b.heading.trim()) ||
    (typeof b.title === "string" && b.title.trim());
  if (explicit) return explicit;
  return DEFAULT_HEADINGS[block._type] ?? null;
}

/**
 * Builds the table-of-contents model from the sections the page will actually
 * render — nothing is listed that isn't on the page (Sprint §11).
 */
export function buildCaseSections(input: {
  hasContribution: boolean;
  hasContext: boolean;
  hasProblem: boolean;
  blocks: ContentBlock[];
  hasResults: boolean;
  hasEvidence: boolean;
  hasRelations?: boolean;
}): CaseSection[] {
  const sections: CaseSection[] = [];
  if (input.hasContribution)
    sections.push({ id: "contribuicao", label: "Minha contribuição" });
  if (input.hasContext) sections.push({ id: "contexto", label: "Contexto" });
  if (input.hasProblem) sections.push({ id: "problema", label: "Problema" });
  for (const block of input.blocks) {
    const label = blockHeading(block);
    if (label) sections.push({ id: blockAnchorId(block), label });
  }
  if (input.hasResults)
    sections.push({ id: "resultados", label: "Resultados" });
  if (input.hasEvidence)
    sections.push({ id: "evidencias", label: "Evidências" });
  if (input.hasRelations)
    sections.push({ id: "relacoes", label: "Relações" });
  return sections;
}

/** The TOC is only worth showing on a case with real structure. */
export function shouldShowToc(sections: CaseSection[]): boolean {
  return sections.length >= 4;
}
