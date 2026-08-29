import type { ExperienceEntry, ExperienceProjectRef } from "@/sanity/types";

/**
 * SYNTHETIC fixture — placeholder text only, no real professional claims. Used
 * by `tests/` and the dev-only `/dev/experience-preview` route to exercise the
 * career-journey layout without publishing invented facts to the CMS
 * (Sprint §3, §29). Never imported by a public route.
 */

const LOREM =
  "Resumo de exemplo para homologação do layout. Não representa uma experiência profissional real.";

const proj = (
  n: number,
  over: Partial<ExperienceProjectRef> = {}
): ExperienceProjectRef => ({
  _id: `fx-proj-${n}`,
  title: `Projeto de exemplo ${n}`,
  slug: `fixture-projeto-${n}`,
  shortDescription: "Descrição curta de exemplo.",
  projectType: "professional",
  visibility: "public",
  technologies: [
    { _id: "t1", name: "Python", slug: "python", category: "Linguagem" },
    { _id: "t2", name: "SQL", slug: "sql", category: "Linguagem" },
  ],
  ...over,
});

export const richExperienceFixture: ExperienceEntry = {
  _id: "fx-exp-rich",
  company: "Empresa de exemplo",
  role: "Desenvolvedor de Software",
  period: { _type: "dateRange", startDate: "2023-05-01", ongoing: true },
  location: "Remoto",
  summary: LOREM,
  responsibilities: [
    "Desenvolvimento de serviços e integrações.",
    "Automação de rotinas operacionais.",
    "Cobertura de testes e homologação.",
  ],
  skills: [
    {
      _id: "s1",
      name: "Backend Development",
      slug: "backend",
      category: "Desenvolvimento",
    },
    {
      _id: "s2",
      name: "Automação",
      slug: "automacao",
      category: "Automação",
    },
  ],
  technologies: [
    { _id: "t1", name: "Python", slug: "python", category: "Linguagem" },
    {
      _id: "t3",
      name: "PostgreSQL",
      slug: "postgresql",
      category: "Banco de dados",
    },
  ],
  projects: [proj(1), proj(2)],
};

export const sparseExperienceFixture: ExperienceEntry = {
  _id: "fx-exp-sparse",
  company: "Outra empresa de exemplo",
  role: "Analista de Sistemas",
  period: {
    _type: "dateRange",
    startDate: "2020-02-01",
    endDate: "2023-04-01",
  },
  location: null,
  summary: "Uma linha de contexto.",
  responsibilities: null,
  skills: null,
  technologies: null,
  projects: [],
};

export const experienceFixtures: ExperienceEntry[] = [
  richExperienceFixture,
  sparseExperienceFixture,
];
