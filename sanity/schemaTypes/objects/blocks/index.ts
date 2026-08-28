import { architectureBlock } from "./architectureBlock";
import { beforeAfterBlock } from "./beforeAfterBlock";
import { calloutBlock } from "./calloutBlock";
import { galleryBlock } from "./galleryBlock";
import { imageBlock } from "./imageBlock";
import { learningBlock } from "./learningBlock";
import { linksBlock } from "./linksBlock";
import { metricGridBlock } from "./metricGridBlock";
import { richTextBlock } from "./richTextBlock";
import { technicalDecisionsBlock } from "./technicalDecisionsBlock";
import { timelineBlock } from "./timelineBlock";
import { videoBlock } from "./videoBlock";

/** All modular project content blocks, in the order they appear in the CMS menu. */
export const projectBlockTypes = [
  richTextBlock,
  imageBlock,
  galleryBlock,
  videoBlock,
  metricGridBlock,
  beforeAfterBlock,
  architectureBlock,
  timelineBlock,
  technicalDecisionsBlock,
  learningBlock,
  calloutBlock,
  linksBlock,
];

/**
 * Members for a `contentBlocks` array field. Adding a new block type here (and
 * a renderer in the frontend registry) is the ONLY change needed to support a
 * new section — the central Project schema stays untouched (Sprint §22, §58).
 */
export const contentBlockArrayMembers: { type: string }[] =
  projectBlockTypes.map((block) => ({ type: block.name }));
