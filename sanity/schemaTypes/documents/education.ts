import { defineField, defineType } from "sanity";

export const DEGREE_TYPES = [
  "Técnico",
  "Graduação",
  "Tecnólogo",
  "Pós-graduação",
  "Especialização",
  "MBA",
  "Mestrado",
  "Doutorado",
] as const;

/** Formal academic education only. Certifications live in their own schema (§15). */
export const education = defineType({
  name: "education",
  title: "Formação acadêmica",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Instituição",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "course",
      title: "Curso",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "degreeType",
      title: "Tipo",
      type: "string",
      options: { list: [...DEGREE_TYPES] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Período",
      type: "dateRange",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "skills",
      title: "Competências relacionadas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
  ],
  preview: {
    select: { title: "course", subtitle: "institution", degree: "degreeType" },
    prepare({ title, subtitle, degree }) {
      return {
        title,
        subtitle: [degree, subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
