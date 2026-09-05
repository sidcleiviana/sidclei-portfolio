"use client";

import { useState } from "react";

import { Node } from "./Node";

/**
 * The one interactive NODE (Home). A real button: on desktop the hover/focus
 * state opens the satellites via CSS (`[data-node-react]`); on tap it toggles
 * an open state and reveals a short label. No modal, no navigation — a small
 * "this is alive, and these things connect" moment.
 *
 * Client because it holds the open/label toggle state for touch; CSS `:hover`
 * alone cannot drive an accessible, persistent tap state on a button. ~30 lines.
 */
export function NodeButton({ label = "contextos conectados" }: { label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="inline-flex items-center gap-2.5">
      <button
        type="button"
        aria-pressed={open}
        aria-label={open ? `${label} — recolher` : label}
        data-node-react
        data-node-open={open ? "" : undefined}
        onClick={() => setOpen((v) => !v)}
        className="node-btn inline-grid place-items-center rounded-full p-1"
      >
        <Node size="sm" />
      </button>
      <span
        className={`u-label text-fg-faint overflow-hidden whitespace-nowrap transition-all duration-200 ${
          open ? "max-w-[16rem] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        {label}
      </span>
    </span>
  );
}
