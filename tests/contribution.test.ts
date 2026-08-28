import { describe, expect, it } from "vitest";

import {
  authorshipLabel,
  hasContribution,
  isTeamProject,
  responsibilitiesList,
  rolesList,
  rolesSummary,
} from "@/domain/contribution";

describe("contribution helpers", () => {
  it("labels authorship in Portuguese, never inventing one", () => {
    expect(authorshipLabel("team")).toBe("Projeto em equipe");
    expect(authorshipLabel("individual")).toBe("Projeto individual");
    expect(authorshipLabel(null)).toBeNull();
    expect(authorshipLabel("weird")).toBeNull();
  });

  it("treats team and participation as team projects", () => {
    expect(isTeamProject({ authorship: "team" })).toBe(true);
    expect(isTeamProject({ authorship: "participation" })).toBe(true);
    expect(isTeamProject({ authorship: "individual" })).toBe(false);
    expect(isTeamProject(null)).toBe(false);
  });

  it("cleans role / responsibility lists", () => {
    expect(rolesList({ roles: ["Backend", "", null, "QA"] })).toEqual([
      "Backend",
      "QA",
    ]);
    expect(rolesSummary({ roles: ["Backend", "QA"] })).toBe("Backend · QA");
    expect(rolesSummary({ roles: [] })).toBeNull();
    expect(
      responsibilitiesList({ responsibilities: ["  ", "Testes"] })
    ).toEqual(["Testes"]);
  });

  it("hasContribution is false for empty / missing objects", () => {
    expect(hasContribution(null)).toBe(false);
    expect(hasContribution({})).toBe(false);
    expect(hasContribution({ roles: [] })).toBe(false);
    expect(hasContribution({ authorship: "individual" })).toBe(true);
    expect(hasContribution({ summary: "fiz X" })).toBe(true);
  });
});
