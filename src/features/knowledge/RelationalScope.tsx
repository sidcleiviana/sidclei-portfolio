"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The "20% Knowledge Atlas" interaction (Sprint 7 §12, §24, §25): inside this
 * scope, pointing at or focusing one item (`[data-rel]` with a comma-separated
 * `data-rel-keys`) keeps its relatives — items sharing a key — bright while the
 * rest recede. The dimming itself is CSS (`[data-rel-scope]` in globals.css);
 * this island only marks the relatives. With JS off, the CSS still gives a
 * gentler focus cue, and every relation remains a real link with visible text
 * (§26, §42). Respects reduced motion via the CSS layer.
 */
export function RelationalScope({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = () =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-rel]"));

    const activate = (el: HTMLElement) => {
      const keys = (el.dataset.relKeys ?? "")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      if (!keys.length) return;
      for (const other of items()) {
        const otherKeys = (other.dataset.relKeys ?? "")
          .split(",")
          .map((k) => k.trim());
        if (other === el || keys.some((k) => otherKeys.includes(k))) {
          other.setAttribute("data-rel-active", "");
        }
      }
    };
    const clear = () => {
      for (const el of items()) el.removeAttribute("data-rel-active");
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-rel]");
      if (el && root.contains(el)) {
        clear();
        activate(el);
      }
    };
    root.addEventListener("pointerover", onOver);
    root.addEventListener("focusin", onOver);
    root.addEventListener("pointerleave", clear);
    root.addEventListener("focusout", (e) => {
      if (!root.contains((e as FocusEvent).relatedTarget as Node)) clear();
    });
    return () => {
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("focusin", onOver);
      root.removeEventListener("pointerleave", clear);
    };
  }, []);

  return (
    <div ref={ref} data-rel-scope className={className}>
      {children}
    </div>
  );
}
