import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/features/projects/ProjectCard";
import type { ProjectListItem } from "@/sanity/types";

function makeProject(
  overrides: Partial<ProjectListItem> = {}
): ProjectListItem {
  return {
    _id: "p1",
    title: "Projeto A",
    slug: "projeto-a",
    shortDescription: "Uma descrição curta do projeto A.",
    projectType: "lab",
    featured: false,
    coverImage: null,
    period: null,
    visibility: "public",
    technologies: [],
    contribution: null,
    ...overrides,
  };
}

describe("ProjectCard", () => {
  it("renders a minimal project without optional data", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(
      screen.getByRole("heading", { name: "Projeto A" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Uma descrição curta do projeto A.")
    ).toBeInTheDocument();
    expect(screen.getByText("Lab")).toBeInTheDocument();
  });

  it("shows the type, period, roles and technologies when present", () => {
    render(
      <ProjectCard
        project={makeProject({
          projectType: "production",
          period: { _type: "dateRange", startDate: "2023-01", ongoing: true },
          technologies: [
            {
              _id: "t1",
              name: "Python",
              slug: "python",
              category: "Linguagem",
              icon: null,
            },
            {
              _id: "t2",
              name: "Oracle",
              slug: "oracle",
              category: "Banco de dados",
              icon: null,
            },
          ],
          contribution: {
            _type: "projectContribution",
            authorship: "team",
            roles: ["Backend", "QA / Testes"],
          },
        })}
      />
    );
    expect(screen.getByText("Produção")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Oracle")).toBeInTheDocument();
    // period + roles appear in the meta label
    const label = screen.getByText("Produção").closest("p");
    expect(label?.textContent).toContain("2023 — atual");
    expect(label?.textContent).toContain("Backend · QA / Testes");
  });

  it("links to the project detail route", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(screen.getByRole("link", { name: "Projeto A" })).toHaveAttribute(
      "href",
      "/projects/projeto-a"
    );
  });

  it("compact variant keeps a heading link and technologies", () => {
    render(
      <ProjectCard
        variant="compact"
        project={makeProject({
          technologies: [
            {
              _id: "t1",
              name: "Python",
              slug: "python",
              category: "Linguagem",
              icon: null,
            },
          ],
        })}
      />
    );
    expect(screen.getByRole("link", { name: "Projeto A" })).toHaveAttribute(
      "href",
      "/projects/projeto-a"
    );
    expect(screen.getByText("Python")).toBeInTheDocument();
  });
});
