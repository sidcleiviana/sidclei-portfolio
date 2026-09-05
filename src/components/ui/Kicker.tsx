import type { ElementType, ReactNode } from "react";

/**
 * The small mono uppercase label above a module title, or standing alone as a
 * section marker. Carries meaning (what this block is), never a decorative
 * number.
 */
export function Kicker({
  as: Tag = "p",
  id,
  children,
  className = "",
}: {
  as?: ElementType;
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
