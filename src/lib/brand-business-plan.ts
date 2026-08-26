import type { Brand } from "./brands";
import { countryLabel, countryOf, sectorLabel, sectorOf, type CountryId, type SectorId } from "./brand-taxonomy";
import {
  brandAttritionLabel,
  brandDefinitionStage,
  brandPlainEnglish,
  brandPlainLanguage,
  brandRevenuePerUnitLabel,
  brandRevenuePlainEnglish,
  brandVolumeLabel,
} from "./brand-investor-summary";
import type { Lang } from "./i18n";

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

const DE_PROBLEMS: Record<SectorId, string> = {
  travel: "Reisende suchen heute auf mehreren Seiten, schreiben Anbieter einzeln an und erkennen trotzdem nur schwer, wer verlässlich ist und was am Ende alles kostet.",
  property: "Immobilienarbeit verteilt sich auf Portale, Tabellen, E-Mails, Papier und verschiedene Dienstleister. Dadurch gehen Aufgaben und ein verlässlicher Gesamtüberblick verloren.",
  jobs: "Arbeitgeber prüfen zu viele unpassende Bewerbungen, während gute Fachkräfte passende Stellen nur schwer finden.",
  care: "Familien können vertrauenswürdige Hilfe nur schwer vergleichen, und Anbieter verwalten Pflege, Personal und Nachweise oft in getrennten Systemen.",
  education: "Lernende, Eltern und Bildungsanbieter nutzen getrennte Werkzeuge für Unterricht, Unterlagen, Zahlungen und Fortschritt. Das erzeugt Mehrarbeit und wenig Überblick.",
  automotive: "Fahrer und Fahrzeugbetriebe nutzen getrennte Dienste für Suche, Prüfung, Angebote, Dokumente, Zahlungen und Nachbetreuung. Das macht den Ablauf langsam und unsicher.",
  food: "Lebensmittel- und Gastronomiebetriebe verlieren Zeit und Marge durch Papierlisten, getrennte Systeme und Marktplätze mit Gebühren je Vorgang.",
  compliance: "Unternehmen müssen komplizierte gesetzliche Pflichten erfüllen, doch Nachweise liegen verteilt und Fristen werden leicht übersehen.",
  finance: "Geld-, Steuer- und Zahlungsaufgaben sind wiederkehrend, kompliziert und fehleranfällig, wenn Unterlagen in verschiedenen Systemen liegen.",
  trades: "Kunden finden nur schwer verlässliche Handwerker. Handwerksbetriebe verwalten Angebote, Aufträge, Material, Nachweise und Zahlungen in getrennten Werkzeugen.",
  local: "Menschen finden nur schwer verlässliche lokale Informationen für ihre wirklichen Bedürfnisse. Lokale Betriebe werden ohne teure Werbung kaum sichtbar.",
  commerce: "Verkäufer und Käufer nutzen getrennte Systeme für Produkte, Preise, Bestellungen, Lieferung und Service, während große Marktplätze je Verkauf mitverdienen.",
  sport: "Vereine, Trainer, Sportstätten und Spieler organisieren Buchungen, Teilnahme, Zahlungen, Unterlagen und Nachrichten über Tabellen und Chatgruppen.",
  logistics: "Betreiber sehen Standorte, Fahrzeuge, Warenbewegungen, Dokumente und Kosten nicht an einem Ort. Verzögerungen und verlorene Marge bleiben dadurch verborgen.",
  software: "Kleine Unternehmen nutzen zu viele einzelne Werkzeuge für Kunden, Kommunikation und Routinearbeit. Das erhöht Kosten und macht den Service uneinheitlich.",
};

const DE_SALES: Record<SectorId, string> = {
  travel: "Zuerst geprüfte lokale Anbieter gewinnen und hilfreiche Reiseziel-Seiten aufbauen. Danach über Suche, Reise-Partner, Empfehlungen und Stammkunden wachsen.",
  property: "Mit wenigen Maklern, Vermietern oder Fachbetrieben starten, das Produkt direkt vorführen und danach innerhalb ihrer Bestände und Regionen wachsen.",
  jobs: "Arbeitgeber direkt ansprechen, hilfreiche Fachstellen-Seiten aufbauen und Kandidaten über Verbände, Hochschulen und Empfehlungen gewinnen.",
  care: "Geprüfte Anbieter vor Ort gewinnen und über Kommunen, Arbeitgeber, Gemeinden und lokale Suchseiten Familien erreichen.",
  education: "Direkt an Schulen, Lernzentren, Lehrkräfte oder Arbeitgeber verkaufen und Lernende durch gute Inhalte, Einführung und Empfehlungen gewinnen.",
  automotive: "Zuerst Händler und Dienstleister gewinnen, Kunden über Fahrzeug- und Ortssuche erreichen und Partnerschaften mit Branchenorganisationen aufbauen.",
  food: "Unabhängigen Betrieben Zeit- und Gebührenersparnis zeigen, sie vor Ort einrichten und über Lieferanten, Verbände und Empfehlungen wachsen.",
  compliance: "Unternehmen vor Prüfungen, Meldungen und Verlängerungen über Direktvertrieb, Fachverbände, Berater und verständliche Inhalte erreichen.",
  finance: "Kunden über Buchhalter, Handelspartner und verständliche Informationen gewinnen und durch zuverlässige Berichte und Erinnerungen halten.",
  trades: "Geprüfte Handwerksbetriebe nach Region gewinnen und Kunden über lokale Suche, Immobilienpartner und Empfehlungen abgeschlossener Aufträge erreichen.",
  local: "Nützliche Ortsseiten aufbauen, Unternehmen ihre Profile übernehmen und prüfen lassen und über Gemeinden und Empfehlungen wachsen.",
  commerce: "Verkäufer mit Testphase und geführter Produkteinrichtung gewinnen und über Agenturen, Lieferanten, Marktdaten und Empfehlungen wachsen.",
  sport: "Mit Vereinen, Ligen, Trainern und Sportstätten in einer Region starten, die Einrichtung übernehmen und über Verbände, Kommunen und Empfehlungen wachsen.",
  logistics: "Lager-, Depot- und Flottenbetreibern die konkrete Kostenersparnis zeigen und nach einem erfolgreichen Standort auf die ganze Gruppe ausweiten.",
  software: "Zuerst eine eng definierte Art von Kleinunternehmen ansprechen, eine geführte Testphase anbieten und über Partner, Inhalte und Empfehlungen wachsen.",
};

const DE_OPERATIONS: Record<SectorId, string> = Object.fromEntries(
  Object.keys(DE_PROBLEMS).map((sector) => [
    sector,
    "Das gemeinsame Produkt- und Supportteam betreibt die Technik. Der Kunde verwaltet seine eigenen Daten und Abläufe; geschulte Fachleute prüfen Sonderfälle, Qualität und lokale Pflichten.",
  ]),
) as Record<SectorId, string>;

const DE_SECTOR_LABELS: Record<SectorId, string> = {
  travel: "Reisen und Tourismus", property: "Immobilien", jobs: "Arbeit und Personalvermittlung",
  care: "Pflege und Familie", education: "Bildung und Weiterbildung", automotive: "Fahrzeuge und Mobilität",
  food: "Lebensmittel und Gastronomie", compliance: "Pflichten und Recht", finance: "Finanzen und Zahlungen",
  trades: "Handwerk und Hausdienstleistungen", local: "Lokale Suche", commerce: "Handel und Marktplätze",
  sport: "Sport und Wohlbefinden", logistics: "Logistik und Flotten", software: "Unternehmenssoftware",
};

const DE_COUNTRY_LABELS: Record<CountryId, string> = {
  DE: "Deutschland", UK: "Großbritannien", PK: "Pakistan", AE: "Vereinigte Arabische Emirate", INT: "International",
};

const DE_BUSINESS_PAYERS: Record<SectorId, string> = {
  travel: "Reiseveranstalter, Unterkünfte, Aktivitäts- und Transportanbieter",
  property: "Vermieter, Makler, Hausverwaltungen oder andere Immobilienbetriebe",
  jobs: "Arbeitgeber, Personalvermittler oder Ausbildungsorganisationen",
  care: "registrierte Betreuungs- und Pflegeanbieter oder beauftragende Organisationen",
  education: "Schulen, Lernanbieter, Arbeitgeber oder öffentliche Förderstellen",
  automotive: "Fahrzeughändler, Flotten- oder Fahrzeugdienstleister",
  food: "Restaurants, Cafés, Händler oder andere Lebensmittelbetriebe",
  compliance: "Unternehmen und Kanzleien, die Pflichten und Nachweise verwalten",
  finance: "Unternehmen, Händler oder Finanzpartner",
  trades: "Handwerksbetriebe, Fachfirmen oder Baustoffhändler",
  local: "lokale Unternehmen mit erweitertem oder beworbenem Profil",
  commerce: "Händler, Verkäufer, Marken oder Plattformbetreiber",
  sport: "Vereine, Ligen, Akademien oder Sportstätten",
  logistics: "Lager-, Depot-, Flotten- oder Logistikbetreiber",
  software: "Unternehmen und Agenturen, die die Software einsetzen",
};

const DE_TERRITORY: Record<CountryId, string> = {
  DE: "Start auf Deutsch mit Euro-Preisen, SEPA- und Kartenzahlung, deutschem Support sowie Datenschutz- und Vertragsunterlagen nach deutschem Recht. Für regulierte Leistungen erfolgt eine fachliche Rechtsprüfung.",
  UK: "Start auf Englisch mit Pfund-Preisen, Postleitzahlsuche, britischen Zahlungen und Support. Vor zahlenden Kunden werden Datenschutz, Verträge, Steuern und branchenspezifische Pflichten geprüft.",
  PK: "Start mit bezahlbaren lokalen Preisen, mobil optimierten Seiten sowie Urdu- und Englisch-Support. Danach Stadt für Stadt über vertrauenswürdige Bildungs-, Arbeitgeber- oder Geschäftspartner wachsen.",
  AE: "Start auf Englisch und Arabisch mit Dirham-Preisen und passender Zahlungsabwicklung. Partnerschaften mit Freizonen und lokalen Dienstleistern aufbauen und Lizenzen, Arbeit, Steuern und Immobilienrecht prüfen.",
  INT: "Nicht weltweit auf einmal starten. Zuerst Länder mit vorhandenen Kunden oder Partnern öffnen und vor jedem weiteren Markt Sprache, Preise, Zahlung, Steuer, Datenschutz und Branchenregeln anpassen.",
};

const DE_EXPANSION: Record<CountryId, string> = {
  DE: "Nach bewiesener Nachfrage in Deutschland auf Österreich und geeignete EU-Märkte ausweiten und vorher Sprache, Steuern, Zahlungen und Regeln anpassen.",
  UK: "Nach bewiesener Nachfrage in Großbritannien auf Irland und ausgewählte englischsprachige Märkte ausweiten oder bei anderen Regeln eine eigene lokale Version schaffen.",
  PK: "Nach einem erfolgreichen Start in den größten Städten landesweit und danach mit eigenen Preisen und Partnern in passende südasiatische oder Golf-Märkte wachsen.",
  AE: "Nach bewiesener Nachfrage in den VAE mit lokalen Partnern oder Gesellschaften nach Saudi-Arabien und in weitere Golfstaaten wachsen.",
  INT: "In Wellen wachsen: erst ein oder zwei Kernmärkte beweisen und den nächsten Markt nur öffnen, wenn Kundenkosten, Bindung, Partner, Zahlungen und Regeln tragfähig sind.",
};

export function plainBusinessPlan(
  brand: Brand,
  assumptions: BusinessPlanAssumptions = {},
  lang: Lang = "en",
): PlainBusinessPlan {
  if (lang === "de") return plainGermanBusinessPlan(brand, assumptions);
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
      customer: "Not yet approved.",
      marketOpportunity: "No reliable market estimate should be shown until the customer and product scope are approved.",
      problem: "The customer problem has not yet been approved, so no market or revenue claim should be treated as an active business plan.",
      solution: "Complete a written product brief, customer interviews, competitor check and legal review before development or investor forecasting.",
      revenue: brandRevenuePlainEnglish(brand),
      salesPlan: "No sales spending should begin until the target customer and offer are approved.",
      operations: "No operating team should be assigned until scope, ownership and launch conditions are approved.",
      territoryPlan: TERRITORY_PLANS[country],
      expansionPlan: "Expansion should be considered only after the first territory and business model are approved.",
      milestones: [
        "Approve the customer, problem and product scope.",
        "Interview at least 20 potential customers and test willingness to pay.",
        "Complete competitor, legal and unit-economics checks.",
        "Only then set a launch date and financial forecast.",
      ],
      successMeasures: ["Approved product brief", "Evidence of customer demand", "Credible pricing test", "Named launch owner"],
      reasonsItCanWin: ["Not yet established — this must be proven through customer and competitor research."],
      mainRisks: ["The product, customer, pricing and route to market are not yet defined."],
    };
  }

  return {
    territory: countryLabel(country),
    businessType: sectorLabel(sector),
    stage: "Defined product",
    summary: brandPlainEnglish(brand),
    customer: brand.payerModel
      ? `Paying side: ${brand.payerModel.payer}. Free side: ${brand.payerModel.freeSide}.`
      : simplifyInvestorLanguage(brand.audience),
    marketOpportunity: simplifyInvestorLanguage(brand.market),
    problem: affiliateStore ? simplifyInvestorLanguage(brand.reason) : PROBLEMS[sector],
    solution: `${brandPlainEnglish(brand)} The first release focuses on the smallest complete customer journey, with extra features added only after real usage proves the need.`,
    revenue: brand.payerModel
      ? brand.payerModel.investorRevenue
      : affiliateStore
        ? `Shoppers pay nothing to use the site. An approved retailer pays commission after a referred shopper completes an eligible order. The forecast uses ${currency}${arpu.toFixed(2)} average confirmed commission per order; the actual rate depends on the retailer, category and country.`
        : brand.monetisation?.length
          ? `${simplifyInvestorLanguage(brand.monetisation.slice(0, 3).join(". "))}.`
          : `Paying customers are modelled at an average of ${currency}${arpu} per month after a two-month free trial. The detailed forecast can also include setup, optional extras and partner income.`,
    salesPlan: affiliateStore
      ? "Publish genuinely useful buying guides for high-intent questions, earn search and social traffic, build an email audience and send shoppers only to approved retailers through clearly disclosed tracked links."
      : venueFundedSport
        ? "Build each launch area postcode by postcode. Add factual venue information from lawful public sources, clearly label unclaimed profiles, and invite operators to claim, correct and verify them. Bring players in free through clubs, leagues, schools, employers and community groups. Demonstrate to venues that live availability, confirmations, waitlists and off-peak promotion increase filled hours and reduce administration, then convert the venue after its 60-day trial."
        : brand.payerModel
          ? `${SALES_PLANS[sector]} Commercial rule: the sales team targets only ${brand.payerModel.payer}. The other side remains free, helping the paying customer receive more value without creating a second charging barrier.`
          : SALES_PLANS[sector],
    operations: affiliateStore
      ? "Affivon imports approved retailer data, creates tracked links and reports confirmed commission. A human editor remains responsible for product claims, comparison quality, disclosure and removing stale or misleading content. The retailer handles payment, delivery and returns."
      : venueFundedSport
        ? "The shared team maintains venue data, claim checks, booking technology, payments and support. Unclaimed profiles show only factual public information and cannot publish live availability. A venue must prove ownership or authority before controlling its profile. Venues set their own prices, availability and cancellation rules; Athlyvo organises the booking and confirmation record."
        : OPERATIONS[sector],
    territoryPlan: venueFundedSport
      ? "Launch in one UK area with pound pricing, postcode and distance search, UK card payments and UK-based support. Build dense coverage across football and five-a-side, cricket, padel, tennis and pickleball before opening the next area. Complete UK GDPR, marketplace, payment, safeguarding, facility-booking and consumer terms, and give every unclaimed venue a clear correction, claim and removal route."
      : TERRITORY_PLANS[country],
    expansionPlan: venueFundedSport
      ? "Expand across England postcode by postcode only after the first areas show repeated player use, useful venue occupancy gains and retained paying venues. Then localise facility rules, governing-body relationships and public-sector procurement for Wales, Scotland and Northern Ireland before considering Ireland or other countries."
      : EXPANSION_PLANS[country],
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

function plainGermanBusinessPlan(
  brand: Brand,
  assumptions: BusinessPlanAssumptions,
): PlainBusinessPlan {
  const country = countryOf(brand);
  const sector = sectorOf(brand);
  const currency = country === "UK" ? "£" : "€";
  const initialUsers = assumptions.initialUsers ?? brand.defaultInitialUsers;
  const arpu = assumptions.arpu ?? brand.defaultArpu;
  const userGrowth = assumptions.userGrowth ?? brand.defaultUserGrowth;
  const churn = assumptions.churn ?? brand.defaultChurn;
  const directCost = assumptions.directCost ?? brand.defaultDirectCost;
  const affiliateStore = brand.revenueUnit === "affiliate-order";
  const venueFundedSport = brand.id === "athlyvo";
  const volume = brand.payerModel?.side === "consumer"
    ? "zahlende Nutzerkonten"
    : affiliateStore
      ? "bestätigte vermittelte Bestellungen"
      : venueFundedSport
        ? "zahlende Sportstätten"
        : "zahlende Geschäftskonten";
  const payer = brand.payerModel?.side === "consumer"
    ? "die Endnutzer"
    : affiliateStore
      ? "zugelassene Händler"
      : brand.id === "kinderstars"
        ? "registrierte Tagesmütter und Tagesväter"
        : brand.id === "athlyvo"
          ? "Sportstätten und Betreiber buchbarer Anlagen"
          : brand.id === "criclume"
            ? "Cricketvereine, Ligen, Wettbewerbe und Akademien"
            : DE_BUSINESS_PAYERS[sector];
  const freeSide = brand.payerModel?.side === "consumer"
    ? "Geschäftspartner zahlen keine zweite Plattformgebühr."
    : "Die Nutzerseite bleibt kostenlos und wird nicht zusätzlich von der Plattform belastet.";

  return {
    territory: DE_COUNTRY_LABELS[country],
    businessType: DE_SECTOR_LABELS[sector],
    stage: "Defined product",
    summary: brandPlainLanguage(brand, "de"),
    customer: `Zahlender Kunde ist ${payer}. ${freeSide}`,
    marketOpportunity: `Die Geschäftsleitung sieht im Bereich ${DE_SECTOR_LABELS[sector]} in ${DE_COUNTRY_LABELS[country]} einen großen, aber noch zu bestätigenden Markt. Die Planung wird erst durch echte Kundengespräche, Testabschlüsse und belastbare lokale Quellen freigegeben.`,
    problem: DE_PROBLEMS[sector],
    solution: `${brandPlainLanguage(brand, "de")} Die erste Version deckt nur den kleinsten vollständigen Kundenweg ab. Weitere Funktionen kommen erst hinzu, wenn echte Nutzung den Bedarf zeigt.`,
    revenue: affiliateStore
      ? `Käufer nutzen den Vergleich kostenlos. Ein zugelassener Händler zahlt nach einer geeigneten vermittelten Bestellung eine Provision. Die Planung rechnet im Schnitt mit ${currency}${arpu.toFixed(2)} bestätigter Provision je Bestellung.`
      : venueFundedSport
        ? `Spieler, Organisatoren, Teams, Vereine, Trainer und Offizielle nutzen Athlyvo kostenlos. Nur Sportstätten zahlen nach 60 Tagen Testphase ein Abo; geplant sind durchschnittlich ${currency}${arpu} je zahlender Sportstätte und Monat.`
        : brand.id === "kinderstars"
          ? `Registrierte Tagesmütter und Tagesväter zahlen ein monatliches Abo. Eltern nutzen die Suche und Organisation kostenlos. Das Betreuungsgeld zahlen die Eltern oder eine berechtigte staatliche Stelle direkt an die Betreuungsperson.`
          : `Nur ${payer} zahlt. Die Planung rechnet nach zwei kostenlosen Testmonaten mit durchschnittlich ${currency}${arpu} je zahlendem Konto und Monat. ${freeSide}`,
    salesPlan: venueFundedSport
      ? "Eine Startregion lückenlos aufbauen, sachliche öffentliche Angaben zu Sportstätten aufnehmen und noch nicht übernommene Profile klar kennzeichnen. Betreiber zur Prüfung und Übernahme einladen, Spieler kostenlos über Vereine, Ligen, Schulen und Gemeinden gewinnen und dann den messbaren Nutzen für Auslastung und Verwaltung verkaufen."
      : `${DE_SALES[sector]} Verkauft wird nur an die zahlende Seite; die andere Seite bleibt kostenlos.`,
    operations: affiliateStore
      ? "Affivon verwaltet zugelassene Händlerdaten, nachverfolgbare Links und bestätigte Provisionen. Menschen prüfen Aussagen, Vergleiche, Kennzeichnungen und veraltete Inhalte. Zahlung, Lieferung und Rückgabe bleiben beim Händler."
      : DE_OPERATIONS[sector],
    territoryPlan: venueFundedSport
      ? "In einer britischen Region mit Pfund-Preisen, Postleitzahl- und Entfernungssuche, britischen Zahlungen und Support starten. Erst dichte Abdeckung für die wichtigsten Sportarten schaffen und Datenschutz, Zahlungen, Schutzpflichten, Buchungs- und Verbraucherregeln abschließen."
      : DE_TERRITORY[country],
    expansionPlan: venueFundedSport
      ? "Erst nach wiederholter Spielernutzung, besserer Auslastung und gehaltenen zahlenden Sportstätten Postleitzahl für Postleitzahl in England wachsen. Danach Regeln und Partnerschaften für Wales, Schottland und Nordirland anpassen."
      : DE_EXPANSION[country],
    milestones: [
      `Vor dem Start: Kernablauf, Zahlungen, lokale Verträge, Support und einen kontrollierten Kundentest in ${DE_COUNTRY_LABELS[country]} abschließen.`,
      "Monate 1–2: erste Testkunden einrichten, Nutzung beobachten und die wichtigsten Abbruchgründe beheben.",
      `Monate 3–6: Testkonten in bezahlte Konten umwandeln und auf ${initialUsers.toLocaleString("de-DE")} ${volume} hinarbeiten.`,
      "Monate 7–12: nur Vertriebskanäle ausbauen, die gehaltene Kunden bringen, und unwirtschaftliche Kanäle stoppen.",
    ],
    successMeasures: [
      `${initialUsers.toLocaleString("de-DE")} ${volume} zum geplanten Start der Einnahmen`,
      `${currency}${affiliateStore ? arpu.toFixed(2) : arpu} durchschnittlicher Erlös je zahlender Einheit`,
      `${(userGrowth * 100).toFixed(0)} % geplantes monatliches Wachstum`,
      affiliateStore ? "Händlerlinks, Preise und Werbekennzeichnung bleiben aktuell" : `${(churn * 100).toFixed(1)} % oder weniger monatliche Kündigungen`,
      `Direkte monatliche Markenkosten nahe ${currency}${directCost.toLocaleString("de-DE")}`,
    ],
    reasonsItCanWin: [
      "Eine klar abgegrenzte Zielgruppe und ein einfach erklärbarer Nutzen.",
      "Nur eine Seite zahlt; dadurch gibt es für die andere Seite keine zweite Gebührenhürde.",
      "Gemeinsame Technik, Betrieb und Support im Markenverbund senken die Kosten.",
    ],
    mainRisks: [
      "Zu wenig zahlungsbereite Kunden — mit Gesprächen, Testphase und echten Abschlüssen prüfen, bevor stark investiert wird.",
      "Zu hohe Kundengewinnungskosten — jeden Vertriebskanal einzeln messen und unwirtschaftliche Kanäle stoppen.",
      "Lokale rechtliche oder betriebliche Anforderungen — vor dem Start fachlich prüfen und je Land getrennt freigeben.",
    ],
  };
}
