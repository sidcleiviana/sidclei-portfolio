import type { ButtonHTMLAttributes } from "react";

import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonClass";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** A real `<button>`. For navigation use `<ButtonLink>` (Design System §13). */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...rest}
    />
  );
}
