import type { ElementType, ReactNode } from "react";

/**
 * Surface primitive: paper-white panel, hairline border, quiet radius.
 *
 * `interactive` is for cards that are a single click target (a stretched link
 * inside). It adds a hover cue and moves the focus ring to the card when the
 * inner link is focused — so keyboard focus is visible without a full-bleed
 * outline. The inner link should carry `after:absolute after:inset-0
 * focus-visible:outline-none`.
 */
export function Card({
  as: Tag = "div",
  interactive = false,
  children,
  className = "",
}: {
  as?: ElementType;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const interactiveClass = interactive
    ? "transition-[border-color,box-shadow,transform] duration-200 " +
      "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md " +
      "motion-reduce:hover:translate-y-0 " +
      "has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 " +
      "has-[a:focus-visible]:outline-accent has-[a:focus-visible]:outline-offset-2"
    : "";
  return (
    <Tag
      className={`border-border bg-surface relative rounded-md border ${interactiveClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
