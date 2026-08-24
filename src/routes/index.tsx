import { t } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewPanel } from "@/components/dashboard/OverviewPanel";
import { BrandsPanel } from "@/components/dashboard/BrandsPanel";
import { AssumptionsPanel } from "@/components/dashboard/AssumptionsPanel";
import { PLPanel } from "@/components/dashboard/PLPanel";
import { CashFlowPanel } from "@/components/dashboard/CashFlowPanel";
import { BalanceSheetPanel } from "@/components/dashboard/BalanceSheetPanel";
import { ChartsPanel } from "@/components/dashboard/ChartsPanel";
import { FundingPanel } from "@/components/dashboard/FundingPanel";
import { SystemPanel } from "@/components/dashboard/SystemPanel";
import { BrandLogo } from "@/components/BrandLogo";
import { TARGET_BRAND_COUNT } from "@/lib/brands";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SiteFooter } from "@/components/SiteFooter";
import { lockSite } from "@/lib/gate.functions";
import { GateGuard } from "@/components/GateGuard";
import { clearGateToken } from "@/lib/gate-client";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  Boxes,
  SlidersHorizontal,
  Receipt,
  Wallet,
  Scale,
  LineChart,
  HandCoins,
  Network,
  MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iTechLounge Dashboard — Live Financial Model" },
      {
        name: "description",
        content:
          "Interactive dashboard for iTechLounge — 10 German digital brands, live P&L, cash flow, balance sheet and per-brand assumptions.",
      },
      { property: "og:title", content: "iTechLounge Dashboard — Live Financial Model" },
      {
        property: "og:description",
        content:
          "Interactive dashboard for iTechLounge with 10 German digital brands, live P&L, cash flow, balance sheet and per-brand assumptions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <GateGuard>
      <Index />
    </GateGuard>
  ),
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 sm:py-3">
          <div className="flex min-w-0 items-center gap-3">
            <BrandLogo className="h-9 shrink-0 sm:h-14" />
            <div className="min-w-0">
              <h1 className="text-sm font-semibold tracking-tight">{t("iTechLounge")}</h1>
              <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                {t("Live dashboard")} · {TARGET_BRAND_COUNT} {t("brands")} · {t("36-month forecast")}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{t("All figures € · assumptions editable")}</span>
            <LanguageToggle />
            <Button variant="outline" size="sm" onClick={handleLock} className="px-2 sm:px-3">
              <LogOut className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">{t("Lock")}</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:py-6 md:pb-6">
        <Tabs value={tab} onValueChange={setTab} className="space-y-4 sm:space-y-6">
          <TabsList className="hidden flex-wrap md:flex">
            {[...primary, ...secondary].map((i) => (
              <TabsTrigger key={i.value} value={i.value}>{i.label}</TabsTrigger>
            ))}
          </TabsList>
          <h2 className="text-lg font-semibold tracking-tight md:hidden">
            {[...primary, ...secondary].find((i) => i.value === tab)?.label}
          </h2>
          <TabsContent value="overview"><OverviewPanel /></TabsContent>
          <TabsContent value="funding"><FundingPanel /></TabsContent>
          <TabsContent value="system"><SystemPanel /></TabsContent>
          <TabsContent value="brands"><BrandsPanel /></TabsContent>
          <TabsContent value="assumptions"><AssumptionsPanel /></TabsContent>
          <TabsContent value="pl"><PLPanel /></TabsContent>
          <TabsContent value="cash"><CashFlowPanel /></TabsContent>
          <TabsContent value="bs"><BalanceSheetPanel /></TabsContent>
          <TabsContent value="charts"><ChartsPanel /></TabsContent>
        </Tabs>
      </main>

      <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <SiteFooter />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {primary.map((i) => {
            const active = tab === i.value;
            return (
              <button
                key={i.value}
                type="button"
                onClick={() => setTab(i.value)}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-medium transition-colors ${
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
                className={`flex flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-medium ${
                  moreActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <MoreHorizontal className="h-5 w-5" />
                <span>{t("More")}</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl">
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
