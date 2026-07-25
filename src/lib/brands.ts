export type Brand = {
  id: string;
  name: string;
  tagline: string;
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
  apps: { name: string; kind: "SaaS" | "Web" | "iOS" | "Android" | "API" | "Admin"; purpose: string }[];
  userTypes: { type: string; useCase: string }[];
  risks: { risk: string; mitigation: string }[];
  currentMarket: {
    howServed: string;
    users: string;
    revenue: string;
  };
};

// Shared platform advantage — identical for every brand, injected into detail page.
export const SHARED_ADVANTAGE: string[] = [
  "One cloud infrastructure (Hetzner + Cloudflare, DE-hosted)",
  "One engineering team shipping across all 10 products",
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
export const BRANDS: Brand[] = [
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
    tagline: "All-in-one event planning platform for Germany",
    description:
      "Venue discovery, vendor marketplace, guest management, RSVP, budgeting and vendor payments for weddings, corporate events and private celebrations.",
    market: "€8bn German event industry; 400k weddings + 1.2m corporate events / yr.",
    audience: "Couples, HR event managers, private hosts, small event agencies.",
    competitors: [
      { name: "eventinc", strength: "Venue inventory", counter: "Zero-commission flat €49/mo for vendors vs €200+ per-lead fees; full guest management stack" },
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
    domain: "eventplanr.de",
    reason:
      "Planning an event in Germany means juggling 8-12 tools: venue portals, spreadsheet budgets, WhatsApp with vendors, PDF RSVPs. Vendors pay per-lead fees (€200+ per enquiry) with no conversion guarantee. EVENTPLANR unifies planners and vendors on one platform, replacing per-lead extortion with a flat subscription.",
    proposition:
      "Planners get end-to-end event OS — venue search, vendor marketplace, budget tracker, guest list, RSVP, seating chart and vendor payments. Vendors pay a flat €49/mo to appear, respond and get paid. No commission, no per-lead fees.",
    features: [
      "Filterable venue search (capacity, PLZ, price, style)",
      "Vendor marketplace: catering, DJ, florist, photographer",
      "Budget tracker with actuals vs plan",
      "Digital RSVP with dietary & song requests",
      "Interactive seating chart",
      "Escrow vendor payments (funds released on event day)",
      "Guest communication (e-mail + WhatsApp templates)",
      "Vendor CRM & availability calendar",
    ],
    apps: [
      { name: "EVENTPLANR Studio", kind: "Web", purpose: "Full planner workspace" },
      { name: "EVENTPLANR Guest", kind: "Web", purpose: "RSVP microsite per event" },
      { name: "EVENTPLANR Vendor", kind: "Web", purpose: "Vendor inbox, calendar, payments" },
      { name: "EVENTPLANR Mobile", kind: "iOS", purpose: "On-the-day coordination for planners" },
      { name: "EVENTPLANR Mobile Android", kind: "Android", purpose: "Same, on Android" },
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
    tagline: "Neighborhood discovery & local business directory",
    description:
      "Hyper-local discovery app — kiez by kiez. Niche filters (halal/kosher, prayer times, LGBTQ+ safe, wheelchair, pet-friendly), verified reviews, and community curation.",
    market: "3.5m local businesses in Germany; €2bn local-marketing spend.",
    audience: "Urban residents, expats, tourists; local SMB owners.",
    competitors: [
      { name: "Google Business", strength: "Ubiquity & maps", counter: "Niche filters Google won't ship, community-curated lists, DE-hosted privacy story" },
    ],
    currentMarket: {
      howServed:
        "Google Maps and Google Business Profiles are the de-facto directory (~3m verified DE profiles). Gelbe Seiten and Das Örtliche linger with older users. Niche communities (halal, LGBTQ+, wheelchair, expats) rely on Reddit, Facebook groups and Yelp threads. No mainstream player ships the niche filters community actually wants.",
      users: "≈3m local SMB profiles claimed on Google; ≈45m active local-search users in Germany.",
      revenue: "≈€2bn local-marketing spend/yr in DE (Google Ads local + directory ads + Yelp / Gelbe Seiten combined).",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 220,
    defaultUserGrowth: 0.2,
    defaultArpu: 25,
    defaultChurn: 0.04,
    defaultAddlRevenue: 3500,
    defaultDirectCost: 3500,
    color: "#06b6d4",
    domain: "kiezio.de",
    reason:
      "Google Maps is generic — it won't tell you which café is halal, wheelchair-accessible, or has a Wickeltisch. Yelp never took off in DE. Expats and niche communities rely on Reddit threads and Facebook groups. KIEZIO is the discovery layer for real neighbourhood needs, with DE-hosted privacy Google can't match.",
    proposition:
      "Filter local businesses by the criteria that actually matter — halal, kosher, LGBTQ+ safe, ramp access, pet-friendly, prayer times, breastfeeding-friendly, cash-only vs card. Community-verified, ad-free for consumers, businesses pay €25/mo for a verified profile and analytics.",
    features: [
      "40+ niche filters no other directory ships",
      "Community-verified attributes (crowd + moderator sign-off)",
      "Kiez-scoped feeds (Neukölln, Prenzlberg, Schanze, etc.)",
      "Prayer-time widget per venue",
      "Verified business profile with photos & menus",
      "Owner-response inbox",
      "Local business analytics (views, calls, directions)",
      "Curated community lists ('Best Wickelraum-Cafés in Kreuzberg')",
    ],
    apps: [
      { name: "KIEZIO", kind: "iOS", purpose: "Consumer discovery app" },
      { name: "KIEZIO Android", kind: "Android", purpose: "Same, on Android" },
      { name: "KIEZIO Business", kind: "Web", purpose: "SMB owner profile & analytics" },
      { name: "KIEZIO Moderation", kind: "Admin", purpose: "Community moderation console" },
    ],
    userTypes: [
      { type: "Expat resident", useCase: "Finds an English-speaking dentist with wheelchair access in Mitte." },
      { type: "Muslim family", useCase: "Filters halal restaurants with prayer-friendly hours." },
      { type: "Local business owner", useCase: "Claims profile, responds to reviews, sees weekly analytics." },
      { type: "Tourist", useCase: "Discovers curated 'locals-only' spots per kiez." },
    ],
    risks: [
      { risk: "Google adds niche filters", mitigation: "Community-owned data + DE privacy narrative is a brand moat Google can't clone quickly." },
      { risk: "Fake reviews", mitigation: "Verified-purchase reviews via Rettio/EventPlanr integrations; community mod team." },
      { risk: "Cold-start in new cities", mitigation: "Bootstrapped via KINDERSTARS + RETTIO + BERATERMARKT merchants already on the group platform." },
    ],
  },
  {
    id: "beratermarkt",
    name: "BERATERMARKT",
    tagline: "Cross-professional advisor marketplace",
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
    domain: "beratermarkt.de",
    reason:
      "SMBs need lawyer + tax advisor + auditor + bookkeeper working together, but each hides behind a single-profession portal. Clients repeat their story four times and pay four onboarding fees. BERATERMARKT is one client dashboard, one document vault, cross-referrals baked in.",
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
    ],
    apps: [
      { name: "BERATERMARKT Advisor", kind: "Web", purpose: "Advisor workspace & referrals" },
      { name: "BERATERMARKT Client", kind: "Web", purpose: "Client dashboard & documents" },
      { name: "BERATERMARKT Client Mobile", kind: "iOS", purpose: "On-the-go document upload & signing" },
      { name: "BERATERMARKT Vault", kind: "API", purpose: "GoBD document API for DATEV / lexoffice" },
    ],
    userTypes: [
      { type: "Steuerberater", useCase: "Receives referrals from partner lawyers; bills via portal." },
      { type: "Rechtsanwalt", useCase: "Shares client docs securely, tracks mandate progress." },
      { type: "SMB owner", useCase: "One dashboard for tax return, contract review, audit." },
      { type: "Consumer", useCase: "Books an initial 30-min consult with a vetted advisor." },
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
    tagline: "Post-listing property workflow platform",
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
    domain: "beistandplus.de",
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
    id: "konnevia",
    name: "KONNEVIA",
    tagline: "WhatsApp Workflow Platform for Germany",
    description:
      "Konnevia turns WhatsApp into a controlled business process. Every conversation becomes a case with qualification, appointment, document request, quote, payment, third-party fulfilment and follow-up — one engine sold three ways: embedded add-on inside any LoungeTech brand, standalone SaaS for independent SMEs, and a partner/white-label edition for agencies and groups.",
    market:
      "≈3.3m SMEs in Germany, ≈60m WhatsApp users; €1.8bn addressable customer-conversation SaaS TAM (WhatsApp Business Platform, helpdesk, appointment & workflow tooling).",
    audience:
      "Independent SMEs in beauty, trades, healthcare, real-estate, hospitality, automotive; in-house teams inside LoungeTech brands; agencies, consultancies and franchise groups running many client tenants.",
    competitors: [
      { name: "Superchat", strength: "Established DE WhatsApp inbox brand", counter: "Case-based workflow engine (not just an inbox), embedded distribution across 11 sister brands, and 30% cheaper standalone tier" },
      { name: "Charles", strength: "Commerce focus, Shopify integrations", counter: "Vertical workflow packs (LoungeBeauty, Trades, Care, Estate, Hosp, Auto) + § 203 StGB / DSGVO / TTDSG compliance out of the box, not just marketing sends" },
      { name: "MessageBird / Bird", strength: "Global CPaaS scale", counter: "German-hosted (Frankfurt), German AVV, DE-native templates and support — MessageBird is US/NL-run and enterprise-priced" },
      { name: "Team-Inbox tools (Trengo, Respond.io)", strength: "Multi-channel inbox", counter: "Not just a shared inbox: full case state machine, SLA, approvals, escrow-style quote→pay→reconcile, and Meta-approved template governance" },
    ],
    currentMarket: {
      howServed:
        "German SMEs run customer conversations across private WhatsApp on the owner's phone, e-mail, and paper. The digital 10-15% split between Superchat and Charles (WhatsApp-first inboxes), Trengo/Respond.io (multi-channel inboxes) and enterprise CPaaS (MessageBird, Twilio). None of them ship case management, quote-to-pay, third-party fulfilment or vertical workflow packs — those live in separate CRMs, invoicing tools and spreadsheets. § 203 StGB and DSGVO obligations are largely ignored on private phones.",
      users:
        "≈3.3m SMEs in DE, ≈60m WhatsApp users; ≈250k SMEs use a paid WhatsApp Business tool today, ≈3m still on private WhatsApp or e-mail.",
      revenue:
        "≈€420m/yr paid WhatsApp Business + inbox SaaS spend in DE; the wider customer-conversation & workflow stack SMEs already buy (CRM, ticketing, appointment, invoicing) is ≈€1.8bn/yr — Konnevia consolidates that stack.",
    },
    defaultLaunchMonth: 3,
    defaultInitialUsers: 260,
    defaultUserGrowth: 0.19,
    defaultArpu: 99,
    defaultChurn: 0.02,
    defaultAddlRevenue: 6000,
    defaultDirectCost: 5200,
    color: "#25D366",
    domain: "konnevia.de",
    reason:
      "German SMEs already run their business on WhatsApp — but on private phones, with no audit trail, no consent management, no SLA and no compliance with § 203 StGB / DSGVO / TTDSG. Existing tools are either shared inboxes (no workflow) or enterprise CPaaS (too expensive). Konnevia gives every SME — and every LoungeTech brand — a compliant, case-based WhatsApp workflow engine that turns chats into revenue.",
    proposition:
      "One engine, three surfaces. (1) Embedded add-on inside a LoungeTech brand at €29/€69/€149 per month — shared login, data and billing with the host product. (2) Standalone SaaS at €49/€99/€249 for independent SMEs — own tenant, own number, own inbox, workflows and staff app. (3) Partner edition from €499/mo for agencies and groups — multi-tenant, delegated support, branding and commission accounting built in. Every tier ships DSGVO-first, EU-hosted, with Meta-approved template governance and § 203 StGB safeguards.",
    features: [
      "Case state machine: intake → qualify → quote → schedule → fulfil → follow-up",
      "Unified inbox: AI, agent, manager, partner — one thread, different views",
      "AI drafting, triage and data capture with human-in-the-loop on regulated steps",
      "Vertical workflow packs (Beauty, Trades, Care, Estate, Hosp, Auto) pre-installed",
      "Consent, purpose-binding, frequency caps and DSGVO event log",
      "Secure portal links (short-lived signed URLs) for IDs, invoices, contracts",
      "Roles & approvals: Owner, Admin, Manager, Agent, Finance, Compliance, Partner",
      "Third-party fulfilment: bring in partners, scope data, track SLAs",
      "Meta-approved template governance with versioning, sign-off and rollback",
      "Quote → approval → send → collect → reconcile flow with SEPA + card",
      "Analytics: automation rate, CSAT, SLA breaches, revenue attribution",
      "White-label: brand, domain, from-name and templates per tenant",
    ],
    apps: [
      { name: "Konnevia Workspace", kind: "Web", purpose: "Agent + manager console: inbox, cases, workflows, analytics" },
      { name: "Konnevia Staff", kind: "iOS", purpose: "On-the-go staff app for field agents and technicians" },
      { name: "Konnevia Staff Android", kind: "Android", purpose: "Same, on Android" },
      { name: "Konnevia Portal", kind: "Web", purpose: "Customer-facing secure portal for uploads, quotes and payments" },
      { name: "Konnevia Partner", kind: "SaaS", purpose: "Agency multi-tenant console with commissions and branding" },
      { name: "Konnevia Cloud API", kind: "API", purpose: "WhatsApp Cloud API + workflow engine for embedded use inside LoungeTech brands" },
      { name: "Konnevia Admin", kind: "Admin", purpose: "Trust, safety, template governance, break-glass access review" },
    ],
    userTypes: [
      { type: "SME owner", useCase: "Sees every customer conversation and case in one compliant workspace instead of on a private phone." },
      { type: "Agent / receptionist", useCase: "Runs qualification, quotes and appointments from WhatsApp with AI drafts." },
      { type: "Manager / operations", useCase: "Tracks SLA, automation rate and revenue per workflow across the team." },
      { type: "Compliance / finance", useCase: "Audits every message, consent and payment; exports DSGVO records on demand." },
      { type: "Partner / agency", useCase: "Runs many client tenants with delegated support, branding and commission accounting." },
      { type: "LoungeTech sister brand", useCase: "Embeds Konnevia inside its own product as a native WhatsApp add-on." },
    ],
    risks: [
      { risk: "Meta policy changes on WhatsApp Business Platform", mitigation: "Authorised Meta partner path, template governance with rollback, and multi-channel fallback (SMS, e-mail, portal) so no workflow depends on a single Meta approval." },
      { risk: "Superchat / Charles compete on price on the standalone tier", mitigation: "Embedded distribution across 11 sister brands is a channel neither has; standalone tier is a lead source, not the profit centre." },
      { risk: "§ 203 StGB / DSGVO enforcement on healthcare & legal tenants", mitigation: "Purpose-bound consent, EU-only data residency, RLS, break-glass access with review, and vertical packs (LoungeCare) reviewed by in-house counsel." },
    ],
  },
];