import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * "Por que Oracle foi mantido read-only?" — decisions demonstrate engineering
 * better than a framework list (CLAUDE.md §38).
 */
export const technicalDecisionsBlock = defineType({
  name: "technicalDecisionsBlock",
  title: "Decisões técnicas",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Título da seção",
      type: "string",
      initialValue: "Decisões técnicas",
    }),
    defineField({
      name: "decisions",
      title: "Decisões",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "technicalDecision",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta / decisão",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "rationale",
              title: "Justificativa",
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
          preview: { select: { title: "question" } },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: { heading: "heading", decisions: "decisions" },
    prepare({ heading, decisions }) {
      const count = Array.isArray(decisions) ? decisions.length : 0;
      return {
        title: heading || "Decisões técnicas",
        subtitle: `${count} decisões`,
      };
    },
  },
});
