import { MarketingGateGuard } from "@/components/MarketingGateGuard";
import { MobileTabBar } from "@/components/MobileTabBar";
import { SiteFooter } from "@/components/SiteFooter";
import { MarketingPanel } from "@/components/dashboard/MarketingPanel";
import { WorkspaceHeader } from "@/components/workspace-navigation";
import { clearMarketingGateToken } from "@/lib/gate-client";
import { lockMarketing,requireMarketingUnlocked } from "@/lib/gate.functions";
import { t } from "@/lib/i18n";
import { createFileRoute,redirect,useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { LogOut,Megaphone,Store } from "lucide-react";

export const Route = createFileRoute("/marketing")({
  beforeLoad: async () => {
    const { unlocked } = await requireMarketingUnlocked();
    if (!unlocked) throw redirect({ to: "/marketing/unlock", search: { error: undefined } });
  },
  head: () => ({ meta: [{ title: "Marketing strategy — iTechLounge" }, { name: "description", content: "Private per-brand UK, Germany and international marketing action plans." }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <MarketingGateGuard><MarketingPage /></MarketingGateGuard>,
});

function MarketingPage() {
  const router = useRouter();
  const lock = useServerFn(lockMarketing);
  async function handleLock() {
    await lock({});
    clearMarketingGateToken();
    await router.navigate({ to: "/marketing/unlock", search: { error: undefined } });
    router.invalidate();
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <WorkspaceHeader area="marketing" title={t("Marketing workspace")} onLock={handleLock} />
      <main id="workspace-main" tabIndex={-1} className="pb-tabbar mx-auto max-w-7xl px-4 py-5 sm:py-7 md:pb-0"><div className="workspace-intro"><div><span>{t("Marketing workspace")}</span><h1>{t("Portfolio marketing")}</h1><p>{t("Private brand marketing plans")}</p></div></div><MarketingPanel /></main>
      <div className="pb-tabbar md:pb-0"><SiteFooter /></div>
      <MobileTabBar
        items={[
          { label: t("Marketing"), icon: Megaphone, active: true, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
          { label: t("Portfolio"), icon: Store, to: "/portfolio" },
          { label: t("Lock"), icon: LogOut, onClick: handleLock },
        ]}
      />
    </div>
  );
}
