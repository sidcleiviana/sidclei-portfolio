"use client";

import { AgentAnchor } from "@/components/agent/AgentAnchor";
import type { GraphNode, NodePosition } from "@/domain/knowledgeGraph";

export type NodeEmphasis = "base" | "focus" | "connected" | "dim";

const TYPE_LABEL: Record<GraphNode["type"], string> = {
  experience: "experiência",
  project: "projeto",
  skill: "competência",
  technology: "tecnologia",
};

/** Shape/size per type (§59) — form, not four saturated colours. */
const SHAPE: Record<GraphNode["type"], string> = {
  project:
    "rounded-[var(--radius)] px-4 py-2.5 text-sm font-bold font-display max-w-[15rem]",
  experience:
    "rounded-full px-3.5 py-1.5 text-xs font-semibold font-display max-w-[13rem]",
  skill: "rounded-[var(--radius-sm)] px-3 py-1.5 text-xs font-medium max-w-[11rem]",
  technology:
    "rounded-[var(--radius-sm)] px-2.5 py-1 text-[0.7rem] font-mono max-w-[9rem]",
};

export function KnowledgeMapNode({
  node,
  pos,
  emphasis,
  selected,
  onSelect,
  onHover,
}: {
  node: GraphNode;
  pos: NodePosition | undefined;
  emphasis: NodeEmphasis;
  selected: boolean;
  onSelect: (n: GraphNode) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${node.label}, ${TYPE_LABEL[node.type]}`}
      aria-pressed={selected}
      data-emphasis={emphasis}
      onClick={() => onSelect(node)}
      onPointerEnter={() => onHover(node.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      className={`km-node border-border bg-surface text-fg absolute border text-center leading-tight whitespace-normal ${SHAPE[node.type]}`}
      style={
        pos
          ? { left: `${pos.x}px`, top: `${pos.y}px` }
          : { left: "50%", top: "50%", opacity: 0 }
      }
    >
      {node.featured ? (
        <span
          aria-hidden
          className="bg-accent absolute top-1 right-1 h-1 w-1 rounded-full"
        />
      ) : null}
      <span className="line-clamp-2">{node.label}</span>
      {selected ? <AgentAnchor name="map-node" active className="absolute -top-3 left-1/2" /> : null}
    </button>
  );
}
