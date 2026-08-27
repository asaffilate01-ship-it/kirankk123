import { t } from "@/lib/i18n";
import { useMemo } from "react";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { BRANDS, TARGET_BRAND_COUNT } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import { fmtEURk, fmtPct } from "./format";
import { BrandLogo } from "@/components/BrandLogo";
import { PanelIntro, Section } from "./Explain";

export function OverviewPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const years = useMemo(() => yearSummaries(rows), [rows]);
  const last = rows[rows.length - 1];
  const g = state.global;
  const totalFunding = g.upfrontFunding + g.monthlyFunding * g.fundingMonths;
  const cumInvestor = rows.reduce((s, r) => s + r.investorShare, 0);
  const cumFounder = rows.reduce((s, r) => s + r.founderShare, 0);
  const cumDividend = cumInvestor + cumFounder;
  const monthAtMilestone = rows.find((r) => r.revenue >= 1_000_000)?.month;
  const minCash = rows.reduce((m, r) => Math.min(m, r.cashBalance), Infinity);
  const investorPctLabel = `${Math.round(state.global.investorEquityPct * 100)}%`;

  const activeBrands = BRANDS.filter((b) => state.brands[b.id]?.enabled).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <BrandLogo className="h-24 sm:h-32" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("iTechLounge")}</h1>
          <p className="text-sm font-medium">{t("Digital ideas. Beautifully built.")}</p>
          <p className="text-sm text-muted-foreground">
            {t(
              "Private investor dashboard — 100 UK, German and international brand entities, one shared operating team. The Investment tab separates real launch evidence from editable financial forecasts.",
            )}
          </p>
        </div>
      </div>

      <PanelIntro
        title={t("Start here")}
        description={t(
          "This page is the headline view: the key numbers and the year-by-year summary. Deal terms and the investor calculator live in the Investment tab; the full brand list and platform detail live in the System tab.",
        )}
        tips={[
          t("Every figure updates live when you change a slider in Assumptions or Brands."),
          t("Hover or tap a “?” icon for a plain-English explanation of any number."),
          t("All amounts are in euros (€). “M12” means month 12 of the forecast."),
        ]}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label={t("Active brands")} value={`${activeBrands} / ${TARGET_BRAND_COUNT}`} />
        <Kpi
          label={`${t("Monthly revenue")} @ M${rows.length}`}
          value={fmtEURk(last.revenue)}
          hint={t("Money coming in every month from subscriptions (MRR)")}
        />
        <Kpi
          label={t("Funding required")}
          value={fmtEURk(totalFunding)}
          hint={t("Total investment required over the period")}
        />

        <Kpi
          label={t("€1m/mo hit at")}
          value={monthAtMilestone ? `M${monthAtMilestone}` : t("not reached")}
          hint={t("Month when monthly revenue first reaches €1 million")}
        />
        <Kpi
          label={t("Cash trough")}
          value={fmtEURk(minCash)}
          tone={minCash < 0 ? "bad" : "good"}
          hint={t("Lowest money-in-the-bank point across the forecast")}
        />
        <Kpi
          label={`${t("Money in the bank")} @ M${rows.length}`}
          value={fmtEURk(last.cashBalance)}
          hint={t("Cash left in the business at the end of the forecast")}
        />
        <Kpi
          label={`${t("Investor dividends")} (${investorPctLabel})`}
          value={fmtEURk(cumInvestor)}
          hint={t("Profit paid out to investors over the whole period")}
        />
        <Kpi
          label={t("Total dividends paid")}
          value={fmtEURk(cumDividend)}
          hint={t("Profit paid out to investors and founders combined")}
        />
        <Kpi
          label={`${t("Profit margin")} @ M${rows.length}`}
          value={last.revenue > 0 ? fmtPct(last.ebit / last.revenue) : "—"}
          hint={t("Share of revenue left as profit after costs")}
        />
      </div>

      <Section
        title={t("Year-by-year summary")}
        description={t("The same forecast rolled up into three simple yearly columns.")}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {years.map((y) => (
            <div key={y.year} className="rounded-lg border p-3">
              <div className="text-xs uppercase text-muted-foreground">Year {y.year}</div>
              <div className="mt-2 space-y-1 text-sm">
                <Row k={t("Revenue")} v={fmtEURk(y.revenue)} />
                <Row k={t("Operating profit (EBIT)")} v={fmtEURk(y.ebit)} />
                <Row k={t("Profit margin")} v={fmtPct(y.margin)} />
                <Row k={t("Net profit")} v={fmtEURk(y.netProfit)} />
                <Row
                  k={`${t("Investor dividends")} (${investorPctLabel})`}
                  v={fmtEURk(y.investorShare)}
                />
                <Row k={t("Money in the bank at year end")} v={fmtEURk(y.endCash)} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Kpi({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string;
  tone?: "good" | "bad";
  hint?: string;
}) {
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
      {hint ? (
        <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</div>
      ) : null}
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
