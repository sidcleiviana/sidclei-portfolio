import type { Metadata } from "next";
import { Suspense } from "react";

import { toGraphData } from "@/domain/knowledgeGraph";
import { KnowledgeMap } from "@/features/knowledge/map/KnowledgeMap";
import { getKnowledgeMap } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Mapa de Conhecimento",
  description:
    "Como projetos, experiências, competências e tecnologias de Sidclei Viana se conectam — uma visualização das relações reais do portfólio.",
  alternates: { canonical: "/conhecimento/mapa" },
};

export default async function KnowledgeMapPage() {
  const data = await getKnowledgeMap();
  const graph = toGraphData(data);

  // KnowledgeMap reads the `?node` deep link via useSearchParams.
  return (
    <Suspense fallback={null}>
      <KnowledgeMap graph={graph} />
    </Suspense>
  );
}
