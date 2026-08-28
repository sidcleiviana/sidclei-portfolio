import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MinCol = "16" | "18" | "22";

const MIN: Record<MinCol, string> = {
  "16": "16rem",
  "18": "18rem",
  "22": "22rem",
};

type Props = {
  minCol?: MinCol;
  gap?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/** Responsive auto-fill grid. `minCol` is the smallest a column may get before
 *  the track count drops. Falls back to a single column on very narrow screens. */
export function Grid({
  minCol = "18",
  gap = "gap-6",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <div
      className={`grid ${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${MIN[minCol]}), 1fr))`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
