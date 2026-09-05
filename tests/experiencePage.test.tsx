import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  TrajectorySelector,
  type TrajectoryEntry,
} from "@/features/experience/TrajectorySelector";
import {
  experienceFixtures,
  richExperienceFixture,
  sparseExperienceFixture,
} from "@/features/experience/fixtures";
import { experiencesQuery } from "@/sanity/queries/experience";

const entries = experienceFixtures as unknown as TrajectoryEntry[];

describe("TrajectorySelector — empty", () => {
  it("renders nothing without entries", () => {
    const { container } = render(<TrajectorySelector experiences={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("TrajectorySelector — selection", () => {
  it("shows the current role by default with its rich detail", () => {
    render(<TrajectorySelector experiences={entries} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    // rich detail for the ongoing role
    expect(screen.getAllByText("Competências").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Backend Development").length).toBeGreaterThan(0);
    expect(screen.getAllByText("PostgreSQL").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projetos deste período").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projeto de exemplo 1").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Atual/).length).toBeGreaterThan(0);
  });

  it("switches the panel in place when another role is chosen", async () => {
    const user = userEvent.setup();
    render(<TrajectorySelector experiences={entries} />);
    const tabs = screen.getAllByRole("tab");
    await user.click(tabs[1]!);
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getAllByRole("heading", { name: "Analista de Sistemas" }).length
    ).toBeGreaterThan(0);
  });

  it("moves selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<TrajectorySelector experiences={entries} />);
    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();
    await user.keyboard("{ArrowDown}");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowUp}");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("moves the agent anchor to the selected role", async () => {
    const user = userEvent.setup();
    const { container } = render(<TrajectorySelector experiences={entries} />);
    const anchors = () =>
      Array.from(
        container.querySelectorAll("[data-agent-anchor='experience']")
      );
    expect(anchors()[0]).toHaveAttribute("data-agent-here");
    expect(anchors()[1]).not.toHaveAttribute("data-agent-here");

    await user.click(screen.getAllByRole("tab")[1]!);
    expect(anchors()[0]).not.toHaveAttribute("data-agent-here");
    expect(anchors()[1]).toHaveAttribute("data-agent-here");
  });
});

describe("TrajectorySelector — confidentiality", () => {
  it("never renders a private related project", () => {
    const withPrivate = {
      ...(richExperienceFixture as unknown as TrajectoryEntry),
      projects: [
        {
          _id: "leak",
          title: "PROJETO PRIVADO",
          slug: "leak",
          visibility: "private" as const,
        },
        ...((richExperienceFixture as unknown as TrajectoryEntry).projects ?? []),
      ],
    };
    render(<TrajectorySelector experiences={[withPrivate]} />);
    expect(screen.queryByText("PROJETO PRIVADO")).not.toBeInTheDocument();
    expect(screen.getAllByText("Projeto de exemplo 1").length).toBeGreaterThan(0);
  });
});

describe("TrajectorySelector — sparse", () => {
  it("hides empty sub-sections", () => {
    render(
      <TrajectorySelector
        experiences={[sparseExperienceFixture as unknown as TrajectoryEntry]}
      />
    );
    expect(
      screen.getAllByRole("heading", { name: "Analista de Sistemas" }).length
    ).toBeGreaterThan(0);
    expect(screen.queryByText("Competências")).not.toBeInTheDocument();
    expect(screen.queryByText("Projetos deste período")).not.toBeInTheDocument();
  });
});

describe("experiencesQuery", () => {
  it("applies the public gate to the related-projects subquery", () => {
    expect(experiencesQuery).toContain("references(^._id)");
    expect(experiencesQuery).toContain('status == "published"');
    expect(experiencesQuery).toContain('visibility != "private"');
  });
  it("orders current roles first, then newest", () => {
    expect(experiencesQuery).toContain("coalesce(period.ongoing, false) desc");
    expect(experiencesQuery).toContain("period.startDate desc");
  });
});
