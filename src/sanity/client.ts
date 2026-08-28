import { createClient, type SanityClient } from "next-sanity";

import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  readToken,
} from "./env";

/**
 * Server-side Sanity client. `null` when the project is not configured so
 * callers degrade gracefully instead of throwing at import time.
 *
 * The `production` dataset is **private** (Sprint 0.2.1): every content read
 * must be authenticated. The token is applied here so any server consumer is
 * authenticated by default, not only `sanityFetch`. The CDN is used only for
 * anonymous reads — authenticated requests go straight to the API.
 * `readToken` is server-only and never reaches the browser bundle.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: !readToken,
      perspective: "published",
      ...(readToken ? { token: readToken } : {}),
    })
  : null;
