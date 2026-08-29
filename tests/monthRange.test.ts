import { describe, expect, it } from "vitest";

import {
  formatMonthRange,
  isCurrent,
  periodSortKey,
} from "@/domain/monthRange";

describe("formatMonthRange", () => {
  it("shows month + year when the data has a month", () => {
    expect(
      formatMonthRange({ startDate: "2023-05-01", endDate: "2025-12-01" })
    ).toBe("mai 2023 — dez 2025");
  });
  it("shows year only when there is no month", () => {
    expect(formatMonthRange({ startDate: "2022", endDate: "2024" })).toBe(
      "2022 — 2024"
    );
  });
  it("marks an ongoing role as Atual", () => {
    expect(formatMonthRange({ startDate: "2025-11-01", ongoing: true })).toBe(
      "nov 2025 — Atual"
    );
    // no endDate also counts as current
    expect(formatMonthRange({ startDate: "2025-11-01" })).toBe(
      "nov 2025 — Atual"
    );
  });
  it("collapses a single point and returns null when empty", () => {
    expect(
      formatMonthRange({ startDate: "2022-03-01", endDate: "2022-03-01" })
    ).toBe("mar 2022");
    expect(formatMonthRange(null)).toBeNull();
    expect(formatMonthRange({})).toBeNull();
  });
});

describe("isCurrent", () => {
  it("is true for ongoing or missing endDate", () => {
    expect(isCurrent({ startDate: "2020-01-01", ongoing: true })).toBe(true);
    expect(isCurrent({ startDate: "2020-01-01" })).toBe(true);
    expect(isCurrent({ startDate: "2020-01-01", endDate: "2021-01-01" })).toBe(
      false
    );
  });
});

describe("periodSortKey", () => {
  it("sorts current above finished, then by start date desc", () => {
    const current = periodSortKey({ startDate: "2019-01-01", ongoing: true });
    const recent = periodSortKey({
      startDate: "2024-01-01",
      endDate: "2025-01-01",
    });
    const old = periodSortKey({
      startDate: "2018-01-01",
      endDate: "2019-01-01",
    });
    expect([recent, old, current].sort().reverse()).toEqual([
      current,
      recent,
      old,
    ]);
  });
});
