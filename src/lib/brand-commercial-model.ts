import type { Brand } from "./brands";

export type PayerSide = "business" | "consumer";

export type BrandPayerModel = {
  side: PayerSide;
  payer: string;
  freeSide: string;
  pricingBasis: string;
  investorRevenue: string;
  pricing: string[];
  monetisation: string[];
  forecastVolumeLabel: string;
  revenuePerUnitLabel: string;
  attritionLabel: string;
};

type ModelSeed = {
  payer: string;
  freeSide: string;
  pricingBasis: string;
  forecastVolumeLabel?: string;
  forecastAccountLabel?: string;
  revenuePerUnitLabel?: string;
  attritionLabel?: string;
};

/*
 * Investor rule: every brand has one paying side. A person may still pay the
 * underlying provider (for a meal, booking, lesson or service), but we do not
 * also charge that person a separate platform fee when the business side is
 * funding the product.
 */
const BUSINESS_FUNDED: Record<string, ModelSeed> = {
  haccora: {
    payer: "restaurants, hotels, caterers and food-service sites",
    freeSide: "Their staff use the checks under the site's account",
    pricingBasis: "subscription per operating site",
  },
  kinderstars: {
    payer: "registered childminders",
    freeSide:
      "Parents search and organise care free; they pay the childminder for the childcare itself, or an eligible government scheme funds it, and that money goes to the childminder",
    pricingBasis: "monthly childminder subscription",
    forecastVolumeLabel: "Paying childminder accounts",
    forecastAccountLabel: "paying childminder account",
    revenuePerUnitLabel: "Average revenue per paying childminder / month",
    attritionLabel: "Childminders cancelling each month",
  },
  eventplanrger: {
    payer: "venues, suppliers and event agencies",
    freeSide: "Private and corporate hosts plan events and contact suppliers free",
    pricingBasis: "subscription by supplier, venue or agency account",
  },
  rettio: {
    payer: "bakeries, cafés, supermarkets, hotels and other food merchants",
    freeSide: "Consumers discover and reserve surplus food without a Rettio membership",
    pricingBasis: "flat subscription per merchant location",
  },
  kiezio: {
    payer: "local businesses that claim enhanced profiles or promotion",
    freeSide: "Residents, visitors and community users search free",
    pricingBasis: "business profile and promotion subscription",
  },
  beratermarkt: {
    payer: "law, tax, accounting and audit practices",
    freeSide: "People and businesses seeking advice submit and compare requests free",
    pricingBasis: "professional-practice subscription",
  },
  stellenxpert: {
    payer: "employers and recruitment agencies",
    freeSide: "Candidates search, match and apply free",
    pricingBasis: "employer subscription by hiring volume",
  },
  viazeno: {
    payer: "chauffeur and private-hire operators",
    freeSide: "Passengers and corporate bookers are not charged a Viazeno service fee",
    pricingBasis: "operator subscription by vehicle or team size",
  },
  immoviq: {
    payer: "landlords and property managers",
    freeSide: "Tenants use their portal without a separate platform charge",
    pricingBasis: "subscription by managed property count",
  },
  beinstandplus: {
    payer: "employers, insurers, care and community organisations funding support",
    freeSide: "People and families receive the included relocation, life-administration or bereavement support without a second platform fee",
    pricingBasis: "organisation subscription or funded support package",
  },
  traindirekt: {
    payer: "public funding bodies and employers",
    freeSide: "Eligible learners study without a Traindirekt subscription",
    pricingBasis: "funded course place or employer training contract",
    forecastVolumeLabel: "Funded learner places",
  },
  zivvo: {
    payer: "car dealers, dealer groups, fleets and trade sellers",
    freeSide: "Private buyers and sellers use the core marketplace free",
    pricingBasis: "dealer subscription by stock and location",
  },
  omniqora: {
    payer: "businesses, agencies, groups and resellers using the software",
    freeSide: "Their customers are never charged by Omniqora",
    pricingBasis: "business subscription by team, modules and usage",
  },
  zivvouk: {
    payer: "UK car dealers, dealer groups and fleet sellers",
    freeSide: "Private buyers and sellers use the core marketplace free",
    pricingBasis: "dealer subscription by stock and forecourt",
  },
  kinderstarsuk: {
    payer: "childminders, nurseries and employer childcare programmes",
    freeSide: "Parents search and organise childcare without a platform fee",
    pricingBasis: "provider or employer subscription",
  },
  eventplanruk: {
    payer: "venues, event suppliers and agencies",
    freeSide: "Hosts and guests plan, enquire and coordinate free",
    pricingBasis: "subscription by supplier, venue or agency account",
  },
  taxnuvia: {
    payer: "accountants and accountancy practices",
    freeSide: "Businesses and individuals seeking an accountant request and compare quotes free",
    pricingBasis: "practice subscription by location and lead capacity",
  },
  gabley: {
    payer: "estate agents, letting agents and professional landlords",
    freeSide: "Buyers and tenants search and use their portal free",
    pricingBasis: "subscription by branch or managed portfolio",
  },
  stylesyncuk: {
    payer: "salons, barbers and beauty businesses",
    freeSide: "Clients discover and book without a StyleSync platform fee",
    pricingBasis: "business subscription by location and staff size",
  },
  xpertjobs: {
    payer: "employers and recruitment agencies",
    freeSide: "Candidates create profiles, match and apply free",
    pricingBasis: "employer subscription by roles and hiring volume",
  },
  amityos: {
    payer: "care providers and care organisations",
    freeSide: "Care workers, families and professionals use the portals included by the provider",
    pricingBasis: "subscription per care site",
  },
  skillfinch: {
    payer: "care providers, nurseries and training organisations",
    freeSide: "Staff and learners access training under the organisation's account",
    pricingBasis: "organisation subscription by site or learner band",
  },
  merqano: {
    payer: "businesses and agencies that need branded ecommerce websites",
    freeSide: "Shoppers use each customer's online shop without a Merqano platform fee",
    pricingBasis: "business subscription by website, plan and required features",
  },
  stylesyncger: {
    payer: "German salons, barbers and beauty studios",
    freeSide: "Clients discover and book without a Schonova platform fee",
    pricingBasis: "business subscription by location and staff size",
  },
  parkpunkt: {
    payer: "parking operators, municipalities and property owners",
    freeSide: "Drivers use the discovery and payment app without a ParkPunkt service fee",
    pricingBasis: "operator subscription by bays, sites and modules",
  },
  lawquo: {
    payer: "law firms and legal practices",
    freeSide: "Clients find a lawyer and manage their case without a Lawquo platform fee",
    pricingBasis: "law-firm subscription by team and matters",
  },
  zoryn: {
    payer: "participating merchants and retail groups",
    freeSide: "Consumers collect and use rewards free",
    pricingBasis: "merchant subscription by location and campaign volume",
  },
  marktpass: {
    payer: "marketplace sellers, importers and consumer brands",
    freeSide: "Shoppers are not charged to use seller intelligence",
    pricingBasis: "seller subscription by marketplaces and catalogue size",
  },
  dishbee: {
    payer: "cafés, takeaways, restaurants and food businesses",
    freeSide: "Diners order and use loyalty tools without a Dishbee service fee",
    pricingBasis: "subscription per hospitality location",
  },
  dubaitrips: {
    payer: "UAE tour, attraction, transfer and hospitality suppliers",
    freeSide: "Travellers browse and book without a Dubaitrips4U platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  marocways: {
    payer: "Moroccan tour, stay, activity and transport suppliers",
    freeSide: "Travellers browse and book without a Marocways platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  fleetsora: {
    payer: "delivery, logistics, rental and corporate fleet operators",
    freeSide: "Drivers use the assigned operational app under the fleet account",
    pricingBasis: "fleet subscription by vehicle count",
  },
  sharedbricks: {
    payer: "property sponsors and owners raising capital through the platform",
    freeSide:
      "Investors browse, invest and monitor holdings without a second platform subscription",
    pricingBasis: "sponsor listing, onboarding and asset-administration fees",
  },
  zorynnexus: {
    payer: "merchants, marketplaces and platform partners",
    freeSide: "Consumers are not charged by Zoryn Pay",
    pricingBasis: "business subscription and payment-service contract",
  },
  onyngo: {
    payer: "restaurants, retailers, pharmacies and other merchants",
    freeSide: "Customers and delivery drivers are not charged an Onyngo platform subscription",
    pricingBasis: "merchant subscription by location and enabled modules",
  },
  hmoflow: {
    payer: "HMO landlords, operators and letting agencies",
    freeSide: "Tenants and guarantors use their portal free",
    pricingBasis: "subscription by property or room count",
  },
  "haccora-uk": {
    payer: "restaurants, pubs, cafés, hotels, schools and care kitchens",
    freeSide: "Staff use the checks under the site's account",
    pricingBasis: "subscription per operating site",
  },
  cirqiva: {
    payer: "waste carriers, recycling facilities and service operators",
    freeSide:
      "Businesses requesting collections compare and manage services without a Cirqiva platform fee",
    pricingBasis: "operator subscription by fleet, jobs and sites",
  },
  "docuvera-de": {
    payer: "surveying, inspection, property and field-service firms",
    freeSide: "Their clients receive reports without a Dokuvera charge",
    pricingBasis: "business subscription by team and report volume",
  },
  "docuvera-uk": {
    payer: "surveyors, inspectors, property managers and field-service firms",
    freeSide: "Their clients receive reports without a Dokuvera charge",
    pricingBasis: "business subscription by team and report volume",
  },
  bidlumo: {
    payer: "companies and consultancies bidding for contracts",
    freeSide: "Buying authorities are not charged by Bidlumo",
    pricingBasis: "bid-team subscription",
  },
  saathera: {
    payer: "care agencies, care providers and commissioning organisations",
    freeSide: "Families and care recipients search and coordinate support free",
    pricingBasis: "provider or commissioner subscription",
  },
  autohashi: {
    payer: "vehicle importers, dealers and import brokers",
    freeSide: "Car buyers track their import under the business account without a platform fee",
    pricingBasis: "business subscription by vehicle volume",
  },
  gableyretrofit: {
    payer: "retrofit assessors, coordinators and installation businesses",
    freeSide: "Homeowners and landlords request and compare improvement plans free",
    pricingBasis: "provider subscription by service area and team size",
  },
  baytcircle: {
    payer: "family venues, activity providers, tutors, clubs and community organisations",
    freeSide: "Parents, guardians, home educators, expatriates and local residents discover, organise and book without a BaytCircle platform fee",
    pricingBasis: "provider subscription for claimed profiles, booking tools and promotion",
  },
  nimah: {
    payer: "restaurants, cafés, bakeries, hotels, supermarkets, caterers and other food outlets",
    freeSide: "Customers pay the outlet's displayed discounted food price but no Ni'mah membership or platform fee",
    pricingBasis: "food-business subscription per outlet and optional business promotion or multi-location tools",
    forecastVolumeLabel: "Paying food-outlet accounts",
    forecastAccountLabel: "paying food outlet",
    revenuePerUnitLabel: "Average revenue per paying food outlet / month",
    attritionLabel: "Food outlets cancelling each month",
  },
  ilmvero: {
    payer: "schools, academies and training institutes",
    freeSide: "Teachers, parents and students use the platform under the school's account",
    pricingBasis: "institution subscription by campus and learner count",
  },
  tareevo: {
    payer: "UAE employers, free-zone companies and PRO service firms",
    freeSide: "Employees use their visa and document journey under the employer account",
    pricingBasis: "organisation subscription by employee or case volume",
  },
  uzvoya: {
    payer: "Uzbek travel, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without an Uzvoya platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  recovrable: {
    payer: "businesses and professional landlords collecting legitimate debts",
    freeSide: "Debtors are never charged a Recovrable platform fee",
    pricingBasis: "creditor subscription by case volume",
  },
  merqora: {
    payer: "Amazon and other online-marketplace sellers, seller agencies and ecommerce teams",
    freeSide: "Shoppers and marketplace customers are not charged by Merqora",
    pricingBasis: "business subscription by seller accounts, marketplaces, users and catalogue size",
  },
  lessonahead: {
    payer: "tutors, driving instructors, tuition centres, agencies and schools",
    freeSide: "Parents and pupils search, book and learn without a LessonAhead platform fee",
    pricingBasis: "provider, instructor or school subscription",
  },
  motoresq: {
    payer:
      "recovery operators, garages, mechanics, tyre centres and other vehicle-service providers",
    freeSide: "Drivers request and manage work without a MotoResQ platform fee",
    pricingBasis: "provider subscription by site and team size",
  },
  premisora: {
    payer: "commercial landlords, managing agents and multi-site occupiers",
    freeSide: "Tenants and contractors use assigned workflows under the property account",
    pricingBasis: "subscription by property or floor area",
  },
  hexareve: {
    payer: "French travel, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without a Hexareve platform fee",
    pricingBasis: "supplier subscription priced by local business type",
  },
  bosporiva: {
    payer: "Turkish travel, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without a Bosporiva platform fee",
    pricingBasis: "supplier subscription priced by local business type",
  },
  eastamira: {
    payer: "Southeast Asian travel, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without an Eastamira platform fee",
    pricingBasis: "supplier subscription priced by country and business type",
  },
  corazora: {
    payer: "Latin American travel, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without a Corazora platform fee",
    pricingBasis: "supplier subscription priced by country and business type",
  },
  fiftyroam: {
    payer: "travel suppliers serving mature and accessible travellers",
    freeSide: "Travellers use FiftyRoam without a platform fee",
    pricingBasis: "supplier subscription by products and service area",
  },
  canavelle: {
    payer: "Canary Islands stay, activity and transport suppliers",
    freeSide: "Travellers use Canavelle without a platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  rangvaya: {
    payer: "Indian travel, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without a RangVaya platform fee",
    pricingBasis: "supplier subscription priced by local business type",
  },
  oceavela: {
    payer: "charter, sailing, marina and marine-travel suppliers",
    freeSide: "Travellers and sailing groups search and book without a platform fee",
    pricingBasis: "supplier subscription by vessels and locations",
  },
  savansea: {
    payer: "African safari, stay, activity and transport suppliers",
    freeSide: "Travellers plan and book without a Savansea platform fee",
    pricingBasis: "supplier subscription priced by country and business type",
  },
  nilevella: {
    payer: "Egyptian travel, cruise, stay, guide and transport suppliers",
    freeSide: "Travellers plan and book without a Nilevella platform fee",
    pricingBasis: "supplier subscription by products and business type",
  },
  adrilume: {
    payer: "Italy and Adriatic travel, sailing, stay and activity suppliers",
    freeSide: "Travellers plan and book without an Adrilume platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  marelyra: {
    payer: "Mediterranean travel, stay, activity, boat and transport suppliers",
    freeSide: "Travellers plan and book without a Marelyra platform fee",
    pricingBasis: "supplier subscription priced by country and business type",
  },
  iberaviva: {
    payer: "Spain and Portugal walking, cycling, wellness and travel suppliers",
    freeSide: "Travellers plan and book without an Iberaviva platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  euralume: {
    payer: "Northern and Central European travel and activity suppliers",
    freeSide: "Travellers plan and book without an Euralume platform fee",
    pricingBasis: "supplier subscription by products and locations",
  },
  farenivo: {
    payer: "travel agencies, transport distributors and travel-supply partners",
    freeSide: "Travellers compare transport without a Farenivo platform fee",
    pricingBasis: "agency subscription and business-paid distribution income",
  },
  niyyahnoor: {
    payer: "licensed Umrah, heritage-travel, stay and transport suppliers",
    freeSide: "Pilgrims and travellers plan and book without a NiyyahNoor platform fee",
    pricingBasis: "supplier subscription by products and group volume",
  },
  travenexa: {
    payer: "tour operators, destination companies and travel agencies",
    freeSide: "Travellers using powered storefronts are not charged by TraveNexa",
    pricingBasis: "business subscription, tenant and white-label licence",
  },
  "craftvaro-uk": {
    payer: "UK tradespeople, trade firms and merchants",
    freeSide: "Homeowners and job customers request and track work free",
    pricingBasis: "trade-business subscription",
  },
  "craftvaro-de": {
    payer: "German tradespeople, trade firms and merchants",
    freeSide: "Homeowners and job customers request and track work free",
    pricingBasis: "trade-business subscription",
  },
  qiyavo: {
    payer: "founders and companies setting up or operating in the UAE",
    freeSide: "Consultants and partner services are not charged a second platform subscription",
    pricingBasis: "business setup and ongoing compliance subscription",
  },
  criclume: {
    payer: "cricket clubs, leagues, competitions and academies",
    freeSide: "Players, parents, supporters, scorers, coaches and officials use CricLume free",
    pricingBasis: "organisation subscription by club, academy or competition size",
    forecastVolumeLabel: "Paying clubs and leagues",
    forecastAccountLabel: "paying cricket organisation",
    revenuePerUnitLabel: "Average revenue per paying cricket organisation / month",
    attritionLabel: "Cricket organisations cancelling each month",
  },
  depotmesh: {
    payer: "warehouse, depot and logistics operators",
    freeSide: "Their staff and customers use the relevant portals under the operator account",
    pricingBasis: "subscription per warehouse or depot site",
  },
  tendryva: {
    payer: "companies, bid teams and bid-writing agencies",
    freeSide: "Tender publishers and buying authorities are not charged by Tendryva",
    pricingBasis: "business subscription by bid volume and team size",
  },
  syndriva: {
    payer: "professional creators, businesses and agencies using the software",
    freeSide: "Their audiences and brand customers are not charged by Syndriva",
    pricingBasis: "subscription by profiles, brands, users and processing allowance",
  },
  athlyvo: {
    payer:
      "sports venues, leisure trusts, schools with bookable facilities and multi-site operators",
    freeSide: "Players, organisers, teams, clubs, coaches and officials use Athlyvo free",
    pricingBasis: "venue subscription by locations, spaces and operating features",
    forecastVolumeLabel: "Paying venue accounts",
    forecastAccountLabel: "paying venue account",
    revenuePerUnitLabel: "Average revenue per paying venue / month",
    attritionLabel: "Venues cancelling each month",
  },
  nearcura: {
    payer: "care agencies, care providers and commissioning organisations",
    freeSide: "Families, care recipients and individual carers use the network free",
    pricingBasis: "provider or commissioner subscription",
  },
  affivon: {
    payer: "external publishers, agencies and participating retail partners",
    freeSide: "Shoppers never pay Affivon",
    pricingBasis: "publisher subscription plus business-paid affiliate income",
  },
};

const CONSUMER_FUNDED: Record<string, ModelSeed> = {
  taxcenda: {
    payer: "taxpayer clients buying U.S. return preparation and filing",
    freeSide: "The IRS, tax authorities and professional partners are not charged by TaxCenda",
    pricingBasis: "fixed fee per supported return or annual taxpayer support plan",
    forecastVolumeLabel: "Paying taxpayer cases",
    forecastAccountLabel: "paying taxpayer case",
    revenuePerUnitLabel: "Average revenue per completed taxpayer case",
    attritionLabel: "Monthly change in filing case volume",
  },
  traderos: {
    payer: "self-directed individual traders using the analysis and signal tools",
    freeSide: "Brokers, exchanges and market-data providers are integrations or suppliers and are not charged as a second customer side",
    pricingBasis: "individual monthly or annual subscription",
    forecastVolumeLabel: "Paying trader subscriptions",
    forecastAccountLabel: "paying trader subscription",
    revenuePerUnitLabel: "Average revenue per paying trader / month",
    attritionLabel: "Trader subscriptions cancelling each month",
  },
  unipathway: {
    payer: "students and their families buying the admissions and visa-support package",
    freeSide: "Universities and service partners are not charged a second platform fee",
    pricingBasis: "fixed, transparent student service package",
    forecastVolumeLabel: "Paying student cases",
  },
  formationgenie: {
    payer: "founders buying a company-formation and compliance package",
    freeSide: "Banks, accountants and other partners are not charged by Formation Genie",
    pricingBasis: "founder package or ongoing compliance plan",
    forecastVolumeLabel: "Paying founder accounts",
  },
  stemcoach: {
    payer: "parents and learners buying exam preparation",
    freeSide:
      "Schools and teachers can recommend or support use without a separate platform charge",
    pricingBasis: "household learner subscription",
    forecastVolumeLabel: "Paying learner accounts",
  },
  nafsi: {
    payer: "individuals and families choosing the premium wellbeing plan",
    freeSide: "Mosques, charities and community partners are not charged by Nafsi",
    pricingBasis: "low-cost individual or family subscription",
    forecastVolumeLabel: "Paying individual or family accounts",
  },
  dearnext: {
    payer: "adults and families buying will, document and executor support",
    freeSide:
      "Solicitors, care providers and funeral partners are not charged a second platform fee",
    pricingBasis: "consumer package or family subscription",
    forecastVolumeLabel: "Paying family accounts",
  },
};

const AFFILIATE_STORES = new Set([
  "avenesto",
  "gearivon",
  "kidevia",
  "glowevyn",
  "drivaryn",
  "fixorlyn",
  "tripenvo",
  "formevyn",
  "pawivon",
  "deskivon",
]);

function currencyOf(brand: Pick<Brand, "region">) {
  return brand.region === "UK" ? "£" : "€";
}

export function brandPayerModel(brand: Brand): BrandPayerModel {
  const currency = currencyOf(brand);

  if (AFFILIATE_STORES.has(brand.id)) {
    const investorRevenue = `Shoppers use ${brand.name} free. Approved retailers and clearly labelled sponsors are the only paying side. The forecast uses ${currency}${brand.defaultArpu.toFixed(2)} average confirmed retailer commission per eligible order.`;
    return {
      side: "business",
      payer: "approved retailers and clearly labelled commercial sponsors",
      freeSide: "Shoppers use the storefront free and complete any purchase with the retailer",
      pricingBasis: "retailer-funded affiliate commission per confirmed eligible order",
      investorRevenue,
      pricing: [
        "Shoppers: free — no storefront membership or platform fee",
        "Only approved retailers and clearly labelled sponsors fund the storefront",
        `Forecast assumption: ${currency}${brand.defaultArpu.toFixed(2)} average confirmed commission per eligible order`,
      ],
      monetisation: [
        "Retailer-paid affiliate commission after an eligible referred order is confirmed",
        "Clearly labelled business-funded sponsorship that does not change the editorial verdict",
        "No shopper subscription, listing fee or second-side platform charge",
      ],
      forecastVolumeLabel: "Confirmed affiliate orders",
      revenuePerUnitLabel: "Average retailer commission per order",
      attritionLabel: "Monthly order drop-off",
    };
  }

  const consumer = CONSUMER_FUNDED[brand.id];
  const business = BUSINESS_FUNDED[brand.id];
  const seed = consumer ?? business;
  if (!seed) throw new Error(`No single-side payer model has been defined for ${brand.id}`);

  const side: PayerSide = consumer ? "consumer" : "business";
  const accountLabel =
    seed.forecastAccountLabel ??
    (side === "business" ? "paying business account" : "paying user account");
  const investorRevenue = brand.id === "taxcenda"
    ? `Only taxpayer clients pay TaxCenda. The IRS, tax authorities and professional partners are not charged. The forecast uses ${currency}${brand.defaultArpu} average revenue per completed supported taxpayer case; TaxCenda charges no percentage of a refund or tax saving.`
    : brand.id === "nimah"
      ? `Only participating food outlets pay Ni'mah. Customers pay the outlet's displayed discounted food price but no Ni'mah platform fee. The forecast uses ${currency}${brand.defaultArpu} average monthly revenue per paying food outlet; Ni'mah does not take a percentage of the outlet's surplus-food sales.`
    : `Only ${seed.payer} pay ${brand.name}. ${seed.freeSide}. The forecast uses ${currency}${brand.defaultArpu} average monthly revenue per ${accountLabel}; pricing is based on ${seed.pricingBasis}.`;
  const pricing = brand.id === "taxcenda"
    ? [
        "Only the taxpayer client pays TaxCenda",
        `${seed.freeSide}`,
        `Forecast working assumption: ${currency}${brand.defaultArpu} average revenue per completed supported taxpayer case`,
        "Fixed price agreed from the supported return scope before preparation begins",
        "No percentage of a refund or tax saving and no second-side platform fee",
      ]
    : brand.id === "nimah"
      ? [
          "Only participating food outlets pay Ni'mah",
          "Customers pay only the outlet's displayed discounted food price and no Ni'mah platform fee",
          `Forecast working assumption: ${currency}${brand.defaultArpu} average monthly revenue per paying food outlet`,
          "Monthly subscription per outlet with optional multi-location and promotion tools",
          "No percentage commission on surplus-food sales and no second paying side",
        ]
    : [
        `Only ${seed.payer} pay ${brand.name}`,
        `${seed.freeSide}`,
        `Forecast working assumption: ${currency}${brand.defaultArpu} average monthly revenue per ${accountLabel}`,
        `Pricing basis: ${seed.pricingBasis}`,
        "No second-side platform fee: we do not charge both the user side and the business side",
      ];
  const monetisation = brand.id === "taxcenda"
    ? [
        "Fixed preparation and filing fee paid only by the taxpayer client",
        "Optional annual support or notice-response work sold only to that same taxpayer client",
        "No IRS, tax-authority or professional-partner fee",
        "No refund-percentage fee, tax-saving share or second paying side",
      ]
    : brand.id === "nimah"
      ? [
          "Monthly subscription paid only by participating food outlets",
          "Optional multi-location, reporting and promoted-placement tools paid by that same business side",
          "No customer membership or Ni'mah platform fee",
          "No percentage commission on the outlet's surplus-food sales",
        ]
    : [
        `Primary revenue comes only from ${seed.payer}`,
        `Core charging method: ${seed.pricingBasis}`,
        "Optional onboarding, promotion or extra modules may be sold only to that same paying side",
        `The other side remains free: ${seed.freeSide}`,
      ];

  return {
    side,
    payer: seed.payer,
    freeSide: seed.freeSide,
    pricingBasis: seed.pricingBasis,
    investorRevenue,
    pricing,
    monetisation,
    forecastVolumeLabel:
      seed.forecastVolumeLabel ??
      (side === "business" ? "Paying business accounts" : "Paying user accounts"),
    revenuePerUnitLabel:
      seed.revenuePerUnitLabel ??
      (side === "business"
        ? "Average revenue per paying business / month"
        : "Average revenue per paying user / month"),
    attritionLabel:
      seed.attritionLabel ??
      (side === "business"
        ? "Paying businesses cancelling each month"
        : "Paying users cancelling each month"),
  };
}

export function payerModelCoverage(brands: Brand[]) {
  const missing: string[] = [];
  for (const brand of brands) {
    try {
      brandPayerModel(brand);
    } catch {
      missing.push(brand.id);
    }
  }
  return missing;
}
