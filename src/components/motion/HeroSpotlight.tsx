"use client";

import { useEffect, useRef } from "react";

/**
 * A soft radial light that follows the pointer inside the Hero only. Sets
 * `--sx/--sy` on its own element on pointermove and toggles `data-active` on
 * enter/leave. Desktop + motion-allowed only (guarded in CSS and here); on
 * touch or reduced-motion it does nothing and the layer stays invisible.
 *
 * Client because it reads live pointer coordinates — impossible in CSS. ~25
 * lines, scoped to the Hero, no global listeners.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || typeof window.matchMedia !== "function") return;
    if (
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      el.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const enter = () => el.setAttribute("data-active", "");
    const leave = () => el.removeAttribute("data-active");

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden className="hero-spotlight" />;
}
