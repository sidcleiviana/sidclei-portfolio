import type { Metadata } from "next";

import { siteUrl } from "@/sanity/env";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sidclei Viana — Desenvolvedor de Software",
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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
