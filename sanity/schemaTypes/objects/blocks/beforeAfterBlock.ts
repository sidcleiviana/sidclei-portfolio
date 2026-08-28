import { defineField, defineType } from "sanity";

const side = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "label", title: "Rótulo", type: "string" }),
      defineField({
        name: "description",
        title: "Descrição",
        type: "text",
        rows: 3,
      }),
      defineField({ name: "image", title: "Imagem", type: "imageWithAlt" }),
    ],
  });

export const beforeAfterBlock = defineType({
  name: "beforeAfterBlock",
  title: "Antes / Depois",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título da seção", type: "string" }),
    side("before", "Antes"),
    side("after", "Depois"),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "Antes / Depois" };
    },
  },
});
