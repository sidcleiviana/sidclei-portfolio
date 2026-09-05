"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AgentSvg } from "./AgentSvg";

type Phase = "idle" | "look" | "move" | "land" | "interact";

const FAR = 1.2; // viewport-heights: beyond this, hop (fade) instead of slide
const NEAR = 150; // px: pointer proximity that wakes the "look" state
const HERO_LABEL = "Explorar conexões";

/**
 * The Living Agent. One roaming entity per route: it lands at `[data-agent-anchor]`
 * markers, follows selection changes inside a context, glances toward the
 * pointer when it comes near, and can be poked at the hero. Not fixed — it is
 * absolutely positioned inside `<main>` and scrolls with the page; it only
 * *moves* when the active anchor changes.
 *
 * One `IntersectionObserver` + one scoped `pointermove` listener (only while a
 * context is active). No global scroll listener, no rAF idle loop — idle
 * breathing is CSS. Fully inert under `prefers-reduced-motion` (snaps, never
 * animates) and never covers content (`pointer-events: none` unless at hero).
 */
export function LivingAgent() {
  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const pointerHostRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef(0);

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(false);
  const [atHero, setAtHero] = useState(false);
  const [poked, setPoked] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const settle = useCallback(
    (next: HTMLElement | null, animate: boolean) => {
      const el = elRef.current;
      const wrap = el?.offsetParent as HTMLElement | null;
      if (!el || !wrap || !next) {
        setVisible(false);
        return;
      }
      const t = next.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      const x = t.left - w.left;
      const y = t.top - w.top;
      const prev = posRef.current;
      const far =
        prev && Math.hypot(x - prev.x, y - prev.y) > window.innerHeight * FAR;

      posRef.current = { x, y };
      setVisible(true);
      setPoked(false);

      if (reduced || !animate) {
        setPos({ x, y });
        setPhase("idle");
        return;
      }
      if (far || !prev) {
        // hop: fade out, jump, fade in + land
        setVisible(false);
        window.setTimeout(() => {
          setPos({ x, y });
          setVisible(true);
          setPhase("land");
          window.setTimeout(() => setPhase("idle"), 260);
        }, 150);
      } else {
        setPhase("move");
        setPos({ x, y });
        window.setTimeout(() => setPhase("land"), 260);
        window.setTimeout(() => setPhase("idle"), 480);
      }
    },
    [reduced]
  );

  const onPointer = useCallback((e: PointerEvent) => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = elRef.current;
      const prev = posRef.current;
      if (!el || !prev) return;
      const wrap = el.offsetParent as HTMLElement | null;
      if (!wrap) return;
      const w = wrap.getBoundingClientRect();
      const cx = prev.x + w.left + el.offsetWidth / 2;
      const cy = prev.y + w.top + el.offsetHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d < NEAR) {
        const k = (1 - d / NEAR) * 2.5;
        el.style.setProperty("--lx", `${Math.max(-3, Math.min(3, (dx / d) * k))}px`);
        el.style.setProperty("--ly", `${Math.max(-3, Math.min(3, (dy / d) * k))}px`);
        setPhase((p) => (p === "interact" || p === "move" ? p : "look"));
      } else {
        el.style.setProperty("--lx", "0px");
        el.style.setProperty("--ly", "0px");
        setPhase((p) => (p === "look" ? "idle" : p));
      }
    });
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const anchors = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-agent-anchor]"));
    if (!anchors().length) return;

    const pick = (): HTMLElement | null => {
      const mid = window.innerHeight / 2;
      const dist = (a: HTMLElement) =>
        Math.abs(a.getBoundingClientRect().top - mid);
      const vis = anchors()
        .filter((a) => {
          const r = a.getBoundingClientRect();
          return (
            r.top < window.innerHeight * 0.92 &&
            r.bottom > window.innerHeight * 0.08
          );
        })
        .sort((a, b) => dist(a) - dist(b));
      if (!vis.length) return null;

      // the context nearest the viewport centre wins; the target within it is
      // the one flagged data-agent-here (the current selection), else the
      // context's own most-central anchor.
      const ctx = vis[0]!.dataset.agentAnchor;
      const inCtx = vis.filter((a) => a.dataset.agentAnchor === ctx);
      return inCtx.find((a) => a.hasAttribute("data-agent-here")) ?? inCtx[0]!;
    };

    const evaluate = () => {
      const next = pick();
      if (next === activeRef.current) {
        if (next) settle(next, false); // keep glued through layout shifts
        return;
      }
      activeRef.current = next;
      setAtHero(next?.dataset.agentAnchor === "hero");
      settle(next, true);

      // scope the pointer listener to the active context
      if (pointerHostRef.current) {
        pointerHostRef.current.removeEventListener("pointermove", onPointer);
        pointerHostRef.current = null;
      }
      if (next && !reduced) {
        const host = next.closest("section") ?? next.parentElement;
        if (host) {
          host.addEventListener("pointermove", onPointer, { passive: true });
          pointerHostRef.current = host;
        }
      }
    };

    const io = new IntersectionObserver(evaluate, {
      threshold: [0, 0.25, 0.6],
      rootMargin: "-15% 0px -15% 0px",
    });
    anchors().forEach((a) => io.observe(a));

    const onResize = () => settle(activeRef.current, false);
    window.addEventListener("agent:reposition", evaluate);
    window.addEventListener("resize", onResize);
    evaluate();

    return () => {
      io.disconnect();
      window.removeEventListener("agent:reposition", evaluate);
      window.removeEventListener("resize", onResize);
      pointerHostRef.current?.removeEventListener("pointermove", onPointer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [settle, onPointer, reduced]);

  const poke = () => {
    setPoked((v) => !v);
    setPhase((p) => (p === "interact" ? "idle" : "interact"));
  };

  return (
    <div
      ref={elRef}
      data-agent-state={poked ? "interact" : phase}
      data-agent-open={poked ? "" : undefined}
      className={`agent ${visible ? "agent--on" : "agent--off"}`}
      style={pos ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
      {...(atHero ? {} : { "aria-hidden": true })}
    >
      {atHero ? (
        <button
          type="button"
          className="agent-hit agent-btn"
          aria-label={poked ? `${HERO_LABEL} — recolher` : HERO_LABEL}
          aria-pressed={poked}
          onClick={poke}
        >
          <AgentSvg />
        </button>
      ) : (
        <span className="agent-hit">
          <AgentSvg />
        </span>
      )}
      <span className="agent-label u-label">{HERO_LABEL}</span>
    </div>
  );
}
