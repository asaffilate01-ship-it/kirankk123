import { t } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { BRANDS, SHARED_ADVANTAGE, TARGET_BRAND_COUNT } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COUNTRIES,
  SECTORS,
  countryOf,
  sectorOf,
  type CountryId,
  type SectorId,
} from "@/lib/brand-taxonomy";
import { fmtEURk, fmtPct } from "./format";
import { logoEn, logoDe, logoEnDark, logoDeDark } from "@/lib/logo";
import { BrandLogo } from "@/components/BrandLogo";
import { InvestorCalculator } from "./InvestorCalculator";
import { PanelIntro, Section } from "./Explain";

function __UNUSED_BrandDirectory() {
  const state = useFinance();
  const [country, setCountry] = useState<CountryId | "all">("all");
  const [sector, setSector] = useState<SectorId | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      BRANDS.filter(
        (b) =>
          (country === "all" || countryOf(b) === country) &&
          (sector === "all" || sectorOf(b) === sector) &&
          (q === "" ||
            b.name.toLowerCase().includes(q) ||
            b.domain.toLowerCase().includes(q)),
      ),
    [country, sector, q],
  );

  return (
    <div className="space-y-3 pt-2">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={country} onValueChange={(v) => setCountry(v as CountryId | "all")}>
          <SelectTrigger className="h-9 w-[190px]">
            <SelectValue placeholder={t("Country")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("All countries")}</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.flag} {t(c.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sector} onValueChange={(v) => setSector(v as SectorId | "all")}>
          <SelectTrigger className="h-9 w-[210px]">
            <SelectValue placeholder={t("Business type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("All business types")}</SelectItem>
            {SECTORS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {t(s.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Search brand or domain")}
          className="h-9 w-[220px]"
        />
        <span className="text-xs text-muted-foreground">
          {filtered.length} / {BRANDS.length} {t("brands")}
        </span>
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-md border">
        <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
          {filtered.map((b) => (
            <div key={b.id} className="flex items-center justify-between gap-2 rounded-md border p-2 text-xs">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: b.color }} />
                <span className="truncate font-semibold">{b.name}</span>
                <span className="shrink-0 text-muted-foreground">
                  · {t("launches")} M{state.brands[b.id]?.launchMonth}
                </span>
              </div>
              <a
                href={`https://${b.domain}`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 font-medium text-primary hover:underline"
              >
                {b.domain} ↗
              </a>
            </div>
          ))}
          {filtered.length === 0 ? (
            <p className="p-2 text-xs text-muted-foreground">{t("No brands match these filters.")}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}


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
          <p className="text-sm text-muted-foreground">{t("Live dashboard — 10 German-focused digital brands, one operating team. Drag any slider to re-forecast P&L, cash flow and balance sheet in real time.")}</p>
        </div>
      </div>

      <PanelIntro
        title={t("Start here")}
        description={t("This page is the headline view: the key numbers first, then the investor terms, the calculator and the brand list. Open only the sections you need — everything is collapsible.")}
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
        <Kpi label={t("Funding raised")} value={fmtEURk(totalFunding)} hint={t("Total investment paid into the business over the period")} />
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
        <Kpi label={`${t("Money in the bank")} @ M${rows.length}`} value={fmtEURk(last.cashBalance)} hint={t("Cash left in the business at the end of the forecast")} />
        <Kpi
          label={`${t("Investor dividends")} (${investorPctLabel})`}
          value={fmtEURk(cumInvestor)}
          hint={t("Profit paid out to investors over the whole period")}
        />
        <Kpi label={t("Total dividends paid")} value={fmtEURk(cumDividend)} hint={t("Profit paid out to investors and founders combined")} />
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
                <Row k={`${t("Investor dividends")} (${investorPctLabel})`} v={fmtEURk(y.investorShare)} />
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
      {hint ? <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</div> : null}
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