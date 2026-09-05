# Design System v3 — "Modular Surfaces"

> The code is the source of truth. Tokens live in `src/styles/globals.css`
> (`@theme` + `[data-surface]` scopes); primitives in `src/components/ui`. This
> page states intent so future work builds on it. Supersedes the Sprint 7
> "Editorial Relational Premium" system, which was retired.

## Direction

A technological interface you want to explore, not an article you read. Base
**B** (modular surfaces, graphite/off-white contrast, higher density, compact
hero) with **~25–30% of C** injected: three modules respond to user selection
and update their panels in place, without a page load and without a graph.

## Surfaces

Graphite is the primary ground. Rhythm comes from alternating it with three
other surfaces via a `data-surface` attribute that repaints the shared tokens
for everything inside — components never change.

| `data-surface` | token `--color-bg` | role |
| --- | --- | --- |
| _(none)_ · graphite | `#14171F` | the page default |
| `paper` | `#ECE9E2` | advancing inset — featured project, knowledge |
| `tonal` | `#191D2E` (indigo-cast graphite) | the relational register — trajectory, Competências, detail headers |
| `deep` | `#0B0E15` (navy) | the recessed opening — case study header, footer |

Home rhythm: **graphite → paper → tonal → paper → graphite → navy**.
Verified full-bleed, no boxed cards floating on a ground.

## Colour

| token | value | job |
| --- | --- | --- |
| `--color-indigo` / `--color-indigo-bright` | `#4A3AFF` / `#8B90FF` | the one interaction / relation colour — selected state, focus ring, active chip, connectors. `bright` on dark, deep on paper. |
| `--color-petrol` | `#22D3C5` | the live "current" status only — the pulse dot, the "· Atual" marker. Rare. |

No gradients, no glow beyond a 1px edge-brighten on hover, no per-category
colour coding, no fake KPIs.

## Typography

- **Hanken Grotesk** (600–800) — display, module titles, interface. Carries the
  identity. Scale is restrained: Home h1 `clamp(2rem,4.5vw,2.9rem)`.
- **Inter** (400–500) — body and UI text.
- **JetBrains Mono** (500) — metadata: `.u-label` (uppercase, tracked), status,
  stack, periods, chip text.
- **Newsreader was removed** — it read as a historical obligation once the
  identity stopped being editorial.

## Primitives (`src/components/ui`)

`Container` (`default | wide | prose | full`) · `Section` (spacing) · `Surface`
(`graphite | paper | tonal | deep`, full-bleed band) · `Kicker` (mono label) ·
`Chip` (selectable relational button) · `Tag` / `TagLink` (static mono
metadata) · `Button` / `ButtonLink` (indigo primary, ruled secondary) ·
`TextLink`. Removed in v3: `ArrowLink`, `Badge`, `Rule`, `SectionHeading`,
`SectionMarker`, `MonoHeading`, `Stack`, `Panel`.

## Interactive modules (the ~25–30% of C)

Exactly three, each with a complete resting state (progressive enhancement —
interaction enriches, never gates comprehension):

1. **`FeaturedProjectCard`** (`features/home`) — the project's declared
   integrations as chips; pointing at one reveals a one-line note and marks the
   matching stack item. Not an architecture diagram: the composition shows what
   the project connects to and the layer Sidclei worked on, nothing about how
   data flows.
2. **`TrajectorySelector`** (`features/experience`) — used on the Home (recent
   roles) and at full scale on `/experiencia`. Desktop: a role list drives a
   shared detail panel. Mobile: a native accordion, each role expanding its own
   detail. Current role selected by default. Keyboard: arrow keys, Home/End.
3. **`KnowledgeExplorer`** (`features/knowledge`) — a chip rail (grouped by
   category) drives a detail panel: the real experiences and public projects a
   skill / technology appeared in, and — for a skill — the technologies present
   *in those contexts*, explicitly labelled as such. Never a Skill → Technology
   edge. Pointing at a chip dims the chips sharing no context (CSS `:has()` +
   the `RelationalScope` island).

## Motion

Fast (120–180ms), purposeful, no scroll-hijack, no parallax, no ambient loops.
`.u-fade` cross-fades a panel that swaps on selection · `.u-pulse` is the live
dot · `.u-surface-interactive` lifts a surface 2px on hover · `[data-animate="rise"]`
is an opt-in scroll-linked entrance (CSS `animation-timeline: view()`, no JS).
`prefers-reduced-motion` collapses all of it to instant state changes.

## Preserved from the old system

The relational content model + Sanity schema + GROQ + TypeGen + confidentiality
gating; the Sprint 2 CMS-driven case-study block system (re-skinned, not
rebuilt); ISR + signed webhook revalidation + cache tags; the `data-surface`
CSS-variable-scoping mechanism; accessibility infrastructure (focus-visible,
reduced-motion, landmarks, `MobileNav` disclosure a11y); the domain helpers
(`isCurrent`, `experienceAnchor`, `monthRange`, `contribution`, `visibility`);
the `RelationalScope` island. No schema, content, slug, relation, SEO, ISR or
security behaviour changed.

## Responsive

Homologated at 375 and 1440 (structural + surface + overflow checks): zero
horizontal overflow on every route, correct surface rhythm, the interactive
selectors working (tab/chip selection, mobile accordion). Interactive modules
break to a touch-first layout below `lg` — the trajectory becomes an accordion,
the knowledge panel stacks under the chips.
