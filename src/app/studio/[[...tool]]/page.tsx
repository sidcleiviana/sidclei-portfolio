import { Studio } from "./Studio";

/**
 * Sanity Studio, embedded at /studio (Sprint §30). The actual Studio lives in
 * the client component `Studio.tsx` so `sanity.config` is never evaluated in
 * the React Server Components runtime during build.
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
