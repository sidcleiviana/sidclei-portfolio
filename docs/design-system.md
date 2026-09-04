# Design System v2 — "Editorial Relational Premium" (Sprint 7)

> The code is the source of truth. Tokens live in `src/styles/globals.css`
> (`@theme`); primitives in `src/components/ui`. This page states intent so
> future sprints build on it.

## Direction

A technology publication crossed with an engineering portfolio. Type is the
graphic element; thin rules are the structure; vertical rhythm is generous; the
single accent is reserved for **relation** (links, focus, active state,
connections). Almost no shadow, little radius, no boxed cards on editorial
surfaces. One light direction (`color-scheme: light`); dark tokens can be added
under `:root[data-theme="dark"]` with no component changes.

~20% "Knowledge Atlas": relations surface discreetly — `usado em` / `apareceu
em` / `demonstrado em` labels, a CSS + tiny-island relational highlight — never
a canvas, D3, or force graph.

## Tokens (`@theme` in `globals.css`)

| Group | Tokens |
| --- | --- |
| Colour | `--color-bg` `--color-bg-subtle` `--color-surface` `--color-fg` `--color-fg-muted` `--color-fg-faint` (section numbers, quietest meta) `--color-border` `--color-border-strong` `--color-rule` (near-ink chapter hairline) `--color-accent` `--color-accent-strong` |
| Type | `--font-display` (Newsreader, serif) · `--font-sans` (Inter) · `--font-mono` (JetBrains Mono) · `--text-xs…--text-5xl` (each with a paired `--line-height`) · `--tracking-display` `--tracking-tight` `--tracking-label` |
| Radius | `--radius-none` `0` · `--radius-sm` `.25rem` (controls only) · `--radius-md` `.375rem` |
| Elevation | `--shadow-sm` only — for the rare lifted element; structure comes from space + rule |
| Layout | `--container-editorial` `84rem` (the wide canvas) · `--container-max` `72rem` · `--container-wide` `52rem` (media) · `--container-prose` `42rem` (reading) · `--gutter` `clamp(1.25rem, 6vw, 4.5rem)` |
| Motion | `--ease-out` `--ease-in-out` · `--dur-fast` `120ms` · `--dur` `200ms` · `--dur-slow` `420ms` |

Tailwind v4 generates the utilities (`bg-bg`, `text-fg-faint`, `border-border`,
`text-5xl`, `font-mono`, `max-w-[var(--container-editorial)]`, …). Components
never hardcode a colour, measure, radius or timing.

## Typography

Three faces, one job each (`src/styles/fonts.ts`, all self-hosted by
`next/font`):

- **Newsreader** — DISPLAY. `bare h1/h2/h3` and `.font-display` opt in. The
  editorial voice: hero, chapter and case titles set large, tight tracking.
  Never body.
- **Inter** — BODY & UI.
- **JetBrains Mono** — TECHNICAL. Section numbers, category labels, technology
  names, metadata — via the `.u-label` utility (`text-xs`, `tracking-label`,
  uppercase, `--color-fg-muted`).

Scale tops out at `--text-5xl` (5rem); hero and case titles use `clamp()` for
fluid display sizing. Reading measure is `--container-prose`.

## Editorial numbering

`01 02 03` in mono, `--color-fg-faint`, always **decorative** (`aria-hidden` —
the label carries the meaning). Components: `SectionMarker` (standalone),
`SectionHeading` `index` prop, `CaseHeading` `index`, the nav, the project /
experience / knowledge rows.

## Layout primitives (`src/components/ui`)

`Container` (size: `editorial | max | wide | prose | full`, fluid `--gutter`
padding) · `Section` (spacing: `sm | md | lg | xl`) · `Stack` (vertical gap) ·
`Rule` (`weight: hair | strong`, optional `animate`) · `SectionHeading` ·
`SectionMarker`. Removed in v2: `Grid`, `Card`, `Cluster`, `Divider`, `Eyebrow`
(dead after the editorial rebuild — §54).

## Components

`Button` / `ButtonLink` (real `<button>` / `next/link`; `primary` = ink fill,
`secondary` = ruled, `ghost` = text; `--radius-sm` for affordance) ·
`ArrowLink` (the editorial "LABEL →" call-to-move — mono label, nudging arrow,
underline on hover/focus; replaces filled CTAs) · `TextLink` (inline prose) ·
`Badge` (flat token: `neutral | accent | outline`; `outline` is just an
underline — technologies read as a plain mono list) · `MonoHeading`.

## Interaction & motion (CSS-first, one small island)

- Colour / border / opacity transitions everywhere; transform only for tiny
  editorial cues (an arrow nudging via `.u-arrow`, a row shifting a few px).
  No lifts, no scroll-hijack, no parallax, no cursor-follow, no slow easing.
- `:focus-visible` — 2px accent outline, 3px offset, everywhere, keyboard-only.
- Entrances: `[data-animate="rise"]` (+ `data-delay="1|2|3"`),
  `[data-animate="line"]` (a rule drawing in). Opt-in, never carry information.
- **Relational highlight** (§12, §25): `[data-rel-scope]` dims sibling
  `[data-rel]` items while one is hovered/focused (pure CSS via `:has()`). The
  knowledge pages add `RelationalScope` (a ~40-line client island) to *keep
  relatives bright* by matching `data-rel-keys`. With JS off the CSS still
  gives a gentler cue; every relation is a real link with visible text.
- `@media (prefers-reduced-motion: reduce)` zeroes all animation, transform and
  the relational dimming.

## Responsive

Homologated at 375 / 768 / 1280 / 1440 / 1920. Desktop uses controlled
asymmetry (12-col grids: text ~7–8, meta ~3–4); mobile returns to a single
vertical flow. `--container-editorial` + fluid `--gutter` keep wide screens
from stranding content; `prose` stays capped for reading.

## Accessibility

One `h1` per page; heading order preserved; `header`/`nav`/`main`/`footer`
landmarks; sections `aria-labelledby` their heading; editorial numbers
`aria-hidden`; `:focus-visible` on every control; relational cues have textual
equivalents; reduced-motion respected. Nothing depends on colour.

## Sprint 7.1 — art-direction refinement

Intensified, not rebuilt. `--container-editorial` 84→88rem (better use of wide
screens); relational dim opacity 0.38→0.5 (never "disabled"); new `.u-connect`
elbow that ties a relation label to the entity above it.

- **Home** — header/hero read as one composition (top space trimmed); headline
  `clamp(3rem, 11vw, 8.5rem)` dominant; the four axes become a connected list in
  the right column (thin spine + hairline elbows) — the discreet atlas cue;
  `ArrowLink size="lg"` for the CTA on its own rule.
- **Projects / Case** — the title is the protagonist (`clamp` up to ~3.5–6.25rem,
  2–3 lines); metadata is small mono; `Stack` is `text-fg-faint` `text-xs` —
  clearly tertiary. Title graphite at rest, accent on hover (§8).
- **Experience** — a large faint year marks each phase; role ≫ company ≫ period
  in scale; responsibilities are rule-separated rows, not a bulleted checklist.
- **Knowledge** — category = a real chapter (big serif number, `border-t-2`,
  sticky label on desktop); "em destaque" is now a small accent dot + an
  `sr-only` note (no repeated text); the usage-context line carries a `.u-connect`
  elbow. Detail pages get the same treatment for "Apareceu em" / "Demonstrado em".
- **Badge** `outline` reads at full `text-fg` at rest; `KnowledgeBadge` hover is
  accent.
- Header wordmark `text-xl sm:text-2xl`, header `h-16 sm:h-20`.

## Sprint 7.2 — chromatic art direction

Colour got a job: **identity + structure + relation**, not just link/hover.
Roughly **80% neutral / 15% indigo / 5% petrol** — the site stays predominantly
sober; colour arrives as *chapters*, not decoration.

### Palette additions (`@theme` in `globals.css`)

| Token | Value | Function | Contrast |
| --- | --- | --- | --- |
| `--color-bg-tonal` | `#ECEBFB` | indigo-soft surface | fg `#16150F` on it ≈ 15:1 (AAA) |
| `--color-accent` | `#2D2AE2` | the site colour — relation, links, focus, active | on paper ≈ 8.9:1 |
| `--color-accent-strong` | `#1F1EB2` | pressed / hover-deep | |
| `--color-accent-on-dark` | `#9B9AFF` | luminous indigo, dark chapters only | on surface-dark ≈ 7.6:1 (AAA) |
| `--color-surface-dark` | `#16152F` | deep indigo-ink — a *chapter*, not dark mode | |
| `--color-on-dark` | `#F4F3EF` | body text on dark | ≈ 15.3:1 (AAA) |
| `--color-on-dark-muted` | `#B9B8C6` | meta on dark | ≈ 8.7:1 (AAA) |
| `--color-on-dark-faint` | `#8B8AA0` | decorative numbers on dark (large only) | ≈ 4.6:1 (AA) |
| `--color-rule-on-dark` | `rgb(244 243 239 / .16)` | hairlines on dark | |
| `--color-petrol` | `#0F6E6A` | secondary colour, **rare** — relational node/marker on paper | ≈ 5.3:1 (AA) |
| `--color-node-on-dark` | `#4FD0C4` | relational node/marker on dark | ≈ 9.8:1 (AAA) |

Never used as a category taxonomy — Skills, Technologies and focus areas are
never colour-coded per item (no "Python = yellow").

### Surface scopes — not a component, an attribute

`data-surface="tonal" | "dark"` on a `<Section>` / `<footer>` (both already
full-bleed) repaints the shared vars for everything inside — `text-fg`,
`text-fg-muted`, `border-border`, `text-accent`, `.u-label`, `.u-connect` all
keep working with **zero per-component change**:

```css
[data-surface="dark"] {
  --surface-bg: var(--color-surface-dark);
  --color-fg: var(--color-on-dark);
  --color-fg-muted: var(--color-on-dark-muted);
  --color-accent: var(--color-accent-on-dark);
  /* … */
}
```

No card, no radius, no gradient — a plane, edge-to-edge inside the section it
already was. `Grid`/`Card` are not reintroduced (removed in v2, stay removed).

### Where each surface appears

| Surface | Where |
| --- | --- |
| paper (default) | everywhere else — the baseline |
| tonal (`--color-bg-tonal`) | Hero right column (relational axes) · Home `NextStep` · Knowledge Detail header |
| dark (`--color-surface-dark`) | Home `FeaturedProjects` (the project chapter) · Case study opening (`ProjectHeader`) · Knowledge Hub "Competências" · `SiteFooter` |

Chromatic rhythm on the Home: paper (Hero, tonal accent) → paper (Focus) →
**dark** (Project) → paper (Career) → **tonal** (Explorar) → **dark** (Footer).
The case study: **dark** opening → paper documentation (§16's contrast).
Knowledge: paper header → **dark** Competências chapter → paper Tecnologias
(kept recessive — "meios, não o assunto").

### Relational colour

- Relation *lines* (`.u-connect` elbow, nav underline, spine rules) → indigo
  (`--color-accent`, luminous on dark).
- Relation *nodes* (the featured-skill dot, the footer marker) → petrol
  (`--color-petrol` / `--color-node-on-dark`) — rare, only markers.
- The current experience phase gets an indigo top-rule and an indigo year
  (`isCurrent()`), not a "current" badge — colour marks the phase, not a chip.
- `/projects` rows reveal a tonal background on hover/focus
  (`hover:bg-bg-tonal`), CSS-only.

### Correct vs incorrect

✅ A `<Section data-surface="dark">` wrapping an unchanged component tree.
✅ One indigo accent, rare petrol markers, tonal panels bounded by a `Container`.
❌ `rounded-xl bg-indigo-50` cards.
❌ A colour per Skill/Technology/focus-area.
❌ Gradients, glow, neon, hue-rotation, an animated background.

### Accessibility

Every new pairing checked against WCAG (table above); dark scope also
redefines `:focus-visible`'s outline colour so focus rings stay visible on
`--color-surface-dark`. No new JS — the whole system is `[data-surface]` + CSS
variable cascade.
