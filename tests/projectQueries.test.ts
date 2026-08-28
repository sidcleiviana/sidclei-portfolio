import { describe, expect, it } from "vitest";

import {
  projectBySlugQuery,
  projectSlugsQuery,
  projectsListQuery,
} from "@/sanity/queries/projects";

/**
 * The confidentiality contract (Sprint §20, §57) is enforced in GROQ so private
 * content never leaves the CMS. If someone loosens these filters, this fails.
 */
describe("project queries enforce the public gate", () => {
  const queries = { projectsListQuery, projectSlugsQuery, projectBySlugQuery };

  for (const [name, query] of Object.entries(queries)) {
    it(`${name} filters to published, non-private projects`, () => {
      expect(query).toContain('status == "published"');
      expect(query).toContain('visibility != "private"');
      expect(query).toContain('_type == "project"');
    });
  }

  it("looks projects up by slug, not by Sanity _id (Sprint §38)", () => {
    expect(projectBySlugQuery).toContain("slug.current == $slug");
  });
});
