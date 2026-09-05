import { AgentMount } from "@/components/agent/AgentMount";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getProfile, getSiteSettings } from "@/sanity/queries";

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
