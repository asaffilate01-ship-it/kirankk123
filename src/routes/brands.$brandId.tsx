import { t } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BRANDS, SHARED_ADVANTAGE, type Brand } from "@/lib/brands";
import { buildModel, useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SliderRow } from "@/components/dashboard/SliderRow";
import { fmtEUR, fmtEURk, fmtNum, fmtPct } from "@/components/dashboard/format";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { GateGuard } from "@/components/GateGuard";
import { BRAND_LOGOS } from "@/lib/brand-logos";
import { downloadBrandPdf } from "@/lib/brand-pdf";
import { LanguageToggle } from "@/components/LanguageToggle";

export const Route = createFileRoute("/brands/$brandId")({
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
      <Link to="/" className="text-sm underline">{t("Back to dashboard")}</Link>
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
  const state = useFinance();
  const a = state.brands[brand.id];
  const rows = buildModel(state);
  const lastRow = rows[rows.length - 1];
  const mrr = lastRow.perBrandRevenue[brand.id] ?? 0;
  const users = lastRow.perBrandUsers[brand.id] ?? 0;

  const handleDownloadPdf = () => {
    downloadBrandPdf(brand, {
      launchMonth: a.launchMonth,
      users,
      mrr,
      arpu: a.arpu,
      churn: a.churn,
      growth: a.userGrowth,
      horizonMonths: rows.length,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />{t("Back to dashboard")}</Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button size="sm" variant="outline" onClick={handleDownloadPdf}>
              <Download className="mr-1 h-4 w-4" />{t("Download PDF")}</Button>
            {BRAND_LOGOS[brand.id] ? (
              <div className="flex h-26 w-[120px] items-center justify-center">
                <img src={BRAND_LOGOS[brand.id]} alt={`${brand.name} logo`} className="max-h-full w-auto max-w-full object-contain" />
              </div>
            ) : (
              <span className="h-3 w-3 rounded-full" style={{ background: brand.color }} aria-hidden />
            )}
            <span className="text-sm font-semibold">{brand.name}</span>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div>
            {BRAND_LOGOS[brand.id] && (
              <div className="mb-3 flex h-26 w-[200px] shrink-0 items-center justify-start overflow-hidden">
                <img
                  src={BRAND_LOGOS[brand.id]}
                  alt={`${brand.name} logo`}
                  className="h-full w-full object-contain object-left"
                />
              </div>
            )}
            <h1 className="text-2xl font-semibold tracking-tight">{brand.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t(brand.tagline)}</p>
            <a
              href={`https://${brand.domain}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {brand.domain} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <p className="text-sm">{t(brand.description)}</p>

          <Section title={t("Why this product exists")}>
            <p className="text-sm">{t(brand.reason)}</p>
          </Section>

          <Section title={t("Proposition")}>
            <p className="text-sm">{t(brand.proposition)}</p>
          </Section>

          <Section title={t("Features")}>
            <ul className="grid grid-cols-1 gap-1 text-sm md:grid-cols-2">
              {brand.features.map((f) => (
                <li key={t(f)} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: brand.color }} />
                  <span>{t(f)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t("SaaS platform & apps")}>
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

          <Section title={t("User types")}>
            <div className="space-y-2">
              {brand.userTypes.map((u) => (
                <div key={t(u.type)} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{t(u.type)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(u.useCase)}</div>
                </div>
              ))}
            </div>
          </Section>

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

          <Section title={t("How this market is served in Germany today")}>
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

          <Section title={t("Competition & how we break their strength")}>
            <div className="space-y-2">
              {brand.competitors.map((c) => (
                <div key={c.name} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t("Strength:")} {t(c.strength)}</div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-emerald-500">{t("Counter:")}</span> {t(c.counter)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t("Competitive advantage — one team, ten brands")}>
            <p className="text-sm text-muted-foreground">
              Unlike standalone SaaS businesses, {brand.name} shares every non-product function with the
              other nine iTechLounge brands. Each additional product therefore benefits from economies of
              scale and cross-selling opportunities.
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

          <Section title={t("Risks & how we reduce them to nil")}>
            <div className="space-y-2">
              {brand.risks.map((r) => (
                <div key={r.risk} className="rounded-md border p-3 text-sm">
                  <div className="font-semibold text-amber-500">{t("Risk:")} {t(r.risk)}</div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-emerald-500">{t("Mitigation:")}</span> {t(r.mitigation)}
                  </div>
                </div>
              ))}
            </div>
          </Section>
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
              <div className="text-muted-foreground">{t("Paying customers")} @ M{rows.length}</div>
              <div className="font-semibold">{fmtNum(users)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">{t("Monthly revenue")} @ M{rows.length}</div>
              <div className="font-semibold">{fmtEURk(mrr)}</div>
            </div>
          </div>
          <SliderRow label={t("Launch month")} value={a.launchMonth} min={1} max={state.global.months}
            onChange={(v) => state.setBrand(brand.id, { launchMonth: v })} />
          <SliderRow label={t("Starting paying customers (after free trial)")} value={a.initialUsers} min={0} max={2000} step={10}
            onChange={(v) => state.setBrand(brand.id, { initialUsers: v })} format={fmtNum} />
          <SliderRow label={t("New customers added each month")} value={Math.round(a.userGrowth * 1000) / 10}
            min={0} max={40} step={0.5}
            onChange={(v) => state.setBrand(brand.id, { userGrowth: v / 100 })}
            format={(v) => `${v.toFixed(1)}%`} />
          <SliderRow label={t("Average price per customer / month")} value={a.arpu} min={0} max={500} step={1}
            onChange={(v) => state.setBrand(brand.id, { arpu: v })}
            format={(v) => `€${v.toFixed(0)}/mo`} />
          <SliderRow label={t("Customers cancelling each month")} value={Math.round(a.churn * 1000) / 10}
            min={0} max={15} step={0.1}
            onChange={(v) => state.setBrand(brand.id, { churn: v / 100 })}
            format={(v) => `${v.toFixed(1)}%`} />
          <SliderRow label={t("Other revenue / mo")} value={a.addlRevenue} min={0} max={50000} step={100}
            onChange={(v) => state.setBrand(brand.id, { addlRevenue: v })} format={fmtEURk} />
          <SliderRow label={t("Direct brand cost / mo")} value={a.directCost} min={0} max={30000} step={100}
            onChange={(v) => state.setBrand(brand.id, { directCost: v })} format={fmtEURk} />
          <div className="grid grid-cols-2 gap-2 rounded-md bg-muted/50 p-3 text-xs">
            <div>{t("Free trial:")} <b>{state.global.freeTrialMonths} mo</b></div>
            <div>{t("Price per customer:")} <b>{fmtEUR(a.arpu)}</b></div>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}