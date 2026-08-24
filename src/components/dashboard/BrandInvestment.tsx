import { t } from "@/lib/i18n";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { buildModel, payoutPct, useFinance } from "@/lib/finance-store";
import { BRANDS, siblingOf, groupOf, type Brand } from "@/lib/brands";
import { fmtEURk, fmtPct } from "./format";
import { Section } from "./Explain";

type Ticket = {
  key: string;
  label: string;
  scope: string;
  price: number;
  equity: number;
  ids: string[];
};

function fmtEUR0(v: number) {
  return `€${Math.round(v).toLocaleString("de-DE")}`;
}

/**
 * Per-brand investment & ROI: what a ticket costs, what it owns, the dividends
 * it earns from month 13 after launch, and when the money comes back.
 */
export function BrandInvestment({ brand }: { brand: Brand }) {
  const state = useFinance();
  const g = state.global;
  const rows = useMemo(() => buildModel(state), [state]);
  const horizon = rows.length;

  const sibling = siblingOf(brand);
  const group = groupOf(brand);

  const perBrandFixed = g.hqPerBrand + g.techPerBrand + g.marketingPerBrand;

  // After-tax monthly net profit for a set of brand entities.
  const netForIds = (ids: string[]) =>
    rows.map((r) => {
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

  const startMonthFor = (ids: string[]) => {
    let min = Infinity;
    for (const id of ids) {
      const a = state.brands[id];
      if (a?.enabled) min = Math.min(min, a.launchMonth);
    }
    return Number.isFinite(min) ? min : 1;
  };

  // Distributable dividend pool per month (100% retained for the first 12
  // months from launch, then 20/30/40/50% of accumulated after-tax profit).
  const dividendPool = (net: number[], startMonth: number) => {
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

  const tickets: Ticket[] = useMemo(() => {
    const dual = sibling ? [brand.id, sibling.id] : null;
    const list: Ticket[] = [
      {
        key: "loc-25",
        label: t("This location — 25%"),
        scope: `${brand.name} (${brand.domain})`,
        price: 50_000,
        equity: 0.25,
        ids: [brand.id],
      },
      {
        key: "loc-2.5",
        label: t("This location — 2.5% (small ticket)"),
        scope: `${brand.name} (${brand.domain})`,
        price: 5_000,
        equity: 0.025,
        ids: [brand.id],
      },
    ];
    if (dual && sibling) {
      const scope = `${brand.name} (${brand.domain}) + ${sibling.name} (${sibling.domain})`;
      list.push(
        {
          key: "dual-25",
          label: t("Whole brand, both locations — 25%"),
          scope,
          price: 80_000,
          equity: 0.25,
          ids: dual,
        },
        {
          key: "dual-2.5",
          label: t("Whole brand, both locations — 2.5% (small ticket)"),
          scope,
          price: 8_000,
          equity: 0.025,
          ids: dual,
        },
      );
    }
    return list;
  }, [brand, sibling]);

  const results = tickets.map((tk) => {
    const net = netForIds(tk.ids);
    const pool = dividendPool(net, startMonthFor(tk.ids));
    const myDivs = pool.map((v) => v * tk.equity);

    // 20% upfront, remaining 80% in 12 equal monthly instalments.
    const upfront = tk.price * 0.2;
    const instalment = (tk.price * 0.8) / 12;

    let cumIn = 0;
    let cumDiv = 0;
    let paybackMonth: number | undefined;
    let firstDivMonth: number | undefined;
    const series = rows.map((r, i) => {
      cumIn += i === 0 ? upfront : i <= 12 ? instalment : 0;
      cumDiv += myDivs[i];
      if (myDivs[i] > 0 && firstDivMonth === undefined) firstDivMonth = r.month;
      if (paybackMonth === undefined && cumDiv >= tk.price) paybackMonth = r.month;
      return { month: r.month, div: myDivs[i], cumDiv, cumIn };
    });

    const totalNet = net.reduce((s, v) => s + v, 0);
    return {
      ...tk,
      upfront,
      instalment,
      firstDivMonth,
      paybackMonth,
      totalDiv: cumDiv,
      moic: cumDiv / tk.price,
      roi: (cumDiv - tk.price) / tk.price,
      totalNet,
      series,
    };
  });

  const scopeNetSingle = netForIds([brand.id]);
  const grossRevenue = rows.reduce((s, r) => s + (r.perBrandRevenue[brand.id] ?? 0), 0);
  const totalCosts =
    grossRevenue * g.variableOpexPct +
    rows.filter((r) => r.month >= (state.brands[brand.id]?.launchMonth ?? 1)).length *
      (state.brands[brand.id]?.directCost ?? 0) +
    rows.filter((r) => r.month >= (state.brands[brand.id]?.launchMonth ?? 1)).length * perBrandFixed;
  const netAfterTax = scopeNetSingle.reduce((s, v) => s + v, 0);

  return (
    <Section
      title={t("Invest in this brand — tickets & ROI")}
      description={t("What a ticket costs, what it owns, the dividends it earns from month 13 after launch, and when it pays back.")}
      defaultOpen={false}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Mini label={`${t("Revenue to M")}${horizon}`} value={fmtEURk(grossRevenue)} />
          <Mini label={`${t("Costs to M")}${horizon}`} value={fmtEURk(totalCosts)} />
          <Mini
            label={`${t("Net profit after tax to M")}${horizon}`}
            value={fmtEURk(netAfterTax)}
            tone={netAfterTax >= 0 ? "good" : "bad"}
          />
          <Mini label={t("Corporation tax")} value={fmtPct(g.taxRate)} />
        </div>

        {group && sibling ? (
          <p className="text-xs text-muted-foreground">
            {t("This brand is part of")} <b>{group.name}</b> — {t("you can buy this location only, or the whole brand across both locations")} ({brand.domain} + {sibling.domain}).
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            {t("Single-location brand. If we later launch a second location, a whole-brand investor receives 25% of it; a location-only investor receives 10% of it.")}
          </p>
        )}

        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-right text-xs">
            <thead className="bg-muted/80">
              <tr>
                <th className="px-2 py-2 text-left font-medium">{t("Ticket")}</th>
                <th className="px-2 py-2 font-medium">{t("Price")}</th>
                <th className="px-2 py-2 font-medium">{t("Equity")}</th>
                <th className="px-2 py-2 font-medium">{t("20% upfront")}</th>
                <th className="px-2 py-2 font-medium">{t("Then / month × 12")}</th>
                <th className="px-2 py-2 font-medium">{t("First dividend")}</th>
                <th className="px-2 py-2 font-medium">{`${t("Dividends to M")}${horizon}`}</th>
                <th className="px-2 py-2 font-medium">{t("Payback")}</th>
                <th className="px-2 py-2 font-medium">{t("MOIC")}</th>
                <th className="px-2 py-2 font-medium">{t("ROI")}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.key} className="border-t">
                  <td className="px-2 py-2 text-left">
                    <div className="font-semibold">{r.label}</div>
                    <div className="text-[11px] text-muted-foreground">{r.scope}</div>
                  </td>
                  <td className="px-2 py-2 font-semibold tabular-nums">{fmtEUR0(r.price)}</td>
                  <td className="px-2 py-2 tabular-nums">{fmtPct(r.equity)}</td>
                  <td className="px-2 py-2 tabular-nums">{fmtEUR0(r.upfront)}</td>
                  <td className="px-2 py-2 tabular-nums">{fmtEUR0(r.instalment)}</td>
                  <td className="px-2 py-2 tabular-nums">{r.firstDivMonth ? `M${r.firstDivMonth}` : "—"}</td>
                  <td className="px-2 py-2 font-semibold tabular-nums">{fmtEURk(r.totalDiv)}</td>
                  <td className="px-2 py-2 tabular-nums">
                    {r.paybackMonth ? `M${r.paybackMonth}` : t("after M") + horizon}
                  </td>
                  <td className="px-2 py-2 tabular-nums">{r.moic.toFixed(2)}x</td>
                  <td
                    className={`px-2 py-2 font-semibold tabular-nums ${
                      r.roi >= 0 ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {fmtPct(r.roi)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="p-3">
          <div className="text-sm font-semibold">{t("Dividend build-up — 25% ticket")}</div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {t("Nothing is paid for the first 12 months from launch (100% stays in the brand), then 20% M13–M18, 30% M19–M24, 40% M25–M30, 50% M31–M36 of after-tax profit is distributed.")}
          </p>
          <div className="mt-3 max-h-[360px] overflow-auto rounded-md border">
            <table className="w-full text-right text-xs">
              <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                <tr>
                  <th className="px-2 py-2 text-left font-medium">{t("Month")}</th>
                  {results
                    .filter((r) => r.equity === 0.25)
                    .map((r) => (
                      <th key={r.key} className="px-2 py-2 font-medium">
                        {r.ids.length > 1 ? t("Whole brand") : t("This location")}
                      </th>
                    ))}
                  <th className="px-2 py-2 font-medium">{t("Cumulative")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const quarters = results.filter((r) => r.equity === 0.25);
                  const main = quarters[quarters.length - 1];
                  return (
                    <tr key={row.month} className="border-t">
                      <td className="px-2 py-1.5 text-left font-medium">M{row.month}</td>
                      {quarters.map((r) => (
                        <td key={r.key} className="px-2 py-1.5 tabular-nums">
                          {r.series[i].div > 0 ? fmtEURk(r.series[i].div) : "—"}
                        </td>
                      ))}
                      <td className="px-2 py-1.5 font-semibold tabular-nums">
                        {fmtEURk(main.series[i].cumDiv)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-[11px] text-muted-foreground">
          {t("Dividends are paid from net profit after")} {fmtPct(g.taxRate)} {t("corporation tax and split pro-rata by equity. Up to 10 investors per brand location at 2.5% each. Every figure here re-forecasts when you change the assumptions.")}
        </p>
      </div>
    </Section>
  );
}

function Mini({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <Card className="p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div
        className={`mt-1 text-base font-semibold tabular-nums ${
          tone === "bad" ? "text-destructive" : tone === "good" ? "text-primary" : ""
        }`}
      >
        {value}
      </div>
    </Card>
  );
}

export const _brandCount = BRANDS.length;
