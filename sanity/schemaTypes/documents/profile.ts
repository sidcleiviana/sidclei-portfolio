import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton. Represents Sidclei professionally (CLAUDE.md §8 / Sprint §8).
 * No personal phone or sensitive data by design.
 */
export const profile = defineType({
  name: "profile",
  title: "Perfil",
  type: "document",
  groups: [
    { name: "identity", title: "Identidade", default: true },
    { name: "presentation", title: "Apresentação" },
    { name: "contact", title: "Contato & links" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'Ex.: "Desenvolvedor de Software".',
      group: "identity",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "shortSummary",
      title: "Resumo curto",
      type: "text",
      rows: 3,
      group: "identity",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "about",
      title: "Apresentação",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Parágrafo", value: "normal" }],
        }),
      ],
      group: "presentation",
    }),
    defineField({
      name: "publicLocation",
      title: "Localização pública",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "imageWithAlt",
      group: "identity",
    }),
    defineField({
      name: "professionalEmail",
      title: "E-mail profissional",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: "e-mail",
          invert: false,
        }),
    }),
    defineField({
      name: "resumeUrl",
      title: "Currículo (URL)",
      type: "url",
      group: "contact",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "links",
      title: "Links profissionais",
      type: "array",
      of: [{ type: "externalLink" }],
      group: "contact",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "headline", media: "photo" },
  },
});
