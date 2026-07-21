import { useMemo } from "react";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { BRANDS } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import { fmtEURk, fmtPct } from "./format";

export function OverviewPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const years = useMemo(() => yearSummaries(rows), [rows]);
  const last = rows[rows.length - 1];
  const totalFunding = Math.min(state.global.months, state.global.trancheCount) * state.global.trancheSize;
  const cumInvestor = rows.reduce((s, r) => s + r.investorShare, 0);
  const monthAtMilestone = rows.find((r) => r.revenue >= 1_000_000)?.month;
  const minCash = rows.reduce((m, r) => Math.min(m, r.cashBalance), Infinity);

  const activeBrands = BRANDS.filter((b) => state.brands[b.id]?.enabled).length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">LoungeTech Digitallösungen GmbH</h1>
        <p className="text-sm text-muted-foreground">
          Live investor model — 10 German-focused digital brands, one operating team. Drag any slider to
          re-forecast P&L, cash flow and balance sheet in real time.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Active brands" value={`${activeBrands} / 10`} />
        <Kpi label={`MRR @ M${rows.length}`} value={fmtEURk(last.revenue)} />
        <Kpi label="Funding raised" value={fmtEURk(totalFunding)} />
        <Kpi
          label="€1m/mo hit at"
          value={monthAtMilestone ? `M${monthAtMilestone}` : "not reached"}
        />
        <Kpi
          label="Cash trough"
          value={fmtEURk(minCash)}
          tone={minCash < 0 ? "bad" : "good"}
        />
        <Kpi label={`Cash @ M${rows.length}`} value={fmtEURk(last.cashBalance)} />
        <Kpi label="Investor cumulative share" value={fmtEURk(cumInvestor)} />
        <Kpi
          label={`Margin @ M${rows.length}`}
          value={last.revenue > 0 ? fmtPct(last.ebit / last.revenue) : "—"}
        />
      </div>

      <Card className="p-4">
        <h3 className="mb-3 font-semibold">Year-by-year summary</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {years.map((y) => (
            <div key={y.year} className="rounded-lg border p-3">
              <div className="text-xs uppercase text-muted-foreground">Year {y.year}</div>
              <div className="mt-2 space-y-1 text-sm">
                <Row k="Revenue" v={fmtEURk(y.revenue)} />
                <Row k="EBIT" v={fmtEURk(y.ebit)} />
                <Row k="Margin" v={fmtPct(y.margin)} />
                <Row k="Net profit" v={fmtEURk(y.netProfit)} />
                <Row k="Investor share (45%)" v={fmtEURk(y.investorShare)} />
                <Row k="Year-end cash" v={fmtEURk(y.endCash)} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-2 p-4 text-sm">
        <h3 className="font-semibold">Investor terms</h3>
        <p className="text-muted-foreground">
          {fmtEURk(state.global.trancheSize)} monthly tranches × {state.global.trancheCount} months
          ({fmtEURk(totalFunding)} total) in exchange for{" "}
          <b>{fmtPct(state.global.investorEquityPct)} equity</b> and{" "}
          <b>{fmtPct(state.global.investorProfitSharePct)} of monthly net profit</b>. All 10 brands
          launch on a 3-week rolling cadence with a {state.global.freeTrialMonths}-month free trial.
        </p>
      </Card>
    </div>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <Card className="p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={`mt-1 text-lg font-semibold tabular-nums ${
          tone === "bad" ? "text-red-500" : tone === "good" ? "text-emerald-500" : ""
        }`}
      >
        {value}
      </div>
    </Card>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="tabular-nums font-medium">{v}</span>
    </div>
  );
}