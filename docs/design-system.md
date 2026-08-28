# Design System — foundation (Sprint 1)

> The code is the source of truth. This page states the intent so future
> Sprints build on it instead of reinventing it. Tokens live in
> `src/styles/globals.css` (`@theme`); primitives in `src/components/ui`.

## Principles

- **Information before decoration.** Type, spacing and hierarchy do the work;
  motion and colour only clarify.
- **One light direction, done well.** No theme toggle in Sprint 1; tokens are
  structured so a future `:root[data-theme="dark"]` swap needs no component
  changes. `color-scheme: light` is set explicitly.
- **Editorial-technical, not SaaS.** Warm near-white paper, graphite ink, a
  single restrained indigo accent, a mono face for technical labels.
- **Server-first.** Everything is a Server Component except `MobileNav`
  (disclosure state). No animation library — CSS covers the interaction language.

## Tokens (`@theme` in `globals.css`)

| Group | Tokens |
| --- | --- |
| Colour | `--color-bg` `--color-bg-subtle` `--color-surface` `--color-fg` `--color-fg-muted` `--color-border` `--color-border-strong` `--color-accent` `--color-accent-fg` `--color-accent-subtle` `--color-accent-strong` `--color-positive` |
| Type | `--font-sans` (Inter) · `--font-mono` (JetBrains Mono) · `--text-xs…--text-4xl` (each with a paired `--line-height`) |
| Radius | `--radius-sm` `.375rem` · `--radius-md` `.625rem` · `--radius-lg` `1rem` |
| Elevation | `--shadow-sm` `--shadow-md` (both barely-there; borders carry structure) |
| Layout | `--container-max` `72rem` · `--container-wide` `52rem` · `--container-prose` `42rem` |
| Motion | `--ease-out` `--ease-in-out` · `--dur-fast` `120ms` · `--dur` `200ms` · `--dur-slow` `380ms` |

Tailwind v4 generates the utilities (`bg-bg`, `text-fg-muted`, `border-border`,
`rounded-md`, `text-2xl`, `font-mono`, …). Components never hardcode a colour,
radius or timing.

## Typography

- **Inter** (`next/font/google`, self-hosted, `display: swap`) — display + body.
  Headings: weight 600, `letter-spacing: -0.02em`, `text-wrap: balance`.
- **JetBrains Mono** (weights 400/500) — eyebrows, code, technical labels, the
  wordmark. Never for body copy.
- Scale is a tuned ~1.25 progression; line-height loosens for body, tightens for
  display. Reading measure is `--container-prose` (~68 characters).

## Layout primitives (`src/components/ui`)

`Container` (size: default | wide | prose) · `Section` (spacing: sm | md | lg) ·
`Stack` (vertical gap) · `Cluster` (wrapping horizontal group) · `Grid`
(auto-fill, `minCol`) · `Divider`. Pages are a stack of `Section`s inside a
`Container`; spacing comes from these, not ad-hoc margins.

## Components

`Button` (real `<button>`, variants primary | secondary | ghost, sizes sm | md) ·
`ButtonLink` (same look, renders `next/link`) · `TextLink` (inline; http(s) →
new tab + `rel="noopener noreferrer"` + SR hint) · `Badge` (neutral | accent |
outline, optional mono) · `Card` (surface panel; `interactive` adds a hover cue
and moves the focus ring to the card for stretched-link patterns) ·
`Eyebrow` + `SectionHeading`.

## Interaction language

- **Hover** — colour / border / shadow shifts only, `--dur-fast`.
- **Focus** — `:focus-visible` → 2px accent outline, 2px offset, everywhere
  (keyboard only). Stretched-link cards suppress the link outline and show the
  ring on the card instead.
- **Pressed** — buttons nudge `translateY(1px)`.
- **Card lift** — `interactive` cards rise `2px` + gain `--shadow-md` on hover;
  disabled under `motion-reduce`.
- **Entrance** — one opt-in cue: `[data-animate="rise"]` (fade + 12px rise,
  `--dur-slow`), used on the hero and detail header. Never carries information.
- No parallax, no scroll-hijack, no custom cursor, no particles, no long
  animations (§11).

## Reduced motion

`@media (prefers-reduced-motion: reduce)` zeroes all animation/transition
durations and forces `[data-animate]` to its final state (opacity 1, no
transform). The product is fully usable and legible with zero motion.

## Accessibility

- Skip link (`.skip-link`) → `#conteudo`, visible on focus.
- Landmarks: `header` / `nav[aria-label]` / `main#conteudo` / `footer`.
- Heading hierarchy: one `h1` per page; sections use `aria-labelledby`.
- `MobileNav` is a proper disclosure: `aria-expanded`, `aria-controls`, Escape
  closes and restores focus to the trigger, outside-pointer closes,
  `aria-current="page"` on the active link.
- No `div`-as-button; `Button` is `<button>`, links are `<a>`/`<Link>`.
- Touch targets ≥ 40px (`h-10`/`h-11` controls, `py-2.5` nav rows).

## Responsive

Tailwind breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
Navigation switches from inline to `MobileNav` at `md`. `Grid` reflows by column
count, not by shrinking. Verified at 375 / 768 / 1280 / 1440.

## Not in scope (Sprint 1)

Dark-mode toggle, Knowledge Graph, search, filters, timeline, skill matrix,
per-block visual redesign, motion library, new content.
