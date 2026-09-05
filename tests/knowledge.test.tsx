import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { groupByCategory } from "@/domain/knowledge";
import {
  KnowledgeBadge,
  knowledgeHref,
} from "@/features/knowledge/KnowledgeBadge";
import { KnowledgeDetail } from "@/features/knowledge/KnowledgeDetail";
import { KnowledgeExplorer } from "@/features/knowledge/KnowledgeExplorer";
import { KnowledgeHub } from "@/features/knowledge/KnowledgeHub";
import {
  knowledgeHubQuery,
  skillBySlugQuery,
  technologyBySlugQuery,
} from "@/sanity/queries/knowledge";
import type {
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
  contextExperiences: [],
  contextProjects: [],
  contextTechnologies: [],
  ...over,
});

const tech = (
  over: Partial<KnowledgeTechnology> & { _id: string }
): KnowledgeTechnology => ({
  name: over._id,
  slug: over._id,
  category: "Linguagem",
  contextExperiences: [],
  contextProjects: [],
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

describe("KnowledgeExplorer", () => {
  it("selects the first item and reveals its real contexts", () => {
    render(
      <KnowledgeExplorer
        groups={[
          {
            label: null,
            items: [
              {
                _id: "s1",
                kind: "skill",
                name: "Backend Development",
                slug: "backend-development",
                category: "Desenvolvimento",
                shortDescription: null,
                contextExperiences: [
                  { _id: "e1", company: "ISO Olhos", role: "Desenvolvedor" },
                ],
                contextProjects: [
                  {
                    _id: "p1",
                    title: "Chatbot IA",
                    slug: "chatbot-ia",
                    visibility: "public",
                  },
                ],
                contextTechnologies: ["Python", "FastAPI"],
              },
            ],
          },
        ]}
      />
    );
    expect(screen.getByText("Apareceu em")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Desenvolvedor · ISO Olhos/ })
    ).toHaveAttribute("href", "/experiencia#iso-olhos-desenvolvedor");
    expect(screen.getByRole("link", { name: "Chatbot IA" })).toHaveAttribute(
      "href",
      "/projects/chatbot-ia"
    );
    // technologies are framed as context, never as the skill's own
    expect(
      screen.getByText("Tecnologias presentes nesses contextos")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/não atribuídas diretamente à competência/)
    ).toBeInTheDocument();
  });

  it("swaps the panel when another chip is chosen", async () => {
    const user = userEvent.setup();
    render(
      <KnowledgeExplorer
        groups={[
          {
            label: null,
            items: [
              {
                _id: "a",
                kind: "technology",
                name: "Python",
                slug: "python",
                category: "Linguagem",
                contextExperiences: [],
                contextProjects: [],
              },
              {
                _id: "b",
                kind: "technology",
                name: "Docker",
                slug: "docker",
                category: "Plataforma",
                contextExperiences: [],
                contextProjects: [],
              },
            ],
          },
        ]}
      />
    );
    await user.click(screen.getByRole("button", { name: "Docker" }));
    expect(screen.getByRole("button", { name: "Docker" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(
      screen.getByRole("heading", { name: "Docker" })
    ).toBeInTheDocument();
  });

  it("keeps an active agent anchor in the detail panel", () => {
    const { container } = render(
      <KnowledgeExplorer
        groups={[
          {
            label: null,
            items: [
              {
                _id: "s1",
                kind: "skill",
                name: "Backend Development",
                slug: "backend-development",
                category: "Desenvolvimento",
                shortDescription: null,
                contextExperiences: [],
                contextProjects: [],
                contextTechnologies: [],
              },
            ],
          },
        ]}
      />
    );
    expect(
      container.querySelector("[data-agent-anchor='knowledge'][data-agent-here]")
    ).toBeTruthy();
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

  it("renders both explorer sections with headings", () => {
    render(<KnowledgeHub skills={skills} technologies={technologies} />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(/contexto/i);
    expect(screen.getByRole("heading", { name: "Competências" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tecnologias" })).toBeInTheDocument();
    // no proficiency signal
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Backend Development" })).toBeInTheDocument();
  });

  it("renders an empty state, not a crash", () => {
    render(<KnowledgeHub skills={[]} technologies={[]} />);
    expect(screen.getByText(/Ainda não há competências/i)).toBeInTheDocument();
  });
});

describe("KnowledgeDetail", () => {
  const experiences: KnowledgeExperienceRef[] = [
    {
      _id: "e1",
      company: "ISO Olhos",
      role: "Desenvolvedor",
      period: { _type: "dateRange", startDate: "2025-11-01", ongoing: true } as never,
    },
  ];

  it("links each context back to the trajectory anchor", () => {
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
    expect(
      screen.getByRole("link", { name: /Desenvolvedor · ISO Olhos/ })
    ).toHaveAttribute("href", "/experiencia#iso-olhos-desenvolvedor");
    expect(screen.getByRole("link", { name: "Conhecimento" })).toHaveAttribute(
      "href",
      "/conhecimento"
    );
  });

  it("omits empty relation sections — never '0 experiências'", () => {
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

  it("never renders a private related project", () => {
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

  it("frames a skill's context technologies as such", () => {
    render(
      <KnowledgeDetail
        kind="skill"
        name="Backend Development"
        experiences={experiences}
        projects={[]}
        contextTechnologies={["Python", "Redis"]}
      />
    );
    expect(
      screen.getByText("Tecnologias presentes nesses contextos")
    ).toBeInTheDocument();
    expect(screen.getByText("Redis")).toBeInTheDocument();
  });
});

describe("KnowledgeBadge", () => {
  it("links when a slug is present, plain text otherwise", () => {
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
    expect(knowledgeHref("technology", "x")).toBe("/conhecimento/tecnologias/x");
  });
});

describe("knowledge queries", () => {
  it("hub fetches no relation counts and orders featured-first", () => {
    expect(knowledgeHubQuery).toContain('_type == "skill"');
    expect(knowledgeHubQuery).toContain('_type == "technology"');
    expect(knowledgeHubQuery).toContain("order(featured desc");
    expect(knowledgeHubQuery).not.toContain("count(");
  });

  it("detail queries apply the public gate to related projects", () => {
    for (const q of [skillBySlugQuery, technologyBySlugQuery]) {
      expect(q).toContain("references(^._id)");
      expect(q).toContain('status == "published"');
      expect(q).toContain('visibility != "private"');
    }
  });

  it("the technology detail query never traverses to skills", () => {
    expect(technologyBySlugQuery).not.toContain('_type == "skill"');
  });
});
