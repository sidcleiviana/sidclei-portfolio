import type { ComponentType } from "react";

import type { AnyContentBlock, KnownContentBlock } from "@/sanity/types";

import {
  Architecture,
  Callout,
  Image,
  Learning,
  Links,
  RichText,
} from "./blocks/TextBlocks";
import { Gallery, Video } from "./blocks/MediaBlocks";
import {
  BeforeAfter,
  MetricGrid,
  TechnicalDecisions,
  Timeline,
} from "./blocks/StructuredBlocks";

type BlockOf<T extends string> = Extract<KnownContentBlock, { _type: T }>;
type Renderer<T extends string> = ComponentType<{ block: BlockOf<T> }>;

/**
 * The content block registry (Sprint §28, §29, §58).
 *
 * Supporting a new block type = add one Sanity schema (schemaTypes/objects/
 * blocks), register it in `contentBlockArrayMembers`, add its type to
 * `KnownContentBlock`, and add one line here. The Project schema and the
 * `/projects/[slug]` page never change. Removing a block from a document
 * requires no code change at all.
 */
const REGISTRY = {
  richTextBlock: RichText,
  imageBlock: Image,
  galleryBlock: Gallery,
  videoBlock: Video,
  metricGridBlock: MetricGrid,
  beforeAfterBlock: BeforeAfter,
  architectureBlock: Architecture,
  timelineBlock: Timeline,
  technicalDecisionsBlock: TechnicalDecisions,
  learningBlock: Learning,
  calloutBlock: Callout,
  linksBlock: Links,
} satisfies { [K in KnownContentBlock["_type"]]: Renderer<K> };

export function hasRenderer(type: string): type is KnownContentBlock["_type"] {
  return type in REGISTRY;
}

export function renderContentBlock(block: AnyContentBlock) {
  if (hasRenderer(block._type)) {
    // Registry keys and block `_type` are aligned by the `satisfies` check above.
    const Component = REGISTRY[block._type] as ComponentType<{
      block: AnyContentBlock;
    }>;
    return <Component block={block} />;
  }

  // Unknown / not-yet-implemented block: never crash, never show the user a
  // placeholder (Sprint §29, §35). Surface it to developers only.
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        data-unknown-block={block._type}
        className="border-border text-fg-muted rounded border border-dashed p-3 text-xs"
      >
        Bloco sem renderer: <code>{block._type}</code>
      </div>
    );
  }
  return null;
}
