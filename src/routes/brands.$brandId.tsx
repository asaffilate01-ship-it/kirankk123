import { useState } from "react";
import { t, useLang } from "@/lib/i18n";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { BRANDS, SHARED_ADVANTAGE, groupOf, siblingOf, type Brand } from "@/lib/brands";
import { buildModel, useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SliderRow } from "@/components/dashboard/SliderRow";
import { fmtEUR, fmtEURk, fmtNum, fmtPct } from "@/components/dashboard/format";
import { ArrowLeft, ChevronDown, Download } from "lucide-react";
import { GateGuard } from "@/components/GateGuard";
import { brandLogo } from "@/lib/brand-logos";
import { BrandLogoBox } from "@/components/dashboard/BrandLogoBox";
import { downloadBrandPdf } from "@/lib/brand-pdf";
import { LanguageToggle } from "@/components/LanguageToggle";
import { BrandMonthlyTable } from "@/components/dashboard/BrandMonthlyTable";
import { BrandInvestment } from "@/components/dashboard/BrandInvestment";
import { brandCompetition, brandMoneyModel, brandNegatives, brandPositives } from "@/lib/brand-insights";
import { BrandBusinessPlan } from "@/components/dashboard/BrandBusinessPlan";
import { countryLabel, countryOf } from "@/lib/brand-taxonomy";
import { brandAttritionLabel, brandRevenuePerUnitLabel, brandVolumeLabel } from "@/lib/brand-investor-summary";
import { requireUnlocked } from "@/lib/gate.functions";



export const Route = createFileRoute("/brands/$brandId")({
  beforeLoad: async () => {
    const { unlocked } = await requireUnlocked();
    if (!unlocked) throw redirect({ to: "/unlock", search: { error: undefined } });
  },
  loader: async ({ params }) => {
    const brand = BRANDS.find((b) => b.id === params.brandId);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.brand.name} — iTechLounge` : "Brand — iTechLounge" },
      {
        name: "description",
        content: loaderData?.brand.tagline ?? "iTechLounge brand detail",
      },
      { property: "og:title", content: loaderData ? `${loaderData.brand.name} — iTechLounge` : "Brand — iTechLounge" },
      {
        property: "og:description",
        content: loaderData?.brand.tagline ?? "iTechLounge brand detail",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl p-8">
      <p className="text-sm text-muted-foreground">{t("Brand not found.")}</p>
      <Link to="/investment" className="text-sm underline">{t("Back to dashboard")}</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl p-8 text-sm text-destructive">{String(error)}</div>
  ),
  component: () => (
    <GateGuard>
      <BrandDetail />
    </GateGuard>
  ),
});

function BrandDetail() {
  const { brand } = Route.useLoaderData() as { brand: Brand };
  const { lang } = useLang();
  const logo = brandLogo(brand.id, lang);
  const state = useFinance();
  const a = state.brands[brand.id];
  const rows = buildModel(state);
  const lastRow = rows[rows.length - 1];
  const mrr = lastRow.perBrandRevenue[brand.id] ?? 0;
  const users = lastRow.perBrandUsers[brand.id] ?? 0;

  const handleDownloadPdf = () => {
    downloadBrandPdf(brand, {
      launchMonth: a.launchMonth,
      initialUsers: a.initialUsers,
      users,
      mrr,
      arpu: a.arpu,
      churn: a.churn,
      growth: a.userGrowth,
      directCost: a.directCost,
      horizonMonths: rows.length,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-4">
          <Link to="/investment" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />{t("Back to dashboard")}</Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button size="sm" variant="outline" onClick={handleDownloadPdf}>
              <Download className="mr-1 h-4 w-4" />{t("Download PDF")}</Button>
            <BrandLogoBox src={logo} name={brand.name} color={brand.color} size="sm" align="center" />
            <span className="hidden text-sm font-semibold sm:inline">{brand.name}</span>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-4 px-3 py-5 sm:gap-6 sm:px-4 sm:py-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div>
            {logo && (
              <div className="mb-3">
                <BrandLogoBox src={logo} name={brand.name} color={brand.color} size="lg" />
              </div>
            )}
            <h1 className="text-2xl font-semibold tracking-tight">{brand.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t(brand.tagline)}</p>
            {(() => {
              const sister = siblingOf(brand);
              const group = groupOf(brand);
              if (!sister || !group) return null;
              return (
                <p className="mt-2 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
                  {t("Part of the")} <span className="font-semibold">{group.name}</span> {t("brand group — this entity is")}{" "}
                  <span className="font-semibold">{t(countryLabel(countryOf(brand)))}</span>. {t("Separate revenue, costs, marketing and P&L from the sister entity:")}{" "}
                  <Link to="/brands/$brandId" params={{ brandId: sister.id }} className="font-medium text-primary hover:underline">
                    {sister.name} — {t(countryLabel(countryOf(sister)))}
                  </Link>
                </p>
              );
            })()}
            {brand.family === "TRAVENEXA" && (
              <p className="mt-2 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
                {t("International brand running on the shared TraveNexa booking engine — sold cross-border in multiple currencies.")}
              </p>
            )}
            {brand.family === "AFFIVON" && (
              <p className="mt-2 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
                {t(brand.id === "affivon"
                  ? "Shared platform for multiple Affivon affiliate storefront brands — one engine for products, content, tracked links, disclosures and reporting."
                  : "One of multiple focused affiliate storefronts running on Affivon. The retailer completes the sale; this brand earns retailer-paid commission on eligible referred orders.")}
              </p>
            )}
          </div>
          <BrandBusinessPlan brand={brand} assumptions={a} />

          <Section title={t("Detailed product description")} defaultOpen={false}>
            <p className="text-sm">{t(brand.description)}</p>
          </Section>

          <Section title={t("Detailed reason for the product")} defaultOpen={false}>
            <p className="text-sm">{t(brand.reason)}</p>
          </Section>

          <Section title={t("Detailed offer")} defaultOpen={false}>
            <p className="text-sm">{t(brand.proposition)}</p>
          </Section>

          <Section title={t("Detailed feature list")} defaultOpen={false}>
            <ul className="grid grid-cols-1 gap-1 text-sm md:grid-cols-2">
              {brand.features.map((f) => (
                <li key={t(f)} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: brand.color }} />
                  <span>{t(f)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t("Detailed product and app list")} defaultOpen={false}>
            {brand.pricing && brand.pricing.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("Pricing & packaging")}
                </div>
                <ul className="mt-2 space-y-1 text-sm">
                  {brand.pricing.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: brand.color }} />
                      <span>{t(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {brand.apps.map((app) => (
                <div key={app.name} className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold">{app.name}</div>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                      {app.kind}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(app.purpose)}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t("Detailed users and examples")} defaultOpen={false}>
            <div className="space-y-2">
              {brand.userTypes.map((u) => (
                <div key={t(u.type)} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{t(u.type)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(u.useCase)}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t("Source market estimate and detailed customer list")} defaultOpen={false}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-md border p-3 text-sm">
                <div className="text-xs font-semibold uppercase text-muted-foreground">{t("Market")}</div>
                <div className="mt-1">{t(brand.market)}</div>
              </div>
              <div className="rounded-md border p-3 text-sm">
                <div className="text-xs font-semibold uppercase text-muted-foreground">{t("Audience")}</div>
                <div className="mt-1">{t(brand.audience)}</div>
              </div>
            </div>
          </Section>

          <Section title={t(`How this market works in ${countryLabel(countryOf(brand))} today`)} defaultOpen={false}>
            <div className="space-y-2">
              <p className="text-sm">{t(brand.currentMarket.howServed)}</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="rounded-md border p-3 text-sm">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">{t("Users today")}</div>
                  <div className="mt-1">{t(brand.currentMarket.users)}</div>
                </div>
                <div className="rounded-md border p-3 text-sm">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">{t("Revenue today")}</div>
                  <div className="mt-1">{t(brand.currentMarket.revenue)}</div>
                </div>
              </div>
            </div>
          </Section>

          <Section title={t("Detailed strengths")} defaultOpen={false}>
            <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
              {brandPositives(brand).map((p) => (
                <li key={p} className="flex gap-2 rounded-md border p-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{t(p)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t("Detailed revenue model")} defaultOpen={false}>
            <div className="space-y-2">
              {brandMoneyModel(brand).map((line) => (
                <div key={line.label} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{t(line.label)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(line.detail)}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t("Detailed competitor analysis")} defaultOpen={false}>
            <div className="space-y-2">
              {brandCompetition(brand).map((c) => (
                <div key={c.name} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{t(c.name)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t("Strength:")} {t(c.strength)}</div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-emerald-500">{t("Counter:")}</span> {t(c.counter)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={lang === "de" ? `Wettbewerbsvorteil — ein Team, ${BRANDS.length} Marken` : `Competitive advantage — one team, ${BRANDS.length} brands`} defaultOpen={false}>
            <p className="text-sm text-muted-foreground">
              {lang === "de"
                ? `${brand.name} teilt sich alle Aufgaben außerhalb der eigentlichen Produktentwicklung mit den anderen ${BRANDS.length - 1} Marken von iTechLounge. Dadurch profitiert jedes weitere Produkt von gemeinsamen Kosten, Wissen und Vertriebsmöglichkeiten.`
                : `Unlike standalone software businesses, ${brand.name} shares every non-product function with the other ${BRANDS.length - 1} iTechLounge brand entities. Each additional product therefore benefits from economies of scale and cross-selling opportunities.`}
            </p>
            <ul className="mt-2 grid grid-cols-1 gap-1 text-sm md:grid-cols-2">
              {SHARED_ADVANTAGE.map((s) => (
                <li key={t(s)} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{t(s)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t("Negatives, risks & how we reduce them")} defaultOpen={false}>
            <div className="space-y-2">
              {brandNegatives(brand).map((r) => (
                <div key={r.risk} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold text-amber-500">{t("Risk:")} {t(r.risk)}</div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-emerald-500">{t("Mitigation:")}</span> {t(r.mitigation)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t("Monthly revenue, costs & net revenue (launch → M36)")} defaultOpen={false}>
            <BrandMonthlyTable brandId={brand.id} />
          </Section>

          <BrandInvestment brand={brand} />

        </div>


        <Card className="flex h-fit flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{t("Assumptions")}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">{t("Enabled")}</span>
              <Switch
                checked={a.enabled}
                onCheckedChange={(v) => state.setBrand(brand.id, { enabled: v })}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-md bg-muted/50 p-2 text-center text-xs">
            <div>
              <div className="text-muted-foreground">{t("Launch")}</div>
              <div className="font-semibold">M{a.launchMonth}</div>
            </div>
            <div>
              <div className="text-muted-foreground">{t(brandVolumeLabel(brand))} @ M{rows.length}</div>
              <div className="font-semibold">{fmtNum(users)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">{t("Monthly revenue")} @ M{rows.length}</div>
              <div className="font-semibold">{fmtEURk(mrr)}</div>
            </div>
          </div>
          <SliderRow label={t("Launch month")} value={a.launchMonth} min={1} max={state.global.months}
            onChange={(v) => state.setBrand(brand.id, { launchMonth: v })} />
          <SliderRow label={lang === "de" ? `Startwert: ${t(brandVolumeLabel(brand)).toLowerCase()} (nach Testphase, falls zutreffend)` : `Starting ${brandVolumeLabel(brand).toLowerCase()} (after trial where applicable)`} value={a.initialUsers} min={0} max={5000} step={10}
            onChange={(v) => state.setBrand(brand.id, { initialUsers: v })} format={fmtNum} />
          <SliderRow label={lang === "de" ? `Monatliches Wachstum der ${t(brandVolumeLabel(brand)).toLowerCase()}` : `Monthly growth in ${brandVolumeLabel(brand).toLowerCase()}`} value={Math.round(a.userGrowth * 1000) / 10}
            min={0} max={40} step={0.5}
            onChange={(v) => state.setBrand(brand.id, { userGrowth: v / 100 })}
            format={(v) => `${v.toFixed(1)}%`} />
          <SliderRow label={t(brandRevenuePerUnitLabel(brand))} value={a.arpu} min={0} max={500} step={brand.revenueUnit === "affiliate-order" ? 0.1 : 1}
            onChange={(v) => state.setBrand(brand.id, { arpu: v })}
            format={(v) => brand.revenueUnit === "affiliate-order" ? `€${v.toFixed(2)}/order` : `€${v.toFixed(0)}/mo`} />
          <SliderRow label={t(brandAttritionLabel(brand))} value={Math.round(a.churn * 1000) / 10}
            min={0} max={15} step={0.1}
            onChange={(v) => state.setBrand(brand.id, { churn: v / 100 })}
            format={(v) => `${v.toFixed(1)}%`} />
          <SliderRow label={t("Other revenue / mo")} value={a.addlRevenue} min={0} max={50000} step={100}
            onChange={(v) => state.setBrand(brand.id, { addlRevenue: v })} format={fmtEURk} />
          <SliderRow label={t("Direct brand cost / mo")} value={a.directCost} min={0} max={30000} step={100}
            onChange={(v) => state.setBrand(brand.id, { directCost: v })} format={fmtEURk} />
          <div className="grid grid-cols-2 gap-2 rounded-md bg-muted/50 p-3 text-xs">
            <div>{t("Free trial:")} <b>{state.global.freeTrialMonths} mo</b></div>
            <div>{t(brandRevenuePerUnitLabel(brand))}: <b>{brand.revenueUnit === "affiliate-order" ? `€${a.arpu.toFixed(2)}` : fmtEUR(a.arpu)}</b></div>
            <div>{t("Cancellations:")} <b>{fmtPct(a.churn)}</b></div>
            <div>{t("Growth:")} <b>{fmtPct(a.userGrowth)}</b></div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/">{t("Back to full dashboard")}</Link>
          </Button>
        </Card>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className="border-t p-3">{children}</div> : null}
    </div>
  );
}
