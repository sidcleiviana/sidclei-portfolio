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
    // no contribution → no "Minha contribuição"
    expect(screen.queryByText(/Minha contribuição/)).not.toBeInTheDocument();
  });

  it("shows the contribution roles and technology chips when present", () => {
    render(
      <ProjectCard
        project={makeProject({
          projectType: "production",
          period: { startDate: "2023-01", ongoing: true },
          technologies: [
            {
              _id: "t1",
              name: "Python",
              slug: "python",
              category: "Linguagem",
            },
            {
              _id: "t2",
              name: "Oracle",
              slug: "oracle",
              category: "Banco de dados",
            },
          ],
          contribution: {
            authorship: "team",
            roles: ["Backend", "QA / Testes"],
          },
        })}
      />
    );

    expect(screen.getByText(/Minha contribuição/)).toBeInTheDocument();
    expect(screen.getByText(/Backend · QA \/ Testes/)).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Oracle")).toBeInTheDocument();
    expect(screen.getByText("2023 — atual")).toBeInTheDocument();
    expect(screen.getByText("Produção")).toBeInTheDocument();
  });

  it("links to the project detail route", () => {
    render(<ProjectCard project={makeProject()} />);
    expect(screen.getByRole("link", { name: "Projeto A" })).toHaveAttribute(
      "href",
      "/projects/projeto-a"
    );
  });
});
