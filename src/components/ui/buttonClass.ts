export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex select-none items-center justify-center gap-2 rounded-sm font-medium " +
  "whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 " +
  "active:translate-y-px";

const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:bg-[var(--color-accent-strong)]",
  secondary:
    "text-fg border border-border-strong hover:border-[var(--color-rule)]",
  ghost: "text-fg-muted hover:text-fg",
};

/** Shared visual contract for `<Button>` and `<ButtonLink>`. */
export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return `${BASE} ${SIZE[size]} ${VARIANT[variant]} ${className}`.trim();
}
