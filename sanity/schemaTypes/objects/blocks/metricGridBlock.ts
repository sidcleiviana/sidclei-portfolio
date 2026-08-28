import { defineField, defineType } from "sanity";

export const metricGridBlock = defineType({
  name: "metricGridBlock",
  title: "Grade de métricas",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título da seção", type: "string" }),
    defineField({
      name: "metrics",
      title: "Métricas",
      type: "array",
      of: [{ type: "metric" }],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: { heading: "heading", metrics: "metrics" },
    prepare({ heading, metrics }) {
      const count = Array.isArray(metrics) ? metrics.length : 0;
      return {
        title: heading || "Grade de métricas",
        subtitle: `${count} ${count === 1 ? "métrica" : "métricas"}`,
      };
    },
  },
});
