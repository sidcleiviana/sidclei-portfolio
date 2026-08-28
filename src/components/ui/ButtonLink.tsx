import Link from "next/link";
import type { ComponentProps } from "react";

import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonClass";

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** A link that looks like a button. Same visual contract as `<Button>`. */
export function ButtonLink({ variant, size, className, ...rest }: Props) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...rest} />
  );
}
