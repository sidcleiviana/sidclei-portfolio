type Weight = "hair" | "strong";

const WEIGHT: Record<Weight, string> = {
  hair: "border-[var(--color-border)]",
  strong: "border-[var(--color-rule)]",
};

/**
 * The editorial hairline. `strong` (near-ink) opens a chapter or binds a
 * heading to its content; `hair` separates rows. Decorative by default; the
 * chronology and labels carry meaning, not the line (Sprint 7 §36).
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
