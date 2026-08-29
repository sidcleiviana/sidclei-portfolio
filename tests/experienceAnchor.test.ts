import { describe, expect, it } from "vitest";

import {
  experienceAnchor,
  slugify,
  uniqueExperienceAnchors,
} from "@/domain/experienceAnchor";

describe("slugify", () => {
  it("strips accents and non-alphanumerics", () => {
    expect(slugify("ISO Olhos — Automação & Dados")).toBe(
      "iso-olhos-automacao-dados"
    );
    expect(slugify("  Trailing / Slashes  ")).toBe("trailing-slashes");
  });
});

describe("experienceAnchor", () => {
  it("is deterministic from company + role", () => {
    const a = experienceAnchor({ company: "Empresa X", role: "Desenvolvedor" });
    const b = experienceAnchor({ company: "Empresa X", role: "Desenvolvedor" });
    expect(a).toBe(b);
    expect(a).toBe("empresa-x-desenvolvedor");
  });
  it("never returns empty", () => {
    expect(experienceAnchor({})).toBe("experiencia");
    expect(experienceAnchor({ company: "—", role: null })).toBe("experiencia");
  });
});

describe("uniqueExperienceAnchors", () => {
  it("suffixes collisions in list order", () => {
    expect(
      uniqueExperienceAnchors([
        { company: "Acme", role: "Analista" },
        { company: "Acme", role: "Desenvolvedor" },
        { company: "Acme", role: "Analista" },
      ])
    ).toEqual(["acme-analista", "acme-desenvolvedor", "acme-analista-2"]);
  });
});
