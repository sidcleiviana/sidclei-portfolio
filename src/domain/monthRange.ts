/** Month/year period formatting for experience (Sprint 3 §14). */

const MONTHS_PT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

type PeriodLike = {
  startDate?: string | null;
  endDate?: string | null;
  ongoing?: boolean | null;
};

/**
 * Formats a stored date the way it was authored: "mai 2023" when a month is
 * present, "2023" when only a year is. Never invents a month, never shows a day.
 */
function formatPoint(value?: string | null): string | null {
  if (!value) return null;
  const m = /^(\d{4})(?:-(\d{2}))?/.exec(value);
  const year = m?.[1];
  if (!year) return null;
  const month = m?.[2] ? Number(m[2]) : null;
  if (month && month >= 1 && month <= 12) {
    return `${MONTHS_PT[month - 1]} ${year}`;
  }
  return year;
}

export function isCurrent(period?: PeriodLike | null): boolean {
  if (!period) return false;
  return Boolean(period.ongoing) || (!!period.startDate && !period.endDate);
}

/** "mai 2023 — dez 2025", "nov 2025 — Atual", "2022", or null. */
export function formatMonthRange(period?: PeriodLike | null): string | null {
  if (!period) return null;
  const start = formatPoint(period.startDate);
  if (!start) return null;
  if (isCurrent(period)) return `${start} — Atual`;
  const end = formatPoint(period.endDate);
  if (!end || end === start) return start;
  return `${start} — ${end}`;
}

/** Sort key: newest first; a current role sorts above a finished one. */
export function periodSortKey(period?: PeriodLike | null): string {
  if (!period?.startDate) return "";
  return `${isCurrent(period) ? "1" : "0"}:${period.startDate}`;
}
