import { blockAnchorId, blockHeading } from "@/domain/caseSections";
import type { ContentBlock } from "@/sanity/types";

import { renderContentBlock } from "./blockRegistry";

/**
 * Renders a project's modular body in CMS order. This component owns none of
 * the block-specific logic — it only spaces the blocks and gives the ones with
 * a heading a stable anchor for the table of contents (Sprint §8, §11).
 */
export function ProjectContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="flex flex-col gap-16">
      {blocks.map((block) => {
        const anchored = Boolean(blockHeading(block));
        return (
          <div
            key={block._key}
            id={anchored ? blockAnchorId(block) : undefined}
            className={anchored ? "scroll-mt-24" : undefined}
          >
            {renderContentBlock(block)}
          </div>
        );
      })}
    </div>
  );
}
