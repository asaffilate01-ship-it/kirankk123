import { t } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { useFinance, buildModel } from "@/lib/finance-store";
import { BRANDS } from "@/lib/brands";
import { countryLabel, countryOf, sectorLabel, sectorOf } from "@/lib/brand-taxonomy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fmtEUR, fmtEURk, fmtNum, fmtPct } from "./format";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART = {
  revenue: "var(--chart-2)",
  costs: "var(--chart-1)",
  profit: "var(--chart-3)",
  cash: "var(--chart-2)",
  funding: "var(--chart-4)",
  dividends: "var(--chart-5)",
  other: "var(--muted-foreground)",
  grid: "var(--border)",
  axis: "var(--muted-foreground)",
} as const;

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--primary)",
  "var(--muted-foreground)",
] as const;

const periods = [12, 24, 36] as const;


type TooltipEntry = { name?: string; value?: number | string; color?: string };

function FinanceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-44 rounded-md border bg-popover p-3 text-xs text-popover-foreground shadow-lg">
      <div className="mb-2 font-semibold">{label}</div>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-5">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-medium tabular-nums">{fmtEURk(Number(entry.value))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartHeading({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

export function ChartsPanel() {
  const state = useFinance();
  const allRows = useMemo(() => buildModel(state), [state]);
  const [period, setPeriod] = useState<(typeof periods)[number]>(36);
  const rows = allRows.slice(0, Math.min(period, allRows.length));
  const last = rows[rows.length - 1];

  const performanceData = rows.map((row) => ({
    month: `M${row.month}`,
    [t("Revenue")]: Math.round(row.revenue),
    [t("Total costs")]: Math.round(row.totalCost),
    [t("Net profit")]: Math.round(row.netProfit),
  }));

  const costData = rows.map((row) => ({
    month: `M${row.month}`,
    [t("Direct")]: Math.round(row.directCosts),
    [t("HQ")]: Math.round(row.hqCost),
    [t("Tech")]: Math.round(row.techCost),
    [t("Marketing")]: Math.round(row.marketingCost),
    [t("Variable opex")]: Math.round(row.variableOpex),
    [t("Custom")]: Math.round(row.customCost),
  }));

  const cashData = rows.map((row) => ({
    month: `M${row.month}`,
    [t("Cash balance")]: Math.round(row.cashBalance),
    [t("Funding in")]: Math.round(row.fundingIn),
    [t("Dividends paid")]: Math.round(row.dividendPaid),
  }));

  const rankedBrands = last
    ? BRANDS.map((brand) => ({
        id: brand.id,
        name: brand.name,
        value: Math.round(last.perBrandRevenue[brand.id] ?? 0),
        fill: brand.color,
      }))
        .filter((brand) => brand.value > 0)
        .sort((a, b) => b.value - a.value)
    : [];
  const leadingBrands = rankedBrands.slice(0, 8);
  const otherRevenue = rankedBrands.slice(8).reduce((sum, brand) => sum + brand.value, 0);
  const brandData = [
    ...leadingBrands,
    ...(otherRevenue > 0
      ? [{ id: "other", name: t("Other brands"), value: otherRevenue, fill: CHART.other }]
      : []),
  ].reverse();

  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalProfit = rows.reduce((sum, row) => sum + row.netProfit, 0);
  const margin = totalRevenue > 0 ? totalProfit / totalRevenue : 0;

  // ---- Mix pies (last month of selected period) ----
  const groupMix = (key: (b: (typeof BRANDS)[number]) => string) => {
    const acc = new Map<string, number>();
    if (!last) return [] as { name: string; value: number; fill: string }[];
    for (const brand of BRANDS) {
      const value = Math.round(last.perBrandRevenue[brand.id] ?? 0);
      if (value <= 0) continue;
      const label = key(brand);
      acc.set(label, (acc.get(label) ?? 0) + value);
    }
    return [...acc.entries()]
      .map(([name, value], i) => ({ name, value, fill: PIE_COLORS[i % PIE_COLORS.length] }))
      .sort((a, b) => b.value - a.value)
      .map((d, i) => ({ ...d, fill: PIE_COLORS[i % PIE_COLORS.length] }));
  };

  const countryMix = groupMix((b) => countryLabel(countryOf(b)));
  const sectorMix = groupMix((b) => sectorLabel(sectorOf(b)));

  const costMix = last
    ? [
        { name: t("Direct"), value: Math.round(last.directCosts), fill: "var(--chart-1)" },
        { name: t("HQ"), value: Math.round(last.hqCost), fill: "var(--chart-4)" },
        { name: t("Tech"), value: Math.round(last.techCost), fill: "var(--chart-3)" },
        { name: t("Marketing"), value: Math.round(last.marketingCost), fill: "var(--chart-5)" },
        { name: t("Variable opex"), value: Math.round(last.variableOpex), fill: "var(--chart-2)" },
        { name: t("Custom"), value: Math.round(last.customCost), fill: CHART.other },
      ].filter((d) => d.value > 0)
    : [];

  const profitMix = last
    ? [
        { name: t("Total costs"), value: Math.round(Math.max(0, last.totalCost)), fill: CHART.costs },
        { name: t("Tax"), value: Math.round(Math.max(0, last.tax)), fill: CHART.dividends },
        { name: t("Net profit"), value: Math.round(Math.max(0, last.netProfit)), fill: CHART.profit },
      ].filter((d) => d.value > 0)
    : [];

  // ---- Fundamentals ----
  const arr = last ? last.revenue * 12 : 0;
  const customers = last
    ? Object.values(last.perBrandUsers).reduce((s, v) => s + v, 0)
    : 0;
  const blendedArpu = customers > 0 && last ? last.revenue / customers : 0;
  const breakevenMonth = allRows.find((r) => r.netProfit > 0)?.month ?? null;
  const cashPositiveMonth = allRows.find((r) => r.cashBalance > 0)?.month ?? null;
  const peakCashNeed = Math.min(0, ...allRows.map((r) => r.cashBalance));
  const totalFunding = allRows.reduce((s, r) => s + r.fundingIn, 0);
  const runRateMargin = last && last.revenue > 0 ? last.netProfit / last.revenue : 0;
  const costPerEuro = last && last.revenue > 0 ? last.totalCost / last.revenue : 0;

  // ---- Investor ROI (whole-company deal) ----
  const invested = state.global.trancheSize * state.global.trancheCount;
  const investorDividends = allRows.reduce((s, r) => s + r.investorShare, 0);
  const exitMultiple = 4;
  const equityValue = arr * exitMultiple * state.global.investorEquityPct;
  const totalReturn = investorDividends + equityValue;
  const moic = invested > 0 ? totalReturn / invested : 0;
  const roiPct = invested > 0 ? (totalReturn - invested) / invested : 0;
  let cumDiv = 0;
  let paybackMonth: number | null = null;
  for (const r of allRows) {
    cumDiv += r.investorShare;
    if (cumDiv >= invested) {
      paybackMonth = r.month;
      break;
    }
  }
  const years = allRows.length / 12;
  const irr = moic > 0 && years > 0 ? Math.pow(moic, 1 / years) - 1 : 0;


  if (!last) {
    return <Card className="p-6 text-sm text-muted-foreground">{t("No forecast data available.")}</Card>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold">{t("Financial performance")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("Portfolio forecast and operating drivers")}</p>
        </div>
        <div className="flex items-center gap-1 rounded-md border bg-muted/40 p-1" aria-label={t("Forecast period")}>
          {periods.map((months) => (
            <Button
              key={months}
              type="button"
              size="sm"
              variant={period === months ? "default" : "ghost"}
              onClick={() => setPeriod(months)}
              disabled={months > allRows.length}
              aria-pressed={period === months}
              className="min-w-16 shadow-none"
            >
              {months}M
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label={t("Cumulative revenue")} value={fmtEURk(totalRevenue)} />
        <Metric label={t("Cumulative net profit")} value={fmtEURk(totalProfit)} />
        <Metric label={`${t("Cash balance")} @ M${last.month}`} value={fmtEURk(last.cashBalance)} />
        <Metric label={t("Net margin")} value={fmtPct(margin)} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-4 xl:col-span-2">
          <ChartHeading
            title={t("Revenue, costs and net profit")}
            detail={t("Monthly operating performance across the selected forecast period")}
          />
          <div className="h-80 w-full sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={CHART.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: CHART.axis }} tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis tick={{ fontSize: 11, fill: CHART.axis }} tickLine={false} axisLine={false} tickFormatter={fmtEURk} width={58} />
                <Tooltip content={<FinanceTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <ReferenceLine y={0} stroke={CHART.axis} />
                <Area type="monotone" dataKey={t("Revenue")} fill={CHART.revenue} fillOpacity={0.12} stroke={CHART.revenue} strokeWidth={2.5} />
                <Line type="monotone" dataKey={t("Total costs")} stroke={CHART.costs} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey={t("Net profit")} stroke={CHART.profit} strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <ChartHeading
            title={`${t("Top brands by monthly revenue")} · M${last.month}`}
            detail={t("Highest contributors; remaining brands are grouped")}
          />
          {brandData.length ? (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brandData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid horizontal={false} stroke={CHART.grid} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: CHART.axis }} tickLine={false} axisLine={false} tickFormatter={fmtEURk} />
                  <YAxis type="category" dataKey="name" width={92} tick={{ fontSize: 10, fill: CHART.axis }} tickLine={false} axisLine={false} />
                  <Tooltip content={<FinanceTooltip />} cursor={{ fill: "var(--muted)" }} />
                  <Bar dataKey="value" name={t("Revenue")} radius={[0, 3, 3, 0]}>
                    {brandData.map((brand, index) => (
                      <Cell key={`${brand.id}-${brand.name}-${index}`} fill={brand.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">{t("No brand revenue in this period.")}</div>
          )}
        </Card>

        <Card className="p-4">
          <ChartHeading title={t("Cash, funding and dividends")} detail={t("Liquidity position and shareholder cash movements")} />
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={cashData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={CHART.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: CHART.axis }} tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis tick={{ fontSize: 10, fill: CHART.axis }} tickLine={false} axisLine={false} tickFormatter={fmtEURk} width={58} />
                <Tooltip content={<FinanceTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 12 }} />
                <ReferenceLine y={0} stroke={CHART.axis} />
                <Bar dataKey={t("Funding in")} fill={CHART.funding} radius={[2, 2, 0, 0]} />
                <Bar dataKey={t("Dividends paid")} fill={CHART.dividends} radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey={t("Cash balance")} stroke={CHART.cash} strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 xl:col-span-2">
          <ChartHeading title={t("Cost composition") } detail={t("Monthly operating cost mix across the selected forecast period")} />
          <div className="h-80 w-full sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={CHART.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: CHART.axis }} tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis tick={{ fontSize: 11, fill: CHART.axis }} tickLine={false} axisLine={false} tickFormatter={fmtEURk} width={58} />
                <Tooltip content={<FinanceTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 12 }} />
                <Bar dataKey={t("Direct")} stackId="cost" fill="var(--chart-1)" />
                <Bar dataKey={t("HQ")} stackId="cost" fill="var(--chart-4)" />
                <Bar dataKey={t("Tech")} stackId="cost" fill="var(--chart-3)" />
                <Bar dataKey={t("Marketing")} stackId="cost" fill="var(--chart-5)" />
                <Bar dataKey={t("Variable opex")} stackId="cost" fill="var(--chart-2)" />
                <Bar dataKey={t("Custom")} stackId="cost" fill="var(--muted-foreground)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-3 sm:p-4">
      <div className="text-[11px] text-muted-foreground sm:text-xs">{label}</div>
      <div className="mt-1 text-base font-semibold tabular-nums sm:text-lg">{value}</div>
    </Card>
  );
}