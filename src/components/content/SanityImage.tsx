import NextImage from "next/image";

import { imageDimensions, urlForImage } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type Props = {
  image: SanityImageType | null | undefined;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Fallback aspect ratio (w/h) when the asset carries no dimensions. */
  ratio?: number;
};

/**
 * Renders a Sanity image through next/image with the Sanity CDN pipeline
 * (Sprint §39). Returns null when there is no image — callers never see a
 * broken placeholder (Sprint §36).
 */
export function SanityImage({
  image,
  sizes = "100vw",
  priority = false,
  className,
  ratio,
}: Props) {
  const builder = urlForImage(image);
  if (!builder || !image?.asset?._ref) return null;

  const dims = imageDimensions(image.asset._ref);
  const alt = image.alt ?? "";

  if (dims) {
    return (
      <NextImage
        src={builder.width(Math.min(dims.width, 1600)).url()}
        width={dims.width}
        height={dims.height}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <span
      className={`relative block w-full ${className ?? ""}`}
      style={{ aspectRatio: String(ratio ?? 16 / 9) }}
    >
      <NextImage
        src={builder.url()}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}
