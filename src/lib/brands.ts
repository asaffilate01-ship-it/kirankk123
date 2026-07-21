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
};

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
    defaultLaunchMonth: 1,
    defaultInitialUsers: 120,
    defaultUserGrowth: 0.18,
    defaultArpu: 79,
    defaultChurn: 0.02,
    defaultAddlRevenue: 3000,
    defaultDirectCost: 4500,
    color: "#22c55e",
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
    defaultLaunchMonth: 1,
    defaultInitialUsers: 200,
    defaultUserGrowth: 0.2,
    defaultArpu: 29,
    defaultChurn: 0.03,
    defaultAddlRevenue: 2500,
    defaultDirectCost: 5000,
    color: "#f59e0b",
  },
  {
    id: "eventplanrger",
    name: "EventPlanrGER",
    tagline: "All-in-one event planning platform for Germany",
    description:
      "Venue discovery, vendor marketplace, guest management, RSVP, budgeting and vendor payments for weddings, corporate events and private celebrations.",
    market: "€8bn German event industry; 400k weddings + 1.2m corporate events / yr.",
    audience: "Couples, HR event managers, private hosts, small event agencies.",
    competitors: [
      { name: "eventinc", strength: "Venue inventory", counter: "Zero-commission flat €49/mo for vendors vs €200+ per-lead fees; full guest management stack" },
    ],
    defaultLaunchMonth: 2,
    defaultInitialUsers: 150,
    defaultUserGrowth: 0.17,
    defaultArpu: 49,
    defaultChurn: 0.04,
    defaultAddlRevenue: 4000,
    defaultDirectCost: 4200,
    color: "#a855f7",
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
    defaultLaunchMonth: 2,
    defaultInitialUsers: 180,
    defaultUserGrowth: 0.16,
    defaultArpu: 39,
    defaultChurn: 0.05,
    defaultAddlRevenue: 2000,
    defaultDirectCost: 3800,
    color: "#10b981",
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
    defaultLaunchMonth: 3,
    defaultInitialUsers: 220,
    defaultUserGrowth: 0.2,
    defaultArpu: 25,
    defaultChurn: 0.04,
    defaultAddlRevenue: 3500,
    defaultDirectCost: 3500,
    color: "#06b6d4",
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
    defaultLaunchMonth: 3,
    defaultInitialUsers: 140,
    defaultUserGrowth: 0.15,
    defaultArpu: 89,
    defaultChurn: 0.02,
    defaultAddlRevenue: 4500,
    defaultDirectCost: 4200,
    color: "#6366f1",
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
    defaultLaunchMonth: 4,
    defaultInitialUsers: 130,
    defaultUserGrowth: 0.18,
    defaultArpu: 99,
    defaultChurn: 0.03,
    defaultAddlRevenue: 5000,
    defaultDirectCost: 4800,
    color: "#ec4899",
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
    defaultLaunchMonth: 4,
    defaultInitialUsers: 100,
    defaultUserGrowth: 0.16,
    defaultArpu: 59,
    defaultChurn: 0.03,
    defaultAddlRevenue: 3200,
    defaultDirectCost: 3800,
    color: "#0ea5e9",
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
    defaultLaunchMonth: 5,
    defaultInitialUsers: 110,
    defaultUserGrowth: 0.14,
    defaultArpu: 69,
    defaultChurn: 0.02,
    defaultAddlRevenue: 3800,
    defaultDirectCost: 4000,
    color: "#f43f5e",
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
    defaultLaunchMonth: 6,
    defaultInitialUsers: 90,
    defaultUserGrowth: 0.15,
    defaultArpu: 79,
    defaultChurn: 0.03,
    defaultAddlRevenue: 4200,
    defaultDirectCost: 3600,
    color: "#eab308",
  },
];