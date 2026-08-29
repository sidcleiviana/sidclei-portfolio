import { CACHE_TAGS } from "./fetch";

export type RevalidatePayload = {
  _type?: string;
  slug?: string | { current?: string } | null;
};

/**
 * Maps a Sanity webhook payload (`{ _type, slug }`) to the Next.js cache tags
 * that must be purged. Pure and unit-tested (`tests/revalidateWebhook.test.ts`).
 *
 * A project change can also change what appears under an experience, and
 * skills / technologies surface in both projections — so those purge both
 * `projects` and `experience`. Nothing does a blanket `revalidatePath("/")`.
 */
export function tagsForWebhookPayload(payload: RevalidatePayload): string[] {
  const slug =
    typeof payload.slug === "string" ? payload.slug : payload.slug?.current;

  switch (payload._type) {
    case "project": {
      const tags: string[] = [CACHE_TAGS.projects, CACHE_TAGS.experience];
      if (slug) tags.push(`${CACHE_TAGS.project}:${slug}`);
      return tags;
    }
    case "experience":
      return [CACHE_TAGS.experience];
    case "profile":
      return [CACHE_TAGS.profile];
    case "siteSettings":
      return [CACHE_TAGS.siteSettings];
    default:
      return payload._type ? [CACHE_TAGS.projects, CACHE_TAGS.experience] : [];
  }
}
