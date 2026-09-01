import type { ReactNode } from "react";

/**
 * Opens a case section: an editorial index number and a mono label, bound to
 * the content below by a strong hairline (Sprint 7 §16).
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
      className="u-label mb-6 flex items-center gap-2.5 border-t border-[var(--color-rule)] pt-4"
    >
      {typeof index === "number" ? (
        <span aria-hidden className="text-fg-faint tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span>{children}</span>
    </h2>
  );
}
