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
