/* Minimal next/image stand-in for unit tests. */
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

export default function Image({ fill, priority, alt = "", ...rest }: Props) {
  void fill;
  void priority;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img alt={alt} {...rest} />;
}
