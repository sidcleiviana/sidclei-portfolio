import { defineField, defineType } from "sanity";

export const LEARNING_STATUS = [
  { title: "Planejado", value: "planned" },
  { title: "Estudando", value: "studying" },
  { title: "Concluído", value: "completed" },
  { title: "Pausado", value: "paused" },
] as const;

/**
 * Continuous learning. Feeds a future "Agora estou estudando" surface — not
 * built in this Sprint (Sprint §17).
 */
export const learningItem = defineType({
  name: "learningItem",
  title: "Aprendizado",
  type: "document",
  fields: [
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
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [...LEARNING_STATUS], layout: "radio" },
      initialValue: "planned",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "startedAt", title: "Iniciado em", type: "date" }),
    defineField({ name: "completedAt", title: "Concluído em", type: "date" }),
    defineField({
      name: "topics",
      title: "Tópicos",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "skills",
      title: "Competências relacionadas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "externalLink" }],
    }),
  ],
  preview: {
    select: { title: "title", status: "status" },
    prepare({ title, status }) {
      const label =
        LEARNING_STATUS.find((s) => s.value === status)?.title ?? status;
      return { title, subtitle: label };
    },
  },
});
