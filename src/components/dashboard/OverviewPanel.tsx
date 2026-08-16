import { t } from "@/lib/i18n";
import { useMemo } from "react";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { BRANDS, SHARED_ADVANTAGE } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import { fmtEURk, fmtPct } from "./format";
import { logoEn, logoDe, logoEnDark, logoDeDark } from "@/lib/logo";
import { BrandLogo } from "@/components/BrandLogo";

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
        <BrandLogo className="h-32" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("iTechLounge")}</h1>
          <p className="text-sm font-medium">{t("Digital ideas. Beautifully built.")}</p>
          <p className="text-sm text-muted-foreground">{t("Live dashboard — 10 German-focused digital brands, one operating team. Drag any slider to re-forecast P&L, cash flow and balance sheet in real time.")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label={t("Active brands")} value={`${activeBrands} / 10`} />
        <Kpi label={`${t("MRR")} @ M${rows.length}`} value={fmtEURk(last.revenue)} />
        <Kpi label={t("Funding raised")} value={fmtEURk(totalFunding)} />
        <Kpi
          label={t("€1m/mo hit at")}
          value={monthAtMilestone ? `M${monthAtMilestone}` : "not reached"}
        />
        <Kpi
          label={t("Cash trough")}
          value={fmtEURk(minCash)}
          tone={minCash < 0 ? "bad" : "good"}
        />
        <Kpi label={`${t("Cash")} @ M${rows.length}`} value={fmtEURk(last.cashBalance)} />
        <Kpi label={`${t("Investor dividends")} (${investorPctLabel})`} value={fmtEURk(cumInvestor)} />
        <Kpi label={t("Total dividends paid")} value={fmtEURk(cumDividend)} />
        <Kpi
          label={`${t("Margin")} @ M${rows.length}`}
          value={last.revenue > 0 ? fmtPct(last.ebit / last.revenue) : "—"}
        />
      </div>

      <Card className="p-4">
        <h3 className="mb-3 font-semibold">{t("Year-by-year summary")}</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {years.map((y) => (
            <div key={y.year} className="rounded-lg border p-3">
              <div className="text-xs uppercase text-muted-foreground">Year {y.year}</div>
              <div className="mt-2 space-y-1 text-sm">
                <Row k={t("Revenue")} v={fmtEURk(y.revenue)} />
                <Row k={t("EBIT")} v={fmtEURk(y.ebit)} />
                <Row k={t("Margin")} v={fmtPct(y.margin)} />
                <Row k={t("Net profit")} v={fmtEURk(y.netProfit)} />
                <Row k={`${t("Investor dividends")} (${investorPctLabel})`} v={fmtEURk(y.investorShare)} />
                <Row k={t("Year-end cash")} v={fmtEURk(y.endCash)} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-2 p-4 text-sm">
        <h3 className="font-semibold">{t("Investor terms")}</h3>
        <p className="text-muted-foreground">
          {t("Total raise:")} <b>{fmtEURk(totalFunding)}</b>{" "}
          {t("for")} <b>{fmtPct(state.global.investorEquityPct)} {t("equity")}</b>.{" "}
          {t("Drawn as")} {fmtEURk(state.global.trancheSize)} {t("tranches ×")}{" "}
          {state.global.trancheCount} {t("months.")}{" "}
          {t("Each tranche therefore buys")} <b>{fmtPct(equityPerTranche, 2)} {t("equity")}</b> —{" "}
          {t("so a €50k ticket is worth 2.25% at the full-raise valuation.")}{" "}
          {t("Shareholders draw dividends every six months from undistributed net profit —")}{" "}
          <b>{t("20% at M6")}</b>, <b>{t("30% at M12")}</b>, {t("then")}{" "}
          <b>{t("40% at M18, M24, M30 and M36")}</b> —{" "}
          {t("split pro-rata by equity; the rest stays in the business.")}{" "}
          {t("All 10 brands launch on a 3-week rolling cadence with a")}{" "}
          {state.global.freeTrialMonths}
          {t("-month free trial.")}
        </p>
      </Card>

      <Card className="space-y-3 p-4 text-sm">
        <h3 className="font-semibold">{t("Our system — one team, ten brands")}</h3>
        <p className="text-muted-foreground">{t("iTechLounge operates as a single company that ships and runs ten German-focused digital brands. Every brand shares the same operating chassis, so each new product launched on our platform benefits from economies of scale and cross-selling into the existing customer base of the other nine.")}</p>
        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {SHARED_ADVANTAGE.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{t(s)}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-2 pt-2 md:grid-cols-2">
          {BRANDS.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-md border p-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                <span className="font-semibold">{b.name}</span>
                <span className="text-muted-foreground">· {t("launches")} M{state.brands[b.id].launchMonth}</span>
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

      <Card className="space-y-3 p-4 text-sm">
        <h3 className="font-semibold">{t("Company & domains")}</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-lg border p-3">
            <div className="text-xs uppercase text-muted-foreground">{t("United Kingdom")}</div>
            <div className="font-semibold">ITECHLOUNGE LTD</div>
            <a href="https://itechlounge.co.uk" target="_blank" rel="noreferrer" className="text-primary hover:underline">itechlounge.co.uk ↗</a>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs uppercase text-muted-foreground">{t("Germany")}</div>
            <div className="font-semibold">ITECHLOUNGE GMBH</div>
            <a href="https://itechlounge.de" target="_blank" rel="noreferrer" className="text-primary hover:underline">itechlounge.de ↗</a>
          </div>
        </div>
      </Card>

      <Card className="space-y-3 p-4 text-sm">
        <h3 className="font-semibold">{t("Brand marks")}</h3>
        <p className="text-muted-foreground">{t("All four marks are transparent PNGs (no background box), tightly cropped to the artwork — ready for business cards, letterheads, signage, slides and web. Use the light version on white or pale stock, the dark version on black, dark or photographic backgrounds.")}</p>
        <p className="text-xs text-muted-foreground">{t("© ITECHLOUNGE LTD / ITECHLOUNGE GMBH. The marks are shown for reference only — downloading, dragging and saving are disabled. Request the master files from the brand owner.")}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MarkTile
            src={logoEn}
            alt={t("iTechLounge — Digital ideas. Beautifully built.")}
            file="itechlounge-logo-en.png"
            label={t("English · for light backgrounds")}
            dark={false}
          />
          <MarkTile
            src={logoEnDark}
            alt={t("iTechLounge — Digital ideas. Beautifully built. (reversed)")}
            file="itechlounge-logo-en-dark.png"
            label={t("English · for dark backgrounds")}
            dark
          />
          <MarkTile
            src={logoDe}
            alt={t("iTechLounge — Digitale Ideen. Wunderschön umgesetzt.")}
            file="itechlounge-logo-de.png"
            label={t("German · for light backgrounds")}
            dark={false}
          />
          <MarkTile
            src={logoDeDark}
            alt={t("iTechLounge — Digitale Ideen. Wunderschön umgesetzt. (reversed)")}
            file="itechlounge-logo-de-dark.png"
            label={t("German · for dark backgrounds")}
            dark
          />
        </div>
      </Card>
    </div>
  );
}

function MarkTile({
  src,
  alt,
  file,
  label,
  dark,
}: {
  src: string;
  alt: string;
  file: string;
  label: string;
  dark: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
      <div
        className={`flex h-32 w-full items-center justify-center rounded-md ${
          dark ? "bg-zinc-900" : "bg-white"
        }`}
      >
        <BrandLogo src={src} alt={alt} dark={dark} className="h-28" />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{file} · {t("download disabled")}</span>
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