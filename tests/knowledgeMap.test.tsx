import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/conhecimento/mapa",
}));

import { toGraphData } from "@/domain/knowledgeGraph";
import { KnowledgeMap } from "@/features/knowledge/map/KnowledgeMap";
import type { KnowledgeMapData } from "@/sanity/types";

const data: KnowledgeMapData = {
  experiences: [
    {
      _id: "exp-free",
      company: "Freelance",
      role: "Dev Freelancer",
      period: { _type: "dateRange", startDate: "2026-08-01" } as never,
      skillRefs: ["sk-backend"],
      technologyRefs: ["te-python"],
    },
  ],
  projects: [
    {
      _id: "pr-chatbot",
      title: "Chatbot IA",
      slug: "chatbot-ia",
      projectType: "production",
      visibility: "anonymized",
      roles: ["Backend"],
      experienceRef: "exp-free",
      skillRefs: ["sk-backend"],
      technologyRefs: ["te-python"],
    },
  ],
  skills: [
    { _id: "sk-backend", name: "Backend Development", slug: "backend-development", category: "Desenvolvimento", featured: true },
  ],
  technologies: [
    { _id: "te-python", name: "Python", slug: "python", category: "Linguagem" },
  ],
};

const graph = toGraphData(data);

beforeEach(() => {
  replace.mockClear();
});

describe("KnowledgeMap (mobile explorer path — matchMedia stub reports no match)", () => {
  it("opens in overview with a prompt and every entity listed", () => {
    render(<KnowledgeMap graph={graph} />);
    expect(
      screen.getByRole("heading", { level: 1, name: /se conecta/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Toque em um ponto/i)).toBeInTheDocument();
    // no node is pre-selected
    expect(screen.queryByRole("heading", { level: 2, name: "Backend Development" })).not.toBeInTheDocument();
  });

  it("selecting a node focuses it, updates the URL and lets you chain", async () => {
    const user = userEvent.setup();
    render(<KnowledgeMap graph={graph} />);

    await user.click(
      within(screen.getByLabelText("Relações em lista"))
        .getAllByRole("button", { name: "Backend Development" })[0]!
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Backend Development" })
    ).toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith(
      "/conhecimento/mapa?node=skill:backend-development",
      expect.anything()
    );
    // its real contexts show, technologies are labelled as derived context
    expect(screen.getByText("Relacionada diretamente a")).toBeInTheDocument();
    expect(
      screen.getByText("Tecnologias presentes nesses contextos")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/não uma relação direta da competência/i)
    ).toBeInTheDocument();
    // the related experience is reachable to chain into (explorer copy = first)
    expect(
      screen.getAllByRole("button", { name: "Dev Freelancer" })[0]
    ).toBeInTheDocument();

    // chain: pick the related project from the explorer rail
    await user.click(
      screen.getAllByRole("button", { name: "Chatbot IA" })[0]!
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Chatbot IA" })
    ).toBeInTheDocument();
    // back walks the history
    await user.click(screen.getByRole("button", { name: /Voltar/ }));
    expect(
      screen.getByRole("heading", { level: 2, name: "Backend Development" })
    ).toBeInTheDocument();
  });

  it("a hidden type filter removes its nodes from the view", async () => {
    const user = userEvent.setup();
    render(<KnowledgeMap graph={graph} />);
    // overview lists Python under Tecnologias
    expect(screen.getAllByRole("button", { name: "Python" }).length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Tecnologias" }));
    // still present in the always-on text map, but not in the explorer overview groups
    const explorerButtons = screen
      .getAllByRole("button", { name: "Python" })
      .filter((b) => !b.closest("[aria-label='Relações em lista']"));
    expect(explorerButtons).toHaveLength(0);
  });

  it("deep link ?node=type:slug starts in the selected state", () => {
    render(<KnowledgeMap graph={graph} initialNode="technology:python" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Python" })
    ).toBeInTheDocument();
  });

  it("keeps an accessible relation list independent of the graph", () => {
    render(<KnowledgeMap graph={graph} />);
    const list = screen.getByRole("navigation", { name: "Relações em lista" });
    // every node carries a "conecta a:" line + an "abrir" detail link
    expect(within(list).getAllByText(/conecta a:/i).length).toBe(
      graph.nodes.length
    );
    expect(within(list).getAllByRole("link", { name: "abrir" }).length).toBe(
      graph.nodes.length
    );
  });
});
