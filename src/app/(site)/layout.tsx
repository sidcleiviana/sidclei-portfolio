import type { Metadata } from "next";

import { AgentMount } from "@/components/agent/AgentMount";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getProfile, getSiteSettings } from "@/sanity/queries";

/**
 * The site-wide titled default comes from the *published* `profile.headline`
 * (the professional positioning) — never from a hardcoded string or a code
 * fallback. Until the Profile document is (re)published, this stays at whatever
 * headline the CMS currently serves; an outage falls back to the root layout's
 * neutral "Sidclei Viana".
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const headline = profile?.headline?.trim();
  return {
    title: {
      default: headline ? `Sidclei Viana — ${headline}` : "Sidclei Viana",
      template: "%s — Sidclei Viana",
    },
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, profile] = await Promise.all([
    getSiteSettings(),
    getProfile(),
  ]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      {/* positioning context for the roaming Living Agent; clip the horizontal
          bleed of an agent parked near an edge without breaking sticky rails */}
      <div className="relative flex flex-1 flex-col [overflow-x:clip]">
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter profile={profile} note={settings?.footerNote} />
        <AgentMount />
      </div>
    </div>
  );
}
