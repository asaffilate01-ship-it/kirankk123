import { useMemo, useState } from "react";
import { BRANDS, type Brand } from "@/lib/brands";
import { t, useLang } from "@/lib/i18n";
import { brandMarketingPlan, type MarketingPlan } from "@/lib/brand-marketing-plan";
import { brandPlainLanguage } from "@/lib/brand-investor-summary";
import { brandLogo } from "@/lib/brand-logos";
import { COUNTRIES, SECTORS, countryLabel, countryOf, sectorLabel, sectorOf, type CountryId, type SectorId } from "@/lib/brand-taxonomy";
import { BrandLogoBox } from "./BrandLogoBox";
import { PanelIntro, Section } from "./Explain";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Globe2, MapPinned, Megaphone, Search, ShieldCheck, Target, Users } from "lucide-react";

export function MarketingPanel() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<CountryId | "all">("all");
  const [sector, setSector] = useState<SectorId | "all">("all");
  const q = query.trim().toLowerCase();

  const brands = useMemo(() => BRANDS.filter((brand) =>
    (country === "all" || countryOf(brand) === country) &&
    (sector === "all" || sectorOf(brand) === sector) &&
    (!q || [brand.name, brand.tagline, brand.audience, brandPlainLanguage(brand, lang), brand.payerModel?.payer ?? ""].some((value) => value.toLowerCase().includes(q)))
  ), [country, sector, q, lang]);

  return (
    <div className="space-y-4">
      <PanelIntro
        title={t("Marketing is separate from investment")}
        description={t("This section explains how each brand will find its paying customers and, where required, build the free user or supply side. It is an operating plan, not an investment-return forecast.")}
        tips={[
          t("Every brand below has its own 90-day action plan, channel mix, target audiences and scorecard."),
          t("Businesses pay in most products; free users are marketed only where their participation creates real value for the paying business."),
          t("Marketing budgets move toward retained customers and away from vanity metrics."),
        ]}
      />

      <Section title={t("Portfolio launch sequence")} description={t("One order of work across three market groups.")}>
        <div className="grid gap-3 md:grid-cols-3">
          <StrategyCard icon={<MapPinned className="h-4 w-4" />} title={t("UK — convert the warm pipeline")} body={t("Onboard the businesses already live, signed, ready or interested from September 2026. Produce reference customers before widening postcode coverage.")} />
          <StrategyCard icon={<Building2 className="h-4 w-4" />} title={t("Germany — prove locally in German")} body={t("Launch one city or vertical at a time with German contracts, support, content, field sales and partners. Reuse UK learning without assuming UK conversion rates.")} />
          <StrategyCard icon={<Globe2 className="h-4 w-4" />} title={t("International — one repeatable beachhead")} body={t("Choose one city, route, category or partner cohort, prove supply, demand and economics, then copy the playbook into the next market.")} />
        </div>
      </Section>

      <Section title={t("Shared marketing operating system")} description={t("Shared people and tools, with separate evidence and messaging for every brand.")} defaultOpen={false}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <StrategyCard icon={<Users className="h-4 w-4" />} title={t("One CRM and consent record")} body={t("Every lead, visit, call, referral, agent and campaign is assigned to a brand, territory, source, owner, next action and permission status.")} />
          <StrategyCard icon={<Search className="h-4 w-4" />} title={t("One content and SEO studio")} body={t("Shared research, design, video and technical SEO; separate audience, keywords, evidence and landing pages for every brand and country.")} />
          <StrategyCard icon={<Target className="h-4 w-4" />} title={t("One sales and field team")} body={t("Central scripts, training and reporting, with vertical specialists visiting, calling and demonstrating only the brands relevant to each prospect.")} />
          <StrategyCard icon={<Megaphone className="h-4 w-4" />} title={t("One weekly growth meeting")} body={t("Review qualified pipeline, activation, paid conversion, retention, CAC, payback and customer evidence by brand. Stop weak activity quickly.")} />
        </div>
      </Section>

      <Section title={t("Suggested channel split")} description={t("Starting allocations; actual budgets move according to retained customer results.")} defaultOpen={false}>
        <div className="grid gap-3 md:grid-cols-3">
          <StrategyCard title={t("B2B-led brands")} body={t("50% direct sales and visits · 20% SEO/content · 15% partners, referrals and agents · 10% paid search/retargeting · 5% tests.")} />
          <StrategyCard title={t("User-led brands")} body={t("35% paid search/social · 25% SEO/content · 15% creators/community · 15% referrals · 10% lifecycle and tests.")} />
          <StrategyCard title={t("Two-sided brands")} body={t("Build enough verified supply first, then acquire free users in the same postcode, category or activity. The defined paying side remains the only side charged.")} />
        </div>
      </Section>

      <Card className="border-amber-500/25 bg-amber-500/[0.06] p-4">
        <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><div><h2 className="text-sm font-semibold">{t("Compliance boundary")}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t("UK calls, email, text and social messaging must follow PECR, UK GDPR and TPS/CTPS screening where applicable. German outreach must follow UWG and GDPR; agents cannot be used to bypass consent or objection rules.")}</p></div></div>
      </Card>

      <Card className="p-3 sm:p-4">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_180px_210px_auto]">
          <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search brand, audience or purpose")} className="pl-9" /></div>
          <Select value={country} onValueChange={(value) => setCountry(value as CountryId | "all")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t("All territories")}</SelectItem>{COUNTRIES.map((item) => <SelectItem key={item.id} value={item.id}>{item.flag} {t(countryLabel(item.id))}</SelectItem>)}</SelectContent></Select>
          <Select value={sector} onValueChange={(value) => setSector(value as SectorId | "all")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t("All sectors")}</SelectItem>{SECTORS.map((item) => <SelectItem key={item.id} value={item.id}>{t(item.label)}</SelectItem>)}</SelectContent></Select>
          <Button variant="outline" onClick={() => { setQuery(""); setCountry("all"); setSector("all"); }}>{t("Clear filters")}</Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{brands.length} {t("plans shown")}</p>
      </Card>

      {brands.length ? (
        <Card className="px-4">
          <Accordion type="multiple">
            {brands.map((brand) => <BrandMarketingRow key={brand.id} brand={brand} plan={brandMarketingPlan(brand, lang)} lang={lang} />)}
          </Accordion>
        </Card>
      ) : <Card className="p-8 text-center text-sm text-muted-foreground">{t("No brands match these filters.")}</Card>}
    </div>
  );
}

function BrandMarketingRow({ brand, plan, lang }: { brand: Brand; plan: MarketingPlan; lang: "en" | "de" }) {
  return (
    <AccordionItem value={brand.id}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex min-w-0 items-center gap-3 pr-3 text-left">
          <BrandLogoBox src={brandLogo(brand.id, lang)} name={brand.name} color={brand.color} size="sm" />
          <div className="min-w-0"><div className="font-semibold">{brand.name}</div><p className="line-clamp-2 text-xs font-normal text-muted-foreground">{brandPlainLanguage(brand, lang)}</p><div className="mt-1 flex flex-wrap gap-1"><Badge variant="secondary" className="text-[10px]">{t(plan.territory)}</Badge><Badge variant="outline" className="text-[10px]">{t(sectorLabel(sectorOf(brand)))}</Badge><Badge variant="outline" className="text-[10px]">{t(brand.payerModel?.side === "consumer" ? "User-funded" : brand.payerModel?.side === "hybrid" ? "Hybrid-funded" : "Business-funded")}</Badge></div></div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-2">
            <InfoBlock title={t("Paying target")} items={[plan.payingTarget]} />
            <InfoBlock title={t("Free/user side")} items={[plan.freeTarget]} />
            <InfoBlock title={t("Positioning")} items={[plan.message, plan.model]} />
            <InfoBlock title={t("Launch offer and warm start")} items={[plan.launchOffer, plan.marketEntry]} />
          </div>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            <InfoBlock title={t("SEO and content")} items={plan.seo} />
            <InfoBlock title={t("Social media")} items={plan.social} />
            <InfoBlock title={t("Direct outreach and cold calling")} items={plan.direct} />
            <InfoBlock title={t("Visits and field sales")} items={plan.field} />
            <InfoBlock title={t("Partners")} items={plan.partners} />
            <InfoBlock title={t("Referrals")} items={plan.referrals} />
            <InfoBlock title={t("Agents and resellers")} items={plan.agents} />
            <InfoBlock title={t("Paid acquisition")} items={plan.paid} />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <InfoBlock title={t("Days 1–30 — prepare")} items={plan.first30} />
            <InfoBlock title={t("Days 31–60 — launch")} items={plan.days31to60} />
            <InfoBlock title={t("Days 61–90 — prove and scale")} items={plan.days61to90} />
          </div>
          <div className="grid gap-3 lg:grid-cols-2"><InfoBlock title={t("Weekly scorecard")} items={plan.kpis} /><InfoBlock title={t("Legal and trust controls")} items={plan.guardrails} /></div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-lg border bg-card p-3"><h3 className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</h3><ul className="mt-2 space-y-1.5">{items.filter(Boolean).map((item, index) => <li key={`${index}-${item}`} className="flex gap-2 text-xs leading-relaxed text-muted-foreground"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{t(item)}</span></li>)}</ul></div>;
}

function StrategyCard({ icon, title, body }: { icon?: React.ReactNode; title: string; body: string }) {
  return <div className="rounded-lg border p-3">{icon ? <div className="mb-2 text-primary">{icon}</div> : null}<h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p></div>;
}
