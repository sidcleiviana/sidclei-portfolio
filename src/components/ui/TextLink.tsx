import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Force new-tab treatment; auto-detected for http(s) links otherwise. */
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const CLASS =
  "text-accent underline decoration-[var(--color-accent)]/35 underline-offset-[3px] " +
  "hover:decoration-[var(--color-accent)] rounded-sm";

/**
 * Inline link. External links open in a new tab with a screen-reader hint and
 * safe `rel` (Design System §13).
 */
export function TextLink({
  href,
  children,
  className = "",
  external,
  ...rest
}: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${CLASS} ${className}`}
      >
        {children}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={`${CLASS} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
