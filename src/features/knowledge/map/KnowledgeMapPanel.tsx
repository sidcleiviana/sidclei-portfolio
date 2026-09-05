"use client";

import Link from "next/link";

import {
  connectedIds,
  type GraphData,
  type GraphNode,
} from "@/domain/knowledgeGraph";

const TYPE_LABEL: Record<GraphNode["type"], string> = {
  experience: "Experiência",
  project: "Projeto",
  skill: "Competência",
  technology: "Tecnologia",
};
const OPEN_LABEL: Record<GraphNode["type"], string> = {
  experience: "Ver experiência",
  project: "Abrir projeto",
  skill: "Abrir competência",
  technology: "Abrir tecnologia",
};

function RelGroup({
  label,
  nodes,
  onPick,
}: {
  label: string;
  nodes: GraphNode[];
  onPick: (n: GraphNode) => void;
}) {
  if (!nodes.length) return null;
  return (
    <div>
      <p className="u-label mb-2">{label}</p>
      <ul className="flex flex-col gap-1">
        {nodes.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => onPick(n)}
              className="font-display hover:text-accent rounded-sm text-left text-sm font-bold"
            >
              {n.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The contextual panel. Reuses the site vocabulary — Apareceu em / Demonstrado
 * em / Relacionado a — and, for a skill, the technologies present *in those
 * contexts*, explicitly labelled as derived and never drawn as an edge (§4,
 * §13, §18). Relation items re-focus the map; the footer link navigates.
 */
export function KnowledgeMapPanel({
  graph,
  selected,
  onPick,
}: {
  graph: GraphData;
  selected: GraphNode | null;
  onPick: (n: GraphNode) => void;
}) {
  if (!selected) {
    return (
      <div className="u-fade">
        <p className="u-label">Mapa de Conhecimento</p>
        <p className="text-fg-muted mt-3 text-md text-pretty">
          Selecione um ponto para explorar as conexões — experiências, projetos,
          competências e tecnologias, ligados apenas pelas relações reais do
          portfólio.
        </p>
      </div>
    );
  }

  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  const direct = [...connectedIds(graph, selected.id)]
    .map((id) => byId.get(id))
    .filter((n): n is GraphNode => Boolean(n));

  const of = (t: GraphNode["type"]) => direct.filter((n) => n.type === t);
  const experiences = of("experience");
  const projects = of("project");
  const skills = of("skill");
  const technologies = of("technology");

  // derived: technologies in the same contexts as this skill (never an edge)
  const derivedTech: GraphNode[] = [];
  if (selected.type === "skill") {
    const ctxIds = new Set([...experiences, ...projects].map((n) => n.id));
    const seen = new Set<string>();
    for (const e of graph.edges) {
      if (
        (e.type === "experience_technology" || e.type === "project_technology") &&
        ctxIds.has(e.source)
      ) {
        const tech = byId.get(e.target);
        if (tech && !seen.has(tech.id)) {
          seen.add(tech.id);
          derivedTech.push(tech);
        }
      }
    }
  }

  return (
    <div className="u-stagger" key={selected.id}>
      <p className="u-label">
        {TYPE_LABEL[selected.type]}
        {selected.sublabel ? (
          <span className="text-fg-faint"> · {selected.sublabel}</span>
        ) : null}
      </p>
      <h2 className="font-display mt-2 text-xl font-extrabold sm:text-2xl">
        {selected.label}
      </h2>

      <div className="mt-6 flex flex-col gap-5">
        {selected.type === "skill" || selected.type === "technology" ? (
          <>
            <RelGroup label="Apareceu em" nodes={experiences} onPick={onPick} />
            <RelGroup label="Demonstrado em" nodes={projects} onPick={onPick} />
          </>
        ) : null}

        {selected.type === "experience" ? (
          <>
            <RelGroup label="Competências" nodes={skills} onPick={onPick} />
            <RelGroup label="Tecnologias" nodes={technologies} onPick={onPick} />
            <RelGroup label="Projetos" nodes={projects} onPick={onPick} />
          </>
        ) : null}

        {selected.type === "project" ? (
          <>
            <RelGroup
              label="Relacionado à experiência"
              nodes={experiences}
              onPick={onPick}
            />
            <RelGroup label="Competências" nodes={skills} onPick={onPick} />
            <RelGroup label="Tecnologias" nodes={technologies} onPick={onPick} />
          </>
        ) : null}

        {selected.type === "skill" && derivedTech.length ? (
          <div>
            <p className="u-label mb-1.5">
              Tecnologias presentes nesses contextos
            </p>
            <p className="text-fg-faint mb-2 text-xs leading-snug">
              Ferramentas usadas nas experiências e projetos acima — contexto
              derivado, não uma relação direta da competência.
            </p>
            <p className="text-fg-muted font-mono text-xs leading-relaxed">
              {derivedTech.map((t) => t.label).join(" · ")}
            </p>
          </div>
        ) : null}

        {!direct.length ? (
          <p className="text-fg-faint text-sm">Sem conexões neste filtro.</p>
        ) : null}
      </div>

      {selected.href ? (
        <Link
          href={selected.href}
          className="u-label text-accent mt-6 inline-flex items-center gap-1.5 rounded-sm hover:text-[var(--color-accent-strong)]"
        >
          {OPEN_LABEL[selected.type]} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
