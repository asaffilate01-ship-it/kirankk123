import type { Brand } from "./brands";

type AffiliateStoreConfig = {
  name: string;
  category: string;
  shopper: string;
  tagline: string;
  examples: string;
  color?: string;
};

function affiliateStore(config: AffiliateStoreConfig): Partial<Brand> {
  const { name, category, shopper, tagline, examples } = config;
  return {
    tagline,
    family: "AFFIVON",
    revenueUnit: "affiliate-order",
    preserveFinancialDefaults: true,
    description:
      `${name} is an international ${category} shopping and comparison website powered by Affivon. It publishes useful buying guides, comparisons and curated product collections, then sends shoppers to approved retailers such as Amazon and regional marketplace partners to complete the purchase. ${name} never holds stock or takes the customer's payment.`,
    market:
      `The ${category} category across Amazon and other major online marketplaces. Revenue depends on qualified shopping traffic, retailer coverage, order conversion and the commission offered for each product category and country.`,
    audience: shopper,
    reason:
      `Shoppers face thousands of similar ${category} products, unreliable reviews and changing prices. Most affiliate websites are thin lists built for search engines rather than useful decisions. ${name} exists to make the choice easier and more trustworthy.`,
    proposition:
      `A focused ${category} storefront with plain-English comparisons, product advantages and disadvantages, price and availability checks, clear affiliate disclosure and direct links to the retailer. The same Affivon engine controls product feeds, affiliate tracking, content, translations, link health, analytics and regional retailer routing across multiple storefronts.`,
    features: [
      `Curated ${category} collections: ${examples}`,
      "Plain-English buying guides and side-by-side comparisons",
      "Clear advantages, disadvantages and best-for recommendations",
      "Price, availability and delivery checks from approved retailers",
      "Country-aware links to the most suitable supported retailer",
      "Prominent affiliate disclosure on every commercial page",
      "No stock, warehouse, checkout or customer payment handled by the storefront",
      "Affivon product-feed imports, duplicate control and broken-link monitoring",
      "Search-friendly category, brand, product and question pages",
      "Email, social and content campaigns managed from Affivon",
      "Performance reporting by article, product, retailer, country and campaign",
    ],
    pricing: [
      "Free for shoppers — the retailer pays any affiliate commission",
      "Commission varies by retailer, product category and country and is recorded at the confirmed rate",
      "Optional sponsored placement is accepted only when clearly labelled and never changes the editorial verdict",
    ],
    positives: [
      "No stock purchase, warehouse, fulfilment, refunds or consumer payment handling",
      "One Affivon engine runs multiple focused brands, so feeds, analytics, compliance and content tools are shared rather than rebuilt for every storefront",
      "A narrow category creates more useful search pages and stronger buyer trust than a general shopping site",
      "Retailer routing allows the same content to earn across supported countries and marketplaces",
      "Content can keep earning after publication while being refreshed centrally when prices or products change",
    ],
    monetisation: [
      "Affiliate commission paid by the retailer after a referred customer completes an eligible purchase",
      "Clearly labelled sponsored buying guides and placements where editorial independence is preserved",
      "Later expansion to approved dropship suppliers only where product quality, fulfilment, returns and local consumer law are fully controlled",
    ],
    apps: [
      { name: `${name} Store`, kind: "Web", purpose: `Public ${category} guides, comparisons and curated shopping pages.` },
      { name: `${name} Mobile`, kind: "Web", purpose: "Fast mobile shopping journey with country-aware retailer links." },
      { name: "Affivon Tenant Workspace", kind: "SaaS", purpose: "Content, products, campaigns, disclosures and performance for this storefront." },
      { name: "Affivon Product Feed", kind: "API", purpose: "Imports approved retailer data and monitors product links and availability." },
      { name: "Affivon Landlord", kind: "Admin", purpose: "Controls multiple storefronts, retailer programmes, tracking, roles and compliance." },
    ],
    userTypes: [
      { type: "Shopper", useCase: `Compares ${category} products, understands the trade-offs and completes the purchase with the retailer.` },
      { type: "Content editor", useCase: "Creates and refreshes useful guides with clear sources and affiliate disclosure." },
      { type: "Portfolio manager", useCase: "Sees traffic, clicks, confirmed orders, commission and broken links across every storefront." },
      { type: "Retail partner", useCase: "Receives qualified shoppers through tracked, policy-compliant links." },
    ],
    competitors: [
      { name: "Amazon and marketplace search", strength: "Huge range, reviews and immediate checkout", counter: `${name} narrows the choice, explains trade-offs in plain English and can compare supported retailers rather than showing only one marketplace.` },
      { name: "Large review publishers", strength: "Strong search rankings and editorial teams", counter: `A focused ${category} brand can cover long-tail questions more deeply and refresh content through the shared Affivon feed.` },
      { name: "Coupon and thin affiliate sites", strength: "Large volumes of search pages", counter: "Useful original comparisons, visible disclosure and quality rules build more durable trust than copied product lists." },
    ],
    risks: [
      { risk: "Retailers can change commission rates, programme rules or product feeds", mitigation: "Affivon supports more than one approved retailer, monitors programme changes and removes or reroutes non-compliant links." },
      { risk: "Search traffic can fall after an algorithm update", mitigation: "Build email, social, referral and direct traffic alongside search, and publish genuinely useful content rather than mass-generated pages." },
      { risk: "Incorrect prices, claims or unavailable products damage trust", mitigation: "Timestamp price checks, send customers to the retailer for the final price, monitor links and require human approval for commercial claims." },
      { risk: "Affiliate disclosure or advertising rules differ by country", mitigation: "Show clear disclosure before the link and maintain country-specific templates and review rules in Affivon." },
    ],
    currentMarket: {
      howServed: `Shoppers currently search a large marketplace, read several general review websites and watch social videos before buying. The journey is fragmented and commercial relationships are not always obvious.`,
      users: `Online shoppers researching ${category} products across the UK, US, EU, India, Pakistan and Gulf markets supported by Affivon retailer programmes.`,
      revenue: "Retailers pay a category- and country-specific percentage or fixed amount for eligible referred purchases; no commission is assumed until the retailer confirms it.",
    },
    defaultInitialUsers: 500,
    defaultUserGrowth: 0.12,
    defaultArpu: 3.5,
    defaultChurn: 0,
    defaultAddlRevenue: 0,
    defaultDirectCost: 1200,
  };
}

export const AFFIVON_BRAND: Brand = {
  id: "affivon",
  name: "AFFIVON",
  region: "INT",
  domain: "affivon.com",
  tagline: "Every store. One engine.",
  family: "AFFIVON",
  preserveFinancialDefaults: true,
  description:
    "Affivon is the shared affiliate-commerce platform behind multiple focused shopping websites. One landlord dashboard controls retailer programmes, product feeds, affiliate links, content, translations, disclosures, analytics and regional routing while each storefront keeps its own name, domain and audience.",
  market:
    "Global affiliate commerce across Amazon and approved regional marketplaces, initially covering supported programmes in the UK, US, Germany, France, India, Pakistan, the UAE and Saudi Arabia.",
  audience:
    "iTechLounge portfolio managers and content teams initially; later, agencies, publishers and affiliate operators that want to launch and manage several niche storefronts from one platform.",
  color: "#6d28d9",
  defaultLaunchMonth: 20,
  defaultInitialUsers: 10,
  defaultUserGrowth: 0.1,
  defaultArpu: 99,
  defaultChurn: 0.02,
  defaultAddlRevenue: 0,
  defaultDirectCost: 3000,
  reason:
    "Running multiple affiliate websites separately would duplicate product imports, link management, analytics, disclosure rules, content workflows and technical maintenance. Affivon turns those repeated tasks into one shared operating system.",
  proposition:
    "Create and operate many independent storefronts from one engine. Each tenant gets its own domain, branding, categories and content, while Affivon manages approved retailer feeds, affiliate tags, country routing, link health, editorial workflow, search pages and commission reporting centrally.",
  features: [
    "Landlord dashboard for every storefront, country and retailer programme",
    "Separate tenant domains, branding, roles, catalogues and analytics",
    "Approved retailer feed imports with normalisation and duplicate control",
    "Affiliate-tag and deep-link management by tenant, country and campaign",
    "Country-aware routing to supported Amazon and regional marketplace programmes",
    "Broken-link, unavailable-product and stale-price monitoring",
    "Buying-guide, comparison, review and collection content studio",
    "Human approval, source notes, affiliate disclosure and advertising controls",
    "Search, email and social publishing workflows",
    "Traffic, click, order and confirmed-commission reporting",
    "Multi-language and multi-currency presentation",
    "White-label tenant onboarding for future external publishers",
  ],
  pricing: [
    "Internal portfolio edition — shared platform cost allocated across the owned storefronts",
    "Future Publisher plan — monthly subscription per storefront with usage limits",
    "Future Agency plan — multi-store allowance, team roles, client reporting and custom domains",
    "Retailer commissions belong to the relevant storefront; Affivon records and reconciles them",
  ],
  positives: [
    "One product and data engine supports multiple revenue-producing storefronts",
    "No consumer stock, warehouse, checkout, delivery or returns operation",
    "New countries, retailers and compliance changes are connected once for every tenant",
    "Portfolio reporting shows which categories, content and markets deserve further investment",
    "The landlord edition can later be licensed to other affiliate publishers and agencies",
  ],
  monetisation: [
    "Shared enablement of affiliate commission earned by the owned storefronts",
    "Future monthly subscriptions for external publishers and agencies",
    "Optional onboarding, feed integration, custom-domain and white-label fees",
  ],
  apps: [
    { name: "Affivon Landlord", kind: "Admin", purpose: "Controls tenants, retailers, users, tracking, disclosures and portfolio reporting." },
    { name: "Affivon Tenant", kind: "SaaS", purpose: "Each storefront manages products, content, campaigns and its own results." },
    { name: "Affivon Content Studio", kind: "Web", purpose: "Creates, reviews and refreshes buying guides and comparisons." },
    { name: "Affivon Feed & Link API", kind: "API", purpose: "Imports approved retailer data and produces compliant tracked links." },
  ],
  userTypes: [
    { type: "Portfolio owner", useCase: "Compares the performance and compliance of all storefronts from one dashboard." },
    { type: "Store manager", useCase: "Runs one niche brand without accessing another tenant's data." },
    { type: "Content editor", useCase: "Creates and refreshes useful commercial content with human approval." },
    { type: "Affiliate operations manager", useCase: "Maintains retailer programmes, tracking rules, disclosures and reconciliation." },
  ],
  competitors: [
    { name: "FreshStore and affiliate-store builders", strength: "Fast Amazon storefront setup", counter: "Affivon is a true multi-tenant landlord with regional retailer routing, editorial workflow, link health and consolidated reporting across many owned brands." },
    { name: "WordPress affiliate plugins", strength: "Large plugin ecosystem and low entry cost", counter: "Affivon removes plugin maintenance and gives one controlled data, compliance and analytics layer across every tenant." },
    { name: "Custom websites built separately", strength: "Complete design freedom", counter: "A shared engine cuts repeated development and makes a successful content or integration improvement available to all stores." },
  ],
  risks: [
    { risk: "Dependence on third-party retailer programmes", mitigation: "Support several approved retailers and countries, record terms per programme and never forecast unapproved partnerships." },
    { risk: "Poor or duplicated content fails to win search traffic", mitigation: "Require useful original editorial content, human approval, source notes and quality thresholds before indexing." },
    { risk: "Multiple stores could spread editorial attention too thinly", mitigation: "Launch categories in stages and use performance gates before expanding content or paid promotion." },
  ],
  currentMarket: {
    howServed: "Affiliate publishers commonly run separate WordPress sites, feeds, spreadsheets and retailer dashboards, making portfolio control and compliance difficult.",
    users: "Millions of publishers and creators use affiliate programmes, while agencies and portfolio owners increasingly operate several niche sites.",
    revenue: "The underlying market pays commissions for eligible referred sales; affiliate-platform software also earns subscriptions, setup fees and agency licences.",
  },
};

export const BRAND_CONTENT_OVERRIDES: Record<string, Partial<Brand>> = {
  merqora: {
    tagline: "Manage and grow marketplace sales",
    description:
      "Merqora is a sales-management and growth SaaS/app for sellers and agencies operating on Amazon and other online marketplaces. It brings product listings, stock, pricing, advertising, orders, account health, customer-service tasks and sales reporting into one workspace so teams can manage daily work and identify practical ways to grow.",
    market:
      "Amazon sellers, marketplace agencies and multichannel ecommerce businesses that need to manage and grow sales across several marketplace accounts, countries and product catalogues.",
    audience:
      "The paying customers are Amazon and other online-marketplace sellers, seller agencies and ecommerce teams. Shoppers and marketplace customers are not charged by Merqora.",
    reason:
      "Marketplace sellers often switch between separate seller portals, advertising screens, spreadsheets, stock systems and reporting tools. Agencies repeat the same work across client accounts, while important listing, inventory, advertising and account-health problems can be missed until sales fall.",
    proposition:
      "One clear workspace for running and improving marketplace sales. Merqora gathers authorised account data, shows the actions that need attention, helps teams improve listings and advertising, tracks stock and margins, and reports which products, marketplaces and campaigns are producing sustainable sales. The seller remains in control of every marketplace change and budget.",
    features: [
      "Connect authorised Amazon and other supported marketplace seller accounts",
      "Combined sales, orders, fees, refunds and margin reporting",
      "Product-listing quality checks and guided content improvements",
      "Inventory levels, low-stock warnings and replenishment planning",
      "Advertising performance, budget alerts and campaign action lists",
      "Buy Box, pricing and competitor-position monitoring where marketplace rules permit",
      "Account-health, policy, suppressed-listing and performance notifications",
      "Review, message and customer-service task management within marketplace rules",
      "Product and market opportunity research based on supported data",
      "Agency workspace with separate client access, roles and reporting",
      "Country, marketplace, product and campaign performance comparisons",
      "Approval history and audit trail for important account changes",
    ],
    pricing: [
      "Monthly seller subscription based on connected accounts, marketplaces, users and catalogue size",
      "Agency subscription with separate client workspaces and consolidated reporting",
      "Optional onboarding, catalogue clean-up and approved system-integration services",
      "No fee charged to shoppers and no percentage taken from the seller's marketplace sales",
    ],
    positives: [
      "Brings daily marketplace work and growth reporting into one organised system",
      "Helps agencies manage several seller accounts without mixing client data",
      "Prioritised actions help teams focus on stock, listings, advertising and account issues that affect sales",
      "Subscription income is clear to investors and does not depend on charging both sellers and shoppers",
      "Can add supported marketplaces and countries as authorised connections become available",
    ],
    monetisation: [
      "Seller subscriptions based on accounts, marketplaces, users and catalogue size",
      "Agency subscriptions for multi-client management and reporting",
      "Optional onboarding, data migration, catalogue clean-up and approved integrations",
    ],
    apps: [
      { name: "Merqora Seller", kind: "SaaS", purpose: "Listings, stock, advertising, orders, account health, tasks and sales performance in one workspace." },
      { name: "Merqora Mobile", kind: "iOS", purpose: "Urgent account, stock, order and advertising alerts with approval controls." },
      { name: "Merqora Mobile", kind: "Android", purpose: "The same marketplace monitoring and action workflow on Android." },
      { name: "Merqora Agency", kind: "SaaS", purpose: "Separate client workspaces, team roles, action tracking and consolidated agency reporting." },
      { name: "Merqora Connect", kind: "API", purpose: "Authorised marketplace and ecommerce-system connections with permissions, rate limits and audit logs." },
    ],
    userTypes: [
      { type: "Marketplace seller", useCase: "Runs products, stock, advertising and account-health work and sees where profitable sales can improve." },
      { type: "Seller agency", useCase: "Manages several client marketplace accounts through separate controlled workspaces." },
      { type: "Ecommerce manager", useCase: "Coordinates catalogue, operations, advertising and reporting across marketplaces and countries." },
      { type: "Account owner", useCase: "Approves important changes, controls permissions and reviews sales, fees and margin." },
    ],
    competitors: [
      { name: "Amazon Seller Central and other marketplace portals", strength: "Official account controls and complete marketplace data", counter: "Merqora organises authorised data and actions across supported accounts and marketplaces in one clearer operating view." },
      { name: "Jungle Scout, Helium 10 and seller-tool suites", strength: "Recognised research, listing and advertising features", counter: "Merqora focuses on one joined daily workflow for sellers and agencies, with action ownership, client separation and plain-English management reporting." },
      { name: "Spreadsheets and specialist agencies", strength: "Flexible and familiar with human expertise", counter: "Merqora gives the agency and seller a shared live task record, controlled account access and repeatable reporting without replacing human judgement." },
    ],
    risks: [
      { risk: "Marketplace APIs, permissions or policies can change", mitigation: "Use only authorised connections, monitor marketplace requirements and disable affected functions until they are compliant and reliable." },
      { risk: "Incorrect automated changes could damage listings, advertising or sales", mitigation: "Keep important changes approval based, show the evidence and expected effect, enforce budget limits and retain a complete audit trail." },
      { risk: "Sales-growth claims could create unrealistic expectations", mitigation: "Report observed actions and results without guaranteeing sales, rank, Buy Box position or advertising returns." },
    ],
    currentMarket: {
      howServed:
        "Sellers currently work inside each marketplace portal and add separate research, advertising, inventory and reporting tools. Agencies then combine client information in spreadsheets and presentations, creating repeated work and delayed decisions.",
      users:
        "Amazon and other supported marketplace sellers, marketplace agencies and multichannel ecommerce teams managing products in one or more countries.",
      revenue:
        "Merqora earns business subscriptions from sellers and agencies, plus optional onboarding and approved integration fees. Shoppers are not charged, and Merqora does not take a percentage of marketplace sales.",
    },
  },
  baytcircle: {
    tagline: "Families, activities and community in one place",
    description:
      "BaytCircle is a Gulf family-and-community hub for local residents, expatriate families and home educators. Families use it free to find trusted groups, arrange meetups and events, discover classes and activities, and book spare capacity at swimming pools, soft-play centres, sports spaces, learning venues and other family-friendly places.",
    market:
      "Family activities, home-education groups, community events and underused venue capacity across the UAE first, followed by selected Gulf cities.",
    audience:
      "Free users are parents, guardians, children, home-educating families, expatriates and local residents. Paying customers are family venues, activity providers, tutors, clubs and community organisations that claim profiles and use booking, promotion and administration tools.",
    reason:
      "Gulf cities already have many families, activities and useful venues, but information is scattered across messaging groups, social pages and individual booking systems. Families struggle to find the right local option, while pools, soft-play centres, classrooms and clubs have unsold spaces and quiet times.",
    proposition:
      "Build a trusted local directory area by area, add factual venue and activity profiles, clearly label unclaimed entries and invite each provider to claim and verify its page. Families use BaytCircle free to discover groups, organise events and book suitable activities. Providers pay for profile control, live availability, bookings, customer communication and promotion of spare or off-peak capacity, while keeping the full price of their service apart from normal payment-processing charges.",
    features: [
      "Family activity and community search by neighbourhood, age, date, language and distance",
      "Home-education groups, co-learning sessions, tutors, clubs and resource sharing",
      "Local and expatriate family groups with public, private and invitation-only membership",
      "Create meetups, family events, classes, trips and recurring activities",
      "Book spare capacity at swimming pools, soft-play centres, sports spaces, studios and learning venues",
      "Off-peak offers, waiting lists and last-minute availability controlled by the provider",
      "Pre-listed factual profiles with clear unclaimed labels and correction, claim or removal routes",
      "Provider ownership checks, verification and safeguarding information",
      "Attendance confirmation, reminders, capacity limits and family booking records",
      "English and Arabic first, with additional community languages by launch area",
      "Age, accessibility, family-facility and guardian requirements shown clearly",
      "Venue and provider dashboard for calendars, bookings, messages and utilisation",
    ],
    apps: [
      { name: "BaytCircle Family", kind: "iOS", purpose: "Discover groups and activities, organise events and manage family bookings." },
      { name: "BaytCircle Family", kind: "Android", purpose: "The same family and community journey on Android." },
      { name: "BaytCircle Provider", kind: "SaaS", purpose: "Claim profiles, publish availability, manage capacity, bookings and customer messages." },
      { name: "BaytCircle Community", kind: "Web", purpose: "Run home-education groups, clubs, meetups and community events." },
      { name: "BaytCircle Admin", kind: "Admin", purpose: "Verification, safeguarding escalation, moderation and city-by-city coverage." },
    ],
    userTypes: [
      { type: "Parent or guardian", useCase: "Finds suitable local activities, groups and available family venues without paying BaytCircle." },
      { type: "Home-educating family", useCase: "Finds co-learning groups, tutors, resources, trips and bookable spaces." },
      { type: "Expatriate or local resident", useCase: "Joins relevant community groups and family events by area, language and interest." },
      { type: "Venue or activity provider", useCase: "Claims its profile, fills spare capacity and manages availability and bookings." },
      { type: "Community organiser", useCase: "Creates safe public, private or invitation-only events and manages attendance." },
    ],
    competitors: [
      { name: "Facebook, WhatsApp and community groups", strength: "Large existing local audiences and familiar communication", counter: "BaytCircle adds structured search, verified providers, availability, bookings, age filters and a dependable event record." },
      { name: "General event and ticketing platforms", strength: "Strong ticketing and event discovery", counter: "BaytCircle is built around recurring family activity, home education, safeguarding details and nearby venue capacity rather than one-off public tickets." },
      { name: "Individual venue booking sites", strength: "Accurate information for that venue", counter: "Families compare many suitable places and activities in one local search, while smaller providers gain professional booking tools." },
    ],
    risks: [
      { risk: "Family and child safety concerns", mitigation: "Verify providers and organisers where appropriate, show safeguarding information, restrict child data, provide reporting tools and require guardian-controlled accounts." },
      { risk: "Unclaimed profiles may contain stale or incorrect information", mitigation: "Show factual public data only, mark it unclaimed, timestamp sources and provide fast correction, claim and removal routes." },
      { risk: "A city may launch without enough local activity coverage", mitigation: "Seed one neighbourhood and category cluster at a time, onboard anchor venues and home-education groups, and expand only after useful local density is reached." },
      { risk: "Local activity, advertising or venue rules vary across Gulf markets", mitigation: "Launch country by country with local legal review, provider terms and permit checks before adding each activity type." },
    ],
    currentMarket: {
      howServed:
        "Families currently search social media, messaging groups, school chats and separate venue websites. Organisers use spreadsheets and payment links, while many venues cannot easily publish quiet-time capacity to suitable nearby families.",
      users:
        "Parents, guardians, children, home educators, expatriates and local residents in Gulf cities, together with family venues, tutors, clubs and community organisations.",
      revenue:
        "BaytCircle earns only from provider and organisation subscriptions for claimed profiles, booking tools and promotion. Families use the platform free, and providers retain their activity or venue income apart from normal payment-processing charges.",
    },
  },
  beinstandplus: {
    name: "BEISTANDPLUS",
    tagline: "Practical support when life becomes complicated",
    description:
      "BeistandPlus is a guided-support platform for people and families dealing with difficult practical tasks in Germany. It brings relocation and everyday administration together with bereavement support: understanding funeral choices and likely costs, recording wishes, organising documents, comparing suitable funeral providers and finding relevant funeral-cost policies or other funding and support routes through approved partners.",
    market:
      "German employers, community organisations and service partners supporting international staff and families, plus the large recurring need for guided bereavement, funeral-cost and life-administration support.",
    audience:
      "Employers, insurers, care and community organisations buying support for staff, members or families. The people receiving relocation, administration or bereavement help use the included service without a second BeistandPlus platform fee.",
    reason:
      "Important life administration is fragmented across public offices, insurers, employers, funeral providers and paper documents. During relocation or bereavement, people often do not know what must be done, what a funeral may cost, whether a policy or public support applies, or which provider is suitable. BeistandPlus gives them one guided route and a clear record.",
    proposition:
      "One guided case with a named support route, plain-language tasks, secure documents and approved specialist partners. The platform can help a family understand funeral options and costs, compare suitable providers, check whether an existing funeral-cost policy may apply and identify possible support routes. BeistandPlus coordinates and explains; regulated insurance advice, policy sales and legal decisions remain with authorised partners.",
    features: [
      "Guided case plan for relocation, family administration, bereavement and other difficult life events",
      "Plain-language funeral choices, expected cost categories and planning checklist",
      "Funeral wishes, contacts, documents and instructions stored securely",
      "Comparison and referral to suitable verified funeral providers",
      "Check for relevant funeral-cost policies, existing cover and possible support routes",
      "Warm referral to authorised insurance, legal or benefits specialists where regulated advice is required",
      "German administration support including address registration, residence tasks, health insurance and school enrolment",
      "Multilingual guidance and human caseworker escalation",
      "Employer, insurer or community-partner dashboard with consent-based case status",
      "Document reminders, translation and appointment coordination",
    ],
    apps: [
      { name: "BeistandPlus Family", kind: "iOS", purpose: "Guided tasks, funeral planning, documents, reminders and secure support messages." },
      { name: "BeistandPlus Family", kind: "Android", purpose: "The same guided support journey on Android." },
      { name: "BeistandPlus Partner", kind: "Web", purpose: "Consent-based referrals and case progress for employers, insurers, care and community organisations." },
      { name: "BeistandPlus Support", kind: "Web", purpose: "Caseworker triage, document checks, appointments and approved-partner referrals." },
    ],
    userTypes: [
      { type: "Bereaved family", useCase: "Understands the next steps, likely funeral costs, suitable providers and possible policy or support routes." },
      { type: "Relocating employee or family", useCase: "Completes registration, insurance, school and other German administration through one guided case." },
      { type: "Employer or member organisation", useCase: "Funds practical support and sees consent-based progress without handling sensitive family details." },
      { type: "Approved specialist partner", useCase: "Receives an appropriate referral for regulated insurance, legal, benefits or funeral services." },
    ],
    competitors: [
      { name: "Funeral comparison and planning websites", strength: "Focused provider information and funeral planning", counter: "BeistandPlus joins funeral costs and provider comparison to policies, documents, wider family administration and human support in one guided case." },
      { name: "Relocation agencies", strength: "Experienced corporate administration support", counter: "BeistandPlus covers a wider set of difficult life events and offers a scalable mid-market platform rather than a high-cost manual relocation package." },
      { name: "Charities and public advice services", strength: "Trusted and often free", counter: "They remain referral partners; BeistandPlus adds organised tasks, secure documents, progress tracking and funded caseworker capacity." },
    ],
    risks: [
      { risk: "Insurance or legal guidance could cross into regulated advice", mitigation: "BeistandPlus provides information and coordination only; recommendations, policy sales and regulated advice are handled by authorised partners with clear disclosures." },
      { risk: "Bereavement is sensitive and poor automation could damage trust", mitigation: "Use calm human-reviewed content, optional human support and no pressure-selling, ranking manipulation or automated decisions about a family's needs." },
      { risk: "Partner-funded support could expose sensitive personal information", mitigation: "Share only consented status information, separate sponsor and family records, and apply strict role-based access and audit logs." },
    ],
    currentMarket: {
      howServed:
        "Families currently contact funeral providers, insurers, employers, public offices, charities and legal advisers separately. Relocation and bereavement administration is managed through phone calls, paper files and disconnected websites, leaving no single trusted case record.",
      users:
        "People and families in Germany facing relocation, bereavement or complex life administration, reached through employers, insurers, care providers and community organisations.",
      revenue:
        "BeistandPlus is funded by organisation subscriptions or support packages. Families are not charged a second platform fee, and any regulated policy or professional service is provided under a separate transparent agreement with an authorised partner.",
    },
  },
  traderos: {
    tagline: "Clearer signals. Better-controlled decisions.",
    description:
      "TraderOS is a subscription trading-signals and market-analysis SaaS/app for self-directed traders. It brings live market data from licensed sources, charts, technical indicators, AI-assisted signal explanations, alerts, risk levels, entry zones, stop-loss and take-profit planning, a trading journal and performance analysis into one system across forex, indices, commodities and crypto.",
    market:
      "Self-directed traders in the UK first, followed by selected international markets where the required market-data, financial-promotion and product rules have been completed.",
    audience:
      "Self-directed individual traders who want one transparent system for market monitoring, signal research, risk planning, alerts and performance review.",
    reason:
      "Retail traders currently combine charting tools, broker screens, social channels and opaque signal groups. They often cannot see why a signal appeared, how it performed historically or whether losses are being hidden. TraderOS makes the signal logic, risk and track record visible in one place.",
    proposition:
      "One subscription for clearly explained, timestamped market signals and disciplined risk tools. Each signal shows the market evidence behind it, possible entry area, invalidation level, stop-loss, take-profit scenarios and historical performance. TraderOS does not promise profit, hold client funds or present a forecast as certainty; the trader remains in control of every decision.",
    features: [
      "Forex, indices, commodities and crypto watchlists",
      "Licensed live or appropriately delayed market-data feeds",
      "Moving averages, RSI, MACD, Fibonacci, volume and order-book analysis where data is available",
      "AI-assisted signal explanation with source indicators shown",
      "Entry zones, invalidation levels, stop-loss and take-profit scenarios",
      "Risk-per-trade and position-size calculator",
      "Confidence and evidence score without profit guarantees",
      "Web, mobile, email, Telegram and Discord alerts",
      "Trading journal with screenshots, notes and outcome tracking",
      "Transparent signal history including losing and expired signals",
      "Backtesting and strategy comparison using clearly stated assumptions",
      "Optional broker connection for user-approved execution with limits and emergency stop controls",
    ],
    apps: [
      { name: "TraderOS Web", kind: "SaaS", purpose: "Charts, signals, strategy comparison, journal and performance analysis." },
      { name: "TraderOS Mobile", kind: "iOS", purpose: "Watchlists, signal explanations, alerts and risk checks on iPhone." },
      { name: "TraderOS Mobile", kind: "Android", purpose: "The same monitored trading workflow on Android." },
      { name: "TraderOS Connect", kind: "API", purpose: "Controlled market-data, alert and optional broker connections without holding client money." },
    ],
    userTypes: [
      { type: "Self-directed trader", useCase: "Reviews explained signals, chooses personal risk and decides whether to place a trade." },
      { type: "Developing trader", useCase: "Uses the journal and historical results to understand discipline and repeated mistakes." },
      { type: "Active trader", useCase: "Monitors several markets and receives filtered alerts without watching charts all day." },
    ],
    competitors: [
      { name: "TradingView", strength: "Excellent charts, community scripts and broad market coverage", counter: "TraderOS combines explained multi-indicator signals, risk planning, a complete outcome record and guided review in one focused subscription." },
      { name: "MetaTrader and broker platforms", strength: "Direct execution and a large strategy ecosystem", counter: "TraderOS is broker-independent and focuses on transparent cross-market analysis, evidence and risk controls rather than pushing one broker's products." },
      { name: "Telegram, Discord and social signal groups", strength: "Fast, familiar and often cheap", counter: "Every TraderOS signal is timestamped, explained and retained in the performance history, including losses and expired ideas." },
    ],
    risks: [
      { risk: "Users may treat signals as guaranteed or personalised financial advice", mitigation: "Use prominent risk wording, suitability boundaries, no profit promises and specialist UK review of financial-promotion and regulatory scope before launch." },
      { risk: "Market-data or broker terms may restrict use", mitigation: "Contract only with licensed data and integration providers, enforce exchange entitlements and launch each asset class only after rights are confirmed." },
      { risk: "Backtests can overstate likely performance", mitigation: "Show assumptions, costs, slippage and out-of-sample results, retain losing signals and separate historical tests from live performance." },
      { risk: "Automated execution can increase losses quickly", mitigation: "Keep execution optional and user-approved with position limits, daily loss limits, kill switches and no custody of client funds." },
    ],
    currentMarket: {
      howServed:
        "Traders currently piece together charts, broker tools, indicator subscriptions, spreadsheets and social signal groups. Performance reporting is inconsistent and losing calls can disappear.",
      users:
        "UK self-directed traders across forex, indices, commodities and crypto, followed only by countries where product, promotion and data rules permit launch.",
      revenue:
        "TraderOS earns only from trader subscriptions. Brokers, exchanges and data providers are integrations or suppliers, not a second paying customer side, and TraderOS does not take a share of trading gains or losses.",
    },
  },
  taxcenda: {
    preserveFinancialDefaults: true,
    defaultInitialUsers: 60,
    defaultUserGrowth: 0.12,
    defaultArpu: 179,
    defaultChurn: 0,
    defaultAddlRevenue: 0,
    defaultDirectCost: 5000,
    tagline: "U.S. tax returns, prepared wherever you live",
    description:
      "TaxCenda prepares and files U.S. federal and applicable state tax returns for taxpayer clients living in the United States or abroad. Each case is reviewed by an IRS Enrolled Agent or another appropriately authorised U.S. tax professional, with secure document collection, clear fixed pricing, electronic signature and filing through an authorised IRS e-file provider where the return is eligible for e-file.",
    market:
      "U.S. citizens, residents, expatriates, non-residents and eligible small businesses with U.S. federal or state filing obligations, including clients who live outside the United States.",
    audience:
      "The single paying side is the taxpayer client: individuals, families, expatriates, non-residents and eligible small businesses purchasing U.S. return preparation and filing. The IRS, tax authorities and professional partners are not charged by TaxCenda.",
    reason:
      "U.S. tax filing can remain compulsory even when a person lives abroad, while non-residents and internationally connected businesses face unfamiliar forms, deadlines, income classifications and identity requirements. Generic do-it-yourself software does not always explain cross-border facts clearly, and local accountants outside the U.S. may not prepare or e-file U.S. returns.",
    proposition:
      "One secure case from eligibility check to filed return. The client answers a plain-language questionnaire, uploads evidence and receives a fixed scope and price. A suitably credentialed U.S. tax professional prepares and reviews the return, explains important positions, obtains the required authorisation and files through the appropriate authorised channel. TaxCenda does not promise a refund or invent deductions, and the client approves the completed return before filing.",
    features: [
      "Plain-language U.S. federal and state tax intake",
      "Service for U.S.-based and overseas taxpayer clients",
      "Individual, expatriate and non-resident return workflows",
      "Eligible sole-trader and small-business return workflows",
      "Secure upload and checklist for income, expenses and supporting evidence",
      "Identity, filing-status, residency and treaty-information questions",
      "Preparation and review by an IRS Enrolled Agent or other appropriately authorised U.S. tax professional",
      "Paid-preparer PTIN recorded where required",
      "Electronic signature and filing through an authorised IRS e-file provider where eligible",
      "Federal and applicable state submission tracking",
      "Clear explanation of tax due, refund position and payment options without guaranteeing an outcome",
      "Year-round document vault, deadline reminders and optional notice-response support",
    ],
    apps: [
      { name: "TaxCenda Client", kind: "Web", purpose: "Questionnaire, fixed quote, document upload, review, signature and filing status." },
      { name: "TaxCenda Client", kind: "iOS", purpose: "Secure document capture, messages, reminders and status on iPhone." },
      { name: "TaxCenda Client", kind: "Android", purpose: "The same secure filing journey on Android." },
      { name: "TaxCenda Professional", kind: "SaaS", purpose: "Credential-controlled preparation, review, workpapers, authorisations and quality checks." },
      { name: "TaxCenda E-file Connect", kind: "API", purpose: "Controlled connection to an authorised IRS e-file provider and approved tax-software workflow." },
    ],
    userTypes: [
      { type: "U.S. resident taxpayer", useCase: "Completes a guided federal and applicable state return with professional review." },
      { type: "U.S. citizen or resident living abroad", useCase: "Organises overseas income and U.S. filing information in one secure case." },
      { type: "Non-resident with U.S. filing needs", useCase: "Receives the correct intake and professional review for relevant U.S. income and forms." },
      { type: "Eligible small-business taxpayer", useCase: "Provides business records and receives a properly scoped federal and state filing service." },
      { type: "Enrolled Agent or authorised tax professional", useCase: "Prepares, reviews, signs and supports returns within their credentials and assigned role." },
    ],
    competitors: [
      { name: "TurboTax and other do-it-yourself software", strength: "Recognised brands, automated interviews and large U.S. customer bases", counter: "TaxCenda adds named professional preparation and review, with a workflow designed for overseas and internationally connected clients." },
      { name: "U.S. tax firms specialising in expatriates", strength: "Deep cross-border expertise and established professional teams", counter: "TaxCenda combines that professional review with a simpler multilingual digital intake, transparent scope and year-round case record." },
      { name: "Local accountants outside the United States", strength: "Local language, trust and knowledge of the client's home country", counter: "TaxCenda supplies the U.S. return-preparation and authorised filing capability and can coordinate with the client's local adviser without charging that adviser." },
    ],
    risks: [
      { risk: "Incorrect or incomplete client information could produce an inaccurate return", mitigation: "Use evidence checklists, validation rules, professional review, client representations and a final approval step before submission." },
      { risk: "Paid-preparer or e-file credentials are missing, expired or used outside their permitted role", mitigation: "Verify and monitor PTINs, professional credentials, EFIN-linked provider access and role permissions; block filing when any required authority is not current." },
      { risk: "Cross-border returns may require advice outside the team's competence", mitigation: "Use a written scope and escalation matrix, accept only supported return types and refer specialist treaty, entity, estate or criminal matters to suitably qualified counsel or advisers." },
      { risk: "Taxpayer records are highly sensitive", mitigation: "Maintain a written information-security programme, encryption, least-privilege access, audit logs, secure retention and incident procedures appropriate to tax-preparer obligations." },
      { risk: "Marketing could imply guaranteed refunds or IRS endorsement", mitigation: "Never promise an outcome or describe TaxCenda itself as IRS-approved; state the actual credentials of the responsible preparer and authorised e-file provider accurately." },
    ],
    currentMarket: {
      howServed:
        "Clients use do-it-yourself software, a U.S. tax firm, an expatriate-tax specialist or a local accountant who may then need a separate U.S. preparer. Documents, questions, signatures and filing status are often spread across email and several portals.",
      users:
        "Taxpayer clients in the United States and abroad who have supported U.S. federal or state filing needs, including individuals, expatriates, non-residents and eligible small businesses.",
      revenue:
        "TaxCenda earns fixed preparation and filing fees or an annual taxpayer support plan from the taxpayer client only. It does not charge the IRS, tax authorities or professional partners and does not earn a percentage of a refund or tax saving.",
    },
  },
  kinderstars: {
    description:
      "Kinderstars helps parents in Germany find and organise care with verified childminders. Registered childminders pay Kinderstars a monthly subscription for their profile, availability, bookings, attendance, invoices and records. Parents use Kinderstars free. The parent pays the childminder for the childcare itself, or an eligible government scheme funds the place, and the childminder receives that childcare payment.",
    audience:
      "Paying customers are registered childminders. Parents and families use the search and booking journey free; local authorities and government funding schemes may fund the childcare service but do not buy the Kinderstars software subscription.",
    proposition:
      "One clear money flow: the childminder pays Kinderstars a monthly software and marketplace subscription. Parents search, compare, book and receive records without a Kinderstars platform fee. The separate childcare charge is agreed with and paid to the childminder, either by the parent or through an eligible government funding route. Kinderstars helps the childminder manage availability, attendance, invoices and the evidence needed for funded places but does not take the childcare income.",
  },
  eventplanrger: {
    proposition:
      "Hosts plan free. Venues, suppliers and event agencies pay a flat monthly subscription for marketplace visibility, customer management, calendars, quotes, contracts and payments, and keep 100% of every booking. The host describes the event once, EventPlanr builds the task list, budget and supplier shortlist, collects comparable quotes, runs guest replies and seating, and gives everyone one shared event-day timeline. There is no host subscription, supplier commission or per-lead fee.",
  },
  eventplanruk: {
    proposition:
      "Hosts and guests use EventPlanr free. Venues, suppliers and event agencies pay a flat monthly subscription for marketplace visibility, customer management, calendars, quotes, contracts and payments, and keep 100% of every booking. The host describes the event once, EventPlanr builds the plan and budget, shortlists verified suppliers by postcode, collects comparable quotes, runs guest replies and seating, and gives everyone one shared event-day timeline. There is no host premium fee, supplier commission or per-lead charge.",
  },
  rettio: {
    description:
      "Food businesses publish surprise-bag inventory of surplus food and consumers discover and reserve it free. Rettio charges the merchant a flat monthly subscription and takes no fee from the consumer and no commission from the food sale.",
    proposition:
      "Food merchants pay one flat subscription per location to publish unlimited surplus bags, receive direct payment and keep the customer relationship. Consumers search, reserve and collect without a Rettio membership or platform fee. The merchant keeps the full sale value apart from normal card-processing costs.",
  },
  traindirekt: {
    description:
      "Online academy delivering approved German-language and technology courses funded by German public programmes or employers. Eligible learners study without paying Traindirekt directly.",
    proposition:
      "One academy with one paying side: the Agentur für Arbeit, Jobcenter, BAMF or an employer funds each eligible learner place. The learner pays no Traindirekt subscription. Courses combine live cohort sessions, on-demand video, AI tutors and recognised exam preparation, with attendance, outcomes and evidence reported back to the funding organisation.",
  },
  zivvo: {
    proposition:
      "One marketplace for the whole car lifecycle. Private buyers and sellers use the core marketplace free with verified identity, escrow-ready workflows and guided pricing. Dealers, dealer groups and fleet sellers fund Zivvo through subscriptions covering multi-channel stock listings, trade sourcing, auction tools, valuation, finance and warranty connections, and lead management. Zivvo does not also charge private users a premium listing or platform transaction fee.",
  },
  parkpunkt: {
    proposition:
      "Drivers use the ParkPunkt app free to find, book and pay the parking operator's published price. Parking operators, municipalities and property owners fund ParkPunkt through subscriptions for occupancy, pricing, barriers, number-plate recognition, settlement and utilisation reporting. ParkPunkt does not add a separate driver service fee or consumer transaction margin.",
  },
  formationgenie: {
    proposition:
      "Founders are the only paying side. They choose a clear formation package or ongoing compliance plan covering incorporation, registered office, service address, filings, VAT or PAYE registration and deadline reminders. Banks, accountants, insurers and other partners may connect to the journey but are not charged a second platform fee and do not change the price shown to the founder.",
  },
  stemcoach: {
    proposition:
      "Parents and learners are the only paying side. One household subscription provides exam-style questions across major curricula, AI marking with worked solutions, adaptive practice, timed mock exams and parent progress reporting. Schools and teachers can recommend and support use without a separate school licence, so the same product is not charged to both families and institutions.",
  },
  sharedbricks: {
    proposition:
      "Every property sits in its own appropriately structured vehicle with published documents, valuations and rental accounts. Property sponsors and owners pay the platform's listing, onboarding and ongoing asset-administration fees. Investors can browse, invest and monitor holdings without a second SharedBricks subscription or buyer-side platform fee. Each territory launches only after specialist financial-services and securities approval.",
  },
  criclume: {
    preserveFinancialDefaults: true,
    defaultInitialUsers: 75,
    defaultUserGrowth: 0.12,
    defaultArpu: 79,
    defaultChurn: 0.025,
    defaultAddlRevenue: 2500,
    defaultDirectCost: 3500,
    description:
      "CricLume is the match-day, league and coaching operating system for cricket. Clubs, leagues, competitions and academies pay for ball-by-ball scoring, multi-phone match video, live scoreboards, fixtures, tables, player records, coaching review, memberships and administration. Players, parents, supporters, scorers, coaches, analysts and officials use the relevant apps and profiles free. Service providers may keep the full price of their own work; CricLume does not charge them a subscription or marketplace commission.",
    audience:
      "Paying customers are cricket clubs, leagues, competitions and academies. Free users include players, parents, supporters, captains, scorers, volunteers, coaches, analysts, videographers, umpires and other officials.",
    proposition:
      "One organisation-funded platform for the whole season. A scorer records every delivery and automatically links it to video from ordinary phones. Scoreboards, tables, records and player histories build from the same data. Clubs manage squads, availability, memberships and coaching; leagues manage fixtures, results, points, discipline and officials. Clubs, leagues, competitions and academies pay. Everyone participating in or supporting the game uses the included experience free, so CricLume never tries to earn from both the organisation and its players.",
    pricing: [
      "Players, parents, supporters, scorers, coaches, analysts and officials: free",
      "Club Starter £29/month for scoring, fixtures, squads and live scoreboards",
      "Club Pro £79/month including multi-phone video, coaching review and administration",
      "Academy £99/month including development plans, attendance and parent access",
      "League or Competition £149/month including divisions, fixtures, results, tables and discipline",
      "Large associations and multi-competition groups from £299/month",
      "60-day trial for organisations; no player fee, professional listing fee or marketplace commission",
      "Local purchasing-power pricing is used outside the UK, tied to the organisation's billing country",
    ],
    monetisation: [
      "Only clubs, leagues, competitions and academies pay recurring subscriptions",
      "Larger cricket organisations can buy onboarding, data migration, storage and integration modules",
      "Players, parents, supporters, scorers, coaches, analysts and officials are not charged by CricLume",
    ],
    currentMarket: {
      howServed:
        "Clubs split scoring, team messages, payments and video across paper books, basic scoring apps, spreadsheets and chat groups. Leagues still chase results and update tables manually, while useful coaching video is expensive or difficult to connect to a particular delivery.",
      users:
        "England and Wales alone have thousands of affiliated clubs and teams plus hundreds of leagues, with much larger cricket networks across South Asia, Australia, Southern Africa and the Gulf.",
      revenue:
        "CricLume earns only from subscriptions paid by clubs, leagues, competitions and academies. Individuals and service providers use it free.",
    },
  },
  depotmesh: {
    preserveFinancialDefaults: true,
    defaultInitialUsers: 10,
    defaultUserGrowth: 0.1,
    defaultArpu: 499,
    defaultChurn: 0.015,
    defaultAddlRevenue: 5000,
    defaultDirectCost: 6000,
    tagline: "Every site. Every movement. Every margin.",
    description:
      "DepotMesh is the BondedOS warehouse and logistics platform. It helps bonded warehouses, ordinary warehouses, depots and logistics operators manage goods from arrival to release, including customs status, storage, handling, movements, documents, customer communication and billing. The first operating model is a French bonded warehouse, followed by other European, UK and Gulf sites.",
    market:
      "Bonded warehousing, third-party logistics, freight depots and commercial storage across France, Europe, the UK and the Gulf.",
    audience:
      "Bonded warehouse operators, customs warehouses, freight forwarders, third-party logistics companies, storage depots, importers, exporters and their customers.",
    reason:
      "Many warehouses use one system for stock, spreadsheets for storage charges, email for customers and separate customs portals for controlled goods. This hides where goods are, what may legally happen next and which handling and storage charges have been earned.",
    proposition:
      "One record from arrival to release: scan the goods, record customs status, allocate space, track every movement and handling event, store the evidence, calculate rent and service charges, and give each customer a live portal. DepotMesh is the landlord platform; each warehouse operates as a separate tenant with its own staff, customers, rules, branding and accounts.",
    features: [
      "Multi-tenant landlord platform for many warehouse and depot businesses",
      "Arrival booking, gate check-in, unloading and receipt records",
      "Bonded, duty-paid, export, transit and held customs status",
      "Location, pallet, container, lot, serial and owner tracking",
      "Storage rent, rent-handling-delivery charges and automatic billing",
      "Handling events: unload, reload, pick, pack, inspect, relabel and move",
      "Customs document vault and controlled release approval",
      "Customer portal for stock, documents, charges and release requests",
      "Warehouse CRM for leads, quotes, contracts and customer service",
      "API connection layer for authorised customs, carrier, port and accounting systems",
      "Mobile scanning and offline warehouse workflows",
      "Audit trail showing who moved or approved every item",
      "Dashboards for space, dwell time, revenue, margin and unpaid charges",
    ],
    pricing: [
      "Site subscription priced by warehouse size, users and monthly movements",
      "Paid onboarding, data migration, barcode setup and systems integration",
      "Optional modules for bonded controls, customer portal, transport, yard and advanced billing",
      "No percentage taken from the customer's storage or handling revenue",
    ],
    positives: [
      "Storage and handling are recurring, measurable revenue streams for each tenant",
      "One system supports bonded and ordinary logistics operations, widening the market",
      "Multi-tenant architecture allows iTechLounge to operate the first tenant and license the same platform to others",
      "Customer portals and automatic billing make stock and earned charges visible in real time",
      "Customs connections are added through controlled adapters rather than hard-coded into every tenant",
    ],
    monetisation: [
      "Monthly or annual subscription per warehouse or depot site",
      "Onboarding, data migration, barcode, hardware and integration charges",
      "Premium modules for bonded controls, yard, transport, advanced analytics and additional customer portals",
    ],
    apps: [
      { name: "DepotMesh Landlord", kind: "Admin", purpose: "Creates and controls warehouse tenants, plans, limits and shared integrations." },
      { name: "DepotMesh Operations", kind: "SaaS", purpose: "Runs stock, space, movements, customs status, services and billing." },
      { name: "DepotMesh Scan", kind: "Android", purpose: "Warehouse scanning, photos, counts, moves and signatures, including offline work." },
      { name: "DepotMesh Customer", kind: "Web", purpose: "Customer stock, documents, charges, release requests and service messages." },
      { name: "DepotMesh Connect", kind: "API", purpose: "Controlled connections to customs, carriers, ports, accounting and customer systems." },
    ],
    userTypes: [
      { type: "Warehouse manager", useCase: "Sees stock, space, customs holds, movements, charges and staff workload across the site." },
      { type: "Warehouse operative", useCase: "Scans receipts and movements and records photos, counts, damage and signatures." },
      { type: "Customs or compliance lead", useCase: "Controls status changes and releases with a complete evidence trail." },
      { type: "Customer or goods owner", useCase: "Checks stock and charges and requests a service or release without chasing by email." },
      { type: "Finance team", useCase: "Invoices storage and handling automatically from recorded events." },
    ],
    competitors: [
      { name: "CargoWise and large logistics suites", strength: "Very broad international freight capability", counter: "DepotMesh is simpler to deploy for independent warehouse and depot operators and makes storage, handling and tenant portals the centre of the product." },
      { name: "Specialist warehouse systems", strength: "Deep stock and scanning workflows", counter: "DepotMesh joins stock to customs status, CRM, customer access and service billing in one tenant platform." },
      { name: "Spreadsheets and accounting software", strength: "Familiar and inexpensive", counter: "They cannot provide real-time stock location, release controls, scan evidence or automatic event-based charges." },
    ],
    risks: [
      { risk: "Customs connections and authorisations differ by country", mitigation: "Launch one approved territory at a time, use certified or authorised interfaces and keep manual controlled fallback workflows." },
      { risk: "Incorrect release of bonded goods creates serious liability", mitigation: "Role-based approval, two-person release controls, immutable audit logs and no automated customs decision without authorised confirmation." },
      { risk: "Warehouse migrations can disrupt live operations", mitigation: "Run staged imports, barcode reconciliation and parallel operation before the final cutover." },
    ],
    currentMarket: {
      howServed: "Independent warehouses often combine a basic stock system, spreadsheets, email, accounting software and national customs portals.",
      users: "Bonded and ordinary warehouse, depot and logistics operators in France first, followed by selected European, UK and Gulf markets.",
      revenue: "Operators earn recurring storage plus handling and service charges; DepotMesh earns subscriptions, onboarding and module fees rather than taking a cut of warehouse revenue.",
    },
  },
  avenesto: affiliateStore({ name: "Avenesto", category: "home and living", shopper: "Households, renters, homeowners and gift buyers comparing furniture, kitchen, décor, storage and everyday home products.", tagline: "Better living, thoughtfully chosen.", examples: "furniture, kitchen, décor, storage, lighting and household essentials" }),
  gearivon: affiliateStore({ name: "Gearivon", category: "technology", shopper: "Consumers and small businesses comparing computers, phones, accessories, smart-home products, gaming and electronics.", tagline: "Technology, clearly compared.", examples: "computers, phones, smart-home products, gaming, audio and accessories" }),
  kidevia: affiliateStore({ name: "Kidevia", category: "baby, children and family", shopper: "Parents, carers and gift buyers comparing baby equipment, toys, learning products, clothing and family essentials.", tagline: "Smarter choices for growing families.", examples: "baby equipment, toys, learning, clothing, nursery and family essentials" }),
  glowevyn: affiliateStore({ name: "Glowevyn", category: "beauty, skincare and wellness", shopper: "Beauty and wellness shoppers comparing skincare, haircare, personal care, cosmetics and home-wellness products.", tagline: "Beauty and wellness, better compared.", examples: "skincare, haircare, cosmetics, personal care and wellness devices" }),
  drivaryn: affiliateStore({ name: "Drivaryn", category: "automotive accessories", shopper: "Drivers, car owners and motoring enthusiasts comparing vehicle accessories, tools, cleaning, safety and travel products.", tagline: "Better gear for every journey.", examples: "car accessories, cleaning, safety, tools, electronics and travel equipment" }),
  fixorlyn: affiliateStore({ name: "Fixorlyn", category: "tools, DIY and home improvement", shopper: "Homeowners, renters, makers and tradespeople comparing tools, repair products, hardware and home-improvement equipment.", tagline: "Choose well. Make it last.", examples: "hand tools, power tools, hardware, repair products, safety and garden equipment" }),
  tripenvo: affiliateStore({ name: "Tripenvo", category: "travel and outdoor gear", shopper: "Holidaymakers, business travellers, families and outdoor users comparing luggage, travel accessories, camping and trip essentials.", tagline: "Pack smarter. Travel better.", examples: "luggage, organisers, travel electronics, camping, comfort and security products" }),
  formevyn: affiliateStore({ name: "Formevyn", category: "fitness and sports products", shopper: "People exercising at home or in clubs, athletes and coaches comparing fitness, training, recovery and sports equipment.", tagline: "Better gear for every goal.", examples: "home fitness, training, recovery, wearables, clothing and sports equipment" }),
  pawivon: affiliateStore({ name: "Pawivon", category: "pet products", shopper: "Dog, cat and other pet owners comparing food accessories, beds, travel, grooming, training and wellbeing products.", tagline: "Better choices for every companion.", examples: "feeding, beds, travel, grooming, training, toys and pet technology" }),
  deskivon: affiliateStore({ name: "Deskivon", category: "office and home-workspace products", shopper: "Remote workers, students, professionals and small businesses comparing desks, chairs, storage, stationery and productivity equipment.", tagline: "Work smarter. Choose better.", examples: "desks, chairs, storage, stationery, lighting, monitors and productivity accessories" }),
  kalethon: {
    preserveFinancialDefaults: true,
    defaultInitialUsers: 50,
    defaultUserGrowth: 0.12,
    defaultArpu: 79,
    defaultChurn: 0.025,
    defaultAddlRevenue: 2500,
    defaultDirectCost: 4000,
    tagline: "The standard for sport.",
    description:
      "Kalethon is a free sports discovery and organisation app for players, organisers, teams, clubs, coaches and officials, funded by venue subscriptions. It brings together the large number of sports venues and players that already exist but are scattered across separate websites, spreadsheets and message groups. Players can find a place or game, organise a team, split the venue price, fill missing places and confirm attendance. Venues can be listed before joining, then claim and verify their profile to control availability, prices, bookings and customer communication.",
    market:
      "UK grassroots and recreational sport, where thousands of public, private, school, club and community venues already serve millions of players but availability and demand are fragmented. Launch with football and five-a-side, cricket, padel, tennis and pickleball, then expand into other team, racket, combat, fitness and community activities.",
    audience:
      "Free users are casual players, organisers, captains, teams, clubs, coaches, trainers, referees and umpires. Paying customers are venue operators, schools, councils, leisure trusts, clubs with bookable facilities and multi-site sports groups.",
    reason:
      "The UK already has plenty of venues and players, but they are not organised in one dependable system. Players cannot easily see genuine availability or find a suitable game. Organisers chase replies and money, teams struggle to replace drop-outs, and venues lose revenue from empty slots, late cancellations and uncertain attendance.",
    proposition:
      "Create useful local coverage quickly by adding factual public venue listings, clearly marking them as unclaimed and inviting each operator to claim and verify its profile. Players and organisers use Kalethon free to discover nearby sport, join or organise a game, share the venue cost, fill empty places, confirm attendance and receive changes. Claimed venues control calendars, prices, rules, bookings, payments, customer messages and off-peak promotion. This gives venues better use of their facilities and gives players greater certainty that the slot and participants are confirmed.",
    features: [
      "Free search and booking journey for players, organisers, teams, clubs, coaches and officials",
      "Pre-listed public venue profiles with a clear unclaimed label and correction or removal route",
      "Claim, ownership-check and verification workflow for venue operators",
      "Search and book verified venues, courts, pitches, halls, studios and activity spaces",
      "Football, cricket, padel, tennis and pickleball launch categories",
      "Later support for martial arts, boxing, archery, gyms, trainers and rooms",
      "Create public, private, verified or invitation-only games and sessions",
      "Team availability, attendance confirmation and standby substitutes",
      "Share the venue cost, collect deposits and match fees without a Kalethon player service charge",
      "Free profiles and discovery for coaches, trainers, referees, umpires, scorers and analysts",
      "Off-peak pricing and promoted empty slots for venues",
      "Waitlists, reminders, cancellation rules and replacement players to improve booking certainty",
      "Car-share coordination without operating as a transport provider",
      "Scores, tables, player records and optional performance analysis",
      "Privacy controls and optional face or body blurring for permitted video",
      "Venue operating system: calendar, pricing, access, staff, maintenance and reporting",
      "Council, school and community programme reporting",
    ],
    pricing: [
      "Players, organisers, teams, clubs, coaches and officials: free",
      "Venue claim and verification: free, followed by a 60-day full trial",
      "Venue Starter £39/month for one bookable venue",
      "Venue Growth £79/month for more spaces, promotions and reporting",
      "Venue Pro £149/month for advanced operations, staff and integrations",
      "Multi-site, council and leisure groups from £299/month",
      "No Kalethon service fee for players and no commission on the venue's booking value; card-processing costs are shown separately to the venue",
    ],
    positives: [
      "Free access removes the main barrier to bringing large numbers of players, teams and organisers into one network",
      "Pre-listing lawful public venue information creates useful postcode coverage before every operator has joined",
      "Claimed and verified profiles turn fragmented venue information into dependable live availability",
      "Empty-place filling, confirmations and off-peak offers increase use of facilities without building new ones",
      "Venue-only subscriptions make the payer and value exchange simple: venues pay because Kalethon helps them fill and run capacity",
      "The UK beachhead can be launched locally and expanded sport by sport and area by area",
    ],
    monetisation: [
      "Only venues pay: monthly subscriptions for claimed venue profiles, booking tools and operating features",
      "Venues can buy promoted placement and off-peak campaigns; these are clearly labelled",
      "Venue groups, councils and leisure trusts pay for multi-site onboarding, integrations and reporting",
      "Players, organisers, teams, clubs, coaches and officials are not charged by Kalethon",
    ],
    apps: [
      { name: "Kalethon Player", kind: "iOS", purpose: "Discover, join, book, pay, confirm and track sport." },
      { name: "Kalethon Player", kind: "Android", purpose: "The same player and organiser journey on Android." },
      { name: "Kalethon Team & Club", kind: "SaaS", purpose: "Free tools for teams, availability, fixtures, results and communication." },
      { name: "Kalethon Professional", kind: "Web", purpose: "Free discovery profiles for coaches, trainers and officials." },
      { name: "Kalethon Venue OS", kind: "SaaS", purpose: "The paid product: claims, calendars, slots, pricing, bookings, access, customers and reporting." },
      { name: "Kalethon Admin", kind: "Admin", purpose: "Verification, safeguarding, disputes, payments, content and partner controls." },
    ],
    userTypes: [
      { type: "Player (free)", useCase: "Finds a nearby activity, joins, pays only the agreed share of the venue price and receives confirmed updates." },
      { type: "Organiser or captain (free)", useCase: "Books the venue, confirms the team, fills gaps and collects each person's share." },
      { type: "Club administrator (free)", useCase: "Runs teams, members, fixtures, officials and results without a Kalethon subscription." },
      { type: "Coach or official (free)", useCase: "Creates a profile, shows availability and can be found by local organisers and venues." },
      { type: "Venue operator (paying customer)", useCase: "Claims and verifies its profile, publishes live slots, promotes quiet periods and runs bookings from one calendar." },
      { type: "Council or leisure group (paying customer)", useCase: "Manages several facilities, promotes participation and sees programme and usage reporting." },
    ],
    competitors: [
      { name: "Playfinder and venue-booking directories", strength: "Existing venue supply and search traffic", counter: "Kalethon is free to players and continues after discovery with confirmations, shared venue costs, substitutes, results and repeat play, while venues get an operating system." },
      { name: "Spond, TeamApp and club tools", strength: "Strong team communication and attendance", counter: "Kalethon keeps team tools free and connects them to public venue discovery, live slots, officials, coaches and bookings." },
      { name: "WhatsApp, spreadsheets and separate payment links", strength: "Free and familiar", counter: "Kalethon remains free for participants but gives both sides one confirmed record of the slot, attendance, money and changes." },
    ],
    risks: [
      { risk: "A marketplace needs both local players and local venue supply", mitigation: "Pre-list venues from lawful public sources, label unclaimed records clearly, recruit players through clubs and community networks, and expand postcode by postcode and sport by sport." },
      { risk: "Unclaimed venue information may be incomplete or become outdated", mitigation: "Show the source and last-checked date, provide correction and removal routes, suppress unverified availability and require ownership checks before a venue can manage bookings." },
      { risk: "Safeguarding, filming and personal data are sensitive", mitigation: "Age-aware permissions, guardian consent, private defaults, reporting, role controls and optional video blurring." },
      { risk: "Cancellations and no-shows create disputes", mitigation: "Clear policies, attendance confirmation, standby replacements, deposits and evidence-based refund workflows." },
      { risk: "Different sports and venues have different rules", mitigation: "Use a common booking core with configurable sport, venue and governing-body templates." },
    ],
    currentMarket: {
      howServed: "Venues and players already exist in large numbers, but discovery, availability, team organisation, payments and confirmations are split across search engines, separate venue sites, phone calls, spreadsheets and message groups.",
      users: "Millions of UK adults and children participate in grassroots, recreational and fitness activity, supported by thousands of public, private, school, club and community venues.",
      revenue: "Kalethon charges only venues. Recurring revenue comes from claimed venue subscriptions, venue-funded promotion and multi-site venue services; players and other participants use the platform free.",
    },
  },
};
