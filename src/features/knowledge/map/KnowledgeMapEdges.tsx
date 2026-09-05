"use client";

import type {
  GraphData,
  NodePosition,
} from "@/domain/knowledgeGraph";

/**
 * Edges as a single SVG of thin `<path>`s (§29, §36). In overview every edge
 * is barely-there (§1); the active node's edges lift to indigo, the rest
 * recede further. Purely decorative — `aria-hidden`; meaning lives in the
 * panel and the text map.
 */
export function KnowledgeMapEdges({
  view,
  positions,
  size,
  activeEdges,
  hasActive,
}: {
  view: GraphData;
  positions: Map<string, NodePosition>;
  size: { width: number; height: number };
  activeEdges: ReadonlySet<string>;
  hasActive: boolean;
}) {
  if (!size.width || positions.size === 0) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
    >
      {view.edges.map((e) => {
        const a = positions.get(e.source);
        const b = positions.get(e.target);
        if (!a || !b) return null;
        const active = activeEdges.has(e.id);
        const my = (a.y + b.y) / 2;
        const d = `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
        const opacity = active ? 0.85 : hasActive ? 0.04 : 0.1;
        return (
          <path
            key={e.id}
            d={d}
            fill="none"
            stroke={
              active ? "var(--color-accent)" : "var(--color-border-strong)"
            }
            strokeWidth={active ? 1.4 : 1}
            style={{ opacity, transition: "opacity 200ms var(--ease-out)" }}
          />
        );
      })}
    </svg>
  );
}
