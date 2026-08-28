# Homologação ponta a ponta

## Sprint 0.2 — status de produção (2026-08-28)

**Feito automaticamente:**

- [x] GitHub: `sidcleiviana/sidclei-portfolio` (público, `main`, histórico preservado).
- [x] Vercel: projeto `sidclei-portfolio`, Git Integration conectada, deploy de
      produção **verde** → <https://sidclei-portfolio.vercel.app>.
- [x] Env vars na Vercel (Production/Preview/Development). Secret como Secret.
- [x] Smoke tests de produção: `/` `/projects` `/projects/automacao-de-processos`
      → 200; slug inexistente → 404; `/robots.txt` `/sitemap.xml` `/studio` → 200;
      `sitemap.xml` já usa a URL de produção.
- [x] Confidencialidade em produção: doc `visibility: private` temporário criado
      via CLI → **não** aparece em `/`, `/projects`, `sitemap.xml`; slug → 404;
      sem vazamento de campos no HTML/RSC. Doc removido após o teste.
- [x] `/api/revalidate` em produção: sem assinatura → 401, assinatura inválida →
      401, `GET` → 405.
- [x] CORS Sanity: produção adicionada (`--credentials`), localhost preservado.

**Webhook + cadeia de revalidação — VALIDADO:**

- [x] Webhook GROQ **"Portfolio Revalidation"** criado no Sanity (passo manual —
      `sanity hook create` só abre o navegador; Management API não aceita
      webhooks GROQ via script). URL `…/api/revalidate`, dataset `production`,
      triggers create/update/delete, projection `{"_type": _type, "slug": slug.current}`,
      secret = `SANITY_REVALIDATE_SECRET`.
- [x] Publicação editorial no Studio (`shortDescription` de "Automação de
      processos": _"…melhorar…"_ → _"…otimizar…"_) → entrega do webhook
      **`success` / `200`** → novo valor servido em
      `https://sidclei-portfolio.vercel.app/projects/automacao-de-processos`
      (`<meta name="description">`), **sem `git push` e sem deploy** (nenhum
      deployment novo na Vercel).

## Se o dataset `production` for tornado privado

- [ ] Criar token **Viewer** e adicionar `SANITY_API_READ_TOKEN` (Secret) na
      Vercel (Production/Preview) e no `.env.local`. Sem isso, as queries
      server-side retornam vazio e as páginas mostram estado vazio.

---

## Sprint 0.1 — passos locais (contexto)

Estes exigem **login no Sanity** e/ou **deploy HTTPS**. A lógica testável
localmente já está coberta (`pnpm test`), incluindo a validação de assinatura
do webhook com HMAC real.

Marque cada item ao concluir.

## 0 · Pré-requisitos

- [ ] `.env.local` com `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
      `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`.
- [ ] `SANITY_API_READ_TOKEN` = token **Viewer** criado em
      `https://www.sanity.io/manage/project/<projectId>/api#tokens`.
- [ ] `SANITY_REVALIDATE_SECRET` = string aleatória longa.
- [ ] `git status` mostra `.env.local` **não** rastreado (é `.gitignore`).

## 1 · Dataset privado

- [ ] No painel, _Datasets_: o dataset usado está como **Private**.
- [ ] `curl "https://<projectId>.api.sanity.io/v2024-10-01/data/query/<dataset>?query=*%5B_type==%22project%22%5D"`
      **sem** token → `401`/vazio (confirma que não é público).
- [ ] Mesma query **com** header `Authorization: Bearer <token>` → responde.
- [ ] `grep -r "SANITY_API_READ_TOKEN" .next/static` → **nada** (token não vai ao browser).

## 2 · Studio real

- [ ] `pnpm dev` → `/studio` → login.
- [ ] Navegação editorial mostra os grupos: Perfil, Projetos, Conhecimento,
      Carreira, Formação, Configuração.
- [ ] Criar/editar/publicar um documento funciona; previews e validações
      aparecem (ex.: tentar `visibility: private` + destaque deve bloquear).

## 3 · Conteúdo mínimo de homologação

Cadastrar **somente dados aprovados**:

- [ ] Technology: **Python**
- [ ] Skill: **Backend Development**
- [ ] Skill: **Quality Assurance**
- [ ] Project (temporário ou o case real aprovado). Se usar o Chatbot, **apenas**:
  - Título: `Chatbot com Inteligência Artificial`
  - Contexto: `Projeto desenvolvido em equipe`
  - Contribuição → autoria: **Equipe**; papéis: **Backend**, **QA / Testes**
  - Canais WhatsApp/Instagram: representar num bloco `richText` ou `linksBlock`
    (**não** criar campo novo — a estrutura modular já cobre isso).
  - Nada de empresa, arquitetura, modelo de IA, APIs, métricas, datas, resultados.
- [ ] `status: published`, `visibility: public`.

## 4 · `/projects` (sem código)

- [ ] `pnpm dev` → `/projects` mostra o projeto: título, descrição, classificação,
      tecnologias, e "Minha contribuição: Backend · QA / Testes".
- [ ] Nenhum arquivo foi criado/editado para esse projeto.

## 5 · `/projects/<slug>` (sem código)

- [ ] `/projects/<slug>` resolve automaticamente.
- [ ] Campos opcionais ausentes → seção não renderiza (sem "N/A").
- [ ] Blocos, contribuição, evidências (se usados), imagens e `<title>`/OG corretos.

## 6 · Projeto criado DEPOIS do build

- [ ] `pnpm build` (rota fica `● SSG` com `generateStaticParams`).
- [ ] `pnpm start`; publicar **outro** projeto no Studio.
- [ ] `GET /projects/<novo-slug>` → `200` (resolvido por `dynamicParams`/ISR),
      sem novo build. _(Já verificado que um slug inexistente dá `404` e não erro.)_

## 7 · Atualização de conteúdo

- [ ] Alterar `shortDescription` do projeto no Studio e publicar.
- [ ] Sem novo deploy: em ≤ 60s (TTL do ISR) **ou** imediatamente após o webhook,
      a alteração aparece em `/projects` e `/projects/<slug>`.

## 8 · Webhook (produção)

Só é possível 100% com HTTPS público (Vercel). Localmente já está testado
(`tests/revalidateWebhook.test.ts`: sem assinatura → 401, inválida → 401,
válida → 200 + tags, sem secret → 503).

- [ ] Deploy na Vercel com as env vars (secrets **sem** `NEXT_PUBLIC_`).
- [ ] Sanity _API → Webhooks_: `POST https://<dominio>/api/revalidate`,
      secret = `SANITY_REVALIDATE_SECRET`,
      projection `{ "_type": _type, "slug": slug.current }`,
      trigger em create/update/delete.
- [ ] Publicar uma mudança → webhook 200 no log do Sanity → conteúdo novo no ar
      sem redeploy.

## 9 · Confidencialidade (teste real)

- [ ] Duplicar o projeto de homologação, definir `visibility: private`
      (deve permanecer `draft`).
- [ ] `/projects` → **não** aparece.
- [ ] `/projects/<slug-privado>` → `404`.
- [ ] `/sitemap.xml` → **não** contém o slug.
- [ ] `curl /projects/<slug-privado>` e `view-source` → nenhum dado do projeto
      (título, descrição, blocos) no HTML nem no payload RSC.
- [ ] Remover o projeto privado após o teste.

## 10 · Anonymized

- [ ] Um projeto `visibility: anonymized` publica e renderiza normalmente,
      exibindo `confidentialityNotice`, usando **apenas** o que foi cadastrado
      (nenhuma anonimização automática de texto).

## Critério de homologação (Sprint 0.1 §18)

- [ ] "Criei um projeto no Sanity sem tocar no código e ele apareceu no portfólio."
- [ ] "Alterei o conteúdo no Sanity sem novo deploy e a alteração chegou ao portfólio."
- [ ] "Um projeto `private` foi comprovadamente impossível de acessar publicamente."
