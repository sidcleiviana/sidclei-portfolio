import NextImage from "next/image";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
import { urlForImage } from "@/sanity/image";
import type { HomePhoto } from "@/sanity/types";

/**
 * The identity surface that holds the portrait. Not a presentation card and
 * not interactive (Sprint §15): a quiet framed surface — one hairline border,
 * the Living Agent resting at a corner — with the future photograph as the
 * human protagonist inside it. Current-context copy lives next to it in the
 * hero, not stamped over the image.
 *
 * Renders `null` when there is no image, so the hero falls back to its
 * without-photo composition (never a "add your photo" placeholder).
 *
 * `previewSrc` is a DEV-only escape hatch: `/dev/home-preview` passes a
 * synthetic `data:` image so the frame can be homologated before a real photo
 * exists. No public route ever sets it.
 */
export function PortraitSurface({
  photo,
  previewSrc,
}: {
  photo?: HomePhoto | null;
  previewSrc?: string;
}) {
  const built =
    photo?.asset?._ref != null
      ? urlForImage(photo as never)
          ?.width(900)
          .height(1125)
          .fit("crop")
          .crop("focalpoint")
          .url()
      : undefined;

  const src = previewSrc ?? built;
  if (!src) return null;

  const alt = photo?.alt?.trim() || "Sidclei Viana";

  return (
    <div
      data-surface="tonal"
      className="border-border relative overflow-hidden rounded-[var(--radius)] border bg-[var(--color-bg)]"
    >
      <div className="relative aspect-[4/5]">
        {/* `previewSrc` is always a `data:` URI (dev only), served as-is; the
            real photo goes through the Sanity CDN pipeline with a focal crop. */}
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="object-cover"
        />
      </div>
      <AgentAnchor name="portrait" active className="absolute right-4 bottom-4" />
    </div>
  );
}
