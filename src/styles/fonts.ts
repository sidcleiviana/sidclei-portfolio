import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Three faces, each with one job ("Modular Surfaces" direction):
 *
 * - **Hanken Grotesk** — DISPLAY & INTERFACE. A modern technical grotesk;
 *   carries titles, module headings and interface labels. Not body copy.
 * - **Inter** — BODY & UI text. Neutral, highly legible at every size.
 * - **JetBrains Mono** — METADATA. Status, category labels, technology names,
 *   periods — the "structure" language.
 *
 * Newsreader (the old editorial serif) was dropped: it read as historical
 * obligation once the identity stopped being editorial.
 *
 * All self-hosted by `next/font` at build time; no external runtime request.
 */
export const fontDisplay = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
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
  weight: ["400", "500", "600"],
  variable: "--font-mono-src",
});
