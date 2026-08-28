# Arquitetura

> Fundação (Sprint 0) + homologação e type safety (Sprint 0.1). Descreve o que
> existe hoje e onde as próximas Sprints se encaixam. Não antecipa Design
> System, Knowledge Graph, busca ou IA.

## Visão geral

```
schema Sanity + queries GROQ ──(pnpm typegen)──►  src/sanity/sanity.types.ts (gerado)
        │                                                    │
Sanity CMS ──► conteúdo ──► Next.js (App Router)     src/sanity/types.ts (adapta os tipos gerados)
                              │                              │
                   src/sanity/queries (defineQuery)   regras de domínio (src/domain)
                              │
                    /  ·  /projects  ·  /projects/[slug]
```

- **Uma fonte de conteúdo**: Sanity. Não há arrays hardcoded de projetos.
- **Uma porta de leitura**: `src/sanity/fetch.ts` (`sanityFetch`). Todo acesso a
  conteúdo passa por ela — token só no servidor, cache tags, e _fallback_ que
  nunca lança exceção.
- **Renderização modular**: a página de projeto é montada a partir de
  `contentBlocks[]` via um _registry_ (`src/features/projects/blockRegistry.tsx`).

## Fluxo CMS → frontend

1. Editor publica no Studio (`/studio`).
2. Sanity dispara o webhook `POST /api/revalidate` (assinado com
   `SANITY_REVALIDATE_SECRET`).
3. O handler mapeia `_type`/`slug` para _cache tags_ e chama `revalidateTag`.
4. A próxima requisição re-renderiza a página com o conteúdo novo.
5. Rede de segurança: mesmo sem webhook, as queries usam `revalidate: 60`.

Detalhes e alternativas consideradas: `docs/decisions/ADR-003-content-revalidation.md`.

## Estratégia de publicação (sem código)

Rotas de projeto são **dinâmicas** (`/projects/[slug]`), com
`generateStaticParams` alimentado pelos slugs do CMS e `dynamicParams` (padrão
do App Router) habilitado. Um projeto novo publicado no Studio:

- entra em `/projects` na próxima revalidação da lista;
- ganha `/projects/<slug>` sob demanda na primeira visita, sem build.

Nenhum arquivo `.ts/.tsx/.json` precisa ser criado para um novo projeto.

## Infraestrutura de produção (Sprint 0.2)

```
GitHub  sidcleiviana/sidclei-portfolio (público, branch main)
   │  push
   ▼
Vercel  projeto "sidclei-portfolio" — Git Integration ligada
   │  build + deploy automático
   ▼
https://sidclei-portfolio.vercel.app   (alias de produção)
   ▲
   │ revalidateTag (ISR on-demand)
Sanity  webhook GROQ "Portfolio Revalidation" → POST /api/revalidate (HMAC)
```

- **Deploy de código:** `git push origin main` → Vercel cria o deployment. Não
  há GitHub Actions (a Git Integration da Vercel já cobre `push → deploy`).
- **Deploy de conteúdo:** publicar no Studio → webhook assinado →
  `/api/revalidate` → `revalidateTag`. Sem redeploy. Fallback: ISR 60s.
- **Dataset `production` é PRIVATE** (`aclMode: private`, Sprint 0.2.1). O
  Content Lake **nega** qualquer leitura anônima — a confidencialidade não
  depende só do filtro GROQ da aplicação. Toda leitura server-side é
  autenticada com `SANITY_API_READ_TOKEN` (role `viewer`, somente leitura,
  server-only). Imagens em `cdn.sanity.io` continuam públicas (URLs não
  adivinháveis) — nenhuma mudança necessária no pipeline de imagem.
- **Env vars na Vercel:** `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`,
  `NEXT_PUBLIC_SITE_URL` (Production/Preview/Development, Config);
  `SANITY_REVALIDATE_SECRET` (Production/Preview, **Secret**);
  `SANITY_API_READ_TOKEN` (Production/Preview/Development, **Secret**).
- **CORS Sanity:** `http://localhost:3000`, `http://localhost:3333`,
  `https://sidclei-portfolio.vercel.app` (com credentials). Sem wildcards.

## Segurança e confidencialidade

| Risco                                   | Mitigação                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Leitura anônima direta do Content Lake   | Dataset `production` é **PRIVATE**: consulta HTTP sem token → **401**. A confidencialidade não depende do código da aplicação. Verificado empiricamente (Sprint 0.2.1). |
| Token privado no browser                | `SANITY_API_READ_TOKEN` lido só em `src/sanity/env.ts` (sem `NEXT_PUBLIC_`), aplicado só no `client` server-side (`src/sanity/client.ts`). Scan do HTML/RSC/bundles confirma ausência. |
| Projeto privado renderizado             | **Três barreiras**: (0) dataset privado; (1) queries GROQ filtram `status == "published" && visibility != "private"`; (2) toda página passa o projeto por `isPubliclyVisible()` (`src/domain/visibility.ts`). Teste `tests/projectQueries.test.ts` trava o filtro. |
| Slug privado adivinhado                 | `getProjectBySlug` usa o mesmo filtro público → retorna `null` → `notFound()`. |
| Destaque acidental de projeto privado   | Validação no schema (`project.ts`) bloqueia `visibility: private` + `featured` e + `status: published`. |
| Webhook público não autenticado         | `parseBody` valida a assinatura HMAC: sem assinatura ou inválida → **401**; sem `SANITY_REVALIDATE_SECRET` → **503**. Verificado com assinatura real em `tests/revalidateWebhook.test.ts`. |
| Segredos versionados                    | `.env*` no `.gitignore` (inclui `.env.local`); `.env.example` sem valores; `projectId`/token só em `.env.local`. |
| Conteúdo anonimizado                    | `visibility: anonymized` renderiza só o que foi cadastrado + exibe `confidentialityNotice`. A responsabilidade de anonimizar é do editor; o sistema não inventa nada. |

## Organização do código

- `sanity/schemaTypes/` — schema do CMS. `documents/` (entidades),
  `objects/` (reutilizáveis), `objects/blocks/` (blocos modulares de projeto).
  `index.ts` agrega tudo; `structure.ts` define a navegação do Studio.
- `src/sanity/` — integração de leitura: `env`, `client`, `fetch` (`sanityFetch`
  + `CACHE_TAGS`), `revalidate.ts` (`tagsForWebhookPayload`, puro), `image`
  (pipeline do CDN), `queries/` (GROQ via `defineQuery`), `sanity.types.ts`
  (**gerado** pelo TypeGen — fonte de verdade), `types.ts` (adaptador que dá
  nomes amigáveis aos tipos gerados; sem shape próprio salvo `PortableText` e
  `SanityImage`).
- `src/domain/` — funções puras, sem dependência de Sanity nem de React:
  visibilidade, labels PT de `projectType`, formatação de período, contribuição.
  É onde os testes de regra vivem.
- `src/features/projects/` — UI de projeto: `ProjectCard`, `ProjectList`,
  `blockRegistry` + `blocks/*` (renderers), `MetricList`, `EvidenceList`.
- `src/components/` — `ui/` (Container), `layout/` (header, footer),
  `content/` (PortableText, SanityImage).
- `src/app/` — `(site)/` páginas públicas com layout próprio; `studio/` Studio
  embutido (client component isolado); `api/revalidate/` webhook.

## Type safety (Sprint 0.1)

- **Sanity TypeGen adotado** (ADR-004). `pnpm typegen` roda
  `sanity schema extract && sanity typegen generate` → `src/sanity/sanity.types.ts`
  (versionado). `pnpm typegen:check` regenera e falha se houver diff (CI).
- Queries usam `defineQuery(...)`; o filtro público está inline em cada uma.
- `src/domain/*` aceita subconjuntos estruturais (`{ startDate?: string | null }`),
  não os tipos com `_type` — regra de negócio desacoplada do formato do CMS.

## Limites deliberados

- Sem Design System final — só tokens em `src/styles/globals.css`.
- Sem animações, sem Knowledge Graph, sem busca, sem i18n, sem auth própria.
- `next lint` ainda em modo `.eslintrc` (deprecado no Next 16); migração para
  ESLint flat config fica para uma Sprint futura.
- Preview/draft em tempo real do Sanity (Live Content API) não implementado.
