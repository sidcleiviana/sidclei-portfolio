import { defineField, defineType } from "sanity";

export const AUTHORSHIP = [
  { title: "Individual — construí sozinho", value: "individual" },
  { title: "Equipe — participei do time", value: "team" },
  { title: "Participação em projeto maior", value: "participation" },
] as const;

/**
 * Describes *Sidclei's* role in a project without implying he owned the whole
 * product. This is a hard requirement (Sprint §11, §44, §56): the UI must be
 * able to say "Minha contribuição: Backend, QA" for a team-built product.
 */
export const projectContribution = defineType({
  name: "projectContribution",
  title: "Contribuição",
  type: "object",
  fields: [
    defineField({
      name: "authorship",
      title: "Autoria",
      type: "string",
      options: { list: [...AUTHORSHIP], layout: "radio" },
      initialValue: "individual",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teamContext",
      title: "Contexto do time",
      type: "string",
      description:
        'Ex.: "Projeto em equipe", "Squad de 4 pessoas". Aparece como contexto público.',
      hidden: ({ parent }) => parent?.authorship === "individual",
    }),
    defineField({
      name: "roles",
      title: "Papéis / áreas de atuação",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          "Backend",
          "Frontend",
          "Full Stack",
          "Dados",
          "Automação",
          "QA / Testes",
          "Infraestrutura",
          "Integrações",
          "Arquitetura",
          "Análise",
          "Product",
        ],
      },
      validation: (rule) => rule.min(1).error("Informe ao menos um papel."),
    }),
    defineField({
      name: "responsibilities",
      title: "Responsabilidades",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "summary",
      title: "Resumo da contribuição",
      type: "text",
      rows: 3,
      description: "O que exatamente você fez. Sem exagerar escopo.",
    }),
  ],
  preview: {
    select: { authorship: "authorship", roles: "roles" },
    prepare({ authorship, roles }) {
      const map: Record<string, string> = {
        individual: "Individual",
        team: "Equipe",
        participation: "Participação",
      };
      const list: string[] = Array.isArray(roles) ? roles : [];
      return {
        title: map[authorship as string] ?? "Contribuição",
        subtitle: list.join(" · "),
      };
    },
  },
});
