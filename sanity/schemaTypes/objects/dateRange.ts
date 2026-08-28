import { defineField, defineType } from "sanity";

/**
 * Reusable start/end period. `ongoing` makes `endDate` irrelevant and lets the
 * UI render "2023 — atual".
 */
export const dateRange = defineType({
  name: "dateRange",
  title: "Período",
  type: "object",
  fields: [
    defineField({
      name: "startDate",
      title: "Início",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Fim",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
      hidden: ({ parent }) => Boolean(parent?.ongoing),
    }),
    defineField({
      name: "ongoing",
      title: "Em andamento",
      type: "boolean",
      initialValue: false,
    }),
  ],
  validation: (rule) =>
    rule.custom((raw) => {
      const value = raw as
        { startDate?: string; endDate?: string; ongoing?: boolean } | undefined;
      if (!value?.startDate || value.ongoing || !value.endDate) return true;
      return new Date(value.endDate) >= new Date(value.startDate)
        ? true
        : "A data de fim não pode ser anterior à data de início.";
    }),
});
