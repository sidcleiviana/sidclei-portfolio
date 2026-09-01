import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";

/**
 * Three faces, each with one job (Design System v2 — Sprint 7 §6, §44):
 *
 * - **Newsreader** — DISPLAY. A literary serif with optical sizing; carries the
 *   editorial voice in hero and chapter headings. Never body copy.
 * - **Inter** — BODY & UI. Neutral, highly legible at every size.
 * - **JetBrains Mono** — TECHNICAL. Section numbers, category labels, technology
 *   names, metadata — the "structure" language.
 *
 * All self-hosted by `next/font` at build time; no external runtime request.
 */
export const fontDisplay = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-display-src",
});

export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-src",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-src",
});
