import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerSize = "default" | "wide" | "prose" | "full";

const MAX: Record<ContainerSize, string> = {
  default: "max-w-[var(--container)]",
  wide: "max-w-[var(--container-wide)]",
  prose: "max-w-[var(--container-prose)]",
  full: "max-w-none",
};

type Props = {
  as?: ElementType;
  size?: ContainerSize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/**
 * Horizontal gutter + max measure. `wide` is the full interface canvas;
 * `default` is the working width; `prose` is the reading measure.
 */
export function Container({
  as: Tag = "div",
  size = "default",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <Tag
      className={`mx-auto w-full px-[var(--gutter)] ${MAX[size]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
