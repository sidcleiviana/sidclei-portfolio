import { SanityImage } from "@/components/content/SanityImage";
import type { GalleryBlock, VideoBlock } from "@/sanity/types";

import { BlockSection } from "./shared";

export function Gallery({ block }: { block: GalleryBlock }) {
  const images = block.images?.filter((image) => image?.asset) ?? [];
  if (!images.length) return null;
  return (
    <BlockSection heading={block.heading} wide>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <li key={image.asset?._ref ?? index}>
            <figure className="space-y-1">
              <SanityImage
                image={image}
                sizes="(min-width: 640px) 384px, 100vw"
                className="w-full rounded-md"
              />
              {image.caption ? (
                <figcaption className="text-fg-muted text-xs">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </BlockSection>
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
    <BlockSection heading={block.title} wide>
      <div className="border-border overflow-hidden rounded-md border">
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
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent block p-4 underline underline-offset-2"
          >
            Assistir ao vídeo
          </a>
        )}
      </div>
      {block.caption ? (
        <p className="text-fg-muted mt-2 text-sm">{block.caption}</p>
      ) : null}
    </BlockSection>
  );
}
