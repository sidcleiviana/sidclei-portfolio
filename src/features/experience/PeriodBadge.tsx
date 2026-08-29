import { formatMonthRange, isCurrent } from "@/domain/monthRange";
import type { DateRange } from "@/sanity/types";

/**
 * Period, month/year precision, plus a quiet "Atual" marker when the data says
 * the role is ongoing (Sprint §14, §24 — no pulsing "online" dot).
 */
export function PeriodBadge({ period }: { period?: DateRange | null }) {
  const label = formatMonthRange(period);
  if (!label) return null;
  const current = isCurrent(period);
  return (
    <p className="text-fg-muted flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase">
      <time>{label}</time>
      {current ? (
        <span className="bg-accent-subtle text-accent rounded-sm px-1.5 py-px text-[0.65rem] font-medium tracking-normal normal-case">
          Atual
        </span>
      ) : null}
    </p>
  );
}
