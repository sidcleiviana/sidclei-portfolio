import type { ReactNode } from "react";

type Width = "prose" | "wide";

const MAX: Record<Width, string> = {
  prose: "max-w-[var(--container-prose)]",
  wide: "max-w-[var(--container-wide)]",
};

/**
 * Every content block sits in one of two measures (Sprint 7 §18): `prose` for
 * narrative, `wide` for media / diagrams / metrics. Horizontal gutters come
 * from the case-study container. The optional heading matches `CaseHeading` —
 * a mono label bound to its content by a strong hairline.
 */
export function BlockShell({
  heading,
  width = "prose",
  children,
}: {
  heading?: string | null;
  width?: Width;
  children: ReactNode;
}) {
  return (
    <div className={`w-full ${MAX[width]}`}>
      {heading ? (
        <h2 className="u-label mb-6 border-t border-[var(--color-rule)] pt-4">
          {heading}
        </h2>
      ) : null}
      {children}
    </div>
  );
}

export { Figure } from "@/components/content/Figure";
