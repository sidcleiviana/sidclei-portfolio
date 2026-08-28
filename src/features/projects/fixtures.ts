import type { ContentBlock, PortableText, ProjectDetail } from "@/sanity/types";

/**
 * SYNTHETIC fixture — placeholder text only, no real professional claims. Used
 * by `tests/` and the dev-only `/dev/case-preview` route to exercise the rich
 * case-study layout without publishing invented content to the CMS
 * (Sprint §41, §43). Never imported by a public route.
 */

function pt(text: string): PortableText {
  return [
    {
      _type: "block",
      _key: `k${text.length}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s0", text, marks: [] }],
    },
  ];
}

const LOREM =
  "Texto de exemplo para homologação do layout. Não representa conteúdo profissional real.";

const richBlocks: ContentBlock[] = [
  {
    _key: "b-rich",
    _type: "richTextBlock",
    body: [
      {
        _type: "block",
        _key: "r1",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "s", text: "Abordagem", marks: [] }],
      },
      ...pt(LOREM),
      {
        _type: "block",
        _key: "r3",
        style: "normal",
        markDefs: [],
        children: [
          { _type: "span", _key: "s1", text: "Trecho com ", marks: [] },
          { _type: "span", _key: "s2", text: "código inline", marks: ["code"] },
          { _type: "span", _key: "s3", text: " e ", marks: [] },
          { _type: "span", _key: "s4", text: "ênfase", marks: ["strong"] },
          { _type: "span", _key: "s5", text: ".", marks: [] },
        ],
      },
    ],
  },
  {
    _key: "b-decisions",
    _type: "technicalDecisionsBlock",
    heading: "Decisões técnicas",
    decisions: [
      {
        _key: "d1",
        question: "Por que a leitura foi mantida somente server-side?",
        rationale: pt(LOREM),
      },
      {
        _key: "d2",
        question: "Por que a automação foi feita de forma incremental?",
        rationale: pt(LOREM),
      },
    ],
  },
  {
    _key: "b-timeline",
    _type: "timelineBlock",
    heading: "Processo",
    entries: [
      {
        _key: "t1",
        date: "Semana 1",
        title: "Levantamento",
        description: LOREM,
      },
      { _key: "t2", date: "Semana 2", title: "Protótipo", description: LOREM },
      { _key: "t3", date: "Semana 4", title: "Validação", description: LOREM },
    ],
  },
  {
    _key: "b-metrics",
    _type: "metricGridBlock",
    heading: "Números",
    metrics: [
      {
        _type: "metric",
        _key: "m1",
        label: "Tempo de processo",
        before: "30 dias",
        after: "10 horas",
      },
      {
        _type: "metric",
        _key: "m2",
        label: "Etapas manuais",
        value: "12",
        unit: "→ 2",
      },
      {
        _type: "metric",
        _key: "m3",
        label: "Execuções/mês",
        value: "≈ 400",
        description: LOREM,
      },
    ],
  },
  {
    _key: "b-callout",
    _type: "calloutBlock",
    tone: "note",
    title: "Observação",
    body: pt(LOREM),
  },
  {
    _key: "b-learning",
    _type: "learningBlock",
    heading: "Aprendizados",
    body: pt(LOREM),
    takeaways: [
      "Contratos tipados reduzem retrabalho.",
      "Automação incremental é mais fácil de validar.",
    ],
  },
  {
    _key: "b-links",
    _type: "linksBlock",
    heading: "Referências",
    links: [
      {
        _type: "externalLink",
        _key: "l1",
        label: "Documentação",
        url: "https://example.com/docs",
      },
    ],
  },
] as unknown as ContentBlock[];

export const richProjectFixture: ProjectDetail = {
  _id: "fixture-rich",
  title: "Projeto de homologação (rico)",
  slug: "fixture-rich",
  shortDescription:
    "Fixture sintética com todos os blocos, contribuição em equipe, métricas e evidências. Conteúdo de exemplo.",
  projectType: "professional",
  featured: false,
  visibility: "public",
  coverImage: null,
  period: { _type: "dateRange", startDate: "2024-01", endDate: "2024-06" },
  contribution: {
    _type: "projectContribution",
    authorship: "team",
    teamContext: "Squad de 4 pessoas",
    roles: ["Backend", "QA / Testes"],
    responsibilities: [
      "Modelagem de dados e endpoints.",
      "Cobertura de testes e homologação.",
    ],
    summary: LOREM,
  },
  technologies: [
    {
      _id: "tp",
      name: "Python",
      slug: "python",
      category: "Linguagem",
      icon: null,
    },
    {
      _id: "tpg",
      name: "PostgreSQL",
      slug: "postgresql",
      category: "Banco de dados",
      icon: null,
    },
    {
      _id: "tr",
      name: "Redis",
      slug: "redis",
      category: "Serviço",
      icon: null,
    },
  ],
  context: LOREM,
  problem: LOREM,
  publishedAt: "2024-06-01T00:00:00Z",
  skills: [
    {
      _id: "sb",
      name: "Backend Development",
      slug: "backend-development",
      category: "Desenvolvimento",
    },
    {
      _id: "sq",
      name: "Quality Assurance",
      slug: "quality-assurance",
      category: "Qualidade",
    },
  ],
  relatedExperience: null,
  relatedEducation: null,
  links: [
    {
      _type: "externalLink",
      _key: "pl1",
      label: "Repositório",
      url: "https://example.com/repo",
    },
  ],
  evidence: [
    {
      _type: "evidence",
      _key: "e1",
      type: "github",
      label: "Código no GitHub",
      url: "https://example.com/repo",
      description: LOREM,
    },
    {
      _type: "evidence",
      _key: "e2",
      type: "document",
      label: "Notas de homologação",
      description: LOREM,
    },
  ],
  metrics: [
    {
      _type: "metric",
      _key: "pm1",
      label: "Redução de tempo",
      before: "30 dias",
      after: "10 horas",
    },
  ],
  contentBlocks: richBlocks,
  confidentialityNotice: null,
  seo: null,
};

export const sparseProjectFixture: ProjectDetail = {
  _id: "fixture-sparse",
  title: "Projeto de homologação (enxuto)",
  slug: "fixture-sparse",
  shortDescription: "Só título, descrição, tipo e algumas tecnologias.",
  projectType: "lab",
  featured: false,
  visibility: "public",
  coverImage: null,
  period: null,
  contribution: null,
  technologies: [
    {
      _id: "tp",
      name: "Python",
      slug: "python",
      category: "Linguagem",
      icon: null,
    },
  ],
  context: null,
  problem: null,
  publishedAt: null,
  skills: [],
  relatedExperience: null,
  relatedEducation: null,
  links: [],
  evidence: [],
  metrics: [],
  contentBlocks: [],
  confidentialityNotice: null,
  seo: null,
};
