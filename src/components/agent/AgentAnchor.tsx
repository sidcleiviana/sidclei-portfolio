export type AgentAnchorName =
  | "hero"
  | "project"
  | "experience"
  | "knowledge"
  | "case"
  | "relations"
  | "footer"
  | "collection"
  | "detail"
  | "portrait"
  | "map-overview"
  | "map-node";

/**
 * A zero-size marker that tells the Living Agent where it may land in this
 * context. Server-rendered, `aria-hidden`, no layout footprint. Set
 * `active` to make it the agent's target within a context that has several
 * (e.g. the selected experience row) and fire `agent:reposition` on change.
 */
export function AgentAnchor({
  name,
  active = false,
  className = "",
}: {
  name: AgentAnchorName;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      data-agent-anchor={name}
      data-agent-here={active ? "" : undefined}
      className={`pointer-events-none inline-block h-0 w-0 align-middle ${className}`}
    />
  );
}

/**
 * Ask the Living Agent to re-evaluate which anchor it should be at. Deferred a
 * frame so React has committed the `data-agent-here` change before the agent
 * reads the DOM.
 */
export function repositionAgent() {
  if (typeof window === "undefined") return;
  const fire = () => window.dispatchEvent(new CustomEvent("agent:reposition"));
  // let React commit the data-agent-here change, then re-evaluate
  if (typeof requestAnimationFrame === "function") requestAnimationFrame(fire);
  setTimeout(fire, 60);
}
