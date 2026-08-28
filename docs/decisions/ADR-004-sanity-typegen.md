# ADR-004 — Adoção do Sanity TypeGen

- **Status:** aceito
- **Data:** 2026-08-27
- **Sprint:** 0.1
- **Revisa:** ADR-002 (que mantinha tipos de resultado escritos à mão)

## Contexto

Na Sprint 0 os contratos de resultado das queries (`ProjectListItem`,
`ProjectDetail`, `Profile`, `SiteSettings`, blocos, etc.) foram escritos à mão
em `src/sanity/types.ts`, com a ressalva de que poderiam ser substituídos por
geração automática "sem tocar nos componentes".

O modelo de conteúdo é grande (39 tipos de schema) e vai evoluir. Manter os
tipos à mão significa **schema drift**: uma mudança no schema ou numa projeção
GROQ não quebra o build até alguém perceber.

O `sanity` CLI (v3.99) já traz `sanity schema extract` + `sanity typegen
generate`, compatível com a stack atual, sem dependências novas.

## Decisão

Adotar **Sanity TypeGen** como fonte de verdade dos contratos de conteúdo.

Fluxo: **schema Sanity + queries GROQ → `pnpm typegen` → `src/sanity/sanity.types.ts`**.

- Queries passaram a usar `defineQuery(...)` (de `next-sanity`) para que o
  TypeGen as reconheça. Cada query é um literal auto-contido (o filtro público
  fica inline em todas).
- `src/sanity/types.ts` deixa de definir shapes: vira um **adaptador** que
  deriva nomes amigáveis dos tipos gerados
  (`ProjectListItem = NonNullable<ProjectsListQueryResult[number]>`, blocos via
  `Extract<ContentBlock, { _type: "..." }>`, etc.). Continua sendo o único
  ponto de import da aplicação — nenhum componente mudou de import.
- As **duas únicas** exceções escritas à mão são helpers estruturais que não
  são entidades de schema: `PortableText` (input de render) e `SanityImage`
  (shape permissivo aceito por `@sanity/image-url`).
- As funções de `src/domain/` passaram a aceitar **subconjuntos estruturais**
  (`{ startDate?: string | null; ... }`) em vez dos tipos com `_type`, para não
  acoplar regra de negócio ao formato do CMS.
- `overloadClientMethods: false` — não usamos `client.fetch` com os literais
  diretamente (tudo passa por `sanityFetch`), e a augmentação de
  `@sanity/client` exigia o pacote como dependência direta.

### Comandos

```
pnpm typegen         # sanity schema extract && sanity typegen generate
pnpm typegen:check   # regenera e falha se houver diff (CI / pré-commit)
```

`src/sanity/sanity.types.ts` é **versionado** (instalação limpa já tem os
tipos). `schema.json` é intermediário e fica no `.gitignore`.

## Alternativas consideradas

| Opção | Por que não |
| --- | --- |
| Manter tipos à mão | Risco de drift num modelo grande e evolutivo — exatamente o que a Sprint 0.1 §5 pede para eliminar. |
| `@sanity/codegen` / plugins de terceiros | O TypeGen oficial já cobre o caso e é mantido pelo ecossistema. |
| Gerar em `prebuild`/`pretypecheck` | Roda o contexto do Studio a cada build; mais lento e mais frágil no CI. Preferimos arquivo versionado + `typegen:check`. |
| `sanity typegen` com `overloadClientMethods: true` | Exigiria `@sanity/client` como dep direta; sem ganho, já que usamos `sanityFetch`. |

## Consequências

- **+** Mudou o schema/projeção e esqueceu de regenerar? `pnpm typecheck` ou
  `pnpm typegen:check` acusa.
- **+** Nullability real das projeções refletida no código (forçou tratar
  `string | null` em títulos/slugs — mais honesto).
- **+** Uma fonte de verdade. `types.ts` é só adaptação.
- **−** Fixtures de teste precisam espelhar o shape gerado (ex.: incluir
  `_type` nos objetos, `icon: null`).
- **−** `pnpm typegen` precisa rodar após mudanças de schema/queries; mitigado
  por `typegen:check` e pelo arquivo versionado.
- **−** Editar `sanity.types.ts` à mão é inútil (é sobrescrito) — deixado
  explícito no cabeçalho gerado e em `types.ts`.
