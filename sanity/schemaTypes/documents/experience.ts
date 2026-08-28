import { defineField, defineType } from "sanity";

/**
 * Professional experience. Projects are NOT referenced from here — the
 * canonical direction is `project.relatedExperience`, and the inverse
 * ("projects from this period") is derived by GROQ (Sprint §14, docs/content-model.md).
 */
export const experience = defineType({
  name: "experience",
  title: "Experiência",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Função",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Período",
      type: "dateRange",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", title: "Localização", type: "string" }),
    defineField({
      name: "summary",
      title: "Contexto / resumo",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "responsibilities",
      title: "Responsabilidades",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "skills",
      title: "Competências",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "technologies",
      title: "Tecnologias",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
  ],
  preview: {
    select: {
      title: "role",
      subtitle: "company",
      start: "period.startDate",
      ongoing: "period.ongoing",
      end: "period.endDate",
    },
    prepare({ title, subtitle, start, ongoing, end }) {
      const range = start
        ? `${String(start).slice(0, 4)} — ${ongoing ? "atual" : end ? String(end).slice(0, 4) : "?"}`
        : "";
      return { title, subtitle: [subtitle, range].filter(Boolean).join(" · ") };
    },
  },
});
