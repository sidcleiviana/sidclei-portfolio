import { describe, expect, it } from "vitest";

import { formatDateRange } from "@/domain/dateRange";

describe("formatDateRange", () => {
  it("returns null when there is nothing to show", () => {
    expect(formatDateRange(null)).toBeNull();
    expect(formatDateRange(undefined)).toBeNull();
    expect(formatDateRange({})).toBeNull();
  });

  it("formats an ongoing period", () => {
    expect(formatDateRange({ startDate: "2023-05", ongoing: true })).toBe(
      "2023 — atual"
    );
  });

  it("formats a closed period", () => {
    expect(formatDateRange({ startDate: "2021-01", endDate: "2023-06" })).toBe(
      "2021 — 2023"
    );
  });

  it("collapses a single-year period", () => {
    expect(formatDateRange({ startDate: "2022-02", endDate: "2022-11" })).toBe(
      "2022"
    );
  });
});
