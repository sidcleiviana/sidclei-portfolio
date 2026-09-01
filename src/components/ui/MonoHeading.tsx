import type { ReactNode } from "react";

/** The small mono label that opens a sub-section ("APARECEU EM", "TECNOLOGIAS"). */
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
    <Tag id={id} className={`u-label ${className}`}>
      {children}
    </Tag>
  );
}
