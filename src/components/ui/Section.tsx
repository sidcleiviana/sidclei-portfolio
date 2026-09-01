import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Spacing = "sm" | "md" | "lg" | "xl";

const PAD: Record<Spacing, string> = {
  sm: "py-10 sm:py-14",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-36",
  xl: "py-28 sm:py-44",
};

type Props = {
  spacing?: Spacing;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

/**
 * A vertical rhythm unit. Pages are a stack of `<Section>`s; the space between
 * them comes from here, not ad-hoc margins.
 */
export function Section({
  spacing = "md",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <section className={`${PAD[spacing]} ${className}`} {...rest}>
      {children}
    </section>
  );
}
