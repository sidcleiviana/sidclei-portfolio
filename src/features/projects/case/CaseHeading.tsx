import type { ReactNode } from "react";

/**
 * Opens a case section: a large editorial index number and a mono label, bound
 * to the content below by a strong hairline (Sprint 7 §16; 7.1 §25 — more
 * contrast, more rhythm between chapters).
 */
export function CaseHeading({
  id,
  index,
  children,
}: {
  id?: string;
  /** 1-based; rendered "01". */
  index?: number;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mb-8 flex items-baseline gap-3 border-t-2 border-[var(--color-rule)] pt-4"
    >
      {typeof index === "number" ? (
        <span
          aria-hidden
          className="font-display text-fg-faint text-2xl leading-none tabular-nums sm:text-3xl"
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span className="u-label">{children}</span>
    </h2>
  );
}
