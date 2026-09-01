import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerSize = "editorial" | "max" | "wide" | "prose" | "full";

const MAX: Record<ContainerSize, string> = {
  editorial: "max-w-[var(--container-editorial)]",
  max: "max-w-[var(--container-max)]",
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
 * Horizontal gutter + max measure. The gutter is fluid (`--gutter`) so the page
 * breathes more on wide editorial screens. `editorial` is the wide canvas for
 * hero / projects / case top / trajectory; `prose` is the reading measure;
 * `wide` is for wide media.
 */
export function Container({
  as: Tag = "div",
  size = "max",
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
