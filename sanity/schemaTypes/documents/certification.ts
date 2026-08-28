import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certificação",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Emissor",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issueDate",
      title: "Data de emissão",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
    }),
    defineField({
      name: "expiresAt",
      title: "Expira em",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
    }),
    defineField({
      name: "credentialUrl",
      title: "URL da credencial",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "credentialId",
      title: "ID da credencial",
      type: "string",
    }),
    defineField({
      name: "skills",
      title: "Competências",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "technologies",
      title: "Tecnologias",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "issuer" },
  },
});
