import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "default" | "quiet";
type Size = "sm" | "lg";

const TONE: Record<Tone, string> = {
  default: "text-fg hover:text-accent",
  quiet: "text-fg-muted hover:text-fg",
};

const SIZE: Record<Size, string> = {
  sm: "text-xs",
  lg: "text-sm sm:text-base tracking-[0.12em]",
};

/**
 * The editorial call-to-move: a mono label and a nudging arrow, underline on
 * hover/focus. Replaces filled buttons for in-page navigation (Sprint 7 §9,
 * §13, §31). `lg` gives it the presence of a doorway, not a caption (7.1 §3).
 */
export function ArrowLink({
  href,
  children,
  tone = "default",
  size = "sm",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const cls =
    `group inline-flex items-center gap-2.5 rounded-sm font-mono font-medium uppercase ` +
    `underline decoration-transparent underline-offset-[8px] ` +
    `hover:decoration-current focus-visible:decoration-current ` +
    `${SIZE[size]} ${TONE[tone]} ${className}`;
  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="u-arrow text-[1.35em] leading-none not-italic"
      >
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
