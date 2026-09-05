"use client";

import { useEffect, useRef, useState } from "react";

import { AgentAnchor, repositionAgent } from "@/components/agent/AgentAnchor";
import { Container, Kicker, Section } from "@/components/ui";
import type { GraphData } from "@/domain/knowledgeGraph";

import { KnowledgeMapCanvas } from "./KnowledgeMapCanvas";
import { KnowledgeMapExplorer } from "./KnowledgeMapExplorer";
import { KnowledgeMapFilters } from "./KnowledgeMapFilters";
import { KnowledgeMapPanel } from "./KnowledgeMapPanel";
import { KnowledgeMapTextMap } from "./KnowledgeMapTextMap";
import { useKnowledgeMap } from "./useKnowledgeMap";

/** The route-local island (§39). Desktop = structured graph + panel; mobile =
 *  the explorer. A textual relation list is always present for a11y (§75). */
export function KnowledgeMap({ graph }: { graph: GraphData }) {
  const map = useKnowledgeMap(graph);
  const [isDesktop, setIsDesktop] = useState(true);
  const firstRender = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Living Agent: move to the selected node (once, on change) — not on hover.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    repositionAgent();
  }, [map.selected?.id]);

  return (
    <Section spacing="lg" aria-labelledby="map-title">
      <Container size="wide">
        <nav aria-label="Trilha de navegação" className="mb-4">
          <ol className="u-label text-fg-muted flex flex-wrap items-center gap-2">
            <li>
              <a href="/conhecimento" className="hover:text-fg rounded-sm">
                Conhecimento
              </a>
            </li>
            <li aria-hidden className="text-fg-faint">
              /
            </li>
            <li>Mapa</li>
          </ol>
        </nav>

        <Kicker>Mapa de Conhecimento</Kicker>
        <h1
          id="map-title"
          className="font-display mt-3 text-2xl font-extrabold sm:text-3xl"
        >
          Como tudo isso se conecta
        </h1>
        <p className="text-fg-muted mt-3 max-w-[56ch] text-md text-pretty">
          Experiências, projetos, competências e tecnologias — ligados apenas
          pelas relações reais do portfólio. Selecione um ponto para focar suas
          conexões diretas.
        </p>

        <div className="mt-6">
          <KnowledgeMapFilters
            hidden={map.hiddenTypes}
            onToggle={map.toggleType}
            onReset={map.reset}
            showReset={Boolean(map.selected)}
          />
        </div>

        {isDesktop ? (
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <KnowledgeMapCanvas
              view={map.view}
              selected={map.selected}
              hovered={map.hovered}
              activeConnected={map.activeConnected}
              activeEdges={map.activeEdges}
              onSelect={map.select}
              onHover={map.setHover}
            />
            <div className="relative">
              {!map.selected ? (
                <AgentAnchor
                  name="map-overview"
                  active
                  className="absolute -top-2 -left-6"
                />
              ) : null}
              <KnowledgeMapPanel
                graph={map.view}
                selected={map.selected}
                onPick={map.select}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <KnowledgeMapExplorer
              view={map.view}
              selected={map.selected}
              onPick={map.select}
              canGoBack={map.canGoBack}
              onBack={map.back}
            />
          </div>
        )}

        <KnowledgeMapTextMap graph={graph} onPick={map.select} />
      </Container>
    </Section>
  );
}
