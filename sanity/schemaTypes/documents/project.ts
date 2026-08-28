import { defineField, defineType } from "sanity";

import { contentBlockArrayMembers } from "../objects/blocks";

export const PROJECT_TYPES = [
  { title: "Produção", value: "production" },
  { title: "Profissional", value: "professional" },
  { title: "Lab", value: "lab" },
  { title: "Estudo / Pesquisa", value: "study" },
] as const;

export const PROJECT_VISIBILITY = [
  { title: "Público", value: "public" },
  { title: "Anonimizado", value: "anonymized" },
  { title: "Privado (não renderiza)", value: "private" },
] as const;

export const PROJECT_STATUS = [
  { title: "Rascunho", value: "draft" },
  { title: "Publicado", value: "published" },
] as const;

/**
 * The central entity (CLAUDE.md §6 / Sprint §9). Simple projects fill only
 * title + shortDescription + a technology; complex ones add contentBlocks,
 * metrics, evidence, contribution, etc. No field beyond title/slug/
 * shortDescription/type/visibility/status is required.
 */
export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  groups: [
    { name: "overview", title: "Visão geral", default: true },
    { name: "story", title: "Contexto & contribuição" },
    { name: "relations", title: "Relações" },
    { name: "proof", title: "Evidências & métricas" },
    { name: "content", title: "Conteúdo modular" },
    { name: "confidentiality", title: "Confidencialidade" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // -- overview -----------------------------------------------------------
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Descrição curta",
      type: "text",
      rows: 3,
      group: "overview",
      validation: (rule) => rule.required().min(20).max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "imageWithAlt",
      group: "overview",
    }),
    defineField({
      name: "projectType",
      title: "Natureza do projeto",
      type: "string",
      group: "overview",
      options: { list: [...PROJECT_TYPES], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status de publicação",
      type: "string",
      group: "overview",
      options: { list: [...PROJECT_STATUS], layout: "radio" },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Destaque na home",
      type: "boolean",
      group: "overview",
      initialValue: false,
    }),
    defineField({
      name: "period",
      title: "Período",
      type: "dateRange",
      group: "overview",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação (ordenação)",
      type: "datetime",
      group: "overview",
      initialValue: () => new Date().toISOString(),
    }),

    // -- story ------------------------------------------------------------
    defineField({
      name: "context",
      title: "Contexto",
      type: "text",
      rows: 4,
      group: "story",
    }),
    defineField({
      name: "problem",
      title: "Problema",
      type: "text",
      rows: 4,
      group: "story",
    }),
    defineField({
      name: "contribution",
      title: "Minha contribuição",
      type: "projectContribution",
      group: "story",
    }),

    // -- relations ------------------------------------------------------
    defineField({
      name: "skills",
      title: "Competências",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      group: "relations",
    }),
    defineField({
      name: "technologies",
      title: "Tecnologias",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
      group: "relations",
    }),
    defineField({
      name: "relatedExperience",
      title: "Experiência relacionada",
      type: "reference",
      to: [{ type: "experience" }],
      group: "relations",
    }),
    defineField({
      name: "relatedEducation",
      title: "Formação relacionada",
      type: "reference",
      to: [{ type: "education" }],
      group: "relations",
    }),

    // -- proof --------------------------------------------------------
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "externalLink" }],
      group: "proof",
    }),
    defineField({
      name: "evidence",
      title: "Evidências",
      type: "array",
      of: [{ type: "evidence" }],
      group: "proof",
    }),
    defineField({
      name: "metrics",
      title: "Métricas",
      type: "array",
      of: [{ type: "metric" }],
      group: "proof",
    }),

    // -- modular content -------------------------------------------------
    defineField({
      name: "contentBlocks",
      title: "Blocos de conteúdo",
      description:
        "A página do projeto é montada dinamicamente a partir destes blocos. Remover um bloco não exige alteração de código.",
      type: "array",
      of: contentBlockArrayMembers,
      group: "content",
    }),

    // -- confidentiality ----------------------------------------------
    defineField({
      name: "visibility",
      title: "Visibilidade",
      type: "string",
      group: "confidentiality",
      options: { list: [...PROJECT_VISIBILITY], layout: "radio" },
      initialValue: "public",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "confidentialityNotice",
      title: "Aviso de confidencialidade",
      type: "text",
      rows: 2,
      group: "confidentiality",
      description:
        "Exibido em projetos anonimizados. Use apenas informações aprovadas para divulgação.",
      hidden: ({ parent }) => parent?.visibility === "public",
    }),

    // -- seo ---------------------------------------------------------
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const doc = value as
        | { visibility?: string; featured?: boolean; status?: string }
        | undefined;
      if (doc?.visibility === "private" && doc?.featured) {
        return "Um projeto privado não pode ser marcado como destaque público.";
      }
      if (doc?.visibility === "private" && doc?.status === "published") {
        return 'Projetos privados devem permanecer como "Rascunho" — eles nunca são renderizados publicamente.';
      }
      return true;
    }),
  preview: {
    select: {
      title: "title",
      type: "projectType",
      visibility: "visibility",
      tech0: "technologies.0.name",
      media: "coverImage",
    },
    prepare({ title, type, visibility, tech0, media }) {
      const typeLabel =
        PROJECT_TYPES.find((t) => t.value === type)?.title ?? type ?? "Projeto";
      const parts = [typeLabel, tech0].filter(Boolean);
      if (visibility && visibility !== "public") parts.push(`(${visibility})`);
      return { title, subtitle: parts.join(" · "), media };
    },
  },
});
