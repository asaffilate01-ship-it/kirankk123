import { useMemo, useState } from "react";
import { t } from "@/lib/i18n";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { SliderRow } from "./SliderRow";
import { fmtEUR, fmtEURk, fmtPct } from "./format";

export function InvestorCalculator() {
  const state = useFinance();
  const g = state.global;
  const [tranches, setTranches] = useState(1);

  const rows = useMemo(() => buildModel(state), [state]);
  const years = useMemo(() => yearSummaries(rows), [rows]);

  const equityPerTranche = g.trancheCount > 0 ? g.investorEquityPct / g.trancheCount : 0;
  const share = Math.min(1, equityPerTranche * tranches);
  const invested = g.trancheSize * tranches;

  // Attributable profit (share of net profit after tax) and actual cash dividends.
  const totalNet = rows.reduce((s, r) => s + r.netProfit, 0);
  const attributableTotal = totalNet * share;
  const monthsCount = rows.length || 1;

  const dividendRows = rows.map((r) => r.dividendPaid * share);
  const cumDividends = dividendRows.reduce((s, v) => s + v, 0);

  let running = 0;
  let paybackMonth: number | null = null;
  for (let i = 0; i < dividendRows.length; i++) {
    running += dividendRows[i];
    if (running >= invested) {
      paybackMonth = rows[i].month;
      break;
    }
  }

  const lastYear = years[years.length - 1];
  const runRateMonthlyNet = rows.length ? rows[rows.length - 1].netProfit * share : 0;

  return (
    <Card className="space-y-4 p-4 text-sm">
      <div>
        <h3 className="font-semibold">{t("Investor return calculator")}</h3>
        <p className="text-xs text-muted-foreground">
          {t("Each")} {fmtEURk(g.trancheSize)} {t("tranche buys")}{" "}
          <b>{fmtPct(equityPerTranche, 2)}</b> {t("of the company and the same share of net profit after tax. Move the slider to model multiple tranches; every figure below re-forecasts from the live assumptions.")}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <DealOption
          title={t("Whole company")}
          price="€3m"
          stake="40%"
          ticket="€300k = 4%"
          detail={t("Maximum 10 investors in the company round.")}
        />
        <DealOption
          title={t("One brand location")}
          price="€50k"
          stake="25%"
          ticket="€5k = 2.5%"
          detail={t("A location-only investor receives 10% of any future location opened for that brand.")}
        />
        <DealOption
          title={t("Dual-location brand")}
          price="€80k"
          stake="25%"
          ticket="€8k = 2.5%"
          detail={t("A whole-brand investor keeps 25% across current and future locations.")}
        />
      </div>

      <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{t("Payment schedule")}:</span>{" "}
        {t("20% on signing and the remaining 80% in equal instalments over 12 months.")}
      </div>

      <SliderRow
        label={t("Tranches purchased")}
        value={tranches}
        min={1}
        max={g.trancheCount}
        onChange={(v) => setTranches(Math.max(1, Math.round(v)))}
        format={(v) => `${fmtPct(equityPerTranche * v, 2)}`}
      />

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
          hint={t("Cash actually distributed at M6/12/18/24/30/36; the balance stays in the business and grows your equity value.")}
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

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-1 text-left font-medium">{t("Year")}</th>
              <th className="py-1 text-right font-medium">{t("Company net profit after tax")}</th>
              <th className="py-1 text-right font-medium">{t("Your profit share")}</th>
              <th className="py-1 text-right font-medium">{t("Per month")}</th>
              <th className="py-1 text-right font-medium">{t("Dividends paid to you")}</th>
              <th className="py-1 text-right font-medium">{t("Cumulative ROI")}</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => {
              const slice = rows.slice((y.year - 1) * 12, y.year * 12);
              const div = slice.reduce((s, r) => s + r.dividendPaid * share, 0);
              const cum = rows
                .slice(0, y.year * 12)
                .reduce((s, r) => s + r.dividendPaid * share, 0);
              return (
                <tr key={y.year} className="border-b last:border-0">
                  <td className="py-1">Y{y.year}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEURk(y.netProfit)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR(y.netProfit * share)}</td>
                  <td className="py-1 text-right tabular-nums">{fmtEUR((y.netProfit * share) / 12)}</td>
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

      <p className="text-xs text-muted-foreground">
        {t("Total profit share attributable to you over the forecast:")}{" "}
        <b>{fmtEUR(attributableTotal)}</b>
        {lastYear ? (
          <>
            {" "}
            {t("on an exit basis your")} {fmtPct(share, 2)}{" "}
            {t("would also be valued on the audited business — independently calculated, with first refusal to the company.")}
          </>
        ) : null}
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
}: {
  title: string;
  price: string;
  stake: string;
  ticket: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-xs font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <span className="text-lg font-semibold">{price}</span>
        <span className="text-sm font-semibold text-primary">{stake}</span>
      </div>
      <div className="mt-2 text-xs font-medium">{ticket}</div>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{detail}</p>
    </div>
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
