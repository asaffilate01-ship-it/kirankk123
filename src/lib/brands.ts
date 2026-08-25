import { EXTRA_BRANDS } from "./brands-extra";
import { AFFIVON_BRAND, BRAND_CONTENT_OVERRIDES } from "./brand-content-overrides";
import { brandPayerModel, type BrandPayerModel } from "./brand-commercial-model";

export type Brand = {
  id: string;
  name: string;
  tagline: string;
  /** Market section: Germany, United Kingdom, or International. Defaults to Germany. */
  region?: Region;
  description: string;
  market: string;
  audience: string;
  competitors: { name: string; strength: string; counter: string }[];
  defaultLaunchMonth: number; // 1-indexed launch month
  defaultInitialUsers: number;
  defaultUserGrowth: number; // monthly, 0.10 = 10%
  defaultArpu: number; // EUR / user / month
  defaultChurn: number; // monthly
  defaultAddlRevenue: number; // ancillary EUR / mo
  defaultDirectCost: number; // brand-level direct cost EUR / mo (baseline)
  color: string;
  domain: string;
  reason: string;
  proposition: string;
  features: string[];
  /** Optional public pricing / packaging lines. */
  pricing?: string[];
  /** Optional explicit positives / strengths. Falls back to derived list in brand-insights. */
  positives?: string[];
  /** Optional explicit revenue-model lines. Falls back to derived model in brand-insights. */
  monetisation?: string[];

  /** What the forecast's customer volume represents for this brand. */
  revenueUnit?: "subscription" | "affiliate-order";
  /** Keep brand-specific forecast assumptions instead of applying the shared subscription baseline. */
  preserveFinancialDefaults?: boolean;

  /** The single side of the marketplace that funds this brand. */
  payerModel?: BrandPayerModel;


  apps: { name: string; kind: "SaaS" | "Web" | "iOS" | "Android" | "API" | "Admin"; purpose: string }[];
  userTypes: { type: string; useCase: string }[];
  risks: { risk: string; mitigation: string }[];
  currentMarket: {
    howServed: string;
    users: string;
    revenue: string;
  };
  /** Brand group key — two legal entities sharing one brand name (DE + UK), each with its own P&L. */
  group?: string;
  /** Label of this entity inside its group, e.g. "Germany · kinderstars24.de". */
  entityLabel?: string;
  /** Portfolio family, e.g. "TRAVENEXA" for the international travel network. */
  family?: string;
};

export type Region = "DE" | "UK" | "INT";

export const REGIONS: { id: Region; label: string; blurb: string }[] = [
  { id: "DE", label: "Germany", blurb: "German-market brands — DE-hosted, DSGVO-first, German-language support." },
  { id: "UK", label: "United Kingdom", blurb: "UK-market brands — GBP billing, UK compliance, .co.uk domains." },
  { id: "INT", label: "International", blurb: "Cross-border brands sold in multiple markets and currencies." },
];

export function regionOf(b: Brand): Region {
  return b.region ?? "DE";
}

// Current investor portfolio: 98 brand entities. Keep this aligned with BRANDS.
export const TARGET_BRAND_COUNT = 98;

// Shared platform advantage — identical for every brand, injected into detail page.
export const SHARED_ADVANTAGE: string[] = [
  "One cloud infrastructure (Hetzner + Cloudflare, DE-hosted)",
  "One engineering team shipping across the whole portfolio",
  "One AI platform (shared LLM gateway, embeddings, moderation)",
  "One authentication system (SSO across every brand)",
  "One payment system (Stripe + SEPA, unified reconciliation)",
  "One subscription engine (trial, dunning, invoicing)",
  "One CRM covering all leads and customers",
  "One customer-support platform (shared inbox, macros, SLAs)",
  "One finance department (DATEV-connected)",
  "One legal & compliance function (GDPR, AGB, contracts)",
  "One sales organisation with cross-sell playbooks",
  "One marketing team running paid, SEO and content at group scale",
];

// Launch cadence: one brand every ~3 weeks starting M1. So launches at 1..10.
// After a 2-month free trial, paid revenue starts 2 months after launch.
const BASE_BRANDS: Brand[] = [
  {
    id: "haccora",
    name: "HACCORA",
    tagline: "HACCP & food-safety SaaS for German gastronomy",
    description:
      "Digital HACCP logs, temperature monitoring, allergen management and audit-ready reports for restaurants, hotels and canteens across Germany. Replaces paper binders and reduces liability for operators.",
    market: "≈220k gastronomy businesses in Germany; €120m addressable SaaS TAM.",
    audience: "Independent restaurants, hotel F&B, catering, canteens, bakeries.",
    competitors: [
      { name: "FoodNotify", strength: "Enterprise brand, recipe DB", counter: "40% lower price + free onboarding + bundled POS connectors (Vectron, Gastronovi, Lightspeed)" },
      { name: "Flowtify", strength: "Established HACCP flows", counter: "Modern mobile-first UX, WhatsApp alerts, DE-hosted with BSI-grade security" },
    ],
    currentMarket: {
      howServed:
        "Today ~80% of the 220k German gastronomy operators still run HACCP on paper binders and Excel. The digital 20% is split between FoodNotify (enterprise chains), Flowtify (mid-market), and a long tail of Kassen-hardware add-ons (Vectron, Orderbird). Independent Gastronomen — the biggest segment — are effectively unserved by modern software.",
      users: "≈44,000 gastronomy sites digitised today; ≈176,000 still on paper.",
      revenue: "≈€55m/yr digital HACCP spend in Germany; €65m still parked in paper, printers, binders & fines.",
    },
    defaultLaunchMonth: 1,
    defaultInitialUsers: 120,
    defaultUserGrowth: 0.18,
    defaultArpu: 79,
    defaultChurn: 0.02,
    defaultAddlRevenue: 3000,
    defaultDirectCost: 4500,
    color: "#22c55e",
    domain: "haccora.de",
    reason:
      "German food-safety law (LMHV, EU 852/2004) forces every gastronomy operator to keep continuous HACCP records. 80% still do it on paper — illegible, missed entries, and audit failures that trigger 4-figure fines and forced closures. HACCORA removes the paper binder and the liability with it.",
    proposition:
      "A mobile-first HACCP suite: bluetooth temperature probes stream into the app, staff sign off critical control points in seconds, allergen matrices auto-generate from recipes, and the whole audit trail exports to the Lebensmittelüberwachung on demand. Priced 40% below FoodNotify with free onboarding and POS integration bundled.",
    features: [
      "Digital HACCP checklists with photo evidence",
      "Bluetooth / WLAN temperature probe integration",
      "Automatic cold-chain break alerts (WhatsApp, SMS, e-mail)",
      "Allergen & recipe matrix auto-generated from ingredients",
      "Cleaning schedules with staff sign-off",
      "One-click audit report export (PDF, DIN A4)",
      "Multi-location dashboard for chains",
      "Supplier certificate vault",
      "Staff training tracker with certificate reminders",
      "POS integration: Vectron, Gastronovi, Lightspeed, Orderbird",
    ],
    apps: [
      { name: "HACCORA Manager", kind: "Web", purpose: "Owner dashboard, audits, multi-site view" },
      { name: "HACCORA Kitchen", kind: "iOS", purpose: "Staff check-list app for iPad in the kitchen" },
      { name: "HACCORA Kitchen Android", kind: "Android", purpose: "Same, on Android tablets" },
      { name: "HACCORA Probes", kind: "API", purpose: "Ingestion API for temperature sensors" },
      { name: "HACCORA Admin", kind: "Admin", purpose: "Internal ops console" },
    ],
    userTypes: [
      { type: "Restaurant owner", useCase: "Sees compliance status across all sites at a glance." },
      { type: "Kitchen staff", useCase: "Ticks off temperature and cleaning checks on a tablet." },
      { type: "Head chef", useCase: "Maintains recipes and allergen matrix." },
      { type: "External auditor", useCase: "Read-only audit link, no account required." },
    ],
    risks: [
      { risk: "Incumbents cut prices to defend share", mitigation: "Land-and-expand via POS partnerships gives distribution incumbents can't match; bundled hardware discount locks in 12-month contracts." },
      { risk: "Staff resist replacing paper", mitigation: "White-glove onboarding, in-language training videos (DE/TR/PL), free tablet on annual plans." },
      { risk: "Regulatory change invalidates workflows", mitigation: "In-house Lebensmittelrecht advisor updates templates within 30 days of any BMEL change." },
    ],
  },
  {
    id: "kinderstars",
    name: "KINDERSTARS",
    tagline: "Vetted childcare & family services marketplace",
    description:
      "Marketplace connecting German families with vetted nannies, babysitters, tutors and after-school care. Background-checked carers, in-app scheduling, invoicing and payments.",
    market: "8.2m children under 14 in Germany; €4.5bn childcare spend.",
    audience: "Dual-income families, employers offering childcare benefits.",
    competitors: [
      { name: "Betreut.de", strength: "Brand recognition & SEO", counter: "Long-tail PLZ landing pages per carer, aggressive employer B2B channel (Corporate Benefits partners)" },
    ],
    currentMarket: {
      howServed:
        "Formal childcare is dominated by Kitas (public + Träger like Diakonie, AWO, Caritas), with a 430k-place shortfall. Private on-demand care runs through Betreut.de, WhatsApp groups, Aupair agencies and informal Mundpropaganda. Employer-provided childcare is a fast-growing corporate-benefits segment (voiio, Elternservice AWO) but still a niche of large corporates.",
      users: "≈1.8m families use paid non-Kita care; only ≈250k transact through a digital marketplace.",
      revenue: "≈€4.5bn total childcare spend; ≈€180m flows through digital marketplaces + employer benefits today.",
    },
    defaultLaunchMonth: 1,
    defaultInitialUsers: 200,
    defaultUserGrowth: 0.2,
    defaultArpu: 29,
    defaultChurn: 0.03,
    defaultAddlRevenue: 2500,
    defaultDirectCost: 5000,
    color: "#f59e0b",
    domain: "kinderstars24.de",
    reason:
      "Germany has a chronic childcare shortage: 430k Kita places missing (BMFSFJ 2024) and >60% of parents rely on informal networks. Existing marketplaces are unvetted or ad-based, leaving safety to the parent. KINDERSTARS makes vetted, bookable care as easy as ordering a taxi.",
    proposition:
      "Every carer is Führungszeugnis-checked, ID-verified and reference-validated before going live. Parents book by the hour or as a recurring slot, pay in-app (SEPA + Kreditkarte), and receive a tax-deductible invoice automatically. Employers subscribe as a benefit for staff.",
    features: [
      "Führungszeugnis + ID verification for every carer",
      "Instant hourly booking or recurring schedule",
      "In-app chat & video introduction",
      "SEPA / card payment with auto-invoicing (§35a EStG deductible)",
      "Employer benefits portal (subsidised hours)",
      "Emergency-cover pool (24h response)",
      "Ratings & incident reporting",
      "Tutor scheduling with school-subject filtering",
    ],
    apps: [
      { name: "KINDERSTARS Family", kind: "iOS", purpose: "Booking, chat, payments for parents" },
      { name: "KINDERSTARS Family Android", kind: "Android", purpose: "Same, on Android" },
      { name: "KINDERSTARS Carer", kind: "iOS", purpose: "Availability, jobs, earnings for carers" },
      { name: "KINDERSTARS Employer", kind: "Web", purpose: "HR portal for benefits & billing" },
      { name: "KINDERSTARS Trust", kind: "Admin", purpose: "Vetting & incident-response console" },
    ],
    userTypes: [
      { type: "Parent", useCase: "Books a vetted babysitter for Friday 18-23h in three taps." },
      { type: "Nanny / carer", useCase: "Manages availability, gets paid weekly." },
      { type: "Tutor", useCase: "Runs recurring after-school lessons with reminders." },
      { type: "HR manager", useCase: "Buys care hours as a company benefit." },
    ],
    risks: [
      { risk: "Safety incident damages trust", mitigation: "€10m liability insurance per booking, 24h trust-and-safety team, incident escrow suspending payouts pending review." },
      { risk: "Betreut.de retaliates on price", mitigation: "Employer B2B channel is a different buyer — insulated from consumer price wars; carers get lower take-rate so supply prefers us." },
      { risk: "Carer supply shortage in rural PLZ", mitigation: "Referral bounties, Kita partnerships, integration with childcare training providers." },
    ],
  },
  {
    id: "eventplanrger",
    name: "EVENTPLANR",
    tagline: "Plan it once. Everything in one place.",
    description:
      "EVENTPLANR is the commission-free, full-service event platform for Germany: a public marketplace of verified venues and vendors, a complete planning workspace (tasks, budget, timeline, seating, documents), guest management with digital RSVP microsites, escrow-protected vendor payments, and a built-in CRM with calendar, quotes and invoices for vendors. Planner, vendor, guest and agency each get their own portal plus iOS and Android apps for on-the-day coordination. Live now as a test site at eventplanrde.itechlounge.co.uk; the real domain eventplanr.de follows.",
    market: "€8bn German event industry; 400k weddings + 1.2m corporate events / yr; ≈€320m/yr spent on event tech and per-lead vendor fees.",
    audience: "Couples, private hosts, corporate HR/EA event owners, event agencies, and vendors: venues, caterers, DJs, photographers, florists, decorators, bus and shuttle firms.",
    competitors: [
      { name: "eventinc", strength: "Largest German venue inventory and strong SEO on location searches", counter: "Zero commission and no per-lead fees — vendors pay a flat monthly subscription and keep 100% of every booking; planners also get the full planning, guest and payment stack, not just a venue enquiry form" },
      { name: "WeddyPlace / hochzeitsportal24", strength: "Wedding-specific vendor directories and consumer reach", counter: "One platform for weddings, corporate and private events with real workflow (budget, timeline, seating, escrow), so hosts stay after the booking and vendors get repeat business, not one-off leads" },
      { name: "Cvent / Bizzabo", strength: "Enterprise corporate event management and integrations", counter: "German-hosted, DSGVO-first, self-serve pricing from €49/mo with no annual enterprise contract or implementation fee — usable by an HR team of one" },
      { name: "Excel + WhatsApp + Doodle", strength: "Free and familiar", counter: "Same zero-cost start via a free plan for hosts, then one shared source of truth with reminders, supplier chat, contracts and payment protection instead of eight tools" },
    ],
    currentMarket: {
      howServed:
        "Planners cobble together 8-12 tools: eventinc / EventLokale for venues, WeddyPlace / hochzeitsportal24 for weddings, Doodle for RSVP, Excel for budget, WhatsApp for vendors. Vendors pay per-lead fees (€150-€300 per enquiry) with no conversion guarantee. Corporate event tech (Cvent, Bizzabo) is enterprise-only.",
      users: "≈400k weddings + 1.2m corporate events/yr; ≈250k of those touch a digital planning tool.",
      revenue: "≈€8bn German event industry; ≈€320m/yr flows to event-tech platforms and per-lead vendor fees.",
    },
    defaultLaunchMonth: 2,
    defaultInitialUsers: 150,
    defaultUserGrowth: 0.17,
    defaultArpu: 49,
    defaultChurn: 0.04,
    defaultAddlRevenue: 4000,
    defaultDirectCost: 4200,
    color: "#a855f7",
    domain: "eventplanrde.itechlounge.co.uk",
    reason:
      "Planning an event in Germany means juggling 8-12 tools: venue portals, spreadsheet budgets, WhatsApp with vendors, PDF RSVPs. Vendors pay per-lead fees (€200+ per enquiry) with no conversion guarantee. EVENTPLANR unifies planners and vendors on one platform, replacing per-lead extortion with a flat subscription.",
    proposition:
      "Zero commission, ever. Hosts plan free and pay only for premium features; vendors pay a flat monthly subscription for marketplace visibility, CRM, calendar, quoting, contracts and payouts, and keep 100% of every booking. How it works: the host describes the event once, EVENTPLANR builds the task list, budget and supplier shortlist, sends enquiries to verified vendors, collects quotes side by side, holds the deposit in escrow until the event day, runs RSVPs and seating from the guest microsite, and hands the whole event over as a timeline every supplier can see on the day.",
    features: [
      "Filterable venue search (capacity, PLZ, price, style)",
      "Vendor marketplace: catering, DJ, florist, photographer",
      "Verified vendors: trade licence, insurance and review checks before listing",
      "Side-by-side quote comparison from multiple vendors on one brief",
      "Budget tracker with actuals vs plan",
      "Auto-generated task list and countdown timeline per event type",
      "Digital RSVP with dietary & song requests",
      "Interactive seating chart",
      "Escrow vendor payments (funds released on event day)",
      "Guest communication (e-mail + WhatsApp templates)",
      "Vendor CRM & availability calendar",
      "Contracts and e-signature with German AGB templates",
      "Quotes, invoices and DATEV-ready exports for vendors",
      "Private photo & document sharing per event",
      "Day-of run sheet shared live with every supplier",
      "Agency mode: multi-event pipeline, white-label and client access",
      "DE-hosted, DSGVO-first data handling with SEPA and card payments",
    ],
    pricing: [
      "Hosts — Free: one event, tasks, budget, guest list and RSVP microsite",
      "Hosts — Plus €19/mo: seating chart, escrow payments, unlimited guests, media sharing",
      "Vendors — Listing €49/mo: marketplace profile, unlimited enquiries and bookings, 0% commission",
      "Vendors — Pro €99/mo: CRM, calendar sync, quotes, contracts, invoicing and payouts",
      "Agencies €249/mo: multi-event pipeline, team seats, white-label portal and client logins",
      "Add-ons: extra locations €15/mo, featured placement €39/mo, SMS/WhatsApp credits at cost",
      "No per-lead fees, no booking commission, monthly terms, 2-month free trial",
    ],
    apps: [
      { name: "EVENTPLANR Studio", kind: "Web", purpose: "Full planner workspace" },
      { name: "EVENTPLANR Guest", kind: "Web", purpose: "RSVP microsite per event" },
      { name: "EVENTPLANR Vendor", kind: "Web", purpose: "Vendor inbox, calendar, payments" },
      { name: "EVENTPLANR Mobile", kind: "iOS", purpose: "On-the-day coordination for planners" },
      { name: "EVENTPLANR Mobile Android", kind: "Android", purpose: "Same, on Android" },
      { name: "EVENTPLANR Marketplace", kind: "Web", purpose: "Public venue and vendor marketplace with city and PLZ landing pages" },
      { name: "EVENTPLANR CRM", kind: "SaaS", purpose: "Vendor pipeline, quotes, contracts, invoices and payouts" },
      { name: "EVENTPLANR Admin", kind: "Admin", purpose: "Vendor verification, disputes, payouts and moderation" },
      { name: "EVENTPLANR API", kind: "API", purpose: "Calendar, accounting and website-widget integrations" },
    ],
    userTypes: [
      { type: "Couple planning a wedding", useCase: "Books venue + 6 vendors in one place." },
      { type: "Corporate HR / EA", useCase: "Runs the annual Sommerfest end-to-end." },
      { type: "Event agency", useCase: "White-labels EVENTPLANR for client events." },
      { type: "Vendor (DJ, caterer, florist)", useCase: "Fills the diary without paying per-lead fees." },
    ],
    risks: [
      { risk: "Vendors won't quit eventinc", mitigation: "6-month free trial for the first 500 vendors; migrate reviews with a one-click importer." },
      { risk: "Seasonality (Q1 low)", mitigation: "Corporate events fill Q1; annual plans smooth cash." },
      { risk: "Disputes over payments", mitigation: "Escrow release on event day + dispute mediation SLA of 72h." },
    ],
  },
  {
    id: "rettio",
    name: "RETTIO",
    tagline: "Surplus-food subscription for restaurants & bakeries",
    description:
      "Merchants publish surprise-bag inventory of surplus food; consumers subscribe for daily rescues. Flat monthly fee for merchants — no per-transaction commission.",
    market: "18m tons of food wasted in Germany annually; €5bn addressable.",
    audience: "Bakeries, cafés, supermarkets, hotels; eco-conscious urban consumers.",
    competitors: [
      { name: "Too Good To Go", strength: "Consumer brand & network", counter: "Flat €39/mo sub vs 25% + €1.09 per box commission — merchants keep 100% of revenue" },
    ],
    currentMarket: {
      howServed:
        "Too Good To Go is the dominant surplus-food marketplace in Germany with ~30k active merchants and ~10m registered consumers, taking a 25% + €1.09 commission per bag. Sirplus and ResQ Club serve smaller niches. The vast majority of bakeries and supermarkets still dump surplus stock or send it to Tafel food banks.",
      users: "≈30k merchants and ~10m consumer accounts on surplus-food platforms; ≈400k food-serving businesses still bin surplus.",
      revenue: "≈€180m GMV/yr on surplus-food apps in DE; commissions to platforms ≈€45m/yr.",
    },
    defaultLaunchMonth: 2,
    defaultInitialUsers: 180,
    defaultUserGrowth: 0.16,
    defaultArpu: 39,
    defaultChurn: 0.05,
    defaultAddlRevenue: 2000,
    defaultDirectCost: 3800,
    color: "#10b981",
    domain: "rettio.de",
    reason:
      "German bakeries throw away 15-20% of daily output; supermarkets bin near-expiry stock rather than mark it down. Too Good To Go takes 25% + €1.09 per box, leaving merchants marginal or negative. RETTIO flips the model to a flat subscription so merchants keep every euro.",
    proposition:
      "Merchants pay €39/mo unlimited: publish surprise bags, get paid direct, keep the customer relationship. Consumers pay a €4.99/mo membership for unlimited rescues at member prices. Both sides win vs a commission platform.",
    features: [
      "Merchant inventory publisher (drag-and-drop bags)",
      "Consumer geo-feed with pickup windows",
      "Consumer membership (unlimited rescues)",
      "In-app payment direct to merchant IBAN",
      "CO2 & waste-saved dashboard",
      "Pickup QR verification",
      "Auto-repeat inventory templates",
      "B2B waste-report export for ESG reporting",
    ],
    apps: [
      { name: "RETTIO Merchant", kind: "iOS", purpose: "Publish bags, manage pickups" },
      { name: "RETTIO Merchant Android", kind: "Android", purpose: "Same, on Android" },
      { name: "RETTIO Consumer", kind: "iOS", purpose: "Discover & pick up rescues" },
      { name: "RETTIO Consumer Android", kind: "Android", purpose: "Same, on Android" },
      { name: "RETTIO ESG", kind: "Web", purpose: "Corporate waste-reporting portal" },
    ],
    userTypes: [
      { type: "Bakery / café owner", useCase: "Publishes 5 surprise bags at 17:00, sells out by 19:00." },
      { type: "Supermarket branch manager", useCase: "Clears near-expiry stock without markdown paperwork." },
      { type: "Consumer member", useCase: "Grabs a €12 dinner bag for €3.99 on the way home." },
      { type: "ESG officer", useCase: "Pulls monthly waste-saved report for CSRD reporting." },
    ],
    risks: [
      { risk: "Too Good To Go undercuts subscription", mitigation: "Multi-year merchant lock-in with progressive discounts; consumer membership creates two-sided moat." },
      { risk: "Low consumer awareness at launch", mitigation: "Piggyback on KIEZIO and RETTIO cross-promo in KINDERSTARS family app." },
      { risk: "Food-safety incident", mitigation: "Bag time-stamped, temperature-declared; €1m product liability insurance." },
    ],
  },
  {
    id: "kiezio",
    name: "KIEZIO",
    tagline: "Dein Kiez. Alles drin.",
    description:
      "kiezio is the verified, multilingual everyday-life platform for Germany: find places that actually fit your life — diet (halal, kosher, vegan, gluten-free), faith and prayer rooms, spoken languages, accessibility, women's hours and privacy, plus arrival services for newcomers and a travel mode for visitors. Every attribute carries a three-level verification badge (independently checked on site, business identity confirmed, self-declared) instead of unchecked claims. Businesses run their own verified profile, photos, hours and ads on a flat monthly subscription with zero commission on any booking, visit or lead. Live now as a test site at kiezio.itechlounge.co.uk; the real domain kiezio.com follows.",
    market: "≈3.5m local businesses in Germany across 16 Bundesländer; ≈€2bn local-marketing spend a year.",
    audience:
      "Urban residents and families, Muslim, Jewish, vegan and allergy-aware households, expats and newcomers to Germany, disabled and reduced-mobility users, tourists — and the cafés, restaurants, shops, clinics, mosques, churches, synagogues and service businesses that want to be found by them.",
    competitors: [
      { name: "Google Maps / Business Profiles", strength: "Ubiquity, maps, review volume", counter: "Verified niche attributes Google will never ship (three-level checked halal, prayer room, women's hours, step-free access), German-hosted privacy story, and no ad auction where the highest bidder outranks the right answer — flat €4.99–€19.99/mo instead." },
      { name: "Yelp", strength: "Established review brand", counter: "Never gained traction in DE and has no attribute verification; kiezio ships evidence-backed badges, multilingual listings and an installable app used in-store." },
      { name: "HalalPlaces / Zabihah / niche apps", strength: "Community trust in one vertical", counter: "One platform covering diet, faith, language, accessibility and everyday services together, with an actual business back office, ads and billing rather than a volunteer list." },
      { name: "Gelbe Seiten / Das Örtliche", strength: "Legacy brand and print reach", counter: "Mobile-first PWA and native apps, live opening hours, barcode scanner and directions in one tap; subscriptions cost a fraction of a print package." },
      { name: "Facebook groups & Reddit threads", strength: "Free, honest, community-driven", counter: "Same community input as structured, moderated data: visit-verified reviews, correction suggestions and city guides that stay findable instead of scrolling away." },
      { name: "TripAdvisor", strength: "Tourist reach and rankings", counter: "Travel mode and trip lists for guests sit on the same verified local data residents use, and suppliers pay a flat fee rather than commission on bookings." },
      { name: "Wheelmap / accessibility apps", strength: "Detailed accessibility data", counter: "Accessibility as one verified dimension alongside diet, faith and language, so a single search answers the whole household's needs." },
    ],
    currentMarket: {
      howServed:
        "Local discovery in Germany is effectively Google Maps plus Google Business Profiles (≈3m claimed DE profiles), with Gelbe Seiten and Das Örtliche holding older users. None of them verify the attributes people actually decide on: whether a kitchen is genuinely halal or kosher, whether there is a prayer room, whether staff speak Turkish, Arabic, Russian or English, whether the entrance is step-free, whether there are women's hours. So halal, kosher, vegan, allergy, disability and expat communities fall back on Facebook groups, Reddit threads, WhatsApp recommendations and volunteer-maintained lists, while newcomers to Germany navigate Anmeldung, doctors, authorities, banks and language courses through hearsay. Businesses, meanwhile, either bid in Google's ad auction or stay invisible to the customers most likely to choose them.",
      users: "≈3m local SMB profiles claimed on Google in DE; ≈45m active local-search users; ≈5.5m Muslim residents, ≈1.5m vegans, ≈10m people with a recognised disability and ≈13m residents with a migration background all under-served by generic search.",
      revenue: "≈€2bn local-marketing spend a year in Germany (Google local ads, directory ads, Yelp and Gelbe Seiten combined) — value currently captured by ad auctions rather than paid for as software.",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 220,
    defaultUserGrowth: 0.2,
    defaultArpu: 25,
    defaultChurn: 0.04,
    defaultAddlRevenue: 3500,
    defaultDirectCost: 3500,
    color: "#06b6d4",
    domain: "kiezio.itechlounge.co.uk",
    reason:
      "Generic search answers 'where is a café' but never 'which café is genuinely halal, has a prayer room, speaks my language, has step-free access and a Wickeltisch'. Those are the questions millions of households in Germany ask every week, and today they are answered by unverified claims, volunteer lists and social-media threads. kiezio turns those needs into structured, three-level verified data across all 16 Bundesländer, in multiple languages from day one, hosted in Germany — and gives businesses a fair, flat-priced way to be found by exactly the people who will choose them.",
    proposition:
      "For people: free, multilingual, ad-light discovery of places that fit your life — verified diet, faith, language, accessibility and privacy attributes, radius search up to 500 km, live 'open now' hours, maps and one-tap directions, an in-store barcode scanner for ingredients and halal/vegan/allergen flags, prayer times, an arrival guide for newcomers and a travel mode with trip lists. For businesses: a verified profile with photos, languages, hours and evidence-backed badges, review replies, campaign and visibility analytics, sponsored placements, secure Paddle billing with an invoice portal and automatic discounts for customers of sister iTechLounge brands — from €4.99/mo, monthly cancellable, and never a commission on a booking, visit or lead. The free basic listing stays free forever.",
    pricing: [
      "Consumers: free forever — search, filters, maps, scanner, prayer times, trip lists and the arrival guide, with no pay-to-see-results paywall.",
      "Free basic listing: name, category, address, hours and contact stay free for every business, verified or not.",
      "Starter — €4.99/mo or €49.90/yr: verified listing badge, basic statistics, review replies, 1 location.",
      "Growth — €9.99/mo or €99.90/yr: everything in Starter plus photo gallery and rich media, promo placements on category pages, campaign statistics, up to 3 locations.",
      "Pro — €19.99/mo or €199.90/yr: everything in Growth plus unlimited locations, priority verification, monthly advertising credits and iTechLounge partner discounts.",
      "Advertising: sponsored placements and category takeovers sold as flat-fee packages with reporting — never as an auction that outbids the most relevant result.",
      "Zero commission: no fee on any booking, visit, call, lead or transaction generated through kiezio.",
      "All prices EUR, plus VAT, monthly cancellable, 30-day money-back, billed via Paddle as merchant of record with a self-service invoice portal.",
      "2-month free trial on every paid plan, and automatic subscription and advertising discounts for businesses already on IMMOVIQ, travel, gastro or tax and legal brands in the iTechLounge group.",
    ],
    features: [
      "Three-level attribute verification: independently checked on site, business identity confirmed, self-declared — shown on every card",
      "Verified diet attributes: halal, kosher, vegan, vegetarian, gluten-free and allergen handling",
      "Faith and community: mosques, churches, synagogues and centres with prayer times, congregation languages and on-site services",
      "Accessibility and privacy attributes: step-free access, accessible WC, women's hours, quiet spaces, family and baby-change facilities",
      "Spoken-language filters so users find staff who speak their language",
      "Multi-filter smart search with current location or free location choice and a radius up to 500 km",
      "Category chips and sorting by trust level and proximity",
      "In-store barcode scanner: scan a product for ingredients and vegan, halal and allergen flags",
      "Map view with bottom sheets, live 'open now' hours, contact, photos and one-tap directions",
      "Travel mode and trip lists for visitors, plus partner offers for travel, delivery and booking",
      "'New in Germany' guided onboarding: registration, doctors, authorities, legal, banking and language courses in your language",
      "Community layer: visit-verified reviews, city guides, favourites and correction suggestions for listings",
      "Multilingual from day one (DE, EN and more) across listings, filters and guides",
      "Installable PWA with offline basics and push alerts, plus native iOS and Android builds",
      "Business back office: self-managed profile, photo uploads, attribute evidence upload and verification status",
      "Advertising manager: sponsored placements, category promos and campaign reporting",
      "Subscription and billing portal with secure payment, invoices and plan changes",
      "Analytics for businesses: views, searches matched, calls, directions and campaign performance",
      "Moderation and verification console with audit trail for field checks and disputes",
      "Coverage across all 16 Bundesländer with kiez-scoped feeds in major cities",
    ],
    apps: [
      { name: "kiezio Web", kind: "Web", purpose: "Desktop research: profiles, intent tiles, city guides and full filter search" },
      { name: "kiezio iOS", kind: "iOS", purpose: "Consumer app with location, filters, scanner, prayer times and push alerts" },
      { name: "kiezio Android", kind: "Android", purpose: "Same experience on Android with bottom navigation and offline basics" },
      { name: "kiezio PWA", kind: "Web", purpose: "Installable web app with offline core functions for in-store use" },
      { name: "kiezio for Business", kind: "Web", purpose: "Profile, photos, attribute evidence, ads, analytics and billing" },
      { name: "Verification Console", kind: "Admin", purpose: "Field-check workflow, identity confirmation and badge issuance with audit log" },
      { name: "Moderation Console", kind: "Admin", purpose: "Reviews, correction suggestions, disputes and content quality" },
      { name: "Partner & Ads CRM", kind: "Web", purpose: "Business pipeline, campaigns, group cross-sell and discount management" },
      { name: "Marketplace API", kind: "API", purpose: "Verified place and attribute data shared with sister iTechLounge brands" },
    ],
    userTypes: [
      { type: "Muslim family", useCase: "Filters independently verified halal restaurants with a prayer room and family hours nearby, and checks a supermarket product with the barcode scanner." },
      { type: "Jewish household", useCase: "Finds kosher shops and community centres with congregation languages and service times." },
      { type: "Vegan or allergy-aware shopper", useCase: "Scans products in-store and filters cafés by verified vegan and gluten-free handling." },
      { type: "Expat or newcomer", useCase: "Uses the 'New in Germany' guide for Anmeldung, doctors and banking, and finds English-speaking services in their district." },
      { type: "Reduced-mobility user", useCase: "Filters step-free entrances and accessible WCs with evidence-backed badges before travelling." },
      { type: "Tourist or visitor", useCase: "Switches to travel mode, saves a trip list and finds verified places near the hotel." },
      { type: "Local business owner", useCase: "Claims and verifies the profile, uploads photos and evidence, replies to reviews and books a promo placement." },
      { type: "Chain or franchise", useCase: "Manages unlimited locations on Pro with priority verification and monthly ad credits." },
      { type: "Mosque, church or community centre", useCase: "Publishes prayer or service times, languages and on-site offers to the local community." },
      { type: "Field verifier", useCase: "Completes on-site checks in the console and issues or revokes attribute badges." },
    ],
    risks: [
      { risk: "Google adds niche filters", mitigation: "Google can add checkboxes but not on-site verification, community-owned evidence or a German privacy narrative; our moat is verified data plus trusted community brand, not the filter UI." },
      { risk: "Verification cost and scalability", mitigation: "Tiered model: self-declared is free and instant, identity confirmation is automated against registry data, and paid field checks are prioritised for Pro subscribers and dense city clusters, with shared group field capacity." },
      { risk: "False or outdated attribute claims", mitigation: "Every card shows its verification level, users can submit corrections, visit-verified reviews carry more weight and badges expire and require re-confirmation." },
      { risk: "Cold-start in new cities", mitigation: "Seeded from merchants already on sister group platforms plus community partnerships with mosques, congregations and expat networks, launched city by city rather than nationally at once." },
      { risk: "Sensitive-data and discrimination concerns", mitigation: "Attributes describe businesses, never users; no personal faith or health profiling, German hosting, GDPR-first design and published verification and review policies." },
      { risk: "Low willingness to pay among micro-businesses", mitigation: "Free basic listing keeps coverage, entry paid tier starts at €4.99/mo, a 2-month free trial proves the lead value first and group discounts lower the effective price." },
      { risk: "Review manipulation", mitigation: "Visit-verified reviews, rate limits, moderation console and transparent published review policy." },
    ],
  },
  {
    id: "beratermarkt",
    name: "BERATEMARKT",
    tagline: "Experten finden. Sicher entscheiden.",
    description:
      "Marketplace for regulated advisors — Rechtsanwälte, Steuerberater, Wirtschaftsprüfer and Buchhalter. Cross-referrals across four disciplines, secure client portal.",
    market: "165k regulated advisors in Germany; €40bn combined revenue.",
    audience: "SMBs and consumers seeking regulated professional advice.",
    competitors: [
      { name: "anwalt.de", strength: "SEO for lawyers", counter: "Cross-referrals across 4 professions vs lawyer-only focus; unified client dashboard" },
    ],
    currentMarket: {
      howServed:
        "Each profession is served in its own silo: anwalt.de and advocado for Rechtsanwälte; ageras and steuerberater.com for Steuerberater; WPK directory for Wirtschaftsprüfer; sevDesk / lexoffice for Buchhalter tooling. Cross-profession collaboration happens over e-mail and USB sticks. DATEV Mandantenportal covers document exchange but not discovery.",
      users: "≈165k regulated advisors (≈166k Kammer members combined); ≈40k list themselves on a digital directory today.",
      revenue: "≈€40bn combined advisor revenue in DE; ≈€380m/yr flows through advisor-discovery & software portals.",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 140,
    defaultUserGrowth: 0.15,
    defaultArpu: 89,
    defaultChurn: 0.02,
    defaultAddlRevenue: 4500,
    defaultDirectCost: 4200,
    color: "#6366f1",
    domain: "beratemarkt.de",
    reason:
      "SMBs need lawyer + tax advisor + auditor + bookkeeper working together, but each hides behind a single-profession portal. Clients repeat their story four times and pay four onboarding fees. BERATEMARKT is one client dashboard, one document vault, cross-referrals baked in.",
    proposition:
      "Advisors pay €89/mo to appear, receive referrals from adjacent professions (RA→StB→WP→Buchhalter) and share documents via a secure GoBD-compliant portal. Clients get a single relationship manager across all four disciplines.",
    features: [
      "Verified advisor profiles (Kammer-ID checked)",
      "Cross-profession referral engine",
      "GoBD-compliant document vault",
      "Secure client portal with mandate management",
      "Time-tracking & fixed-fee quoting",
      "DATEV export for accountants",
      "Video-consultation booking",
      "Encrypted messaging with retention rules",
      "Lead marketplace: clients post a mandate, advisors buy or bid on matching leads",
      "Advisor CRM with pipeline, tasks, calendar and quote builder",
      "City and service landing pages for local SEO",
      "Rechtstipps and resources content hub with expert articles",
      "Compare and search filters by profession, sector, city and language",
      "Verified reviews with published review and verification policies",
      "Sales-agent portal with referrals, commissions and KPI tracking",
      "Admin back office: verifications, complaints, sectors, reporting and audit log",
    ],
    apps: [
      { name: "BERATEMARKT Advisor", kind: "Web", purpose: "Advisor workspace & referrals" },
      { name: "BERATEMARKT Client", kind: "Web", purpose: "Client dashboard & documents" },
      { name: "BERATEMARKT Client Mobile", kind: "iOS", purpose: "On-the-go document upload & signing" },
      { name: "BERATEMARKT Vault", kind: "API", purpose: "GoBD document API for DATEV / lexoffice" },
    ],
    userTypes: [
      { type: "Steuerberater", useCase: "Receives referrals from partner lawyers; bills via portal." },
      { type: "Rechtsanwalt", useCase: "Shares client docs securely, tracks mandate progress." },
      { type: "SMB owner", useCase: "One dashboard for tax return, contract review, audit." },
      { type: "Consumer", useCase: "Books an initial 30-min consult with a vetted advisor." },
      { type: "Sales agent / partner", useCase: "Onboards advisors in their region and earns recurring commission." },
      { type: "Platform admin", useCase: "Verifies credentials, handles complaints and monitors marketplace quality." },
    ],
    risks: [
      { risk: "Kammer restrictions on advertising", mitigation: "Positioned as neutral directory + document platform, not lead-gen; legal opinion from Kammer-approved counsel." },
      { risk: "Slow advisor adoption", mitigation: "Free tier for first year for Kammer members; DATEV integration is the hook." },
      { risk: "Data breach on sensitive client docs", mitigation: "AES-256 at rest, DE-only hosting, ISO 27001, penetration-tested quarterly." },
    ],
  },
  {
    id: "stellenxpert",
    name: "STELLENXPERT",
    tagline: "AI-powered recruitment aggregator",
    description:
      "Aggregates job supply from StepStone, Indeed, Xing and direct employer APIs. AI screening, multilingual candidate matching for international talent into Germany.",
    market: "€8bn German recruitment market; 2m open roles at any time.",
    audience: "SMB HR, staffing agencies, international jobseekers.",
    competitors: [
      { name: "StepStone", strength: "Employer relationships", counter: "Aggregator layer sitting above them + AI screening for non-German-speaking talent" },
    ],
    currentMarket: {
      howServed:
        "StepStone (~€400m DE revenue), Indeed and Xing dominate paid job listings. Bundesagentur für Arbeit runs the public board. LinkedIn takes premium white-collar recruiting. International talent flows through Make-it-in-Germany and consulate portals with no unified matching. AI screening is early — mostly HeyJobs and Zalvus at the edges.",
      users: "≈1.8m open roles at any time; ≈32m Erwerbstätige, of whom ≈4m are actively job-hunting each year.",
      revenue: "≈€8bn German recruitment market; ≈€1.6bn is spent on digital job boards and ATS software.",
    },
    defaultLaunchMonth: 4,
    defaultInitialUsers: 130,
    defaultUserGrowth: 0.18,
    defaultArpu: 99,
    defaultChurn: 0.03,
    defaultAddlRevenue: 5000,
    defaultDirectCost: 4800,
    color: "#ec4899",
    domain: "stellenxpert.de",
    reason:
      "Germany has 1.8m open roles and a Fachkräftemangel that costs €86bn/yr (IW Köln). International talent can't navigate 12 job boards in German. Employers can't screen non-German CVs. STELLENXPERT sits above every board and translates in both directions.",
    proposition:
      "One aggregated feed of every open role in Germany, with AI translation of listings, AI screening of candidate CVs, and visa/relocation guidance built in. Employers subscribe for €99/mo per seat and get a shortlist without touching 5 separate portals.",
    features: [
      "Aggregated jobs from StepStone, Indeed, Xing, LinkedIn, direct employer APIs",
      "AI translation of listings (EN, TR, RU, PL, AR, UA)",
      "AI CV screening & role-match scoring",
      "Applicant tracking (ATS) with pipeline stages",
      "Visa / Blue Card eligibility checker",
      "Salary benchmark by role & PLZ",
      "Employer branding microsite",
      "Auto-generated interview questions per role",
    ],
    apps: [
      { name: "STELLENXPERT Talent", kind: "Web", purpose: "Candidate job search & applications" },
      { name: "STELLENXPERT Talent Mobile", kind: "iOS", purpose: "Job alerts & one-tap apply" },
      { name: "STELLENXPERT Employer", kind: "Web", purpose: "ATS, screening, shortlist" },
      { name: "STELLENXPERT Match", kind: "API", purpose: "AI screening API for staffing agencies" },
    ],
    userTypes: [
      { type: "International jobseeker", useCase: "Sees roles translated to English with visa eligibility upfront." },
      { type: "SMB HR manager", useCase: "Gets a ranked shortlist without reading 200 CVs." },
      { type: "Staffing agency", useCase: "Uses the AI screening API to accelerate placements." },
      { type: "Hiring manager", useCase: "AI generates interview questions tailored to the role." },
    ],
    risks: [
      { risk: "Boards block scraping", mitigation: "Direct API partnerships + employer-side listings uploaded natively; XING and Indeed have public APIs." },
      { risk: "AI screening bias / AGG risk", mitigation: "AGG-audited model, bias monitoring, explainable-score export for every rejection." },
      { risk: "Employer scepticism of AI shortlist", mitigation: "Human-in-the-loop mode; screening confidence scores + rationale." },
    ],
  },
  {
    id: "viazeno",
    name: "VIAZENO",
    tagline: "Private chauffeur & transfer subscription platform",
    description:
      "Marketplace for premium private-hire drivers — airport transfers, corporate travel, weddings. Zero-commission subscription: operators net 30-40% more than on Blacklane.",
    market: "€3.5bn German premium ground-transport market.",
    audience: "Independent chauffeur operators; corporate travel managers, event agencies.",
    competitors: [
      { name: "Blacklane", strength: "Enterprise clients", counter: "€59/mo flat sub instead of ~25% commission — operators net 30-40% more per ride" },
    ],
    currentMarket: {
      howServed:
        "Blacklane leads premium chauffeur booking (~15k drivers globally, DE core market) on a ~20-25% commission. Sixt Ride, FreeNow Ride and Uber Black compete on the app side. Corporate travel routes bookings via SAP Concur, TravelPerks or agency desks. Independent operators typically run their own Excel + phone dispatch on top of these platforms.",
      users: "≈12,000 licensed private-hire operators in DE; ≈900k corporate travellers book chauffeur transfers annually.",
      revenue: "≈€3.5bn premium ground-transport market; ≈€700m flows through digital chauffeur platforms.",
    },
    defaultLaunchMonth: 4,
    defaultInitialUsers: 100,
    defaultUserGrowth: 0.16,
    defaultArpu: 59,
    defaultChurn: 0.03,
    defaultAddlRevenue: 3200,
    defaultDirectCost: 3800,
    color: "#0ea5e9",
    domain: "viazeno.de",
    reason:
      "Blacklane and similar take 20-30% commission per ride. A €100 airport transfer nets the operator €70-75 after fees. Operators want distribution but not extortion. VIAZENO is the flat-fee alternative — €59/mo unlimited jobs.",
    proposition:
      "Operators subscribe for €59/mo, keep 100% of every fare, and get a bookable profile with corporate-travel-manager visibility. Corporate buyers use a single dashboard to book, approve and expense chauffeur travel across Germany.",
    features: [
      "Operator profile with fleet, insurance, licences",
      "Real-time job board with instant accept",
      "Corporate travel dashboard (approval workflows)",
      "In-app payment with SEPA & card, direct to operator",
      "Flight tracking for airport transfers",
      "Ratings & repeat-rider preferences",
      "Digital daily-driver logs (§21a StVG)",
      "Multi-language passenger app (DE, EN, AR, TR)",
    ],
    apps: [
      { name: "VIAZENO Driver", kind: "iOS", purpose: "Job board & navigation for operators" },
      { name: "VIAZENO Driver Android", kind: "Android", purpose: "Same, on Android" },
      { name: "VIAZENO Rider", kind: "iOS", purpose: "Passenger booking app" },
      { name: "VIAZENO Corporate", kind: "Web", purpose: "Corporate travel manager console" },
    ],
    userTypes: [
      { type: "Independent chauffeur", useCase: "Fills gaps in the diary; keeps 100% of the fare." },
      { type: "Fleet operator", useCase: "Distributes 5-20 vehicles without new dispatch software." },
      { type: "Corporate travel manager", useCase: "Books chauffeurs across cities from one portal." },
      { type: "Event agency", useCase: "Reserves fleets for weddings & corporate events." },
    ],
    risks: [
      { risk: "Blacklane matches on price", mitigation: "Commission model can't structurally match a flat sub without cannibalising their P&L." },
      { risk: "Regulatory (PBefG) changes", mitigation: "In-house PBefG compliance monitor; all operators pre-verified on Genehmigung." },
      { risk: "Cold-start on rider side", mitigation: "Bootstrap riders via EVENTPLANR wedding transfers and STELLENXPERT relocation packages." },
    ],
  },
  {
    id: "immoviq",
    name: "IMMOVIQ",
    tagline: "Immobilien. Einfach geregelt.",
    description:
      "Where ImmoScout stops, IMMOVIQ starts: tenant screening (SCHUFA), digital lease signing, repair ticketing, service-charge accounting and DATEV export for landlords.",
    market: "5.8m rental units under private ownership in Germany; €1.5bn PropTech TAM.",
    audience: "Private landlords (1-50 units), small property managers.",
    competitors: [
      { name: "ImmoScout24", strength: "Listing marketplace", counter: "Focus on post-listing workflow (screening, repairs, DATEV) where ImmoScout is weak" },
    ],
    currentMarket: {
      howServed:
        "ImmoScout24 and Immowelt own the listing marketplace. Post-listing is fragmented: Objego, Vermietet.de and Zinsland for landlord admin; Casavi for larger Verwalter; SCHUFA direct for screening; DocuSign / DATEV for signing and accounting; WhatsApp for repairs. Private landlords with <10 units are the least served — most still run Excel + paper leases.",
      users: "≈5.8m rental units held by private landlords across ≈3.9m Kleinvermieter; ≈600k use any PropTech tool today.",
      revenue: "≈€1.5bn German PropTech TAM; ≈€250m/yr flows to landlord SaaS and workflow tools (excl. listings).",
    },
    defaultLaunchMonth: 5,
    defaultInitialUsers: 110,
    defaultUserGrowth: 0.14,
    defaultArpu: 69,
    defaultChurn: 0.02,
    defaultAddlRevenue: 3800,
    defaultDirectCost: 4000,
    color: "#f43f5e",
    domain: "immoviq.de",
    reason:
      "ImmoScout ends when a tenant clicks 'apply'. From there, landlords wrestle with SCHUFA requests, PDF leases, Excel Nebenkostenabrechnung, WhatsApp repair chaos, and manual DATEV entries. IMMOVIQ owns everything after the listing.",
    proposition:
      "One workspace for private landlords: SCHUFA-integrated screening, qualified-e-signature leases, repair ticketing with vetted Handwerker, annual service-charge accounting (Nebenkostenabrechnung), and DATEV export for the Steuerberater — €69/mo/unit tiered.",
    features: [
      "SCHUFA & Bonitätsauskunft in-app",
      "Qualified electronic signature (eIDAS) for leases",
      "Repair ticketing with vetted Handwerker network",
      "Annual Nebenkostenabrechnung generator (BetrKV compliant)",
      "Rent-payment tracking with SEPA-Lastschrift",
      "DATEV & lexoffice export",
      "Tenant portal (documents, receipts, repair requests)",
      "Mieterhöhung workflow with Mietspiegel-check",
      "Handwerker & Makler marketplace with verified profiles",
      "Instant property valuation (Bewertung) and Mietspiegel data",
      "Financing enquiries and Bonitäts-checks in one flow",
      "Neighbourhood (Stadtteile) insights and landlord Ratgeber content",
    ],
    apps: [
      { name: "IMMOVIQ Landlord", kind: "Web", purpose: "Full landlord workspace" },
      { name: "IMMOVIQ Tenant", kind: "iOS", purpose: "Tenant portal & repair requests" },
      { name: "IMMOVIQ Tenant Android", kind: "Android", purpose: "Same, on Android" },
      { name: "IMMOVIQ Handwerker", kind: "iOS", purpose: "Repair ticket queue for trades" },
    ],
    userTypes: [
      { type: "Private landlord (1-5 units)", useCase: "Digitalises the whole tenancy without hiring a Verwalter." },
      { type: "Small property manager (5-50 units)", useCase: "Replaces 4 tools with 1." },
      { type: "Tenant", useCase: "Requests repairs, pays rent, downloads Nebenkostenabrechnung." },
      { type: "Handwerker", useCase: "Receives ticketed jobs, invoices in-app." },
    ],
    risks: [
      { risk: "ImmoScout builds workflow tools", mitigation: "They're incentivised to defend the listing marketplace; workflow depth requires vertical expertise they don't staff." },
      { risk: "eIDAS / SCHUFA integration risk", mitigation: "Signed reseller agreement with a qualified trust-service provider (D-Trust / Bundesdruckerei)." },
      { risk: "Landlord churn after tenant placed", mitigation: "Sticky ongoing services (repairs, Nebenkosten, rent tracking) create year-round value, not just a one-off lease event." },
    ],
  },
  {
    id: "beinstandplus",
    name: "BEINSTANDPLUS",
    tagline: "Guided integration services for migrants",
    description:
      "Booked-slot integration services: Anmeldung, visa renewals, tax ID, health insurance, school enrolment. Sold as B2B benefits to employers relocating international staff.",
    market: "1.4m new residents / yr in Germany; €600m relocation-services TAM.",
    audience: "Employers relocating staff, migrants, international students.",
    competitors: [
      { name: "Local charities & Behörden", strength: "Trust & free", counter: "Speed & certainty — booked appointment slot within 48h, sold via employer B2B channel" },
    ],
    currentMarket: {
      howServed:
        "New residents rely on the Bürgeramt (6-14 week waits in major cities), Ausländerbehörde, and free help from charities (Caritas, Diakonie, DRK, AWO). Corporate relocation is served by expensive B2B agencies (Crown Relocations, Santa Fe, KPMG mobility) charging €3-8k per employee. There is no scalable mid-market platform between free-and-slow and €5k-and-manual.",
      users: "≈1.4m new residents/yr in DE (migrants + international students + relocated staff); ≈120k pass through paid relocation services.",
      revenue: "≈€600m relocation-services TAM in DE; ≈€180m of that runs through corporate mobility agencies today.",
    },
    defaultLaunchMonth: 6,
    defaultInitialUsers: 90,
    defaultUserGrowth: 0.15,
    defaultArpu: 79,
    defaultChurn: 0.03,
    defaultAddlRevenue: 4200,
    defaultDirectCost: 3600,
    color: "#eab308",
    domain: "beinstandplus.de",
    reason:
      "Arriving in Germany means 15+ appointments across Bürgeramt, Ausländerbehörde, Krankenkasse, Finanzamt, Schule — with waiting times of 6-14 weeks. Employers lose 3 months of productive time per relocation. Charities are overloaded and free-tier only. BEINSTANDPLUS sells speed and certainty.",
    proposition:
      "A guided-services platform: one caseworker per migrant, appointment slots pre-booked within 48h through partner Behörden networks and private-sector alternatives (private Krankenkasse, private schools). Sold at €79/mo per relocating employee to HR departments.",
    features: [
      "Digital case file with all documents (visa, passport, contracts)",
      "48h guaranteed appointment booking (Anmeldung, Ausländerbehörde)",
      "Multilingual caseworker (EN, AR, TR, RU, UA, ES)",
      "Health insurance selection & enrolment",
      "Tax ID & Steuerklasse guidance",
      "School / Kita placement service",
      "Employer HR dashboard tracking relocation progress",
      "Translation & apostille service",
    ],
    apps: [
      { name: "BEISTANDPLUS Client", kind: "iOS", purpose: "Migrant case-tracking app" },
      { name: "BEISTANDPLUS Client Android", kind: "Android", purpose: "Same, on Android" },
      { name: "BEISTANDPLUS Employer", kind: "Web", purpose: "HR dashboard for relocations" },
      { name: "BEISTANDPLUS Caseworker", kind: "Web", purpose: "Internal caseworker console" },
    ],
    userTypes: [
      { type: "Relocating employee", useCase: "Anmeldung done in week 1 instead of week 8." },
      { type: "International student", useCase: "Full onboarding package before semester start." },
      { type: "HR / mobility manager", useCase: "Tracks each relocation's status without chasing e-mails." },
      { type: "Family joining relocated staff", useCase: "School placement + spouse work-permit guidance." },
    ],
    risks: [
      { risk: "Appointment scarcity outside our control", mitigation: "Framework agreements with 30+ Bürgerämter; private-sector fallbacks for Krankenkasse and schools." },
      { risk: "Regulatory push-back on 'paid appointments'", mitigation: "We book publicly-available slots; premium value is the caseworker, translation, and coordination — never paid queue-jumping." },
      { risk: "Charity substitute pressure", mitigation: "Sold B2B to HR budgets, not competing for consumer wallet share; charities become referral partners." },
    ],
  },
  {
    id: "traindirekt",
    name: "TRAINDIREKT",
    tagline: "Funded German-language & tech courses for adults in Germany",
    description:
      "Online academy delivering AZAV- and BAMF-zertifizierte German-language and technology courses. Students can be funded via Bildungsgutschein (Agentur für Arbeit / Jobcenter), BAMF Integrationskurse and Berufssprachkurse, employer-funded (Qualifizierungschancengesetz / Aufstiegs-BAföG), or self-funded.",
    market: "≈1.8m adults in DE eligible for funded further-education/language courses per year; €4.2bn combined AZAV + BAMF + employer L&D spend.",
    audience: "Job-seekers with Bildungsgutschein, migrants on Integrationskurse, employees on Qualifizierungschancengesetz, self-paying career switchers, employers upskilling staff.",
    competitors: [
      { name: "DeutschAkademie / Speexx / Lingoda", strength: "Established language-course brands", counter: "Full AZAV + BAMF Trägerzulassung so students pay €0 out-of-pocket; combined German + tech curriculum in one Träger" },
      { name: "IU Akademie / WBS Training / alfatraining", strength: "Large AZAV-certified tech Weiterbildungs-catalogue", counter: "Modern SaaS learning platform, live cohort + on-demand hybrid, price 20% below WBS on employer contracts, and language + tech in one funding-code bundle" },
    ],
    currentMarket: {
      howServed:
        "Funded further-education in Germany is fragmented across three funding rails. AZAV-certified Träger (WBS Training, alfatraining, IU Akademie, Comcave) redeem Bildungsgutscheine from the Agentur für Arbeit / Jobcenter for tech and business courses. BAMF-licensed providers (Volkshochschulen, DeutschAkademie, inlingua) run Integrationskurse and Berufssprachkurse (B1-C1). Employers fund staff development directly under the Qualifizierungschancengesetz, and a self-pay long tail buys from Lingoda, Babbel Live and Udemy Business. Very few providers hold BOTH AZAV and BAMF Trägerzulassung — students who want language + tech usually enrol at two different schools.",
      users: "≈420k Bildungsgutscheine issued/yr, ≈340k BAMF Integrationskurs-Teilnehmer/yr, ≈1.1m employees on Qualifizierungschancengesetz measures.",
      revenue: "≈€2.6bn AZAV Weiterbildung + €800m BAMF language courses + €800m employer-funded upskilling = ≈€4.2bn addressable in DE.",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 160,
    defaultUserGrowth: 0.17,
    defaultArpu: 149,
    defaultChurn: 0.03,
    defaultAddlRevenue: 6000,
    defaultDirectCost: 5200,
    color: "#0ea5e9",
    domain: "traindirekt.de",
    reason:
      "German adults who want to retrain — whether unemployed, newly arrived, or upskilling in-role — face a maze of Träger, funding codes and paper applications. Almost no provider offers language AND technology courses under one Trägerzulassung, so a migrant learning German who also wants an IT re-training has to enrol twice. TRAINDIREKT collapses German-language and tech Weiterbildung into a single AZAV + BAMF-zertifizierte platform, funded by whichever rail the student qualifies for.",
    proposition:
      "One academy, four funding paths: (1) Bildungsgutschein via AZAV — €0 for the student, invoiced to the Agentur für Arbeit / Jobcenter; (2) BAMF Integrations- and Berufssprachkurse — €0 for eligible migrants, invoiced to BAMF; (3) Employer-funded under Qualifizierungschancengesetz — invoiced to the employer with up to 100% Lohnkostenzuschuss; (4) Self-funded at €149/mo with SEPA-Ratenzahlung. Courses combine live cohort sessions, on-demand video, AI tutors and IHK / telc / Goethe exam prep.",
    features: [
      "AZAV-zertifiziert (Bildungsgutschein-fähig) — student pays €0",
      "BAMF-Trägerzulassung for Integrations- & Berufssprachkurse (A1-C1)",
      "Employer portal for Qualifizierungschancengesetz-funded upskilling",
      "Self-pay tier with SEPA-Ratenzahlung (€0 down)",
      "German-language tracks: A1, A2, B1, B2, C1, Berufssprache, telc & Goethe prep",
      "Tech tracks: Web dev, Data & AI, Cloud (AWS/Azure), Cybersecurity, SAP",
      "Live cohort classes + on-demand video + AI tutor per learner",
      "Automatic Anwesenheitsnachweis for Agentur für Arbeit / Jobcenter",
      "IHK, telc, Goethe and vendor-cert exam prep & booking",
      "Employer dashboard: seat management, progress, invoicing, ZUG-Meldung",
    ],
    apps: [
      { name: "TRAINDIREKT Academy", kind: "Web", purpose: "Learner LMS: live classes, on-demand video, assignments, exams" },
      { name: "TRAINDIREKT Mobile", kind: "iOS", purpose: "On-the-go lessons, flashcards, attendance check-in" },
      { name: "TRAINDIREKT Mobile Android", kind: "Android", purpose: "Same, on Android" },
      { name: "TRAINDIREKT Employer", kind: "Web", purpose: "HR portal: seat allocation, funding applications, invoicing" },
      { name: "TRAINDIREKT Träger", kind: "Admin", purpose: "AZAV/BAMF compliance console: Anwesenheit, Maßnahmen, Abrechnung" },
    ],
    userTypes: [
      { type: "Bildungsgutschein-Inhaber", useCase: "Redeems Gutschein for a 6-month AZAV tech Umschulung at €0 personal cost." },
      { type: "Migrant on BAMF-Kurs", useCase: "Books an Integrationskurs or Berufssprachkurs, funded by BAMF, exam-ready in B1/B2." },
      { type: "Employee (Qualifizierungschancengesetz)", useCase: "Employer books an upskilling track, up to 100% co-funded by the Agentur für Arbeit." },
      { type: "Self-funded career switcher", useCase: "Pays €149/mo via SEPA to combine B2-German with a Data Analytics certificate." },
      { type: "Employer / HR L&D", useCase: "Manages a team of learners across language + tech with one invoice." },
    ],
    risks: [
      { risk: "Loss or delay of AZAV / BAMF Trägerzulassung", mitigation: "In-house Zulassungsmanager, dual-audit calendar (fachkundige Stelle + BAMF), and a self-pay + employer channel that keeps revenue flowing if a single Zulassung lapses." },
      { risk: "Policy change to Bildungsgutschein rules", mitigation: "Four independent funding rails (AZAV, BAMF, employer, self-pay) — no single policy shift can zero the pipeline." },
      { risk: "Completion / Anwesenheit below AZAV threshold", mitigation: "AI-driven early-warning on attendance, live coach outreach, and hybrid live+on-demand format proven to lift completion above the 70% AZAV bar." },
    ],
  },
  {
    id: "zivvo",
    name: "ZIVVO",
    tagline: "Trusted online car marketplace for Germany",
    description:
      "A modern online marketplace to buy, sell, auction and trade cars in Germany — private sellers, dealers and fleets on one platform. Verified listings, instant valuations, integrated financing, and dealer trade-stock tools replace the fragmented mix of mobile.de, AutoScout24, Kleinanzeigen and auction houses.",
    market: "≈7.1m used-car transactions/yr in Germany; €120bn used-car GMV; €1.4bn addressable listing + SaaS + lead TAM.",
    audience: "Private buyers & sellers, independent Autohäuser, franchise dealer groups, leasing return desks, and auction/trade-stock operators.",
    competitors: [
      { name: "mobile.de", strength: "Dominant classifieds brand, dealer inventory depth", counter: "Free private listings + 30% lower dealer package price, AI-priced valuations, and integrated escrow — mobile.de charges dealers heavily and offers no trust layer" },
      { name: "AutoScout24", strength: "Pan-European reach, dealer CRM", counter: "DE-hosted, faster mobile UX, WhatsApp lead delivery, and a bundled trade-stock/auction module that AS24 charges extra for" },
      { name: "Kleinanzeigen (eBay)", strength: "Huge private-seller traffic, free listings", counter: "Real identity verification (VideoIdent), fraud-scoring on every listing, and integrated payment/escrow to eliminate the scam-risk Kleinanzeigen is known for" },
      { name: "Auto1 / wirkaufendeinauto.de", strength: "Instant-buy convenience for sellers", counter: "Sellers get the marketplace price with our guided auction, not the wholesale offer — typically 8-15% higher net proceeds" },
    ],
    currentMarket: {
      howServed:
        "Germany's used-car market runs on four disconnected rails. Consumer classifieds live on mobile.de and AutoScout24 (dealer-heavy, paid listings) and Kleinanzeigen (free, private, high fraud). Instant-buy platforms (Auto1, wirkaufendeinauto.de) pay wholesale prices for convenience. Dealer trade-stock moves through closed B2B auctions (BCA, Autorola, Auto1 Remarketing). Financing, insurance, warranty and Gebrauchtwagen-Check are stitched together per transaction. No player offers verified listings, escrow payment, AI valuation and dealer trade-stock in one product.",
      users: "≈7.1m used-car transactions/yr; ≈38k Kfz-Händler in DE; ≈24m active buyers/sellers/yr across mobile.de + AutoScout24 + Kleinanzeigen.",
      revenue: "≈€900m dealer classifieds spend (mobile.de + AS24) + ≈€300m B2B remarketing fees + ≈€200m ancillary (financing leads, warranty, insurance) = ≈€1.4bn addressable in DE.",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 220,
    defaultUserGrowth: 0.18,
    defaultArpu: 129,
    defaultChurn: 0.03,
    defaultAddlRevenue: 8000,
    defaultDirectCost: 4800,
    color: "#f97316",
    domain: "zivvo.de",
    reason:
      "Buying or selling a car in Germany is still stressful: fake listings on Kleinanzeigen, expensive dealer packages on mobile.de, opaque wholesale offers from Auto1, and separate tools for auctions, valuation, financing and paperwork. Dealers juggle 4-6 SaaS tools to publish stock, run trade-in appraisals, source at auction and finance customers. ZIVVO consolidates the entire lifecycle — list, value, auction, trade, finance, insure, register — into one trusted, DE-hosted platform.",
    proposition:
      "One marketplace for the whole car lifecycle. Private users list free with verified identity, escrow payment and AI-guided pricing. Dealers get a full SaaS: multi-channel listing, trade-stock sourcing, auction bidding, DAT/Schwacke-linked valuation, financing & warranty integrations, and lead CRM — at 30% below mobile.de + AutoScout24 combined. Revenue: dealer subscriptions (€129-€899/mo), private premium listings (€9.90), transaction fees on auctions & escrow (1.5%), and financing/insurance lead commissions.",
    features: [
      "Verified identity for every seller (VideoIdent / Schufa-check)",
      "AI valuation engine (DAT + Schwacke + live-market signals)",
      "Escrow payment & digital Kaufvertrag with e-signature",
      "Live & timed auctions for private and dealer stock",
      "Dealer trade-stock module: source, appraise, publish, remarket",
      "Multi-channel publishing to mobile.de / AutoScout24 / Kleinanzeigen",
      "Integrated financing (Santander, CreditPlus) & Gap-insurance leads",
      "Warranty & Gebrauchtwagen-Check (DEKRA/TÜV) booking",
      "WhatsApp & e-mail lead delivery with fraud scoring",
      "Zulassungsservice: online Kfz-Zulassung via i-Kfz",
    ],
    apps: [
      { name: "ZIVVO Marketplace", kind: "Web", purpose: "Consumer buy/sell/auction marketplace" },
      { name: "ZIVVO Buyer", kind: "iOS", purpose: "Saved searches, alerts, offers, escrow chat" },
      { name: "ZIVVO Buyer Android", kind: "Android", purpose: "Same, on Android" },
      { name: "ZIVVO Dealer", kind: "SaaS", purpose: "Dealer console: stock, leads, auctions, CRM, financing" },
      { name: "ZIVVO Auction", kind: "Web", purpose: "Live & timed auction house for private and B2B lots" },
      { name: "ZIVVO Valuation API", kind: "API", purpose: "AI valuation for banks, insurers and leasing companies" },
      { name: "ZIVVO Admin", kind: "Admin", purpose: "Trust & safety, fraud scoring, payout controls" },
    ],
    userTypes: [
      { type: "Private seller", useCase: "Lists free, gets an AI-guided price, sells safely with escrow payment." },
      { type: "Private buyer", useCase: "Filters verified listings, books TÜV-check, finances online in one flow." },
      { type: "Independent Autohaus", useCase: "Replaces 4 SaaS tools with one dealer subscription and gets cheaper leads." },
      { type: "Franchise dealer group", useCase: "Publishes group stock, runs trade-in appraisals and sources auction lots centrally." },
      { type: "Leasing / fleet remarketer", useCase: "Auctions returned vehicles to a verified dealer network with automated invoicing." },
    ],
    risks: [
      { risk: "Listing liquidity cold-start vs mobile.de / AutoScout24", mitigation: "Free private listings + free 3-month dealer trial + auto-import of existing stock via DEKRA/DAT feeds seed inventory before paid rollout." },
      { risk: "Fraud & fake listings damaging trust", mitigation: "Mandatory VideoIdent for sellers, ML fraud-scoring on every listing, escrow-only payment above €2k, and 24/7 trust & safety team." },
      { risk: "Dependence on financing/insurance partners for ancillary revenue", mitigation: "Multi-partner integrations (Santander, CreditPlus, Allianz, HUK) with revenue-share diversification; no single partner exceeds 30% of ancillary revenue." },
    ],
  },
  {
    id: "omniqora",
    region: "INT",
    name: "OMNIQORA",
    tagline: "The complete AI business operating system.",
    description:
      "Omniqora is the complete AI business operating system — sold as Omniqora One with six modules (Connect, Voice, Flow, Agents, Exchange and the Qora assistant) on one login and one bill. At its core is the omnichannel customer-conversation engine: WhatsApp, Instagram, Messenger, SMS, e-mail, web-chat, Telegram and voice land in one team inbox, and every conversation becomes a case with qualification, appointment, document request, quote, payment, third-party fulfilment and follow-up. One engine sold three ways — embedded add-on inside any iTechLounge brand, standalone SaaS for independent SMEs, and a partner/white-label edition for agencies, groups and resellers. No commission on anything our customers earn: flat regional subscriptions plus transparent pass-through of channel, model and payment-provider fees.",
    market:
      "≈33m SMEs across the UK, EU/DACH and the Gulf/South Asia markets we serve; the customer-conversation and workflow stack (omnichannel inbox, helpdesk, CRM, appointments, invoicing, AI reception) is a ≈€14bn/yr addressable spend, of which ≈£2.6bn/yr sits in the UK alone.",
    audience:
      "Owner-run and small-team SMEs in beauty, trades, healthcare, hospitality, real estate, retail and automotive; multi-brand and multi-seller groups; in-house teams inside iTechLounge brands; agencies, consultancies, resellers and franchise groups running many client tenants.",
    competitors: [
      { name: "Intercom / Zendesk", strength: "Enterprise brand, mature helpdesk and reporting", counter: "SME-priced flat regional plans from £/€45 with no per-resolution AI charging, cases and SLAs included, and industry packs pre-built instead of a blank builder" },
      { name: "Superchat (DE)", strength: "Established DACH WhatsApp inbox brand", counter: "True omnichannel (voice, Instagram, Telegram, e-mail queues) with a case state machine and quote-to-pay, embedded distribution across 80+ sister brands, and a cheaper entry tier" },
      { name: "Respond.io / Trengo", strength: "Multi-channel inbox with automation", counter: "Cases, SLAs, approvals, audit log and Aida AI reception answering out-of-hours calls and chats — not just routing messages" },
      { name: "MessageBird / Bird, Twilio", strength: "Global CPaaS scale and channel reach", counter: "Product, not plumbing: workflows, CRM, portal links and payments out of the box, EU/UK residency, and regional list pricing instead of enterprise contracts" },
      { name: "Front / HubSpot Service Hub", strength: "Familiar shared inbox plus CRM suite", counter: "Regional pricing in EUR/GBP/USD/AED/PKR, modular add-ons you switch on per need, hard usage caps that prevent surprise bills, and white-label for partners" },
      { name: "AI receptionist point tools (e.g. answering services)", strength: "Cheap 24/7 call answering", counter: "The AI receptionist is one module inside the same system that then runs the case, books the job, sends the quote and collects payment" },
    ],
    currentMarket: {
      howServed:
        "SMEs today run customer conversations on private WhatsApp and personal mobiles, a generic shared inbox, a separate CRM, a separate booking tool, a separate invoicing tool and — for out-of-hours — a human answering service. The digital 10–15% is split between WhatsApp-first inboxes (Superchat, Charles), multi-channel inboxes (Respond.io, Trengo), helpdesks (Intercom, Zendesk, Front) and enterprise CPaaS (Twilio, Bird). None of them ship case management, SLA escalation, quote-to-pay, third-party fulfilment, industry packs and an AI receptionist in one subscription, and consent/audit obligations (GDPR, UK GDPR, TTDSG, § 203 StGB) are largely unmet on private phones.",
      users:
        "≈5.6m UK SMEs and ≈3.3m German SMEs; roughly 900k businesses across our launch regions pay for some conversation tool today, while the large majority still work from personal WhatsApp, e-mail and paper.",
      revenue:
        "≈£2.6bn/yr UK and ≈€420m/yr German spend on paid inbox/WhatsApp Business tooling, plus a far larger ≈€14bn/yr spend on the surrounding CRM, ticketing, appointment, answering-service and invoicing stack that OmniQora consolidates into one subscription.",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 260,
    defaultUserGrowth: 0.19,
    defaultArpu: 99,
    defaultChurn: 0.02,
    defaultAddlRevenue: 6000,
    defaultDirectCost: 5200,
    color: "#2563EB",
    domain: "omniqora.com",
    reason:
      "Customers now start every relationship in a chat window, but SMEs answer them from a personal phone with no audit trail, no consent record, no SLA and no link to the job, invoice or payment. Enterprise tools solve part of it at enterprise prices; WhatsApp inboxes solve messaging but not the business process. OmniQora gives every SME — and every iTechLounge brand — one compliant, case-based, AI-assisted conversation core, priced for its own region and free of commission on the revenue it generates.",
    proposition:
      "One subscription, clean pass-through, modular expansion. Pick a plan by team and channel size, switch on the modules you need, and pay third-party channel, AI-model, marketplace and payment fees transparently and separately — we never take a commission on customer revenue. Three go-to-market surfaces: embedded add-on inside an iTechLounge brand (shared login, data and billing), standalone SaaS for independent SMEs (own brand, self-serve onboarding, monthly cancellation), and partner/white-label for agencies and resellers (own domain and logo, tenant console, revenue share). Every tier ships with EU and UK hosting, regional data residency options, a full audit log, five-language customer communication and a 2-month free trial.",
    pricing: [
      "Every module is priced twice: standalone, or as a discounted add-on for an existing Omniqora customer. One plan level covers the whole suite.",
      "Solo — owner-run: £19/month standalone · £10/month as an add-on for existing Omniqora customers",
      "Business — small teams: £49/month standalone · £29/month as an add-on for existing Omniqora customers",
      "Pro — multi-brand & sellers: £99/month standalone · £59/month as an add-on for existing Omniqora customers",
      "Scale — groups & partners: £249/month standalone · bespoke bundle for existing Omniqora customers",
      "Regional list pricing — the same plan is charged in the buyer's region and currency: GBP (UK), EUR (EU/DACH), USD (international), AED (Gulf), PKR (South Asia), purchasing-power adjusted.",
      "Enterprise & embedded: on request — custom users and channels, embedded and white-label use, custom contracts and DPA, dedicated capacity, named contact.",
      "Commercial rules: subscription is separate from third-party channel, model, marketplace and payment fees; expensive usage is metered with quotas, alerts and hard caps; onboarding and migration billed separately; partners pay a platform minimum plus a fee per active tenant. List prices exclude VAT.",
      "2-month free trial on every standalone tier, monthly cancellation, no commission on customer revenue and no per-conversation surcharge.",
    ],
    features: [
      "Omniqora One — the complete AI business operating system: one login, one data core, one bill across every module",
      "Qora — the central AI assistant that sits across the whole platform and answers, drafts, summarises and acts",
      "Omniqora Connect — every conversation, one intelligent core: WhatsApp, Instagram, Messenger, SMS, e-mail, web-chat and Telegram in one team inbox",
      "Omniqora Voice — every call, intelligently handled: AI receptionist, call routing, callbacks, number porting and 24/7 out-of-hours cover",
      "Omniqora Flow — put your business in motion: workflow automation from intake to quote, scheduling, fulfilment and follow-up",
      "Omniqora Agents — your AI team, ready to work: task-scoped AI employees for reception, sales follow-up, admin, billing chase and reporting",
      "Omniqora Exchange — connect more, achieve more: integration marketplace for calendars, CRM, accounting, payments and channel apps",
      "Brand structure: master brand Omniqora → platform Omniqora One → assistant Qora → AI employees Omniqora Agents → communications Omniqora Connect → AI receptionist Omniqora Voice → automation Omniqora Flow → marketplace Omniqora Exchange",
      "Omnichannel inbox: WhatsApp, Instagram, Facebook Messenger, SMS, e-mail, web-chat, Telegram, telephony & VoIP with number porting",
      "Case state machine: intake → qualify → quote → schedule → fulfil → follow-up, with owner, deadline and escalation",
      "SLA management with reminders, breach alerts and escalation paths",
      "Aida AI assistant: triage, summaries and reply drafts — humans decide anything with money or legal effect",
      "24/7 AI reception: answers calls, chats and messages out of hours, qualifies intent, books appointments and hands over clean cases",
      "Workflow automation for intake, qualification, scheduling, follow-up and reactivation",
      "Campaigns & approved message templates with opt-in management and automatic channel-rule compliance",
      "Roles, permissions & audit: owner, admin, manager, agent, viewer, finance, compliance, partner",
      "Secure portal links (short-lived signed URLs) for IDs, documents, invoices and contracts instead of chat attachments",
      "Quote → approval → send → collect → reconcile with hosted payment links and case linkage",
      "CRM: contacts, companies, pipelines, order/booking context and seller queues",
      "Industry packs pre-configured: beauty & wellness, trades, healthcare, hospitality, real estate, retail",
      "Five-language customer communication with per-tenant tone and template sets",
      "Analytics: response time, automation rate, CSAT, SLA breaches, revenue attribution",
      "Calendar, CRM, payments, API and webhook integrations; quota pools for AI and messaging",
      "GDPR / UK GDPR / TTDSG / § 203 StGB safeguards, EU & UK hosting, regional residency, deletion policy and full event log",
      "White-label: own domain, brand, from-name, templates and tenant console per partner",
    ],
    apps: [
      { name: "Omniqora One", kind: "SaaS", purpose: "omniqora.com — the complete AI business operating system: one account, one data core, one bill across every module" },
      { name: "Omniqora Connect", kind: "SaaS", purpose: "Every conversation. One intelligent core — omnichannel team inbox with cases, SLAs and templates" },
      { name: "Omniqora Voice", kind: "SaaS", purpose: "Every call, intelligently handled — AI receptionist, routing, callbacks and 24/7 cover" },
      { name: "Omniqora Flow", kind: "SaaS", purpose: "Put your business in motion — workflow automation from intake to quote, booking, fulfilment and follow-up" },
      { name: "Omniqora Agents", kind: "SaaS", purpose: "Your AI team, ready to work — task-scoped AI employees for reception, sales, admin and billing" },
      { name: "Omniqora Exchange", kind: "SaaS", purpose: "Connect more. Achieve more — integration marketplace for calendars, CRM, accounting, payments and channels" },
      { name: "Qora", kind: "SaaS", purpose: "The central AI assistant across the platform: asks, drafts, summarises and acts inside every module" },
      { name: "OmniQora Web", kind: "Web", purpose: "app.omniqora.com — agent & manager console: inbox, cases, workflows, analytics, account" },
      { name: "OmniQora Mobile", kind: "iOS", purpose: "Native mobile inbox with bottom navigation, push notifications and on-the-go case handling" },
      { name: "OmniQora Mobile Android", kind: "Android", purpose: "Same native experience on Android" },
      { name: "OmniQora Portal", kind: "Web", purpose: "Customer-facing secure portal for uploads, quotes, bookings and payments" },
      { name: "OmniQora Marketplace", kind: "SaaS", purpose: "Commission-free directory and seller hub connecting customers to verified providers on the platform" },
      { name: "OmniQora CRM", kind: "SaaS", purpose: "Contacts, pipelines, order context, seller queues and revenue attribution" },
      { name: "OmniQora Partner", kind: "SaaS", purpose: "Agency multi-tenant console with branding, tenant provisioning and revenue share" },
      { name: "OmniQora Cloud API", kind: "API", purpose: "Channel + workflow engine and webhooks for embedded use inside iTechLounge brands" },
      { name: "OmniQora Admin", kind: "Admin", purpose: "Trust & safety, template governance, quota control, break-glass access review" },
    ],
    userTypes: [
      { type: "SME owner", useCase: "Sees every channel, conversation and case in one compliant workspace instead of on a private phone." },
      { type: "Agent / receptionist", useCase: "Runs qualification, bookings and quotes from one inbox with AI drafts and templates." },
      { type: "Manager / operations", useCase: "Tracks SLA, automation rate and revenue per workflow across the team and channels." },
      { type: "Compliance / finance", useCase: "Audits every message, consent and payment; exports GDPR records and reconciles collections." },
      { type: "Customer", useCase: "Gets answers 24/7 on their own channel and uses secure portal links for documents and payment." },
      { type: "Partner / agency / reseller", useCase: "Runs many client tenants white-labelled, with delegated support and revenue share." },
      { type: "iTechLounge sister brand", useCase: "Embeds OmniQora as a native conversation and AI-reception module inside its own product." },
    ],
    risks: [
      { risk: "Channel policy changes (Meta, Apple, telco) breaking a workflow", mitigation: "Authorised partner routes, template governance with versioning and rollback, and multi-channel fallback (SMS, e-mail, voice, portal) so no workflow depends on one provider." },
      { risk: "AI and messaging usage costs eroding margin", mitigation: "Quotas, alerts and hard caps per tenant, transparent pass-through of model and channel fees, and model routing to the cheapest capable model per task." },
      { risk: "Incumbents (Intercom, Superchat) undercutting the entry tier", mitigation: "Embedded distribution across 80+ sister brands is a channel they lack; the entry tier is a lead source while Pro/Scale, modules and partner editions carry margin." },
      { risk: "Regulatory exposure on healthcare and legal tenants (GDPR, § 203 StGB)", mitigation: "Purpose-bound consent, EU/UK-only residency options, secure portal links instead of chat attachments, RLS, and break-glass access with review." },
      { risk: "Regional pricing arbitrage between currencies", mitigation: "Billing region tied to verified company registration and payment instrument, with contractual restrictions on cross-region resale." },
    ],
  },
  {
    id: "unipathway",
    region: "INT",
    name: "UNIPATHWAY",
    tagline: "UK & Germany study consultancy for Pakistani students",
    description:
      "End-to-end admissions, language-prep (IELTS, TestDaF, Goethe), Sperrkonto, visa and pre-departure guidance for Pakistani students heading to universities in the UK and Germany. Runs entirely online with a Karachi/Lahore ground team and DE/UK-hosted student portal.",
    market:
      "≈50,000 Pakistani students go abroad each year; UK + Germany absorb ≈18,000 of them. Addressable consultancy + prep TAM ≈€180m/yr.",
    audience:
      "Pakistani undergraduates and A-level / FSc leavers, master's applicants, and their parents; secondary: Pakistani employers sponsoring staff for German Fachkräfte visas.",
    competitors: [
      { name: "IDP / British Council counselling", strength: "Brand trust, testing monopoly on IELTS", counter: "Fixed transparent fee, end-to-end (admission → visa → arrival) instead of per-service, and success-based refunds if visa is refused on our error" },
      { name: "Local Pakistani agents (SI-UK, Times Consultant)", strength: "High-street presence in every city", counter: "Digital portal + AI shortlisting + verified Germany rails (Sperrkonto, APS, Uni-Assist) that most agents outsource" },
      { name: "DAAD / self-service", strength: "Free official information", counter: "We do the actual paperwork, Uni-Assist submission, Sperrkonto opening and visa dossier — DAAD only informs" },
    ],
    currentMarket: {
      howServed:
        "Pakistani students today rely on a fragmented mix: British Council/IDP for IELTS and UK counselling, DAAD info-only for Germany, and thousands of small local agents charging per-service commissions. Germany-specific rails (APS certificate, Uni-Assist, Sperrkonto, Krankenversicherung, block-account) are poorly handled — most agents only cover the UK. Families juggle 4–6 vendors to get one student from Karachi to Berlin.",
      users:
        "≈50,000 outbound Pakistani students/yr; ≈8,000 to the UK, ≈10,000 to Germany. Only ≈15% currently use structured digital consultancy.",
      revenue:
        "≈€120m/yr spent on Pakistani outbound consultancy + language prep + visa filing across UK/DE; another ≈€80m in Sperrkonto float, insurance and pre-departure services.",
    },
    defaultLaunchMonth: 4,
    defaultInitialUsers: 180,
    defaultUserGrowth: 0.2,
    defaultArpu: 149,
    defaultChurn: 0.03,
    defaultAddlRevenue: 8000,
    defaultDirectCost: 5000,
    color: "#8B1538",
    domain: "unipathways.pk",
    reason:
      "Pakistani families lose lakhs of rupees every year to fragmented agents, mis-filed Uni-Assist applications and rejected visa dossiers. Germany in particular is under-served: the APS certificate, Sperrkonto opening and Krankenversicherung enrolment intimidate students and most agents skip them. UNIPATHWAY is the one operator that handles the full UK and Germany pathway digitally, with fixed fees and refund-on-error guarantees.",
    proposition:
      "One student portal from IELTS/TestDaF booking to landing in Berlin or London: AI-driven university shortlisting, document vault, Uni-Assist / UCAS submission, Sperrkonto opening with a partner bank, health insurance enrolment, visa-dossier builder, and pre-departure briefing. Fixed transparent fees (₨) with a partial refund if a visa is refused due to our filing error.",
    features: [
      "AI university shortlister matching CGPA, budget, subject, IELTS/TestDaF scores",
      "Document vault with checklist per country and per university",
      "Uni-Assist and UCAS submission engine with tracking",
      "Language-prep classroom (IELTS, TestDaF, Goethe A1–C1) with mock exams",
      "Sperrkonto opening via partner bank (Expatrio / Fintiba equivalent)",
      "APS certificate workflow for Germany applicants",
      "Visa-dossier builder for UK Student Route and German § 16b",
      "Krankenversicherung enrolment (TK, Mawista) for DE arrivals",
      "Accommodation shortlist in host city (Studentenwerk + private)",
      "Parent portal in Urdu with milestone SMS/WhatsApp updates",
      "Alumni mentor network in London, Berlin, Munich, Manchester",
      "Refund-on-error clause tied to submission audit trail",
    ],
    apps: [
      { name: "UNIPATHWAY Student", kind: "Web", purpose: "Student portal: shortlist, applications, documents, payments, visa tracker" },
      { name: "UNIPATHWAY Learn", kind: "SaaS", purpose: "IELTS / TestDaF / Goethe classroom with live tutors and mocks" },
      { name: "UNIPATHWAY Parent", kind: "Web", purpose: "Parent-facing Urdu progress dashboard with WhatsApp updates" },
      { name: "UNIPATHWAY Counsellor", kind: "SaaS", purpose: "Counsellor console with case pipeline, Uni-Assist / UCAS integration" },
      { name: "UNIPATHWAY Mobile", kind: "iOS", purpose: "On-the-go document capture, chat with counsellor, visa checklist" },
      { name: "UNIPATHWAY Mobile Android", kind: "Android", purpose: "Same, on Android — primary device in the target market" },
      { name: "UNIPATHWAY Admin", kind: "Admin", purpose: "Ops console for partner banks, universities, visa authorities and finance" },
    ],
    userTypes: [
      { type: "Undergraduate applicant", useCase: "FSc / A-levels student targeting a UK or German bachelor's, needs shortlisting, language prep and visa help." },
      { type: "Master's applicant", useCase: "Pakistani graduate targeting UK MSc or German M.Sc., needs APS, Uni-Assist and Sperrkonto." },
      { type: "Parent / sponsor", useCase: "Pays the bill and wants a transparent Urdu-language view of progress and refunds." },
      { type: "Counsellor (in-house)", useCase: "Runs 40–60 students in a pipeline with SLA and document audit trail." },
      { type: "Partner bank / insurer", useCase: "Receives verified Sperrkonto and Krankenversicherung leads with pre-filled KYC." },
      { type: "Alumni mentor", useCase: "London/Berlin-based alumnus mentoring 1–3 incoming students per intake." },
    ],
    risks: [
      { risk: "UK or Germany tightens student visa quotas or salary rules", mitigation: "Dual-country model (UK + DE) plus emerging rails to Ireland and the Netherlands; not dependent on a single visa regime." },
      { risk: "Regulatory scrutiny of Pakistani education agents (SECP, HEC)", mitigation: "Licensed as a private limited entity in PK, transparent fee schedule, and DAAD/British Council-aligned counselling standards — we welcome regulation." },
      { risk: "FX and remittance friction on student payments", mitigation: "SBP-compliant fee collection in PKR, partner bank rails for Sperrkonto funding, and installment plans to smooth family cash-flow." },
    ],
  },
  {
    id: "zivvouk",
    name: "ZIVVO UK",
    region: "UK",
    tagline: "Verified car marketplace for the UK",
    domain: "zivvo.co.uk",
    description: "UK sister marketplace to ZIVVO Germany: verified private and dealer car listings with HPI, MOT and finance checks, escrow payments and delivery. Same engine, UK compliance and pricing.",
    market: "\u22487.2m used-car transactions per year in the UK; \u2248\u00a31.1bn spent on listings, leads and dealer software.",
    audience: "Independent dealers, franchise groups, private sellers, car buyers.",
    color: "#0ea5e9",
    defaultLaunchMonth: 5,
    defaultInitialUsers: 180,
    defaultUserGrowth: 0.19,
    defaultArpu: 119,
    defaultChurn: 0.025,
    defaultAddlRevenue: 9000,
    defaultDirectCost: 7000,
    reason: "UK dealers pay Auto Trader \u00a31,000\u2013\u00a33,000 per month per forecourt for listings alone and still handle checks, payments and delivery off-platform. ZIVVO UK bundles listing, HPI/MOT verification, escrow and delivery into one subscription at a fraction of the cost.",
    proposition: "One subscription puts a dealer's whole stock online with automatic HPI, MOT-history and mileage verification, finance quotes, escrow-protected payment and nationwide delivery booking \u2014 no per-lead fees, no upsells.",
    features: [
      "Verified listings with HPI, MOT & mileage checks",
      "Dealer stock feed import (AutoTrader/eBay/CSV)",
      "Escrow payments with buyer protection",
      "Finance & warranty quotes at checkout",
      "Nationwide delivery & collection booking",
      "Part-exchange valuation tool",
      "In-app chat with fraud screening",
      "Dealer CRM with lead scoring",
      "Photo AI: auto-enhance & background removal",
      "Reviews & verified-seller badges",
    ],
    apps: [
      {
        name: "ZIVVO Marketplace",
        kind: "Web",
        purpose: "Public search, listings, checkout",
      },
      {
        name: "ZIVVO Dealer",
        kind: "SaaS",
        purpose: "Stock, leads, pricing, analytics",
      },
      {
        name: "ZIVVO Mobile",
        kind: "iOS",
        purpose: "Buyer search & alerts",
      },
      {
        name: "ZIVVO Mobile",
        kind: "Android",
        purpose: "Buyer search & alerts",
      },
      {
        name: "ZIVVO Feeds",
        kind: "API",
        purpose: "Stock feed ingest & syndication",
      },
    ],
    userTypes: [
      {
        type: "Independent dealer",
        useCase: "Lists 40 cars, pays one flat fee instead of per-advert pricing.",
      },
      {
        type: "Private seller",
        useCase: "Sells with verified checks and escrow protection.",
      },
      {
        type: "Buyer",
        useCase: "Filters by verified history, books delivery.",
      },
      {
        type: "Finance broker",
        useCase: "Receives qualified, pre-checked applications.",
      },
    ],
    competitors: [
      {
        name: "Auto Trader",
        strength: "Dominant audience and dealer habit",
        counter: "Flat-fee pricing vs per-advert escalators, plus escrow, delivery and HPI bundled free \u2014 a dealer saves 60-70% per month",
      },
      {
        name: "Motors.co.uk / eBay Motors",
        strength: "Cheap listing volume",
        counter: "Verification-first trust layer and integrated payments; we monetise transactions, not clicks, so listings can be near-free",
      },
    ],
    risks: [
      {
        risk: "Auto Trader price war",
        mitigation: "Our unit economics rely on transaction and finance commissions, not listing rent, so we can undercut indefinitely.",
      },
      {
        risk: "Fraudulent listings",
        mitigation: "Mandatory V5C/HPI verification, ID checks and escrow-only payments on private sales.",
      },
    ],
    currentMarket: {
      howServed: "The UK market is effectively an Auto Trader monopoly (\u224875% of dealer ad spend), with Motors, eBay Motors and Facebook Marketplace taking the value end. Checks (HPI), payments and delivery all happen off-platform through separate vendors.",
      users: "\u224813,000 franchise + \u22489,000 independent dealers; \u22487.2m annual used-car sales.",
      revenue: "\u2248\u00a31.1bn/yr dealer advertising and software spend, plus \u2248\u00a3400m of checks, warranty and delivery revenue sitting outside the marketplaces.",
    },
  },
  {
    id: "kinderstarsuk",
    name: "KINDERSTARS UK",
    region: "UK",
    tagline: "Childminder agency & childcare software for the UK",
    domain: "kinderstars.co.uk",
    description: "UK childminder agency and directory: parents search vetted, Ofsted-registered childminders by postcode; providers get bookings, registers, invoicing and compliance packs. Agency model lets us register childminders under our own umbrella.",
    market: "\u22484.7m children under 9 in England; \u2248\u00a37.6bn annual childcare spend; \u224827,000 registered childminders.",
    audience: "Working parents, childminders, nurseries, employers offering childcare benefits.",
    color: "#fb7185",
    defaultLaunchMonth: 6,
    defaultInitialUsers: 240,
    defaultUserGrowth: 0.2,
    defaultArpu: 39,
    defaultChurn: 0.03,
    defaultAddlRevenue: 6000,
    defaultDirectCost: 7000,
    reason: "England lost over 12,000 childminders in five years, largely to paperwork and Ofsted burden. As a registered childminder agency we absorb registration, inspection and compliance so carers can work \u2014 and parents get vetted care with one search.",
    proposition: "Two products in one: a consumer directory with postcode search, availability and instant booking, and an agency SaaS giving childminders registration, DBS tracking, EYFS learning journals, invoicing and Tax-Free Childcare handling for a flat monthly fee.",
    features: [
      "Postcode & availability search with filters",
      "Agency registration and Ofsted-equivalent oversight",
      "DBS, first-aid and insurance expiry tracking",
      "EYFS learning journals with photo observations",
      "Automated invoicing, Tax-Free Childcare & funded hours",
      "Daily registers and ratio checks",
      "Parent app with daily diary and messaging",
      "Employer benefit portal",
      "Review and verification badges",
      "Vacancy alerts for parents",
    ],
    apps: [
      {
        name: "KinderStars Directory",
        kind: "Web",
        purpose: "Parent search and booking",
      },
      {
        name: "KinderStars Provider",
        kind: "SaaS",
        purpose: "Registers, journals, invoicing",
      },
      {
        name: "KinderStars Parent",
        kind: "iOS",
        purpose: "Daily diary, payments, messaging",
      },
      {
        name: "KinderStars Agency",
        kind: "Admin",
        purpose: "Vetting, inspection, compliance",
      },
    ],
    userTypes: [
      {
        type: "Parent",
        useCase: "Finds and books a vetted childminder near work or home.",
      },
      {
        type: "Childminder",
        useCase: "Runs the whole business \u2014 register, journals, invoices \u2014 from a phone.",
      },
      {
        type: "Employer",
        useCase: "Offers a vetted childcare benefit to staff.",
      },
      {
        type: "Agency inspector",
        useCase: "Runs quality visits and records outcomes.",
      },
    ],
    competitors: [
      {
        name: "Childcare.co.uk",
        strength: "Huge parent traffic and SEO",
        counter: "We are an agency, not a classifieds site \u2014 we vet, register and insure, and charge providers a subscription rather than parents a paywall",
      },
      {
        name: "Tiney",
        strength: "Well-funded agency model",
        counter: "Lower agency fee, no equity-style revenue share, and full software (journals, invoicing, funded hours) included rather than sold separately",
      },
    ],
    risks: [
      {
        risk: "Ofsted / DfE agency rule change",
        mitigation: "Dual model: even without agency status the directory + software business stands alone.",
      },
      {
        risk: "Trust incident",
        mitigation: "Mandatory enhanced DBS, reference checks, insurance verification and unannounced quality visits.",
      },
    ],
    currentMarket: {
      howServed: "Parents use Childcare.co.uk classifieds, Facebook groups and word of mouth; providers juggle paper registers, Excel invoices and separate learning-journal apps (Tapestry, Famly). Agencies (tiney, Koru Kids) cover only a fraction of the country.",
      users: "\u224827,000 registered childminders and \u22481.3m families using paid non-nursery childcare.",
      revenue: "\u2248\u00a37.6bn UK childcare spend; \u2248\u00a3120m/yr addressable in directory, agency fees and provider software.",
    },
  },
  {
    id: "eventplanruk",
    name: "EVENTPLANR UK",
    region: "UK",
    tagline: "Plan it once. Book trusted UK vendors.",
    domain: "eventplanruk.itechlounge.co.uk",
    description: "EVENTPLANR UK is the commission-free, full-service event platform for Britain: a public marketplace of verified venues and vendors searchable by postcode, distance, category, price and rating; a complete planning workspace (task timeline, budget, guest list, RSVP, seating, documents); private media sharing for guests; encrypted deposit and balance payments with full logs and receipts for both sides; and a built-in vendor CRM with enquiry pipeline, calendar, quotes, contracts and invoices. Hosts, vendors, guests and venues each get their own portal plus iOS and Android apps for on-the-day coordination. Live now as a test site at eventplanruk.itechlounge.co.uk; the real domain eventplanr.co.uk follows.",
    market: "\u2248240,000 UK weddings plus \u22481.1m private and corporate events a year; \u2248\u00a314bn spend.",
    audience: "Couples, party hosts, corporate PAs, venues, caterers, photographers, DJs.",
    color: "#a855f7",
    defaultLaunchMonth: 7,
    defaultInitialUsers: 300,
    defaultUserGrowth: 0.2,
    defaultArpu: 25,
    defaultChurn: 0.035,
    defaultAddlRevenue: 9000,
    defaultDirectCost: 6000,
    reason: "Planning a UK event still means WhatsApp groups, spreadsheets, email chains and Pinterest boards, while deposits leave by bank transfer with no protection. Vendors, meanwhile, pay directories \u00a340-\u00a3200 a month or per-lead fees for enquiries that mostly never convert. EVENTPLANR UK puts hosts and vendors on one working platform and replaces per-lead charging with a flat subscription.",
    proposition: "Zero commission, ever. Registering is free for hosts \u2014 planner, guest list, RSVP, budget and vendor search cost nothing; private media sharing is an optional \u00a33 per event. Vendors pay a flat subscription from \u00a310/mo for marketplace visibility, CRM, calendar, quoting, contracts and payments, and keep 100% of every booking. How it works: the host describes the event once, EVENTPLANR builds the task timeline and budget, shortlists verified vendors by postcode and distance, collects comparable quotes, takes deposits and balances through encrypted payments with receipts and logs on both sides, runs RSVPs, dietary needs and seating from the guest portal, and hands the day over as a shared timeline every supplier can see.",
    pricing: [
      "Hosts: free forever \u2014 planning workspace, guest list, RSVP, budget, vendor search and shortlists",
      "Host premium: \u00a33 per event for private media sharing and guest photo wall",
      "Vendor Starter \u00a310/mo: marketplace profile, enquiry inbox, calendar",
      "Vendor Pro \u00a339/mo: full CRM pipeline, quotes, contracts and e-signature, payments and payouts",
      "Venue \u00a399/mo: multi-space availability, preferred-supplier cross-selling, event sheets",
      "Agency \u00a3199/mo: multi-event dashboard, white-label client portals, team seats",
      "No commission on bookings, no per-lead fees, no listing fees \u2014 ever",
    ],
    features: [
      "Drag-and-drop task timeline with event templates",
      "Guest list, RSVP and dietary tracking",
      "Budget tracker with real supplier quotes",
      "Verified vendor marketplace searchable by postcode, distance, category, price and rating",
      "Protected deposits and balance payments with 256-bit encryption, receipts and full payment logs",
      "Private media wall for guest photos",
      "Seating planner",
      "Group gifting and contributions",
      "Vendor CRM with enquiry pipeline, quotes and invoicing",
      "Contracts and e-signature",
      "Favourites and shortlists shared with co-hosts",
      "City and postcode SEO landing pages driving free vendor demand",
    ],
    apps: [
      {
        name: "EventPlanr Web",
        kind: "Web",
        purpose: "Planning workspace and marketplace",
      },
      {
        name: "EventPlanr Vendor",
        kind: "SaaS",
        purpose: "Enquiries, CRM pipeline, calendar, quotes, payouts",
      },
      {
        name: "EventPlanr Guest",
        kind: "iOS",
        purpose: "RSVP, photos, schedule",
      },
      {
        name: "EventPlanr Guest",
        kind: "Android",
        purpose: "RSVP, photos, schedule",
      },
      {
        name: "EventPlanr Admin",
        kind: "Admin",
        purpose: "Vendor verification, disputes, payouts and moderation",
      },
      {
        name: "EventPlanr API",
        kind: "API",
        purpose: "Calendar, accounting and website-widget integrations",
      },
    ],
    userTypes: [
      {
        type: "Couple / host",
        useCase: "Plans the whole event and pays vendors safely.",
      },
      {
        type: "Vendor",
        useCase: "Fills empty dates and manages enquiries.",
      },
      {
        type: "Guest",
        useCase: "RSVPs, sees the schedule and uploads photos.",
      },
      {
        type: "Venue",
        useCase: "Lists availability and cross-sells preferred suppliers.",
      },
    ],
    competitors: [
      {
        name: "Hitched / The Knot",
        strength: "Enormous SEO and directory inventory",
        counter: "We are a working planning tool, not a directory \u2014 hosts stay for months, so vendors get warm, high-intent enquiries for a flat \u00a310-\u00a339/mo with no per-lead charge at all",
      },
      {
        name: "Bridebook",
        strength: "Strong free planning app",
        counter: "Protected payments plus a real vendor CRM, contracts and invoicing make us the transaction layer, not just the inspiration layer",
      },
      {
        name: "Poptop / Add to Event",
        strength: "Fast supplier quote marketplaces with wide category coverage",
        counter: "They take booking commission or sell leads per credit; we take zero commission and vendors keep 100% of the fee, so our suppliers can quote lower and still earn more",
      },
      {
        name: "Eventbrite / Cvent",
        strength: "Ticketing scale and enterprise corporate event tooling",
        counter: "Self-serve pricing with no implementation fee or annual contract, and one platform that also covers private events, vendors and payments",
      },
    ],
    risks: [
      {
        risk: "Seasonality of weddings",
        mitigation: "Corporate and private-party segments smooth the calendar; annual vendor plans.",
      },
      {
        risk: "Vendor disintermediation",
        mitigation: "Escrow protection, dispute resolution and reviews make on-platform booking the safer option for both sides.",
      },
    ],
    currentMarket: {
      howServed: "Hosts use Hitched, Bridebook and Pinterest for inspiration, then move to WhatsApp and spreadsheets to actually run the event. Vendors pay \u00a340-\u00a3200/mo for directory listings and chase deposits by bank transfer.",
      users: "\u2248240,000 weddings/yr and \u224870,000 UK event vendors.",
      revenue: "\u2248\u00a314bn event spend; \u2248\u00a3250m/yr flows to directories and vendor software today.",
    },
  },
  {
    id: "taxnuvia",
    name: "TAXNUVIA",
    region: "UK",
    tagline: "Find and compare UK accountants \u2014 free",
    domain: "taxnuvia.co.uk",
    description: "A matching marketplace where businesses describe their needs and receive vetted, fixed-price quotes from UK accountants. Transparent pricing, verified ICAEW/ACCA credentials, and reviews from real clients.",
    market: "\u22485.6m UK businesses; \u2248\u00a312bn spent annually on accountancy and bookkeeping.",
    audience: "Sole traders, limited-company directors, landlords, small practices seeking clients.",
    color: "#14b8a6",
    defaultLaunchMonth: 8,
    defaultInitialUsers: 220,
    defaultUserGrowth: 0.2,
    defaultArpu: 49,
    defaultChurn: 0.03,
    defaultAddlRevenue: 7000,
    defaultDirectCost: 5000,
    reason: "Choosing an accountant is opaque: no published prices, no verified credentials, and referral sites simply sell the same lead to five firms. TAXNUVIA publishes fixed prices and verifies every practice.",
    proposition: "Free for the business: answer 8 questions, get 3 verified fixed-price quotes within 24 hours. Accountants pay a subscription for verified-practice status plus a success fee on won clients \u2014 no blind lead-selling.",
    features: [
      "Guided needs questionnaire",
      "Verified ICAEW / ACCA / AAT credential checks",
      "Fixed-price quotes, no hourly guesswork",
      "Practice profiles with specialisms and sectors",
      "Verified client reviews",
      "Secure document exchange for onboarding",
      "Deadline reminders (SA, VAT, CT, MTD)",
      "Switching service with handover letters",
      "Practice CRM and pipeline",
      "Fee benchmarking data",
    ],
    apps: [
      {
        name: "TaxNuvia Marketplace",
        kind: "Web",
        purpose: "Search, quote requests, profiles",
      },
      {
        name: "TaxNuvia Practice",
        kind: "SaaS",
        purpose: "Leads, quotes, client onboarding",
      },
      {
        name: "TaxNuvia Vault",
        kind: "Web",
        purpose: "Secure document exchange",
      },
      {
        name: "TaxNuvia Admin",
        kind: "Admin",
        purpose: "Verification and dispute handling",
      },
    ],
    userTypes: [
      {
        type: "Business owner",
        useCase: "Compares three fixed-price quotes in a day.",
      },
      {
        type: "Landlord",
        useCase: "Finds a property-tax specialist.",
      },
      {
        type: "Accountancy practice",
        useCase: "Fills capacity with matched, pre-qualified clients.",
      },
      {
        type: "Bookkeeper",
        useCase: "Picks up overflow work from practices.",
      },
    ],
    competitors: [
      {
        name: "Unbiased",
        strength: "Established brand and traffic",
        counter: "We verify credentials and publish fixed prices; leads are exclusive, not resold five times \u2014 better conversion for practices at lower cost",
      },
      {
        name: "Bark",
        strength: "Aggressive lead generation",
        counter: "No pay-per-lead lottery: subscription plus success fee means practices only pay when they win work",
      },
    ],
    risks: [
      {
        risk: "Practices bypass the platform",
        mitigation: "Success fee is charged on first-year fees only and priced below their cost of acquisition, so compliance is cheaper than evasion.",
      },
      {
        risk: "Quality of advice complaints",
        mitigation: "Credential verification, PI insurance checks and review moderation with a complaints route.",
      },
    ],
    currentMarket: {
      howServed: "Businesses find accountants through word of mouth, Unbiased, Bark or Google Ads. Pricing is quoted privately and lead-gen sites resell the same enquiry to multiple firms, so conversion is poor and buyers get spammed.",
      users: "\u22485.6m businesses; \u2248340,000 accountancy professionals across \u224840,000 practices.",
      revenue: "\u2248\u00a312bn accountancy fees; \u2248\u00a3300m/yr spent on lead generation and practice marketing.",
    },
  },
  {
    id: "gabley",
    name: "GABLEY",
    region: "UK",
    tagline: "The property OS for UK agencies and landlords",
    domain: "gabley.co.uk",
    description: "A public property marketplace fused with a full agency CRM, compliance hub and tenant portal \u2014 sales, lettings, HMO and commercial in one workspace.",
    market: "\u224825,000 UK estate and letting agency branches; \u2248\u00a32.4bn spent on portals and agency software.",
    audience: "Estate agents, letting agents, landlords, tenants, buyers.",
    color: "#6366f1",
    defaultLaunchMonth: 9,
    defaultInitialUsers: 140,
    defaultUserGrowth: 0.18,
    defaultArpu: 199,
    defaultChurn: 0.02,
    defaultAddlRevenue: 12000,
    defaultDirectCost: 9000,
    reason: "Agents pay Rightmove and Zoopla thousands a month for listings, then pay again for a CRM (Reapit, Alto), again for compliance (Goodlord) and again for tenant referencing. GABLEY is one system at one price.",
    proposition: "Marketplace exposure, CRM, compliance and tenant portal in a single subscription \u2014 with portal syndication included \u2014 cutting an average branch's software and listing bill by more than half.",
    features: [
      "Public marketplace with map & school search",
      "Sales and lettings CRM with pipelines",
      "Automated portal syndication (Rightmove, Zoopla, OnTheMarket)",
      "Compliance hub: EPC, gas, EICR, deposit protection",
      "Tenant referencing and right-to-rent checks",
      "Digital tenancy agreements and e-signature",
      "Rent collection and arrears chasing",
      "Maintenance ticketing with contractor network",
      "Landlord portal with statements",
      "HMO room-level management",
    ],
    apps: [
      {
        name: "Gabley Marketplace",
        kind: "Web",
        purpose: "Public property search",
      },
      {
        name: "Gabley Agency",
        kind: "SaaS",
        purpose: "CRM, compliance, accounting",
      },
      {
        name: "Gabley Tenant",
        kind: "iOS",
        purpose: "Rent, maintenance, documents",
      },
      {
        name: "Gabley Landlord",
        kind: "Web",
        purpose: "Statements and approvals",
      },
      {
        name: "Gabley Sync",
        kind: "API",
        purpose: "Portal and accounting integrations",
      },
    ],
    userTypes: [
      {
        type: "Branch manager",
        useCase: "Runs sales and lettings pipelines in one place.",
      },
      {
        type: "Property manager",
        useCase: "Tracks compliance certificates and maintenance.",
      },
      {
        type: "Landlord",
        useCase: "Sees rent, arrears and certificates live.",
      },
      {
        type: "Tenant",
        useCase: "Pays rent and raises repairs from the app.",
      },
    ],
    competitors: [
      {
        name: "Rightmove",
        strength: "Near-monopoly buyer audience",
        counter: "We do not have to beat Rightmove on audience \u2014 we bundle syndication to it and win on the \u00a3700+/mo an agent spends on CRM and compliance, which we replace at a lower total cost",
      },
      {
        name: "Reapit / Alto",
        strength: "Deep, entrenched agency workflows",
        counter: "Modern UX, no implementation fees, free data migration, and compliance plus tenant portal included instead of sold as add-ons",
      },
    ],
    risks: [
      {
        risk: "Portal duopoly raises syndication costs",
        mitigation: "Agents keep their own portal contracts; we are the workspace, so our value is unaffected.",
      },
      {
        risk: "Migration inertia",
        mitigation: "Free white-glove migration and 90-day parallel running.",
      },
    ],
    currentMarket: {
      howServed: "Agents run a stack of Rightmove/Zoopla (\u00a31,200-\u00a32,500/mo), a CRM (Reapit, Alto, Jupix), a compliance product (Goodlord, Vouch) and separate accounting. Landlords self-manage on spreadsheets or pay 10-15% management fees.",
      users: "\u224825,000 agency branches and \u22482.7m private landlords.",
      revenue: "\u2248\u00a32.4bn/yr portal and agency software spend; \u2248\u00a39bn in letting management fees.",
    },
  },
  {
    id: "stylesyncuk",
    name: "STYLESYNC UK",
    region: "UK",
    tagline: "Salon booking & management software",
    domain: "stylesync.uk",
    description: "Consumer booking marketplace plus full salon management: calendar, staff rotas, stock, payments and marketing for hair, beauty and barber businesses.",
    market: "\u224845,000 UK hair and beauty businesses; \u2248\u00a38.5bn consumer spend.",
    audience: "Salon owners, independent stylists, barbers, beauty therapists, clients.",
    color: "#ec4899",
    defaultLaunchMonth: 10,
    defaultInitialUsers: 260,
    defaultUserGrowth: 0.19,
    defaultArpu: 59,
    defaultChurn: 0.03,
    defaultAddlRevenue: 8000,
    defaultDirectCost: 6000,
    reason: "Salons lose 15-20% of revenue to no-shows and pay marketplaces up to \u00a33 per new-client booking on top of a monthly fee. STYLESYNC charges one flat subscription with zero commission on bookings.",
    proposition: "Everything a salon needs \u2014 online booking, deposits that kill no-shows, rotas, stock, card payments and automated rebooking marketing \u2014 for a flat monthly fee with no per-booking commission, plus free exposure on the consumer marketplace.",
    features: [
      "Online booking with deposits and no-show protection",
      "Marketplace listing with reviews",
      "Staff rota and commission tracking",
      "Client records with treatment and patch-test history",
      "Automated SMS/WhatsApp reminders and rebooking",
      "Stock control and retail sales",
      "Integrated card payments and tips",
      "Loyalty and package memberships",
      "Gift vouchers",
      "Reporting: utilisation, retention, average spend",
    ],
    apps: [
      {
        name: "StyleSync Book",
        kind: "Web",
        purpose: "Consumer marketplace and booking",
      },
      {
        name: "SCHONOVA Salon",
        kind: "SaaS",
        purpose: "Calendar, rotas, stock, payments",
      },
      {
        name: "SCHONOVA Pro",
        kind: "iOS",
        purpose: "Stylist app for mobile chairs",
      },
      {
        name: "StyleSync Client",
        kind: "Android",
        purpose: "Book, pay, rebook",
      },
    ],
    userTypes: [
      {
        type: "Salon owner",
        useCase: "Runs rota, stock and payments in one system.",
      },
      {
        type: "Independent stylist",
        useCase: "Takes deposits and fills gaps in the diary.",
      },
      {
        type: "Client",
        useCase: "Books, pays and rebooks in 30 seconds.",
      },
      {
        type: "Receptionist",
        useCase: "Manages walk-ins and waitlists.",
      },
    ],
    competitors: [
      {
        name: "Treatwell",
        strength: "Massive consumer demand engine",
        counter: "Zero commission per booking versus their 20-35% new-client fee \u2014 a busy salon saves four figures a month",
      },
      {
        name: "Fresha",
        strength: "Free core software",
        counter: "Transparent flat pricing with no payment-processing lock-in and no client-data ownership grab; UK support and marketplace exposure included",
      },
    ],
    risks: [
      {
        risk: "Free competitor undercuts price",
        mitigation: "Our marketplace drives new clients and we monetise payments and marketing, so the software price can flex.",
      },
      {
        risk: "Payment processing dependency",
        mitigation: "Multi-PSP setup (Stripe + fallback acquirer) so no single provider can squeeze margin.",
      },
    ],
    currentMarket: {
      howServed: "Salons use Fresha (free, monetised via payments and marketplace fees), Treatwell (commission on new clients), Phorest or Timely (\u00a380-\u00a3250/mo), or still run a paper book. No-shows and deposits remain the biggest unsolved pain.",
      users: "\u224845,000 salons and \u2248100,000 self-employed stylists.",
      revenue: "\u2248\u00a38.5bn consumer spend; \u2248\u00a3350m/yr salon software and booking commission.",
    },
  },
  {
    id: "xpertjobs",
    name: "XPERTJOBS",
    region: "UK",
    tagline: "AI recruitment for engineering, medical, law and finance",
    domain: "xpertjobs.co.uk",
    description: "Specialist AI-matched job platform for regulated and technical professions: CV parsing, skills matching, compliance-document tracking and interview scheduling for candidates and employers.",
    market: "\u2248\u00a343bn UK recruitment market; professional/technical niches account for \u2248\u00a312bn.",
    audience: "Engineers, clinicians, solicitors, finance professionals, employers, agencies.",
    color: "#0284c7",
    defaultLaunchMonth: 11,
    defaultInitialUsers: 200,
    defaultUserGrowth: 0.2,
    defaultArpu: 149,
    defaultChurn: 0.025,
    defaultAddlRevenue: 10000,
    defaultDirectCost: 8000,
    reason: "Agencies charge 15-25% of first-year salary \u2014 \u00a39,000+ on a \u00a345k engineer \u2014 for a process that is largely CV matching and diary management. XPERTJOBS does the matching with AI and charges a subscription.",
    proposition: "Employers pay a flat monthly subscription for unlimited hires: AI shortlists from a verified, credential-checked talent pool, tracks GMC/NMC/SRA/CEng registrations and expiry, and books interviews automatically. Typical saving versus agency fees exceeds 80%.",
    features: [
      "AI CV parsing and skills-graph matching",
      "Verified professional registrations (GMC, NMC, SRA, CEng)",
      "Right-to-work and DBS document vault",
      "Automated interview scheduling",
      "Structured scorecards and interview kits",
      "Salary benchmarking by discipline",
      "Talent pools and re-engagement campaigns",
      "Agency portal for overflow roles",
      "Diversity-blind screening mode",
      "ATS integrations (Workday, Greenhouse, Bullhorn)",
    ],
    apps: [
      {
        name: "XpertJobs Careers",
        kind: "Web",
        purpose: "Candidate search and applications",
      },
      {
        name: "XpertJobs Employer",
        kind: "SaaS",
        purpose: "Pipeline, scorecards, offers",
      },
      {
        name: "XpertJobs Compliance",
        kind: "Web",
        purpose: "Credential and document tracking",
      },
      {
        name: "XpertJobs Connect",
        kind: "API",
        purpose: "ATS and job-board integrations",
      },
    ],
    userTypes: [
      {
        type: "Candidate",
        useCase: "Matched to relevant roles without agency spam.",
      },
      {
        type: "Hiring manager",
        useCase: "Gets a ranked shortlist in 48 hours.",
      },
      {
        type: "Compliance officer",
        useCase: "Tracks every registration and expiry.",
      },
      {
        type: "Recruitment agency",
        useCase: "Uses the platform for overflow placement.",
      },
    ],
    competitors: [
      {
        name: "LinkedIn Recruiter",
        strength: "Unmatched candidate graph",
        counter: "Vertical depth: verified professional registrations and compliance tracking LinkedIn does not do, at a third of the seat price",
      },
      {
        name: "Indeed",
        strength: "Volume and reach",
        counter: "Quality over volume \u2014 AI shortlisting for regulated roles rather than 300 unscreened applications, plus flat pricing instead of pay-per-click",
      },
    ],
    risks: [
      {
        risk: "Candidate liquidity cold start",
        mitigation: "Launch discipline by discipline (start with allied health and civils) rather than all verticals at once.",
      },
      {
        risk: "Agency retaliation",
        mitigation: "Agency portal turns competitors into a distribution channel on revenue share.",
      },
    ],
    currentMarket: {
      howServed: "Employers use LinkedIn Recruiter, Indeed and Reed for reach, then pay specialist agencies 15-25% of salary for anything technical or regulated. Compliance checking is manual, done in spreadsheets by HR.",
      users: "\u22481.1m professional vacancies filled per year in these disciplines.",
      revenue: "\u2248\u00a312bn agency fees in professional/technical recruitment; \u2248\u00a3900m in job-board and ATS spend.",
    },
  },
  {
    id: "traderos",
    name: "TRADEROS",
    region: "UK",
    tagline: "Jobs, materials and delivery for UK trades",
    domain: "traderos.co.uk",
    description: "Three-sided platform connecting tradespeople, customers and drivers: job management and quoting, materials ordering at trade prices, and same-day delivery to site.",
    market: "\u2248900,000 UK trade businesses; \u2248\u00a329bn annual builders'-merchant spend.",
    audience: "Electricians, plumbers, builders, homeowners, merchants, van drivers.",
    color: "#f97316",
    defaultLaunchMonth: 12,
    defaultInitialUsers: 220,
    defaultUserGrowth: 0.19,
    defaultArpu: 69,
    defaultChurn: 0.03,
    defaultAddlRevenue: 14000,
    defaultDirectCost: 9000,
    reason: "A tradesperson loses roughly an hour a day driving to a merchant, quotes on scraps of paper, and chases invoices for weeks. TRADEROS puts the merchant, the paperwork and the delivery in the van's phone.",
    proposition: "Free job management (quotes, invoices, scheduling) funded by margin on materials and delivery: order at trade prices from partnered merchants, get it delivered to site within hours, and invoice the customer with materials auto-costed.",
    features: [
      "Quotes and invoices with materials auto-costed",
      "Job scheduling and site calendar",
      "Materials catalogue at negotiated trade prices",
      "Same-day site delivery via driver network",
      "Customer job portal with photo progress",
      "Payments with card, bank transfer and finance",
      "CIS and VAT-ready exports",
      "Certificates and compliance documents (EICR, Gas Safe)",
      "Team timesheets and job costing",
      "Review and referral engine",
    ],
    apps: [
      {
        name: "TraderOS Pro",
        kind: "SaaS",
        purpose: "Jobs, quotes, invoices, costing",
      },
      {
        name: "TraderOS Van",
        kind: "iOS",
        purpose: "On-site ordering and delivery tracking",
      },
      {
        name: "TraderOS Driver",
        kind: "Android",
        purpose: "Delivery jobs and proof of delivery",
      },
      {
        name: "TraderOS Customer",
        kind: "Web",
        purpose: "Quotes, progress, payments",
      },
      {
        name: "TraderOS Merchant",
        kind: "API",
        purpose: "Stock, pricing and fulfilment",
      },
    ],
    userTypes: [
      {
        type: "Tradesperson",
        useCase: "Quotes on site and orders materials from the same screen.",
      },
      {
        type: "Homeowner",
        useCase: "Approves quotes and tracks the job.",
      },
      {
        type: "Merchant",
        useCase: "Gains incremental orders without extra counter staff.",
      },
      {
        type: "Driver",
        useCase: "Earns per delivery run between merchant and site.",
      },
    ],
    competitors: [
      {
        name: "Checkatrade",
        strength: "Consumer trust and lead flow",
        counter: "We are not a lead-rental business \u2014 no \u00a31,000+/yr membership; we make money on materials and delivery, so job software is free",
      },
      {
        name: "Tradify / Powered Now",
        strength: "Solid trade job software",
        counter: "Materials and delivery integration is unique \u2014 the tradesperson saves real hours and money, not just paperwork",
      },
    ],
    risks: [
      {
        risk: "Merchant margin pressure",
        mitigation: "Volume-based rebate deals plus own-label sourcing on high-turn lines.",
      },
      {
        risk: "Driver supply",
        mitigation: "Hybrid model: partnered courier firms plus merchant delivery fleets before gig drivers.",
      },
    ],
    currentMarket: {
      howServed: "Trades juggle Checkatrade or MyBuilder for leads (\u00a31,000+/yr), Tradify/Powered Now for paperwork, and a physical trip to Screwfix, Toolstation or a Travis Perkins branch for materials. Delivery is merchant-scheduled and slow.",
      users: "\u2248900,000 trade businesses; \u2248250,000 use any job-management software.",
      revenue: "\u2248\u00a329bn merchant spend; \u2248\u00a3600m/yr lead-generation and trade-software spend.",
    },
  },
  {
    id: "amityos",
    name: "AMITYOS",
    region: "UK",
    tagline: "Care that connects. Evidence that speaks for itself.",
    domain: "amityos.itechlounge.co.uk",
    description: "AMITYOS is the complete operating system and commission-free care marketplace for UK social care. One flat subscription per site covers digital care planning, eMAR medication, rostering with electronic call monitoring, incidents and safeguarding, handovers, training and DBS tracking, local-authority and private invoicing, plus role-aware portals for managers, carers, families, commissioners and district nurses. A verified care marketplace connects families and councils with providers and connects providers with vetted bank and agency carers \u2014 with no commission, no per-carer licence and no cut of a placement. Built on 14 years of frontline care-operating experience. Live now as a test site at amityos.itechlounge.co.uk; the real domain amityos.co.uk follows.",
    market: "\u224818,500 CQC-regulated adult social care providers in England; \u2248\u00a31.1bn care-software market plus \u2248\u00a34.5bn a year spent on agency staffing and introduction fees.",
    audience: "Domiciliary agencies, care homes, supported living and learning-disability providers, registered managers, care workers, bank and agency staff, families, local-authority commissioners, district nurses.",
    color: "#10b981",
    defaultLaunchMonth: 13,
    defaultInitialUsers: 120,
    defaultUserGrowth: 0.18,
    defaultArpu: 229,
    defaultChurn: 0.02,
    defaultAddlRevenue: 11000,
    defaultDirectCost: 10000,
    reason: "Providers fail CQC inspections on evidence, not on care. A typical agency runs a care-planning system, a separate rostering tool, a paper MAR file, a spreadsheet for training and DBS expiry, a phone-and-WhatsApp handover, and an accounts package that never matches the actual visits delivered. On top of that, every unfilled shift is bought from an agency at 30-60% margin and every private enquiry arrives through a directory that charges for the introduction. AMITYOS exists so the evidence is captured as care happens, the rota fills itself from vetted staff at no commission, and one flat fee per site replaces the whole stack.",
    proposition: "One flat fee per site, no per-carer licence, no commission, 30 days free. Every plan includes the full care record, eMAR, rostering with electronic call monitoring, incidents and safeguarding, family portal, training matrix and invoicing \u2014 domiciliary, residential and supported living in the same platform. Full service: we migrate your care plans from paper, Nourish or Access, configure your assessment templates and KLOE evidence packs, train your team and stay on support. The marketplace connects families, councils and providers, and providers with bank and agency carers, and we take nothing from either side of the placement.",
    features: [
      "Commission-free care marketplace: verified providers for families and councils, and vetted bank and agency carers for providers, with no introduction or placement fee",
      "Digital care planning: person-centred assessments, risk assessments, reviews and daily notes with photo and voice capture",
      "eMAR medication administration with PRN, controlled drugs, missed-dose alerts and pharmacy stock reconciliation",
      "Rostering and scheduling with travel time, continuity of carer, skills matching, working-time and pay-rate rules",
      "Electronic call monitoring: geo, NFC and timestamp visit verification with real-time late and missed-visit alerts",
      "Incidents, accidents, safeguarding, body maps and duty-of-candour workflows with escalation",
      "Shift handover boards, alerts and open-task lists across shifts and sites",
      "CQC evidence packs mapped to the single assessment framework and quality statements, generated on demand",
      "Family and advocate portal: visit history, notes, medication summary, consent and secure messaging",
      "Staff compliance hub: training matrix, supervisions, appraisals, DBS, right-to-work and vaccination expiry alerts",
      "Care CRM: enquiries, assessments, placements, funding source, capacity and occupancy pipeline",
      "Invoicing and payroll exports: local authority, ICB, direct payment and private billing reconciled against verified visits",
      "Nurse and clinical tools: wounds, fluids, food charts, seizures, epilepsy, diabetes and NEWS2 observations",
      "Offline-first mobile apps for carers in poor-signal homes, with sync on reconnect",
      "AI Copilot: care-plan drafting, note quality checks, trend and deterioration flags and inspection readiness scoring",
      "Security and assurance: NHS DSPT, DCB0129 clinical safety case, row-level security per provider, MFA and UK GDPR privacy centre",
      "Open API and white-label: integrations with GP Connect, NHS Mail, payroll, finance and council brokerage systems",
    ],
    pricing: [
      "Starter \u2014 \u00a399/mo per site: up to 20 people supported, unlimited carer seats, care plans, eMAR, rostering, call monitoring, family portal, email support.",
      "Growth \u2014 \u00a3229/mo per site: up to 80 people supported, evidence packs, compliance hub, invoicing and payroll exports, clinical charts, priority support.",
      "Unlimited \u2014 \u00a3449/mo per site: unlimited people supported, multi-site oversight, custom templates, dedicated account manager and onboarding.",
      "Group \u2014 from \u00a31,499/mo: 10+ sites, group dashboards, SSO, data warehouse export and API access.",
      "Add-ons per site: AI Copilot \u00a349, clinical nursing module \u00a339, agency and bank staff marketplace \u00a329, SMS and WhatsApp alerts \u00a319, multi-language \u00a315.",
      "Unlimited carer seats on every plan \u2014 you never pay again for staff turnover.",
      "30 days free, no card required; paper, Nourish, Access and Person Centred Software migration included.",
      "Zero commission: no fee on marketplace enquiries, no cut of a bank or agency placement, no percentage of care fees.",
    ],
    apps: [
      { name: "AmityOS Manage", kind: "SaaS", purpose: "Core provider workspace: care plans, rostering, eMAR oversight, compliance, invoicing and reporting." },
      { name: "AmityOS Connect", kind: "SaaS", purpose: "Commission-free marketplace: provider profiles for families and councils, plus vetted bank and agency shift matching." },
      { name: "AmityOS Carer", kind: "iOS", purpose: "Offline-first point-of-care app: visits, notes, eMAR, body maps, incidents and handover." },
      { name: "AmityOS Carer", kind: "Android", purpose: "Same point-of-care app on Android, with NFC and geo visit verification." },
      { name: "AmityOS Family", kind: "Web", purpose: "Family and advocate portal: visit history, notes, medication summary and secure messaging." },
      { name: "AmityOS API & Group", kind: "API", purpose: "Group dashboards, SSO, council brokerage, GP Connect, payroll and finance integrations." },
    ],
    userTypes: [
      { type: "Registered manager", useCase: "Runs the rota, evidences compliance and walks into inspection with a KLOE-mapped evidence pack already generated." },
      { type: "Care worker", useCase: "Records visits, notes and medication on the phone, works offline and reads the handover before the first call." },
      { type: "Bank / agency carer", useCase: "Picks up verified open shifts from the marketplace with no agency margin taken out of the rate." },
      { type: "Family member or advocate", useCase: "Sees that mum's visit happened, what changed and what medication was given, and messages the team securely." },
      { type: "Local-authority commissioner", useCase: "Finds capacity through the marketplace and receives auditable invoices reconciled to verified visits." },
      { type: "Nurse / clinical lead", useCase: "Tracks wounds, observations, fluids and deterioration trends across the caseload." },
      { type: "Group admin", useCase: "Compares site quality and occupancy and cross-sells sister brands such as SKILLFINCH, RECOVRABLE and HMO FLOW." },
    ],
    competitors: [
      { name: "Access Care / Nourish / Person Centred Software", strength: "Deep CQC alignment, large installed base and long-term contracts", counter: "Flat fee per site with unlimited carer seats instead of \u00a34-\u00a39 per person per month plus a separate rostering licence \u2014 typically 40-60% lower total cost, with free migration and no multi-year lock-in" },
      { name: "Birdie / CareLineLive", strength: "Modern domiciliary product, good mobile app and funding", counter: "Operator-built by a team that ran care services for 14 years, and domiciliary, residential and supported living live in the same platform with clinical charts \u2014 one system as a provider grows, not a migration" },
      { name: "Florence / Curam / staffing agencies", strength: "Fast access to bank and agency carers", counter: "Our marketplace takes zero commission on a shift or placement: the carer keeps the full rate and the provider avoids a 30-60% agency margin, because the software subscription already pays for the platform" },
      { name: "Homecare.co.uk / carehome.co.uk directories", strength: "Consumer traffic and review credibility for family enquiries", counter: "Provider profiles and family enquiries are free and included in the subscription, with enquiries landing straight in the care CRM instead of being sold back as paid leads" },
      { name: "Paper files, spreadsheets and WhatsApp", strength: "Free, familiar and requires no training", counter: "Same speed at the point of care with offline mobile capture, automatic expiry alerts and an auditable record \u2014 and inspection evidence produced in minutes instead of a fortnight of file-pulling" },
    ],
    risks: [
      { risk: "Local-authority funding squeeze on providers", mitigation: "Small-provider tier from \u00a399 per site; ROI framed against avoided agency margin, admin hours and inspection downgrades rather than a discretionary IT spend." },
      { risk: "Clinical safety and medication liability", mitigation: "DCB0129 clinical safety case with a named clinical safety officer, eMAR double-signing and controlled-drug workflows, NHS DSPT and an ISO 27001 roadmap." },
      { risk: "Providers locked into incumbent contracts", mitigation: "Free parallel run during the 30-day trial, migration handled by our team and go-live aligned to contract expiry." },
      { risk: "Carer adoption and digital confidence", mitigation: "Offline-first app designed for one-handed use, multi-language interface for international recruits and free onboarding sessions with SKILLFINCH training bundled." },
      { risk: "Data-protection exposure on special-category data", mitigation: "Row-level security per provider, role-based access, MFA on sensitive actions, UK data residency, DPIAs and a UK GDPR privacy centre." },
    ],
    currentMarket: {
      howServed: "Roughly a third of providers still run paper care plans and MAR charts. Digitised providers pay Access, Nourish, Person Centred Software or Birdie \u00a34-\u00a39 per person supported per month, plus a separate rostering licence, a training spreadsheet, a paper DBS file and an accounts package that is reconciled by hand. Unfilled shifts are bought from staffing agencies at 30-60% margin, and private family enquiries are bought back from directories as paid leads.",
      users: "\u224818,500 CQC-regulated providers supporting \u22481.5m people with a workforce of \u22481.7m, of whom a large share still record care on paper.",
      revenue: "\u2248\u00a31.1bn UK care-software market growing with the NHS Digitising Social Care fund, on top of \u2248\u00a34.5bn a year of agency staffing spend and tens of millions in directory lead fees that a flat, commission-free subscription removes.",
    },
  },
  {
    id: "skillfinch",
    name: "SKILLFINCH",
    region: "UK",
    tagline: "Gamified compliance training for care & education",
    domain: "skillfinch.co.uk",
    description: "Blended compliance training platform for CQC, Ofsted and Skills for Care providers: mandatory e-learning, practical sign-off, gamified progress and inspection-ready matrices.",
    market: "\u22481.7m adult social care workers plus \u2248600,000 early-years staff in England; \u2248\u00a3900m training spend.",
    audience: "Care providers, nurseries, training managers, care workers, apprentices.",
    color: "#84cc16",
    defaultLaunchMonth: 14,
    defaultInitialUsers: 180,
    defaultUserGrowth: 0.2,
    defaultArpu: 89,
    defaultChurn: 0.025,
    defaultAddlRevenue: 7000,
    defaultDirectCost: 6000,
    reason: "Mandatory training is the single most common CQC and Ofsted compliance gap, yet most providers track it on a spreadsheet and buy e-learning that staff click through without learning anything.",
    proposition: "Care Certificate and mandatory modules delivered as short, gamified mobile lessons with practical observation sign-off, plus a live training matrix that shows any inspector exactly who is compliant and who expires next month.",
    features: [
      "Care Certificate and 30+ mandatory modules",
      "Gamified micro-lessons with streaks and badges",
      "Practical competency sign-off by assessors",
      "Live training matrix with expiry alerts",
      "Ofsted / CQC evidence export",
      "Blended classroom session booking",
      "Apprenticeship and Skills for Care mapping",
      "Multi-language delivery for international recruits",
      "Manager dashboards by site and team",
      "Certificates with QR verification",
    ],
    apps: [
      {
        name: "Skillfinch Academy",
        kind: "SaaS",
        purpose: "Courses, matrix, reporting",
      },
      {
        name: "Skillfinch Learn",
        kind: "iOS",
        purpose: "Mobile micro-learning",
      },
      {
        name: "Skillfinch Learn",
        kind: "Android",
        purpose: "Mobile micro-learning",
      },
      {
        name: "Skillfinch Assessor",
        kind: "Web",
        purpose: "Observation and sign-off",
      },
    ],
    userTypes: [
      {
        type: "Training manager",
        useCase: "Sees the whole workforce matrix and books refreshers.",
      },
      {
        type: "Care worker",
        useCase: "Completes lessons on the bus in five-minute chunks.",
      },
      {
        type: "Assessor",
        useCase: "Signs off practical competence in person.",
      },
      {
        type: "Inspector",
        useCase: "Receives a verified evidence pack.",
      },
    ],
    competitors: [
      {
        name: "Grey Matter Learning / Skills for Care partners",
        strength: "Sector credibility and accreditation",
        counter: "Mobile-first gamified delivery with real completion rates, plus practical sign-off \u2014 not just SCORM click-through \u2014 at a lower per-seat price",
      },
      {
        name: "iHASCO",
        strength: "Broad course library and brand",
        counter: "Care and early-years depth, multi-language for international recruits, and the compliance matrix included instead of charged as an LMS add-on",
      },
    ],
    risks: [
      {
        risk: "Accreditation requirements",
        mitigation: "Skills for Care endorsement and CPD accreditation pursued pre-launch.",
      },
      {
        risk: "Seat churn with staff turnover",
        mitigation: "Site-based pricing bands and free re-enrolment of replacement staff.",
      },
    ],
    currentMarket: {
      howServed: "Providers buy e-learning seats from iHASCO, Grey Matter or Care Skills Academy at \u00a330-\u00a390 per staff member per year, track completion in Excel, and run practical sessions with paper sign-off sheets.",
      users: "\u22482.3m care and early-years staff requiring annual mandatory training.",
      revenue: "\u2248\u00a3900m/yr training spend across adult social care and early years.",
    },
  },
  {
    id: "formationgenie",
    name: "FORMATION GENIE",
    region: "UK",
    tagline: "Company formation, compliance and growth tools",
    domain: "formationgenie.co.uk",
    description: "Transparent UK company formation with everything that comes after it: registered office, Companies House filings, VAT/PAYE registration, business banking and compliance reminders.",
    market: "\u2248800,000 UK companies incorporated each year; \u2248\u00a3450m formation and company-secretarial market.",
    audience: "First-time founders, contractors, overseas entrepreneurs, accountants.",
    color: "#eab308",
    defaultLaunchMonth: 15,
    defaultInitialUsers: 320,
    defaultUserGrowth: 0.2,
    defaultArpu: 19,
    defaultChurn: 0.04,
    defaultAddlRevenue: 11000,
    defaultDirectCost: 4000,
    reason: "Formation agents advertise \u00a312 incorporations and then bill for the registered office, the confirmation statement, the VAT registration and the mail forwarding. Founders discover the real cost in year two.",
    proposition: "One transparent monthly plan covering incorporation, registered office and director service address, all Companies House filings, VAT/PAYE registration and deadline management \u2014 plus banking, accounting and insurance partners on revenue share.",
    features: [
      "Same-day Companies House incorporation",
      "Registered office and director service address",
      "Confirmation statement and filing automation",
      "VAT, PAYE and Corporation Tax registration",
      "Business bank account introductions",
      "Digital mail scanning and forwarding",
      "Share cap tables and share issues",
      "Compliance calendar with deadline alerts",
      "Templates: shareholder agreements, contracts, policies",
      "Accountant marketplace referral (via TAXNUVIA)",
    ],
    apps: [
      {
        name: "Formation Genie",
        kind: "Web",
        purpose: "Formation flow and dashboard",
      },
      {
        name: "Genie Compliance",
        kind: "SaaS",
        purpose: "Filings, deadlines, documents",
      },
      {
        name: "Genie Mail",
        kind: "Web",
        purpose: "Scanned post and forwarding",
      },
      {
        name: "Genie Partner",
        kind: "Admin",
        purpose: "Accountant and bank referrals",
      },
    ],
    userTypes: [
      {
        type: "First-time founder",
        useCase: "Incorporates and stays compliant without an accountant.",
      },
      {
        type: "Contractor",
        useCase: "Runs a one-person limited company on autopilot.",
      },
      {
        type: "Overseas founder",
        useCase: "Gets a UK company, address and bank introduction.",
      },
      {
        type: "Accountant",
        useCase: "Onboards clients through a white-label formation flow.",
      },
    ],
    competitors: [
      {
        name: "1st Formations",
        strength: "Scale and Companies House integration",
        counter: "Flat all-in monthly price versus their \u00e0-la-carte upsells; compliance automation included rather than sold per filing",
      },
      {
        name: "Tide / ANNA free formation",
        strength: "Free incorporation bundled with banking",
        counter: "We are bank-neutral and cover the whole compliance lifecycle, so founders are not locked into one bank to stay compliant",
      },
    ],
    risks: [
      {
        risk: "Race to zero on formation price",
        mitigation: "Formation is the loss leader; revenue comes from recurring compliance, address and partner referrals.",
      },
      {
        risk: "AML / KYC obligations",
        mitigation: "Automated ID verification, PEP/sanctions screening and HMRC-supervised AML processes.",
      },
    ],
    currentMarket: {
      howServed: "Founders use 1st Formations, Companies Made Simple, or free incorporation from Tide and ANNA bundled with banking. Ongoing compliance is either self-managed or bolted onto an accountant's fee.",
      users: "\u2248800,000 incorporations per year and \u22485.5m active UK companies.",
      revenue: "\u2248\u00a3450m/yr formation, registered-office and company-secretarial spend.",
    },
  },
  {
    id: "merqano",
    name: "MERQANO",
    region: "INT",
    tagline: "Build. Sell. Grow.",
    domain: "merqano.com",
    description: "Multi-store commerce software on a landlord-and-tenant model: the platform owner onboards brands, and every tenant gets its own branded storefront with payments, catalogue, delivery rules, roles and analytics from one codebase. Sold internationally.",
    market: "≈$8bn global SaaS spend on ecommerce platforms and franchise/multi-location commerce tooling.",
    audience: "Franchise groups, multi-brand retailers, agencies, marketplace and platform operators, single shops ready to scale.",
    color: "#ff6b45",
    defaultLaunchMonth: 16,
    defaultInitialUsers: 400,
    defaultUserGrowth: 0.17,
    defaultArpu: 29,
    defaultChurn: 0.05,
    defaultAddlRevenue: 15000,
    defaultDirectCost: 11000,
    reason: "Brands that want several stores are forced to either pay per-store Shopify subscriptions with no group view, or commission a bespoke build. MERQANO ships the expensive, boring parts of commerce once — payments, orders, delivery logic, roles, SEO — so a new brand is a configuration change, not a new project.",
    proposition: "One platform, many tenants: themes, catalogues and domains are data, so a store can be branded, loaded, connected to payouts and trading on its own domain in days. The landlord sees platform-wide revenue and commission; each tenant sees only their own shop, enforced at database level.",
    features: [
      "Branded storefronts — hero, collections, product pages, journal and legal pages themed per tenant",
      "Hosted card checkout with Apple Pay and Google Pay, webhook-confirmed orders",
      "Catalogue, variants, sizes, dietary and allergen data per store",
      "Delivery & collection rules: postcode checks, cut-offs, lead times, slot picking, free-delivery thresholds",
      "Landlord, store-admin and customer roles with row-level security",
      "Live order queue, fulfilment status, revenue per store and platform-wide totals",
      "Transactional email: receipts, enquiry alerts, newsletter capture",
      "Per-store SEO metadata, sitemaps, structured data and custom domains",
      "Installable mobile app experience (home-screen icon, bottom nav, sticky basket)",
      "Tenant onboarding, plans, commission and payouts; white-label branding",
      "Migration of products, customers and content with old-domain redirects",
    ],
    apps: [
      {
        name: "MERQANO Storefront",
        kind: "Web",
        purpose: "Themed tenant shop with browsing, basket, slot picking and checkout",
      },
      {
        name: "MERQANO Store Dashboard",
        kind: "Admin",
        purpose: "Catalogue, stock, orders, fulfilment, delivery rules and store settings",
      },
      {
        name: "MERQANO Landlord",
        kind: "Admin",
        purpose: "Tenant onboarding, plans, commission, payouts and platform analytics",
      },
    ],
    userTypes: [
      {
        type: "Landlord / platform operator",
        useCase: "Onboards tenants, sets plans and commission, watches platform-wide revenue.",
      },
      {
        type: "Store admin (tenant)",
        useCase: "Loads the catalogue, sets cut-off times and works the daily order queue.",
      },
      {
        type: "Franchise or multi-brand group",
        useCase: "Runs several labels and locations with one login and consolidated reporting.",
      },
      {
        type: "Shopper",
        useCase: "Buys from the tenant's own domain, paying by wallet on a phone.",
      },
    ],
    competitors: [
      {
        name: "Shopify (Plus)",
        strength: "Enormous app ecosystem and brand trust",
        counter: "No true landlord view: every store is a separate subscription. We give group-level revenue, commission and tenant onboarding in one dashboard at a fraction of Plus pricing",
      },
      {
        name: "WooCommerce / bespoke builds",
        strength: "Fully customisable and self-owned",
        counter: "We are already built and maintained — no plugin sprawl, no security patching, and a new brand is a theme record instead of a six-month project",
      },
      {
        name: "Marketplaces (Deliveroo, Etsy, Amazon)",
        strength: "Instant demand and traffic",
        counter: "20–30% commission on every order. Tenants keep the customer relationship, the data and the margin on their own domain",
      },
    ],
    risks: [
      {
        risk: "Payment and PCI compliance exposure",
        mitigation: "Checkout runs on a hosted PCI-compliant payment page; orders are only marked paid on verified webhooks. We never touch card data.",
      },
      {
        risk: "Cross-tenant data leakage",
        mitigation: "Every table is tenant-scoped with database-level row security and server-side policy enforcement, audited per release.",
      },
      {
        risk: "Platform pricing pressure from Shopify",
        mitigation: "We compete on the multi-store/landlord layer they do not serve, plus bundled delivery, roles and analytics that would otherwise be paid apps.",
      },
    ],
    currentMarket: {
      howServed: "Groups stack one Shopify or WooCommerce subscription per store with no consolidated view, bolt on paid apps for delivery slots and roles, or commission an agency build. Marketplaces take 20–30% commission for the traffic.",
      users: "≈28m active online stores worldwide; millions run more than one brand or location.",
      revenue: "≈$8bn annual platform and app subscription spend, plus agency build budgets of $25k–$180k per brand.",
    },
  },
  {
    id: "stylesyncger",
    name: "SCHONOVA",
    region: "DE",
    tagline: "Beauty finden. Direkt buchen.",
    domain: "schonova.de",
    description: "German edition of STYLESYNC: online booking marketplace plus salon management for Friseure, Kosmetik and Barbershops, with DSGVO-compliant client records, TSE-ready checkout and SEPA payments.",
    market: "\u224880,000 Friseur- und Kosmetikbetriebe in Germany; \u2248\u20ac22bn consumer spend.",
    audience: "Salon owners, self-employed stylists, beauty studios, clients.",
    color: "#db2777",
    defaultLaunchMonth: 10,
    defaultInitialUsers: 240,
    defaultUserGrowth: 0.19,
    defaultArpu: 55,
    defaultChurn: 0.03,
    defaultAddlRevenue: 7000,
    defaultDirectCost: 6000,
    reason: "German salons still run paper appointment books and lose double-digit revenue to no-shows, while Treatwell charges commission on every new client. SCHONOVA offers flat-fee software with deposits built in.",
    proposition: "Flat monthly fee, no booking commission: online booking with deposits, staff rota, stock, TSE/GoBD-compliant checkout, DSGVO-safe client and patch-test records, and automated WhatsApp reminders in German.",
    features: [
      "Online-Buchung mit Anzahlung gegen No-Shows",
      "Marktplatz-Listing mit Bewertungen",
      "Dienstplan und Provisionsabrechnung",
      "Kundenkartei mit Behandlungs- und Patch-Test-Historie",
      "Automatische WhatsApp/SMS-Erinnerungen",
      "Warenwirtschaft und Retail-Verkauf",
      "TSE-/GoBD-konforme Kasse",
      "Treuepunkte und Abo-Pakete",
      "Gutscheine",
      "Auswertungen: Auslastung, Wiederkehr, Bon-H\u00f6he",
    ],
    apps: [
      {
        name: "SCHONOVA Buchung",
        kind: "Web",
        purpose: "Marktplatz und Terminbuchung",
      },
      {
        name: "SCHONOVA Salon",
        kind: "SaaS",
        purpose: "Kalender, Dienstplan, Kasse",
      },
      {
        name: "SCHONOVA Pro",
        kind: "iOS",
        purpose: "App f\u00fcr mobile Stylisten",
      },
      {
        name: "SCHONOVA Kunde",
        kind: "Android",
        purpose: "Buchen, zahlen, wiederbuchen",
      },
    ],
    userTypes: [
      {
        type: "Saloninhaberin",
        useCase: "F\u00fchrt Dienstplan, Lager und Kasse in einem System.",
      },
      {
        type: "Selbstst\u00e4ndige Stylistin",
        useCase: "Nimmt Anzahlungen und f\u00fcllt L\u00fccken im Kalender.",
      },
      {
        type: "Kundin",
        useCase: "Bucht und zahlt in 30 Sekunden.",
      },
      {
        type: "Empfang",
        useCase: "Verwaltet Laufkundschaft und Wartelisten.",
      },
    ],
    competitors: [
      {
        name: "Treatwell",
        strength: "Gr\u00f6\u00dfte Buchungsnachfrage in DACH",
        counter: "Keine Provision pro Neukunde (statt 20-35%) \u2014 ein gut ausgelasteter Salon spart vierstellig pro Monat",
      },
      {
        name: "Shore / phorest",
        strength: "Etablierte Salon-Software in DACH",
        counter: "Moderneres UI, TSE-Kasse inklusive, DE-Hosting und Preis rund 30% unter Shore",
      },
    ],
    risks: [
      {
        risk: "Preiskampf mit Fresha (kostenlos)",
        mitigation: "Marktplatz-Nachfrage und Zahlungsmargen tragen das Produkt; Softwarepreis ist flexibel.",
      },
      {
        risk: "TSE-/Kassenrecht",
        mitigation: "Zertifizierte TSE-Partnerl\u00f6sung und laufende Kassenrichtlinien-Updates.",
      },
    ],
    currentMarket: {
      howServed: "Deutsche Salons nutzen Papierkalender, Shore, phorest oder Treatwell. Treatwell dominiert die Endkundennachfrage und nimmt Provision; Kassensysteme werden separat gekauft.",
      users: "\u224880,000 Betriebe, davon gesch\u00e4tzt 35% mit Online-Buchung.",
      revenue: "\u2248\u20ac22bn Verbraucherausgaben; \u2248\u20ac260m/Jahr f\u00fcr Salonsoftware und Buchungsprovisionen.",
    },
  },
  {
    id: "parkpunkt",
    name: "PARKPUNKT",
    region: "DE",
    tagline: "Finden. Parken. Bezahlen.",
    domain: "parkpunkt.de",
    description: "Parking operating system for drivers, operators and cities: one app to find, book and pay for on-street, barrier and private parking, plus a management layer for operators.",
    market: "\u224848m registered cars in Germany; \u2248\u20ac3.9bn parking revenue.",
    audience: "Drivers, parking operators, municipalities, property owners with spare bays.",
    color: "#64748b",
    defaultLaunchMonth: 17,
    defaultInitialUsers: 300,
    defaultUserGrowth: 0.18,
    defaultArpu: 9,
    defaultChurn: 0.03,
    defaultAddlRevenue: 18000,
    defaultDirectCost: 8000,
    reason: "German drivers need a different app in every city \u2014 Handyparken, EasyPark, PARK NOW, plus each operator's own barrier system. PARKPUNKT is one wallet that works everywhere and pays operators faster.",
    proposition: "Consumer app free with a low transaction margin; operators pay SaaS for occupancy, dynamic pricing, ANPR/barrier integration and settlement; cities get enforcement and utilisation data. Revenue from three sides of the same transaction.",
    features: [
      "One-tap start/stop parking on-street and in garages",
      "Live availability and price comparison",
      "Barrier and ANPR integration (Scheidt & Bachmann, Designa)",
      "Season tickets and employee parking",
      "Private bay sharing (residential and commercial)",
      "EV charging session bundling",
      "Dynamic pricing engine for operators",
      "Enforcement and permit management for cities",
      "Automatic invoicing and VAT handling",
      "Occupancy analytics and heatmaps",
      "Transparent tariff quotes before booking",
      "Reservations, active-session view and digital receipts",
      "Vehicle profiles, favourites and accessibility preferences",
      "Business/fleet parking contexts with pooled billing",
      "Support cases and penalty-notice appeals workflow",
      "Enforcement plate checks with offline-safe evidence drafts",
      "Mobility-provider onboarding, API keys and sync health",
      "Provider commissions, refunds and settlement runs",
      "Bilingual DE/EN platform with role-based access and audit trail",
    ],
    apps: [
      {
        name: "ParkPunkt App",
        kind: "iOS",
        purpose: "Find, book, pay, extend",
      },
      {
        name: "ParkPunkt App",
        kind: "Android",
        purpose: "Find, book, pay, extend",
      },
      {
        name: "ParkPunkt Operator",
        kind: "SaaS",
        purpose: "Pricing, occupancy, settlement",
      },
      {
        name: "ParkPunkt City",
        kind: "Web",
        purpose: "Permits, enforcement, data",
      },
      {
        name: "ParkPunkt Gate",
        kind: "API",
        purpose: "Barrier and ANPR integrations",
      },
      {
        name: "ParkPunkt Enforcement",
        kind: "Android",
        purpose: "Plate checks, evidence capture, notices offline",
      },
      {
        name: "ParkPunkt Admin",
        kind: "Web",
        purpose: "Roles, organisations, commissions, refunds, audit",
      },
    ],
    userTypes: [
      {
        type: "Driver",
        useCase: "Parks anywhere with one app and one invoice.",
      },
      {
        type: "Operator",
        useCase: "Raises utilisation with dynamic pricing.",
      },
      {
        type: "City",
        useCase: "Manages permits and sees real occupancy data.",
      },
      {
        type: "Property owner",
        useCase: "Monetises empty bays out of hours.",
      },
      {
        type: "Business / fleet manager",
        useCase: "Manages employee parking on one consolidated invoice.",
      },
      {
        type: "Mobility provider",
        useCase: "Publishes inventory through the provider API and earns commission.",
      },
      {
        type: "Enforcement officer",
        useCase: "Checks plates and issues notices with photo evidence, even offline.",
      },
      {
        type: "Platform admin",
        useCase: "Handles refunds, settlements, roles and audit activity.",
      },
    ],
    competitors: [
      {
        name: "EasyPark",
        strength: "Broad European coverage and city contracts",
        counter: "Operator SaaS plus driver app in one \u2014 operators get real software, not just a payment channel; lower per-transaction fee",
      },
      {
        name: "PARK NOW / Parkster",
        strength: "Established Handyparken position",
        counter: "Barrier, ANPR and EV charging in the same session, plus private-bay supply cities cannot offer",
      },
    ],
    risks: [
      {
        risk: "City contract procurement cycles",
        mitigation: "Start with private operators and property owners where sales cycles are weeks, not years.",
      },
      {
        risk: "Payment margin compression",
        mitigation: "Operator SaaS subscriptions, not transaction fees, carry the margin.",
      },
    ],
    currentMarket: {
      howServed: "Drivers juggle EasyPark, PARK NOW, Parkster and city-specific apps, or use coins and paper tickets (still \u224860% of on-street payments). Operators run legacy Scheidt & Bachmann or Designa systems with no shared data layer.",
      users: "\u224848m cars; \u22489m regular app-based parkers.",
      revenue: "\u2248\u20ac3.9bn parking revenue in Germany; \u2248\u20ac400m/yr in operator technology and payment fees.",
    },
  },
  {
    id: "lawquo",
    name: "LAWQUO",
    region: "INT",
    tagline: "The legal operating system for clients and law firms",
    domain: "lawquo.com",
    description: "Verified lawyer marketplace plus secure case management: clients find vetted solicitors, agree milestone-based fees, and every document and payment sits in one audited case file.",
    market: "\u2248$900bn global legal services market; millions of law firms across the UK, EU, Gulf and South Asia.",
    audience: "Private clients, SMEs, law firms, in-house counsel, expats.",
    color: "#7c3aed",
    defaultLaunchMonth: 18,
    defaultInitialUsers: 110,
    defaultUserGrowth: 0.18,
    defaultArpu: 249,
    defaultChurn: 0.02,
    defaultAddlRevenue: 13000,
    defaultDirectCost: 10000,
    reason: "Legal fees are opaque and cross-border cases are chaotic: email attachments, wire transfers and no shared timeline. LAWQUO makes fees fixed and milestone-based, and the case file auditable.",
    proposition: "Clients get verified lawyers with published fixed-fee packages and escrowed milestone payments. Firms get full case-management SaaS \u2014 matters, deadlines (Fristen), documents, time capture, beA-ready filing and billing \u2014 with new-client flow included.",
    features: [
      "Verified lawyer profiles (Kammer registration checked)",
      "Fixed-fee packages and milestone escrow",
      "Matter and deadline (Fristen) management",
      "Secure client portal and document vault",
      "e-signature and beA-compatible filing",
      "Time capture and RVG/hourly billing",
      "Conflict checks",
      "Multilingual case handling (DE/EN/TR/AR)",
      "Court-date calendaring",
      "Full audit trail for every action",
    ],
    apps: [
      {
        name: "Lawquo Marketplace",
        kind: "Web",
        purpose: "Find and instruct a lawyer",
      },
      {
        name: "Lawquo Firm",
        kind: "SaaS",
        purpose: "Matters, deadlines, billing",
      },
      {
        name: "Lawquo Client",
        kind: "Web",
        purpose: "Case timeline, documents, payments",
      },
      {
        name: "Lawquo Vault",
        kind: "API",
        purpose: "Document and signature services",
      },
    ],
    userTypes: [
      {
        type: "Private client",
        useCase: "Instructs a lawyer at a known, fixed price.",
      },
      {
        type: "SME",
        useCase: "Manages contracts and disputes in one file.",
      },
      {
        type: "Law firm",
        useCase: "Runs matters and gets new instructions.",
      },
      {
        type: "Expat",
        useCase: "Finds an English-speaking German lawyer.",
      },
    ],
    competitors: [
      {
        name: "anwalt.de / Anwalt Suchservice",
        strength: "Dominant German lawyer directory traffic",
        counter: "We are transactional, not a listing rental: fixed fees, escrow and case management mean firms pay for outcomes, and clients actually convert",
      },
      {
        name: "Advoware / RA-MICRO",
        strength: "Entrenched German Kanzlei software",
        counter: "Cloud-native, no server installation, DSGVO-compliant DE hosting, and client acquisition built in rather than sold separately",
      },
    ],
    risks: [
      {
        risk: "Rechtsdienstleistungsgesetz (RDG) constraints",
        mitigation: "We are a technology and marketplace provider, not a legal service provider; fee sharing structured as advertising and software fees, reviewed by counsel.",
      },
      {
        risk: "Firm adoption inertia",
        mitigation: "Free tier for solo practitioners, migration tooling from Advoware/RA-MICRO exports.",
      },
    ],
    currentMarket: {
      howServed: "Clients search anwalt.de, Google or ask their Steuerberater; firms run Advoware, RA-MICRO or DATEV Anwalt on local servers and communicate by email, fax and beA. Fees are quoted per RVG or hourly with no transparency.",
      users: "\u2248165,000 Rechtsanw\u00e4lte in \u224845,000 Kanzleien.",
      revenue: "\u2248\u20ac25bn legal fees; \u2248\u20ac500m/yr Kanzleisoftware plus \u2248\u20ac200m directory advertising.",
    },
  },
  {
    id: "zoryn",
    name: "ZORYN",
    region: "DE",
    tagline: "Mehr als nur Punkte.",
    domain: "zorynrewards.de",
    description: "Shared loyalty infrastructure for the whole group: one wallet for points, cashback, affiliate shopping, local offers and merchant rewards \u2014 spanning direct Zoryn merchants, our own products (KIEZIO, RETTIO, HACCORA, TRAINDIREKT), affiliate retailers and card-linked offer partners.",
    market: "\u224870m German consumers; \u2248\u20ac2.6bn loyalty and rewards market.",
    audience: "Consumers, local retailers, hospitality venues, online merchants.",
    color: "#f59e0b",
    defaultLaunchMonth: 19,
    defaultInitialUsers: 500,
    defaultUserGrowth: 0.2,
    defaultArpu: 0,
    defaultChurn: 0.04,
    defaultAddlRevenue: 26000,
    defaultDirectCost: 9000,
    reason: "Germany's loyalty landscape is Payback, Deutschlandcard and a drawer full of paper stamp cards. Small local merchants are locked out because enterprise loyalty schemes cost more than they can earn.",
    proposition: "Free for consumers; merchants pay a small monthly fee for digital stamp cards, targeted campaigns and cashback funding, with settlement through our own payment rails. One wallet spanning the Kiez shop and the online checkout.",
    features: [
      "Digital stamp cards and point balances",
      "Cashback offers funded by merchants",
      "One wallet across local and online merchants",
      "Geo-triggered offers in the neighbourhood",
      "Merchant campaign console with ROI reporting",
      "Payment at checkout via QR and NFC",
      "Referral and friend-invite rewards",
      "Gift cards and vouchers",
      "Segmented push campaigns",
      "DSGVO-first consent and data controls",
      "Universal points plus merchant-specific and pending points",
      "Online affiliate shopping with tracked cashback",
      "Card-linked offers via Open Banking",
      "Family wallet with child-account restrictions",
      "Apple Wallet and Google Wallet passes",
      "Double-entry points ledger with settlement statements",
      "Fraud engine and campaign approval workflow",
      "Digital receipts and transaction history",
    ],
    apps: [
      {
        name: "Zoryn Wallet",
        kind: "iOS",
        purpose: "Rewards, payments, offers",
      },
      {
        name: "Zoryn Wallet",
        kind: "Android",
        purpose: "Rewards, payments, offers",
      },
      {
        name: "Zoryn Merchant",
        kind: "SaaS",
        purpose: "Campaigns, redemptions, analytics",
      },
      {
        name: "Zoryn Till",
        kind: "Web",
        purpose: "In-store redemption terminal",
      },
      {
        name: "Zoryn Pay",
        kind: "API",
        purpose: "Payment and settlement rails",
      },
      {
        name: "Zoryn Admin",
        kind: "Web",
        purpose: "Onboarding, liability, fraud, GDPR requests, audit logs",
      },
    ],
    userTypes: [
      {
        type: "Consumer",
        useCase: "Collects and spends rewards without a plastic card.",
      },
      {
        type: "Local retailer",
        useCase: "Runs a stamp-card campaign for \u20ac29/month.",
      },
      {
        type: "Hospitality venue",
        useCase: "Drives midweek footfall with targeted offers.",
      },
      {
        type: "Online merchant",
        useCase: "Adds cashback at checkout.",
      },
      {
        type: "Family administrator",
        useCase: "Shares points with family members and sets child limits.",
      },
      {
        type: "Merchant staff",
        useCase: "Scans and redeems at the till with a staff-only login.",
      },
      {
        type: "Affiliate/card partner",
        useCase: "Funds manufacturer or network promotions and reconciles them.",
      },
      {
        type: "Platform admin",
        useCase: "Approves campaigns, manages settlement and rewards liability.",
      },
    ],
    competitors: [
      {
        name: "Payback",
        strength: "Enormous coalition scale and partner base",
        counter: "Local independents cannot join Payback economically; we serve the Kiez with self-serve pricing and no minimum spend",
      },
      {
        name: "Deutschlandcard",
        strength: "Retail chain distribution",
        counter: "Wallet plus payment in one, geo-triggered local offers, and merchant self-service instead of enterprise sales cycles",
      },
    ],
    risks: [
      {
        risk: "Consumer cold start",
        mitigation: "Launch Kiez by Kiez alongside KIEZIO merchants \u2014 shared local sales force.",
      },
      {
        risk: "Payment licensing",
        mitigation: "Operate under a partnered BaFin-licensed e-money institution rather than seeking our own licence at launch.",
      },
    ],
    currentMarket: {
      howServed: "German loyalty is dominated by Payback (\u224831m users) and Deutschlandcard, both coalition schemes for large chains. Independents use paper stamp cards or nothing; digital challengers (Stocard/Klarna) only store cards, they don't run campaigns.",
      users: "\u224845m Germans hold at least one loyalty card; \u2248600,000 independent retail and hospitality businesses are unserved.",
      revenue: "\u2248\u20ac2.6bn loyalty and rewards market; \u2248\u20ac350m/yr addressable in SME loyalty and local advertising.",
    },
  },
  {
    id: "marktpass",
    name: "MARKTPASS",
    region: "DE",
    tagline: "EU marketplace compliance operating system",
    domain: "marktpass.de",
    description: "Compliance OS for products sold into the EU: GPSR, EPR, WEEE, packaging and battery registrations, responsible-person data and per-marketplace documentation, verified before you ship.",
    market: "\u22481.4m EU marketplace sellers affected by GPSR and EPR; \u2248\u20ac1.2bn compliance-services market.",
    audience: "Amazon/eBay sellers, D2C brands, importers, marketplace operators.",
    color: "#0f766e",
    defaultLaunchMonth: 20,
    defaultInitialUsers: 150,
    defaultUserGrowth: 0.19,
    defaultArpu: 169,
    defaultChurn: 0.02,
    defaultAddlRevenue: 10000,
    defaultDirectCost: 7000,
    reason: "Since GPSR came into force, marketplaces delist non-compliant listings automatically, and EPR/LUCID registration failures carry five-figure fines. Most sellers manage this in a spreadsheet and find out when their listings go dark.",
    proposition: "One product record generates every required EU compliance artefact \u2014 GPSR responsible person, LUCID/EPR numbers, WEEE and battery registration, declarations of conformity, labelling \u2014 and pushes them straight into Amazon, eBay, Kaufland and Otto seller accounts.",
    features: [
      "Product compliance passport per SKU",
      "GPSR responsible-person management",
      "LUCID / EPR packaging registration and reporting",
      "WEEE and battery registration tracking",
      "Declaration of conformity generator",
      "Marketplace attribute push (Amazon, eBay, Kaufland, Otto)",
      "Delisting risk alerts before enforcement",
      "Multi-country registration in 27 member states",
      "Document vault with audit history",
      "Supplier document chasing workflows",
    ],
    apps: [
      {
        name: "MarktPass Console",
        kind: "SaaS",
        purpose: "Product records and registrations",
      },
      {
        name: "MarktPass Sync",
        kind: "API",
        purpose: "Marketplace and ERP integrations",
      },
      {
        name: "MarktPass Vault",
        kind: "Web",
        purpose: "Certificates and audit trail",
      },
      {
        name: "MarktPass Admin",
        kind: "Admin",
        purpose: "Registration filing operations",
      },
    ],
    userTypes: [
      {
        type: "Amazon seller",
        useCase: "Keeps listings live through GPSR enforcement.",
      },
      {
        type: "D2C brand",
        useCase: "Registers packaging and WEEE across the EU.",
      },
      {
        type: "Importer",
        useCase: "Acts as responsible person with documented evidence.",
      },
      {
        type: "Marketplace operator",
        useCase: "Bulk-verifies its seller base.",
      },
    ],
    competitors: [
      {
        name: "Lizenzero / Reclay",
        strength: "Established packaging-licensing incumbents",
        counter: "We cover the whole compliance stack \u2014 GPSR, WEEE, batteries, DoCs and marketplace push \u2014 not just packaging licence sales",
      },
      {
        name: "Avask / Taxdoo",
        strength: "Strong VAT and seller-services brand",
        counter: "Product-level compliance automation rather than consultancy hours; software pricing, not per-filing professional fees",
      },
    ],
    risks: [
      {
        risk: "Regulation changes faster than the product",
        mitigation: "In-house regulatory analyst plus a rules engine designed for versioned requirement sets.",
      },
      {
        risk: "Liability for filings",
        mitigation: "Filings are made in the seller's name with clear scope; PI insurance and audited processes.",
      },
    ],
    currentMarket: {
      howServed: "Sellers buy packaging licences from Lizenzero or Reclay, WEEE from Take-e-way, and pay consultants (Avask, Taxdoo) or lawyers for GPSR. Nothing links a product record to marketplace listing data, so enforcement arrives as a surprise delisting.",
      users: "\u22481.4m sellers into the EU; \u2248500,000 directly exposed to German LUCID/WEEE duties.",
      revenue: "\u2248\u20ac1.2bn EU compliance-services spend, growing sharply with GPSR and the Digital Product Passport.",
    },
  },
  {
    id: "dishbee",
    name: "DISHBEE",
    region: "UK",
    tagline: "Online ordering, EPOS and KDS for food businesses",
    domain: "dishbee.co.uk",
    description: "The platform brand (landlord) behind our own St Albans venue: Caf\u00e9 1 St Albans runs as a tenant on Dishbee. Online ordering and delivery storefront, EPOS till, kitchen display, inventory and loyalty in one system, sold to independent food businesses worldwide.",
    market: "\u22488m independent food businesses worldwide; \u2248$28bn restaurant-technology market.",
    audience: "Caf\u00e9s, takeaways, small chains, dark kitchens, food trucks.",
    color: "#ef4444",
    defaultLaunchMonth: 21,
    defaultInitialUsers: 280,
    defaultUserGrowth: 0.2,
    defaultArpu: 79,
    defaultChurn: 0.025,
    defaultAddlRevenue: 16000,
    defaultDirectCost: 9000,
    reason: "Independents pay Deliveroo, Uber Eats and Just Eat 25-35% commission, then pay again for an EPOS, again for a KDS and again for loyalty. Caf\u00e9 1 is one system that keeps the order \u2014 and the customer \u2014 direct.",
    proposition: "A single subscription covering commission-free online ordering on the venue's own domain, EPOS, kitchen display, inventory and loyalty, multi-currency and multi-language \u2014 battle-tested in a live caf\u00e9 before it was ever sold.",
    features: [
      "Commission-free online ordering storefront",
      "EPOS till with offline mode",
      "Kitchen display system with prep timings",
      "Menu management with modifiers and allergens",
      "Inventory and recipe costing",
      "Delivery zones, driver dispatch and tracking",
      "Loyalty, vouchers and campaigns",
      "Table ordering via QR code",
      "Multi-site and franchise reporting",
      "Marketplace connectors (Deliveroo, Uber Eats, Just Eat)",
    ],
    apps: [
      {
        name: "Caf\u00e9 1 Storefront",
        kind: "Web",
        purpose: "Branded ordering site",
      },
      {
        name: "Caf\u00e9 1 EPOS",
        kind: "SaaS",
        purpose: "Till, payments, staff",
      },
      {
        name: "Caf\u00e9 1 KDS",
        kind: "Web",
        purpose: "Kitchen display screens",
      },
      {
        name: "Caf\u00e9 1 Driver",
        kind: "Android",
        purpose: "Delivery dispatch and proof",
      },
      {
        name: "Caf\u00e9 1 Orders",
        kind: "API",
        purpose: "Marketplace and payment integrations",
      },
    ],
    userTypes: [
      {
        type: "Caf\u00e9 owner",
        useCase: "Takes direct orders and keeps the 30% commission.",
      },
      {
        type: "Kitchen staff",
        useCase: "Works from a clear KDS instead of paper tickets.",
      },
      {
        type: "Customer",
        useCase: "Orders from the venue's own site with loyalty points.",
      },
      {
        type: "Multi-site operator",
        useCase: "Compares sites and menus centrally.",
      },
    ],
    competitors: [
      {
        name: "Square / Toast",
        strength: "Complete hardware + software ecosystems",
        counter: "No hardware lock-in \u2014 runs on any tablet \u2014 and online ordering plus KDS included rather than as paid modules; markets Toast does not serve",
      },
      {
        name: "Deliveroo / Uber Eats",
        strength: "Massive consumer demand",
        counter: "We do not compete for demand, we recapture margin: venues keep marketplace listings and push repeat customers to their own commission-free storefront",
      },
    ],
    risks: [
      {
        risk: "Payment processing dependency",
        mitigation: "Multiple PSPs by region (Stripe, Adyen, local acquirers).",
      },
      {
        risk: "Hardware support burden",
        mitigation: "Bring-your-own-tablet model with certified device list and remote support only.",
      },
    ],
    currentMarket: {
      howServed: "Independents run a legacy till (Epos Now, Lightspeed) plus one or more delivery marketplaces at 25-35% commission, with a separate loyalty app and paper kitchen tickets. Direct online ordering, when it exists, is a basic Wix or marketplace-owned page.",
      users: "\u22488m independent food businesses globally; \u22482m already pay for restaurant software.",
      revenue: "\u2248$28bn restaurant-technology market, plus \u2248$150bn of marketplace commission that direct ordering can claw back.",
    },
  },
  {
    id: "dubaitrips",
    name: "DUBAITRIPS4U",
    region: "INT",
    tagline: "Dubai experiences, tours and adventure booking",
    domain: "dubaitrips4u.com",
    description: "Curated Dubai and UAE experience marketplace: desert safaris, water sports, theme parks, dining and city tours with instant confirmation and clear pricing.",
    market: "\u224818m annual visitors to Dubai; \u2248$5.5bn tours and activities spend.",
    audience: "Leisure tourists, GCC weekenders, corporate incentive groups, hotel concierges.",
    color: "#f59e0b",
    defaultLaunchMonth: 23,
    defaultInitialUsers: 380,
    defaultUserGrowth: 0.2,
    defaultArpu: 35,
    defaultChurn: 0.05,
    defaultAddlRevenue: 18000,
    defaultDirectCost: 9000,
    reason: "Dubai's activity market is a maze of resellers marking up the same desert safari four times. DUBAITRIPS4U buys direct from operators, publishes one honest price and confirms instantly.",
    proposition: "Direct operator contracts, instant confirmation, hotel pickup included and transparent all-in pricing \u2014 plus a B2B channel selling the same inventory to hotels, concierges and travel agents on commission.",
    features: [
      "Curated experience catalogue with real photography",
      "Instant confirmation and e-tickets",
      "Hotel pickup and transfer included",
      "All-in pricing with no checkout surprises",
      "Multi-day itinerary bundles",
      "B2B concierge and agent portal",
      "Operator dashboard with availability and payouts",
      "Multi-currency and multi-language (EN/AR/RU/DE)",
      "Reviews with verified-booking badges",
      "Group and corporate incentive bookings",
    ],
    apps: [
      {
        name: "DubaiTrips4U",
        kind: "Web",
        purpose: "Consumer marketplace",
      },
      {
        name: "DubaiTrips Operator",
        kind: "SaaS",
        purpose: "Availability, manifests, payouts",
      },
      {
        name: "DubaiTrips Agent",
        kind: "Web",
        purpose: "B2B booking and commission",
      },
      {
        name: "DubaiTrips Mobile",
        kind: "iOS",
        purpose: "Tickets and itinerary",
      },
    ],
    userTypes: [
      {
        type: "Tourist",
        useCase: "Books a desert safari with pickup, confirmed instantly.",
      },
      {
        type: "Concierge",
        useCase: "Books guest activities and earns commission.",
      },
      {
        type: "Operator",
        useCase: "Fills seats without paying a 30% OTA fee.",
      },
      {
        type: "Corporate planner",
        useCase: "Books a 60-person incentive programme.",
      },
    ],
    competitors: [
      {
        name: "GetYourGuide",
        strength: "Global brand and SEO dominance",
        counter: "Direct operator contracts mean lower prices on identical products, plus a B2B concierge channel GetYourGuide does not prioritise",
      },
      {
        name: "Viator / Klook",
        strength: "Huge inventory and app installs",
        counter: "Dubai depth: local operator relationships, Arabic and Russian support, and hotel pickup as standard rather than an add-on",
      },
    ],
    risks: [
      {
        risk: "OTA price undercutting",
        mitigation: "B2B concierge channel and operator exclusivity deals reduce direct price exposure.",
      },
      {
        risk: "Seasonality (summer heat)",
        mitigation: "Indoor and GCC-resident product mix plus summer discounting to smooth demand.",
      },
    ],
    currentMarket: {
      howServed: "Tourists book via GetYourGuide, Viator, Klook, hotel concierges or street resellers, often paying 2-4x the operator's net rate. Operators depend on OTA commission of 25-30% and manual WhatsApp bookings from agents.",
      users: "\u224818m annual visitors; \u224860% buy at least one paid experience.",
      revenue: "\u2248$5.5bn tours and activities spend in the UAE; \u2248$1.6bn booked online.",
    },
  },
  {
    id: "marocways",
    name: "MAROCWAYS",
    region: "INT",
    tagline: "Morocco tours, riads and desert holidays",
    domain: "marocways.com",
    description: "Curated Morocco travel marketplace: Sahara desert tours, riad stays, city breaks and private drivers, bookable online with clear itineraries and verified local operators.",
    market: "\u224817m annual visitors to Morocco (2030 World Cup driving growth); \u2248$11bn tourism revenue.",
    audience: "European and North American leisure travellers, groups, honeymooners, diaspora.",
    color: "#c2410c",
    defaultLaunchMonth: 24,
    defaultInitialUsers: 320,
    defaultUserGrowth: 0.2,
    defaultArpu: 45,
    defaultChurn: 0.05,
    defaultAddlRevenue: 15000,
    defaultDirectCost: 8000,
    reason: "Morocco travel is booked through WhatsApp with agencies whose prices change per enquiry, and quality varies wildly. MAROCWAYS verifies operators, fixes prices and takes payment securely.",
    proposition: "Verified local operators, fixed published prices, secure card payment with deposit protection and 24/7 in-destination support \u2014 with an operator SaaS layer giving Moroccan agencies the booking system they never had.",
    features: [
      "Curated multi-day desert and city itineraries",
      "Verified riad and hotel inventory",
      "Private driver and 4x4 booking",
      "Fixed pricing with deposit and balance schedule",
      "Secure card payment with buyer protection",
      "24/7 WhatsApp in-destination support",
      "Operator dashboard with availability and payouts",
      "Group and honeymoon packages",
      "Multi-language (EN/FR/ES/AR/DE)",
      "Traveller reviews with verified stays",
    ],
    apps: [
      {
        name: "MarocWays",
        kind: "Web",
        purpose: "Consumer marketplace and booking",
      },
      {
        name: "MarocWays Operator",
        kind: "SaaS",
        purpose: "Inventory, bookings, payouts",
      },
      {
        name: "MarocWays Concierge",
        kind: "API",
        purpose: "WhatsApp support automation",
      },
      {
        name: "MarocWays Mobile",
        kind: "iOS",
        purpose: "Itinerary and vouchers",
      },
    ],
    userTypes: [
      {
        type: "Leisure traveller",
        useCase: "Books a 5-day Sahara tour with a verified operator.",
      },
      {
        type: "Honeymoon couple",
        useCase: "Books riads and transfers as one package.",
      },
      {
        type: "Local operator",
        useCase: "Sells online with card payment for the first time.",
      },
      {
        type: "Diaspora visitor",
        useCase: "Arranges family transport and stays.",
      },
    ],
    competitors: [
      {
        name: "Viator / GetYourGuide",
        strength: "Trust and global distribution",
        counter: "Multi-day Morocco itineraries and riad inventory they barely carry, sourced direct so prices beat theirs",
      },
      {
        name: "Local WhatsApp agencies",
        strength: "Cheap and personal",
        counter: "Verified quality, fixed prices, card payment and buyer protection \u2014 plus we give the good agencies our software instead of competing with them",
      },
    ],
    risks: [
      {
        risk: "Operator quality variance",
        mitigation: "Mystery-shopping, verified reviews and a de-listing policy with financial penalties.",
      },
      {
        risk: "Seasonal and event-driven demand spikes (World Cup 2030)",
        mitigation: "Capacity contracts locked early with core riads and transport partners.",
      },
    ],
    currentMarket: {
      howServed: "Travellers book through Viator/GetYourGuide day tours, TripAdvisor forums, or direct WhatsApp negotiation with Marrakech agencies. Payment is often cash on arrival; operators have almost no online booking technology.",
      users: "\u224817m annual visitors; \u22484m buy multi-day tours.",
      revenue: "\u2248$11bn tourism revenue; \u2248$1.3bn/yr in tours, riads and transport that could be booked online.",
    },
  },
  {
    id: "fleetsora",
    name: "FLEETSORA",
    region: "INT",
    tagline: "White-label fleet management SaaS",
    domain: "fleetsora.com",
    description: "Multi-tenant fleet management platform sold white-label: delivery companies and fleet operators launch their own branded platform with driver management, tracking, maintenance and compliance.",
    market: "\u22488m commercial fleet vehicles across the GCC and emerging markets; \u2248$12bn fleet-software market.",
    audience: "Delivery companies, logistics operators, rental fleets, corporate fleet managers.",
    color: "#3b82f6",
    defaultLaunchMonth: 25,
    defaultInitialUsers: 90,
    defaultUserGrowth: 0.19,
    defaultArpu: 299,
    defaultChurn: 0.02,
    defaultAddlRevenue: 12000,
    defaultDirectCost: 10000,
    reason: "Regional delivery and logistics firms want their own branded platform but cannot fund a two-year build. FLEETSORA lets them launch one in a week on their own domain.",
    proposition: "A true multi-tenant, white-label platform: custom branding, custom domain, per-tenant configuration and regional compliance (UAE Emirates-specific rules included), sold as SaaS per tenant plus per-vehicle pricing \u2014 a fraction of a bespoke build.",
    features: [
      "White-label branding and custom domains",
      "Multi-tenant architecture with per-tenant config",
      "Live GPS tracking and geofencing",
      "Driver profiles, licences and visa expiry tracking",
      "Job dispatch and route optimisation",
      "Vehicle maintenance schedules and cost tracking",
      "Fuel and toll (Salik/Darb) reconciliation",
      "Proof of delivery with photo and signature",
      "Compliance packs per emirate/jurisdiction",
      "Client portal and API for enterprise customers",
    ],
    apps: [
      {
        name: "Fleetsora Console",
        kind: "SaaS",
        purpose: "Fleet operations and dispatch",
      },
      {
        name: "Fleetsora Driver",
        kind: "Android",
        purpose: "Jobs, navigation, POD",
      },
      {
        name: "Fleetsora Driver",
        kind: "iOS",
        purpose: "Jobs, navigation, POD",
      },
      {
        name: "Fleetsora Tenant Admin",
        kind: "Admin",
        purpose: "Branding, users, billing",
      },
      {
        name: "Fleetsora API",
        kind: "API",
        purpose: "Telematics and ERP integration",
      },
    ],
    userTypes: [
      {
        type: "Fleet operator",
        useCase: "Runs dispatch, maintenance and compliance in one console.",
      },
      {
        type: "Driver",
        useCase: "Receives jobs and captures proof of delivery.",
      },
      {
        type: "Reseller / partner",
        useCase: "Launches a branded fleet product in its own market.",
      },
      {
        type: "Corporate client",
        useCase: "Tracks its deliveries through a client portal.",
      },
    ],
    competitors: [
      {
        name: "Samsara",
        strength: "Best-in-class telematics hardware and AI",
        counter: "Hardware-agnostic and white-label \u2014 partners sell it as their own product, at emerging-market price points Samsara will not meet",
      },
      {
        name: "Locate2u / Detrack",
        strength: "Simple, cheap delivery tracking",
        counter: "Full fleet lifecycle (maintenance, driver visas, compliance) plus multi-tenancy for resellers, not just tracking",
      },
    ],
    risks: [
      {
        risk: "Telematics hardware dependency",
        mitigation: "Hardware-agnostic integrations (Teltonika, Queclink) plus phone-only mode for light fleets.",
      },
      {
        risk: "Regional regulatory variation",
        mitigation: "Per-jurisdiction compliance packs maintained as configuration, not code.",
      },
    ],
    currentMarket: {
      howServed: "Operators use Samsara or Geotab at premium prices, cheap trackers with no software, or a spreadsheet plus WhatsApp. White-label options are rare, so regional players commission expensive bespoke builds.",
      users: "\u22488m commercial vehicles in target markets; \u224825% run any fleet software.",
      revenue: "\u2248$12bn global fleet-software market; \u2248$800m addressable in GCC and adjacent emerging markets.",
    },
  },
  {
    id: "sharedbricks",
    name: "SHAREDBRICKS",
    region: "UK",
    tagline: "Fractional property investment from $100",
    domain: "sharedbricks.co.uk",
    description: "Fractional real-estate investment platform: buy shares in regulated SPV-held properties across the UAE, Saudi Arabia, the UK and Pakistan and receive quarterly rental income.",
    market: "\u2248$280bn annual cross-border retail real-estate investment; fractional platforms hold <1%.",
    audience: "Retail investors, diaspora investors, property owners seeking partial exit, agents.",
    color: "#0891b2",
    defaultLaunchMonth: 27,
    defaultInitialUsers: 600,
    defaultUserGrowth: 0.21,
    defaultArpu: 15,
    defaultChurn: 0.03,
    defaultAddlRevenue: 24000,
    defaultDirectCost: 12000,
    reason: "Owning income property in Dubai or London needs six figures and a lawyer. SHAREDBRICKS lowers that to $100 per share with the property held in a regulated SPV and income paid quarterly.",
    proposition: "Every property sits in its own regulated SPV with published documentation, valuations and rental accounts; investors buy and sell shares on a secondary market, and owners can sell 20-60% of an asset instead of all of it. Revenue from acquisition fees, an annual management fee and secondary-market spread.",
    features: [
      "Fractional shares from $100 in SPV-held properties",
      "Quarterly rental distributions",
      "Four-country portfolio (UAE, KSA, UK, PK)",
      "Full document pack per property (title, valuation, accounts)",
      "Secondary market for share resale",
      "Automated KYC/AML and investor accreditation",
      "Portfolio dashboard with yield and capital tracking",
      "Owner partial-exit listings",
      "Sharia-compliant structures available",
      "Multi-currency funding and payouts",
    ],
    apps: [
      {
        name: "SharedBricks Invest",
        kind: "Web",
        purpose: "Browse, invest, portfolio",
      },
      {
        name: "SharedBricks Owner",
        kind: "Web",
        purpose: "List a property for partial exit",
      },
      {
        name: "SharedBricks Mobile",
        kind: "iOS",
        purpose: "Portfolio and distributions",
      },
      {
        name: "SharedBricks Admin",
        kind: "Admin",
        purpose: "SPV, compliance and distributions",
      },
    ],
    userTypes: [
      {
        type: "Retail investor",
        useCase: "Builds a diversified property portfolio from $1,000.",
      },
      {
        type: "Diaspora investor",
        useCase: "Owns income property back home without managing it.",
      },
      {
        type: "Property owner",
        useCase: "Releases equity by selling a share, not the asset.",
      },
      {
        type: "Agent",
        useCase: "Introduces stock and earns a fee.",
      },
    ],
    competitors: [
      {
        name: "Stake (UAE)",
        strength: "First-mover in Dubai fractional and regulated by DFSA",
        counter: "Multi-country portfolio (UAE, KSA, UK, PK) versus single-market exposure, plus an owner partial-exit product they do not offer",
      },
      {
        name: "Property Partner / REITs",
        strength: "Liquidity and regulatory maturity",
        counter: "Asset-level choice and transparency instead of a blind pooled fund, with lower fees than a listed REIT's cost stack",
      },
    ],
    risks: [
      {
        risk: "Securities regulation across four jurisdictions",
        mitigation: "Per-jurisdiction SPV and licensing structure with local counsel; launch sequenced by licence, not by ambition.",
      },
      {
        risk: "Secondary-market illiquidity",
        mitigation: "Market-making reserve plus a scheduled quarterly matching window with published pricing.",
      },
    ],
    currentMarket: {
      howServed: "Retail investors either buy whole property (six-figure entry, heavy admin), buy REIT units (no asset choice, layered fees), or use single-market fractional platforms like Stake and SmartCrowd in the UAE. Cross-border retail access is essentially unserved.",
      users: "\u224840m retail investors in target markets; fractional platforms serve fewer than 500,000.",
      revenue: "\u2248$280bn cross-border retail property investment; \u2248$3bn/yr addressable in platform fees.",
    },
  },
  {
    id: "stemcoach",
    name: "STEMCOACH",
    region: "INT",
    tagline: "Virtual tuition centre for STEM and language exams",
    domain: "stemcoach.app",
    description: "Exam-prep platform with 2m+ exam-style questions across Maths, Sciences, Computer Science, Economics, Humanities and IELTS, covering 50+ curricula with mock exams, mascot tutors and progress tracking.",
    market: "\u2248$120bn global private tutoring market; \u2248$14bn online exam prep.",
    audience: "Students aged 11-18, parents, schools, tutoring centres.",
    color: "#4ade80",
    defaultLaunchMonth: 29,
    defaultInitialUsers: 700,
    defaultUserGrowth: 0.21,
    defaultArpu: 19,
    defaultChurn: 0.05,
    defaultAddlRevenue: 20000,
    defaultDirectCost: 10000,
    reason: "Private tuition costs \u20ac30-\u20ac60 an hour and is priced out of reach for most families, while free question banks are unstructured and unmarked. STEMCOACH delivers structured, curriculum-mapped practice for the price of one hour of tutoring per year.",
    proposition: "Two million exam-style questions mapped to 50+ curricula (GCSE, A-Level, IB, Abitur, CBSE, AP), AI-marked with worked solutions, adaptive difficulty, timed mock exams and a parent progress dashboard \u2014 plus a schools tier for whole-class deployment.",
    features: [
      "2m+ curriculum-mapped exam-style questions",
      "50+ curricula (GCSE, A-Level, IB, Abitur, AP, CBSE)",
      "AI marking with step-by-step worked solutions",
      "Adaptive difficulty and spaced repetition",
      "Timed mock exams with grade prediction",
      "12 mascot tutors for engagement and streaks",
      "IELTS and language exam preparation",
      "Parent progress dashboard",
      "Teacher class assignment and analytics",
      "Offline practice packs and printable worksheets",
    ],
    apps: [
      {
        name: "STEMCoach Web",
        kind: "Web",
        purpose: "Practice, mocks, analytics",
      },
      {
        name: "STEMCoach Mobile",
        kind: "iOS",
        purpose: "Practice on the go",
      },
      {
        name: "STEMCoach Mobile",
        kind: "Android",
        purpose: "Practice on the go",
      },
      {
        name: "STEMCoach Schools",
        kind: "SaaS",
        purpose: "Class assignment and reporting",
      },
      {
        name: "STEMCoach Parent",
        kind: "Web",
        purpose: "Progress and spend tracking",
      },
    ],
    userTypes: [
      {
        type: "Student",
        useCase: "Practises to a predicted grade with instant marking.",
      },
      {
        type: "Parent",
        useCase: "Sees real progress instead of guessing.",
      },
      {
        type: "Teacher",
        useCase: "Sets differentiated homework in two minutes.",
      },
      {
        type: "Tutoring centre",
        useCase: "Uses the bank as its curriculum backbone.",
      },
    ],
    competitors: [
      {
        name: "Save My Exams / Physics & Maths Tutor",
        strength: "Trusted UK revision brands and SEO",
        counter: "Breadth across 50+ international curricula plus AI marking and adaptive practice, not static PDFs",
      },
      {
        name: "Khan Academy",
        strength: "Free and globally trusted",
        counter: "Exam-board specificity, timed mocks with grade prediction and parent reporting \u2014 the outcome layer free content never provides",
      },
    ],
    risks: [
      {
        risk: "Free content commoditising practice questions",
        mitigation: "Value sits in marking, adaptivity, grade prediction and parent reporting, not in the questions themselves.",
      },
      {
        risk: "Seasonal exam-cycle churn",
        mitigation: "Annual plans, school contracts and non-exam-season language products (IELTS) smooth revenue.",
      },
    ],
    currentMarket: {
      howServed: "Families pay \u00a325-\u00a360/hour for tutors or use free resources (Save My Exams, PMT, Khan Academy, past papers). Schools buy Sparx, MyMaths or Kerboodle for single subjects. Nothing spans multiple curricula with AI marking at a consumer price.",
      users: "\u2248300m secondary students in target markets; \u224840m pay for exam preparation.",
      revenue: "\u2248$14bn online exam-prep spend, plus \u2248$120bn in offline tutoring being displaced.",
    },
  },
  {
    id: "zorynnexus",
    name: "ZORYN PAY",
    region: "DE",
    tagline: "Money, payments and rewards infrastructure",
    domain: "zorynpay.de",
    description: "The payments and money layer behind the iTechLounge group: merchant payments, wallets, payouts, multi-currency settlement and rewards infrastructure exposed as APIs to our brands and third parties.",
    market: "\u2248$2.3tn global payments revenue; embedded-finance platforms hold a fast-growing share.",
    audience: "Group brands, external merchants, marketplaces, platform partners.",
    color: "#facc15",
    defaultLaunchMonth: 31,
    defaultInitialUsers: 70,
    defaultUserGrowth: 0.18,
    defaultArpu: 499,
    defaultChurn: 0.015,
    defaultAddlRevenue: 22000,
    defaultDirectCost: 14000,
    reason: "Fourteen brands taking money in six countries would otherwise mean fourteen payment integrations, fourteen reconciliations and fourteen compliance surfaces. ZORYN PAY is one rail for the whole group \u2014 and a product we can sell.",
    proposition: "Payments, wallets, escrow, split payouts, multi-currency settlement and rewards issuing as a single API. It cuts the group's blended payment cost, funds itself internally, and is sold externally to marketplaces that need escrow and split payouts without building them.",
    features: [
      "Card, SEPA, open banking and wallet acceptance",
      "Escrow and milestone release",
      "Split payouts to sellers and providers",
      "Multi-currency settlement and FX",
      "Merchant onboarding with KYB/KYC",
      "Rewards and cashback issuing",
      "Subscription billing and dunning",
      "Chargeback and dispute handling",
      "Unified reconciliation and ledger",
      "Reporting and revenue-share automation",
    ],
    apps: [
      {
        name: "Zoryn Nexus API",
        kind: "API",
        purpose: "Payments, payouts, wallets",
      },
      {
        name: "Zoryn Console",
        kind: "SaaS",
        purpose: "Merchant onboarding and reporting",
      },
      {
        name: "Zoryn Ledger",
        kind: "Admin",
        purpose: "Reconciliation and settlement",
      },
      {
        name: "Zoryn Checkout",
        kind: "Web",
        purpose: "Hosted checkout and wallet",
      },
    ],
    userTypes: [
      {
        type: "Group brand",
        useCase: "Plugs in payments and payouts in days, not months.",
      },
      {
        type: "External marketplace",
        useCase: "Gets escrow and split payouts without building them.",
      },
      {
        type: "Merchant",
        useCase: "Onboards, sells and gets settled in one console.",
      },
      {
        type: "Finance team",
        useCase: "Reconciles every brand in a single ledger.",
      },
    ],
    competitors: [
      {
        name: "Stripe Connect",
        strength: "Best-in-class developer experience and coverage",
        counter: "We ride on licensed rails but add escrow, rewards issuing and group-level reconciliation; internally we capture the margin Stripe would keep",
      },
      {
        name: "Adyen for Platforms",
        strength: "Enterprise scale and unified commerce",
        counter: "Faster onboarding for small marketplaces and vertical features (milestone escrow, rewards) that enterprise processors treat as custom work",
      },
    ],
    risks: [
      {
        risk: "Regulatory licensing",
        mitigation: "Operate as a technical layer on partnered licensed institutions (e-money and acquiring) rather than holding funds ourselves at launch.",
      },
      {
        risk: "Concentration risk on one acquirer",
        mitigation: "Multi-acquirer routing with automatic failover.",
      },
    ],
    currentMarket: {
      howServed: "Each platform integrates Stripe, Adyen or a local acquirer directly, then builds escrow, split payouts and reconciliation itself. Rewards and loyalty run on entirely separate systems with no shared ledger.",
      users: "\u224830m merchants globally on platform payment rails; group-internal volume alone reaches eight figures by Year 2.",
      revenue: "\u2248$2.3tn global payments revenue; group-internal savings of \u2248\u20ac1.2m/yr at scale plus external platform fees.",
    },
  },
  {
    id: "onyngo",
    name: "ONYNGO",
    region: "UK",
    tagline: "0% commission food ordering, EPOS and delivery",
    domain: "onyngo.com",
    description: "A flat-fee ordering and delivery platform for restaurants, takeaways, grocery shops and pharmacies. £4.99+VAT per day per site with zero order commission, bundling an own-branded storefront, EPOS till, kitchen display, self-order kiosk, QR pay-at-table, driver dispatch and wholesale supplier ordering.",
    market: "≈60,000 UK takeaways and ≈150,000 hospitality sites; ≈£13bn of online food delivery orders each year.",
    audience: "Independent restaurants and takeaways, grocery shops, pharmacies, wholesale suppliers, delivery drivers.",
    color: "#7c3aed",
    defaultLaunchMonth: 6,
    defaultInitialUsers: 180,
    defaultUserGrowth: 0.19,
    defaultArpu: 149,
    defaultChurn: 0.03,
    defaultAddlRevenue: 12000,
    defaultDirectCost: 9000,
    reason: "Marketplaces take 14–30% of every order, so on an £18 basket a site loses £5.40 before food cost, and the customer relationship stays with the marketplace. ONYNGO replaces the percentage with a flat daily fee and hands the customer data back to the operator.",
    proposition: "Flat £4.99+VAT per day per site, 0% order commission and a two-month free trial. EPOS, KDS, kiosk, loyalty, marketing and driver dispatch are included, so most sites remove £150–£400/month of separate software as well as commission.",
    features: [
      "Own-branded ordering storefront and app",
      "0% order commission, flat daily fee",
      "EPOS till with receipt printing",
      "Kitchen display system (KDS)",
      "Self-order kiosk mode",
      "QR dine-in ordering and pay at table",
      "Own drivers plus our driver network",
      "ONYNGO Mix — bundled multi-vendor delivery",
      "Loyalty, promo codes and winback campaigns",
      "Wholesale supplier catalogues and ordering",
      "Live payouts and settlement dashboard",
      "Grocery and pharmacy catalogue management",
    ],
    apps: [
      { name: "ONYNGO Order", kind: "Web", purpose: "Customer ordering storefront" },
      { name: "ONYNGO Customer", kind: "iOS", purpose: "Ordering, rewards and tracking" },
      { name: "ONYNGO POS", kind: "SaaS", purpose: "EPOS, KDS and kiosk for sites" },
      { name: "ONYNGO Drive", kind: "Android", purpose: "Driver dispatch and proof of delivery" },
      { name: "ONYNGO Supply", kind: "Web", purpose: "Wholesale supplier catalogues and invoices" },
      { name: "ONYNGO Admin", kind: "Admin", purpose: "Onboarding, payouts and moderation" },
    ],
    userTypes: [
      { type: "Independent takeaway", useCase: "Moves repeat customers off marketplaces and keeps 100% of the basket." },
      { type: "Restaurant with dine-in", useCase: "Runs QR table ordering, kiosk and kitchen display on one till." },
      { type: "Grocery shop or pharmacy", useCase: "Lists a full catalogue with stock tracking and local delivery." },
      { type: "Wholesale supplier", useCase: "Takes trade orders and invoices from local sites commission-free." },
      { type: "Delivery driver", useCase: "Picks up batched local jobs with transparent per-drop pay." },
    ],
    competitors: [
      { name: "Just Eat", strength: "Huge consumer demand and brand recall", counter: "We charge 0% commission versus 14%+ and give the operator the customer data, so their repeat orders stop being rented" },
      { name: "Uber Eats / Deliveroo", strength: "Fast logistics network and app scale", counter: "Operators can use their own drivers or ours, keep the margin, and get EPOS, KDS and kiosk bundled instead of paying 30% plus four software subscriptions" },
      { name: "Square / Lightspeed EPOS", strength: "Mature till hardware and payments", counter: "One flat daily fee covers ordering, till, KDS, kiosk and delivery together rather than per-module pricing" },
    ],
    risks: [
      { risk: "Consumer demand generation is harder without a marketplace brand", mitigation: "Demand is seeded from each site's existing customer base, QR table traffic and group cross-promotion, so orders do not depend on us buying category-level demand." },
      { risk: "Driver supply in quiet areas", mitigation: "Hybrid model: sites can use their own drivers, and ONYNGO Mix batches nearby drops to keep driver earnings viable." },
    ],
    currentMarket: {
      howServed: "Independent sites list on Just Eat, Uber Eats and Deliveroo at 14–30% commission, then buy a separate EPOS, kitchen display, kiosk and loyalty tool. They never own the customer record, so every repeat order is charged again.",
      users: "≈60,000 takeaways and ≈150,000 hospitality sites; ≈25m UK adults order food online.",
      revenue: "≈£13bn of online delivery orders a year, of which ≈£2.5bn is taken as marketplace commission.",
    },
  },
  {
    id: "hmoflow",
    name: "HMO FLOW",
    region: "UK",
    tagline: "Lettings and compliance OS for HMOs and rent-to-rent",
    domain: "hmoflow.co.uk",
    description: "An end-to-end platform for HMO landlords, rent-to-rent operators and letting agencies: room-level lettings, tenant referencing and applications, deposits, rent collection and arrears chasing, maintenance, inspections, EPC and licence compliance, notices and full audit trails.",
    market: "≈510,000 HMOs in England and Wales, ≈4.6m private rented homes; ≈£2bn spent on lettings and property management software and services.",
    audience: "HMO landlords, rent-to-rent operators, head landlords, letting agencies, tenants and guarantors.",
    color: "#0ea5e9",
    defaultLaunchMonth: 7,
    defaultInitialUsers: 150,
    defaultUserGrowth: 0.18,
    defaultArpu: 89,
    defaultChurn: 0.025,
    defaultAddlRevenue: 8000,
    defaultDirectCost: 6000,
    reason: "Mainstream property software is built around whole-property tenancies, so HMO operators track rooms, licences, EPCs, fire-safety checks and per-room arrears in spreadsheets. One missed licence condition can cost a rent-repayment order worth twelve months of rent.",
    proposition: "Room-level by design: every room has its own tenancy, rent ledger, deposit, compliance certificate and inspection history, with automated arrears chasing and a licence and safety calendar that produces evidence packs for the council.",
    features: [
      "Room-level tenancies and rent ledgers",
      "Applications, referencing and guarantors",
      "Deposit registration and move-out deductions",
      "Automated arrears chasing and payment plans",
      "HMO licence, EPC, gas and fire-safety calendar",
      "Inspection scheduler with photo evidence",
      "Maintenance jobs and contractor assignment",
      "Notices and document templates",
      "Head-landlord splits for rent-to-rent deals",
      "Banking reconciliation and expenses",
      "Room marketplace and public listings",
      "Full audit log and analytics",
    ],
    apps: [
      { name: "HMO Flow Manager", kind: "SaaS", purpose: "Portfolio, tenancies, rent and compliance" },
      { name: "HMO Flow Tenant", kind: "Web", purpose: "Apply, pay rent, report issues" },
      { name: "HMO Flow Inspect", kind: "iOS", purpose: "On-site inspections and photo evidence" },
      { name: "HMO Flow Listings", kind: "Web", purpose: "Public room listings and applications" },
      { name: "HMO Flow Admin", kind: "Admin", purpose: "Agency accounts, audit and reporting" },
    ],
    userTypes: [
      { type: "HMO landlord", useCase: "Runs twelve rooms across three houses with per-room arrears visibility." },
      { type: "Rent-to-rent operator", useCase: "Tracks head-landlord rent out, tenant rent in and the margin per property." },
      { type: "Letting agency", useCase: "Manages client portfolios with compliance evidence packs per property." },
      { type: "Tenant", useCase: "Applies, signs, pays rent and reports maintenance in one place." },
      { type: "Contractor", useCase: "Receives jobs, uploads before-and-after photos, gets paid." },
    ],
    competitors: [
      { name: "Arthur Online", strength: "Established lettings platform with integrations", counter: "Built room-first rather than property-first, with HMO licensing, fire safety and rent-to-rent head-landlord splits as native objects instead of workarounds" },
      { name: "Alto / Reapit", strength: "Deep agency workflows and market share", counter: "Priced for small operators, self-serve onboarding in a day, and no per-branch enterprise contract" },
      { name: "Spreadsheets and Landlord Vision", strength: "Cheap and familiar", counter: "Automated compliance deadlines and arrears chasing prevent rent-repayment orders that dwarf the subscription cost" },
    ],
    risks: [
      { risk: "Regulatory change across councils", mitigation: "Licence conditions are configuration, not code, so per-council schemes and Wales/Scotland variations are updated as data." },
      { risk: "Client money handling expectations", mitigation: "Rent flows through regulated payment partners with client-money segregation; we never hold funds ourselves." },
    ],
    currentMarket: {
      howServed: "HMO operators combine spreadsheets, WhatsApp, a bank app and generic landlord software that assumes one tenancy per property. Compliance dates live in personal calendars and evidence is reassembled by hand when a council inspects.",
      users: "≈510,000 HMOs; ≈2.2m private landlords and ≈16,000 letting agency branches.",
      revenue: "≈£80bn of annual private rent; ≈£2bn spent on lettings software, referencing and compliance services.",
    },
  },
  {
    id: "nafsi",
    name: "NAFSI",
    region: "INT",
    tagline: "Islamic mental wellbeing and Qur'an companion app",
    domain: "nafsi.app",
    description: "A mobile-first wellbeing companion for Muslims worldwide: AI emotional support chat, mood and nafs tracking, a dua library with Arabic, transliteration and translation, Islamic mindfulness and breathwork, journaling, Qur'an reading and AI-assisted Surah/Ayah guidance — in 14 languages.",
    market: "≈2bn Muslims globally with ≈750m smartphone users; ≈$5.5bn mental-wellness app market plus a fast-growing Islamic app category.",
    audience: "Global Muslim consumers, families, students and diaspora communities; non-clinical, non-fatwa wellbeing support.",
    color: "#10b981",
    defaultLaunchMonth: 5,
    defaultInitialUsers: 4000,
    defaultUserGrowth: 0.22,
    defaultArpu: 1.2,
    defaultChurn: 0.05,
    defaultAddlRevenue: 4000,
    defaultDirectCost: 5000,
    reason: "Muslims seeking emotional support face a gap: mainstream wellbeing apps ignore faith, while Islamic apps stop at prayer times and Qur'an text. Nafsi sits between them — emotional reflection grounded in Islamic practice, explicitly not therapy and not fatwa.",
    proposition: "Free download, seven-day trial, then a deliberately low yearly subscription with regional pricing (from ≈£0.99/yr equivalent) so volume, not price, drives revenue. Massive reach at near-zero marginal cost creates a top-of-funnel audience for the wider group.",
    features: [
      "AI emotional support chat with safety guardrails",
      "Mood and nafs tracking with trends",
      "Dua library: Arabic, transliteration, 14 languages",
      "Islamic mindfulness, breathwork and bedtime audio",
      "Journaling and guided reflections",
      "Qur'an reading, audio and learning paths",
      "AI Surah/Ayah guidance finder",
      "Guided duas and adhkar with audio",
      "Family sharing and invites",
      "Courses and academy content",
      "Offline caching for low-bandwidth regions",
      "Crisis signposting to local resources",
    ],
    apps: [
      { name: "Nafsi", kind: "iOS", purpose: "Full companion app" },
      { name: "Nafsi", kind: "Android", purpose: "Full companion app" },
      { name: "Nafsi Web", kind: "Web", purpose: "Reading, journaling and account management" },
      { name: "Nafsi Admin", kind: "Admin", purpose: "Content review, audio pipeline and moderation" },
    ],
    userTypes: [
      { type: "Young adult", useCase: "Uses AI chat and journaling during anxiety or low mood." },
      { type: "Parent", useCase: "Shares bedtime audio and duas with children via family sharing." },
      { type: "Revert or new learner", useCase: "Follows guided Qur'an and adhkar learning paths." },
      { type: "Diaspora user", useCase: "Reads duas in Urdu, Turkish or Bahasa alongside Arabic." },
      { type: "Grieving user", useCase: "Uses grief support flows and funeral-rites guidance." },
    ],
    competitors: [
      { name: "Muslim Pro", strength: "Enormous installed base and prayer-time habit", counter: "We lead with emotional wellbeing and AI reflection rather than utility features, and charge a tiny yearly fee instead of heavy ad monetisation" },
      { name: "Calm / Headspace", strength: "Premium production and brand", counter: "Faith-native content in 14 languages at a fraction of the price, in markets their pricing excludes entirely" },
      { name: "Quran apps (Tarteel, Quran.com)", strength: "Deep recitation and memorisation tooling", counter: "We combine Qur'an guidance with mood tracking, duas and mindfulness in one companion rather than a single-purpose tool" },
    ],
    risks: [
      { risk: "Religious sensitivity and AI accuracy", mitigation: "Strict scope: no fatwas, rulings, medical or therapy advice; scholar-reviewed content library and refusal guardrails in the AI layer." },
      { risk: "Very low ARPU", mitigation: "Costs are dominated by shared group infrastructure; volume pricing plus family plans and later premium tiers lift revenue per household." },
    ],
    currentMarket: {
      howServed: "Users juggle a prayer-time app, a separate Qur'an app and a Western wellbeing app that ignores faith. Emotional support is largely informal — family, WhatsApp groups or nothing — and paid wellbeing apps are priced out of most Muslim-majority markets.",
      users: "≈2bn Muslims; ≈100m+ installs across the leading Islamic apps.",
      revenue: "≈$1bn Islamic app category revenue, mostly advertising; ≈$5.5bn global mental-wellness app spend.",
    },
  },
  {
    id: "haccora-uk",
    name: "HACCORA UK",
    region: "UK",
    tagline: "Commission-free food-safety OS, marketplace and CRM for UK hospitality",
    domain: "haccorauk.itechlounge.co.uk",
    description: "The UK edition of HACCORA (Haccora Connect): digital HACCP diaries, fridge and probe temperature logs, allergen matrices (Natasha's Law), cleaning schedules and audit-ready evidence packs mapped to the FSA's Safer Food, Better Business framework and the Food Hygiene Rating Scheme — plus a commission-free marketplace of verified auditors, pest-control firms, hygiene trainers, equipment engineers and suppliers, and a full operator CRM for sites, staff, suppliers and inspections.",
    market: "≈290,000 UK food businesses inspected by local authorities; ≈£350m food-safety and compliance software spend.",
    audience: "Restaurants, pubs, cafés, takeaways, hotels, schools, care kitchens, small chains.",
    color: "#16a34a",
    defaultLaunchMonth: 6,
    defaultInitialUsers: 150,
    defaultUserGrowth: 0.18,
    defaultArpu: 59,
    defaultChurn: 0.02,
    defaultAddlRevenue: 4000,
    defaultDirectCost: 4500,
    reason: "UK operators must prove due diligence under the Food Safety Act and keep SFBB records, yet most still run paper diaries that go missing before an Environmental Health inspection. A dropped hygiene rating costs covers and, with Natasha's Law, allergen mistakes carry criminal liability.",
    proposition: "One flat subscription per site, no commission and no per-user fees: staff sign off checks on a phone or tablet in seconds, Bluetooth probes and fridge sensors log automatically, allergen matrices generate from recipes, and a single tap produces the evidence pack an EHO asks for. The same subscription includes the CRM (sites, staff, suppliers, contractors, incidents) and the verified services marketplace — operators book audits, training, pest control and servicing at the provider's own price, because we take nothing from the booking. Reuses the German HACCORA engine, so UK pricing undercuts incumbents.",
    pricing: [
      "Single Site £29.99/mo — HACCP diaries, allergen matrices, cleaning schedules, unlimited staff sign-offs, inspection evidence pack",
      "Site Pro £59.99/mo — adds sensor and Bluetooth probe logging, corrective-action escalation, training records, supplier CRM",
      "Multi-Site £149/mo (up to 5 sites) — group dashboard, hygiene risk scoring, brand-wide templates, area-manager roles",
      "Group / Enterprise £399/mo+ — unlimited sites, SSO, API and EPOS/rota integrations, dedicated onboarding, franchise reporting",
      "Zero commission on marketplace bookings — auditors, trainers, pest control and engineers keep 100% of their fee",
      "Optional verified-provider listing £19/mo for suppliers and contractors; sensors and probes resold at cost",
      "Free 2-month trial on every tier, monthly rolling, no tie-in",
    ],
    features: [
      "SFBB-aligned daily and weekly check diaries",
      "Bluetooth probe and fridge sensor logging",
      "Natasha's Law allergen matrices from recipes",
      "Cleaning schedules with photo evidence",
      "Delivery and supplier acceptance checks",
      "Corrective actions with escalation alerts",
      "Staff training records and sign-off",
      "Multi-site dashboard with hygiene risk scoring",
      "One-tap inspection evidence pack (PDF)",
      "EPOS and rota integrations",
      "Commission-free marketplace of verified auditors, trainers, pest control and equipment engineers",
      "Operator CRM: sites, staff, suppliers, contractors, incidents and renewal reminders",
      "Quote requests and booking workflow with documents, certificates and expiry tracking",
      "Role-aware portals for owners, chefs, staff, contractors and EHOs",
      "Offline-first mobile capture that syncs when signal returns",
    ],
    apps: [
      { name: "HACCORA UK Manager", kind: "Web", purpose: "Owner and multi-site compliance dashboard" },
      { name: "HACCORA UK Kitchen", kind: "iOS", purpose: "Staff check-list app for iPad in the kitchen" },
      { name: "HACCORA UK Kitchen", kind: "Android", purpose: "Same, on Android tablets" },
      { name: "HACCORA Probes", kind: "API", purpose: "Ingestion API for temperature sensors" },
      { name: "HACCORA Admin", kind: "Admin", purpose: "Internal ops and support console" },
      { name: "HACCORA Marketplace", kind: "Web", purpose: "Commission-free directory and booking of verified compliance services" },
      { name: "HACCORA CRM", kind: "Web", purpose: "Sites, staff, suppliers, contractors, certificates and renewals" },
      { name: "HACCORA Partner", kind: "iOS", purpose: "Auditor, trainer and engineer app for jobs, reports and certificates" },
    ],
    userTypes: [
      { type: "Independent owner", useCase: "Checks all sites are compliant from a phone before opening." },
      { type: "Head chef", useCase: "Signs off opening, closing and probe checks during service." },
      { type: "Kitchen porter", useCase: "Completes cleaning tasks with photo proof." },
      { type: "Area manager", useCase: "Compares hygiene risk scores across a group." },
      { type: "Environmental Health Officer", useCase: "Reviews a shared read-only evidence pack during inspection." },
      { type: "Auditor or hygiene trainer", useCase: "Wins work through the marketplace commission-free and files reports in the partner app." },
      { type: "Pest control or equipment engineer", useCase: "Receives jobs, uploads certificates and sets service intervals against each site." },
      { type: "Franchise or group compliance lead", useCase: "Rolls out brand templates and tracks every site's evidence and expiry dates in the CRM." },
    ],
    competitors: [
      { name: "Trail", strength: "Strong UK brand with multi-site chains", counter: "Half the price for independents, with sensor logging and allergen matrices included rather than sold as add-ons" },
      { name: "Navitas / Safer Food Group", strength: "Established audit and training services", counter: "Self-serve onboarding in under an hour instead of a consultant-led rollout, and no long tie-in" },
      { name: "Paper SFBB diaries", strength: "Free and familiar", counter: "Automatic logs remove missed entries, and the inspection pack is generated instantly instead of reconstructed" },
      { name: "Checkit / Kitchen CUT", strength: "Enterprise sensor hardware and kitchen management suites", counter: "Flat per-site pricing with hardware sold at cost, and the CRM plus marketplace included rather than a six-figure enterprise contract" },
      { name: "Compliance consultancies and lead-gen directories", strength: "Trusted local relationships and inspection know-how", counter: "We list the same providers with verified credentials and charge zero commission, so operators pay less and providers keep their full fee" },
    ],
    risks: [
      { risk: "Low willingness to pay among small independents", mitigation: "Entry tier priced below a single missed-check fine, plus group and franchise deals to win sites in batches." },
      { risk: "Hardware dependency on probes and sensors", mitigation: "Manual entry always works; sensors are optional hardware resold at cost to accelerate adoption." },
      { risk: "Marketplace supply is thin at launch in some regions", mitigation: "Seed verified providers city by city alongside site sign-ups, and keep compliance value standalone so the platform is useful before the marketplace fills." },
      { risk: "No commission means slower marketplace monetisation", mitigation: "Marketplace is a retention and acquisition engine for the flat subscription; optional verified listings add margin without taxing bookings." },
    ],
    currentMarket: {
      howServed: "Most UK kitchens still use FSA paper SFBB packs or a wall clipboard, with photos of fridge dials in a WhatsApp group, and find auditors, trainers and pest control through word of mouth or commission-taking directories. Digital adoption is concentrated in chains using Trail, Navitas or Checkit; independents are largely unserved and no incumbent joins compliance, CRM and a services marketplace in one subscription.",
      users: "≈290,000 registered food businesses; ≈40,000 sites on any digital food-safety system.",
      revenue: "≈£120m/yr digital food-safety software spend; the rest sits in paper, consultants, retraining and fines.",
    },
  },
];

// ---------- Brand groups: one brand name, two entities, separate income & costs ----------

export type BrandGroup = {
  id: string;
  name: string;
  blurb: string;
  /** brand ids, DE entity first */
  entities: string[];
};

export const BRAND_GROUPS: BrandGroup[] = [
  {
    id: "kinderstars",
    name: "KINDERSTARS",
    blurb: "One brand, two entities: kinderstars24.de (GmbH, Germany) and kinderstars.co.uk (Ltd, UK) — separate revenue, costs, marketing and P&L.",
    entities: ["kinderstars", "kinderstarsuk"],
  },
  {
    id: "haccora",
    name: "HACCORA",
    blurb: "One brand, two entities: haccora.de (Germany) and haccora.co.uk (UK) — separate revenue, costs, marketing and P&L.",
    entities: ["haccora", "haccora-uk"],
  },
  {
    id: "eventplanr",
    name: "EVENTPLANR",
    blurb: "One brand, two entities: eventplanr.de (Germany) and eventplanr.co.uk (UK) — separate revenue, costs, marketing and P&L.",
    entities: ["eventplanrger", "eventplanruk"],
  },
  {
    id: "xpertjobs",
    name: "STELLENXPERT / XPERTJOBS",
    blurb: "One recruitment product under two market names: stellenxpert.de (Germany) and xpertjobs.co.uk (UK) — separate revenue, costs, marketing and P&L.",
    entities: ["stellenxpert", "xpertjobs"],
  },
  {
    id: "dokuvera",
    name: "DOKUVERA",
    blurb: "One brand, two entities: dokuvera.de (Germany) and dokuvera.co.uk (UK) — separate revenue, costs, marketing and P&L.",
    entities: ["docuvera-de", "docuvera-uk"],
  },
  {
    id: "craftvaro",
    name: "CRAFTVARO",
    blurb: "One brand, two entities: craftvaro.de (Germany) and craftvaro.co.uk (UK) — separate revenue, costs, marketing and P&L.",
    entities: ["craftvaro-de", "craftvaro-uk"],
  },
  {
    id: "zivvo",
    name: "ZIVVO",
    blurb: "One brand, two entities: zivvo.de (Germany) and zivvo.co.uk (UK) — separate revenue, costs, marketing and P&L.",
    entities: ["zivvo", "zivvouk"],
  },
];

/** International travel network operated under the TraveNexia platform — all .com, sold cross-border. */
export const TRAVENEXA_FAMILY: string[] = [
  "travenexa",
  "farenivo",
  "hexareve",
  "bosporiva",
  "eastamira",
  "rangvaya",
  "savansea",
  "nilevella",
  "marelyra",
  "corazora",
  "fiftyroam",
  "canavelle",
  "oceavela",
  "adrilume",
  "iberaviva",
  "euralume",
  "niyyahnoor",
  "qiyavo",
  "uzvoya",
  "nimah",
  "dubaitrips",
  "marocways",
];

type BrandOverride = Partial<Pick<Brand, "region" | "domain" | "group" | "entityLabel" | "family">>;

const de = (domain: string, group?: string): BrandOverride => ({
  region: "DE",
  domain,
  ...(group ? { group, entityLabel: `Germany · ${domain}` } : {}),
});
const uk = (domain: string, group?: string): BrandOverride => ({
  region: "UK",
  domain,
  ...(group ? { group, entityLabel: `United Kingdom · ${domain}` } : {}),
});

const OVERRIDES: Record<string, BrandOverride> = {
  kinderstars: de("kinderstars24.de", "kinderstars"),
  kinderstarsuk: uk("kinderstars.co.uk", "kinderstars"),
  haccora: de("haccora.de", "haccora"),
  "haccora-uk": uk("haccora.co.uk", "haccora"),
  eventplanrger: de("eventplanr.de", "eventplanr"),
  eventplanruk: uk("eventplanr.co.uk", "eventplanr"),
  stellenxpert: de("stellenxpert.de", "xpertjobs"),
  xpertjobs: uk("xpertjobs.co.uk", "xpertjobs"),
  "docuvera-de": de("dokuvera.de", "dokuvera"),
  "docuvera-uk": uk("dokuvera.co.uk", "dokuvera"),
  "craftvaro-de": de("craftvaro.de", "craftvaro"),
  "craftvaro-uk": uk("craftvaro.co.uk", "craftvaro"),
  // ZIVVO is a dual-market brand: zivvo.de (Germany) and zivvo.co.uk (UK).
  zivvo: de("zivvo.de", "zivvo"),
  zivvouk: uk("zivvo.co.uk", "zivvo"),
  // Germany-only brands (single market for now).
  rettio: de("rettio.de"),
  kiezio: de("kiezio.de"),
  zorynnexus: de("zorynpay.de"),
  zoryn: de("zorynrewards.de"),
  marktpass: de("marktpass.de"),
  parkpunkt: de("parkpunkt.de"),
  traindirekt: de("traindirekt.de"),
  immoviq: de("immoviq.de"),
  beinstandplus: de("beistandplus.de"),
  beratermarkt: de("beratermarkt.de"),
  viazeno: de("viazeno.de"),
  stylesyncger: de("schonova.de"),
  // UK-only brands (single market for now).
  cirqiva: uk("cirqiva.co.uk"),
  motoresq: uk("motoresq.co.uk"),
  premisora: uk("premisora.co.uk"),
  lessonahead: uk("lessonahead.co.uk"),
  gabley: uk("gabley.co.uk"),
  gableyretrofit: uk("gableyretrofit.co.uk"),
  dearnext: uk("dearnext.co.uk"),
  hmoflow: uk("hmoflow.co.uk"),
  saathera: uk("saathera.co.uk"),
  sharedbricks: uk("sharedbricks.co.uk"),
  skillfinch: uk("skillfinch.co.uk"),
  amityos: uk("amityos.co.uk"),
  stylesyncuk: uk("stylesync.uk"),
  traderos: uk("traderos.co.uk"),
  // Travel brands are international .com properties running on the TraveNexia platform.
  hexareve: { region: "INT", domain: "hexareve.com" },
  bosporiva: { region: "INT", domain: "bosporiva.com" },
  eastamira: { region: "INT", domain: "eastamira.com" },
  rangvaya: { region: "INT", domain: "rangvaya.com" },
  savansea: { region: "INT", domain: "savansea.com" },
  nilevella: { region: "INT", domain: "nilevella.com" },
  marelyra: { region: "INT", domain: "marelyra.com" },
  autohashi: { region: "UK", domain: "autohashi.com" },
  baytcircle: { region: "INT", domain: "baytcircle.com" },
};

/* Baseline assumptions applied to every brand (adjustable per brand in the UI):
   100 sign-ups at launch, 15% monthly growth, 3% cancellations, no additional
   revenue, EUR 2,000 expenses per brand per month, EUR 39/mo in Germany and
   international markets, GBP 39/mo (~EUR 45) in the UK. */
export const BRANDS: Brand[] = [...BASE_BRANDS, ...EXTRA_BRANDS, AFFIVON_BRAND].map((b) => {
  const merged: Brand = { ...b, ...OVERRIDES[b.id], ...BRAND_CONTENT_OVERRIDES[b.id] };
  if (TRAVENEXA_FAMILY.includes(b.id)) merged.family = "TRAVENEXA";
  if (merged.revenueUnit !== "affiliate-order" && !merged.preserveFinancialDefaults) {
    merged.defaultInitialUsers = 100;
    merged.defaultUserGrowth = 0.15;
    merged.defaultChurn = 0.03;
    merged.defaultAddlRevenue = 0;
    merged.defaultDirectCost = 2000;
    merged.defaultArpu = merged.region === "UK" ? 45 : 39;
  }
  merged.payerModel = brandPayerModel(merged);
  const keepDetailedSingleSidePricing = merged.id === "athlyvo" || merged.id === "criclume";
  merged.pricing = keepDetailedSingleSidePricing ? merged.pricing : merged.payerModel.pricing;
  merged.monetisation = keepDetailedSingleSidePricing ? merged.monetisation : merged.payerModel.monetisation;
  merged.currentMarket = { ...merged.currentMarket, revenue: merged.payerModel.investorRevenue };
  return merged;
});

export function brandById(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id);
}

export function groupOf(b: Brand): BrandGroup | undefined {
  return b.group ? BRAND_GROUPS.find((g) => g.id === b.group) : undefined;
}

/** Sister entity in the same brand group, if any. */
export function siblingOf(b: Brand): Brand | undefined {
  const g = groupOf(b);
  if (!g) return undefined;
  const otherId = g.entities.find((id) => id !== b.id);
  return otherId ? brandById(otherId) : undefined;
}
