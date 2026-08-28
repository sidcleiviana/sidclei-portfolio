import { defineField, defineType } from "sanity";

/**
 * A real, measurable outcome. Nothing here is required beyond a label so a
 * project can carry a single `value + unit` OR a `before → after` pair
 * (CLAUDE.md §21, Sprint §19). Metrics must never be invented.
 */
export const metric = defineType({
  name: "metric",
  title: "Métrica",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Rótulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "value", title: "Valor", type: "string" }),
    defineField({ name: "unit", title: "Unidade", type: "string" }),
    defineField({ name: "before", title: "Antes", type: "string" }),
    defineField({ name: "after", title: "Depois", type: "string" }),
    defineField({
      name: "description",
      title: "Descrição / origem do número",
      type: "text",
      rows: 2,
    }),
  ],
  validation: (rule) =>
    rule.custom((raw) => {
      const value = raw as
        { value?: string; before?: string; after?: string } | undefined;
      if (!value) return true;
      const hasSingle = Boolean(value.value);
      const hasBeforeAfter = Boolean(value.before) || Boolean(value.after);
      return hasSingle || hasBeforeAfter
        ? true
        : "Informe um valor OU um par antes/depois.";
    }),
  preview: {
    select: {
      title: "label",
      value: "value",
      unit: "unit",
      before: "before",
      after: "after",
    },
    prepare({ title, value, unit, before, after }) {
      const subtitle =
        before || after
          ? `${before ?? "?"} → ${after ?? "?"}`
          : [value, unit].filter(Boolean).join(" ");
      return { title, subtitle };
    },
  },
});
