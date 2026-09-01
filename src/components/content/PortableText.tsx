import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { Figure } from "@/components/content/Figure";
import { SanityImage } from "@/components/content/SanityImage";
import type {
  PortableText as PortableTextValue,
  SanityImage as SanityImageType,
} from "@/sanity/types";

/**
 * The editorial voice for CMS long-form text. Only the styles the schema allows
 * (h2/h3/blockquote/normal, bullet/number lists, strong/em/code, link) are
 * rendered — no arbitrary styling leaks in from the CMS (Sprint §9).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-fg-muted text-lg leading-8 text-pretty">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display mt-14 scroll-mt-24 text-2xl first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-10 scroll-mt-24 text-xl first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-display text-fg text-xl leading-relaxed italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-fg-muted marker:text-fg-faint list-disc space-y-2 pl-5 text-lg leading-8">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-fg-muted marker:text-fg-faint list-decimal space-y-2 pl-5 text-lg leading-8">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-fg font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-bg-subtle rounded-sm px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-accent rounded-sm underline decoration-[var(--color-accent)]/35 underline-offset-[3px] hover:decoration-[var(--color-accent)]"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }) => (
      <Figure
        className="my-6"
        caption={(value as { caption?: string })?.caption ?? null}
      >
        <SanityImage
          image={value as SanityImageType}
          sizes="(min-width: 768px) 640px, 100vw"
          className="border-border w-full rounded-md border"
        />
      </Figure>
    ),
  },
};

export function PortableText({ value }: { value?: PortableTextValue | null }) {
  if (!value || value.length === 0) return null;
  type BaseValue = Parameters<typeof BasePortableText>[0]["value"];
  return (
    <div className="space-y-5">
      <BasePortableText
        value={value as unknown as BaseValue}
        components={components}
      />
    </div>
  );
}
