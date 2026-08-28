import { defineField, defineType } from "sanity";

export const SKILL_CATEGORIES = [
  "Desenvolvimento",
  "Dados",
  "Automação",
  "Infraestrutura",
  "Redes",
  "Cybersecurity",
  "Banco de Dados",
  "Inteligência Artificial",
  "Qualidade",
  "Integrações",
  "Gestão",
] as const;

/**
 * A competence / area of knowledge. NEVER carries a proficiency percentage
 * (CLAUDE.md §5, Sprint §12). Proof lives in related projects / experiences.
 */
export const skill = defineType({
  name: "skill",
  title: "Competência",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Descrição curta",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: [...SKILL_CATEGORIES] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Destaque",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
