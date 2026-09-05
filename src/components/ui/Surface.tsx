import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type SurfaceKind = "graphite" | "paper" | "tonal" | "deep";

/** `graphite` is the page default and needs no attribute. */
const ATTR: Record<SurfaceKind, string | undefined> = {
  graphite: undefined,
  paper: "paper",
  tonal: "tonal",
  deep: "deep",
};

type Pad = "none" | "sm" | "md" | "lg";
const PAD: Record<Pad, string> = {
  none: "",
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-20",
  lg: "py-20 sm:py-28",
};

type Props = {
  as?: ElementType;
  kind?: SurfaceKind;
  pad?: Pad;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

/**
 * A full-bleed chromatic band. Repaints the shared tokens for everything
 * inside via `[data-surface]`, so the same components render correctly on
 * graphite, paper, tonal and navy. Put a `<Container>` inside for the measure.
 */
export function Surface({
  as: Tag = "section",
  kind = "graphite",
  pad = "md",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <Tag data-surface={ATTR[kind]} className={`${PAD[pad]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
