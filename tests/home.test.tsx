import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturedProject } from "@/features/home/FeaturedProject";
import { Hero } from "@/features/home/Hero";
import { HomeKnowledge } from "@/features/home/HomeKnowledge";
import { HomeOutro } from "@/features/home/HomeOutro";
import { HomeTrajectory } from "@/features/home/HomeTrajectory";
import { PortraitSurface } from "@/features/home/PortraitSurface";
import { richHomeFixture } from "@/features/home/fixtures";
import { FALLBACK_HEADLINE, FOCUS_LINE } from "@/features/home/identity";
import type { HomePhoto } from "@/sanity/types";
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
    expect(screen.queryByText("Atualmente")).not.toBeInTheDocument();
  });

  it("surfaces the ongoing experience as a live status link", () => {
    render(
      <Hero profile={null} current={richHomeFixture.experiences[0]!} />
    );
    const link = screen
      .getByText("Atualmente")
      .closest("a") as HTMLAnchorElement;
    expect(link).toHaveAttribute(
      "href",
      "/experiencia#empresa-de-exemplo-desenvolvedor-de-software"
    );
    expect(link.textContent).toContain("Empresa de exemplo");
  });
});

const photoFixture = (alt = "Retrato de Sidclei Viana"): HomePhoto => ({
  alt,
  asset: {
    _ref: "image-abc123-900x1125-jpg",
    _type: "reference",
  },
  hotspot: null,
  crop: null,
});
const PREVIEW_SRC = "data:image/svg+xml,%3Csvg%3E%3C%2Fsvg%3E";

describe("Hero — Sprint 10 identity", () => {
  it("uses profile.headline as the positioning h1 and shows the territory line", () => {
    render(
      <Hero
        profile={{ ...richHomeFixture.profile!, headline: "Engenheiro de Software & Soluções" }}
        current={null}
      />
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Engenheiro de Software & Soluções",
      })
    ).toBeInTheDocument();
    expect(screen.getByText(FOCUS_LINE)).toBeInTheDocument();
  });

  it("without a photo: no image, the live card reads 'Atualmente', axes remain", () => {
    const { container } = render(
      <Hero profile={null} current={richHomeFixture.experiences[0]!} />
    );
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("Atualmente")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
    // no premature placeholder copy
    expect(screen.queryByText(/adicione sua foto/i)).not.toBeInTheDocument();
    // technical fallback stays at the currently published headline
    expect(
      screen.getByRole("heading", { level: 1, name: FALLBACK_HEADLINE })
    ).toBeInTheDocument();
  });

  it("with a preview photo: renders the portrait, its agent anchor, and keeps the axes strip", () => {
    const { container } = render(
      <Hero
        profile={richHomeFixture.profile}
        current={null}
        portraitPreviewSrc={PREVIEW_SRC}
      />
    );
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("alt", "Sidclei Viana");
    expect(
      container.querySelector('[data-agent-anchor="portrait"]')
    ).not.toBeNull();
    // the hero-context anchor is not duplicated when the portrait is shown
    expect(container.querySelector('[data-agent-anchor="hero"]')).toBeNull();
    expect(screen.getByText("Software")).toBeInTheDocument();
  });

  it("with a photo and a current role: the factual title shows beside the portrait, linked to the experience", () => {
    render(
      <Hero
        profile={richHomeFixture.profile}
        current={richHomeFixture.experiences[0]!}
        portraitPreviewSrc={PREVIEW_SRC}
      />
    );
    // positioning stays the h1; the current job title is separate and factual
    expect(
      screen.getByRole("heading", { level: 1, name: "Engenheiro de Software & Soluções" })
    ).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: "Desenvolvedor de Software · Empresa de exemplo",
    });
    expect(link).toHaveAttribute(
      "href",
      "/experiencia#empresa-de-exemplo-desenvolvedor-de-software"
    );
  });
});

describe("PortraitSurface", () => {
  it("renders nothing without an image and without a preview src", () => {
    const { container } = render(<PortraitSurface photo={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("uses the CMS alt text, falling back to the name", () => {
    const withAlt = render(
      <PortraitSurface
        photo={photoFixture("Retrato de estúdio")}
        previewSrc={PREVIEW_SRC}
      />
    );
    expect(withAlt.container.querySelector("img")).toHaveAttribute(
      "alt",
      "Retrato de estúdio"
    );
    withAlt.unmount();

    const noAlt = render(
      <PortraitSurface photo={photoFixture("")} previewSrc={PREVIEW_SRC} />
    );
    expect(noAlt.container.querySelector("img")).toHaveAttribute(
      "alt",
      "Sidclei Viana"
    );
  });

  it("is not a link / not interactive", () => {
    const { container } = render(
      <PortraitSurface photo={photoFixture()} previewSrc={PREVIEW_SRC} />
    );
    expect(container.querySelector("a")).toBeNull();
    expect(container.querySelector("button")).toBeNull();
  });
});

describe("Experience integrity (Sprint 10)", () => {
  it("does not touch Experience.role — the trajectory still shows the factual title", () => {
    expect(richHomeFixture.experiences[0]!.role).toBe("Desenvolvedor de Software");
    render(<HomeTrajectory experiences={richHomeFixture.experiences} />);
    expect(
      screen.getAllByRole("tab", { name: /Desenvolvedor de Software/ }).length
    ).toBeGreaterThan(0);
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
  it("projects the profile photo for the hero portrait", () => {
    expect(homeQuery).toContain("photo{");
    expect(homeQuery).toContain("hotspot");
  });
  it("reuses the same experience ordering as /experiencia", () => {
    expect(experiencesQuery).toContain("coalesce(period.ongoing, false) desc");
    expect(homeQuery).toContain("coalesce(period.ongoing, false) desc");
  });
});
