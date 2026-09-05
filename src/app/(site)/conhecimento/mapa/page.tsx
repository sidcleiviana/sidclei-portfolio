import type { Metadata } from "next";

import { toGraphData } from "@/domain/knowledgeGraph";
import { KnowledgeMap } from "@/features/knowledge/map/KnowledgeMap";
import { getKnowledgeMap } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Mapa de Conhecimento",
  description:
    "Como projetos, experiências, competências e tecnologias de Sidclei Viana se conectam — uma visualização das relações reais do portfólio.",
  alternates: { canonical: "/conhecimento/mapa" },
};

export default async function KnowledgeMapPage({
  searchParams,
}: {
  searchParams: Promise<{ node?: string | string[] }>;
}) {
  const data = await getKnowledgeMap();
  const graph = toGraphData(data);

  // The `?node=type:slug` deep link is read on the server so the whole map —
  // including the textual relation list — renders without client JS.
  const raw = (await searchParams).node;
  const initialNode = Array.isArray(raw) ? raw[0] : raw;

  return <KnowledgeMap graph={graph} initialNode={initialNode ?? null} />;
}
