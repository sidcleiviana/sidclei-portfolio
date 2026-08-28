import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Gap = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

const GAP: Record<Gap, string> = {
  "2xs": "gap-1",
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
  xl: "gap-12",
};

type Props = {
  as?: ElementType;
  gap?: Gap;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/** Vertical flow with a consistent gap. */
export function Stack({
  as: Tag = "div",
  gap = "md",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <Tag className={`flex flex-col ${GAP[gap]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
