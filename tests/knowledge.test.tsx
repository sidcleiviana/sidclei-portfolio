import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { groupByCategory } from "@/domain/knowledge";
import { ExperienceItem } from "@/features/experience/ExperienceItem";
import {
  KnowledgeBadge,
  knowledgeHref,
} from "@/features/knowledge/KnowledgeBadge";
import { KnowledgeDetail } from "@/features/knowledge/KnowledgeDetail";
import { KnowledgeHub } from "@/features/knowledge/KnowledgeHub";
import {
  knowledgeHubQuery,
  skillBySlugQuery,
  technologyBySlugQuery,
} from "@/sanity/queries/knowledge";
import type {
  ExperienceEntry,
  KnowledgeExperienceRef,
  KnowledgeProjectRef,
  KnowledgeSkill,
  KnowledgeTechnology,
} from "@/sanity/types";

const skill = (
  over: Partial<KnowledgeSkill> & { _id: string }
): KnowledgeSkill => ({
  name: over._id,
  slug: over._id,
  category: "Desenvolvimento",
  shortDescription: null,
  featured: false,
  contexts: [],
  ...over,
});

const tech = (
  over: Partial<KnowledgeTechnology> & { _id: string }
): KnowledgeTechnology => ({
  name: over._id,
  slug: over._id,
  category: "Linguagem",
  contexts: [],
  ...over,
});

const exp = (
  over: Partial<KnowledgeExperienceRef> & { _id: string }
): KnowledgeExperienceRef => ({
  company: "ISO Olhos",
  role: "Desenvolvedor",
  period: {
    _type: "dateRange",
    startDate: "2025-11-01",
    ongoing: true,
  } as never,
  ...over,
});

describe("groupByCategory", () => {
  it("groups by the real category, sorts groups alpha, keeps item order", () => {
    const groups = groupByCategory([
      skill({ _id: "b", category: "Dados" }),
      skill({ _id: "a", category: "Automação" }),
      skill({ _id: "c", category: "Automação" }),
      skill({ _id: "d", category: null }),
    ]);
    expect(groups.map((g) => g.category)).toEqual([
      "Automação",
      "Dados",
      "Outras",
    ]);
    expect(groups[0]!.items.map((i) => i._id)).toEqual(["a", "c"]);
  });
});

describe("KnowledgeHub", () => {
  const skills = [
    skill({ _id: "s1", name: "Backend Development", featured: true }),
    skill({ _id: "s2", name: "Automação", category: "Automação" }),
  ];
  const technologies = [
    tech({ _id: "t1", name: "Python" }),
    tech({ _id: "t2", name: "Power BI", category: "Ferramenta" }),
  ];

  it("renders both sections with category headings and deep links", () => {
    render(<KnowledgeHub skills={skills} technologies={technologies} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Conhecimento" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Competências" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tecnologias" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Backend Development/ })
    ).toHaveAttribute("href", "/conhecimento/competencias/s1");
    expect(screen.getByRole("link", { name: "Python" })).toHaveAttribute(
      "href",
      "/conhecimento/tecnologias/t1"
    );
    // featured marker, neutral wording (Sprint §11) — no percentages/levels
    expect(screen.getByText("(em destaque)")).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("renders an editorial empty state, not a crash (Sprint §4)", () => {
    render(<KnowledgeHub skills={[]} technologies={[]} />);
    expect(screen.getByText(/Ainda não há competências/i)).toBeInTheDocument();
  });

  it("shows the real usage contexts, not a count (Sprint 7 §21)", () => {
    render(
      <KnowledgeHub
        skills={[
          skill({
            _id: "s1",
            name: "Backend Development",
            contexts: ["ISO Olhos", "Freelance"],
          }),
        ]}
        technologies={[]}
      />
    );
    expect(screen.getByText("ISO Olhos · Freelance")).toBeInTheDocument();
    expect(screen.getByText(/usado em/i)).toBeInTheDocument();
  });
});

describe("KnowledgeDetail", () => {
  const experiences: KnowledgeExperienceRef[] = [
    exp({ _id: "e1", role: "Desenvolvedor", company: "ISO Olhos" }),
  ];

  it("links each context back to the trajectory anchor (Sprint §18)", () => {
    render(
      <KnowledgeDetail
        kind="skill"
        name="Backend Development"
        category="Desenvolvimento"
        experiences={experiences}
        projects={[]}
      />
    );
    expect(screen.getByText("Apareceu em")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Desenvolvedor/ })).toHaveAttribute(
      "href",
      "/experiencia#iso-olhos-desenvolvedor"
    );
    // breadcrumb
    expect(screen.getByRole("link", { name: "Conhecimento" })).toHaveAttribute(
      "href",
      "/conhecimento"
    );
  });

  it("omits empty relation sections — never '0 experiências' (Sprint §27)", () => {
    render(
      <KnowledgeDetail
        kind="technology"
        name="Git"
        category="Ferramenta"
        experiences={[]}
        projects={[]}
      />
    );
    expect(screen.queryByText("Apareceu em")).not.toBeInTheDocument();
    expect(screen.queryByText("Demonstrado em")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/0 (experiências|projetos)/i)
    ).not.toBeInTheDocument();
  });

  it("never renders a private related project (Sprint §21)", () => {
    const projects: KnowledgeProjectRef[] = [
      {
        _id: "p-priv",
        title: "PROJETO PRIVADO",
        slug: "priv",
        shortDescription: "não deveria aparecer",
        projectType: "lab",
        visibility: "private",
        technologies: null,
      },
      {
        _id: "p-pub",
        title: "Projeto público",
        slug: "pub",
        shortDescription: "ok",
        projectType: "professional",
        visibility: "public",
        technologies: null,
      },
    ];
    render(
      <KnowledgeDetail
        kind="skill"
        name="Automação"
        category="Automação"
        experiences={[]}
        projects={projects}
      />
    );
    expect(screen.getByText("Projeto público")).toBeInTheDocument();
    expect(screen.queryByText("PROJETO PRIVADO")).not.toBeInTheDocument();
  });
});

describe("KnowledgeBadge", () => {
  it("links when a slug is present, plain badge otherwise", () => {
    const { rerender } = render(
      <KnowledgeBadge kind="skill" slug="python" name="Python" />
    );
    expect(screen.getByRole("link", { name: "Python" })).toHaveAttribute(
      "href",
      "/conhecimento/competencias/python"
    );
    rerender(<KnowledgeBadge kind="technology" slug={null} name="Python" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("builds the right route per kind", () => {
    expect(knowledgeHref("skill", "x")).toBe("/conhecimento/competencias/x");
    expect(knowledgeHref("technology", "x")).toBe(
      "/conhecimento/tecnologias/x"
    );
  });
});

describe("Experience badges are now knowledge links (Sprint §17, §32)", () => {
  const experience = {
    _id: "x1",
    company: "ISO Olhos",
    role: "Desenvolvedor",
    period: { _type: "dateRange", startDate: "2025-11-01", ongoing: true },
    location: null,
    summary: "resumo",
    responsibilities: ["fazer coisas"],
    skills: [
      {
        _id: "sk",
        name: "Backend Development",
        slug: "backend-development",
        category: "Desenvolvimento",
      },
    ],
    technologies: [
      { _id: "te", name: "Python", slug: "python", category: "Linguagem" },
    ],
    projects: [],
  } as unknown as ExperienceEntry;

  it("renders skill and technology badges as deep links", () => {
    render(
      <ExperienceItem
        experience={experience}
        anchor="iso-olhos-desenvolvedor"
      />
    );
    expect(
      screen.getByRole("link", { name: "Backend Development" })
    ).toHaveAttribute("href", "/conhecimento/competencias/backend-development");
    expect(screen.getByRole("link", { name: "Python" })).toHaveAttribute(
      "href",
      "/conhecimento/tecnologias/python"
    );
  });
});

describe("knowledge queries", () => {
  it("hub fetches no relation counts (Sprint §3) and orders featured-first", () => {
    expect(knowledgeHubQuery).toContain('_type == "skill"');
    expect(knowledgeHubQuery).toContain('_type == "technology"');
    expect(knowledgeHubQuery).toContain("order(featured desc");
    expect(knowledgeHubQuery).not.toContain("count(");
  });

  it("detail queries apply the public gate to related projects (Sprint §21)", () => {
    for (const q of [skillBySlugQuery, technologyBySlugQuery]) {
      expect(q).toContain("references(^._id)");
      expect(q).toContain('status == "published"');
      expect(q).toContain('visibility != "private"');
    }
  });

  it("detail queries never traverse skill<->technology (Sprint §7)", () => {
    // no cross-edge: a skill query must not reference technology and vice-versa
    expect(skillBySlugQuery).not.toContain('_type == "technology"');
    expect(technologyBySlugQuery).not.toContain('_type == "skill"');
  });
});
