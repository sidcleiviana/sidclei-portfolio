export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex select-none items-center justify-center gap-2 rounded-[var(--radius-sm)] " +
  "font-mono text-xs font-medium uppercase tracking-[var(--tracking-label)] " +
  "whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50";

const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#0b0c12] hover:bg-[var(--color-accent-strong)]",
  secondary:
    "text-fg border border-border-strong hover:border-[var(--color-accent)] hover:text-accent",
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
