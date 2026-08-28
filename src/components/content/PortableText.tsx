import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { SanityImage } from "@/components/content/SanityImage";
import type {
  PortableText as PortableTextValue,
  SanityImage as SanityImageType,
} from "@/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-7">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-10 text-xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-lg font-semibold tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-border text-muted border-l-2 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-1 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-1 pl-6">{children}</ol>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-surface rounded px-1 py-0.5 text-[0.9em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-accent underline underline-offset-2"
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
      <SanityImage
        image={value as SanityImageType}
        sizes="(min-width: 768px) 640px, 100vw"
        className="rounded-[var(--radius)]"
      />
    ),
  },
};

export function PortableText({ value }: { value?: PortableTextValue | null }) {
  if (!value || value.length === 0) return null;
  type BaseValue = Parameters<typeof BasePortableText>[0]["value"];
  return (
    <div className="space-y-4 text-[0.95rem]">
      <BasePortableText
        value={value as unknown as BaseValue}
        components={components}
      />
    </div>
  );
}
