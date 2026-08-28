# Modelo de conteúdo

Todas as entidades vivem no Sanity (`sanity/schemaTypes/`). Relações usam
**referências reais** do Sanity, nunca strings duplicadas.

## Entidades (documents)

| Documento        | Papel                                                                 | Singleton |
| ---------------- | -------------------------------------------------------------------- | --------- |
| `siteSettings`   | Configuração global não-pessoal (título, meta padrão, nav, rodapé).  | sim       |
| `profile`        | Sidclei profissionalmente: nome, headline, resumo, apresentação, foto, e-mail profissional, currículo (URL), links. Sem telefone/dados sensíveis. | sim |
| `project`        | Entidade central. Ver abaixo.                                        | não       |
| `skill`          | Competência / área de conhecimento. **Sem percentual de proficiência.** | não     |
| `technology`     | Ferramenta, linguagem, plataforma ou produto concreto.               | não       |
| `experience`     | Experiência profissional (empresa, função, período, responsabilidades, skills, tecnologias). | não |
| `education`      | Formação **acadêmica** formal.                                       | não       |
| `certification`  | Certificações e cursos com credencial.                               | não       |
| `learningItem`   | Aprendizado contínuo (`planned` / `studying` / `completed` / `paused`). | não     |

### Skill × Technology

Semanticamente distintos (CLAUDE.md §5, §13):

- **Skill** = _o que sei fazer_ → "Backend Development", "Automação", "QA".
- **Technology** = _com o quê_ → "Python", "Oracle", "Power BI".

Um projeto referencia ambos. "Backend Development" (skill) ⇄ "Python" (technology)
convivem sem duplicação.

## Objetos reutilizáveis

| Objeto                | Onde                                   | Notas                                                                 |
| --------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| `dateRange`           | project, experience, education         | `startDate` + `endDate` + `ongoing`. Valida fim ≥ início.           |
| `imageWithAlt`        | em todo lugar                          | `alt` obrigatório (acessibilidade) + `caption`. Hotspot/crop on.    |
| `externalLink`        | profile, project, blocks               | `label` + `url` + `kind`.                                           |
| `evidence`            | project                                | `type` + `label` + `url` + `description`. Base do princípio _competência → projeto → evidência_. |
| `metric`              | project, `metricGridBlock`             | `label` + (`value`+`unit`) **ou** (`before`+`after`). Nada obrigatório além do label. Nunca inventar. |
| `projectContribution` | project                                | Ver abaixo.                                                        |
| `seo`                 | project                                | Overrides opcionais; frontend faz fallback para title / shortDescription / coverImage. |

## `project` — campos

**Overview:** `title`, `slug` (único, editável, nunca o `_id`), `shortDescription`
(20–280), `coverImage`, `projectType`, `status`, `featured`, `period`,
`publishedAt` (ordenação).

**Contexto & contribuição:** `context`, `problem`, `contribution`.

**Relações:** `skills[]→skill`, `technologies[]→technology`,
`relatedExperience→experience`, `relatedEducation→education`.

**Evidências & métricas:** `links[]`, `evidence[]`, `metrics[]`.

**Conteúdo modular:** `contentBlocks[]` (ver seção própria).

**Confidencialidade:** `visibility` (`public` / `anonymized` / `private`),
`confidentialityNotice`.

**SEO:** `seo`.

Nenhum campo além de `title`, `slug`, `shortDescription`, `projectType`,
`status`, `visibility` é obrigatório → um projeto simples (título + descrição +
uma tecnologia) é válido; um projeto complexo usa todo o resto **sem página
dedicada**.

### `projectType` (natureza)

Valores internos estáveis em inglês; labels públicas em português
(`src/domain/projectType.ts`):

| valor          | label       | significado                                          |
| -------------- | ----------- | -------------------------------------------------- |
| `production`   | Produção    | software efetivamente usado em ambiente real        |
| `professional` | Profissional| projeto dentro de contexto profissional             |
| `lab`          | Lab         | experimento técnico                                 |
| `study`        | Estudo      | pesquisa / implementação para aprendizado           |

### `contribution` (projectContribution)

Descreve o papel **de Sidclei**, sem implicar que ele fez o produto inteiro
(CLAUDE.md §11, §44, §56).

- `authorship`: `individual` | `team` | `participation`
- `teamContext`: texto livre ("Projeto em equipe")
- `roles[]`: ex. `Backend`, `QA / Testes`
- `responsibilities[]`, `summary`

A UI renderiza **"Minha contribuição: Backend, QA"** — nunca "eu desenvolvi
sozinho". Ex.: o futuro case "Chatbot com IA (WhatsApp, Instagram)" — projeto em
equipe, contribuição em Backend e QA — é representável sem alterar código.

### Confidencialidade

| `visibility` | Comportamento                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `public`     | renderizado normalmente                                                   |
| `anonymized` | renderizado usando **apenas** o conteúdo cadastrado; exibe `confidentialityNotice` |
| `private`    | **nunca** renderizado: excluído nas queries GROQ e barrado por `isPubliclyVisible()` |

Validação no schema impede `private` + `featured` e `private` + `status: published`.

## Content blocks (`contentBlocks[]`)

Blocos semânticos, não primitivos de layout (sem row/column/spacer — CLAUDE.md
§23). O CMS controla conteúdo e semântica; o frontend controla apresentação.

| `_type`                   | Renderer                                    | Implementado na Sprint 0 |
| ------------------------- | ------------------------------------------- | ------------------------- |
| `richTextBlock`           | `blocks/TextBlocks#RichText`                | ✅                        |
| `imageBlock`              | `blocks/TextBlocks#Image`                   | ✅                        |
| `galleryBlock`            | `blocks/MediaBlocks#Gallery`               | ✅                        |
| `videoBlock`              | `blocks/MediaBlocks#Video`                 | ✅ (embed YT/Vimeo ou `<video>`, sem autoplay) |
| `metricGridBlock`         | `blocks/StructuredBlocks#MetricGrid`       | ✅                        |
| `beforeAfterBlock`        | `blocks/StructuredBlocks#BeforeAfter`      | ✅                        |
| `architectureBlock`       | `blocks/TextBlocks#Architecture`           | ✅                        |
| `timelineBlock`           | `blocks/StructuredBlocks#Timeline`         | ✅                        |
| `technicalDecisionsBlock` | `blocks/StructuredBlocks#TechnicalDecisions` | ✅                     |
| `learningBlock`           | `blocks/TextBlocks#Learning`               | ✅                        |
| `calloutBlock`            | `blocks/TextBlocks#Callout`                | ✅                        |
| `linksBlock`              | `blocks/TextBlocks#Links`                  | ✅                        |

**Adicionar um bloco novo** (Sprint futura): criar o schema em
`sanity/schemaTypes/objects/blocks/`, incluir em `projectBlockTypes`, adicionar a
interface ao union `KnownContentBlock` e uma linha no `REGISTRY`. O schema
`project` e a página `/projects/[slug]` **não mudam**. Remover um bloco de um
documento não exige mudança alguma. Bloco sem renderer nunca quebra a página
(em dev aparece um aviso para o desenvolvedor; em produção, nada).

## Relações inversas (derivadas, não duplicadas)

A direção canônica é `project.relatedExperience`. "Projetos desta experiência",
"projetos que usam Python", "certificações relacionadas a uma skill" etc. serão
**derivados por GROQ** a partir das referências existentes — sem um segundo
conjunto de dados. É também o que alimentará o futuro Knowledge Graph.
