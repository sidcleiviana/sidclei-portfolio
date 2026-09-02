import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "outline";

const TONE: Record<Tone, string> = {
  neutral: "text-fg-muted",
  accent: "text-accent",
  outline: "text-fg border-b border-[var(--color-border-strong)]",
};

/**
 * A flat inline token — a project type, a technology, a status. No pill, no
 * fill; the "outline" tone is just an underline. On editorial surfaces
 * technologies read as a plain mono list, so this stays visually recessive
 * (Sprint 7 §4, §23).
 */
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
      className={`inline-flex items-center pb-0.5 text-xs leading-none font-medium ${
        mono ? "font-mono tracking-tight" : "tracking-wide uppercase"
      } ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
