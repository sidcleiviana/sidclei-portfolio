"use client";

import Link from "next/link";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
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
const GROUP_ORDER: GraphNode["type"][] = [
  "experience",
  "project",
  "skill",
  "technology",
];
const GROUP_LABEL: Record<GraphNode["type"], string> = {
  experience: "Experiências",
  project: "Projetos",
  skill: "Competências",
  technology: "Tecnologias",
};

/**
 * The mobile explorer (§50–54). Not the desktop graph shrunk: a focused
 * entity, its direct relations on indented rails with small nodes, and tap on
 * any relation re-focuses it — chained exploration. `← voltar` walks the
 * shallow selection history.
 */
export function KnowledgeMapExplorer({
  view,
  selected,
  onPick,
  canGoBack,
  onBack,
}: {
  view: GraphData;
  selected: GraphNode | null;
  onPick: (n: GraphNode) => void;
  canGoBack: boolean;
  onBack: () => void;
}) {
  const byId = new Map(view.nodes.map((n) => [n.id, n]));

  if (!selected) {
    const groups = GROUP_ORDER.map((t) => ({
      type: t,
      nodes: view.nodes.filter((n) => n.type === t),
    })).filter((g) => g.nodes.length);
    return (
      <div>
        <p className="text-fg-muted text-sm text-pretty">
          Toque em um ponto para ver com o que ele se conecta. Cada relação
          leva à próxima.
        </p>
        <div className="mt-6 flex flex-col gap-6">
          {groups.map((g) => (
            <div key={g.type}>
              <p className="u-label mb-2">{GROUP_LABEL[g.type]}</p>
              <ul className="flex flex-wrap gap-2">
                {g.nodes.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => onPick(n)}
                      className="border-border bg-surface text-fg-muted hover:text-fg rounded-[var(--radius-sm)] border px-3 py-1.5 text-left font-mono text-xs"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const direct = [...connectedIds(view, selected.id)]
    .map((id) => byId.get(id))
    .filter((n): n is GraphNode => Boolean(n));
  const of = (t: GraphNode["type"]) => direct.filter((n) => n.type === t);

  // derived tech for a skill (never an edge)
  const derivedTech: string[] = [];
  if (selected.type === "skill") {
    const ctx = new Set([...of("experience"), ...of("project")].map((n) => n.id));
    const seen = new Set<string>();
    for (const e of view.edges) {
      if (
        (e.type === "experience_technology" || e.type === "project_technology") &&
        ctx.has(e.source)
      ) {
        const t = byId.get(e.target);
        if (t && !seen.has(t.id)) {
          seen.add(t.id);
          derivedTech.push(t.label);
        }
      }
    }
  }

  return (
    <div>
      {canGoBack ? (
        <button
          type="button"
          onClick={onBack}
          className="u-label hover:text-fg mb-4 inline-flex items-center gap-1.5 rounded-sm"
        >
          <span aria-hidden>←</span> Voltar
        </button>
      ) : null}

      <div className="relative pl-8">
        <AgentAnchor name="map-node" active className="absolute top-1.5 left-1" />
        <p className="u-label">
          {TYPE_LABEL[selected.type]}
          {selected.sublabel ? (
            <span className="text-fg-faint"> · {selected.sublabel}</span>
          ) : null}
        </p>
        <h2 className="font-display mt-1.5 text-xl font-extrabold">
          {selected.label}
        </h2>
      </div>

      <p className="u-label text-fg-faint mt-6 mb-3">Relacionada diretamente a</p>
      <div className="border-border flex flex-col gap-5 border-l pl-4">
        {GROUP_ORDER.map((t) => {
          const nodes = of(t);
          if (!nodes.length) return null;
          return (
            <div key={t}>
              <p className="u-label mb-1.5">{GROUP_LABEL[t]}</p>
              <ul className="flex flex-col gap-1.5">
                {nodes.map((n) => (
                  <li key={n.id} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="bg-[var(--color-border-strong)] h-1.5 w-1.5 shrink-0 rounded-full"
                    />
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
        })}
        {!direct.length ? (
          <p className="text-fg-faint text-sm">Sem conexões neste filtro.</p>
        ) : null}
      </div>

      {selected.type === "skill" && derivedTech.length ? (
        <div className="mt-6">
          <p className="u-label mb-1.5">Tecnologias presentes nesses contextos</p>
          <p className="text-fg-faint mb-2 text-xs leading-snug">
            Usadas nos contextos acima — não uma relação direta da competência.
          </p>
          <p className="text-fg-muted font-mono text-xs leading-relaxed">
            {derivedTech.join(" · ")}
          </p>
        </div>
      ) : null}

      {selected.href ? (
        <Link
          href={selected.href}
          className="u-label text-accent mt-6 inline-flex items-center gap-1.5 rounded-sm"
        >
          Abrir detalhe <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
