import { AssumptionsPanel } from "@/components/dashboard/AssumptionsPanel";
import { BalanceSheetPanel } from "@/components/dashboard/BalanceSheetPanel";
import { BrandsPanel } from "@/components/dashboard/BrandsPanel";
import { CashFlowPanel } from "@/components/dashboard/CashFlowPanel";
import { ChartsPanel } from "@/components/dashboard/ChartsPanel";
import { FundingPanel } from "@/components/dashboard/FundingPanel";
import { OverviewPanel } from "@/components/dashboard/OverviewPanel";
import { PLPanel } from "@/components/dashboard/PLPanel";
import { SystemPanel } from "@/components/dashboard/SystemPanel";
import { SiteFooter } from "@/components/SiteFooter";
import { Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { WorkspaceHeader } from "@/components/workspace-navigation";
import { TARGET_BRAND_COUNT } from "@/lib/brands";
import { clearGateToken } from "@/lib/gate-client";
import { lockSite,requireUnlocked } from "@/lib/gate.functions";
import { t } from "@/lib/i18n";
import { createFileRoute,redirect,useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
Boxes,
HandCoins,
LayoutDashboard,
LineChart,
MoreHorizontal,
Network,
Receipt,
Scale,
SlidersHorizontal,
Wallet
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/investment")({
  beforeLoad: async () => {
    const { unlocked } = await requireUnlocked();
    if (!unlocked) throw redirect({ to: "/unlock", search: { error: undefined } });
  },
  head: () => ({
    meta: [
      { title: "iTechLounge Dashboard — Live Financial Model" },
      {
        name: "description",
        content:
          "Private investor dashboard for iTechLounge — 100 UK, German and international brand entities, launch traction, live financial forecasts and per-brand plans.",
      },
      { property: "og:title", content: "iTechLounge Dashboard — Live Financial Model" },
      {
        property: "og:description",
        content:
          "Private investor dashboard for iTechLounge with 100 UK, German and international brand entities, launch traction and live financial forecasts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Index,
});

function Index() {
  const router = useRouter();
  const lock = useServerFn(lockSite);
  const [tab, setTab] = useState("overview");
  const [moreOpen, setMoreOpen] = useState(false);
  async function handleLock() {
    await lock({});
    clearGateToken();
    await router.navigate({ to: "/unlock", search: { error: undefined } });
    router.invalidate();
  }

  const primary = [
    { value: "overview", label: t("Overview"), icon: LayoutDashboard },
    { value: "funding", label: t("Investment"), icon: HandCoins },
    { value: "brands", label: t("Brands"), icon: Boxes },
    { value: "charts", label: t("Charts"), icon: LineChart },
  ];
  const secondary = [
    { value: "assumptions", label: t("Assumptions"), icon: SlidersHorizontal },
    { value: "pl", label: t("P&L"), icon: Receipt },
    { value: "cash", label: t("Cash flow"), icon: Wallet },
    { value: "bs", label: t("Balance sheet"), icon: Scale },
    { value: "system", label: t("Our system"), icon: Network },
  ];
  const moreActive = secondary.some((s) => s.value === tab);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <WorkspaceHeader area="investor" title={t("Investor dashboard")} onLock={handleLock} />
      <main id="workspace-main" tabIndex={-1} className="pb-tabbar mx-auto max-w-7xl px-4 py-4 sm:py-6 md:pb-6">
        <div className="workspace-intro"><div><span>{t("Investor dashboard")}</span><h1>{t("Live financial model")}</h1><p>{TARGET_BRAND_COUNT} {t("brands")} · {t("36-month forecast")} · {t("All figures € · assumptions editable")}</p></div></div>
        <Tabs value={tab} onValueChange={setTab} className="space-y-4 sm:space-y-6">
          <TabsList className="hidden flex-wrap md:flex">
            {[...primary, ...secondary].map((i) => (
              <TabsTrigger key={i.value} value={i.value}>
                {i.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <h2 className="text-lg font-semibold tracking-tight md:hidden">
            {[...primary, ...secondary].find((i) => i.value === tab)?.label}
          </h2>
          <TabsContent value="overview">
            <OverviewPanel />
          </TabsContent>
          <TabsContent value="funding">
            <FundingPanel />
          </TabsContent>
          <TabsContent value="system">
            <SystemPanel />
          </TabsContent>
          <TabsContent value="brands">
            <BrandsPanel />
          </TabsContent>
          <TabsContent value="assumptions">
            <AssumptionsPanel />
          </TabsContent>
          <TabsContent value="pl">
            <PLPanel />
          </TabsContent>
          <TabsContent value="cash">
            <CashFlowPanel />
          </TabsContent>
          <TabsContent value="bs">
            <BalanceSheetPanel />
          </TabsContent>
          <TabsContent value="charts">
            <ChartsPanel />
          </TabsContent>
        </Tabs>
      </main>

      <div className="pb-tabbar md:pb-0">
        <SiteFooter />
      </div>

      <nav aria-label="Primary" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {primary.map((i) => {
            const active = tab === i.value;
            return (
              <button
                key={i.value}
                type="button"
                onClick={() => setTab(i.value)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <i.icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} />
                <span className="truncate">{i.label}</span>
              </button>
            );
          })}
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={`flex min-h-14 w-full flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium ${
                  moreActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <MoreHorizontal className="h-5 w-5" />
                <span>{t("More")}</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="safe-bottom max-h-[80dvh] overflow-y-auto rounded-t-2xl">
              <SheetHeader className="text-left">
                <SheetTitle>{t("More")}</SheetTitle>
              </SheetHeader>
              <div className="mt-3 space-y-1">
                {secondary.map((i) => (
                  <button
                    key={i.value}
                    type="button"
                    onClick={() => {
                      setTab(i.value);
                      setMoreOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                      tab === i.value ? "bg-muted font-semibold text-primary" : "hover:bg-muted/60"
                    }`}
                  >
                    <i.icon className="h-4 w-4 shrink-0" />
                    {i.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
