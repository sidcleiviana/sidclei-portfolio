import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AgentAnchor,
  repositionAgent,
} from "@/components/agent/AgentAnchor";
import { AgentSvg } from "@/components/agent/AgentSvg";
import { LivingAgent } from "@/components/agent/LivingAgent";

describe("AgentSvg (body, decorative)", () => {
  it("is hidden from assistive tech and non-interactive", () => {
    const { container } = render(<AgentSvg />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(container.querySelector("button")).toBeNull();
  });
});

describe("AgentAnchor", () => {
  it("marks the anchor name and toggles the target attribute", () => {
    const { container, rerender } = render(
      <AgentAnchor name="experience" />
    );
    const span = container.querySelector("[data-agent-anchor='experience']");
    expect(span).toBeTruthy();
    expect(span).not.toHaveAttribute("data-agent-here");

    rerender(<AgentAnchor name="experience" active />);
    expect(
      container.querySelector("[data-agent-anchor='experience']")
    ).toHaveAttribute("data-agent-here");
  });

  it("repositionAgent dispatches a DOM event without throwing", async () => {
    let heard = false;
    const on = () => {
      heard = true;
    };
    window.addEventListener("agent:reposition", on);
    expect(() => repositionAgent()).not.toThrow();
    await new Promise((r) => setTimeout(r, 120));
    expect(heard).toBe(true);
    window.removeEventListener("agent:reposition", on);
  });
});

describe("LivingAgent", () => {
  it("mounts without an anchor present and stays inert/hidden", () => {
    const { container } = render(<LivingAgent />);
    const agent = container.querySelector(".agent");
    expect(agent).toBeTruthy();
    expect(agent).toHaveClass("agent--off");
    // no layout in jsdom -> never activates -> stays decorative, not a button
    expect(agent).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("survives an agent:reposition event with no anchors", () => {
    render(<LivingAgent />);
    expect(() => repositionAgent()).not.toThrow();
  });
});
