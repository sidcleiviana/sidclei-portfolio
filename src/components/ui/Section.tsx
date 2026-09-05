import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Spacing = "none" | "sm" | "md" | "lg";

const PAD: Record<Spacing, string> = {
  none: "",
  sm: "py-8 sm:py-10",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-24",
};

type Props = {
  spacing?: Spacing;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

/** A vertical rhythm unit. Spacing comes from here, not ad-hoc margins. */
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
