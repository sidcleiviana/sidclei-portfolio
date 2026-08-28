import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";
import {
  type RevalidatePayload,
  tagsForWebhookPayload,
} from "@/sanity/revalidate";

/**
 * On-demand revalidation endpoint for the Sanity GROQ-powered webhook
 * (Sprint §33). Configure a webhook in sanity.io/manage pointing here with
 * a shared secret (SANITY_REVALIDATE_SECRET) and this projection:
 *
 *   { "_type": _type, "slug": slug.current }
 *
 * The signature is verified with `parseBody` — unauthenticated requests are
 * rejected (Sprint §33, §49). `parseBody`'s built-in 3s wait for Content Lake
 * eventual consistency is disabled: revalidation is idempotent and the next
 * request re-fetches anyway, so blocking the webhook is not worth it here
 * (documented in docs/decisions/ADR-003).
 */
export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return new NextResponse("Revalidation secret not configured", {
      status: 503,
    });
  }

  try {
    const { isValidSignature, body } = await parseBody<RevalidatePayload>(
      req,
      revalidateSecret,
      false
    );

    if (isValidSignature !== true) {
      return new NextResponse("Invalid or missing signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing _type in payload", { status: 400 });
    }

    const tags = tagsForWebhookPayload(body);
    for (const tag of tags) revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      tags,
      now: Date.now(),
    });
  } catch (error) {
    console.error("[revalidate] failed:", error);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
