"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
  applyFilter,
  connectedIds,
  edgesOf,
  type GraphData,
  type GraphNode,
  type GraphNodeType,
  parseNodeKey,
} from "@/domain/knowledgeGraph";

export type MapState = {
  /** the fixed selection (click / Enter); null = overview */
  selected: GraphNode | null;
  /** the transient preview (hover / focus); does not change `selected` */
  hovered: string | null;
  hiddenTypes: ReadonlySet<GraphNodeType>;
  /** graph after the type filter */
  view: GraphData;
  /** ids one edge away from the active node (selected, else hovered) */
  activeConnected: ReadonlySet<string>;
  /** edge ids one edge away from the active node */
  activeEdges: ReadonlySet<string>;
  select: (node: GraphNode | null) => void;
  setHover: (id: string | null) => void;
  toggleType: (t: GraphNodeType) => void;
  reset: () => void;
  /** mobile explorer: shallow history of visited selections */
  canGoBack: boolean;
  back: () => void;
};

function findByKey(graph: GraphData, key: string | null): GraphNode | null {
  const parsed = parseNodeKey(key);
  if (!parsed) return null;
  return (
    graph.nodes.find(
      (n) => n.type === parsed.type && n.key === `${parsed.type}:${parsed.slug}`
    ) ?? null
  );
}

/**
 * All map interaction state, local to the route (§39, §70). The fixed
 * selection is mirrored to `?node=type:slug` via `router.replace`
 * (one entry per explicit selection, never per hover). Hover is preview only.
 * The initial selection comes from the server (page `searchParams`) so the
 * deep link never forces client-side rendering of the route.
 */
export function useKnowledgeMap(
  graph: GraphData,
  initialNode: string | null
): MapState {
  const router = useRouter();
  const pathname = usePathname();

  const initialKey = findByKey(graph, initialNode)?.key ?? null;
  const [selectedKey, setSelectedKey] = useState<string | null>(initialKey);
  const [hovered, setHovered] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(
    initialKey ? [initialKey] : []
  );
  const [hiddenTypes, setHiddenTypes] = useState<ReadonlySet<GraphNodeType>>(
    () => new Set()
  );

  const view = useMemo(
    () => applyFilter(graph, hiddenTypes),
    [graph, hiddenTypes]
  );

  const selected = useMemo(
    () => (selectedKey ? findByKey(view, selectedKey) : null),
    [view, selectedKey]
  );

  const activeId = selected?.id ?? hovered;
  const activeConnected = useMemo(
    () => connectedIds(view, activeId),
    [view, activeId]
  );
  const activeEdges = useMemo(
    () => new Set(edgesOf(view, activeId).map((e) => e.id)),
    [view, activeId]
  );

  const syncUrl = useCallback(
    (key: string | null) => {
      router.replace(key ? `${pathname}?node=${key}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router]
  );

  const select = useCallback(
    (node: GraphNode | null) => {
      const key = node?.key ?? null;
      setSelectedKey(key);
      setHovered(null);
      setHistory((h) =>
        key && h[h.length - 1] !== key ? [...h, key] : key ? h : []
      );
      syncUrl(key);
    },
    [syncUrl]
  );

  const reset = useCallback(() => {
    setSelectedKey(null);
    setHovered(null);
    setHistory([]);
    syncUrl(null);
  }, [syncUrl]);

  const back = useCallback(() => {
    setHistory((h) => {
      const next = h.slice(0, -1);
      const key = next[next.length - 1] ?? null;
      setSelectedKey(key);
      setHovered(null);
      syncUrl(key);
      return next;
    });
  }, [syncUrl]);

  const toggleType = useCallback((t: GraphNodeType) => {
    setHiddenTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }, []);

  return {
    selected,
    hovered,
    hiddenTypes,
    view,
    activeConnected,
    activeEdges,
    select,
    setHover: setHovered,
    toggleType,
    reset,
    canGoBack: history.length > 1,
    back,
  };
}
