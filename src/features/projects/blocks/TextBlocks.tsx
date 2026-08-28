import { PortableText } from "@/components/content/PortableText";
import { SanityImage } from "@/components/content/SanityImage";
import { TextLink } from "@/components/ui/TextLink";
import type {
  ArchitectureBlock,
  CalloutBlock,
  ImageBlock,
  LearningBlock,
  LinksBlock,
  RichTextBlock,
} from "@/sanity/types";

import { BlockShell, Figure } from "./BlockShell";

export function RichText({ block }: { block: RichTextBlock }) {
  if (!block.body?.length) return null;
  return (
    <BlockShell>
      <PortableText value={block.body} />
    </BlockShell>
  );
}

export function Image({ block }: { block: ImageBlock }) {
  if (!block.image?.asset) return null;
  return (
    <BlockShell width={block.wide ? "wide" : "prose"}>
      <Figure caption={block.image.caption}>
        <SanityImage
          image={block.image}
          sizes="(min-width: 900px) 52rem, 100vw"
          className="border-border w-full rounded-md border"
        />
      </Figure>
    </BlockShell>
  );
}

export function Architecture({ block }: { block: ArchitectureBlock }) {
  const hasBody = Boolean(block.description?.length);
  const hasDiagram = Boolean(block.diagram?.asset);
  if (!hasBody && !hasDiagram) return null;
  return (
    <BlockShell heading={block.heading ?? "Arquitetura"} width="wide">
      {hasBody ? <PortableText value={block.description} /> : null}
      {hasDiagram ? (
        <SanityImage
          image={block.diagram}
          sizes="(min-width: 900px) 52rem, 100vw"
          className={`border-border w-full rounded-md border ${hasBody ? "mt-6" : ""}`}
        />
      ) : null}
    </BlockShell>
  );
}

export function Learning({ block }: { block: LearningBlock }) {
  const takeaways = (block.takeaways ?? []).filter(Boolean);
  const hasBody = Boolean(block.body?.length);
  if (!hasBody && !takeaways.length) return null;
  return (
    <BlockShell heading={block.heading ?? "Aprendizados"}>
      {hasBody ? <PortableText value={block.body} /> : null}
      {takeaways.length ? (
        <ul className={`space-y-2 ${hasBody ? "mt-4" : ""}`}>
          {takeaways.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.975rem] leading-7">
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </BlockShell>
  );
}

export function Callout({ block }: { block: CalloutBlock }) {
  if (!block.body?.length && !block.title) return null;
  // One neutral language; only "warning" shifts the left border (Sprint §22).
  const border =
    block.tone === "warning"
      ? "border-l-amber-500/60"
      : "border-l-[var(--color-accent)]";
  return (
    <BlockShell>
      <aside
        className={`border-border bg-bg-subtle rounded-md border border-l-2 px-4 py-3.5 ${border}`}
      >
        {block.title ? (
          <p className="mb-1 text-sm font-semibold">{block.title}</p>
        ) : null}
        <div className="text-fg-muted text-sm">
          <PortableText value={block.body} />
        </div>
      </aside>
    </BlockShell>
  );
}

export function Links({ block }: { block: LinksBlock }) {
  const links = (block.links ?? [])
    .filter((l) => l?.url)
    .map((l) => ({
      key: l._key ?? (l.url as string),
      url: l.url as string,
      label: l.label || (l.url as string),
    }));
  if (!links.length) return null;
  return (
    <BlockShell heading={block.heading}>
      <ul className="space-y-2 text-[0.975rem]">
        {links.map((link) => (
          <li key={link.key}>
            <TextLink href={link.url}>{link.label}</TextLink>
          </li>
        ))}
      </ul>
    </BlockShell>
  );
}
