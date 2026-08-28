import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCaseStudy } from "@/features/projects/ProjectCaseStudy";
import {
  richProjectFixture,
  sparseProjectFixture,
} from "@/features/projects/fixtures";

describe("ProjectCaseStudy — sparse project (Sprint §28)", () => {
  it("renders as a finished page with only title / description / type / tech", () => {
    render(
      <ProjectCaseStudy
        project={sparseProjectFixture}
        prev={null}
        next={null}
      />
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /enxuto/ })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Python").length).toBeGreaterThan(0);
    // sections that have no content must not render
    expect(screen.queryByText("Contexto")).not.toBeInTheDocument();
    expect(screen.queryByText("Resultados")).not.toBeInTheDocument();
    expect(screen.queryByText("Evidências")).not.toBeInTheDocument();
    // no table of contents for a short case
    expect(
      screen.queryByRole("navigation", { name: "Índice do projeto" })
    ).not.toBeInTheDocument();
  });
});

describe("ProjectCaseStudy — rich project (Sprint §29)", () => {
  it("composes framing sections, blocks, contribution, metrics and evidence", () => {
    const { container } = render(
      <ProjectCaseStudy project={richProjectFixture} prev={null} next={null} />
    );

    // framing sections + anchors
    expect(container.querySelector("#contexto")).toBeTruthy();
    expect(container.querySelector("#problema")).toBeTruthy();
    expect(container.querySelector("#contribuicao")).toBeTruthy();
    expect(container.querySelector("#resultados")).toBeTruthy();
    expect(container.querySelector("#evidencias")).toBeTruthy();
    // a block heading becomes a stable anchor
    expect(container.querySelector("#sec-b-decisions")).toBeTruthy();

    // table of contents present for a long case
    expect(
      screen.getAllByRole("navigation", { name: "Índice do projeto" }).length
    ).toBeGreaterThan(0);

    // contribution: team roles are explicit, not inferred
    expect(screen.getAllByText("Minha atuação").length).toBeGreaterThan(0);
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("QA / Testes")).toBeInTheDocument();

    // metric shown verbatim
    expect(screen.getAllByText("30 dias → 10 horas").length).toBeGreaterThan(0);

    // evidence rendered with its type label
    expect(screen.getByText("Código no GitHub")).toBeInTheDocument();

    // skills and technologies stay separate concepts (§14)
    expect(screen.getByText("Backend Development")).toBeInTheDocument();
    expect(screen.getAllByText("PostgreSQL").length).toBeGreaterThan(0);
  });
});
