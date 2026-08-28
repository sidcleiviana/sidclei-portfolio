import { defineField, defineType } from "sanity";

/**
 * Every image in the system carries alt text (accessibility requirement, see
 * CLAUDE.md §24 and §39) and an optional caption. Hotspot/crop enabled.
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagem",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      description:
        "Descreva a imagem para leitores de tela e quando ela não carregar.",
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .warning("Alt text é fortemente recomendado para acessibilidade."),
    }),
    defineField({
      name: "caption",
      title: "Legenda",
      type: "string",
    }),
  ],
});
