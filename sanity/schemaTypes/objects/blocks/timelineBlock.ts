import { defineArrayMember, defineField, defineType } from "sanity";

export const timelineBlock = defineType({
  name: "timelineBlock",
  title: "Linha do tempo",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título da seção", type: "string" }),
    defineField({
      name: "entries",
      title: "Marcos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "timelineEntry",
          fields: [
            defineField({
              name: "date",
              title: "Data / rótulo",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "date" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: { heading: "heading", entries: "entries" },
    prepare({ heading, entries }) {
      const count = Array.isArray(entries) ? entries.length : 0;
      return {
        title: heading || "Linha do tempo",
        subtitle: `${count} marcos`,
      };
    },
  },
});
