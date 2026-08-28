import { defineArrayMember, defineField, defineType } from "sanity";

export const architectureBlock = defineType({
  name: "architectureBlock",
  title: "Arquitetura",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Título da seção",
      type: "string",
      initialValue: "Arquitetura",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Parágrafo", value: "normal" }],
        }),
      ],
    }),
    defineField({
      name: "diagram",
      title: "Diagrama",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: { heading: "heading", media: "diagram" },
    prepare({ heading, media }) {
      return { title: heading || "Arquitetura", media };
    },
  },
});
