import type { ReactNode } from "react";

type Width = "prose" | "wide";

const MAX: Record<Width, string> = {
  prose: "max-w-[var(--container-prose)]",
  wide: "max-w-[var(--container-wide)]",
};

/**
 * Every content block sits in one of two measures (Sprint §10): `prose` for
 * narrative, `wide` for media / diagrams / metrics. Horizontal gutters come
 * from the case-study container, not from here. An optional mono heading keeps
 * block titles consistent with the rest of the case.
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
    <div className={`mx-auto w-full ${MAX[width]}`}>
      {heading ? (
        <h2 className="text-fg-muted mb-4 font-mono text-xs font-medium tracking-[0.14em] uppercase">
          {heading}
        </h2>
      ) : null}
      {children}
    </div>
  );
}

export { Figure } from "@/components/content/Figure";
