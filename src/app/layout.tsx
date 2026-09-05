import type { Metadata } from "next";

import { fontDisplay, fontMono, fontSans } from "@/styles/fonts";
import { siteUrl } from "@/sanity/env";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // The professional positioning is not hardcoded here — the `(site)` layout
  // derives the titled default from the published `profile.headline`. This
  // neutral default is the outage/other-route fallback only.
  title: {
    default: "Sidclei Viana",
    template: "%s — Sidclei Viana",
  },
  description:
    "Portfólio profissional de Sidclei Viana: trajetória, competências, projetos e evidências.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
