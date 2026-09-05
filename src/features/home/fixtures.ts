import type { HomeData } from "@/sanity/types";

/**
 * SYNTHETIC fixture — placeholder text only, no real professional claims. Used
 * by `tests/` and the dev-only `/dev/home-preview` route. Never imported by a
 * public route.
 */
export const richHomeFixture: HomeData = {
  profile: {
    name: "Sidclei Viana",
    headline: "Desenvolvedor de Software",
    shortSummary:
      "Resumo de exemplo: atuação entre software, automação, dados e sistemas. Texto sintético para homologação do layout.",
    publicLocation: "Brasil · Remoto",
    resumeUrl: "https://example.com/cv.pdf",
    professionalEmail: "contato@example.com",
    links: [
      { _key: "l1", _type: "externalLink", label: "GitHub", url: "https://example.com/gh", kind: "github" },
      { _key: "l2", _type: "externalLink", label: "LinkedIn", url: "https://example.com/in", kind: "linkedin" },
    ],
  },
  projects: [
    {
      _id: "fx-1",
      title: "Projeto em destaque",
      slug: "fixture-destaque",
      shortDescription: "Descrição curta de exemplo para o card.",
      projectType: "professional",
      featured: true,
      visibility: "public",
      period: { _type: "dateRange", startDate: "2025-01-01" },
      roles: ["Backend", "QA / Testes"],
      technologies: [
        { _id: "t1", name: "Python", slug: "python" },
        { _id: "t2", name: "FastAPI", slug: "fastapi" },
        { _id: "t3", name: "OpenAI API", slug: "openai-api" },
      ],
    },
  ],
  experiences: [
    {
      _id: "fx-e1",
      company: "Empresa de exemplo",
      role: "Desenvolvedor de Software",
      period: { _type: "dateRange", startDate: "2023-05-01", ongoing: true },
      location: "Remoto",
      summary: "Resumo sintético da função atual para homologação.",
      responsibilities: ["Responsabilidade de exemplo A", "Responsabilidade de exemplo B"],
      skills: [{ _id: "s1", name: "Backend Development", slug: "backend-development", category: "Desenvolvimento" }],
      technologies: [{ _id: "t1", name: "Python", slug: "python", category: "Linguagem" }],
      projects: [{ _id: "fx-1", title: "Projeto em destaque", slug: "fixture-destaque", visibility: "public" }],
    },
    {
      _id: "fx-e2",
      company: "Outra empresa",
      role: "Analista de Sistemas",
      period: { _type: "dateRange", startDate: "2020-02-01", endDate: "2023-04-01" },
      location: null,
      summary: null,
      responsibilities: null,
      skills: null,
      technologies: null,
      projects: [],
    },
  ],
  featuredSkills: [
    {
      _id: "fs-1",
      name: "Backend Development",
      slug: "backend-development",
      category: "Desenvolvimento",
      shortDescription: "Descrição sintética da competência.",
      contextExperiences: [{ _id: "fx-e1", company: "Empresa de exemplo", role: "Desenvolvedor de Software" }],
      contextProjects: [{ _id: "fx-1", title: "Projeto em destaque", slug: "fixture-destaque", visibility: "public" }],
      contextTechnologies: ["Python", "FastAPI"],
    },
  ],
};

export const emptyHomeFixture: HomeData = {
  profile: null,
  projects: [],
  experiences: [],
  featuredSkills: [],
};
