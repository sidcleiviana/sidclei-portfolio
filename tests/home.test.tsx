import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CareerSummary } from "@/features/home/CareerSummary";
import { FeaturedProjects } from "@/features/home/FeaturedProjects";
import { Hero } from "@/features/home/Hero";
import { NextStep } from "@/features/home/NextStep";
import { richHomeFixture } from "@/features/home/fixtures";
import { experiencesQuery } from "@/sanity/queries/experience";
import { homeQuery } from "@/sanity/queries/home";
import type { HomeProjectRef } from "@/sanity/types";

const proj = (
  over: Partial<HomeProjectRef> & { _id: string }
): HomeProjectRef => ({
  title: "Projeto",
  slug: "p",
  shortDescription: "desc",
  projectType: "professional",
  featured: false,
  visibility: "public",
  coverImage: null,
  technologies: null,
  ...over,
});

describe("Hero", () => {
  it("falls back to constitution copy when there is no profile", () => {
    render(<Hero profile={null} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Sidclei Viana" })
    ).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedor de Software")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver projetos" })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(
      screen.getByRole("link", { name: "Ver trajetória" })
    ).toHaveAttribute("href", "/experiencia");
  });

  it("uses CMS identity when present", () => {
    render(<Hero profile={richHomeFixture.profile} />);
    expect(screen.getByText(/Resumo de exemplo/)).toBeInTheDocument();
    expect(screen.getByText("Brasil · Remoto")).toBeInTheDocument();
  });
});

describe("FeaturedProjects", () => {
  it("renders nothing when there is nothing to show (Sprint §13)", () => {
    const { container } = render(<FeaturedProjects projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("prefers featured and never shows a private project (Sprint §12, §41)", () => {
    render(
      <FeaturedProjects
        projects={[
          proj({ _id: "a", title: "Em destaque", featured: true }),
          proj({ _id: "b", title: "Comum", featured: false }),
          proj({
            _id: "c",
            title: "PRIVADO",
            featured: true,
            visibility: "private",
          }),
        ]}
      />
    );
    expect(screen.getByText("Em destaque")).toBeInTheDocument();
    expect(screen.queryByText("Comum")).not.toBeInTheDocument();
    expect(screen.queryByText("PRIVADO")).not.toBeInTheDocument();
  });

  it("falls back to the recent list when nothing is featured", () => {
    render(
      <FeaturedProjects
        projects={[
          proj({ _id: "a", title: "Recente 1" }),
          proj({ _id: "b", title: "Recente 2" }),
        ]}
      />
    );
    expect(screen.getByText("Recente 1")).toBeInTheDocument();
    expect(screen.getByText("Recente 2")).toBeInTheDocument();
  });
});

describe("CareerSummary", () => {
  it("renders nothing without experience content (Sprint §20)", () => {
    const { container } = render(<CareerSummary experiences={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("lists recent roles linking into the trajectory", () => {
    render(<CareerSummary experiences={richHomeFixture.experiences} />);
    expect(
      screen.getByRole("heading", { name: "Como cheguei aqui" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ver trajetória completa →" })
    ).toHaveAttribute("href", "/experiencia");
    expect(
      screen
        .getByText("Desenvolvedor de Software")
        .closest("a")
        ?.getAttribute("href")
    ).toBe("/experiencia#empresa-de-exemplo-desenvolvedor-de-software");
  });
});

describe("NextStep", () => {
  it("always offers the two routes; contact only with real data (Sprint §23, §35)", () => {
    const { rerender } = render(<NextStep profile={null} />);
    expect(screen.getByRole("link", { name: /Projetos/ })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();

    rerender(<NextStep profile={richHomeFixture.profile} />);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://example.com/gh"
    );
    expect(
      screen.getByRole("link", { name: "contato@example.com" })
    ).toHaveAttribute("href", "mailto:contato@example.com");
  });
});

describe("homeQuery", () => {
  it("applies the public gate to the projects projection (Sprint §41)", () => {
    expect(homeQuery).toContain('status == "published"');
    expect(homeQuery).toContain('visibility != "private"');
    expect(homeQuery).toContain('"experiences"');
    // light — no content blocks fetched
    expect(homeQuery).not.toContain("contentBlocks");
  });
  it("reuses the same experience ordering as /experiencia", () => {
    expect(experiencesQuery).toContain("coalesce(period.ongoing, false) desc");
    expect(homeQuery).toContain("coalesce(period.ongoing, false) desc");
  });
});
