import type { Brand } from "./brands";
import type { Lang } from "./i18n";
import { PLAIN_GERMAN_SUMMARIES } from "./brand-investor-summary-de";

/**
 * A deliberately jargon-free answer to the first question an investor asks:
 * "What does this business actually do?"
 *
 * Keep these to one short sentence. The long product copy remains available on
 * the detail page for investors who want to go deeper.
 */
const PLAIN_ENGLISH_SUMMARIES: Record<string, string> = {
  haccora:
    "Helps restaurants replace paper food-safety records with simple digital checks and inspection-ready reports.",
  kinderstars: "Helps families find, check, book and pay trusted babysitters, nannies and tutors.",
  eventplanrger:
    "Lets people plan an event, find trusted German suppliers and manage guests, quotes, payments and timings in one place.",
  rettio: "Lets shops and restaurants sell surplus food instead of throwing it away.",
  kiezio:
    "Helps people find verified local places that match their language, diet, faith, accessibility and everyday needs.",
  beratermarkt:
    "Helps people and businesses find verified German lawyers, accountants, tax advisers and auditors.",
  stellenxpert:
    "Collects jobs from different websites and helps German employers find suitable candidates more quickly.",
  viazeno:
    "Lets customers book trusted private drivers while giving driver companies the tools to manage bookings without paying commission.",
  immoviq:
    "Gives landlords and letting agents one system for tenants, leases, repairs, charges and property records.",
  beinstandplus:
    "Guides people through difficult practical tasks in Germany, including relocation, bereavement, funeral choices, likely costs and relevant policy or support routes.",
  traindirekt:
    "Provides online German-language and technology courses that may be paid for by government or employers.",
  zivvo: "A trusted German website for buying, selling, valuing and financing cars.",
  omniqora:
    "Puts a business's calls, messages, emails, customer tasks and AI assistants into one shared system.",
  unipathway:
    "Guides Pakistani students through university applications, language preparation and visas for the UK and Germany.",
  zivvouk:
    "A trusted UK website for buying and selling checked cars, with finance, payment and delivery support.",
  kinderstarsuk:
    "Helps UK parents find registered childminders and gives childminders tools for bookings, records, invoices and compliance.",
  eventplanruk:
    "Lets people plan an event, find trusted UK suppliers and manage guests, quotes, payments and timings in one place.",
  taxnuvia: "Lets UK businesses compare fixed-price quotes from checked accountants.",
  gabley:
    "Gives UK estate agents and landlords one place to advertise property and manage sales, lettings, tenants and legal checks.",
  stylesyncuk:
    "Lets customers book salons and gives salons tools for diaries, staff, stock, payments and marketing.",
  xpertjobs:
    "Matches skilled professionals with specialist jobs and helps employers check qualifications and arrange interviews.",
  traderos:
    "Gives self-directed traders explained market signals, risk tools, alerts and an honest record of results across forex, indices, commodities and crypto.",
  amityos:
    "Helps care providers run visits, medication, staff, records and billing, while helping families find trusted care.",
  skillfinch:
    "Provides required staff training and keeps the evidence organisations need for inspections.",
  formationgenie:
    "Sets up UK companies and then helps owners manage filings, tax registrations, banking and deadlines.",
  merqano:
    "Creates and runs separate ecommerce websites for different customer businesses from one shared system.",
  stylesyncger:
    "Lets German customers book beauty services and gives salons tools for diaries, customers, payments and administration.",
  parkpunkt:
    "Lets drivers find, book and pay for parking while giving car-park operators tools to manage their spaces.",
  lawquo:
    "Helps clients find verified lawyers and keeps each legal matter's documents, agreed fees and payments together.",
  zoryn:
    "Runs one loyalty wallet for points, cashback and offers across the group's brands and outside retailers.",
  marktpass:
    "Helps sellers complete the product registrations and paperwork required before selling goods in the EU.",
  dishbee:
    "Gives food businesses online ordering, a till, kitchen screens, stock control and loyalty in one system.",
  dubaitrips:
    "Lets travellers book checked tours, attractions and activities across Dubai and the UAE.",
  marocways: "Lets travellers book checked Morocco tours, riads, desert trips and private drivers.",
  fleetsora:
    "Lets fleet operators run vehicles, drivers, tracking, maintenance and compliance under their own brand.",
  sharedbricks:
    "Lets people invest small amounts in shares of property and receive a share of the rent.",
  stemcoach:
    "Helps students prepare for school and language exams with practice questions, mock tests and progress tracking.",
  zorynnexus:
    "Provides the payment, wallet, payout and rewards technology used by the group's brands and outside businesses.",
  onyngo:
    "Gives restaurants and shops ordering, tills and delivery tools for a flat fee instead of taking a cut from every order.",
  hmoflow:
    "Helps shared-house landlords manage rooms, tenants, rent, repairs, inspections and licence deadlines.",
  nafsi:
    "A Muslim wellbeing app combining private emotional support, mood tracking, journaling, duas and Qur'an guidance.",
  "haccora-uk":
    "Helps UK food businesses complete food-safety checks and find verified hygiene and compliance specialists.",
  cirqiva:
    "Lets customers book waste collection and gives licensed waste companies tools for jobs, routes and legal paperwork.",
  "docuvera-de":
    "Helps German surveyors and inspectors capture trustworthy site evidence and turn it into professional reports.",
  "docuvera-uk":
    "Helps UK surveyors and inspectors capture trustworthy site evidence and turn it into professional reports.",
  bidlumo: "Finds suitable tenders and helps businesses prepare complete, compliant bids.",
  saathera:
    "Matches older or isolated people with checked local companions for visits, transport and activities.",
  autohashi:
    "Manages the entire process of importing a Japanese vehicle to the UK, from auction bid to registration and handover.",
  gableyretrofit:
    "Guides a homeowner from assessing their property through quotes, funding, installation, evidence, warranties and energy savings.",
  baytcircle:
    "Helps Gulf families, home educators, expatriates and local residents find groups, arrange events and book spare capacity at trusted family venues.",
  taxcenda:
    "Prepares and files U.S. federal and state tax returns for taxpayer clients in America and abroad, using appropriately credentialed U.S. tax professionals.",
  nimah:
    "Lets food businesses in Saudi Arabia and Pakistan sell safe surplus food at reduced prices for nearby customers to reserve and collect.",
  auvaneone:
    "Gives international members one human-led concierge for complex lifestyle, travel, dining, event and transport requests made through the app, web or WhatsApp.",
  ilmvero:
    "Gives schools one system for admissions, attendance, timetables, exams, fees, homework and parent communication.",
  dearnext:
    "Guides families through wills, important documents, funeral wishes and instructions for executors.",
  tareevo:
    "Helps UAE businesses manage visas, employee documents, payroll rules and government renewal deadlines.",
  uzvoya: "Lets travellers book Silk Road tours, guides, transfers and hotels across Central Asia.",
  yetkiva:
    "Gives Uzbekistan's marketplaces, merchants and delivery businesses one system for riders, vehicles, dispatch, tracking, direct orders and delivery costs.",
  recovrable:
    "Helps businesses chase unpaid invoices, offer payment plans and prepare legal claims when needed.",
  merqora:
    "Helps sellers and agencies manage and grow sales on Amazon and other online marketplaces from one workspace.",
  lessonahead:
    "Helps learners find checked tutors and driving instructors and gives providers tools for lessons, progress, scheduling and billing.",
  motoresq:
    "Lets drivers compare and book vehicle recovery, repairs and servicing while providers manage the work without paying commission.",
  premisora:
    "Helps commercial landlords and tenants manage leases, rent reviews, charges, certificates and contractors.",
  hexareve:
    "Lets travellers book checked stays, tours, transport and activities across France in one place.",
  bosporiva:
    "Lets travellers book checked stays, tours, transport and experiences across Türkiye in one place.",
  eastamira:
    "Lets travellers book checked stays, tours, transport and activities across Southeast Asia in one place.",
  corazora:
    "Lets travellers book stays, festivals and food experiences across Spain, Portugal and Latin America.",
  fiftyroam:
    "Plans slower, more accessible holidays and small-group trips for travellers aged over fifty.",
  canavelle:
    "Lets travellers book Canary Islands and Atlantic stays, activities and longer winter escapes.",
  rangvaya:
    "Lets travellers book checked stays, tours and transport across South Asia in one place.",
  oceavela:
    "Lets groups compare and book yacht or catamaran charters and island-hopping trips with clear total prices.",
  savansea:
    "Lets travellers book checked safaris, island stays, tours and transport across Africa and the Indian Ocean.",
  nilevella:
    "Lets travellers book checked Egypt tours, Nile cruises, stays and transport in one place.",
  adrilume:
    "Lets travellers book Italy and Adriatic coastal stays, sailing trips, transfers and local experiences.",
  marelyra:
    "Lets travellers book checked Mediterranean stays, island trips, tours, boats and transport in one place.",
  iberaviva:
    "Lets travellers book supported walking, cycling and wellness holidays across Spain and Portugal.",
  euralume:
    "Lets travellers book multi-country trips, city tours, rail journeys, stays and transfers across Northern and Central Europe.",
  farenivo:
    "Lets travellers compare and book flights, trains and coaches, and lets travel agencies use the same booking technology.",
  niyyahnoor:
    "Lets Muslim travellers arrange faith-based journeys, stays, tours and transfers in Saudi Arabia.",
  travenexa:
    "Provides the shared booking and supplier-management system that powers the group's travel brands and outside travel agencies.",
  "craftvaro-uk":
    "Helps UK tradespeople find and manage jobs, buy materials and arrange delivery to site.",
  "craftvaro-de":
    "Helps German tradespeople find and manage jobs, buy materials and arrange delivery to site.",
  qiyavo:
    "Helps people set up and run a UAE company, including visas, banking, payroll, tax and ongoing legal tasks.",
  criclume:
    "Gives cricket clubs scoring, match video, coaching review, player records, league administration and payments in one place.",
  tendryva:
    "Finds suitable public and private tenders and helps teams decide whether to bid and prepare the response.",
  syndriva:
    "Turns one piece of content into versions for many social channels and helps creators manage publishing, messages and brand deals.",
  nearcura:
    "Helps UK families find trusted local care and lets carers and agencies manage visits, plans, payments and family updates.",
  affivon:
    "Runs multiple affiliate shopping websites from one shared system for products, content, retailer links, compliance and commission reporting.",
  depotmesh:
    "Helps bonded warehouses, ordinary warehouses and logistics depots control goods, customs status, storage, handling, documents and billing.",
  avenesto:
    "Helps shoppers compare home and living products and then buy from approved retailers through tracked affiliate links.",
  gearivon:
    "Helps shoppers compare technology and electronics and then buy from approved retailers through tracked affiliate links.",
  kidevia:
    "Helps parents and carers compare baby, children's and family products before buying from approved retailers.",
  glowevyn:
    "Helps shoppers compare beauty, skincare and wellness products before buying from approved retailers.",
  drivaryn:
    "Helps drivers compare automotive accessories and equipment before buying from approved retailers.",
  fixorlyn:
    "Helps shoppers compare tools, DIY and home-improvement products before buying from approved retailers.",
  tripenvo:
    "Helps travellers compare luggage, travel accessories and outdoor gear before buying from approved retailers.",
  formevyn:
    "Helps shoppers compare fitness, training and sports products before buying from approved retailers.",
  pawivon: "Helps pet owners compare pet products before buying from approved retailers.",
  deskivon:
    "Helps remote workers, students and businesses compare office and workspace products before buying from approved retailers.",
  kalethon:
    "Lets people organise and play sport for free, while venues pay to claim their profiles, publish live availability, fill empty slots and manage bookings.",
};

const CONCEPT_ONLY_IDS = new Set<string>();

export type BrandDefinitionStage = "defined" | "concept";

export function brandDefinitionStage(brand: Brand): BrandDefinitionStage {
  return CONCEPT_ONLY_IDS.has(brand.id) ? "concept" : "defined";
}

export function brandPlainEnglish(brand: Brand): string {
  if (CONCEPT_ONLY_IDS.has(brand.id)) {
    return `${brand.name} is a reserved brand and domain. Its product, target customer and business model have not yet been approved.`;
  }
  return PLAIN_ENGLISH_SUMMARIES[brand.id] ?? brand.description;
}

export function brandPlainLanguage(brand: Brand, lang: Lang): string {
  if (lang === "de") {
    return (
      PLAIN_GERMAN_SUMMARIES[brand.id] ??
      `${brand.name} bietet eine digitale Lösung für ${brand.audience}.`
    );
  }
  return brandPlainEnglish(brand);
}

export function brandRevenuePlainEnglish(brand: Brand): string {
  if (CONCEPT_ONLY_IDS.has(brand.id)) {
    return "No revenue model should be presented to investors until the product scope is approved.";
  }
  const currency = brand.region === "UK" ? "£" : "€";
  if (brand.payerModel) return brand.payerModel.investorRevenue;
  if (brand.revenueUnit === "affiliate-order") {
    return `Shoppers use the site free. An approved retailer pays a commission after a referred shopper completes an eligible order; the forecast uses an average of ${currency}${brand.defaultArpu} confirmed revenue per order.`;
  }
  if (brand.id === "kalethon") {
    return `Players, organisers, teams, clubs, coaches and officials use Kalethon free. Only venues pay; the forecast uses an average of ${currency}${brand.defaultArpu} per paying venue each month after a 60-day trial, with optional venue-funded promotion and multi-site services.`;
  }
  const otherIncome =
    brand.defaultAddlRevenue > 0
      ? " It can also earn from setup, optional extras and partner services."
      : "";
  return `Paying customers are modelled at an average of ${currency}${brand.defaultArpu} per month after a two-month free trial.${otherIncome}`;
}

export function brandVolumeLabel(brand: Brand): string {
  if (brand.payerModel) return brand.payerModel.forecastVolumeLabel;
  if (brand.id === "kalethon") return "Paying venue accounts";
  return brand.revenueUnit === "affiliate-order"
    ? "Confirmed affiliate orders"
    : "Paying customers";
}

export function brandRevenuePerUnitLabel(brand: Brand): string {
  if (brand.payerModel) return brand.payerModel.revenuePerUnitLabel;
  if (brand.id === "kalethon") return "Average revenue per paying venue / month";
  return brand.revenueUnit === "affiliate-order"
    ? "Average commission per order"
    : "Average price per customer / month";
}

export function brandAttritionLabel(brand: Brand): string {
  if (brand.payerModel) return brand.payerModel.attritionLabel;
  if (brand.id === "kalethon") return "Venues cancelling each month";
  return brand.revenueUnit === "affiliate-order"
    ? "Monthly order drop-off"
    : "Customers cancelling each month";
}

export function investorSummaryCoverage(brands: Brand[]) {
  return brands.filter(
    (brand) => !CONCEPT_ONLY_IDS.has(brand.id) && !PLAIN_ENGLISH_SUMMARIES[brand.id],
  );
}

export function portfolioDefinitionCounts(brands: Brand[]) {
  const concepts = brands.filter((brand) => brandDefinitionStage(brand) === "concept").length;
  return { defined: brands.length - concepts, concepts };
}
