import type { ReactNode } from "react";

/** figure + optional caption. Shared by images, galleries, diagrams, embeds. */
export function Figure({
  children,
  caption,
  className = "",
}: {
  children: ReactNode;
  caption?: string | null;
  className?: string;
}) {
  return (
    <figure className={`space-y-2.5 ${className}`}>
      {children}
      {caption ? (
        <figcaption className="u-label text-fg-faint normal-case">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
