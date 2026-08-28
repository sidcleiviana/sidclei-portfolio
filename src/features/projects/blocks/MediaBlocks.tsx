import { SanityImage } from "@/components/content/SanityImage";
import { TextLink } from "@/components/ui/TextLink";
import type { GalleryBlock, VideoBlock } from "@/sanity/types";

import { BlockShell, Figure } from "./BlockShell";

export function Gallery({ block }: { block: GalleryBlock }) {
  const images = (block.images ?? []).filter((image) => image?.asset);
  if (!images.length) return null;

  // 1 image → full column; 2 → side by side; 3+ → responsive grid. No carousel.
  const cols =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  const sizes =
    images.length === 1
      ? "(min-width: 900px) 52rem, 100vw"
      : "(min-width: 640px) 26rem, 100vw";

  return (
    <BlockShell heading={block.heading} width="wide">
      <ul className={`grid gap-4 ${cols}`}>
        {images.map((image, index) => (
          <li key={image.asset?._ref ?? index}>
            <Figure caption={image.caption}>
              <SanityImage
                image={image}
                sizes={sizes}
                ratio={4 / 3}
                className="border-border w-full rounded-md border object-cover"
              />
            </Figure>
          </li>
        ))}
      </ul>
    </BlockShell>
  );
}

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function Video({ block }: { block: VideoBlock }) {
  if (!block.url) return null;
  const embed = toEmbedUrl(block.url);
  const isFile = /\.(mp4|webm|ogg)$/i.test(block.url);

  return (
    <BlockShell heading={block.title} width="wide">
      <div className="border-border bg-bg-subtle overflow-hidden rounded-md border">
        {embed ? (
          <iframe
            src={embed}
            title={block.title ?? "Vídeo"}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        ) : isFile ? (
          <video controls preload="none" className="aspect-video w-full">
            <source src={block.url} />
          </video>
        ) : (
          <p className="p-4 text-sm">
            <TextLink href={block.url}>Assistir ao vídeo</TextLink>
          </p>
        )}
      </div>
      {block.caption ? (
        <p className="text-fg-muted mt-2 text-sm">{block.caption}</p>
      ) : null}
    </BlockShell>
  );
}
