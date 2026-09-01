import { CACHE_TAGS } from "./fetch";

export type RevalidatePayload = {
  _type?: string;
  slug?: string | { current?: string } | null;
};

/**
 * Maps a Sanity webhook payload (`{ _type, slug }`) to the Next.js cache tags
 * that must be purged. Pure and unit-tested (`tests/revalidateWebhook.test.ts`).
 *
 * A project change can also change what appears under an experience or a
 * skill / technology detail page; a skill / technology rename surfaces in the
 * experience badges, the project meta and the knowledge hub. So the relational
 * types purge several tags. Nothing does a blanket `revalidatePath("/")`.
 */
export function tagsForWebhookPayload(payload: RevalidatePayload): string[] {
  const slug =
    typeof payload.slug === "string" ? payload.slug : payload.slug?.current;

  switch (payload._type) {
    case "project": {
      const tags: string[] = [
        CACHE_TAGS.projects,
        CACHE_TAGS.experience,
        CACHE_TAGS.knowledge,
      ];
      if (slug) tags.push(`${CACHE_TAGS.project}:${slug}`);
      return tags;
    }
    case "experience":
      return [CACHE_TAGS.experience, CACHE_TAGS.knowledge];
    case "skill": {
      const tags: string[] = [
        CACHE_TAGS.knowledge,
        CACHE_TAGS.skills,
        CACHE_TAGS.experience,
        CACHE_TAGS.projects,
      ];
      if (slug) tags.push(`skill:${slug}`);
      return tags;
    }
    case "technology": {
      const tags: string[] = [
        CACHE_TAGS.knowledge,
        CACHE_TAGS.technologies,
        CACHE_TAGS.experience,
        CACHE_TAGS.projects,
      ];
      if (slug) tags.push(`technology:${slug}`);
      return tags;
    }
    case "profile":
      return [CACHE_TAGS.profile];
    case "siteSettings":
      return [CACHE_TAGS.siteSettings];
    default:
      return payload._type ? [CACHE_TAGS.projects, CACHE_TAGS.experience] : [];
  }
}
