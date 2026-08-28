import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { MobileNav } from "@/components/layout/MobileNav";

describe("MobileNav", () => {
  it("is a collapsed disclosure by default", () => {
    render(<MobileNav />);
    const trigger = screen.getByRole("button", { name: "Abrir menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Navegação principal" })
    ).not.toBeInTheDocument();
  });

  it("opens on click and exposes the nav links", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
});
