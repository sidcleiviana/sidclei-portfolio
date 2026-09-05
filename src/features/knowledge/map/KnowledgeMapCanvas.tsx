"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  computeLayout,
  type GraphData,
  type GraphNode,
  type NodePosition,
} from "@/domain/knowledgeGraph";

import { KnowledgeMapEdges } from "./KnowledgeMapEdges";
import { KnowledgeMapNode, type NodeEmphasis } from "./KnowledgeMapNode";

/**
 * The desktop graph — a positioned HTML node layer over an SVG edge layer.
 * Positions come from the pure `computeLayout` on the measured canvas size
 * (deterministic — §D, §2); recomputed only on a meaningful resize. Nodes fade
 * in once measured, so there is no hydration mismatch (§82). Focus is
 * dim-in-place: nothing moves (§2).
 */
export function KnowledgeMapCanvas({
  view,
  selected,
  hovered,
  activeConnected,
  activeEdges,
  onSelect,
  onHover,
}: {
  view: GraphData;
  selected: GraphNode | null;
  hovered: string | null;
  activeConnected: ReadonlySet<string>;
  activeEdges: ReadonlySet<string>;
  onSelect: (n: GraphNode) => void;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [positions, setPositions] = useState<Map<string, NodePosition>>(
    new Map()
  );

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize((prev) =>
        Math.abs(prev.width - r.width) > 24 || Math.abs(prev.height - r.height) > 24
          ? { width: r.width, height: r.height }
          : prev
      );
    };
    measure();
    let t = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(measure, 150);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (size.width > 0) setPositions(computeLayout(view.nodes, size));
  }, [view.nodes, size]);

  const activeId = selected?.id ?? hovered;

  const emphasisOf = (n: GraphNode): NodeEmphasis => {
    if (!activeId) return "base";
    if (n.id === activeId) return "focus";
    if (activeConnected.has(n.id)) return "connected";
    return "dim";
  };

  return (
    <div
      ref={ref}
      className="border-border relative min-h-[26rem] overflow-hidden rounded-[var(--radius)] border bg-[var(--color-navy)]"
      style={{ height: "min(70vh, 42rem)" }}
    >
      {view.nodes.length === 0 ? (
        <p className="text-fg-muted absolute inset-0 grid place-items-center font-mono text-sm">
          Nenhuma relação neste filtro.
        </p>
      ) : (
        <>
          <KnowledgeMapEdges
            view={view}
            positions={positions}
            size={size}
            activeEdges={activeEdges}
            hasActive={Boolean(activeId)}
          />
          {view.nodes.map((n) => (
            <KnowledgeMapNode
              key={n.id}
              node={n}
              pos={positions.get(n.id)}
              emphasis={emphasisOf(n)}
              selected={selected?.id === n.id}
              onSelect={onSelect}
              onHover={onHover}
            />
          ))}
        </>
      )}
    </div>
  );
}
