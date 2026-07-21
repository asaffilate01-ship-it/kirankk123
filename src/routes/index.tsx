import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewPanel } from "@/components/dashboard/OverviewPanel";
import { BrandsPanel } from "@/components/dashboard/BrandsPanel";
import { AssumptionsPanel } from "@/components/dashboard/AssumptionsPanel";
import { PLPanel } from "@/components/dashboard/PLPanel";
import { CashFlowPanel } from "@/components/dashboard/CashFlowPanel";
import { BalanceSheetPanel } from "@/components/dashboard/BalanceSheetPanel";
import { ChartsPanel } from "@/components/dashboard/ChartsPanel";
import logoAsset from "@/assets/loungetech-logo.png.asset.json";
import { requireUnlocked, lockSite } from "@/lib/gate.functions";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/")({
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "LoungeTech Investor Dashboard — Live Financial Model" },
      {
        name: "description",
        content:
          "Interactive investor model for LoungeTech Digitallösungen GmbH — 10 German digital brands, live P&L, cash flow, balance sheet and per-brand assumptions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const router = useRouter();
  const lock = useServerFn(lockSite);
  async function handleLock() {
    await lock({});
    await router.navigate({ to: "/unlock" });
    router.invalidate();
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="LoungeTech Digitallösungen GmbH"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-sm font-semibold tracking-tight">LoungeTech Digitallösungen GmbH</h1>
              <p className="text-xs text-muted-foreground">
                Live investor dashboard · 10 brands · 36-month forecast
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              All figures € · assumptions editable
            </span>
            <Button variant="outline" size="sm" onClick={handleLock}>
              <LogOut className="mr-1 h-3.5 w-3.5" /> Lock
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
            <TabsTrigger value="pl">P&amp;L</TabsTrigger>
            <TabsTrigger value="cash">Cash flow</TabsTrigger>
            <TabsTrigger value="bs">Balance sheet</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><OverviewPanel /></TabsContent>
          <TabsContent value="brands"><BrandsPanel /></TabsContent>
          <TabsContent value="assumptions"><AssumptionsPanel /></TabsContent>
          <TabsContent value="pl"><PLPanel /></TabsContent>
          <TabsContent value="cash"><CashFlowPanel /></TabsContent>
          <TabsContent value="bs"><BalanceSheetPanel /></TabsContent>
          <TabsContent value="charts"><ChartsPanel /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
