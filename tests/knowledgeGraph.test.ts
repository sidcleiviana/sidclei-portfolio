import { describe, expect, it } from "vitest";

import {
  applyFilter,
  computeLayout,
  connectedIds,
  EDGE_TYPES,
  experienceKeySlug,
  parseNodeKey,
  toGraphData,
} from "@/domain/knowledgeGraph";
import type { KnowledgeMapData } from "@/sanity/types";

const data: KnowledgeMapData = {
  experiences: [
    {
      _id: "exp-free",
      company: "Freelance",
      role: "Desenvolvedor Freelancer",
      period: { _type: "dateRange", startDate: "2026-08-01" } as never,
      skillRefs: ["sk-backend", "sk-qa"],
      technologyRefs: ["te-python", "te-fastapi"],
    },
    {
      _id: "exp-iso",
      company: "ISO Olhos",
      role: "Analista",
      period: { _type: "dateRange", startDate: "2023-05-01" } as never,
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
      roles: ["Backend", "QA / Testes"],
      experienceRef: "exp-free",
      skillRefs: ["sk-backend", "sk-qa"],
      technologyRefs: ["te-python", "te-fastapi"],
    },
    {
      _id: "pr-secret",
      title: "PRIVADO",
      slug: "privado",
      projectType: "lab",
      visibility: "private",
      roles: null,
      experienceRef: "exp-iso",
      skillRefs: ["sk-backend"],
      technologyRefs: ["te-python"],
    },
  ],
  skills: [
    { _id: "sk-backend", name: "Backend Development", slug: "backend-development", category: "Desenvolvimento", featured: true },
    { _id: "sk-qa", name: "Qualidade de Software / QA", slug: "qa", category: "Qualidade", featured: false },
  ],
  technologies: [
    { _id: "te-python", name: "Python", slug: "python", category: "Linguagem" },
    { _id: "te-fastapi", name: "FastAPI", slug: "fastapi", category: "Framework" },
  ],
};

describe("toGraphData", () => {
  const graph = toGraphData(data);

  it("builds one node per real, public entity", () => {
    const ids = graph.nodes.map((n) => n.id).sort();
    expect(ids).toEqual(
      ["exp-free", "exp-iso", "pr-chatbot", "sk-backend", "sk-qa", "te-fastapi", "te-python"].sort()
    );
    // private project is never a node
    expect(graph.nodes.find((n) => n.id === "pr-secret")).toBeUndefined();
  });

  it("only ever produces the five approved edge types", () => {
    const used = new Set(graph.edges.map((e) => e.type));
    for (const t of used) expect(EDGE_TYPES).toContain(t);
    expect(used.has("experience_skill")).toBe(true);
    expect(used.has("experience_technology")).toBe(true);
    expect(used.has("project_skill")).toBe(true);
    expect(used.has("project_technology")).toBe(true);
    expect(used.has("project_experience")).toBe(true);
  });

  it("NEVER creates a skill_technology edge — even when they co-occur", () => {
    // Backend + Python co-occur in exp-free AND pr-chatbot
    const bad = graph.edges.filter(
      (e) =>
        (e.source === "sk-backend" && e.target === "te-python") ||
        (e.source === "te-python" && e.target === "sk-backend")
    );
    expect(bad).toHaveLength(0);
    // no edge type outside the five
    for (const e of graph.edges) {
      expect(["experience_skill","experience_technology","project_skill","project_technology","project_experience"]).toContain(e.type);
    }
  });

  it("drops every edge that would touch a private project", () => {
    for (const e of graph.edges) {
      expect(e.source).not.toBe("pr-secret");
      expect(e.target).not.toBe("pr-secret");
    }
    // exp-iso still connects to backend/python via the experience, not the project
    expect(connectedIds(graph, "exp-iso")).toEqual(new Set(["sk-backend", "te-python"]));
  });

  it("uses a stable public key, not the _id", () => {
    const backend = graph.nodes.find((n) => n.id === "sk-backend")!;
    expect(backend.key).toBe("skill:backend-development");
    expect(graph.nodes.find((n) => n.id === "pr-chatbot")!.key).toBe("project:chatbot-ia");
    expect(graph.nodes.find((n) => n.id === "exp-free")!.key).toBe(
      "experience:" + experienceKeySlug({ company: "Freelance", role: "Desenvolvedor Freelancer" })
    );
    expect(parseNodeKey("skill:backend-development")).toEqual({ type: "skill", slug: "backend-development" });
    expect(parseNodeKey("garbage")).toBeNull();
  });
});

describe("connectedIds — direct edges only, never transitive", () => {
  const graph = toGraphData(data);
  it("returns one hop", () => {
    // Backend connects to exp-free, exp-iso, pr-chatbot — NOT to Python (which is 2 hops)
    expect(connectedIds(graph, "sk-backend")).toEqual(
      new Set(["exp-free", "exp-iso", "pr-chatbot"])
    );
  });
});

describe("applyFilter", () => {
  const graph = toGraphData(data);
  it("hides a type and every edge that would dangle", () => {
    const filtered = applyFilter(graph, new Set(["technology"]));
    expect(filtered.nodes.every((n) => n.type !== "technology")).toBe(true);
    expect(
      filtered.edges.every(
        (e) => e.type !== "experience_technology" && e.type !== "project_technology"
      )
    ).toBe(true);
  });
  it("no-op when nothing is hidden", () => {
    expect(applyFilter(graph, new Set())).toBe(graph);
  });
});

describe("computeLayout — deterministic", () => {
  const graph = toGraphData(data);
  it("same nodes + size -> identical positions", () => {
    const a = computeLayout(graph.nodes, { width: 800, height: 600 });
    const b = computeLayout(graph.nodes, { width: 800, height: 600 });
    for (const n of graph.nodes) expect(a.get(n.id)).toEqual(b.get(n.id));
  });
  it("places skills, exp/proj and technologies in three distinct bands", () => {
    const p = computeLayout(graph.nodes, { width: 800, height: 600 });
    const y = (id: string) => p.get(id)!.y;
    expect(y("sk-backend")).toBeLessThan(y("exp-free"));
    expect(y("exp-free")).toBeLessThan(y("te-python"));
  });
});
