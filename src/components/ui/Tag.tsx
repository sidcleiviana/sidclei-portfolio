import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "muted" | "accent" | "petrol";
const TONE: Record<Tone, string> = {
  muted: "text-fg-muted",
  accent: "text-accent",
  petrol: "text-[var(--color-node)]",
};

const BASE = "font-mono text-xs tracking-tight";

/**
 * A static metadata token — a project type, a technology name, a role label.
 * No fill, no border: recessive by default. `<TagLink>` deep-links into the
 * Knowledge Hub.
 */
export function Tag({
  tone = "muted",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`${BASE} ${TONE[tone]} ${className}`}>{children}</span>
  );
}

export function TagLink({
  tone = "muted",
  children,
  className = "",
  ...rest
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      className={`${BASE} ${TONE[tone]} rounded-sm hover:text-[var(--color-accent)] ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
