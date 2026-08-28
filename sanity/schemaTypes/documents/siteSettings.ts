import { defineField, defineType } from "sanity";

/**
 * Singleton. Global, non-personal site configuration.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuração do site",
  type: "document",
  groups: [{ name: "general", title: "Geral", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Título do site",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição padrão (meta)",
      type: "text",
      rows: 3,
      group: "general",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Imagem Open Graph padrão",
      type: "imageWithAlt",
      group: "general",
    }),
    defineField({
      name: "primaryNav",
      title: "Navegação principal",
      type: "array",
      of: [{ type: "externalLink" }],
      group: "general",
    }),
    defineField({
      name: "footerNote",
      title: "Rodapé",
      type: "string",
      group: "general",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuração do site" }),
  },
});
