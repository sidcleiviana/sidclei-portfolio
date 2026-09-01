# Knowledge Hub (Sprint 5)

`/conhecimento` is the relational layer over the portfolio's competences and
technologies. It answers *"what does Sidclei know how to do, and in which real
contexts was it used?"* — never *"how many technologies does he know?"* (Sprint
§2). It is the data foundation a future Knowledge Graph will read; **no visual
graph is built here** (Sprint §35, §53).

## Schema audit (no changes — Sprint §46)

| Type | Relevant fields | Relations |
| --- | --- | --- |
| `skill` | `name`, `slug` (req), `shortDescription` (optional, empty on all 11), `category` (req enum), `featured` (bool) | none outgoing |
| `technology` | `name`, `slug` (req), `category` (req enum), `icon` (empty), `officialUrl` (empty) | none outgoing |
| `experience` | — | `skills[] -> skill`, `technologies[] -> technology` |
| `project` | — | `skills[] -> skill`, `technologies[] -> technology`, `relatedExperience -> experience` |

`skill` and `technology` carry **no reference to each other**. `experience` has
no `visibility` field — it is shown as-is under the normal published
perspective (Sprint §22).

## Real edges available (Sprint §35)

```
experience --skills-->        skill
experience --technologies-->  technology
project    --skills-->        skill        (public gate applies)
project    --technologies-->  technology   (public gate applies)
project    --relatedExperience--> experience
```

Every knowledge relation on the site is the **inverse** of one of these, computed
in GROQ with `*[... references(^._id)]`. Nothing is inferred.

## Relations intentionally NOT created (Sprint §7, §46)

**`skill` ↔ `technology`.** "Backend Development" and "Python" appearing in the
same experience is co-occurrence, not a relation. No edge is stored, queried or
rendered between a skill and a technology. Introducing one would be a schema +
architecture decision for a later sprint, not a convenience for the graph.

## Architecture

| Route | Purpose |
| --- | --- |
| `/conhecimento` | Hub. Two sections — `#competencias`, `#tecnologias` — each grouped by the schema's own `category`. |
| `/conhecimento/competencias/[slug]` | Skill detail: what it is (when a description exists), the experiences it appears in, the public projects that demonstrate it. |
| `/conhecimento/tecnologias/[slug]` | Technology detail: same shape. |

All three are **Server Components** (`src/features/knowledge/`, no `"use
client"`). Detail routes are statically generated from
`getKnowledgeSlugs()` and 404 on an unknown slug.

### Hub anatomy

`KnowledgeHub` → header (`h1`, in-page anchor nav) → `#competencias` section →
`#tecnologias` section. Each section: `SectionHeading` + a two-column grid of
`CategoryGroup`s. A skill row is a link (name + a neutral `· em destaque`
marker when `featured`, Sprint §11 — never "principais especialidades", never a
level); its `shortDescription` renders as a muted line when present (Sprint
§12). A technology row is a `KnowledgeBadge` (mono, unchanged appearance). **No
counts, no bars, no radar, no cloud** (Sprint §3).

Categories are sorted alphabetically (pt); an item with no category falls into
"Outras", always last (`src/domain/knowledge.ts` `groupByCategory`). Within a
category, query order is kept: `featured desc, name asc` for skills, `name asc`
for technologies (Sprint §26).

### Detail anatomy

`KnowledgeDetail` (shared): breadcrumb (`Conhecimento / Competências|Tecnologias
/ Name`) → `h1` name + category + optional aside (`Em destaque` for a featured
skill, `Site oficial` link for a technology that has `officialUrl`) → optional
description → **Onde apareceu** (experiences, newest/ongoing first, each linking
to `/experiencia#<experienceAnchor>`) → **Projetos** (`ProjectCard
variant="compact"`). A section with no relation is **omitted entirely** — never
"0 experiências" (Sprint §27). With the current CMS every detail page shows
*Onde apareceu* and no *Projetos* section.

## Cross-links

| From | To | Where |
| --- | --- | --- |
| `/experiencia` skill/technology badge | knowledge detail | `ExperienceItem` → `KnowledgeBadge` (Sprint §17, §32 — badge look unchanged, link adds focus + pointer) |
| Case study `ProjectMeta` badge | knowledge detail | same `KnowledgeBadge` (Sprint §19) |
| knowledge detail experience | `/experiencia#anchor` | `KnowledgeDetail` → `experienceAnchor` (Sprint §18) |
| knowledge detail project | `/projects/[slug]` | reused `ProjectCard` |
| Home "Explorar" | `/conhecimento` | `NextStep` third route link (Sprint §31) |
| Header | `/conhecimento` | `PRIMARY_NAV` — `Início · Projetos · Experiência · Conhecimento` (Sprint §30) |

Round trip proven: Experience → Skill → Experience, Experience → Technology →
Experience. Project ↔ Skill/Technology round trip is ready but dormant (no public
project yet — Sprint §20, §51).

## Query strategy (Sprint §23, §24)

`src/sanity/queries/knowledge.ts` — one `defineQuery` each, no N+1:

- **`knowledgeHubQuery`** — `{ skills, technologies }` in one round trip. Light:
  `_id, name, slug, category`, plus `shortDescription, featured` for skills. **No
  relation counts** — a count reads as a proficiency signal (Sprint §3).
- **`skillBySlugQuery` / `technologyBySlugQuery`** — the entity + `experiences`
  (inverse of `experience.skills/technologies`, light projection: `_id, company,
  role, period`) + `projects` (inverse of `project.skills/technologies`, with the
  **public gate inlined**: `status == "published" && visibility != "private"`).
  No `contentBlocks`. Neither query traverses to the other knowledge type.
- **`knowledgeSlugsQuery`** — `{ skills: [slug], technologies: [slug] }` for
  `generateStaticParams` and the sitemap.

Defense in depth: `KnowledgeDetail` re-filters related projects with
`isPubliclyVisible` (Sprint §21).

## Cache / revalidation (Sprint §43, §44)

New tags: `knowledge`, `skills`, `technologies`.

| Fetch | Tags |
| --- | --- |
| `getKnowledgeHub` | `knowledge`, `skills`, `technologies` |
| `getSkillBySlug(slug)` | `knowledge`, `skills`, `skill:<slug>`, `experience`, `projects` |
| `getTechnologyBySlug(slug)` | `knowledge`, `technologies`, `technology:<slug>`, `experience`, `projects` |

`tagsForWebhookPayload` (`src/sanity/revalidate.ts`, unit-tested):

| `_type` published | tags purged |
| --- | --- |
| `skill` | `knowledge`, `skills`, `experience`, `projects`, `skill:<slug>` |
| `technology` | `knowledge`, `technologies`, `experience`, `projects`, `technology:<slug>` |
| `experience` | `experience`, `knowledge` |
| `project` | `projects`, `experience`, `knowledge`, `project:<slug>` |
| `profile` / `siteSettings` | unchanged |

A skill/technology rename reaches the hub, the `/experiencia` badges, the
project meta and its own detail page; no blanket `revalidatePath`.

## Current real content

11 skills · 8 technologies · 3 experiences · **0 public projects**.

- **Skills** group into: Automação, Banco de Dados, Dados, Desenvolvimento,
  Infraestrutura, Integrações, Qualidade, Redes. 6 are `featured`.
- **Technologies** group into: Banco de dados, Ferramenta, Framework, Linguagem,
  Sistema / ERP.
- Every skill and technology is referenced by ≥ 1 experience, so every detail
  page has an *Onde apareceu* section. Examples (emergent from real references,
  not hardcoded): *Automação de Processos / RPA* → Desenvolvedor + Analista de
  Sistema Pleno (ISO Olhos); *Python* → the same two; *Infraestrutura de TI* →
  Analista de TI (Wise Consultoria).

## Project-empty state (Sprint §20)

No published project references any skill/technology, so the **Projetos** section
never renders on a detail page today. The page is complete without it. When a
public project with skill/technology relations is published, the section appears
automatically (reused `ProjectCard`), gated and re-filtered.

## Graph readiness (Sprint §35, §36)

The data needed to build `{ nodes, edges }` is now queryable from real
references — five real edge types, listed above. **No graph adapter/engine was
built** (Sprint §36): when the graph sprint starts it can reuse
`knowledgeHubQuery` for nodes and add one relational query for edges, respecting
the Skill↔Technology non-edge.

## Not built (Sprint §53)

Visual graph, canvas/D3/Cytoscape/React Flow, search / command palette, filters,
About, blog, analytics, skill levels, endorsements, certifications, learning
timeline. No schema change. No dev fixture (real content is sufficient — Sprint
§47).
