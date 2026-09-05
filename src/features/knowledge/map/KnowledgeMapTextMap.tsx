"use client";

import Link from "next/link";

import {
  connectedIds,
  type GraphData,
  type GraphNode,
} from "@/domain/knowledgeGraph";

const TYPE_LABEL: Record<GraphNode["type"], string> = {
  experience: "experiência",
  project: "projeto",
  skill: "competência",
  technology: "tecnologia",
};

/**
 * The accessible relational fallback (§75, §76). A real, always-present list of
 * every node and its direct connections as links — a screen-reader user learns
 * name, type, connections and detail route without interpreting any SVG. Kept
 * quiet visually, not `display:none`.
 */
export function KnowledgeMapTextMap({
  graph,
  onPick,
}: {
  graph: GraphData;
  onPick: (n: GraphNode) => void;
}) {
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  const order: GraphNode["type"][] = [
    "experience",
    "project",
    "skill",
    "technology",
  ];
  const nodes = [...graph.nodes].sort(
    (a, b) =>
      order.indexOf(a.type) - order.indexOf(b.type) ||
      a.label.localeCompare(b.label, "pt")
  );

  return (
    <nav
      aria-label="Relações em lista"
      className="border-border text-fg-muted mt-10 border-t pt-6 text-sm"
    >
      <h2 className="u-label mb-3">Todas as relações</h2>
      <ul className="flex flex-col gap-4">
        {nodes.map((n) => {
          const rel = [...connectedIds(graph, n.id)]
            .map((id) => byId.get(id))
            .filter((x): x is GraphNode => Boolean(x));
          return (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => onPick(n)}
                className="font-display hover:text-accent rounded-sm text-left font-bold"
              >
                {n.label}
              </button>
              <span className="text-fg-faint"> — {TYPE_LABEL[n.type]}</span>
              {n.href ? (
                <>
                  {" · "}
                  <Link href={n.href} className="text-accent rounded-sm">
                    abrir
                  </Link>
                </>
              ) : null}
              {rel.length ? (
                <div className="text-fg-faint mt-1 text-xs">
                  conecta a:{" "}
                  {rel.map((r, i) => (
                    <span key={r.id}>
                      {i > 0 ? ", " : ""}
                      <button
                        type="button"
                        onClick={() => onPick(r)}
                        className="hover:text-fg rounded-sm underline decoration-dotted"
                      >
                        {r.label}
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
