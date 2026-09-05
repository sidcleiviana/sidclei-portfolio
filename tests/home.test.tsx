import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturedProject } from "@/features/home/FeaturedProject";
import { Hero } from "@/features/home/Hero";
import { HomeKnowledge } from "@/features/home/HomeKnowledge";
import { HomeOutro } from "@/features/home/HomeOutro";
import { HomeTrajectory } from "@/features/home/HomeTrajectory";
import { richHomeFixture } from "@/features/home/fixtures";
import { experiencesQuery } from "@/sanity/queries/experience";
import { homeQuery } from "@/sanity/queries/home";
import type { HomeProjectRef } from "@/sanity/types";

const proj = (
  over: Partial<HomeProjectRef> & { _id: string }
): HomeProjectRef => ({
  title: over._id,
  slug: over._id,
  shortDescription: "desc",
  projectType: "professional",
  featured: false,
  visibility: "public",
  period: null,
  roles: null,
  technologies: null,
  ...over,
});

describe("Hero", () => {
  it("falls back to constitution copy when there is no profile", () => {
    render(<Hero profile={null} current={null} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Desenvolvedor de Software" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sidclei Viana")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
    expect(screen.getByText("Sistemas")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver projetos/ })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("uses the CMS profile when present", () => {
    render(<Hero profile={richHomeFixture.profile} current={null} />);
    expect(screen.getByText(/Resumo de exemplo/)).toBeInTheDocument();
  });

  it("shows no live status without an ongoing experience", () => {
    render(<Hero profile={null} current={null} />);
    expect(screen.queryByText("Agora")).not.toBeInTheDocument();
  });

  it("surfaces the ongoing experience as a live status link", () => {
    render(
      <Hero profile={null} current={richHomeFixture.experiences[0]!} />
    );
    const link = screen
      .getByText("Agora")
      .closest("a") as HTMLAnchorElement;
    expect(link).toHaveAttribute(
      "href",
      "/experiencia#empresa-de-exemplo-desenvolvedor-de-software"
    );
    expect(link.textContent).toContain("Empresa de exemplo");
  });
});

describe("FeaturedProject", () => {
  it("renders nothing when there is nothing to show", () => {
    const { container } = render(<FeaturedProject projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("prefers featured and never shows a private project", () => {
    render(
      <FeaturedProject
        projects={[
          proj({ _id: "Comum", featured: false }),
          proj({ _id: "Em destaque", featured: true }),
          proj({ _id: "PRIVADO", featured: true, visibility: "private" }),
        ]}
      />
    );
    expect(screen.getByRole("heading", { name: "Em destaque" })).toBeInTheDocument();
    expect(screen.queryByText("PRIVADO")).not.toBeInTheDocument();
  });

  it("falls back to the first public project when nothing is featured", () => {
    render(<FeaturedProject projects={[proj({ _id: "Recente" })]} />);
    expect(screen.getByRole("heading", { name: "Recente" })).toBeInTheDocument();
  });
});

describe("HomeTrajectory", () => {
  it("renders nothing without experience content", () => {
    const { container } = render(<HomeTrajectory experiences={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("offers a selector and a link to the full trajectory", () => {
    render(<HomeTrajectory experiences={richHomeFixture.experiences} />);
    expect(
      screen.getByRole("link", { name: /Ver trajetória completa/ })
    ).toHaveAttribute("href", "/experiencia");
    expect(
      screen.getAllByRole("tab", { name: /Desenvolvedor de Software/ }).length
    ).toBeGreaterThan(0);
  });
});

describe("HomeKnowledge", () => {
  it("renders nothing without featured skills", () => {
    const { container } = render(<HomeKnowledge skills={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("labels the technologies as belonging to the contexts, not the skill", () => {
    render(<HomeKnowledge skills={richHomeFixture.featuredSkills} />);
    expect(
      screen.getByText("Tecnologias presentes nesses contextos")
    ).toBeInTheDocument();
    expect(screen.getByText(/não atribuídas diretamente à competência/)).toBeInTheDocument();
  });
});

describe("HomeOutro", () => {
  it("always offers the three routes; contact only with real data", () => {
    const { rerender } = render(<HomeOutro profile={null} />);
    expect(screen.getByRole("link", { name: /Projetos/ })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByRole("link", { name: /Conhecimento/ })).toHaveAttribute(
      "href",
      "/conhecimento"
    );
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();

    rerender(<HomeOutro profile={richHomeFixture.profile} />);
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
  it("applies the public gate to every project projection", () => {
    expect(homeQuery).toContain('status == "published"');
    expect(homeQuery).toContain('visibility != "private"');
    expect(homeQuery).toContain('"experiences"');
    expect(homeQuery).toContain('"featuredSkills"');
    expect(homeQuery).not.toContain("contentBlocks");
  });
  it("reuses the same experience ordering as /experiencia", () => {
    expect(experiencesQuery).toContain("coalesce(period.ongoing, false) desc");
    expect(homeQuery).toContain("coalesce(period.ongoing, false) desc");
  });
});
