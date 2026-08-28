import type { DateRange } from "@/sanity/types";

function year(value?: string): string | null {
  if (!value) return null;
  const match = /^(\d{4})/.exec(value);
  return match ? (match[1] ?? null) : null;
}

/**
 * "2021 — 2023", "2023 — atual", "2022". Returns null when there is nothing
 * meaningful to show, so the caller renders nothing (Sprint §36).
 */
export function formatDateRange(period?: DateRange | null): string | null {
  if (!period) return null;
  const start = year(period.startDate);
  if (!start) return null;
  if (period.ongoing) return `${start} — atual`;
  const end = year(period.endDate);
  if (!end || end === start) return start;
  return `${start} — ${end}`;
}
