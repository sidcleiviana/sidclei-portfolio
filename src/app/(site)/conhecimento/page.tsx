import type { Metadata } from "next";

import { KnowledgeHub } from "@/features/knowledge/KnowledgeHub";
import { getKnowledgeHub } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Conhecimento",
  description:
    "Competências e tecnologias demonstradas ao longo da trajetória profissional de Sidclei Viana, com os contextos reais em que apareceram.",
  alternates: { canonical: "/conhecimento" },
};

export default async function KnowledgePage() {
  const { skills, technologies } = await getKnowledgeHub();
  return <KnowledgeHub skills={skills} technologies={technologies} />;
}
