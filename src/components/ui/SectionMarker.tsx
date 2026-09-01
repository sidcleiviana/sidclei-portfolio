import type { ReactNode } from "react";

/**
 * The editorial index mark: `01 — LABEL` in mono, the number faint. Orients the
 * reader through sections, projects, case parts and the trajectory (Sprint 7
 * §7). Used sparingly — it should help navigation, not decorate.
 */
export function SectionMarker({
  index,
  id,
  children,
  className = "",
}: {
  /** 1-based; rendered zero-padded ("01"). Omit for a label with no number. */
  index?: number;
  id?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p id={id} className={`u-label flex items-center gap-2.5 ${className}`}>
      {typeof index === "number" ? (
        <span aria-hidden className="text-fg-faint tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      {children ? <span>{children}</span> : null}
    </p>
  );
}
