import type { ReactNode } from "react";

/**
 * Opens a case section — a mono label bound to the content by a strong
 * hairline. No decorative numbering.
 */
export function CaseHeading({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="u-label border-border-strong mb-6 border-t pt-4">
      {children}
    </h2>
  );
}
