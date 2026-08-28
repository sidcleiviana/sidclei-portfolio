import type { StructureResolver } from "sanity/structure";

/**
 * Editorial navigation for the Studio (Sprint §30). Grouped, not a flat dump.
 * Profile and Site Settings are rendered as singletons.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Perfil")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),

      S.divider(),

      S.listItem()
        .title("Projetos")
        .schemaType("project")
        .child(S.documentTypeList("project").title("Projetos")),

      S.divider(),

      S.listItem()
        .title("Conhecimento")
        .child(
          S.list()
            .title("Conhecimento")
            .items([
              S.listItem()
                .title("Competências")
                .schemaType("skill")
                .child(S.documentTypeList("skill").title("Competências")),
              S.listItem()
                .title("Tecnologias")
                .schemaType("technology")
                .child(S.documentTypeList("technology").title("Tecnologias")),
            ])
        ),

      S.listItem()
        .title("Carreira")
        .child(
          S.list()
            .title("Carreira")
            .items([
              S.listItem()
                .title("Experiências")
                .schemaType("experience")
                .child(S.documentTypeList("experience").title("Experiências")),
            ])
        ),

      S.listItem()
        .title("Formação")
        .child(
          S.list()
            .title("Formação")
            .items([
              S.listItem()
                .title("Formação acadêmica")
                .schemaType("education")
                .child(
                  S.documentTypeList("education").title("Formação acadêmica")
                ),
              S.listItem()
                .title("Certificações")
                .schemaType("certification")
                .child(
                  S.documentTypeList("certification").title("Certificações")
                ),
              S.listItem()
                .title("Aprendizado contínuo")
                .schemaType("learningItem")
                .child(
                  S.documentTypeList("learningItem").title(
                    "Aprendizado contínuo"
                  )
                ),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Configuração do site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);

/** Document types handled as singletons above — hidden from the "new document" menu. */
export const singletonTypes = new Set(["profile", "siteSettings"]);
