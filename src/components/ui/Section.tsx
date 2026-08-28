import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Spacing = "sm" | "md" | "lg";

const PAD: Record<Spacing, string> = {
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-20",
  lg: "py-20 sm:py-28",
};

type Props = {
  spacing?: Spacing;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

/**
 * A vertical rhythm unit. Pages are a stack of `<Section>`s; spacing between
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
