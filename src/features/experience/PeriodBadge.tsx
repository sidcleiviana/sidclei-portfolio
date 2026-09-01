import { formatMonthRange, isCurrent } from "@/domain/monthRange";
import type { DateRange } from "@/sanity/types";

/**
 * Period, month/year precision, with a quiet "Atual" marker when the data says
 * the role is ongoing — no chip, no dot (Sprint 7 §19).
 */
export function PeriodBadge({ period }: { period?: DateRange | null }) {
  const label = formatMonthRange(period);
  if (!label) return null;
  return (
    <span className="u-label text-fg-muted">
      <time>{label}</time>
      {isCurrent(period) ? (
        <>
          <span aria-hidden className="text-fg-faint">
            {" · "}
          </span>
          <span className="text-accent">Atual</span>
        </>
      ) : null}
    </span>
  );
}
