import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Two families only (Design System §6). Both self-hosted by `next/font` at
 * build time — no external runtime dependency. Exposed as CSS variables and
 * wired into Tailwind's `--font-sans` / `--font-mono` in `globals.css`.
 */
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
