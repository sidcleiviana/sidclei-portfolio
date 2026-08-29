# Home — definitive professional identity (Sprint 4)

`/` is the **narrative index** of the portfolio (Sprint §2): it answers, in
seconds, *who is Sidclei*, *what he does*, *why to believe it*, *how he got
here*, and *where to explore*. It synthesises and forwards — it never
duplicates `/projects` or `/experiencia`, and it never carries case-study depth
(architecture, technical decisions, evidence, responsibilities) — Sprint §46.

## Content audit (2026-08-28)

State of the CMS at build time:

| Type | Docs | Note |
| --- | --- | --- |
| `profile` | 0 | no identity document published |
| `siteSettings` | 0 | — |
| `project` | 1 | `automacao-de-processos` — no cover, no technologies, no `featured` |
| `experience` | 0 | no roles published |
| `skill` / `technology` | 0 | — |
| `education` / `certification` / `learningItem` | 0 | — |

So the Home had to be correct in the **empty-CMS** case first (Sprint §43), and
grow gracefully as real content is published. No fixture is ever rendered by the
public route (Sprint §5, §21).

## Schema audit (no changes made — Sprint §6, §53)

`profile` already models identity: `name`, `headline`, `shortSummary`,
`about`, `publicLocation`, `photo`, `professionalEmail`, `resumeUrl`,
`links: externalLink[]`. `project.featured` (`boolean`, "Destaque na home")
already exists. **Nothing was added.** No `homePage` document was created — the
Home needs no content that `profile` + `project.featured` don't already provide.

## Neutral fallbacks (`src/features/home/identity.ts`)

When `profile` is absent, the Hero uses structural, non-substantive copy drawn
straight from `CLAUDE.md` §1–3 (Sprint §4 permits neutral structural copy; it
forbids invented professional claims):

- `FALLBACK_NAME` — "Sidclei Viana"
- `FALLBACK_HEADLINE` — "Desenvolvedor de Software"
- `FALLBACK_SUMMARY` — one sentence naming the infra → sistemas → ERP → dados →
  automação → software trajectory as *"onde e como cada conhecimento foi
  aplicado"*. No metrics, no adjectives, no seniority.
- `FOCUS_AREAS` — the four axes from `CLAUDE.md` §3 (Software, Automação, Dados,
  Sistemas), each with a definitional one-liner (what the area *is*, never an
  achievement claim).

## Narrative order

`Hero → FocusAreas → FeaturedProjects → CareerSummary → NextStep` (Sprint §25).

1. **Hero** — who + positioning + one-line intro + the two ways forward.
2. **O que faço** — the four professional axes, so breadth is explained as
   *layers of one capability*, not a technology pile (Sprint §16).
3. **Projetos** — the visible evidence (Sprint §11).
4. **Como cheguei aqui** — a compact door into the trajectory (Sprint §18).
5. **Explorar** — the explicit next step (Sprint §23).

Sections 3 and 4 self-hide when they have no real content, so on the current
CMS the live Home is **Hero → O que faço → Explorar** — still a finished page,
no ghost sections, no "em breve".

## Sections

| Component | Source | Hides when | Notes |
| --- | --- | --- | --- |
| `Hero` | `profile` or fallbacks | never | `h1` = name; `Eyebrow` = headline; area `Badge`s; `ButtonLink` → `/projects` (primary) + `/experiencia` (secondary). No 100vh, no typing effect, no terminal, no particles, no mandatory photo (Sprint §7–9, §34). |
| `FocusAreas` | `FOCUS_AREAS` constant | never | `<dl>` of the four axes. Area ≠ Technology ≠ Competência kept distinct (Sprint §17). No icon cards. |
| `FeaturedProjects` | `home.projects` | 0 publicly-visible projects | Prefers `featured == true`; **transparent fallback** to the most recent projects when none are flagged (Sprint §12). No relevance/"most impressive" scoring (Sprint §13). Reuses `ProjectCard` — no divergent copy (Sprint §14). Re-filters with `isPubliclyVisible` (defense in depth). |
| `CareerSummary` | `home.experiences` | 0 experiences | The two most recent roles as a linked `<ol>`, **not** `CareerJourney` — a compact composition, not the full timeline (Sprint §18). Each row links to `/experiencia#<experienceAnchor>`. Reuses `PeriodBadge`. |
| `NextStep` | `profile` | never (routes always shown) | Two large route links (Projetos / Experiência). Contact row (`links`, `resumeUrl`, `professionalEmail`) renders **only** when that data exists in `profile` — nothing personal is assumed (Sprint §23, §35). No contact form. |

## Query strategy (Sprint §38–39)

One `defineQuery` — `homeQuery` in `src/sanity/queries/home.ts` — a single
object projection, one round trip:

- `profile` — identity fields + `coalesce(links, [])`. No `about` (portable
  text stays on a future `/sobre`).
- `projects` — the public gate inlined
  (`status == "published" && visibility != "private"`),
  `order(featured desc, coalesce(publishedAt, period.startDate, "") desc, title asc)`,
  `[0...6]`. Light projection: `title`, `slug`, `shortDescription`,
  `projectType`, `featured`, `visibility`, `coverImage`, `technologies[]->`.
  **No** `contentBlocks`, evidence, galleries (Sprint §39).
- `experiences` — same ordering as `/experiencia`
  (`coalesce(period.ongoing, false) desc, period.startDate desc`), `[0...2]`,
  fields `company`, `role`, `period`, `location` only. No related projects,
  no responsibilities.

`getHome()` returns a typed `HomeData` (`HomeQueryResult` from TypeGen) with a
`{ profile: null, projects: [], experiences: [] }` fallback — `sanityFetch`
never throws.

## Revalidation (Sprint §40)

`getHome` is tagged `[profile, projects, experience]`. The existing
`tagsForWebhookPayload` already emits:

| `_type` published | tags | Home refreshes? |
| --- | --- | --- |
| `profile` | `profile` | yes |
| `project` | `projects`, `experience`, `project:<slug>` | yes |
| `experience` | `experience` | yes |
| skill / technology / … | `projects`, `experience` (default) | yes |

No `revalidate.ts` change, no blanket `revalidatePath`. `tests/home.test.tsx`
locks the query gate + shared ordering; `tests/revalidateWebhook.test.ts`
locks the tag mapping.

## Confidentiality (Sprint §41–42)

The projects projection carries the same public gate as every other query, and
`FeaturedProjects` re-runs `isPubliclyVisible` before render. A `private` or
`unpublished` project cannot reach the Home through either path. `anonymized`
projects show only their already-approved editorial fields (same `ProjectCard`
as `/projects`). No auto-enrichment.

## Design (Sprint §28–31)

Only Sprint-1 primitives and tokens — no new palette, radius, font, shadow,
animation, or motion library. Authorial character comes from composition:
`Container size="wide"` measure on the Hero, `text-balance`/`text-pretty`,
generous `Section spacing`, a single `data-animate="rise"` on the Hero text.
No custom cursor, parallax, scroll-hijack, canvas/WebGL. `prefers-reduced-motion`
already neutralises `[data-animate]` globally.

## Accessibility (Sprint §48)

One `h1` (the name). Each `Section` is `aria-labelledby` its heading;
`FOCUS_AREAS` is a `<dl>`, roles are an `<ol>`, area badges live in a
`Cluster` labelled "Áreas de atuação". CTAs are real links with visible text.
`:focus-visible` rings from the design system. Touch targets ≥ the Button min
height. Nothing depends on colour.

## Performance (Sprint §33)

100% Server Components — no `"use client"` in `src/features/home/`. Build:
`/` is `352 B` / `174 kB` First Load JS, identical to `/projects` and
`/experiencia`; shared chunk unchanged at **103 kB** (no regression).

## Responsive (Sprint §32)

Verified at 375 / 768 / 1280 / 1440 against `/dev/home-preview`: Hero heading
wraps with `text-balance` (no overflow at 375), CTAs stack then row at `sm`,
`FocusAreas` `<dl>` is 1→2 col, project `Grid` reflows on `minCol="18"`,
`CareerSummary` rows are full-width tap targets, `NextStep` panel padding
scales `p-6 → sm:p-8`. No artificial section heights, no horizontal scroll.

## Dev sandbox

`/dev/home-preview` renders the **synthetic** `richHomeFixture` (full profile,
2 featured projects, 2 roles, links) then the `emptyHomeFixture`
(`profile: null`, no projects, no experience). `notFound()` in production,
`noindex`, `robots.txt` disallows `/dev/`, never linked, never imported by a
public route.

## Real content status / gaps

The Home is complete and verified. To reach its ideal form, real content is
still missing (Sprint §54 — **do not auto-fill**):

- **`profile` document** — not published. Until then the Hero uses neutral
  constitution copy. Needs: `name`, `headline`, `shortSummary`, optionally
  `publicLocation`, `links` (GitHub / LinkedIn), `resumeUrl`,
  `professionalEmail`.
- **`project.featured`** — no project is flagged; `FeaturedProjects` is on its
  recency fallback. The one real project has no `coverImage` and no
  `technologies`.
- **`experience` documents** — none; `CareerSummary` does not render. Needs at
  least one real role (editorial approval required — Sprint §20).
- **Professional links / email / résumé** — none in `profile`; the `NextStep`
  contact row is hidden.
