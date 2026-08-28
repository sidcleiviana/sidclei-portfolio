import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "outline";

const TONE: Record<Tone, string> = {
  neutral: "bg-bg-subtle text-fg-muted",
  accent: "bg-accent-subtle text-accent",
  outline: "border border-border-strong text-fg-muted",
};

/** Small non-interactive label: project type, a tech name, a status. */
export function Badge({
  tone = "neutral",
  mono = false,
  children,
  className = "",
}: {
  tone?: Tone;
  mono?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ${
        mono ? "font-mono tracking-tight" : ""
      } ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
