import { t, useLang } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { useFinance } from "@/lib/finance-store";
import { BRANDS, SHARED_ADVANTAGE } from "@/lib/brands";
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
import { logoEn, logoDe, logoEnDark, logoDeDark } from "@/lib/logo";
import { BrandLogo } from "@/components/BrandLogo";
import { PanelIntro, Section } from "./Explain";
import { portfolioDefinitionCounts } from "@/lib/brand-investor-summary";

function BrandDirectory() {
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
          (q === "" || b.name.toLowerCase().includes(q)),
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
          placeholder={t("Search brand")}
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

export function SystemPanel() {
  const { lang } = useLang();
  const definitionCounts = portfolioDefinitionCounts(BRANDS);
  return (
    <div className="space-y-4">
      <PanelIntro
        title={t("Our system")}
        description={t("One shared platform runs every brand. Search the full brand list, see the group companies and the brand marks.")}
      />

      <Section
        title={lang === "de" ? `Unser System — ein Team, ${BRANDS.length} Markengesellschaften` : `Our system — one team, ${BRANDS.length} brand entities`}
        description={t("How one shared platform runs the whole portfolio — plus the searchable brand list.")}
                badge={`${BRANDS.length} ${t("brands")}`}
      >
        <div className="space-y-3 text-sm">
        <p className="text-muted-foreground">
          {lang === "de"
            ? `Alle ${definitionCounts.defined} Markengesellschaften haben jetzt einen definierten Produktplan. Sie teilen Technik und zentrale Teams. Das vermeidet doppelte Kosten und schafft gemeinsame Vertriebsmöglichkeiten.`
            : `All ${definitionCounts.defined} brand entities now have a defined product plan. They share technology and central teams, reducing repeated cost and creating cross-selling opportunities.`}
        </p>
        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {SHARED_ADVANTAGE.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{t(s)}</span>
            </li>
          ))}
        </ul>
        <BrandDirectory />
        </div>
      </Section>

      <Section title={t("Company entities")} defaultOpen={false}>
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
          <div className="rounded-lg border p-3">
            <div className="text-xs uppercase text-muted-foreground">{t("United Kingdom")}</div>
            <div className="font-semibold">ITECHLOUNGE LTD</div>
            <div className="text-xs text-muted-foreground">{t("United Kingdom operating company")}</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs uppercase text-muted-foreground">{t("Germany")}</div>
            <div className="font-semibold">ITECHLOUNGE GMBH</div>
            <div className="text-xs text-muted-foreground">{t("Germany operating company")}</div>
          </div>
        </div>
      </Section>

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
