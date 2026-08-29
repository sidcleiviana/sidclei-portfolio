import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CareerJourney } from "@/features/experience/CareerJourney";
import {
  experienceFixtures,
  richExperienceFixture,
  sparseExperienceFixture,
} from "@/features/experience/fixtures";
import { experiencesQuery } from "@/sanity/queries/experience";
import type { ExperienceEntry } from "@/sanity/types";

describe("CareerJourney — empty (Sprint §42)", () => {
  it("renders an editorial state, not an error", () => {
    render(<CareerJourney experiences={[]} />);
    expect(screen.getByText(/ainda não foi publicada/i)).toBeInTheDocument();
  });
});

describe("CareerJourney — sparse experience (Sprint §27)", () => {
  it("shows role / company / period and hides empty sub-sections", () => {
    render(<CareerJourney experiences={[sparseExperienceFixture]} />);
    expect(
      screen.getByRole("heading", { name: "Analista de Sistemas" })
    ).toBeInTheDocument();
    expect(screen.getByText("Outra empresa de exemplo")).toBeInTheDocument();
    expect(screen.getByText(/fev 2020 — abr 2023/)).toBeInTheDocument();
    expect(screen.queryByText("O que eu fazia")).not.toBeInTheDocument();
    expect(screen.queryByText("Competências")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Projetos deste período")
    ).not.toBeInTheDocument();
  });
});

describe("CareerJourney — rich experience (Sprint §28)", () => {
  it("composes responsibilities, skills, technologies and related projects", () => {
    const { container } = render(
      <CareerJourney experiences={experienceFixtures} />
    );
    expect(screen.getByText("O que eu fazia")).toBeInTheDocument();
    expect(screen.getByText("Backend Development")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Projetos deste período")).toBeInTheDocument();
    expect(screen.getByText("Projeto de exemplo 1")).toBeInTheDocument();
    // ongoing role marked "Atual"
    expect(screen.getByText("Atual")).toBeInTheDocument();
    // deterministic anchor
    expect(
      container.querySelector("#empresa-de-exemplo-desenvolvedor-de-software")
    ).toBeTruthy();
  });
});

describe("CareerJourney — confidentiality (Sprint §8)", () => {
  it("never renders a private related project even if the data slips one in", () => {
    const withPrivate: ExperienceEntry = {
      ...richExperienceFixture,
      projects: [
        {
          _id: "leak",
          title: "PROJETO PRIVADO",
          slug: "leak",
          shortDescription: "não deveria aparecer",
          projectType: "lab",
          visibility: "private",
          technologies: null,
        },
        ...richExperienceFixture.projects,
      ],
    };
    render(<CareerJourney experiences={[withPrivate]} />);
    expect(screen.queryByText("PROJETO PRIVADO")).not.toBeInTheDocument();
    expect(screen.getByText("Projeto de exemplo 1")).toBeInTheDocument();
  });
});

describe("experiencesQuery", () => {
  it("applies the public gate to the related-projects subquery", () => {
    expect(experiencesQuery).toContain("references(^._id)");
    expect(experiencesQuery).toContain('status == "published"');
    expect(experiencesQuery).toContain('visibility != "private"');
  });
  it("orders current roles first, then newest", () => {
    expect(experiencesQuery).toContain("coalesce(period.ongoing, false) desc");
    expect(experiencesQuery).toContain("period.startDate desc");
  });
});
