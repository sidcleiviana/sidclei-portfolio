import type { ReactNode } from "react";

/**
 * Small uppercased mono kicker above a heading. Sets context, never carries
 * information that isn't repeated in the heading/body.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-fg-muted flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase ${className}`}
    >
      <span
        aria-hidden
        className="inline-block h-px w-6 bg-[var(--color-accent)]"
      />
      {children}
    </p>
  );
}
