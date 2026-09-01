import { client } from "./client";

type SanityFetchOptions<TFallback> = {
  query: string;
  params?: Record<string, unknown>;
  /** Cache tags for on-demand revalidation via the Sanity webhook. */
  tags?: string[];
  /** Time-based fallback revalidation, in seconds. Default: 60. */
  revalidate?: number;
  /** Returned as-is when Sanity is not configured or the request fails. */
  fallback: TFallback;
};

/**
 * The single entry point for reading content on the server (Sprint §34).
 *
 * - Uses the authenticated `client` (private dataset, Sprint 0.2.1). The token
 *   lives only on the server; it is never sent to the browser.
 * - Wires Next.js cache tags so the `/api/revalidate` webhook can purge
 *   exactly the affected pages (Sprint §33).
 * - Never throws: when unconfigured or on error it resolves to `fallback`,
 *   which lets pages render their empty / error state (Sprint §36, CLAUDE.md §34).
 */
export async function sanityFetch<TFallback>({
  query,
  params = {},
  tags,
  revalidate = 60,
  fallback,
}: SanityFetchOptions<TFallback>): Promise<TFallback> {
  if (!client) return fallback;

  try {
    return (await client.fetch(query, params, {
      next: { revalidate, ...(tags ? { tags } : {}) },
    })) as TFallback;
  } catch (error) {
    console.error("[sanityFetch] query failed:", error);
    return fallback;
  }
}

/** Cache tags used across the app. */
export const CACHE_TAGS = {
  project: "project",
  projects: "projects",
  experience: "experience",
  profile: "profile",
  siteSettings: "siteSettings",
  skills: "skills",
  technologies: "technologies",
  knowledge: "knowledge",
} as const;
