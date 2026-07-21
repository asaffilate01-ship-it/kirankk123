import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BRANDS, type Brand } from "@/lib/brands";
import { buildModel, useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SliderRow } from "@/components/dashboard/SliderRow";
import { fmtEUR, fmtEURk, fmtNum, fmtPct } from "@/components/dashboard/format";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/brands/$brandId")({
  loader: ({ params }) => {
    const brand = BRANDS.find((b) => b.id === params.brandId);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.brand.name} — LoungeTech` : "Brand — LoungeTech" },
      {
        name: "description",
        content: loaderData?.brand.tagline ?? "LoungeTech brand detail",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl p-8">
      <p className="text-sm text-muted-foreground">Brand not found.</p>
      <Link to="/" className="text-sm underline">Back to dashboard</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl p-8 text-sm text-destructive">{String(error)}</div>
  ),
  component: BrandDetail,
});

function BrandDetail() {
  const { brand } = Route.useLoaderData() as { brand: Brand };
  const state = useFinance();
  const a = state.brands[brand.id];
  const rows = buildModel(state);
  const lastRow = rows[rows.length - 1];
  const mrr = lastRow.perBrandRevenue[brand.id] ?? 0;
  const users = lastRow.perBrandUsers[brand.id] ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: brand.color }} aria-hidden />
            <span className="text-sm font-semibold">{brand.name}</span>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{brand.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{brand.tagline}</p>
          </div>
          <p className="text-sm">{brand.description}</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-md border p-3 text-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Market</div>
              <div className="mt-1">{brand.market}</div>
            </div>
            <div className="rounded-md border p-3 text-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Audience</div>
              <div className="mt-1">{brand.audience}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">
              Competition & how we break their strength
            </div>
            <div className="mt-2 space-y-2">
              {brand.competitors.map((c) => (
                <div key={c.name} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Strength: {c.strength}</div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-emerald-500">Counter:</span> {c.counter}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="flex h-fit flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Assumptions</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Enabled</span>
              <Switch
                checked={a.enabled}
                onCheckedChange={(v) => state.setBrand(brand.id, { enabled: v })}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-md bg-muted/50 p-2 text-center text-xs">
            <div>
              <div className="text-muted-foreground">Launch</div>
              <div className="font-semibold">M{a.launchMonth}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Users @ M{rows.length}</div>
              <div className="font-semibold">{fmtNum(users)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">MRR @ M{rows.length}</div>
              <div className="font-semibold">{fmtEURk(mrr)}</div>
            </div>
          </div>
          <SliderRow label="Launch month" value={a.launchMonth} min={1} max={state.global.months}
            onChange={(v) => state.setBrand(brand.id, { launchMonth: v })} />
          <SliderRow label="Initial paid users (post-trial)" value={a.initialUsers} min={0} max={2000} step={10}
            onChange={(v) => state.setBrand(brand.id, { initialUsers: v })} format={fmtNum} />
          <SliderRow label="Monthly user growth" value={Math.round(a.userGrowth * 1000) / 10}
            min={0} max={40} step={0.5}
            onChange={(v) => state.setBrand(brand.id, { userGrowth: v / 100 })}
            format={(v) => `${v.toFixed(1)}%`} />
          <SliderRow label="ARPU" value={a.arpu} min={0} max={500} step={1}
            onChange={(v) => state.setBrand(brand.id, { arpu: v })}
            format={(v) => `€${v.toFixed(0)}/mo`} />
          <SliderRow label="Monthly churn" value={Math.round(a.churn * 1000) / 10}
            min={0} max={15} step={0.1}
            onChange={(v) => state.setBrand(brand.id, { churn: v / 100 })}
            format={(v) => `${v.toFixed(1)}%`} />
          <SliderRow label="Other revenue / mo" value={a.addlRevenue} min={0} max={50000} step={100}
            onChange={(v) => state.setBrand(brand.id, { addlRevenue: v })} format={fmtEURk} />
          <SliderRow label="Direct brand cost / mo" value={a.directCost} min={0} max={30000} step={100}
            onChange={(v) => state.setBrand(brand.id, { directCost: v })} format={fmtEURk} />
          <div className="grid grid-cols-2 gap-2 rounded-md bg-muted/50 p-3 text-xs">
            <div>Free trial: <b>{state.global.freeTrialMonths} mo</b></div>
            <div>ARPU: <b>{fmtEUR(a.arpu)}</b></div>
            <div>Churn: <b>{fmtPct(a.churn)}</b></div>
            <div>Growth: <b>{fmtPct(a.userGrowth)}</b></div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/">Back to full dashboard</Link>
          </Button>
        </Card>
      </main>
    </div>
  );
}