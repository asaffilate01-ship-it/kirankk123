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
      `A focused ${category} storefront with plain-English comparisons, product advantages and disadvantages, price and availability checks, clear affiliate disclosure and direct links to the retailer. The same Affivon engine controls product feeds, affiliate tracking, content, translations, link health, analytics and regional retailer routing across all ten storefronts.`,
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
      "One Affivon engine runs ten focused brands, so feeds, analytics, compliance and content tools are not rebuilt ten times",
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
      { name: "Affivon Landlord", kind: "Admin", purpose: "Controls all ten storefronts, retailer programmes, tracking, roles and compliance." },
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
    "Affivon is the shared affiliate-commerce platform behind ten focused shopping websites. One landlord dashboard controls retailer programmes, product feeds, affiliate links, content, translations, disclosures, analytics and regional routing while each storefront keeps its own name, domain and audience.",
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
    "Running ten affiliate websites separately would duplicate product imports, link management, analytics, disclosure rules, content workflows and technical maintenance. Affivon turns those repeated tasks into one shared operating system.",
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
    "Internal portfolio edition — shared platform cost allocated across the ten owned storefronts",
    "Future Publisher plan — monthly subscription per storefront with usage limits",
    "Future Agency plan — multi-store allowance, team roles, client reporting and custom domains",
    "Retailer commissions belong to the relevant storefront; Affivon records and reconciles them",
  ],
  positives: [
    "One product and data engine supports ten revenue-producing storefronts",
    "No consumer stock, warehouse, checkout, delivery or returns operation",
    "New countries, retailers and compliance changes are connected once for every tenant",
    "Portfolio reporting shows which categories, content and markets deserve further investment",
    "The landlord edition can later be licensed to other affiliate publishers and agencies",
  ],
  monetisation: [
    "Shared enablement of affiliate commission earned by the ten owned storefronts",
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
    { risk: "Ten stores spread editorial attention too thinly", mitigation: "Launch categories in stages and use performance gates before expanding content or paid promotion." },
  ],
  currentMarket: {
    howServed: "Affiliate publishers commonly run separate WordPress sites, feeds, spreadsheets and retailer dashboards, making portfolio control and compliance difficult.",
    users: "Millions of publishers and creators use affiliate programmes, while agencies and portfolio owners increasingly operate several niche sites.",
    revenue: "The underlying market pays commissions for eligible referred sales; affiliate-platform software also earns subscriptions, setup fees and agency licences.",
  },
};

export const BRAND_CONTENT_OVERRIDES: Record<string, Partial<Brand>> = {
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
  athlyvo: {
    preserveFinancialDefaults: true,
    defaultInitialUsers: 50,
    defaultUserGrowth: 0.12,
    defaultArpu: 79,
    defaultChurn: 0.025,
    defaultAddlRevenue: 2500,
    defaultDirectCost: 4000,
    tagline: "Where sport comes together.",
    description:
      "Athlyvo is a free sports discovery and organisation app for players, organisers, teams, clubs, coaches and officials, funded by venue subscriptions. It brings together the large number of sports venues and players that already exist but are scattered across separate websites, spreadsheets and message groups. Players can find a place or game, organise a team, split the venue price, fill missing places and confirm attendance. Venues can be listed before joining, then claim and verify their profile to control availability, prices, bookings and customer communication.",
    market:
      "UK grassroots and recreational sport, where thousands of public, private, school, club and community venues already serve millions of players but availability and demand are fragmented. Launch with football and five-a-side, cricket, padel, tennis and pickleball, then expand into other team, racket, combat, fitness and community activities.",
    audience:
      "Free users are casual players, organisers, captains, teams, clubs, coaches, trainers, referees and umpires. Paying customers are venue operators, schools, councils, leisure trusts, clubs with bookable facilities and multi-site sports groups.",
    reason:
      "The UK already has plenty of venues and players, but they are not organised in one dependable system. Players cannot easily see genuine availability or find a suitable game. Organisers chase replies and money, teams struggle to replace drop-outs, and venues lose revenue from empty slots, late cancellations and uncertain attendance.",
    proposition:
      "Create useful local coverage quickly by adding factual public venue listings, clearly marking them as unclaimed and inviting each operator to claim and verify its profile. Players and organisers use Athlyvo free to discover nearby sport, join or organise a game, share the venue cost, fill empty places, confirm attendance and receive changes. Claimed venues control calendars, prices, rules, bookings, payments, customer messages and off-peak promotion. This gives venues better use of their facilities and gives players greater certainty that the slot and participants are confirmed.",
    features: [
      "Free search and booking journey for players, organisers, teams, clubs, coaches and officials",
      "Pre-listed public venue profiles with a clear unclaimed label and correction or removal route",
      "Claim, ownership-check and verification workflow for venue operators",
      "Search and book verified venues, courts, pitches, halls, studios and activity spaces",
      "Football, cricket, padel, tennis and pickleball launch categories",
      "Later support for martial arts, boxing, archery, gyms, trainers and rooms",
      "Create public, private, verified or invitation-only games and sessions",
      "Team availability, attendance confirmation and standby substitutes",
      "Share the venue cost, collect deposits and match fees without an Athlyvo player service charge",
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
      "No Athlyvo service fee for players and no commission on the venue's booking value; card-processing costs are shown separately to the venue",
    ],
    positives: [
      "Free access removes the main barrier to bringing large numbers of players, teams and organisers into one network",
      "Pre-listing lawful public venue information creates useful postcode coverage before every operator has joined",
      "Claimed and verified profiles turn fragmented venue information into dependable live availability",
      "Empty-place filling, confirmations and off-peak offers increase use of facilities without building new ones",
      "Venue-only subscriptions make the payer and value exchange simple: venues pay because Athlyvo helps them fill and run capacity",
      "The UK beachhead can be launched locally and expanded sport by sport and area by area",
    ],
    monetisation: [
      "Only venues pay: monthly subscriptions for claimed venue profiles, booking tools and operating features",
      "Venues can buy promoted placement and off-peak campaigns; these are clearly labelled",
      "Venue groups, councils and leisure trusts pay for multi-site onboarding, integrations and reporting",
      "Players, organisers, teams, clubs, coaches and officials are not charged by Athlyvo",
    ],
    apps: [
      { name: "Athlyvo Player", kind: "iOS", purpose: "Discover, join, book, pay, confirm and track sport." },
      { name: "Athlyvo Player", kind: "Android", purpose: "The same player and organiser journey on Android." },
      { name: "Athlyvo Team & Club", kind: "SaaS", purpose: "Free tools for teams, availability, fixtures, results and communication." },
      { name: "Athlyvo Professional", kind: "Web", purpose: "Free discovery profiles for coaches, trainers and officials." },
      { name: "Athlyvo Venue OS", kind: "SaaS", purpose: "The paid product: claims, calendars, slots, pricing, bookings, access, customers and reporting." },
      { name: "Athlyvo Admin", kind: "Admin", purpose: "Verification, safeguarding, disputes, payments, content and partner controls." },
    ],
    userTypes: [
      { type: "Player (free)", useCase: "Finds a nearby activity, joins, pays only the agreed share of the venue price and receives confirmed updates." },
      { type: "Organiser or captain (free)", useCase: "Books the venue, confirms the team, fills gaps and collects each person's share." },
      { type: "Club administrator (free)", useCase: "Runs teams, members, fixtures, officials and results without an Athlyvo subscription." },
      { type: "Coach or official (free)", useCase: "Creates a profile, shows availability and can be found by local organisers and venues." },
      { type: "Venue operator (paying customer)", useCase: "Claims and verifies its profile, publishes live slots, promotes quiet periods and runs bookings from one calendar." },
      { type: "Council or leisure group (paying customer)", useCase: "Manages several facilities, promotes participation and sees programme and usage reporting." },
    ],
    competitors: [
      { name: "Playfinder and venue-booking directories", strength: "Existing venue supply and search traffic", counter: "Athlyvo is free to players and continues after discovery with confirmations, shared venue costs, substitutes, results and repeat play, while venues get an operating system." },
      { name: "Spond, TeamApp and club tools", strength: "Strong team communication and attendance", counter: "Athlyvo keeps team tools free and connects them to public venue discovery, live slots, officials, coaches and bookings." },
      { name: "WhatsApp, spreadsheets and separate payment links", strength: "Free and familiar", counter: "Athlyvo remains free for participants but gives both sides one confirmed record of the slot, attendance, money and changes." },
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
      revenue: "Athlyvo charges only venues. Recurring revenue comes from claimed venue subscriptions, venue-funded promotion and multi-site venue services; players and other participants use the platform free.",
    },
  },
};
