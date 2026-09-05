type Weight = "hair" | "strong" | "accent";

const WEIGHT: Record<Weight, string> = {
  hair: "border-[var(--color-border)]",
  strong: "border-[var(--color-rule)]",
  accent: "border-[var(--color-accent)]",
};

/**
 * The editorial hairline. `strong` (near-ink) opens a chapter or binds a
 * heading to its content; `hair` separates rows; `accent` marks a relational
 * or chromatic anchor point (Sprint 7.3) — used sparingly, never for routine
 * separation. Decorative by default; the chronology and labels carry
 * meaning, not the line (Sprint 7 §36).
 */
export function Rule({
  weight = "hair",
  className = "",
  animate = false,
}: {
  weight?: Weight;
  className?: string;
  animate?: boolean;
}) {
  return (
    <hr
      role="presentation"
      data-animate={animate ? "line" : undefined}
      className={`border-0 border-t ${WEIGHT[weight]} ${className}`}
    />
  );
}
