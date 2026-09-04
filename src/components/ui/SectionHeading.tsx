import type { ReactNode } from "react";

import { SectionMarker } from "./SectionMarker";

/**
 * Opens a section: an optional editorial index mark or mono eyebrow, a serif
 * heading set large, an optional lead line, and an optional trailing action.
 */
export function SectionHeading({
  as: Tag = "h2",
  id,
  index,
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  id?: string;
  /** 1-based editorial number, rendered "01". Takes precedence over `eyebrow`. */
  index?: number;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const size =
    Tag === "h1"
      ? "text-[clamp(2.25rem,11vw,3.75rem)] sm:text-5xl"
      : Tag === "h2"
        ? "text-2xl sm:text-3xl"
        : "text-xl sm:text-2xl";

  return (
    <div
      className={`flex flex-col gap-4 ${action ? "sm:flex-row sm:items-end sm:justify-between sm:gap-10" : ""} ${className}`}
    >
      <div className="flex flex-col gap-4">
        {typeof index === "number" ? (
          <SectionMarker index={index}>{eyebrow}</SectionMarker>
        ) : eyebrow ? (
          <p className="u-label">{eyebrow}</p>
        ) : null}
        <Tag
          id={id}
          className={`${size} font-display tracking-[var(--tracking-display)]`}
        >
          {title}
        </Tag>
        {description ? (
          <p className="text-fg-muted max-w-[var(--container-prose)] text-lg text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
