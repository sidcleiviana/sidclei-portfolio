import { defineField, defineType } from "sanity";

export const linksBlock = defineType({
  name: "linksBlock",
  title: "Links",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título da seção", type: "string" }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "externalLink" }],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: { heading: "heading", links: "links" },
    prepare({ heading, links }) {
      const count = Array.isArray(links) ? links.length : 0;
      return { title: heading || "Links", subtitle: `${count} links` };
    },
  },
});
