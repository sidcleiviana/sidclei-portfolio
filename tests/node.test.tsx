import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Node } from "@/components/node/Node";
import { NodeButton } from "@/components/node/NodeButton";

describe("Node (decorative)", () => {
  it("is hidden from assistive tech and carries no interaction", () => {
    const { container } = render(<Node />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(container.querySelector("button")).toBeNull();
  });
});

describe("NodeButton (interactive)", () => {
  it("is a real button with an accessible name and toggles its state", async () => {
    const user = userEvent.setup();
    render(<NodeButton label="contextos conectados" />);
    const btn = screen.getByRole("button", { name: "contextos conectados" });
    expect(btn).toHaveAttribute("aria-pressed", "false");

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: /recolher/ })
    ).toBeInTheDocument();
  });

  it("responds to keyboard activation", async () => {
    const user = userEvent.setup();
    render(<NodeButton />);
    const btn = screen.getByRole("button");
    btn.focus();
    await user.keyboard("{Enter}");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    await user.keyboard(" ");
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});
