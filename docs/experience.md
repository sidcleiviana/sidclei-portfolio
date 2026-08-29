# Professional experience system (Sprint 3)

`/experiencia` is a CMS-driven career journey: where Sidclei worked, in what
role, for how long, what he did, and the public projects of each phase — so the
page answers *"how did this professional get to what he does today?"*, not just
*"which companies?"*. Nothing is invented; an empty field does not render.

## Schema audit (no changes made)

`experience` document — `company` (req), `role` (req), `period` (`dateRange`,
req), `location`, `summary`, `responsibilities: string[]`, `skills`/
`technologies` (references). **No slug, no explicit order field, no type.**
`project.relatedExperience` is a single `reference` → `experience`.

Two gaps, handled without touching the schema:

| Gap | Handling |
| --- | --- |
| No slug for anchors | `src/domain/experienceAnchor.ts` derives a deterministic anchor from `company + role` (`empresa-x-desenvolvedor`); a list is de-duplicated with `-2`, `-3` suffixes. The same helper runs on the project side so `ProjectMeta` links straight to the right step. |
| No order field | GROQ `order(coalesce(period.ongoing, false) desc, period.startDate desc)` — current roles first, then newest. |
| Month vs year precision | `src/domain/monthRange.ts` — `"mai 2023 — dez 2025"` when a month is stored, `"2023"` when only a year is. `"— Atual"` when `ongoing` or no `endDate`. Never invents a month, never shows a day. |

## Query strategy (Sprint §40 — no N+1)

One `defineQuery` (`src/sanity/queries/experience.ts`) returns every experience
**and**, per experience, its related projects via `*[... && references(^._id)]`
— a single round trip. The subquery repeats the exact public gate
(`status == "published" && visibility != "private"`), so a private or
unpublished project can never surface through the relation (Sprint §8). The
project projection is light — `title`, `slug`, `shortDescription`, `projectType`,
`technologies` — no content blocks (Sprint §41). `ExperienceProjects` filters
again with `isPubliclyVisible` (defense in depth).

## Anatomy

`ExperiencePage` → `CareerJourney` (a chronological `<ol>` with a decorative
rail — order is carried by the dates, not the line) → `ExperienceItem` per step:

`PeriodBadge` · `h2` role (the focus) · company · location · summary ·
"O que eu fazia" (responsibilities) · "Competências" (skills, `Badge outline`) ·
"Tecnologias" (`Badge outline mono`) · "Projetos deste período"
(`ExperienceProjects` → `ProjectCard variant="compact"`).

Skills and Technologies stay separate concepts (Sprint §16–17): Skill answers
*"o que eu fazia"*, Technology answers *"com o que trabalhei"*.

## Cross-links (Sprint §19, §21)

- Case study → `ProjectMeta` links `relatedExperience` to
  `/experiencia#<experienceAnchor>`.
- `/experiencia` → each related project links to `/projects/[slug]`.
- Round trip: project ↔ experience ↔ project.

## Revalidation (Sprint §43–44)

`CACHE_TAGS.experience = "experience"`. `getExperiences` is tagged
`["experience", "projects"]`. `tagsForWebhookPayload`:

| `_type` | tags |
| --- | --- |
| `experience` | `experience` |
| `project` | `projects`, `experience`, `project:<slug>` |
| skill / technology / … (default) | `projects`, `experience` |

Publishing an experience — or a project it relates to — refreshes
`/experiencia` with no deploy. No blanket `revalidatePath`.

## Navigation

`PRIMARY_NAV` now `Início · Projetos · Experiência`. Desktop nav became a small
client island (`DesktopNav`) so it can set `aria-current="page"`; `MobileNav`
already did.

## Sparse vs rich

A sparse experience (company / role / period / one-line summary) renders as a
finished step with no empty gaps. A rich one (responsibilities, skills,
technologies, 2+ related projects) stays organised. Verified via
`tests/experiencePage.test.tsx` and `/dev/experience-preview`.

## Dev sandbox

`/dev/experience-preview` renders the rich + sparse + empty **synthetic**
fixtures (`src/features/experience/fixtures.ts`). `notFound()` in production,
`noindex`, `robots.txt` disallows `/dev/`, never linked.

## Real content status

**No `experience` documents exist in the CMS yet.** The system is complete and
verified against fixtures. To publish real content, create one `experience`
document per role in the Studio with, per role:

- **Empresa** (required) · **Função** (required) · **Período** (start month;
  end month or "Em andamento")
- optional: **Localização** · **Contexto / resumo** · **Responsabilidades**
  (list) · **Competências** (refs) · **Tecnologias** (refs)
- to connect a project: set its **Experiência relacionada** field.
