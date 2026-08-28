import type { ContentBlock } from "@/sanity/types";

import { renderContentBlock } from "./blockRegistry";

/**
 * Renders a project's modular body. The page passes whatever blocks the CMS
 * returned, in order; this component owns none of the block-specific logic.
 */
export function ProjectContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="space-y-12">
      {blocks.map((block) => (
        <div key={block._key}>{renderContentBlock(block)}</div>
      ))}
    </div>
  );
}
