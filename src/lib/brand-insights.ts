import type { Brand } from "./brands";
import { regionOf } from "./brands";
import { countryLabel, countryOf, sectorLabel, sectorOf } from "./brand-taxonomy";

/**
 * Derived investor-facing insight blocks for every brand.
 * Each brand always exposes positives, negatives, competition and a money model,
 * either from explicit data on the brand or from a data-driven fallback.
 */

const currencyOf = (b: Brand) => {
  const c = countryOf(b);
  if (c === "UK") return "£";
  if (c === "PK" || c === "AE" || c === "INT") return "€";
  return "€";
};

export type CompetitorRow = { name: string; strength: string; counter: string };
export type RiskRow = { risk: string; mitigation: string };

/** Positives — why this brand wins. */
export function brandPositives(b: Brand): string[] {
  if (b.positives?.length) return b.positives;
  const cur = currencyOf(b);
  const sector = sectorLabel(sectorOf(b));
  const country = countryLabel(countryOf(b));
  if (b.revenueUnit === "affiliate-order") {
    return [
      "No stock, warehouse, checkout, delivery or returns operation — the approved retailer completes the sale.",
      `The forecast uses ${cur}${b.defaultArpu.toFixed(2)} average confirmed commission per eligible order, not a charge to the shopper.`,
      "The shared Affivon engine runs product feeds, affiliate links, content, disclosures and analytics across all ten storefront brands.",
      "A focused product category supports more useful comparisons and clearer search intent than a general shopping website.",
      "More than one approved retailer and country can reduce dependence on a single marketplace programme.",
      "Content, link monitoring, finance, legal and marketing are shared across the portfolio.",
    ];
  }
  const out: string[] = [
    `Flat ${cur}${b.defaultArpu}/month subscription — no commission on customer revenue, so the value we create stays with the operator.`,
    `Two-month free trial removes the buying risk: operators only pay once the product is embedded in their daily workflow.`,
    `${sector} demand in ${country} is recurring and compliance- or operations-driven, not discretionary — churn stays low (${(b.defaultChurn * 100).toFixed(1)}%/mo modelled).`,
    "No separate central team for every brand: engineering, AI, support, finance, legal and marketing are shared across the 98-brand portfolio.",
    "Launch cost is a fraction of an independent startup because the platform, billing, auth and infrastructure already exist.",
    "Cross-sell channel from day one — every sister brand's customer base is a warm list for this product.",
  ];
  if (b.defaultAddlRevenue > 0) {
    out.push(
      `Ancillary income of ${cur}${b.defaultAddlRevenue.toLocaleString("en-GB")}/month (setup, add-ons, partner and data revenue) on top of subscriptions.`,
    );
  }
  if (b.group) {
    out.push("Two-market brand: one product build, two separate P&Ls — the second market is nearly pure margin.");
  }
  if (b.family) {
    out.push(`Part of the ${b.family} family — shared booking engine, supplier contracts and demand pool.`);
  }
  return out;
}

/** Negatives — honest downsides, always at least three, each with a mitigation. */
export function brandNegatives(b: Brand): RiskRow[] {
  const base = (b.risks ?? []).filter((r) => r.risk && r.risk !== "Scope not yet defined");
  const cur = currencyOf(b);
  const generic: RiskRow[] = [
    {
      risk: "Incumbents can discount to defend accounts",
      mitigation: `Our cost base is shared, so a flat ${cur}${b.defaultArpu} price is still profitable at a level competitors cannot match for long.`,
    },
    {
      risk: "Customer acquisition cost rises if paid channels get expensive",
      mitigation: "Group-level SEO, partner and cross-sell channels carry most of the pipeline; paid spend is a flexible top-up, not the engine.",
    },
    {
      risk: "Free-trial conversion could land below plan",
      mitigation: "Onboarding is guided and usage-scored; low-signal trials are re-targeted or dropped before they consume support time.",
    },
    {
      risk: "Attention is split across many brands",
      mitigation: "Launches are sequenced roughly one every three weeks with a single shared platform, so no brand needs its own team.",
    },
    {
      risk: "Regulatory or platform rule changes in the target market",
      mitigation: "One shared legal and compliance function monitors changes for the whole portfolio and ships fixes once for every brand.",
    },
  ];
  const seen = new Set(base.map((r) => r.risk));
  const out = [...base];
  for (const g of generic) {
    if (out.length >= Math.max(3, base.length)) break;
    if (!seen.has(g.risk)) out.push(g);
  }
  return out;
}

/** Competition — always at least two named or characterised rivals with our counter. */
export function brandCompetition(b: Brand): CompetitorRow[] {
  const real = (b.competitors ?? []).filter((c) => c.name && c.name !== "To be confirmed");
  const cur = currencyOf(b);
  const filler: CompetitorRow[] = [
    {
      name: "Commission-based marketplaces",
      strength: "Existing demand and brand recognition in the category",
      counter: `Flat ${cur}${b.defaultArpu}/month with 0% commission — operators keep every euro of the transaction value.`,
    },
    {
      name: "Legacy / offline incumbents (spreadsheets, paper, agencies)",
      strength: "Deeply embedded habit and near-zero switching effort",
      counter: "Two-month free trial, guided migration and a mobile-first workflow that is faster than the manual process it replaces.",
    },
    {
      name: "Point-solution startups",
      strength: "Focused feature depth in one narrow workflow",
      counter: "We ship end-to-end workflow plus AI, billing, apps and support on shared infrastructure — more surface for less money.",
    },
  ];
  const out = [...real];
  const seen = new Set(real.map((c) => c.name));
  for (const f of filler) {
    if (out.length >= 3) break;
    if (!seen.has(f.name)) out.push(f);
  }
  return out;
}

/** How we make money — revenue model lines for this specific brand. */
export function brandMoneyModel(b: Brand): { label: string; detail: string }[] {
  if (b.monetisation?.length) {
    return b.monetisation.map((line) => ({ label: "Revenue line", detail: line }));
  }
  const cur = currencyOf(b);
  if (b.revenueUnit === "affiliate-order") {
    return [
      {
        label: "Retailer-paid affiliate commission",
        detail: `The shopper pays nothing to the storefront. When an approved retailer confirms an eligible referred order, the retailer pays the category- and country-specific commission. The model currently uses ${cur}${b.defaultArpu.toFixed(2)} average confirmed revenue per order.`,
      },
      {
        label: "Order growth",
        detail: `${b.defaultInitialUsers.toLocaleString("en-GB")} confirmed orders in the starting revenue month, modelled to grow by ${(b.defaultUserGrowth * 100).toFixed(0)}% per month. This must be tested against real traffic, click and conversion data.`,
      },
      {
        label: "Clearly labelled sponsorship",
        detail: "Optional sponsored guides or placements may add revenue, but commercial payment is disclosed and never changes the editorial verdict.",
      },
      {
        label: "Cost side",
        detail: `Direct brand cost of ${cur}${b.defaultDirectCost.toLocaleString("en-GB")}/month covers content, promotion and its share of the Affivon platform. Retailers handle stock, payment, delivery and returns.`,
      },
    ];
  }
  const lines: { label: string; detail: string }[] = [
    {
      label: "Core subscription",
      detail: `Flat ${cur}${b.defaultArpu} per paying account per month, billed by card or SEPA after a two-month free trial. This is the primary revenue engine and the number the model compounds.`,
    },
    {
      label: "Volume growth",
      detail: `${(b.defaultUserGrowth * 100).toFixed(0)}% net new accounts per month against ${(b.defaultChurn * 100).toFixed(1)}% churn, starting from ${b.defaultInitialUsers.toLocaleString("en-GB")} paying accounts in the first paid month (M${b.defaultLaunchMonth + 2}).`,
    },
  ];
  if (b.defaultAddlRevenue > 0) {
    lines.push({
      label: "Ancillary revenue",
      detail: `${cur}${b.defaultAddlRevenue.toLocaleString("en-GB")} per month from onboarding and setup fees, premium add-on modules, partner referrals and anonymised market insight — grows with the installed base.`,
    });
  }
  lines.push(
    {
      label: "Upsell tiers",
      detail: b.pricing?.length
        ? b.pricing.join(" · ")
        : "Multi-site, multi-user and API tiers priced above the entry plan; larger operators pay 2–5× the base subscription.",
    },
    {
      label: "Cost side",
      detail: `Direct brand cost of ${cur}${b.defaultDirectCost.toLocaleString("en-GB")}/month plus a share of group HQ, tech and marketing. Everything else — infrastructure, AI, billing, support, finance, legal — is shared, which is why contribution margin stays above 60% once the base is paying.`,
    },
    {
      label: "Cross-brand leverage",
      detail: `Customers of the other ${regionOf(b) === "DE" ? "German" : "portfolio"} brands are marketed this product at near-zero acquisition cost, and this brand's customers are marketed the rest.`,
    },
  );
  return lines;
}
