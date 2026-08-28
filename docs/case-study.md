# Project case study system (Sprint 2)

`/projects/[slug]` composes a case study from whatever the CMS holds. Every
section is conditional — a project with only a title, a description, a type and
a few technologies still reads as a finished page; a rich project stays
navigable. Nothing is invented; a field that is empty in Sanity does not render.

## Anatomy

`ProjectCaseStudy` (`src/features/projects/ProjectCaseStudy.tsx`) assembles, in
order, the sections that have content:

| Section | Source | Measure |
| --- | --- | --- |
| **Header** (`case/ProjectHeader`) | title, shortDescription, projectType, contribution authorship, period, roles, top technologies, confidentiality notice | prose |
| **Cover** | `coverImage` | wide |
| **Contribuição** (`case/ProjectContribution`) | `contribution` (only if it carries anything) | prose |
| **Contexto** / **Problema** | `context` / `problem` plain text | prose |
| **Content blocks** (`ProjectContentBlocks`) | `contentBlocks[]`, in editor order | per block |
| **Resultados** (`MetricList`) | `metrics[]` | wide |
| **Evidências** (`EvidenceList`) | `evidence[]` | wide |
| **Meta** (`case/ProjectMeta`) | skills, technologies, links, related experience | prose |
| **Nav** (`case/ProjectNav`) | prev / next from the **public** project list | container |

The framing order is fixed; the modular blocks keep the narrative order the
editor chose (Sprint §4).

## Content width (Sprint §10)

Two measures, from `BlockShell`: `prose` (`--container-prose`, ~68ch) for
narrative — rich text, technical decisions, learning, links, callouts, timeline;
`wide` (`--container-wide`) for media, galleries, video, diagrams, metrics,
before/after. Horizontal gutters come from the case container, never from a
block.

## Table of contents (Sprint §11–12)

`case/ProjectToc` (the only client component here) is derived from
`buildCaseSections` — it lists exactly the sections that render, and only when
there are **≥ 4** of them. Desktop: a sticky rail (`xl+`). Mobile: a collapsed
`<details>`. The active section is tracked with a native `IntersectionObserver`
(no library, no scroll listener); the links work with JS disabled. Anchors get
`scroll-mt-24` so the sticky header never covers a target; scrolling is smooth
except under `prefers-reduced-motion`.

## Block renderers (Sprint §7–8)

One isolated renderer per type, wired in `blockRegistry.tsx`. An unknown
`_type` renders a dev-only notice and nothing in production.

| `_type` | Renderer | Notes |
| --- | --- | --- |
| `richTextBlock` | `TextBlocks/RichText` | editorial Portable Text (below) |
| `imageBlock` | `TextBlocks/Image` | `Figure` + caption; `wide` toggles measure |
| `galleryBlock` | `MediaBlocks/Gallery` | 1 → single, 2 → pair, 3+ → grid. No carousel, no lightbox (§19) |
| `videoBlock` | `MediaBlocks/Video` | YT/Vimeo lazy embed, direct file `<video preload=none>`, else a link. Never autoplays (§30 CLAUDE.md) |
| `metricGridBlock` | `StructuredBlocks/MetricGrid` → `MetricList` | value shown **verbatim**; no computed percentages (§23) |
| `beforeAfterBlock` | `StructuredBlocks/BeforeAfter` | two labelled panels; renders whichever side has content |
| `architectureBlock` | `TextBlocks/Architecture` | wide; diagram image + description. No auto-generated diagrams (§21) |
| `timelineBlock` | `StructuredBlocks/Timeline` | vertical, date + title + description |
| `technicalDecisionsBlock` | `StructuredBlocks/TechnicalDecisions` | "Por que X?" + rationale — demonstrates engineering (§CLAUDE 38) |
| `learningBlock` | `TextBlocks/Learning` | body + key-point list |
| `calloutBlock` | `TextBlocks/Callout` | **one** neutral language; only `warning` shifts the border (§22) |
| `linksBlock` | `TextBlocks/Links` | `TextLink` list |

### Portable Text

`src/components/content/PortableText.tsx` renders only what the schema allows:
`h2` / `h3` (anchored) / `normal` / `blockquote`; `bullet` / `number` lists;
`strong` / `em` / inline `code`; `link` (http(s) → new tab + `rel`); embedded
`imageWithAlt` as a `Figure`. No arbitrary styles leak in from the CMS (§9).

## Contribution (Sprint §3, §13)

`hasContribution` gates the section. `authorshipLabel` never invents a label.
Solo projects get one line; team / participation projects show the team context
and **Sidclei's** roles + responsibilities — read from the CMS only, never
inferred from technologies or skills. Skills and Technologies stay distinct
concepts throughout (§14): a Skill is *what was done*, a Technology is *what it
was done with*.

## Confidentiality (Sprint §24–25)

`visibility: anonymized` shows only the editorial content that was entered, plus
`confidentialityNotice`; nothing is enriched by inference. `visibility: private`
never reaches a public route (query gate + `isPubliclyVisible`) and can never
appear in prev/next (derived from the public list). A CDN asset URL is not an
access control — private material must not live behind an obscure URL.

## Schema

**No schema changes.** TypeGen untouched. Gaps noted for a future sprint:

- No dedicated fenced **code block** — only the inline `code` mark inside rich
  text. Add a `codeBlock` object only if a real project needs multi-line code.
- No explicit **related-projects** reference — recommendation is out of scope
  (§27); `relatedExperience` is the only cross-link rendered.

## Dev sandbox

`/dev/case-preview` renders the rich + sparse **synthetic** fixtures
(`src/features/projects/fixtures.ts`) for visual homologation. It `notFound()`s
in production, is `noindex`, disallowed in `robots.txt`, and never linked.
