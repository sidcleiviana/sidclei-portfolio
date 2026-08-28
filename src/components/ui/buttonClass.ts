export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex select-none items-center justify-center gap-2 rounded-md font-medium " +
  "whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 " +
  "active:translate-y-px";

const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-strong shadow-sm",
  secondary:
    "bg-surface text-fg border border-border-strong hover:border-fg/40 hover:bg-bg-subtle",
  ghost: "text-fg hover:bg-bg-subtle",
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
