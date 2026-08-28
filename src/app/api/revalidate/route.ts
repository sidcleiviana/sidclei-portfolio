import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { CACHE_TAGS } from "@/sanity/fetch";
import { revalidateSecret } from "@/sanity/env";

type WebhookPayload = {
  _type?: string;
  slug?: string | { current?: string };
};

/**
 * On-demand revalidation endpoint for the Sanity GROQ-powered webhook
 * (Sprint §33). Configure a webhook in sanity.io/manage pointing here with
 * a shared secret (SANITY_REVALIDATE_SECRET) and this projection:
 *
 *   { "_type": _type, "slug": slug.current }
 *
 * The signature is verified with `parseBody` — unauthenticated requests are
 * rejected (Sprint §33, §49).
 */
export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return new NextResponse("Revalidation secret not configured", {
      status: 503,
    });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      revalidateSecret
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing _type in payload", { status: 400 });
    }

    const tags = new Set<string>();
    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;

    switch (body._type) {
      case "project":
        tags.add(CACHE_TAGS.projects);
        if (slug) tags.add(`${CACHE_TAGS.project}:${slug}`);
        break;
      case "profile":
        tags.add(CACHE_TAGS.profile);
        break;
      case "siteSettings":
        tags.add(CACHE_TAGS.siteSettings);
        break;
      default:
        // skills, technologies, experiences… surface inside project projections.
        tags.add(CACHE_TAGS.projects);
    }

    for (const tag of tags) revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      tags: [...tags],
      now: Date.now(),
    });
  } catch (error) {
    console.error("[revalidate] failed:", error);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
