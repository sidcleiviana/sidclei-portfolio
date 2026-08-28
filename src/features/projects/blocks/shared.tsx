import type { ReactNode } from "react";

/** Consistent spacing + optional heading for every project content block. */
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
      className={wide ? "mx-auto w-full max-w-3xl" : "mx-auto w-full max-w-2xl"}
    >
      {heading ? (
        <h2 className="mb-4 text-lg font-semibold tracking-tight">{heading}</h2>
      ) : null}
      {children}
    </section>
  );
}
