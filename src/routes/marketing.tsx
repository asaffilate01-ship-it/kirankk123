import { createFileRoute, Link, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, Store } from "lucide-react";
import { MarketingGateGuard } from "@/components/MarketingGateGuard";
import { MarketingPanel } from "@/components/dashboard/MarketingPanel";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { clearMarketingGateToken } from "@/lib/gate-client";
import { lockMarketing, requireMarketingUnlocked } from "@/lib/gate.functions";
import { t } from "@/lib/i18n";

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
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3"><div className="flex min-w-0 items-center gap-3"><BrandLogo className="h-10 shrink-0 sm:h-14" /><div><h1 className="text-sm font-semibold">{t("Portfolio marketing")}</h1><p className="text-[11px] text-muted-foreground">{t("Private operating plan · separate from investment")}</p></div></div><div className="flex items-center gap-2"><Button asChild variant="outline" size="sm"><Link to="/portfolio"><Store className="mr-1 h-3.5 w-3.5" />{t("Public portfolio")}</Link></Button><LanguageToggle /><Button variant="outline" size="sm" onClick={handleLock}><LogOut className="mr-1 h-3.5 w-3.5" />{t("Lock")}</Button></div></div></header>
      <main className="mx-auto max-w-7xl px-4 py-5 sm:py-7"><MarketingPanel /></main>
      <SiteFooter />
    </div>
  );
}
