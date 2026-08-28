import { defineField, defineType } from "sanity";

export const LINK_KINDS = [
  { title: "Website", value: "website" },
  { title: "GitHub", value: "github" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Demo", value: "demo" },
  { title: "Documento", value: "document" },
  { title: "Artigo", value: "article" },
  { title: "Outro", value: "other" },
] as const;

/**
 * A labelled external URL. Used by Profile, Project and blocks.
 */
export const externalLink = defineType({
  name: "externalLink",
  title: "Link externo",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Rótulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https", "mailto"] }),
    }),
    defineField({
      name: "kind",
      title: "Tipo",
      type: "string",
      options: { list: [...LINK_KINDS], layout: "dropdown" },
      initialValue: "website",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
