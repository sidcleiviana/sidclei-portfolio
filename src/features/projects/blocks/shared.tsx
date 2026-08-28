import type { ReactNode } from "react";

/**
 * Consistent measure + heading for every project content block. `wide` blocks
 * (media, metrics) get more room than prose blocks. Heading style matches the
 * project detail sub-headings.
 */
export function BlockSection({
  heading,
  children,
  wide = false,
}: {
  heading?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${
        wide
          ? "max-w-[var(--container-wide)]"
          : "max-w-[var(--container-prose)]"
      }`}
    >
      {heading ? (
        <h2 className="text-fg-muted mb-4 font-mono text-xs font-medium tracking-[0.14em] uppercase">
          {heading}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
