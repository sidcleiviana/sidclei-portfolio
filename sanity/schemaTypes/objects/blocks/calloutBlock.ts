import { defineArrayMember, defineField, defineType } from "sanity";

export const calloutBlock = defineType({
  name: "calloutBlock",
  title: "Destaque",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tom",
      type: "string",
      options: {
        list: [
          { title: "Informação", value: "info" },
          { title: "Sucesso", value: "success" },
          { title: "Atenção", value: "warning" },
          { title: "Nota", value: "note" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Parágrafo", value: "normal" }],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", tone: "tone" },
    prepare({ title, tone }) {
      return { title: title || "Destaque", subtitle: tone };
    },
  },
});
