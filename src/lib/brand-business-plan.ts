import { t } from "./i18n";
import type { Brand } from "./brands";
import { countryLabel, countryOf, sectorLabel, sectorOf, type CountryId, type SectorId } from "./brand-taxonomy";
import {
  brandAttritionLabel,
  brandDefinitionStage,
  brandPlainEnglish,
  brandRevenuePerUnitLabel,
  brandRevenuePlainEnglish,
  brandVolumeLabel,
} from "./brand-investor-summary";

export type PlainBusinessPlan = {
  territory: string;
  businessType: string;
  stage: "Defined product" | "Concept only";
  summary: string;
  customer: string;
  marketOpportunity: string;
  problem: string;
  solution: string;
  revenue: string;
  salesPlan: string;
  operations: string;
  territoryPlan: string;
  expansionPlan: string;
  milestones: string[];
  successMeasures: string[];
  reasonsItCanWin: string[];
  mainRisks: string[];
};

export type BusinessPlanAssumptions = {
  initialUsers?: number;
  arpu?: number;
  userGrowth?: number;
  churn?: number;
  directCost?: number;
};

function simplifyInvestorLanguage(text: string): string {
  return text
    .replace(/\bSaaS\b/g, "subscription software")
    .replace(/\bSMEs\b/g, "small and medium businesses")
    .replace(/\bSME\b/g, "small or medium business")
    .replace(/\bB2B\b/g, "business customers")
    .replace(/\bB2C\b/g, "consumer customers")
    .replace(/\bCRM\b/g, "customer-management system")
    .replace(/\bAPIs\b/g, "system connections")
    .replace(/\bAPI\b/g, "system connection")
    .replace(/\bTAM\b/g, "possible annual market")
    .replace(/\bGMV\b/g, "total value sold")
    .replace(/\bCAGR\b/g, "yearly growth")
    .replace(/\bDMCs\b/g, "local travel companies")
    .replace(/\bDMC\b/g, "local travel company")
    .replace(/\bF&B\b/g, "food and drink")
    .replace(/\bHR\b/g, "people teams")
    .replace(/\bPLZ\b/g, "postcode")
    .replace(/\bARPU\b/g, "average monthly revenue per customer");
}

const PROBLEMS: Record<SectorId, string> = {
  travel: "People normally search several websites, message suppliers separately and still cannot easily tell who is trustworthy or what the final price will be.",
  property: "Property work is spread across portals, spreadsheets, email, paper files and different contractors, so tasks are missed and nobody has one reliable record.",
  jobs: "Employers spend too long screening unsuitable applicants, while good candidates struggle to find roles that match their skills and qualifications.",
  care: "Families find it hard to compare trusted support, and providers often run important care, staff and compliance work in separate systems.",
  education: "Learners, parents and education providers use disconnected tools for teaching, records, payments and progress, which creates extra work and poor visibility.",
  automotive: "Drivers and motor businesses use separate services for search, checks, quotes, documents, payments and aftercare, making the journey slow and uncertain.",
  food: "Food and hospitality businesses lose time and margin to paper records, disconnected systems and marketplaces that charge on every order or booking.",
  compliance: "Businesses and professionals must complete complex legal or compliance work, but the evidence is often scattered and deadlines are easy to miss.",
  finance: "Money, tax and payment tasks are complicated, repetitive and easy to get wrong when records sit in different systems.",
  trades: "Customers struggle to find reliable tradespeople, while tradespeople juggle quotes, jobs, materials, evidence and payments across separate tools.",
  local: "People cannot easily find reliable local information that matches their real needs, and local businesses struggle to stand out without paying high lead fees.",
  commerce: "Sellers and buyers use disconnected tools for products, prices, orders, delivery and customer service, while large marketplaces take a share of each sale.",
  sport: "Clubs, coaches and customers organise bookings, attendance, payments, records and communication through spreadsheets and message groups.",
  logistics: "Operators cannot clearly see every site, vehicle, movement, document and cost in one place, which hides delays and lost margin.",
  software: "Small businesses use too many separate tools for customers, communication and routine work, increasing cost and making service inconsistent.",
};

const SALES_PLANS: Record<SectorId, string> = {
  travel: "Start with destination pages that appear in search, recruit verified local suppliers, use travel creators and partner agencies, then encourage repeat and referral bookings.",
  property: "Win a small number of agencies, landlords or property professionals through direct demonstrations, trade bodies and postcode-focused search pages, then expand across their portfolios.",
  jobs: "Recruit employers directly, build specialist job pages for search traffic and use professional associations, universities and referral partners to attract candidates.",
  care: "Recruit trusted providers locally, work with councils, employers and community groups, and build postcode pages that help families find the right support.",
  education: "Sell directly to schools, centres, tutors or employers, support them through onboarding, and use useful learning content and referrals to attract learners.",
  automotive: "Recruit dealers and service providers first, attract customers through vehicle and postcode search pages, and build partnerships with finance, insurance and trade organisations.",
  food: "Demonstrate the time and fee saving to independent operators, onboard them locally, and grow through suppliers, trade groups, referrals and search pages.",
  compliance: "Use direct sales, professional associations, accountants, insurers and educational content to reach organisations before an inspection, filing or renewal is due.",
  finance: "Win customers through accountants, ecommerce partners and clear educational content, then keep them through reliable monthly reporting and reminders.",
  trades: "Recruit verified tradespeople and merchants by postcode, then attract customers through local search, property partners and referrals from completed jobs.",
  local: "Build useful town and postcode pages, let businesses claim verified profiles, and grow through community groups, local partners and customer referrals.",
  commerce: "Recruit sellers with a free trial, provide guided catalogue setup, and grow through ecommerce agencies, supplier partners, useful market data and seller referrals.",
  sport: "Start with clubs, coaches and venues in one area or league, provide hands-on setup, and grow through governing bodies, local councils, competitions and member referrals.",
  logistics: "Sell directly to depot, warehouse and fleet operators using a clear cost-saving demonstration, then expand from one site to every site in the group.",
  software: "Target a narrow type of small business first, offer a guided free trial, and grow through agencies, resellers, integrations, useful content and customer referrals.",
};

const OPERATIONS: Record<SectorId, string> = {
  travel: "The central team runs the booking technology and support. Local staff or partners check suppliers, manage availability and help travellers when a booking needs human support.",
  property: "The shared team runs the software and support, while property specialists maintain templates, checks and partner relationships for the local market.",
  jobs: "The platform handles matching and workflow. A small local team checks employers, monitors job quality and supports important hires or compliance questions.",
  care: "Technology manages matching and records, but trained staff remain responsible for provider checks, safeguarding escalation and local partner support.",
  education: "The shared platform handles users, content delivery and payments. Education staff approve content, support providers and monitor learner outcomes.",
  automotive: "The platform manages the customer journey. Local operations staff check businesses, documents and service quality and handle exceptions.",
  food: "The shared team operates the software and support. Food-safety or hospitality specialists maintain local workflows and onboard operators.",
  compliance: "The software organises work and evidence. Qualified local advisers approve templates and deal with regulated questions that cannot be answered by software alone.",
  finance: "The system automates routine work, while qualified finance or tax partners review regulated or high-risk cases and keep local rules current.",
  trades: "The platform manages requests, quotes and job records. Local operations verify traders, handle disputes and maintain merchant and delivery relationships.",
  local: "A central team runs the platform, while local verification and moderation keep listings accurate and respond to community reports.",
  commerce: "The shared team runs the storefront, payments and support. Each seller controls its products, prices and fulfilment, with platform checks for abuse and service quality.",
  sport: "The platform handles bookings and administration. Club, league or venue staff remain in control, while the shared team provides onboarding and support.",
  logistics: "The shared team operates the software, while each customer controls its sites and staff. Local support handles integrations, training and operational exceptions.",
  software: "One shared product and support team runs the platform. Customers configure their own staff and workflows, with guided onboarding and human help when needed.",
};

const TERRITORY_PLANS: Record<CountryId, string> = {
  DE: "Launch in German with euro pricing, SEPA and card payments, German customer support and data-protection documents written for German law. Use German professional bodies and local search terms, and obtain specialist legal review where the service is regulated.",
  UK: "Launch in English with pound pricing, postcode search, UK card and bank payments and UK-based support. Complete UK GDPR, consumer and business terms, tax treatment and any sector-specific checks before taking paying customers.",
  PK: "Launch with locally affordable prices, mobile-first pages and Urdu plus English support. Add common local payment methods and recruit trusted education, employer or business partners city by city.",
  AE: "Launch in English and Arabic with dirham pricing and a UAE-compatible payment provider. Build partnerships with free zones and local service firms, and obtain legal review for licensing, employment, tax or property activity.",
  INT: "Launch market by market rather than treating the world as one market. Start in the countries where the group already has customers or partners, show local prices and languages, and complete payment, tax, privacy and sector checks before opening each new country.",
};

const EXPANSION_PLANS: Record<CountryId, string> = {
  DE: "After proving demand in Germany, reuse the same product in Austria and other suitable EU markets, changing language, tax, payments and local rules before launch.",
  UK: "After proving demand in the UK, expand to Ireland and selected English-speaking markets or create a separate local version where regulation differs.",
  PK: "After proving demand in Pakistan's largest cities, expand nationally and then into suitable South Asian or Gulf markets using separate local prices and partners.",
  AE: "After proving demand in the UAE, expand into Saudi Arabia and the wider Gulf using local entities or partners where required.",
  INT: "Expand in waves: prove one or two anchor markets, measure acquisition cost and retention, then open the next territory only when local partners, payments and compliance are ready.",
};

export function plainBusinessPlan(
  brand: Brand,
  assumptions: BusinessPlanAssumptions = {},
): PlainBusinessPlan {
  const country = countryOf(brand);
  const sector = sectorOf(brand);
  const conceptOnly = brandDefinitionStage(brand) === "concept";
  const currency = country === "UK" ? "£" : "€";
  const initialUsers = assumptions.initialUsers ?? brand.defaultInitialUsers;
  const arpu = assumptions.arpu ?? brand.defaultArpu;
  const userGrowth = assumptions.userGrowth ?? brand.defaultUserGrowth;
  const churn = assumptions.churn ?? brand.defaultChurn;
  const directCost = assumptions.directCost ?? brand.defaultDirectCost;
  const affiliateStore = brand.revenueUnit === "affiliate-order";
  const venueFundedSport = brand.id === "athlyvo";
  const volumeLabel = brandVolumeLabel(brand);
  const revenuePerUnitLabel = brandRevenuePerUnitLabel(brand);
  const attritionLabel = brandAttritionLabel(brand);

  if (conceptOnly) {
    return {
      territory: countryLabel(country),
      businessType: sectorLabel(sector),
      stage: "Concept only",
      summary: brandPlainEnglish(brand),
      customer: t("Not yet approved."),
      marketOpportunity: t("No reliable market estimate should be shown until the customer and product scope are approved."),
      problem: t("The customer problem has not yet been approved, so no market or revenue claim should be treated as an active business plan."),
      solution: t("Complete a written product brief, customer interviews, competitor check and legal review before development or investor forecasting."),
      revenue: brandRevenuePlainEnglish(brand),
      salesPlan: t("No sales spending should begin until the target customer and offer are approved."),
      operations: t("No operating team should be assigned until scope, ownership and launch conditions are approved."),
      territoryPlan: t(TERRITORY_PLANS[country]),
      expansionPlan: t("Expansion should be considered only after the first territory and business model are approved."),
      milestones: [
        t("Approve the customer, problem and product scope."),
        t("Interview at least 20 potential customers and test willingness to pay."),
        t("Complete competitor, legal and unit-economics checks."),
        t("Only then set a launch date and financial forecast."),
      ],
      successMeasures: [t("Approved product brief"), t("Evidence of customer demand"), t("Credible pricing test"), t("Named launch owner")],
      reasonsItCanWin: [t("Not yet established — this must be proven through customer and competitor research.")],
      mainRisks: [t("The product, customer, pricing and route to market are not yet defined.")],
    };
  }

  return {
    territory: countryLabel(country),
    businessType: sectorLabel(sector),
    stage: "Defined product",
    summary: brandPlainEnglish(brand),
    customer: brand.payerModel
      ? `${t("Paying side:")} ${t(brand.payerModel.payer)}. ${t("Free side:")} ${t(brand.payerModel.freeSide)}.`
      : t(simplifyInvestorLanguage(brand.audience)),
    marketOpportunity: t(simplifyInvestorLanguage(brand.market)),
    problem: affiliateStore ? t(simplifyInvestorLanguage(brand.reason)) : t(PROBLEMS[sector]),
    solution: `${brandPlainEnglish(brand)} ${t("The first release focuses on the smallest complete customer journey, with extra features added only after real usage proves the need.")}`,
    revenue: brand.payerModel
      ? t(brand.payerModel.investorRevenue)
      : affiliateStore
        ? `${t("Shoppers pay nothing to use the site. An approved retailer pays commission after a referred shopper completes an eligible order. The forecast uses")} ${currency}${arpu.toFixed(2)} ${t("average confirmed commission per order; the actual rate depends on the retailer, category and country.")}`
        : brand.monetisation?.length
          ? `${simplifyInvestorLanguage(brand.monetisation.slice(0, 3).join(". "))}.`
          : `${t("Paying customers are modelled at an average of")} ${currency}${arpu} ${t("per month after a two-month free trial. The detailed forecast can also include setup, optional extras and partner income.")}`,
    salesPlan: affiliateStore
      ? "Publish genuinely useful buying guides for high-intent questions, earn search and social traffic, build an email audience and send shoppers only to approved retailers through clearly disclosed tracked links."
      : venueFundedSport
        ? "Build each launch area postcode by postcode. Add factual venue information from lawful public sources, clearly label unclaimed profiles, and invite operators to claim, correct and verify them. Bring players in free through clubs, leagues, schools, employers and community groups. Demonstrate to venues that live availability, confirmations, waitlists and off-peak promotion increase filled hours and reduce administration, then convert the venue after its 60-day trial."
        : brand.payerModel
          ? `${SALES_PLANS[sector]} Commercial rule: the sales team targets only ${brand.payerModel.payer}. The other side remains free, helping the paying customer receive more value without creating a second charging barrier.`
          : t(SALES_PLANS[sector]),
    operations: affiliateStore
      ? "Affivon imports approved retailer data, creates tracked links and reports confirmed commission. A human editor remains responsible for product claims, comparison quality, disclosure and removing stale or misleading content. The retailer handles payment, delivery and returns."
      : venueFundedSport
        ? "The shared team maintains venue data, claim checks, booking technology, payments and support. Unclaimed profiles show only factual public information and cannot publish live availability. A venue must prove ownership or authority before controlling its profile. Venues set their own prices, availability and cancellation rules; Athlyvo organises the booking and confirmation record."
        : t(OPERATIONS[sector]),
    territoryPlan: venueFundedSport
      ? "Launch in one UK area with pound pricing, postcode and distance search, UK card payments and UK-based support. Build dense coverage across football and five-a-side, cricket, padel, tennis and pickleball before opening the next area. Complete UK GDPR, marketplace, payment, safeguarding, facility-booking and consumer terms, and give every unclaimed venue a clear correction, claim and removal route."
      : t(TERRITORY_PLANS[country]),
    expansionPlan: venueFundedSport
      ? "Expand across England postcode by postcode only after the first areas show repeated player use, useful venue occupancy gains and retained paying venues. Then localise facility rules, governing-body relationships and public-sector procurement for Wales, Scotland and Northern Ireland before considering Ireland or other countries."
      : t(EXPANSION_PLANS[country]),
    milestones: affiliateStore
      ? [
          "Before launch: obtain approval for each retailer programme, create the correct country tracking IDs, publish affiliate disclosures and test every product link.",
          "Months 1–2: launch the first useful category and buying-guide pages, measure search visibility, clicks and retailer-reported orders, and correct weak or misleading content.",
          `Months 3–6: publish the highest-intent buying guides and work toward ${initialUsers.toLocaleString("en-GB")} confirmed affiliate orders while measuring earnings per visitor and per article.`,
          "Months 7–12: refresh winning content, add only approved retailers and countries, build email and direct traffic and stop work on pages that do not earn or help shoppers.",
        ]
      : venueFundedSport
        ? [
          `Before launch: seed accurate venue profiles in the first UK area, add claim, correction and removal controls, finish the free player journey and test booking confirmations with selected venues and teams.`,
          `Months 1–2: onboard venues to the 60-day full trial, recruit players and organisers free, and measure searches, confirmed attendance, filled empty slots and avoided no-shows.`,
          `Months 3–6: convert trials and work toward ${initialUsers.toLocaleString("en-GB")} paying venue accounts while keeping players, teams, clubs, coaches and officials free.`,
          "Months 7–12: expand only into nearby postcodes and sports where enough venue supply and player demand can create reliable local coverage.",
        ]
        : [
          `Before launch: finish the core journey, payments, local legal documents, support training and a controlled customer test in ${countryLabel(country)}.`,
          `Months 1–2: onboard the first trial customers, watch how they use the product and fix the main reasons they do not complete the journey.`,
          `Months 3–6: convert trials to paid plans and work toward ${initialUsers.toLocaleString("en-GB")} ${volumeLabel.toLowerCase()} while measuring the true cost of winning and supporting each account.`,
          "Months 7–12: grow the channels that produce retained customers, add selected partners and pause any channel that loses money.",
        ],
    successMeasures: affiliateStore
      ? [
          `${initialUsers.toLocaleString("en-GB")} confirmed affiliate orders in the starting revenue month`,
          `${currency}${arpu.toFixed(2)} average confirmed commission per eligible order`,
          `${(userGrowth * 100).toFixed(0)}% modelled monthly growth in confirmed orders`,
          "Retailer links, prices and disclosures checked and kept current",
          `Direct monthly brand cost kept near ${currency}${directCost.toLocaleString("en-GB")}`,
        ]
      : venueFundedSport
        ? [
          `${initialUsers.toLocaleString("en-GB")} starting paying venue accounts after the 60-day trial`,
          `${currency}${arpu} average monthly revenue per paying venue`,
          `${(userGrowth * 100).toFixed(0)}% modelled monthly growth in paying venues`,
          `${(churn * 100).toFixed(1)}% or lower monthly venue cancellations`,
          "Players and organisers remain free, with no Athlyvo player service fee",
          "Measured improvement in filled venue hours, confirmed attendance and repeat bookings",
          `Direct monthly brand cost kept near ${currency}${directCost.toLocaleString("en-GB")}`,
        ]
        : [
          `${initialUsers.toLocaleString("en-GB")} starting ${volumeLabel.toLowerCase()} after the free-trial period`,
          `${currency}${arpu} ${revenuePerUnitLabel.toLowerCase()}`,
          `${(userGrowth * 100).toFixed(0)}% modelled monthly growth in ${volumeLabel.toLowerCase()}`,
          `${(churn * 100).toFixed(1)}% or lower ${attritionLabel.toLowerCase()}`,
          `Direct monthly brand cost kept near ${currency}${directCost.toLocaleString("en-GB")}`,
        ],
    reasonsItCanWin: brand.competitors.slice(0, 3).map(
      (competitor) => `Against ${competitor.name}: ${simplifyInvestorLanguage(competitor.counter)}`,
    ),
    mainRisks: brand.risks.slice(0, 3).map(
      (risk) => `${simplifyInvestorLanguage(risk.risk)} — response: ${simplifyInvestorLanguage(risk.mitigation)}`,
    ),
  };
}
