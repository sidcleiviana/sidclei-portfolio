import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";

/**
 * The standard block that opens a section: optional eyebrow, a heading, an
 * optional lead line, and an optional trailing action (e.g. "see all").
 */
export function SectionHeading({
  as: Tag = "h2",
  id,
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const size =
    Tag === "h1"
      ? "text-3xl sm:text-4xl"
      : Tag === "h2"
        ? "text-2xl sm:text-3xl"
        : "text-xl";

  return (
    <div
      className={`flex flex-col gap-3 ${action ? "sm:flex-row sm:items-end sm:justify-between sm:gap-8" : ""} ${className}`}
    >
      <div className="flex flex-col gap-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Tag id={id} className={size}>
          {title}
        </Tag>
        {description ? (
          <p className="text-fg-muted max-w-[var(--container-prose)] text-base sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
