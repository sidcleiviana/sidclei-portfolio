import { defineField, defineType } from "sanity";

export const EVIDENCE_TYPES = [
  { title: "GitHub", value: "github" },
  { title: "Demo", value: "demo" },
  { title: "Vídeo", value: "video" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Documento", value: "document" },
  { title: "Apresentação", value: "presentation" },
  { title: "Artigo", value: "article" },
  { title: "Certificado", value: "certificate" },
  { title: "Outro", value: "other" },
] as const;

/**
 * Concrete proof attached to a project — the backbone of the
 * "competência → projeto → evidência" principle (CLAUDE.md §4, §18).
 */
export const evidence = defineType({
  name: "evidence",
  title: "Evidência",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      options: { list: [...EVIDENCE_TYPES], layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Rótulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "type" },
  },
});
