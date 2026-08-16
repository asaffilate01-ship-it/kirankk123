import { useMemo } from "react";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { BRANDS, SHARED_ADVANTAGE } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import { fmtEURk, fmtPct } from "./format";
import logoEn from "@/assets/itechlounge-logo-en.png";
import logoDe from "@/assets/itechlounge-logo-de.png";

export function OverviewPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const years = useMemo(() => yearSummaries(rows), [rows]);
  const last = rows[rows.length - 1];
  const totalFunding = Math.min(state.global.months, state.global.trancheCount) * state.global.trancheSize;
  const cumInvestor = rows.reduce((s, r) => s + r.investorShare, 0);
  const cumFounder = rows.reduce((s, r) => s + r.founderShare, 0);
  const cumDividend = cumInvestor + cumFounder;
  const monthAtMilestone = rows.find((r) => r.revenue >= 1_000_000)?.month;
  const minCash = rows.reduce((m, r) => Math.min(m, r.cashBalance), Infinity);
  const equityPerTranche =
    totalFunding > 0 ? (state.global.investorEquityPct * state.global.trancheSize) / totalFunding : 0;
  const investorPctLabel = `${Math.round(state.global.investorEquityPct * 100)}%`;

  const activeBrands = BRANDS.filter((b) => state.brands[b.id]?.enabled).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <img
          src={logoEn}
          alt="iTechLounge"
          className="h-32 w-auto shrink-0"
        />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">iTechLounge</h1>
          <p className="text-sm font-medium">Digital ideas. Beautifully built.</p>
          <p className="text-sm text-muted-foreground">
            Live dashboard — 10 German-focused digital brands, one operating team. Drag any slider to
            re-forecast P&L, cash flow and balance sheet in real time.
          </p>
        </div>
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
        <Kpi label={`Investor dividends (${investorPctLabel})`} value={fmtEURk(cumInvestor)} />
        <Kpi label="Total dividends paid" value={fmtEURk(cumDividend)} />
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
                <Row k={`Investor dividends (${investorPctLabel})`} v={fmtEURk(y.investorShare)} />
                <Row k="Year-end cash" v={fmtEURk(y.endCash)} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-2 p-4 text-sm">
        <h3 className="font-semibold">Investor terms</h3>
        <p className="text-muted-foreground">
          Total raise: <b>{fmtEURk(totalFunding)}</b> for{" "}
          <b>{fmtPct(state.global.investorEquityPct)} equity</b>. Drawn as{" "}
          {fmtEURk(state.global.trancheSize)} tranches × {state.global.trancheCount} months. Each
          tranche therefore buys <b>{fmtPct(equityPerTranche, 2)} equity</b> — so a €50k ticket is
          worth 2.25% at the full-raise valuation. Shareholders draw dividends every six months from
          undistributed net profit — <b>20% at M6</b>, <b>30% at M12</b>, then{" "}
          <b>40% at M18, M24, M30 and M36</b> — split pro-rata by equity; the rest stays in the
          business. All 10 brands launch on a 3-week rolling cadence with a{" "}
          {state.global.freeTrialMonths}-month free trial.
        </p>
      </Card>

      <Card className="space-y-3 p-4 text-sm">
        <h3 className="font-semibold">Our system — one team, ten brands</h3>
        <p className="text-muted-foreground">
          iTechLounge operates as a single company that ships and runs ten
          German-focused digital brands. Every brand shares the same operating chassis, so each new
          product launched on our platform benefits from economies of scale and cross-selling into the
          existing customer base of the other nine.
        </p>
        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {SHARED_ADVANTAGE.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-2 pt-2 md:grid-cols-2">
          {BRANDS.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-md border p-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                <span className="font-semibold">{b.name}</span>
                <span className="text-muted-foreground">· launches M{state.brands[b.id].launchMonth}</span>
              </div>
              <a
                href={`https://${b.domain}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {b.domain} ↗
              </a>
            </div>
          ))}
        </div>
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