# ADR-003 — Estratégia de atualização de conteúdo

- **Status:** aceito
- **Data:** 2026-08-27
- **Sprint:** 0

## Contexto

Publicar no CMS precisa refletir no site **sem** editar código, commitar, dar
push ou disparar um deploy manual (Sprint §33). Precisa ser robusto (não expor
endpoint público sem autenticação) e simples (sem fila, sem serviço extra —
§28).

## Decisão

**ISR com revalidação on-demand por _cache tags_, acionada por webhook assinado
do Sanity.**

- Toda leitura passa por `sanityFetch` (`src/sanity/fetch.ts`), que anexa
  `next: { revalidate: 60, tags: [...] }`.
- Tags: `projects`, `project:<slug>`, `profile`, `siteSettings`
  (`CACHE_TAGS`).
- `POST /api/revalidate` (`src/app/api/revalidate/route.ts`):
  1. valida a assinatura HMAC com `parseBody(req, SANITY_REVALIDATE_SECRET)`;
  2. lê `_type` e `slug` do payload;
  3. mapeia para tags e chama `revalidateTag`.
- Sem `SANITY_REVALIDATE_SECRET`, o endpoint responde **503** (nunca revalida
  a partir de request não autenticado).
- Rotas de projeto são dinâmicas com `generateStaticParams` (slugs do CMS) +
  `dynamicParams` on → projeto novo ganha `/projects/<slug>` sob demanda, sem
  build.

### Configuração do webhook no Sanity

_API → Webhooks_: `POST https://SEU_DOMINIO/api/revalidate`, secret =
`SANITY_REVALIDATE_SECRET`, projection `{ "_type": _type, "slug": slug.current }`,
disparo em create/update/delete.

## Alternativas consideradas

| Opção                              | Por que não (agora)                                                      |
| ---------------------------------- | --------------------------------------------------------------------- |
| `revalidatePath` em vez de tags    | Menos preciso; teria que enumerar caminhos. Tags mapeiam melhor o domínio. |
| Só ISR por tempo (sem webhook)     | Mantido como _fallback_ (60s), mas sozinho dá atraso perceptível ao publicar. |
| SSR puro (`no-store`)              | Perde cache/CDN, pior Core Web Vitals (§25) sem ganho real.            |
| Rebuild/deploy via _deploy hook_   | Lento, "deploy manual específico para aquele projeto" — proibido (§33). |
| `next-sanity` Live Content API     | Ótimo para preview em tempo real; adiciona complexidade não necessária no MVP. Pode entrar numa Sprint futura para o modo _draft_. |

## Consequências

- **+** Publicou → site atualizado em segundos, sem tocar no código.
- **+** Endpoint seguro por assinatura; degrada para 503 sem segredo.
- **+** Páginas públicas continuam estáticas/CDN entre publicações.
- **−** Depende de configurar o webhook no painel do Sanity (documentado no
  README). Sem ele, cai no TTL de 60s.
- **−** `revalidateTag` é global ao deployment; múltiplos ambientes precisam de
  webhooks separados (um por URL).
