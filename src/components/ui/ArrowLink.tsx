import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "default" | "quiet";

const TONE: Record<Tone, string> = {
  default: "text-fg hover:text-accent",
  quiet: "text-fg-muted hover:text-fg",
};

/**
 * The editorial call-to-move: a mono label and a nudging arrow, underline on
 * hover/focus. Replaces filled buttons for in-page navigation (Sprint 7 §9,
 * §13, §31). Internal links use `next/link`; external get a new tab + `rel`.
 */
export function ArrowLink({
  href,
  children,
  tone = "default",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const cls =
    `group u-label inline-flex items-center gap-2 rounded-sm ` +
    `underline decoration-transparent underline-offset-[6px] ` +
    `hover:decoration-current focus-visible:decoration-current ${TONE[tone]} ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden className="u-arrow not-italic">
        →
      </span>
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
