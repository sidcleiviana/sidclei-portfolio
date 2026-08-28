/**
 * Central place that reads Sanity configuration from the environment.
 *
 * `projectId` and `dataset` are NOT secrets and may be exposed to the browser.
 * The read token and the revalidation secret are server-only and must never be
 * prefixed with `NEXT_PUBLIC_` (Sprint §21, §49).
 *
 * When the project id is missing the app still builds and runs: pages render
 * their empty state and the Studio route shows a configuration notice.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

/** Server-only. Undefined for public datasets. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

/** Server-only. Used to authenticate the revalidation webhook. */
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET ?? "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** True only when a real Sanity project is wired up. */
export const isSanityConfigured = projectId.trim().length > 0;

/** Studio needs *some* string; use a harmless placeholder when unconfigured. */
export const studioProjectId = isSanityConfigured ? projectId : "placeholder";
