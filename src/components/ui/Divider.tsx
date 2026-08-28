/** Hairline rule. Decorative by default (`role="presentation"`). */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <hr
      role="presentation"
      className={`border-0 border-t border-[var(--color-border)] ${className}`}
    />
  );
}
