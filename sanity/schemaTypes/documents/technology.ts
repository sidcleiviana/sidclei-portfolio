import { defineField, defineType } from "sanity";

export const TECHNOLOGY_CATEGORIES = [
  "Linguagem",
  "Framework",
  "Biblioteca",
  "Banco de dados",
  "Plataforma",
  "Ferramenta",
  "Serviço",
  "Sistema / ERP",
] as const;

/**
 * A concrete tool, language, platform or product. Distinct from `skill`:
 * Skill "Backend Development" ↔ Technology "Python" (Sprint §13).
 */
export const technology = defineType({
  name: "technology",
  title: "Tecnologia",
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
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: [...TECHNOLOGY_CATEGORIES] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ícone / logo",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "officialUrl",
      title: "Site oficial",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "icon" },
  },
});
