# ADR-001 — CMS headless (Sanity)

- **Status:** aceito
- **Data:** 2026-08-27
- **Sprint:** 0

## Contexto

O portfólio precisa ser expansível por anos: Sidclei deve publicar o 50º projeto
sem abrir o editor de código, editar arrays, criar rotas ou fazer deploy
(CLAUDE.md §8, §29; Sprint §1). O conteúdo é relacional (project ⇄ skill ⇄
technology ⇄ experience …) e alguns projetos são muito mais ricos que outros,
exigindo composição por blocos modulares.

## Decisão

Adotar **Sanity v3** como backend de conteúdo, com o **Studio embutido** na
própria aplicação Next.js em `/studio` (`next-sanity` + GROQ).

## Alternativas consideradas

| Opção                     | Por que não                                                                 |
| ------------------------- | ------------------------------------------------------------------------- |
| Arrays/MDX no repositório | Viola o requisito central: cada projeto exigiria commit + deploy.          |
| Contentlayer / MDX + Git CMS | Ainda acopla publicação a Git; blocos modulares e relações ficam frágeis. |
| Strapi / Directus (self-hosted) | Infra para manter (banco, hospedagem) — overengineering para um portfólio (CLAUDE.md §28). |
| Contentful                | Modelo de blocos e referências ok, mas tier gratuito mais restrito e DX de tipos inferior ao Sanity para este caso. |

## Consequências

- **+** Studio versionado junto ao código; schema em TypeScript; referências
  nativas; Portable Text para blocos; imagens via CDN com transformações.
- **+** Sem infra própria: Sanity hospeda o dataset; Vercel hospeda o front.
- **−** Dependência de SaaS para o conteúdo (mitigado: export/backup do dataset
  é trivial via CLI do Sanity).
- **−** Peso do bundle do Studio (~1.6 MB) na rota `/studio` — isolado, não
  afeta as páginas públicas.
- O site continua compilando e rodando sem projeto Sanity configurado
  (estado vazio + aviso no Studio), o que mantém o CI e o onboarding simples.
