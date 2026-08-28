import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Gap = "2xs" | "xs" | "sm" | "md";

const GAP: Record<Gap, string> = {
  "2xs": "gap-1",
  xs: "gap-1.5",
  sm: "gap-2.5",
  md: "gap-4",
};

type Props = {
  as?: ElementType;
  gap?: Gap;
  align?: "center" | "start" | "baseline";
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/** Horizontal group that wraps — meta rows, tag lists, button pairs. */
export function Cluster({
  as: Tag = "div",
  gap = "sm",
  align = "center",
  children,
  className = "",
  ...rest
}: Props) {
  const alignClass =
    align === "start"
      ? "items-start"
      : align === "baseline"
        ? "items-baseline"
        : "items-center";
  return (
    <Tag
      className={`flex flex-wrap ${alignClass} ${GAP[gap]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
