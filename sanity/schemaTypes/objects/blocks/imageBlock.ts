import { defineField, defineType } from "sanity";

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Imagem",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "wide",
      title: "Largura estendida",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { media: "image", title: "image.alt", subtitle: "image.caption" },
    prepare({ media, title, subtitle }) {
      return { media, title: title || "Imagem", subtitle };
    },
  },
});
