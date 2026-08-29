import type { ReactNode } from "react";

/** The small mono uppercase label used to open a sub-section. */
export function MonoHeading({
  as: Tag = "h3",
  id,
  children,
  className = "",
}: {
  as?: "h2" | "h3" | "p";
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`text-fg-muted font-mono text-xs font-medium tracking-[0.14em] uppercase ${className}`}
    >
      {children}
    </Tag>
  );
}
