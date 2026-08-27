import { useMemo, useState } from "react";
import { t, useLang } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { BRANDS, BRAND_GROUPS, REGIONS, regionOf, brandById, type Brand } from "@/lib/brands";
import { useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fmtEURk, fmtNum } from "./format";
import { PanelIntro } from "./Explain";
import { buildModel } from "@/lib/finance-store";
import { brandLogo } from "@/lib/brand-logos";
import { BrandLogoBox } from "./BrandLogoBox";
import {
  COUNTRIES,
  SECTORS,
  countryOf,
  sectorOf,
  countryCounts,
  sectorCounts,
  countryLabel,
  sectorLabel,
  type CountryId,
  type SectorId,
} from "@/lib/brand-taxonomy";
import { brandPlainLanguage, brandVolumeLabel } from "@/lib/brand-investor-summary";

export function BrandsPanel() {
  const state = useFinance();
  const { lang } = useLang();
  const rows = buildModel(state);
  const lastRow = rows[rows.length - 1];

  const [countries, setCountries] = useState<CountryId[]>([]);
  const [sectors, setSectors] = useState<SectorId[]>([]);
  const [query, setQuery] = useState("");

  const cCounts = useMemo(() => countryCounts(), []);
  const sCounts = useMemo(() => sectorCounts(), []);

  const toggle = <T,>(list: T[], v: T, set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtering = countries.length > 0 || sectors.length > 0 || query.trim().length > 0;
  const q = query.trim().toLowerCase();
  const filtered = BRANDS.filter(
    (b) =>
      (countries.length === 0 || countries.includes(countryOf(b))) &&
      (sectors.length === 0 || sectors.includes(sectorOf(b))) &&
      (q === "" ||
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        brandPlainLanguage(b, lang).toLowerCase().includes(q)),
  );

  const metrics = (id: string) => ({
    mrr: lastRow.perBrandRevenue[id] ?? 0,
    users: lastRow.perBrandUsers[id] ?? 0,
  });

  const BrandCard = ({ b }: { b: Brand }) => {
    const a = state.brands[b.id];
    const { mrr, users } = metrics(b.id);
    return (
      <Card className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <BrandLogoBox src={brandLogo(b.id, lang)} name={b.name} color={b.color} />
              <h3 className="font-semibold">{b.name}</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t(b.tagline)}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-[11px]">
                {t(countryLabel(countryOf(b)))}
              </Badge>
              <Badge variant="outline" className="text-[11px]">{t(sectorLabel(sectorOf(b)))}</Badge>
              <Badge variant="outline" className="text-[11px]">
                {t(
                  b.payerModel?.side === "consumer"
                    ? "User-funded"
                    : b.payerModel?.side === "hybrid"
                      ? "Hybrid-funded"
                      : "Business-funded",
                )}
              </Badge>
            </div>
          </div>
          <Switch
            checked={a.enabled}
            onCheckedChange={(v) => state.setBrand(b.id, { enabled: v })}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-md bg-muted/50 p-2 text-center text-xs">
          <div>
            <div className="text-muted-foreground">{t("Launch")}</div>
            <div className="font-semibold">M{a.launchMonth}</div>
          </div>
          <div>
            <div className="text-muted-foreground">{t(brandVolumeLabel(b))} @ M{rows.length}</div>
            <div className="font-semibold">{fmtNum(users)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">{t("Monthly revenue")} @ M{rows.length}</div>
            <div className="font-semibold">{fmtEURk(mrr)}</div>
          </div>
        </div>
        <div className="rounded-md bg-primary/5 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-primary">{t("What it does")}</div>
          <p className="mt-1 line-clamp-4 text-xs leading-relaxed">{brandPlainLanguage(b, lang)}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-auto">
          <Link to="/brands/$brandId" params={{ brandId: b.id }}>{t("View business plan")}</Link>
        </Button>
      </Card>
    );
  };

  const groupedIds = new Set(BRAND_GROUPS.flatMap((g) => g.entities));

  const selectedCountry = countries[0] ?? "all";
  const selectedSector = sectors[0] ?? "all";

  const FilterBar = () => (
    <Card className="p-3 sm:p-4">
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-wrap">
        <Select
          value={selectedCountry}
          onValueChange={(v) => setCountries(v === "all" ? [] : [v as CountryId])}
        >
          <SelectTrigger className="w-full text-sm lg:w-44">
            <SelectValue placeholder={t("Country")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("All countries")}</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.flag} {t(c.label)} ({cCounts[c.id]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSector}
          onValueChange={(v) => setSectors(v === "all" ? [] : [v as SectorId])}
        >
          <SelectTrigger className="w-full text-sm lg:w-52">
            <SelectValue placeholder={t("Business type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("All business types")}</SelectItem>
            {SECTORS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {t(s.label)} ({sCounts[s.id] ?? 0})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Search brand or tagline…")}
          className="h-9 w-full text-sm sm:col-span-2 lg:w-56"
        />

        {filtering && (
          <div className="flex items-center gap-2 sm:col-span-2 lg:contents">
            <span className="text-xs text-muted-foreground">
              {filtered.length} {t("brands")}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCountries([]);
                setSectors([]);
                setQuery("");
              }}
            >
              {t("Clear filters")}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );

  if (filtering) {
    return (
      <div className="space-y-6">
        <BrandsIntro />
        <FilterBar />
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("No brands match these filters.")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((b) => <BrandCard key={b.id} b={b} />)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BrandsIntro />
      <FilterBar />
      {/* Dual-market brands: one brand name, two entities, separate books */}
      <section>
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b pb-2">
          <h2 className="text-lg font-semibold tracking-tight">{t("Dual-market brands (DE + UK entities)")}</h2>
          <span className="text-xs text-muted-foreground">{BRAND_GROUPS.length} {t("brands")}</span>
          <p className="text-xs text-muted-foreground">
            {t("One brand name, two separate legal entities — each with its own revenue, costs, marketing and P&L line in the model.")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {BRAND_GROUPS.map((g) => {
            const entities = g.entities.map((id) => brandById(id)).filter(Boolean) as Brand[];
            const combinedMrr = entities.reduce((s, e) => s + metrics(e.id).mrr, 0);
            return (
              <Card key={g.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-start gap-3">
                  <BrandLogoBox
                    src={brandLogo(entities[0]?.id ?? g.id, lang)}
                    name={g.name}
                    color={entities[0]?.color}
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-semibold">{g.name}</h3>
                      <span className="text-[11px] text-muted-foreground">
                        {entities.length} {t("entities")} · {fmtEURk(combinedMrr)} {t("combined monthly revenue")} @ M{rows.length}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{t(g.blurb)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {entities.map((e) => {
                    const a = state.brands[e.id];
                    const { mrr, users } = metrics(e.id);
                    return (
                      <div key={e.id} className="flex flex-col gap-2 rounded-md border p-3">
                        <div className="flex items-start justify-between gap-2">
                          {g.id === "xpertjobs" ? (
                            <div className="flex min-w-0 items-start gap-2">
                              <BrandLogoBox src={brandLogo(e.id, lang)} name={e.name} color={e.color} size="sm" />
                              <div className="min-w-0">
                                <div className="text-xs font-semibold">{e.name}</div>
                                <div className="text-[11px] text-muted-foreground">
                                  {regionOf(e) === "DE" ? t("Germany") : t("United Kingdom")}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="min-w-0">
                              <div className="text-xs font-semibold">{e.name}</div>
                              <div className="text-[11px] text-muted-foreground">
                                {regionOf(e) === "DE" ? t("Germany") : t("United Kingdom")}
                              </div>
                            </div>
                          )}

                          <Switch
                            checked={a.enabled}
                            onCheckedChange={(v) => state.setBrand(e.id, { enabled: v })}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-1 rounded bg-muted/50 p-2 text-center text-[11px]">
                          <div>
                            <div className="text-muted-foreground">{t("Launch")}</div>
                            <div className="font-semibold">M{a.launchMonth}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">{t(brandVolumeLabel(e))}</div>
                            <div className="font-semibold">{fmtNum(users)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">{t("Monthly revenue")}</div>
                            <div className="font-semibold">{fmtEURk(mrr)}</div>
                          </div>
                        </div>
                        <div className="rounded bg-primary/5 p-2.5">
                          <div className="text-[10px] font-semibold uppercase tracking-wide text-primary">{t("What it does")}</div>
                          <p className="mt-1 text-[11px] leading-relaxed">{brandPlainLanguage(e, lang)}</p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/brands/$brandId" params={{ brandId: e.id }}>{t("View business plan")}</Link>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {REGIONS.map((region) => {
        const brands = BRANDS.filter((b) => regionOf(b) === region.id && !groupedIds.has(b.id));
        if (brands.length === 0) return null;
        const travel = brands.filter((b) => b.family === "TRAVENEXA");
        const rest = brands.filter((b) => b.family !== "TRAVENEXA");
        return (
          <section key={region.id}>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b pb-2">
              <h2 className="text-lg font-semibold tracking-tight">{t(region.label)}</h2>
              <span className="text-xs text-muted-foreground">{brands.length} {t("brands")}</span>
              <p className="text-xs text-muted-foreground">{t(region.blurb)}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((b) => <BrandCard key={b.id} b={b} />)}
            </div>
            {travel.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b pb-2">
                  <h3 className="text-base font-semibold tracking-tight">{t("TraveNexa international travel network")}</h3>
                  <span className="text-xs text-muted-foreground">{travel.length} {t("brands")}</span>
                  <p className="text-xs text-muted-foreground">
                    {t("All travel brands run on the shared TraveNexa booking engine and are sold cross-border in multiple currencies.")}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {travel.map((b) => <BrandCard key={b.id} b={b} />)}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function BrandsIntro() {
  return (
    <PanelIntro
      title={t("Browse the portfolio")}
      description={t("Most brands have one paying side. Auvane One is the portfolio's hybrid-funded exception because its paid member concierge and paid supplier access are separate services. Each card shows the relevant paying accounts and monthly revenue.")}
      tips={[
        t("Open a brand to read the full case and edit its own assumptions."),
        t("Business-funded products keep the consumer, player, parent, candidate or traveller side free."),
        t("Dual-market brands share a name but keep separate books for each country."),
        t("Use the toggle on a card to include or exclude a brand from the forecast."),
      ]}
    />
  );
}
