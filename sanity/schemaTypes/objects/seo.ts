import { defineField, defineType } from "sanity";

/**
 * Optional per-document SEO overrides. The frontend falls back to
 * title / shortDescription / coverImage when these are empty (Sprint §37).
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Título (meta)",
      type: "string",
      validation: (rule) =>
        rule.max(70).warning("Títulos acima de ~70 caracteres são truncados."),
    }),
    defineField({
      name: "description",
      title: "Descrição (meta)",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .max(180)
          .warning("Descrições acima de ~160 caracteres são truncadas."),
    }),
    defineField({
      name: "ogImage",
      title: "Imagem Open Graph",
      type: "imageWithAlt",
    }),
    defineField({
      name: "noIndex",
      title: "Não indexar",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
