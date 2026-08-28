import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerSize = "default" | "wide" | "prose";

const MAX: Record<ContainerSize, string> = {
  default: "max-w-[var(--container-max)]",
  wide: "max-w-[var(--container-wide)]",
  prose: "max-w-[var(--container-prose)]",
};

type Props = {
  as?: ElementType;
  size?: ContainerSize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/**
 * Horizontal page gutter + max measure. `prose` is the reading width used on
 * long-form pages (project detail); `wide` sits between prose and full.
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
      className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${MAX[size]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
