import { PortableText } from "@/components/content/PortableText";
import { SanityImage } from "@/components/content/SanityImage";
import type {
  ArchitectureBlock,
  CalloutBlock,
  ImageBlock,
  LearningBlock,
  LinksBlock,
  RichTextBlock,
} from "@/sanity/types";

import { BlockSection } from "./shared";

export function RichText({ block }: { block: RichTextBlock }) {
  return (
    <BlockSection>
      <PortableText value={block.body} />
    </BlockSection>
  );
}

export function Image({ block }: { block: ImageBlock }) {
  if (!block.image?.asset) return null;
  return (
    <BlockSection wide={block.wide}>
      <figure className="space-y-2">
        <SanityImage
          image={block.image}
          sizes="(min-width: 768px) 768px, 100vw"
          className="w-full rounded-md"
        />
        {block.image.caption ? (
          <figcaption className="text-fg-muted text-sm">
            {block.image.caption}
          </figcaption>
        ) : null}
      </figure>
    </BlockSection>
  );
}

export function Architecture({ block }: { block: ArchitectureBlock }) {
  return (
    <BlockSection heading={block.heading ?? "Arquitetura"} wide>
      {block.description ? <PortableText value={block.description} /> : null}
      {block.diagram?.asset ? (
        <SanityImage
          image={block.diagram}
          sizes="(min-width: 768px) 768px, 100vw"
          className="border-border mt-4 w-full rounded-md border"
        />
      ) : null}
    </BlockSection>
  );
}

export function Learning({ block }: { block: LearningBlock }) {
  const takeaways = block.takeaways?.filter(Boolean) ?? [];
  return (
    <BlockSection heading={block.heading ?? "Aprendizados"}>
      {block.body ? <PortableText value={block.body} /> : null}
      {takeaways.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-6">
          {takeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </BlockSection>
  );
}

const TONE_CLASS: Record<string, string> = {
  info: "border-accent/40",
  success: "border-emerald-500/40",
  warning: "border-amber-500/50",
  note: "border-border",
};

export function Callout({ block }: { block: CalloutBlock }) {
  return (
    <BlockSection>
      <aside
        className={`bg-surface rounded-md border-l-2 p-4 ${
          TONE_CLASS[block.tone ?? "info"] ?? TONE_CLASS.info
        }`}
      >
        {block.title ? (
          <p className="mb-1 font-semibold">{block.title}</p>
        ) : null}
        <PortableText value={block.body} />
      </aside>
    </BlockSection>
  );
}

export function Links({ block }: { block: LinksBlock }) {
  const links = block.links?.filter((link) => link?.url) ?? [];
  if (!links.length) return null;
  return (
    <BlockSection heading={block.heading}>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link._key ?? link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2"
            >
              {link.label || link.url}
            </a>
          </li>
        ))}
      </ul>
    </BlockSection>
  );
}
