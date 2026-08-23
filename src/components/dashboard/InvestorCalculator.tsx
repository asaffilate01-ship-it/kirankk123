import { useMemo, useState } from "react";
import { t } from "@/lib/i18n";
import { useFinance, buildModel, yearSummaries, DIVIDEND_SCHEDULE } from "@/lib/finance-store";
import { BRANDS, brandById, siblingOf } from "@/lib/brands";
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

const DUAL_BRANDS = BRANDS.filter((b) => b.group);

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

  // Dividends on any scope, using the same 6-monthly distribution policy.
  const dividendsFrom = (net: number[]) => {
    let undistributed = 0;
    return net.map((v, i) => {
      undistributed += v;
      const pct = DIVIDEND_SCHEDULE[rows[i]?.month ?? i + 1] ?? 0;
      const paid = pct > 0 && undistributed > 0 ? undistributed * pct : 0;
      undistributed -= paid;
      return paid;
    });
  };

  const scopeRows = useMemo(
    () => netForIds(selectedIds).map((netProfit, i) => ({ month: rows[i].month, netProfit })),
    [netForIds, selectedIds, rows]
  );

  const dividendRows = useMemo(() => dividendsFrom(scopeRows.map((r) => r.netProfit)), [scopeRows]);


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

  const scopeLabel =
    mode === "company"
      ? t("Whole company (all brands)")
      : mode === "location"
        ? `${brandById(brandId)?.name ?? ""} · ${brandById(brandId)?.domain ?? ""}`
        : `${brandById(dualBrandId)?.name ?? ""} — ${t("both locations")}`;

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
                  {b.name} · {b.entityLabel ?? b.domain}
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
