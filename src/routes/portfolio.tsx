import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Globe2, LockKeyhole, Search, Sparkles } from "lucide-react";
import { BRANDS, TARGET_BRAND_COUNT, type Brand } from "@/lib/brands";
import { t, useLang } from "@/lib/i18n";
import { brandPlainLanguage } from "@/lib/brand-investor-summary";
import { brandLogo } from "@/lib/brand-logos";
import { COUNTRIES, SECTORS, countryLabel, countryOf, sectorLabel, sectorOf, type CountryId, type SectorId } from "@/lib/brand-taxonomy";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandLogoBox } from "@/components/dashboard/BrandLogoBox";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SiteFooter } from "@/components/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import promoHero from "@/assets/promo-tech-hero.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [
    { title: "iTechLounge digital brands — public portfolio" },
    { name: "description", content: "Plain-language guide to 100 UK, German and international digital brands and the services they provide." },
    { property: "og:title", content: "iTechLounge digital brands" },
    { property: "og:description", content: "Explore practical digital services for businesses, families and communities." },
    { property: "og:type", content: "website" },
  ] }),
  component: PublicPortfolio,
});

function PublicPortfolio() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<CountryId | "all">("all");
  const [sector, setSector] = useState<SectorId | "all">("all");
  const q = query.trim().toLowerCase();
  const brands = useMemo(() => BRANDS.filter((brand) =>
    (country === "all" || countryOf(brand) === country) &&
    (sector === "all" || sectorOf(brand) === sector) &&
    (!q || [brand.name, brand.tagline, brand.audience, brandPlainLanguage(brand, lang), ...brand.features].some((value) => value.toLowerCase().includes(q)))
  ).sort((a, b) => {
    const rank = (brand: Brand) => {
      if (brand.family === "TRAVENEXA") return 4;
      if (brand.group) return 0;
      const c = countryOf(brand);
      return c === "UK" ? 1 : c === "DE" ? 2 : 3;
    };
    const ra = rank(a), rb = rank(b);
    if (ra !== rb) return ra - rb;
    if (ra === 0 && a.group !== b.group) return (a.group ?? "").localeCompare(b.group ?? "");
    return a.name.localeCompare(b.name);
  }), [country, sector, q, lang]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="safe-top sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 sm:py-3">
          <Link to="/portfolio" className="flex min-w-0 items-center gap-3"><BrandLogo className="h-10 shrink-0 sm:h-14" /><span className="hidden text-sm font-semibold sm:inline">iTechLounge</span></Link>
          <LanguageToggle />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-2 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search brand, audience or purpose")} className="h-11 rounded-full pl-9" inputMode="search" enterKeyHint="search" />
          </div>
        </div>
      </header>

      <main className="pb-tabbar md:pb-0">

        <section className="border-b bg-gradient-to-br from-primary/[0.08] via-background to-background"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.3fr_.7fr] md:items-center md:py-20"><div><Badge className="mb-4"><Sparkles className="mr-1 h-3.5 w-3.5" />{TARGET_BRAND_COUNT} {t("digital brands")}</Badge><h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{t("One portfolio. Practical digital services for real people and businesses.")}</h1><p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("Explore our UK, German and international brands in plain English. See what each service does, who it helps and the main tools it provides.")}</p><p className="mt-3 text-xs text-muted-foreground">{t("No investment forecasts, private traction or portfolio domains are shown in this public area.")}</p></div><div className="space-y-4"><img src={promoHero} alt={t("Connected network of iTechLounge digital platforms")} width={1600} height={912} className="w-full rounded-xl border object-cover shadow-lg" /><Card className="grid grid-cols-3 gap-3 p-5 text-center"><Metric value={TARGET_BRAND_COUNT} label={t("digital brands")} /><Metric value={COUNTRIES.length} label={t("territories")} /><Metric value={SECTORS.length} label={t("service sectors")} /></Card></div></div></section>

        <section className="mx-auto max-w-7xl px-4 py-10"><div className="mb-5"><h2 className="text-2xl font-semibold">{t("Browse every brand")}</h2><p className="mt-1 text-sm text-muted-foreground">{t("Filter by territory, sector or a word describing the service you need.")}</p></div>
          <Card className="mb-5 p-3 sm:p-4"><div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_180px_210px_auto]"><div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search brand, audience or purpose")} className="pl-9" /></div><Select value={country} onValueChange={(value) => setCountry(value as CountryId | "all")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t("All territories")}</SelectItem>{COUNTRIES.map((item) => <SelectItem key={item.id} value={item.id}>{item.flag} {t(countryLabel(item.id))}</SelectItem>)}</SelectContent></Select><Select value={sector} onValueChange={(value) => setSector(value as SectorId | "all")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t("All sectors")}</SelectItem>{SECTORS.map((item) => <SelectItem key={item.id} value={item.id}>{t(item.label)}</SelectItem>)}</SelectContent></Select><Button variant="outline" onClick={() => { setQuery(""); setCountry("all"); setSector("all"); }}>{t("Clear filters")}</Button></div><p className="mt-2 text-xs text-muted-foreground">{brands.length} {t("brands shown")}</p></Card>
          {brands.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{brands.map((brand) => <PublicBrandCard key={brand.id} brand={brand} lang={lang} />)}</div> : <Card className="p-10 text-center text-sm text-muted-foreground">{t("No brands match these filters.")}</Card>}
        </section>

        <section className="border-t bg-muted/20"><div className="mx-auto max-w-7xl px-4 py-10"><div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 text-primary" /><div><h2 className="text-lg font-semibold">{t("Private access")}</h2><p className="mt-1 max-w-3xl text-sm text-muted-foreground">{t("This public portfolio explains products only. Financial and marketing details are available to authorised users.")}</p><div className="mt-4 flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/unlock" search={{ error: undefined }}>{t("Investor dashboard")}</Link></Button><Button asChild variant="outline"><Link to="/marketing/unlock" search={{ error: undefined }}>{t("Marketing command centre")}</Link></Button></div></div></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

function PublicBrandCard({ brand, lang }: { brand: Brand; lang: "en" | "de" }) {
  const [open, setOpen] = useState(false);
  const funding = brand.revenueUnit === "affiliate-order"
    ? "Retailer-funded affiliate service — shoppers use it free and approved retailers fund eligible confirmed sales."
    : brand.payerModel?.side === "consumer"
      ? "User-funded — the person using the paid service is the customer; businesses are not charged for the same exchange."
      : brand.payerModel?.side === "hybrid"
        ? "Hybrid-funded — two different paid services are presented and priced separately."
        : "Business-funded — the relevant business customer pays; the user side is not charged a second platform fee.";
  return (
    <Card className="flex flex-col p-4"><div className="flex items-start gap-3"><BrandLogoBox src={brandLogo(brand.id, lang)} name={brand.name} color={brand.color} /><div className="min-w-0"><h3 className="font-semibold">{brand.name}</h3><p className="mt-0.5 text-xs text-muted-foreground">{t(brand.tagline)}</p><div className="mt-2 flex flex-wrap gap-1"><Badge variant="secondary" className="text-[11px]">{t(countryLabel(countryOf(brand)))}</Badge><Badge variant="outline" className="text-[11px]">{t(sectorLabel(sectorOf(brand)))}</Badge></div></div></div>
      <div className="mt-4 rounded-lg bg-primary/5 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{t("What it does")}</p><p className="mt-1 text-sm leading-relaxed">{brandPlainLanguage(brand, lang)}</p></div>
      <div className="mt-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t("Who it helps")}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(brand.audience)}</p></div>
      <div className="mt-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t("How it is funded")}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(funding)}</p></div>
      <button type="button" onClick={() => setOpen((value) => !value)} className="mt-4 flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted/50" aria-expanded={open}><span>{t(open ? "Hide services" : "Show services")}</span><ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>
      {open ? <div className="mt-3 space-y-3"><div><p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{t("Main services")}</p><ul className="mt-2 grid gap-1.5">{brand.features.slice(0, 10).map((feature) => <li key={feature} className="flex gap-2 text-xs leading-relaxed text-muted-foreground"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{t(feature)}</span></li>)}</ul></div>{brand.apps.length ? <div><p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{t("Apps and access")}</p><div className="mt-2 flex flex-wrap gap-1">{brand.apps.map((app) => <Badge key={`${app.name}-${app.kind}`} variant="outline" className="text-[10px]">{t(app.kind)}</Badge>)}</div></div> : null}</div> : null}
    </Card>
  );
}

function Metric({ value, label }: { value: number; label: string }) { return <div><div className="text-2xl font-bold text-primary">{value}</div><div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div></div>; }
