import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity CDN URL for an image source. Returns `null` when the source
 * is missing so callers can skip rendering (Sprint §36, §39).
 */
export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!source) return null;
  return builder.image(source).auto("format").fit("max");
}

export function imageDimensions(ref: string | undefined) {
  // asset ref shape: image-<id>-<width>x<height>-<ext>
  if (!ref) return null;
  const match = /-(\d+)x(\d+)-/.exec(ref);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
