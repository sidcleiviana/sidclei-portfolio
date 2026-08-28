// @vitest-environment node
import { createHmac } from "node:crypto";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidateTag }));

const SECRET = "test-revalidate-secret-0123456789";

/** Reproduces the `sanity-webhook-signature` header format (@sanity/webhook). */
function signaturePayload(body: string, secret: string, ts = Date.now()) {
  const digest = createHmac("sha256", secret)
    .update(`${ts}.${body}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `t=${ts},v1=${digest}`;
}

function request(body: string, signature?: string) {
  const headers = new Headers({ "content-type": "application/json" });
  if (signature) headers.set("sanity-webhook-signature", signature);
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers,
    body,
  });
}

async function loadRoute() {
  vi.resetModules();
  vi.stubEnv("SANITY_REVALIDATE_SECRET", SECRET);
  return import("@/app/api/revalidate/route");
}

describe("tagsForWebhookPayload", () => {
  it("maps document types to the right cache tags", async () => {
    const { tagsForWebhookPayload } = await import("@/sanity/revalidate");
    expect(
      tagsForWebhookPayload({ _type: "project", slug: "visionhash" })
    ).toEqual(["projects", "project:visionhash"]);
    expect(
      tagsForWebhookPayload({ _type: "project", slug: { current: "x" } })
    ).toEqual(["projects", "project:x"]);
    expect(tagsForWebhookPayload({ _type: "project" })).toEqual(["projects"]);
    expect(tagsForWebhookPayload({ _type: "profile" })).toEqual(["profile"]);
    expect(tagsForWebhookPayload({ _type: "siteSettings" })).toEqual([
      "siteSettings",
    ]);
    // unknown types still refresh the project list (they appear in projections)
    expect(tagsForWebhookPayload({ _type: "technology" })).toEqual([
      "projects",
    ]);
  });
});

describe("POST /api/revalidate", () => {
  beforeEach(() => revalidateTag.mockClear());
  afterEach(() => vi.unstubAllEnvs());

  it("rejects a request with no signature header (401)", async () => {
    const { POST } = await loadRoute();
    const res = await POST(
      request(JSON.stringify({ _type: "project", slug: "a" })) as never
    );
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a request with an invalid signature (401)", async () => {
    const { POST } = await loadRoute();
    const body = JSON.stringify({ _type: "project", slug: "a" });
    const res = await POST(
      request(body, "t=1700000000000,v1=deadbeef") as never
    );
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("accepts a correctly signed request and revalidates the right tags (200)", async () => {
    const { POST } = await loadRoute();
    const body = JSON.stringify({ _type: "project", slug: "meu-projeto" });
    const res = await POST(
      request(body, signaturePayload(body, SECRET)) as never
    );

    expect(res.status).toBe(200);
    const json = (await res.json()) as { revalidated: boolean; tags: string[] };
    expect(json.revalidated).toBe(true);
    expect(json.tags).toEqual(["projects", "project:meu-projeto"]);
    expect(revalidateTag).toHaveBeenCalledWith("projects");
    expect(revalidateTag).toHaveBeenCalledWith("project:meu-projeto");
  });

  it("returns 503 when the revalidation secret is not configured", async () => {
    vi.resetModules();
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "");
    const { POST } = await import("@/app/api/revalidate/route");
    const res = await POST(
      request(JSON.stringify({ _type: "project" })) as never
    );
    expect(res.status).toBe(503);
  });

  it("returns 400 when a signed payload has no _type", async () => {
    const { POST } = await loadRoute();
    const body = JSON.stringify({ slug: "a" });
    const res = await POST(
      request(body, signaturePayload(body, SECRET)) as never
    );
    expect(res.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
