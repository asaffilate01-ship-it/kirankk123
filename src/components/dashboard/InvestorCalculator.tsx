import { useMemo, useState } from "react";
import { t } from "@/lib/i18n";
import { useFinance, buildModel, yearSummaries, payoutPct } from "@/lib/finance-store";
import { BRANDS, BRAND_GROUPS, brandById, siblingOf, groupOf, type Brand } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SliderRow } from "./SliderRow";
import { fmtEUR, fmtEURk, fmtPct } from "./format";

type Mode = "company" | "location" | "brand";

const DEALS: Record<
  Mode,
  { ticket: number; ticketPct: number; maxTickets: number; full: number; fullPct: number }
> = {
  company: { ticket: 300000, ticketPct: 0.04, maxTickets: 10, full: 3000000, fullPct: 0.4 },
  location: { ticket: 5000, ticketPct: 0.025, maxTickets: 10, full: 50000, fullPct: 0.25 },
  brand: { ticket: 8000, ticketPct: 0.025, maxTickets: 10, full: 80000, fullPct: 0.25 },
};

/** One option per dual-location brand group, represented by its first entity id. */
const DUAL_BRANDS = BRAND_GROUPS.map((g) => brandById(g.entities[0])).filter(
  (b): b is Brand => Boolean(b),
);

/** "DOKUVERA GER" / "DOKUVERA UK" — always market-suffixed. */
function entityName(b: Brand): string {
  const base = b.name.replace(/\s+(UK|GER|DE|GERMANY|DEUTSCHLAND)$/i, "");
  const suffix = b.region === "DE" ? "GER" : b.region === "UK" ? "UK" : b.region;
  return `${base} ${suffix}`;
}

function dualGroupName(id: string): string {
  const b = brandById(id);
  if (!b) return "";
  return groupOf(b)?.name ?? b.name;
}

/** Label listing both entities of a dual brand, e.g. "DOKUVERA GER (dokuvera.de) + DOKUVERA UK (dokuvera.co.uk)". */
function dualEntityLabel(id: string): string {
  const b = brandById(id);
  if (!b) return "";
  const g = groupOf(b);
  const list = (g?.entities ?? [b.id]).map((x) => brandById(x)).filter((x): x is Brand => Boolean(x));
  return list.map((e) => `${entityName(e)} (${e.domain})`).join(" + ");
}

export function InvestorCalculator() {
  const state = useFinance();
  const g = state.global;
  const [mode, setMode] = useState<Mode>("company");
  const [tickets, setTickets] = useState(1);
  const [brandId, setBrandId] = useState<string>(BRANDS[0]?.id ?? "");
  const [dualBrandId, setDualBrandId] = useState<string>(DUAL_BRANDS[0]?.id ?? "");

  const rows = useMemo(() => buildModel(state), [state]);
  const years = useMemo(() => yearSummaries(rows), [rows]);

  const deal = DEALS[mode];
  const share = Math.min(deal.fullPct, deal.ticketPct * tickets);
  const invested = deal.ticket * tickets;
  const isFullBuy = tickets >= deal.maxTickets;

  // Which brand entities the investor is buying into (empty = whole company).
  const selectedIds = useMemo(() => {
    if (mode === "location") return brandId ? [brandId] : [];
    if (mode === "brand") {
      const b = brandById(dualBrandId);
      if (!b) return [];
      const sib = siblingOf(b);
      return sib ? [b.id, sib.id] : [b.id];
    }
    return [];
  }, [mode, brandId, dualBrandId]);

  // Monthly net profit after tax for any scope (empty ids = whole company).
  const netForIds = useMemo(() => {
    const perBrandFixed = g.hqPerBrand + g.techPerBrand + g.marketingPerBrand;
    return (ids: string[]) => {
      if (ids.length === 0) return rows.map((r) => r.netProfit);
      return rows.map((r) => {
        let net = 0;
        for (const id of ids) {
          const a = state.brands[id];
          if (!a || !a.enabled || r.month < a.launchMonth) continue;
          const revenue = r.perBrandRevenue[id] ?? 0;
          const cost = a.directCost + perBrandFixed + revenue * g.variableOpexPct;
          net += revenue - cost;
        }
        const tax = net > 0 ? net * g.taxRate : 0;
        return net - tax;
      });
    };
  }, [rows, state.brands, g]);

  // First month of activity for a scope: launch of the brand(s), or of the first
  // brand in the portfolio when investing in the whole company.
  const startMonthFor = (ids: string[]) => {
    const pool = ids.length ? ids : Object.keys(state.brands);
    let min = Infinity;
    for (const id of pool) {
      const a = state.brands[id];
      if (a?.enabled) min = Math.min(min, a.launchMonth);
    }
    return Number.isFinite(min) ? min : 1;
  };

  /**
   * Dividends for any scope. Nothing is distributed for the first 12 months from
   * launch (100% retained), then 20% (M13–M18), 30% (M19–M24), 40% (M25–M30),
   * 50% (M31–M36) of after-tax profit is paid out.
   */
  const dividendsFrom = (net: number[], startMonth: number) => {
    let undistributed = 0;
    return net.map((v, i) => {
      undistributed += v;
      const m = rows[i]?.month ?? i + 1;
      const pct = payoutPct(m - startMonth + 1);
      const paid = pct > 0 && undistributed > 0 ? undistributed * pct : 0;
      undistributed -= paid;
      return paid;
    });
  };

  const scopeRows = useMemo(
    () => netForIds(selectedIds).map((netProfit, i) => ({ month: rows[i].month, netProfit })),
    [netForIds, selectedIds, rows]
  );

  const dividendRows = useMemo(
    () => dividendsFrom(scopeRows.map((r) => r.netProfit), startMonthFor(selectedIds)),
    [scopeRows, selectedIds]
  );



  const totalNet = scopeRows.reduce((s, r) => s + r.netProfit, 0);
  const attributableTotal = totalNet * share;
  const monthsCount = scopeRows.length || 1;

  const yourDividends = dividendRows.map((d) => d * share);
  const cumDividends = yourDividends.reduce((s, v) => s + v, 0);

  let running = 0;
  let paybackMonth: number | null = null;
  for (let i = 0; i < yourDividends.length; i++) {
    running += yourDividends[i];
    if (running >= invested) {
      paybackMonth = scopeRows[i].month;
      break;
    }
  }

  const runRateMonthlyNet = scopeRows.length
    ? scopeRows[scopeRows.length - 1].netProfit * share
    : 0;

  // ---- When ROI happens (all live off the sliders above) --------------------
  // Capital is called 20% on signing (M1) then 80% in 12 equal instalments (M2-M13).
  const capitalCalled = scopeRows.map((_, i) => {
    const m = i + 1;
    if (m === 1) return invested * 0.2;
    if (m >= 2 && m <= 13) return (invested * 0.8) / 12;
    return 0;
  });

  const roiTimeline = (() => {
    let paidIn = 0;
    let divCum = 0;
    let accrualCum = 0;
    let accrualBreakeven: number | null = null;
    let cashPositive: number | null = null;
    let x1: number | null = null;
    let x2: number | null = null;
    let x3: number | null = null;
    const series: { month: number; paidIn: number; dividends: number; net: number; multiple: number }[] = [];
    for (let i = 0; i < scopeRows.length; i++) {
      const month = scopeRows[i].month;
      paidIn += capitalCalled[i];
      divCum += yourDividends[i];
      accrualCum += scopeRows[i].netProfit * share;
      if (accrualBreakeven === null && accrualCum >= invested) accrualBreakeven = month;
      if (cashPositive === null && divCum >= paidIn && divCum > 0) cashPositive = month;
      if (x1 === null && divCum >= invested) x1 = month;
      if (x2 === null && divCum >= invested * 2) x2 = month;
      if (x3 === null && divCum >= invested * 3) x3 = month;
      series.push({ month, paidIn, dividends: divCum, net: divCum - paidIn, multiple: invested > 0 ? divCum / invested : 0 });
    }
    return { accrualBreakeven, cashPositive, x1, x2, x3, series };
  })();

  const roiMonths = [6, 12, 18, 24, 30, 36];
  const mLabel = (m: number | null) => (m ? `M${m}` : t("beyond forecast"));


  // ---- All options, side by side -------------------------------------------
  type OptionMetrics = {
    key: string;
    label: string;
    scope: string;
    tickets: number;
    invested: number;
    share: number;
    avgMonthly: number;
    runRateMonthly: number;
    dividends: number;
    payback: number | null;
    roi: number;
  };

  const dualIdsFor = (id: string) => {
    const b = brandById(id);
    if (!b) return [];
    const sib = siblingOf(b);
    return sib ? [b.id, sib.id] : [b.id];
  };

  const metricsFor = (m: Mode, n: number): OptionMetrics => {
    const d = DEALS[m];
    const ids = m === "company" ? [] : m === "location" ? (brandId ? [brandId] : []) : dualIdsFor(dualBrandId);
    const net = netForIds(ids);
    const divs = dividendsFrom(net, startMonthFor(ids));
    const shareN = Math.min(d.fullPct, d.ticketPct * n);
    const investedN = d.ticket * n;
    const totalNetN = net.reduce((s, v) => s + v, 0);
    const mine = divs.map((v) => v * shareN);
    let run = 0;
    let pb: number | null = null;
    for (let i = 0; i < mine.length; i++) {
      run += mine[i];
      if (run >= investedN) {
        pb = rows[i].month;
        break;
      }
    }
    const cum = mine.reduce((s, v) => s + v, 0);
    return {
      key: `${m}-${n}`,
      label:
        m === "company"
          ? t("Whole company")
          : m === "location"
            ? t("One brand location")
            : t("Dual-location brand"),
      scope:
        m === "company"
          ? t("All brands")
          : m === "location"
            ? `${brandById(brandId)?.name ?? ""} · ${brandById(brandId)?.domain ?? ""}`
            : dualEntityLabel(dualBrandId),
      tickets: n,
      invested: investedN,
      share: shareN,
      avgMonthly: (totalNetN * shareN) / (net.length || 1),
      runRateMonthly: (net[net.length - 1] ?? 0) * shareN,
      dividends: cum,
      payback: pb,
      roi: investedN > 0 ? cum / investedN : 0,
    };
  };

  const ladder = useMemo(
    () => Array.from({ length: DEALS[mode].maxTickets }, (_, i) => metricsFor(mode, i + 1)),
    [mode, brandId, dualBrandId, netForIds, rows]
  );

  const compare = useMemo(
    () => [
      metricsFor("company", 1),
      metricsFor("company", DEALS.company.maxTickets),
      metricsFor("location", 1),
      metricsFor("location", DEALS.location.maxTickets),
      metricsFor("brand", 1),
      metricsFor("brand", DEALS.brand.maxTickets),
    ],
    [brandId, dualBrandId, netForIds, rows]
  );

  const scopeLabel =

    mode === "company"
      ? t("Whole company (all brands)")
      : mode === "location"
        ? `${brandById(brandId)?.name ?? ""} · ${brandById(brandId)?.domain ?? ""}`
        : `${dualGroupName(dualBrandId)} — ${t("both locations")}: ${dualEntityLabel(dualBrandId)}`;

  return (
    <Card className="space-y-4 p-4 text-sm">
      <div>
        <h3 className="font-semibold">{t("Investor return calculator")}</h3>
        <p className="text-xs text-muted-foreground">
          {t("Pick what you are buying — the whole company, a single brand in one location, or a dual-location brand — then set how many tranches you buy. Every figure below re-forecasts from the live assumptions for exactly that scope.")}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <DealOption
          active={mode === "company"}
          onSelect={() => {
            setMode("company");
            setTickets(1);
          }}
          title={t("Whole company")}
          price="€3m"
          stake="40%"
          ticket={`${t("1 tranche")} = €300k = 4%`}
          detail={t("10 tranches available in total, maximum 10 investors in the company round.")}
        />
        <DealOption
          active={mode === "location"}
          onSelect={() => {
            setMode("location");
            setTickets(1);
          }}
          title={t("One brand location")}
          price="€50k"
          stake="25%"
          ticket={`${t("1 tranche")} = €5k = 2.5%`}
          detail={t("10 tranches per brand location. A location-only investor receives 10% of any future location opened for that brand.")}
        />
        <DealOption
          active={mode === "brand"}
          onSelect={() => {
            setMode("brand");
            setTickets(1);
          }}
          title={t("Dual-location brand")}
          price="€80k"
          stake="25%"
          ticket={`${t("1 tranche")} = €8k = 2.5%`}
          detail={t("10 tranches per brand. A whole-brand investor keeps 25% across current and future locations.")}
        />
      </div>

      {mode === "location" ? (
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">{t("Choose the brand location")}</div>
          <Select value={brandId} onValueChange={setBrandId}>
            <SelectTrigger className="h-9 w-full md:w-96">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {BRANDS.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name} · {b.domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      {mode === "brand" ? (
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">{t("Choose the dual-location brand")}</div>
          <Select value={dualBrandId} onValueChange={setDualBrandId}>
            <SelectTrigger className="h-9 w-full md:w-96">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {DUAL_BRANDS.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {groupOf(b)?.name ?? b.name} · {dualEntityLabel(b.id)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{t("Payment schedule")}:</span>{" "}
        {t("20% on signing and the remaining 80% in equal instalments over 12 months.")}
      </div>

      <div className="space-y-2">
        <SliderRow
          label={`${t("Tranches purchased")} (${t("of")} ${deal.maxTickets})`}
          value={tickets}
          min={1}
          max={deal.maxTickets}
          onChange={(v) => setTickets(Math.max(1, Math.min(deal.maxTickets, Math.round(v))))}
          format={(v) => `${Math.round(v)} × ${fmtEURk(deal.ticket)}`}
        />
        <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-xs">
          <div className="font-medium text-foreground">
            {tickets} {tickets === 1 ? t("tranche") : t("tranches")} × {fmtEURk(deal.ticket)} ={" "}
            {fmtEUR(invested)} → <b>{fmtPct(share, 2)}</b>{" "}
            {mode === "company" ? t("of the company") : t("of this brand entity")}
          </div>
          <div className="mt-1 text-muted-foreground">
            {t("You are investing in")}: <span className="font-medium text-foreground">{scopeLabel}</span>
            {isFullBuy ? ` — ${t("full allocation taken")} (${fmtEURk(deal.full)} = ${fmtPct(deal.fullPct, 0)})` : null}
          </div>
          {mode === "location" ? (
            <div className="mt-1 text-muted-foreground">
              {t("Future locations of this brand: you receive 10% of each new location.")}
            </div>
          ) : null}
          {mode === "brand" ? (
            <div className="mt-1 text-muted-foreground">
              {t("Future locations of this brand: your 25% share carries over in full.")}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Cell label={t("Amount invested")} value={fmtEUR(invested)} />
        <Cell label={t("Equity & profit share")} value={fmtPct(share, 2)} />
        <Cell
          label={t("Your profit share (avg / month)")}
          value={fmtEUR(attributableTotal / monthsCount)}
        />
        <Cell
          label={`${t("Your profit share at run-rate")} (M${monthsCount})`}
          value={`${fmtEUR(runRateMonthlyNet)} / ${t("mo")}`}
        />
        <Cell
          label={t("Your profit share (per year, avg)")}
          value={fmtEUR((attributableTotal / monthsCount) * 12)}
        />
        <Cell
          label={t("Dividends paid to you (cash)")}
          value={fmtEUR(cumDividends)}
          hint={t("Cash distributed monthly from M13 after launch (20% M13–M18, 30% M19–M24, 40% M25–M30, 50% M31–M36); the balance stays in the business and grows your equity value.")}
        />
        <Cell
          label={t("Payback (cash dividends)")}
          value={paybackMonth ? `M${paybackMonth}` : t("beyond forecast")}
          tone={paybackMonth ? "good" : undefined}
        />
        <Cell
          label={t("ROI on cash dividends")}
          value={invested > 0 ? fmtPct(cumDividends / invested, 0) : "—"}
          tone={cumDividends >= invested ? "good" : undefined}
        />
      </div>

      <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
        <div>
          <h4 className="text-sm font-semibold">{t("When your ROI happens")}</h4>
          <p className="text-xs text-muted-foreground">
            {t("Capital is called 20% on signing then 80% over 12 months, so your cash out and cash in overlap. Every month below re-forecasts live when you move the growth, paying-account, cost or pricing sliders.")}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Cell
            label={t("Cash-flow positive (dividends > capital paid in)")}
            value={mLabel(roiTimeline.cashPositive)}
            tone={roiTimeline.cashPositive ? "good" : undefined}
          />
          <Cell
            label={t("Profit-share breakeven (accrued, incl. retained)")}
            value={mLabel(roiTimeline.accrualBreakeven)}
            hint={t("Month your cumulative share of net profit equals your investment, counting profit kept in the business.")}
            tone={roiTimeline.accrualBreakeven ? "good" : undefined}
          />
          <Cell label={t("1x back in cash dividends")} value={mLabel(roiTimeline.x1)} />
          <Cell
            label={t("2x / 3x in cash dividends")}
            value={`${mLabel(roiTimeline.x2)} / ${mLabel(roiTimeline.x3)}`}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-1 text-left font-medium">{t("Month")}</th>
                <th className="py-1 text-right font-medium">{t("Capital paid in")}</th>
                <th className="py-1 text-right font-medium">{t("Dividends received")}</th>
                <th className="py-1 text-right font-medium">{t("Net cash position")}</th>
                <th className="py-1 text-right font-medium">{t("Cash multiple")}</th>
              </tr>
            </thead>
            <tbody>
              {roiMonths.map((m) => {
                const row = roiTimeline.series[m - 1];
                if (!row) return null;
                return (
                  <tr key={m} className="border-b last:border-0">
                    <td className="py-1">M{row.month}</td>
                    <td className="py-1 text-right tabular-nums">{fmtEUR(row.paidIn)}</td>
                    <td className="py-1 text-right tabular-nums">{fmtEUR(row.dividends)}</td>
                    <td
                      className={`py-1 text-right tabular-nums ${row.net >= 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}
                    >
                      {fmtEUR(row.net)}
                    </td>
                    <td className="py-1 text-right tabular-nums">{row.multiple.toFixed(2)}x</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-1 text-left font-medium">{t("Year")}</th>
              <th className="py-1 text-right font-medium">
                {mode === "company"
                  ? t("Company net profit after tax")
                  : t("Net profit after tax (your scope)")}
              </th>
              <th className="py-1 text-right font-medium">{t("Your profit share")}</th>
              <th className="py-1 text-right font-medium">{t("Per month")}</th>
              <th className="py-1 text-right font-medium">{t("Dividends paid to you")}</th>
              <th className="py-1 text-right font-medium">{t("Cumulative ROI")}</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => {
              const from = (y.year - 1) * 12;
              const to = y.year * 12;
              const scopeNet = scopeRows.slice(from, to).reduce((s, r) => s + r.netProfit, 0);
              const div = yourDividends.slice(from, to).reduce((s, v) => s + v, 0);
              const cum = yourDividends.slice(0, to).reduce((s, v) => s + v, 0);
              return (
                <tr key={y.year} className="border-b last:border-0">
                  <td className="py-1">Y{y.year}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEURk(scopeNet)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(scopeNet * share)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR((scopeNet * share) / 12)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(div)}</td>
                  <td className="py-1 text-right tabular-nums">
                    {invested > 0 ? fmtPct(cum / invested, 0) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <div>
          <h4 className="text-sm font-semibold">{t("Every tranche option for this scope")}</h4>
          <p className="text-xs text-muted-foreground">
            {t("Each tranche is a fixed ticket. Buy one, buy all ten — the table shows exactly what each level returns on the live forecast.")}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-1 text-left font-medium">{t("Tranches")}</th>
                <th className="py-1 text-right font-medium">{t("Invested")}</th>
                <th className="py-1 text-right font-medium">{t("Share")}</th>
                <th className="py-1 text-right font-medium">{t("Profit share / mo (avg)")}</th>
                <th className="py-1 text-right font-medium">{t("At run-rate / mo")}</th>
                <th className="py-1 text-right font-medium">{t("Dividends to M36")}</th>
                <th className="py-1 text-right font-medium">{t("Payback")}</th>
                <th className="py-1 text-right font-medium">{t("Cash ROI")}</th>
              </tr>
            </thead>
            <tbody>
              {ladder.map((o) => (
                <tr
                  key={o.key}
                  className={`border-b last:border-0 ${o.tickets === tickets ? "bg-primary/5 font-medium" : ""}`}
                >
                  <td className="py-1">
                    {o.tickets} × {fmtEURk(DEALS[mode].ticket)}
                  </td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.invested)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtPct(o.share, 2)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.avgMonthly)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.runRateMonthly)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.dividends)}</td>
                  <td className="py-1 text-right tabular-nums">
                    {o.payback ? `M${o.payback}` : t("beyond forecast")}
                  </td>
                  <td
                    className={`py-1 text-right tabular-nums ${o.roi >= 1 ? "text-emerald-500" : ""}`}
                  >
                    {fmtPct(o.roi, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <h4 className="text-sm font-semibold">{t("Compare all three deal types")}</h4>
          <p className="text-xs text-muted-foreground">
            {t("Minimum ticket versus full allocation for each structure, using the brands selected above.")}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-1 text-left font-medium">{t("Option")}</th>
                <th className="py-1 text-left font-medium">{t("Scope")}</th>
                <th className="py-1 text-right font-medium">{t("Invested")}</th>
                <th className="py-1 text-right font-medium">{t("Share")}</th>
                <th className="py-1 text-right font-medium">{t("At run-rate / mo")}</th>
                <th className="py-1 text-right font-medium">{t("Dividends to M36")}</th>
                <th className="py-1 text-right font-medium">{t("Payback")}</th>
                <th className="py-1 text-right font-medium">{t("Cash ROI")}</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((o) => (
                <tr key={o.key} className="border-b last:border-0">
                  <td className="py-1">
                    {o.label}
                    <span className="ml-1 text-muted-foreground">
                      ({o.tickets} × {fmtEURk(o.invested / o.tickets)})
                    </span>
                  </td>
                  <td className="py-1 text-muted-foreground">{o.scope}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.invested)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtPct(o.share, 2)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.runRateMonthly)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(o.dividends)}</td>
                  <td className="py-1 text-right tabular-nums">
                    {o.payback ? `M${o.payback}` : t("beyond forecast")}
                  </td>
                  <td
                    className={`py-1 text-right tabular-nums ${o.roi >= 1 ? "text-emerald-500" : ""}`}
                  >
                    {fmtPct(o.roi, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] leading-snug text-muted-foreground">
          {t("Brand-level options are limited to 10 investors at 2.5% each per location; the company round is limited to 10 investors at 4% each. Location-only investors receive 10% of any future location; whole-brand investors keep 25% of every location.")}
        </p>
      </div>


      <p className="text-xs text-muted-foreground">
        {t("Total profit share attributable to you over the forecast:")}{" "}
        <b>{fmtEUR(attributableTotal)}</b>{" "}
        {t("on an exit basis your")} {fmtPct(share, 2)}{" "}
        {t("would also be valued on the audited business — independently calculated, with first refusal to the company.")}
      </p>
    </Card>
  );
}

function DealOption({
  title,
  price,
  stake,
  ticket,
  detail,
  active,
  onSelect,
}: {
  title: string;
  price: string;
  stake: string;
  ticket: string;
  detail: string;
  active?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-md border p-3 text-left transition-colors ${
        active ? "border-primary bg-primary/5 ring-1 ring-primary/40" : "hover:bg-muted/40"
      }`}
    >
      <div className="text-xs font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <span className="text-lg font-semibold">{price}</span>
        <span className="text-sm font-semibold text-primary">{stake}</span>
      </div>
      <div className="mt-2 text-xs font-medium">{ticket}</div>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{detail}</p>
    </button>
  );
}

function Cell({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "good";
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={`mt-1 text-base font-semibold tabular-nums ${
          tone === "good" ? "text-emerald-500" : ""
        }`}
      >
        {value}
      </div>
      {hint ? <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</div> : null}
    </div>
  );
}
