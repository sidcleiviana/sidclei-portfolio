import type { ComponentProps, ReactNode } from "react";

const BASE =
  "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 py-1.5 " +
  "font-mono text-xs tracking-tight whitespace-nowrap transition-colors";

const REST =
  "border-border bg-surface text-fg-muted hover:text-fg hover:border-border-strong";
const SELECTED = "border-accent bg-[var(--color-accent)]/12 text-fg";

/**
 * A selectable relational chip — a skill, a technology, an integration. A real
 * `<button>` that drives an in-page panel. Selected state is carried in the
 * border + a faint indigo wash, never by hiding the label.
 */
export function Chip({
  children,
  selected = false,
  className = "",
  ...rest
}: {
  children: ReactNode;
  selected?: boolean;
  className?: string;
} & ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`${BASE} ${selected ? SELECTED : REST} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
