import { describe, expect, it } from "vitest";

import {
  filterPubliclyVisible,
  isAnonymized,
  isPubliclyVisible,
} from "@/domain/visibility";
import type { ProjectVisibility } from "@/sanity/types";

const project = (visibility: ProjectVisibility) => ({ visibility });

describe("project visibility (confidentiality guard)", () => {
  it("treats public and anonymized as visible, private as hidden", () => {
    expect(isPubliclyVisible(project("public"))).toBe(true);
    expect(isPubliclyVisible(project("anonymized"))).toBe(true);
    expect(isPubliclyVisible(project("private"))).toBe(false);
  });

  it("never leaks a private project through the list filter", () => {
    const list = [
      { _id: "1", visibility: "public" as const },
      { _id: "2", visibility: "private" as const },
      { _id: "3", visibility: "anonymized" as const },
      { _id: "4", visibility: "private" as const },
    ];
    const visible = filterPubliclyVisible(list);
    expect(visible.map((p) => p._id)).toEqual(["1", "3"]);
  });

  it("identifies anonymized projects", () => {
    expect(isAnonymized(project("anonymized"))).toBe(true);
    expect(isAnonymized(project("public"))).toBe(false);
  });
});
