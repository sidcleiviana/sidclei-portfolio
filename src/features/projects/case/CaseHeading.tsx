import type { ReactNode } from "react";

/** The mono kicker that opens every fixed case section. */
export function CaseHeading({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-fg-muted mb-4 font-mono text-xs font-medium tracking-[0.14em] uppercase"
    >
      {children}
    </h2>
  );
}
