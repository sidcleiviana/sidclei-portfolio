# Portfólio Profissional — Sidclei Viana

Plataforma profissional pessoal, modular e orientada por conteúdo. Não é um
currículo em HTML: é um sistema de conteúdo relacional (projetos, competências,
tecnologias, experiências, formação) preparado para crescer por anos sem
alteração de código a cada novo projeto.

A constituição do produto é o [`CLAUDE.md`](./CLAUDE.md). Este README cobre
apenas a operação técnica.

---

## Produção

- **Site:** <https://sidclei-portfolio.vercel.app>
- **Studio:** <https://sidclei-portfolio.vercel.app/studio>
- **Repositório:** <https://github.com/sidcleiviana/sidclei-portfolio> (público)
- **Hosting:** Vercel (`sidclei-portfolio`), com Git Integration —
  `push` na branch `main` dispara deploy automático.
- **CMS:** Sanity (`portifolio-sidclei`, dataset `production` — **privado**).
  Leitura server-side autenticada com `SANITY_API_READ_TOKEN`; leitura anônima
  do Content Lake é negada. Publicar no Studio dispara um webhook GROQ →
  `/api/revalidate` → `revalidateTag` na Vercel, sem novo deploy.

```
GitHub (main)  ──push──►  Vercel  ──build/deploy──►  https://sidclei-portfolio.vercel.app
Sanity Studio  ──publish──►  webhook  ──►  /api/revalidate  ──►  revalidateTag (ISR)
```

---

## Stack

| Camada           | Escolha                                    |
| ---------------- | ------------------------------------------ |
| Framework        | Next.js 15 (App Router) + React 19         |
| Linguagem        | TypeScript (strict)                        |
| Estilo           | Tailwind CSS v4 + CSS variables (tokens)   |
| CMS              | Sanity v3 (Studio embutido em `/studio`)   |
| Integração       | `next-sanity` + GROQ                       |
| Validação        | Zod (quando há contrato de entrada)        |
| Testes           | Vitest + Testing Library                   |
| Gerenciador      | pnpm                                       |

Versões exatas: ver `package.json` / `pnpm-lock.yaml`. Resumo em
[`CLAUDE.md` › TECHNICAL BASELINE](./CLAUDE.md#technical-baseline).

---

## Pré-requisitos

- Node.js `>= 20.11` (ver `.nvmrc`)
- pnpm (`npm install -g pnpm` ou `corepack enable pnpm`)

## Instalação

```bash
pnpm install
cp .env.example .env.local   # e preencha os valores (ver abaixo)
```

## Comandos

```bash
pnpm dev         # servidor de desenvolvimento (http://localhost:3000)
pnpm build       # build de produção
pnpm start       # serve o build de produção
pnpm lint          # ESLint (next/core-web-vitals + next/typescript)
pnpm typecheck     # tsc --noEmit
pnpm test          # Vitest (run único)
pnpm test:watch    # Vitest em watch
pnpm format        # Prettier --write
pnpm typegen       # regenera src/sanity/sanity.types.ts a partir do schema + queries
pnpm typegen:check # regenera e falha se houver diff (CI / pré-commit)
```

O Studio fica em `http://localhost:3000/studio`.

Rode `pnpm typegen` sempre que alterar um schema (`sanity/schemaTypes/`) ou uma
query (`src/sanity/queries/`). O arquivo gerado é versionado, então uma
instalação limpa já compila; o comando só é necessário após mudanças. Ver
[ADR-004](./docs/decisions/ADR-004-sanity-typegen.md).

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Nomes (nunca versione valores):

| Nome                             | Público? | Uso                                              |
| -------------------------------- | -------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | sim      | ID do projeto Sanity                             |
| `NEXT_PUBLIC_SANITY_DATASET`     | sim      | dataset (ex.: `production`)                      |
| `NEXT_PUBLIC_SANITY_API_VERSION` | sim      | versão da API (data fixa)                        |
| `SANITY_API_READ_TOKEN`          | **não**  | leitura autenticada do dataset privado (server-side, obrigatório) |
| `SANITY_REVALIDATE_SECRET`       | **não**  | assina o webhook de revalidação                  |
| `NEXT_PUBLIC_SITE_URL`           | sim      | URL base para metadata / canonical / sitemap     |

Sem `NEXT_PUBLIC_SANITY_PROJECT_ID` a aplicação continua compilando e rodando:
as páginas exibem o estado vazio e `/studio` mostra um aviso de configuração.

---

## Configurar o Sanity

O projeto Sanity real (`portifólio-sidclei`) já está provisionado. O `projectId`
e o `dataset` ficam em `.env.local` (git-ignored) — nunca versionados. Para um
ambiente novo:

1. `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` em `.env.local`.
2. O dataset `production` é **privado**: gere um token **Viewer** (somente
   leitura) em _API → Tokens_
   (`https://www.sanity.io/manage/project/<projectId>/api#tokens`) e coloque em
   `SANITY_API_READ_TOKEN`. Sem ele, as leituras server-side retornam vazio.
3. `SANITY_REVALIDATE_SECRET` = qualquer string aleatória longa
   (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
4. _API → CORS origins_: adicione `http://localhost:3000` e a URL de produção.
5. `pnpm dev` → `/studio` → login → cadastrar conteúdo.

Roteiro de homologação ponta a ponta:
[`docs/homologation-checklist.md`](./docs/homologation-checklist.md).

### Publicação sem alterar código

O conteúdo publicado no Studio aparece no site por **ISR + revalidação
on-demand** (ver [`docs/decisions/ADR-003-content-revalidation.md`](./docs/decisions/ADR-003-content-revalidation.md)).

Configure um webhook em _API → Webhooks_ apontando para
`https://SEU_DOMINIO/api/revalidate`, método `POST`, com:

- **Secret**: o mesmo valor de `SANITY_REVALIDATE_SECRET`
- **Projection**: `{ "_type": _type, "slug": slug.current }`
- **Trigger on**: create, update, delete

Sem webhook, o conteúdo ainda atualiza sozinho pelo TTL do ISR (60s).

---

## Estrutura

Ver [`docs/architecture.md`](./docs/architecture.md) e
[`docs/content-model.md`](./docs/content-model.md).

```
sanity/schemaTypes/   schemas do CMS (documents/ + objects/ + objects/blocks/)
src/sanity/           client, queries GROQ (defineQuery), sanity.types.ts (gerado),
                      types.ts (adaptador), fetch/revalidate, imagem
src/domain/           regras puras (visibilidade, labels, período, contribuição)
src/features/projects/ cards, lista, registry de content blocks + renderers
src/components/       ui / layout / content (PortableText, imagem)
src/app/(site)/       páginas públicas
src/app/studio/       Sanity Studio embutido
src/app/api/          route handlers (revalidate)
tests/                Vitest
```
