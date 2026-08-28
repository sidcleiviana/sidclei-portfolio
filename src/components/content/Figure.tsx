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
    <figure className={`space-y-2 ${className}`}>
      {children}
      {caption ? (
        <figcaption className="text-fg-muted text-sm">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
