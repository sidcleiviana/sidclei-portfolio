type NodeSize = "sm" | "md" | "lg";

const PX: Record<NodeSize, number> = { sm: 22, md: 40, lg: 76 };

/**
 * NODE — an abstract visual entity for connection / systems / software / data /
 * automation. A core, a few satellites, thin lines. Indigo dominant, one petrol
 * satellite as the rare live detail. Purely presentational and `aria-hidden`;
 * the meaning is carried by the content around it. Ambient breathing lives in
 * CSS (`.node`), zeroed under `prefers-reduced-motion`. A `[data-node-react]`
 * ancestor (hover/focus) or `[data-node-open]` (tap) opens the satellites.
 */
export function Node({
  size = "md",
  className = "",
}: {
  size?: NodeSize;
  className?: string;
}) {
  const s = PX[size];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={s}
      height={s}
      viewBox="0 0 48 48"
      className={`node ${className}`}
    >
      <g className="node-links" stroke="var(--color-accent)" strokeWidth="1">
        <line x1="24" y1="24" x2="38" y2="12" />
        <line x1="24" y1="24" x2="42" y2="27" />
        <line x1="24" y1="24" x2="11" y2="35" />
        <line x1="24" y1="24" x2="9" y2="19" />
      </g>
      <g className="node-sats" fill="var(--color-accent)">
        <circle className="node-sat" cx="38" cy="12" r="2" />
        <circle className="node-sat" cx="42" cy="27" r="1.6" />
        <circle className="node-sat" cx="11" cy="35" r="1.6" />
      </g>
      <circle
        className="node-live"
        cx="9"
        cy="19"
        r="2.2"
        fill="var(--color-node, var(--color-petrol))"
      />
      <circle className="node-core" cx="24" cy="24" r="4" fill="var(--color-accent)" />
    </svg>
  );
}
