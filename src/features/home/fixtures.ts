import type { HomeData } from "@/sanity/types";

/**
 * SYNTHETIC fixture — placeholder text only, no real professional claims. Used
 * by `tests/` and the dev-only `/dev/home-preview` route to exercise a fully
 * populated Home without publishing invented content to the CMS (Sprint §44).
 * Never imported by a public route.
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
      {
        _key: "l1",
        _type: "externalLink",
        label: "GitHub",
        url: "https://example.com/gh",
        kind: "github",
      },
      {
        _key: "l2",
        _type: "externalLink",
        label: "LinkedIn",
        url: "https://example.com/in",
        kind: "linkedin",
      },
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
      coverImage: null,
      technologies: [
        { _id: "t1", name: "Python", slug: "python", category: "Linguagem" },
        { _id: "t2", name: "SQL", slug: "sql", category: "Linguagem" },
      ],
    },
    {
      _id: "fx-2",
      title: "Outro projeto",
      slug: "fixture-outro",
      shortDescription: "Mais uma descrição curta de exemplo.",
      projectType: "lab",
      featured: true,
      visibility: "public",
      coverImage: null,
      technologies: [
        { _id: "t1", name: "Python", slug: "python", category: "Linguagem" },
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
    },
    {
      _id: "fx-e2",
      company: "Outra empresa",
      role: "Analista de Sistemas",
      period: {
        _type: "dateRange",
        startDate: "2020-02-01",
        endDate: "2023-04-01",
      },
      location: null,
    },
  ],
};

export const emptyHomeFixture: HomeData = {
  profile: null,
  projects: [],
  experiences: [],
};
