import type { KnowledgeMapData } from "@/sanity/types";

import { isPubliclyVisible } from "./visibility";
import { slugify } from "./experienceAnchor";

/* ==========================================================================
   Knowledge Map — the graph adapter (Sprint 9 §C, §40, §41).
   Turns the raw CMS projection into { nodes, edges }. Only the FIVE real
   edge types exist; a `skill_technology` edge is NEVER produced, even when a
   skill and a technology co-occur in the same experience or project (§3, §42).
   Every edge needs both endpoints present in the node set, so a
   private/unpublished project (excluded from nodes) can never contribute one.
   ========================================================================== */

export type GraphNodeType = "experience" | "project" | "skill" | "technology";

export type GraphEdgeType =
  | "experience_skill"
  | "experience_technology"
  | "project_skill"
  | "project_technology"
  | "project_experience";

/** The five permitted edge types, as a runtime list (used by tests). */
export const EDGE_TYPES: readonly GraphEdgeType[] = [
  "experience_skill",
  "experience_technology",
  "project_skill",
  "project_technology",
  "project_experience",
] as const;

export type GraphNode = {
  /** Internal Sanity `_id` — used only for edge wiring. */
  id: string;
  /** Stable public key `type:slug` — used in the URL and for deep links. */
  key: string;
  type: GraphNodeType;
  label: string;
  sublabel?: string;
  /** Detail route that already exists, when there is one. */
  href?: string;
  /** 1 = technology (smallest) … 4 = project (largest presence). */
  size: 1 | 2 | 3 | 4;
  featured?: boolean;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  type: GraphEdgeType;
};

export type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

const KEY_PREFIX: Record<GraphNodeType, string> = {
  experience: "experience",
  project: "project",
  skill: "skill",
  technology: "technology",
};

/** `experience:freelance-desenvolvedor-freelancer` — deterministic, no `_id`. */
export function experienceKeySlug(exp: {
  company?: string | null;
  role?: string | null;
}): string {
  return slugify([exp.company, exp.role].filter(Boolean).join("-")) || "experiencia";
}

export function parseNodeKey(
  key: string | null | undefined
): { type: GraphNodeType; slug: string } | null {
  if (!key) return null;
  const i = key.indexOf(":");
  if (i < 1) return null;
  const type = key.slice(0, i) as GraphNodeType;
  const slug = key.slice(i + 1);
  if (!slug || !(type in KEY_PREFIX)) return null;
  return { type, slug };
}

function shortPeriod(period?: { startDate?: string | null; endDate?: string | null; ongoing?: boolean | null } | null): string | undefined {
  const start = period?.startDate?.slice(0, 4);
  if (!start) return undefined;
  if (period?.ongoing || !period?.endDate) return `${start} — atual`;
  const end = period.endDate.slice(0, 4);
  return end === start ? start : `${start}–${end}`;
}

const PROJECT_TYPE_SHORT: Record<string, string> = {
  production: "Produção",
  professional: "Profissional",
  lab: "Lab",
  study: "Estudo",
};

/**
 * Build the graph from the CMS projection. Ordering of `nodes` is stable and
 * meaningful (experiences newest-first, then the project, then skills
 * featured-first, then technologies) so the layout and the tab order are
 * deterministic.
 */
export function toGraphData(data: KnowledgeMapData): GraphData {
  const nodes: GraphNode[] = [];
  const present = new Set<string>();

  const add = (n: GraphNode) => {
    if (present.has(n.id)) return;
    present.add(n.id);
    nodes.push(n);
  };

  for (const exp of data.experiences ?? []) {
    if (!exp._id || (!exp.role && !exp.company)) continue;
    add({
      id: exp._id,
      key: `experience:${experienceKeySlug(exp)}`,
      type: "experience",
      label: exp.role ?? exp.company ?? "Experiência",
      sublabel:
        exp.role && exp.company
          ? `${exp.company} · ${shortPeriod(exp.period) ?? ""}`.trim().replace(/ · $/, "")
          : shortPeriod(exp.period),
      href: `/experiencia#${experienceKeySlug(exp)}`,
      size: 3,
    });
  }

  for (const proj of data.projects ?? []) {
    if (!proj._id || !proj.slug || !proj.title) continue;
    if (!isPubliclyVisible(proj)) continue;
    const roles = (proj.roles ?? []).filter(Boolean);
    add({
      id: proj._id,
      key: `project:${proj.slug}`,
      type: "project",
      label: proj.title,
      sublabel: [
        proj.projectType ? PROJECT_TYPE_SHORT[proj.projectType] : null,
        roles.length ? roles.join(" · ") : null,
      ]
        .filter(Boolean)
        .join(" · ") || undefined,
      href: `/projects/${proj.slug}`,
      size: 4,
    });
  }

  for (const s of data.skills ?? []) {
    if (!s._id || !s.slug || !s.name) continue;
    add({
      id: s._id,
      key: `skill:${s.slug}`,
      type: "skill",
      label: s.name,
      sublabel: s.category ?? undefined,
      href: `/conhecimento/competencias/${s.slug}`,
      size: 2,
      featured: s.featured ?? false,
    });
  }

  for (const t of data.technologies ?? []) {
    if (!t._id || !t.slug || !t.name) continue;
    add({
      id: t._id,
      key: `technology:${t.slug}`,
      type: "technology",
      label: t.name,
      sublabel: t.category ?? undefined,
      href: `/conhecimento/tecnologias/${t.slug}`,
      size: 1,
    });
  }

  // -- edges: the five real types only ------------------------------------
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  const link = (source: string, target: string, type: GraphEdgeType) => {
    if (!present.has(source) || !present.has(target)) return;
    const id = `${type}:${source}__${target}`;
    if (seen.has(id)) return;
    seen.add(id);
    edges.push({ id, source, target, type });
  };

  for (const exp of data.experiences ?? []) {
    if (!exp._id) continue;
    for (const ref of exp.skillRefs ?? [])
      if (ref) link(exp._id, ref, "experience_skill");
    for (const ref of exp.technologyRefs ?? [])
      if (ref) link(exp._id, ref, "experience_technology");
  }

  for (const proj of data.projects ?? []) {
    if (!proj._id || !isPubliclyVisible(proj)) continue;
    for (const ref of proj.skillRefs ?? [])
      if (ref) link(proj._id, ref, "project_skill");
    for (const ref of proj.technologyRefs ?? [])
      if (ref) link(proj._id, ref, "project_technology");
    if (proj.experienceRef)
      link(proj._id, proj.experienceRef, "project_experience");
  }

  return { nodes, edges };
}

/** Node ids directly connected to `id` (one edge away only — never transitive). */
export function connectedIds(graph: GraphData, id: string | null): Set<string> {
  const set = new Set<string>();
  if (!id) return set;
  for (const e of graph.edges) {
    if (e.source === id) set.add(e.target);
    else if (e.target === id) set.add(e.source);
  }
  return set;
}

/** The edges touching `id`. */
export function edgesOf(graph: GraphData, id: string | null): GraphEdge[] {
  if (!id) return [];
  return graph.edges.filter((e) => e.source === id || e.target === id);
}

/**
 * Apply the type filter. Hiding a type removes its nodes AND every edge with
 * an endpoint of that type, so no edge is ever left dangling (§23).
 */
export function applyFilter(
  graph: GraphData,
  hidden: ReadonlySet<GraphNodeType>
): GraphData {
  if (!hidden.size) return graph;
  const nodes = graph.nodes.filter((n) => !hidden.has(n.type));
  const kept = new Set(nodes.map((n) => n.id));
  const edges = graph.edges.filter(
    (e) => kept.has(e.source) && kept.has(e.target)
  );
  return { nodes, edges };
}

/* ==========================================================================
   Layout — deterministic, three horizontal lanes (Sprint 9 §D, §11).
   No physics, no randomness: the same node set and the same canvas size
   always produce the same positions. Focus mode never moves a node (§2 —
   spatial stability); emphasis is opacity / scale / z in the renderer.
   ========================================================================== */

export type NodePosition = { x: number; y: number };
export type LayoutSize = { width: number; height: number };

const LANE_OF: Record<GraphNodeType, 0 | 1 | 2> = {
  skill: 0,
  experience: 1,
  project: 1,
  technology: 2,
};
/** vertical centre of each lane, as a fraction of height */
const LANE_Y = [0.17, 0.5, 0.83];
const MIN_SLOT = 78; // px a node needs horizontally before a lane wraps
const PAD_X = 0.06; // fraction of width kept clear on each side

/**
 * @returns a Map from node id to a pixel centre `{x, y}` within `size`.
 */
export function computeLayout(
  nodes: GraphNode[],
  size: LayoutSize
): Map<string, NodePosition> {
  const pos = new Map<string, NodePosition>();
  const w = Math.max(1, size.width);
  const h = Math.max(1, size.height);
  const usableW = w * (1 - PAD_X * 2);
  const originX = w * PAD_X;

  const lanes: GraphNode[][] = [[], [], []];
  for (const n of nodes) lanes[LANE_OF[n.type]]!.push(n);
  // lane 1: experiences before the project, each already date-sorted / featured-sorted
  lanes[1]!.sort((a, b) => (a.type === b.type ? 0 : a.type === "experience" ? -1 : 1));

  lanes.forEach((laneNodes, lane) => {
    if (!laneNodes.length) return;
    const perRow = Math.max(1, Math.floor(usableW / MIN_SLOT));
    const rows = Math.ceil(laneNodes.length / perRow);
    const rowGap = rows > 1 ? Math.min(0.09, (h * 0.24) / rows / h) : 0;

    laneNodes.forEach((n, i) => {
      const row = Math.floor(i / perRow);
      const inRow = i % perRow;
      const countInRow =
        row === rows - 1 ? laneNodes.length - perRow * row : perRow;
      const x = originX + ((inRow + 0.5) / countInRow) * usableW;
      const yBase = LANE_Y[lane]!;
      const yOffset = rows > 1 ? (row - (rows - 1) / 2) * rowGap : 0;
      pos.set(n.id, { x, y: (yBase + yOffset) * h });
    });
  });

  return pos;
}
