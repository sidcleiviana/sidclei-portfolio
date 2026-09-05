type AgentSize = "sm" | "md" | "lg";

const PX: Record<AgentSize, number> = { sm: 34, md: 48, lg: 60 };

/**
 * The Living Agent's body — an abstract geometric entity, not a mascot: a
 * rounded core, two minimal sensors, a petrol antenna (the one "live" part),
 * two small supports, and two connection satellites. Built from circles, lines
 * and one rounded rect. Purely presentational; all behaviour (breathe, look,
 * interact, land) is driven by `[data-agent-state]` on an ancestor, in CSS.
 */
export function AgentSvg({
  size = "md",
  className = "",
}: {
  size?: AgentSize;
  className?: string;
}) {
  const s = PX[size];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={s}
      height={s}
      viewBox="0 0 56 56"
      className={`agent-svg ${className}`}
    >
      {/* connection satellites */}
      <g className="agent-sats" stroke="var(--color-accent)" strokeWidth="1">
        <line x1="38" y1="26" x2="47" y2="20" />
        <line x1="18" y1="32" x2="9" y2="37" />
      </g>
      <circle className="agent-sat" cx="47" cy="20" r="2" fill="var(--color-accent)" />
      <circle className="agent-sat" cx="9" cy="37" r="2" fill="var(--color-accent)" />

      {/* antenna + live tip */}
      <line
        className="agent-antenna"
        x1="28"
        y1="16"
        x2="28"
        y2="8"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
      />
      <circle
        className="agent-live"
        cx="28"
        cy="6.5"
        r="2.4"
        fill="var(--color-node, var(--color-petrol))"
      />

      {/* supports */}
      <g className="agent-feet" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round">
        <line x1="23" y1="39" x2="21" y2="44" />
        <line x1="33" y1="39" x2="35" y2="44" />
      </g>

      {/* core body */}
      <g className="agent-core">
        <rect
          x="17"
          y="16"
          width="22"
          height="23"
          rx="6"
          fill="var(--color-accent)"
        />
        {/* sensors — minimal, shift on "look" */}
        <g className="agent-sensors" fill="var(--color-bg)">
          <rect x="23.5" y="25" width="3.4" height="2.2" rx="1.1" />
          <rect x="29.1" y="25" width="3.4" height="2.2" rx="1.1" />
        </g>
      </g>
    </svg>
  );
}
