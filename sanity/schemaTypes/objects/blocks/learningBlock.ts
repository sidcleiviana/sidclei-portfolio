import { defineArrayMember, defineField, defineType } from "sanity";

export const learningBlock = defineType({
  name: "learningBlock",
  title: "Aprendizados",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Título da seção",
      type: "string",
      initialValue: "Aprendizados",
    }),
    defineField({
      name: "body",
      title: "Texto",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Parágrafo", value: "normal" }],
        }),
      ],
    }),
    defineField({
      name: "takeaways",
      title: "Pontos-chave",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { heading: "heading", takeaways: "takeaways" },
    prepare({ heading, takeaways }) {
      const count = Array.isArray(takeaways) ? takeaways.length : 0;
      return {
        title: heading || "Aprendizados",
        subtitle: count ? `${count} pontos-chave` : undefined,
      };
    },
  },
});
