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

const BRAND_PROBLEMS: Record<string, string> = {
  beinstandplus:
    "People facing relocation, bereavement or another difficult life event must contact several offices and providers separately, often without knowing the correct next step, likely funeral costs or whether insurance or other support may apply.",
  traderos:
    "Self-directed traders piece together charts, broker screens and opaque signal groups, but often cannot see why a signal appeared, what risk it carries or whether losing results have been removed.",
  baytcircle:
    "Families search scattered message groups and social pages for activities and community events, while suitable pools, play centres, learning spaces and clubs have spare capacity they cannot easily offer to nearby families.",
  taxcenda:
    "People and small businesses with U.S. filing obligations—especially those living abroad—face unfamiliar forms, deadlines and cross-border questions, while local advisers may not be able to prepare or electronically file the U.S. return.",
  merqora:
    "Amazon and other marketplace sellers switch between seller portals, advertising screens, stock tools and spreadsheets. Agencies repeat this work for every client, and important listing, inventory, advertising or account-health problems can be missed until sales fall.",
  merqano:
    "Many businesses need a professional ecommerce website but a custom build is expensive and slow. Building and maintaining a separate technical system for every customer repeats the same checkout, payment, order, delivery, security and reporting work.",
  nimah:
    "Food outlets regularly finish the day with safe unsold meals, bakery goods and groceries that may no longer sell at full price. Disposing of them loses ingredients, staff effort and possible income, while nearby customers are looking for affordable food.",
  auvaneone:
    "Affluent members organise complex lifestyle requests through separate calls, messages, assistants and booking sites, while suppliers receive incomplete enquiries and independent concierges often lack secure technology. Nobody has one live plan or accountable owner across the full request.",
  yetkiva:
    "Uzbekistan businesses coordinate orders, riders, vehicles and customer updates through separate marketplace screens, calls, messaging groups and spreadsheets. That makes capacity, service failures and the real cost of each delivery difficult to see or control.",
};

const BRAND_SALES_PLANS: Record<string, string> = {
  beinstandplus:
    "Sell funded support packages to employers, insurers, care organisations and community partners, then let their staff, members and families use the service without a second platform fee. Build referral relationships with authorised insurance, legal, benefits and funeral specialists without selling access to vulnerable families.",
  traderos:
    "Win self-directed traders through useful market education, transparent live signal history, trial access and trading communities. Market the quality of the evidence, journal and risk controls—not profit claims—and do not accept broker payments that would create a second paying side or distort recommendations.",
  baytcircle:
    "Seed one neighbourhood at a time with factual family-venue and activity profiles, home-education groups and anchor providers. Invite providers to claim and verify their page, attract families free through schools and community groups, and sell providers the measurable benefit of filled spare capacity and simpler administration.",
  taxcenda:
    "Reach taxpayer clients through expatriate communities, useful U.S. filing guides, employer mobility teams and referral relationships with accountants outside the United States. Partners are not charged; the taxpayer buys a clear fixed-scope preparation and filing service.",
  merqora:
    "Recruit Amazon and other marketplace sellers through ecommerce agencies, seller communities, practical account audits and a guided trial. Show how Merqora reduces repeated admin and identifies clear actions across listings, stock, advertising and account health; sell only to sellers and agencies, never shoppers.",
  merqano:
    "Sell directly to independent retailers, growing brands, franchise businesses and agencies that need professional ecommerce websites. Use Meyzaar and the KALËTHON clothing store as the first customer-store demonstrations, showing that each business receives its own branding, catalogue, checkout, customer relationship and operating dashboard while Merqano maintains the shared technology.",
  nimah:
    "Build one dense launch district at a time. Recruit anchor restaurants, cafés, bakeries, hotels and supermarkets directly, give staff guided setup and a trial, then attract nearby customers through local creators, universities, employers, community groups and participating outlets' own channels. Sell only to food businesses; customers use Ni'mah without a platform fee.",
  auvaneone:
    "Recruit founding members through trusted introductions, family offices, executive assistants, premium communities and experienced independent concierges. In parallel, build a verified supplier network city by city across hospitality, transport, travel, clubs, events and wellness. Sell member service levels and separate supplier access plans without disguising either side's fees.",
  yetkiva:
    "Sell controlled pilots to marketplaces, restaurant and retail groups, pharmacies, ecommerce sellers, courier companies and fleet operators. Start with a measurable city, route or merchant group, provide assisted setup and a 60-day software trial, and convert only when service level, time saved and delivery contribution are visible. Customers and riders are not a second paying side.",
};

const BRAND_OPERATIONS: Record<string, string> = {
  beinstandplus:
    "A trained support team manages consent-based cases, documents, tasks and appointments. Authorised partners handle regulated insurance, legal or benefits advice, while sensitive bereavement cases can move from digital guidance to a human caseworker at any time.",
  traderos:
    "The platform receives licensed market data, calculates indicators, records every signal and distributes alerts. The team monitors data quality, model behaviour, compliance and support; traders control every decision, and any broker connection is optional, limited and never gives TraderOS custody of funds.",
  baytcircle:
    "The shared team maintains local coverage, checks claims and moderates family content. Providers control their own availability, prices and bookings. Safeguarding reports and sensitive issues go to trained human review, and child accounts remain guardian controlled.",
  taxcenda:
    "Credentialed preparers work inside role-controlled cases with checklists, workpapers and review. Required PTIN and professional credentials are monitored, electronic submissions use an authorised IRS e-file provider, and the client reviews and authorises the completed return before filing.",
  merqora:
    "The shared team maintains authorised marketplace connections, data quality, alerts and support. Sellers and agencies control account permissions, budgets and approvals. Important listing, pricing or advertising changes remain approval based and every action is recorded.",
  merqano:
    "Merqano maintains the shared commerce technology, security, payments, updates and support. Each customer business controls only its own website, branding, catalogue, prices, orders, customers, delivery rules and staff through a separate protected dashboard.",
  nimah:
    "Each food outlet controls what it lists, the reduced price, quantity, ingredients, allergens and collection window and remains responsible for food safety. Ni'mah verifies businesses, runs discovery, reservations, payments, codes and support, removes expired offers automatically and escalates safety reports to trained staff.",
  auvaneone:
    "AI converts app, web, voice and WhatsApp requests into structured tasks, supplier searches and draft itineraries. A named human concierge checks suitability, live availability, price and terms before confirmation and owns each handoff. City teams approve suppliers and handle urgent exceptions; regulated payment providers handle processed payments and supplier payouts.",
  yetkiva:
    "A Tashkent control team manages business onboarding, service areas, dispatch, rider and vehicle checks, support, incidents, invoicing and contribution reporting. Merchant, rider, tracking, fleet and admin apps share one order record. Human dispatchers can override automation, and every city has named operating, safety and financial owners.",
};

const BRAND_TERRITORY_PLANS: Record<string, string> = {
  beinstandplus:
    "Launch in Germany with German contracts, euro pricing, multilingual support and GDPR controls. Before offering funeral-policy help, define the boundary between information and regulated insurance advice and contract with authorised partners for any recommendation or sale.",
  traderos:
    "Launch in the UK only after specialist review of the product boundary and every financial promotion, confirmation of market-data licences, clear risk disclosures and controls for any optional broker connection. No client-money custody and no guaranteed-return claims.",
  baytcircle:
    "Launch in one UAE city with English and Arabic, neighbourhood and distance search, local payments, provider verification and family-safety rules. Confirm activity, advertising, venue and child-safeguarding requirements before opening each category.",
  taxcenda:
    "The service is U.S.-tax focused but can serve clients globally. Launch only with current preparer credentials, an authorised e-file route, supported federal and state forms, written data-security procedures, engagement terms and a clear escalation list for unsupported cross-border cases.",
  merqora:
    "Start with UK-based Amazon sellers and agencies using only authorised marketplace connections, pound pricing and UK support. Confirm marketplace developer terms, data permissions, account security, UK GDPR and advertising controls before connecting live seller accounts.",
  merqano:
    "Start in the UK with Meyzaar and the KALËTHON clothing store as the first customer-store examples, using pound pricing, UK payment processing, separate customer data and UK support. Complete payment, tax, privacy, consumer, delivery and cancellation terms before each ecommerce website begins trading.",
  nimah:
    "Launch separately in one Saudi city district and one Pakistani city district. Saudi Arabia uses Arabic and English, Saudi-riyal prices and supported local payments; Pakistan uses Urdu and English, Pakistani-rupee prices and supported local payments. Complete local business verification, food-safety, allergen, payment, refund, consumer and tax rules before accepting live offers in either country.",
  auvaneone:
    "Begin with tightly controlled service coverage in London, Paris, New York, Miami and the UAE. Each city requires a named operations owner, verified anchor suppliers, local member support, currency and payment setup, privacy and consumer terms, supplier contracts and clear boundaries for any regulated travel, ticketing, transport or payment activity.",
  yetkiva:
    "Launch in Tashkent with Uzbek, Russian and English-ready workflows, UZS billing, local business onboarding and a clearly bounded delivery zone. Complete local company, tax, labour or contractor, transport, vehicle, insurance, safety, payment, consumer and data rules before live operations; prove one Samarkand pilot only after Tashkent service control is dependable.",
};

const BRAND_EXPANSION_PLANS: Record<string, string> = {
  beinstandplus:
    "Expand from selected employer and organisation programmes only after case quality, consent controls and partner response times are proven. Add further German regions and support categories before considering another country with different insurance and welfare rules.",
  traderos:
    "Add asset classes and countries only after live results, data rights and local promotion rules are proven. Keep a separate compliance approval for each broker connection and jurisdiction, and publish the full signal record as the product grows.",
  baytcircle:
    "Expand neighbourhood by neighbourhood across the UAE after the first area has enough families and verified providers for useful matching. Enter another Gulf country only after local activity, venue, advertising, payment and safeguarding rules are reviewed.",
  taxcenda:
    "Add states, entity types and international fact patterns only when qualified staff, approved software and review checklists are ready. Growth outside the United States means reaching more U.S. taxpayers abroad, not offering another country's tax return without a separately qualified service.",
  merqora:
    "Add marketplaces and countries one at a time after the first Amazon seller workflows are reliable and retained. Each expansion requires an authorised connection, supported data, local tax and currency handling, translated workflows and a clear support owner.",
  merqano:
    "Expand by launching more customer ecommerce websites on the proven shared system, then add countries only when local currency, payments, tax, consumer terms, delivery and support are ready. Keep every customer's website, data and permissions separate as Merqano grows.",
  nimah:
    "Expand district by district only after the first launch area has enough daily offers, repeat customers, reliable collections and retained paying outlets. Grow into the next Saudi or Pakistani city with its own supply team and local operating checks rather than opening both countries nationally at once.",
  auvaneone:
    "Deepen supplier quality and request fulfilment in the five starting markets before adding another city. Expansion requires repeat member demand, strong response times, retained member and supplier accounts, a trusted local concierge lead and documented payment, privacy and sector rules.",
  yetkiva:
    "Expand from Tashkent to Samarkand and then Namangan, Andijan, Fergana and Bukhara only after retained business contracts, positive contribution per delivery, safe rider operations and reliable support are proven. Add cities in clusters with local hubs and business demand instead of buying fleet capacity ahead of contracts.",
};

const DE_BRAND_PROBLEMS: Record<string, string> = {
  beinstandplus:
    "Menschen bei Umzug, Trauerfall oder einem anderen schwierigen Lebensereignis müssen mehrere Stellen getrennt ansprechen und wissen häufig weder den richtigen nächsten Schritt noch die voraussichtlichen Bestattungskosten oder mögliche Versicherungs- und Unterstützungswege.",
  traderos:
    "Selbstentscheidende Trader kombinieren Charts, Brokeroberflächen und undurchsichtige Signalgruppen, können aber oft nicht erkennen, warum ein Signal entstand, welches Risiko es trägt oder ob Verlustresultate entfernt wurden.",
  baytcircle:
    "Familien suchen in verstreuten Nachrichtengruppen und sozialen Seiten nach Aktivitäten, während geeignete Schwimmbäder, Spielzentren, Lernräume und Vereine freie Kapazitäten nicht einfach nahe gelegenen Familien anbieten können.",
  taxcenda:
    "Menschen und Kleinunternehmen mit US-Erklärungspflichten stehen besonders im Ausland vor ungewohnten Formularen, Fristen und grenzüberschreitenden Fragen, während lokale Berater die US-Erklärung häufig nicht erstellen oder elektronisch einreichen können.",
  merqora:
    "Verkäufer auf Amazon und anderen Marktplätzen wechseln zwischen Verkäuferportalen, Werbeansichten, Lagerwerkzeugen und Tabellen. Agenturen wiederholen diese Arbeit je Kunde; wichtige Probleme bei Angeboten, Bestand, Werbung oder Kontozustand werden oft erst nach Umsatzverlust erkannt.",
  merqano:
    "Viele Unternehmen benötigen eine professionelle E-Commerce-Website, doch eine individuelle Entwicklung ist teuer und langsam. Ein getrenntes technisches System für jeden Kunden wiederholt dieselbe Arbeit für Kasse, Zahlungen, Bestellungen, Lieferung, Sicherheit und Berichte.",
  nimah:
    "Lebensmittelbetriebe haben am Tagesende regelmäßig sichere unverkaufte Mahlzeiten, Backwaren und Lebensmittel, die nicht mehr zum vollen Preis verkauft werden. Entsorgung verliert Warenwert, Arbeitszeit und mögliche Einnahmen, während Menschen in der Nähe bezahlbare Lebensmittel suchen.",
  auvaneone:
    "Vermögende Mitglieder organisieren komplexe Lifestyle-Wünsche über getrennte Anrufe, Nachrichten, Assistenzen und Buchungsseiten. Anbieter erhalten unvollständige Anfragen, unabhängigen Concierges fehlt oft sichere Technik und niemand verantwortet einen gemeinsamen Live-Plan für den gesamten Wunsch.",
  yetkiva:
    "Unternehmen in Usbekistan koordinieren Bestellungen, Fahrer, Fahrzeuge und Kundeninformationen über getrennte Marktplatzansichten, Anrufe, Nachrichtengruppen und Tabellen. Kapazität, Servicefehler und die echten Kosten jeder Lieferung bleiben dadurch schwer steuerbar.",
};

const DE_BRAND_SALES: Record<string, string> = {
  beinstandplus:
    "Finanzierte Unterstützungspakete an Arbeitgeber, Versicherer, Pflege- und Gemeinschaftsorganisationen verkaufen. Mitarbeitende, Mitglieder und Familien nutzen den Service ohne zweite Plattformgebühr; autorisierte Fachpartner erhalten passende, einwilligungsbasierte Weiterleitungen.",
  traderos:
    "Selbstentscheidende Trader durch nützliche Marktbildung, eine transparente Live-Signalhistorie, Testzugang und Trading-Communities gewinnen. Belegqualität, Tagebuch und Risikokontrollen vermarkten, nicht Gewinnversprechen.",
  baytcircle:
    "Ein Viertel nach dem anderen mit sachlichen Familienort- und Aktivitätsprofilen, Homeschooling-Gruppen und Ankeranbietern aufbauen. Familien kostenlos gewinnen und Anbietern den messbaren Nutzen aus gefüllten freien Zeiten und einfacherer Verwaltung verkaufen.",
  taxcenda:
    "Steuerpflichtige über Expat-Gemeinschaften, nützliche US-Steuerinformationen, Arbeitgeber-Mobility-Teams und Empfehlungen von Buchhaltern außerhalb der USA erreichen. Der Steuerpflichtige kauft eine klar abgegrenzte Festpreisleistung; Partner zahlen nicht.",
  merqora:
    "Amazon- und andere Marktplatzverkäufer über E-Commerce-Agenturen, Verkäufergemeinschaften, praktische Kontoanalysen und eine begleitete Testphase gewinnen. Den Nutzen aus weniger Verwaltung und klaren Maßnahmen für Angebote, Bestand, Werbung und Kontozustand zeigen; nur Verkäufer und Agenturen zahlen.",
  merqano:
    "Direkt an unabhängige Händler, wachsende Marken, Franchiseunternehmen und Agenturen verkaufen, die professionelle E-Commerce-Websites benötigen. Meyzaar und den KALËTHON-Bekleidungsshop als erste Kunden-Shop-Demos nutzen und zeigen, dass jeder Betrieb seine eigene Marke, seinen Katalog, seine Kasse, Kundenbeziehung und Verwaltung erhält, während Merqano die gemeinsame Technik pflegt.",
  nimah:
    "Jeweils ein dichtes Startviertel aufbauen. Ankerbetriebe wie Restaurants, Cafés, Bäckereien, Hotels und Supermärkte direkt gewinnen, Mitarbeitende begleitet einrichten und eine Testphase anbieten. Kunden über lokale Creator, Hochschulen, Arbeitgeber, Gemeinschaftsgruppen und die Kanäle der teilnehmenden Betriebe erreichen. Nur Lebensmittelbetriebe zahlen; Kunden nutzen Ni'mah ohne Plattformgebühr.",
  auvaneone:
    "Gründungsmitglieder über vertrauenswürdige Empfehlungen, Family Offices, Executive Assistants, Premium-Gemeinschaften und erfahrene unabhängige Concierges gewinnen. Gleichzeitig Stadt für Stadt ein geprüftes Anbieternetz für Gastgewerbe, Transport, Reisen, Clubs, Veranstaltungen und Wellness aufbauen. Mitglieder-Servicepläne und getrennte Anbieterzugänge verkaufen und alle Gebühren offen darstellen.",
  yetkiva:
    "Kontrollierte Tests an Marktplätze, Restaurant- und Handelsgruppen, Apotheken, E-Commerce-Verkäufer, Kurierfirmen und Flottenbetreiber verkaufen. Mit einer messbaren Stadt, Route oder Händlergruppe beginnen, die Einrichtung begleiten und 60 Tage testen. Nur bei sichtbarer Servicequalität, Zeitersparnis und Liefermarge umwandeln; Kunden und Fahrer sind keine zweite zahlende Seite.",
};

const DE_BRAND_OPERATIONS: Record<string, string> = {
  beinstandplus:
    "Ein geschultes Supportteam verwaltet einwilligungsbasierte Fälle, Unterlagen, Aufgaben und Termine. Autorisierte Partner übernehmen regulierte Versicherungs-, Rechts- oder Sozialleistungsberatung; sensible Trauerfälle können jederzeit an einen Menschen übergeben werden.",
  traderos:
    "Die Plattform empfängt lizenzierte Marktdaten, berechnet Indikatoren, speichert jedes Signal und verteilt Warnungen. Das Team überwacht Datenqualität, Modelle, Compliance und Support; der Trader entscheidet selbst und TraderOS verwahrt keine Kundengelder.",
  baytcircle:
    "Das gemeinsame Team pflegt lokale Abdeckung, prüft Profilübernahmen und moderiert Familieninhalte. Anbieter kontrollieren Verfügbarkeit, Preise und Buchungen; Schutzmeldungen gehen an geschulte Menschen und Kinderkonten bleiben unter Kontrolle der Erziehungsberechtigten.",
  taxcenda:
    "Qualifizierte Ersteller arbeiten in rollenbasierten Fällen mit Checklisten, Arbeitspapieren und Prüfung. Erforderliche PTIN- und Berufsberechtigungen werden überwacht, elektronische Einreichungen laufen über einen autorisierten IRS-E-File-Anbieter und der Kunde genehmigt die Erklärung vor dem Versand.",
  merqora:
    "Das gemeinsame Team pflegt autorisierte Marktplatzverbindungen, Datenqualität, Warnungen und Support. Verkäufer und Agenturen kontrollieren Rechte, Budgets und Freigaben; wichtige Änderungen bleiben freigabepflichtig und werden vollständig protokolliert.",
  merqano:
    "Merqano pflegt die gemeinsame Handelstechnik, Sicherheit, Zahlungen, Aktualisierungen und den Support. Jeder Geschäftskunde kontrolliert über eine getrennte geschützte Verwaltung nur seine eigene Website, Marke, Produkte, Preise, Bestellungen, Kunden, Lieferregeln und Mitarbeitendenzugänge.",
  nimah:
    "Jeder Lebensmittelbetrieb bestimmt Angebot, reduzierten Preis, Menge, Zutaten, Allergene und Abholzeit und bleibt für Lebensmittelsicherheit verantwortlich. Ni'mah prüft Betriebe, betreibt Suche, Reservierung, Zahlung, Abholcodes und Support, entfernt abgelaufene Angebote automatisch und gibt Sicherheitsmeldungen an geschulte Mitarbeitende.",
  auvaneone:
    "KI wandelt Wünsche aus App, Web, Sprache und WhatsApp in strukturierte Aufgaben, Anbietersuchen und Entwürfe für Reise- oder Tagespläne um. Ein benannter menschlicher Concierge prüft Eignung, Live-Verfügbarkeit, Preis und Bedingungen, bevor etwas bestätigt wird, und verantwortet jede Übergabe. Stadtteams prüfen Anbieter und bearbeiten dringende Ausnahmen; regulierte Zahlungsanbieter verarbeiten Zahlungen und Auszahlungen.",
  yetkiva:
    "Ein Tashkenter Kontrollteam steuert Geschäftseinrichtung, Liefergebiete, Disposition, Fahrer- und Fahrzeugprüfungen, Support, Vorfälle, Abrechnung und Margenberichte. Händler-, Fahrer-, Tracking-, Flotten- und Admin-Anwendungen nutzen denselben Auftragsdatensatz. Menschen können die Automatik jederzeit übersteuern; jede Stadt hat benannte Verantwortliche für Betrieb, Sicherheit und Finanzen.",
};

const DE_BRAND_TERRITORY: Record<string, string> = {
  beinstandplus:
    "In Deutschland mit deutschen Verträgen, Euro-Preisen, mehrsprachigem Support und DSGVO-Kontrollen starten. Vor Hilfe zu Bestattungsvorsorge die Grenze zwischen Information und regulierter Versicherungsberatung festlegen und autorisierte Partner vertraglich einbinden.",
  traderos:
    "Im Vereinigten Königreich erst nach Fachprüfung von Produktgrenze und Finanzwerbung, bestätigten Marktdatenlizenzen, klaren Risikohinweisen und Kontrollen für optionale Brokerverbindungen starten. Keine Kundengeldverwahrung und keine garantierten Renditeversprechen.",
  baytcircle:
    "In einer Stadt der VAE mit Englisch und Arabisch, Viertel- und Entfernungssuche, lokalen Zahlungen, Anbieterprüfung und Familienschutzregeln starten. Anforderungen für Aktivitäten, Werbung, Orte und Kinderschutz vor jeder Kategorie prüfen.",
  taxcenda:
    "Der Service betrifft US-Steuern, kann aber Kunden weltweit bedienen. Start nur mit aktuellen Erstellerberechtigungen, autorisiertem E-File-Weg, unterstützten Bundes- und Bundesstaatenformularen, schriftlicher Datensicherheit und klarer Eskalationsliste für nicht unterstützte Auslandsfälle.",
  merqora:
    "Mit britischen Amazon-Verkäufern und Agenturen, Pfund-Preisen und britischem Support starten und nur autorisierte Marktplatzverbindungen nutzen. Entwicklerbedingungen, Datenrechte, Kontosicherheit, britischen Datenschutz und Werbekontrollen vor Live-Verbindungen abschließen.",
  merqano:
    "Im Vereinigten Königreich mit Meyzaar und dem KALËTHON-Bekleidungsshop als ersten Kunden-Shop-Beispielen starten, mit Pfund-Preisen, britischer Zahlungsabwicklung, getrennten Kundendaten und Support. Zahlungs-, Steuer-, Datenschutz-, Verbraucher-, Liefer- und Widerrufsregeln vor dem Start jeder E-Commerce-Website abschließen.",
  nimah:
    "Getrennt in einem Stadtviertel in Saudi-Arabien und einem in Pakistan starten. Saudi-Arabien nutzt Arabisch und Englisch, Saudi-Riyal und unterstützte lokale Zahlungen; Pakistan nutzt Urdu und Englisch, Pakistanische Rupien und unterstützte lokale Zahlungen. Betriebliche Prüfung, Lebensmittelsicherheit, Allergene, Zahlungen, Erstattungen, Verbraucher- und Steuerregeln vor Live-Angeboten je Land abschließen.",
  auvaneone:
    "Mit eng begrenzter Serviceabdeckung in London, Paris, New York, Miami und den VAE beginnen. Jede Stadt braucht eine benannte Betriebsleitung, geprüfte Ankeranbieter, lokalen Mitgliedersupport, Währungs- und Zahlungseinrichtung, Datenschutz- und Verbraucherbedingungen, Anbieterverträge sowie klare Grenzen für regulierte Reise-, Ticket-, Transport- oder Zahlungsleistungen.",
  yetkiva:
    "In Tashkent mit usbekischen, russischen und englischen Abläufen, UZS-Abrechnung, lokaler Geschäftseinrichtung und klar begrenztem Liefergebiet starten. Unternehmens-, Steuer-, Arbeits- oder Auftragnehmer-, Transport-, Fahrzeug-, Versicherungs-, Sicherheits-, Zahlungs-, Verbraucher- und Datenschutzregeln vor Live-Betrieb abschließen. Samarkand erst nach verlässlicher Tashkenter Steuerung testen.",
};

const DE_BRAND_EXPANSION: Record<string, string> = {
  beinstandplus:
    "Erst nach belegter Fallqualität, Einwilligungskontrolle und Partnerreaktion aus ausgewählten Organisationsprogrammen wachsen. Weitere deutsche Regionen und Hilfekategorien vor Ländern mit anderen Versicherungs- und Sozialsystemen ergänzen.",
  traderos:
    "Anlageklassen und Länder erst ergänzen, wenn Live-Ergebnisse, Datenrechte und lokale Werberegeln belegt sind. Jede Brokerverbindung und jedes Land getrennt freigeben und die vollständige Signalhistorie veröffentlichen.",
  baytcircle:
    "Nach ausreichender Dichte aus Familien und geprüften Anbietern Viertel für Viertel in den VAE wachsen. Ein weiteres Golfland erst nach Prüfung lokaler Aktivitäts-, Orts-, Werbe-, Zahlungs- und Schutzregeln öffnen.",
  taxcenda:
    "Bundesstaaten, Unternehmenstypen und internationale Sachverhalte nur ergänzen, wenn qualifizierte Mitarbeitende, zugelassene Software und Prüfchecklisten bereitstehen. Wachstum im Ausland bedeutet mehr US-Steuerpflichtige im Ausland, nicht ungeprüfte Steuererklärungen anderer Länder.",
  merqora:
    "Marktplätze und Länder erst einzeln ergänzen, wenn die ersten Amazon-Verkäuferabläufe zuverlässig sind und Kunden gehalten werden. Jede Erweiterung braucht eine autorisierte Verbindung, unterstützte Daten, lokale Steuer- und Währungslogik, übersetzte Abläufe und einen klaren Supportverantwortlichen.",
  merqano:
    "Mehr Kunden-Websites auf dem bewährten gemeinsamen System starten und Länder erst ergänzen, wenn Währung, Zahlungen, Steuern, Verbraucherregeln, Lieferung und Support vorbereitet sind. Website, Daten und Rechte jedes Kunden bleiben beim Wachstum getrennt.",
  nimah:
    "Erst dann Viertel für Viertel wachsen, wenn das erste Gebiet genügend tägliche Angebote, wiederkehrende Kunden, zuverlässige Abholungen und gehaltene zahlende Betriebe hat. Die nächste saudische oder pakistanische Stadt mit eigenem Angebotsteam und lokalen Betriebskontrollen öffnen, statt beide Länder sofort landesweit zu starten.",
  auvaneone:
    "Anbieterqualität und Erfüllung in den fünf Startmärkten vertiefen, bevor eine weitere Stadt hinzukommt. Expansion erfordert wiederholte Mitgliedernachfrage, starke Reaktionszeiten, gehaltene Mitglieder- und Anbieterkonten, eine vertrauenswürdige lokale Concierge-Leitung und dokumentierte Zahlungs-, Datenschutz- und Branchenregeln.",
  yetkiva:
    "Von Tashkent nach Samarkand und danach nach Namangan, Andijan, Fergana und Bukhara nur bei gehaltenen Geschäftsverträgen, positiver Marge je Lieferung, sicherem Fahrerbetrieb und verlässlichem Support wachsen. Städte in Clustern mit lokalen Hubs und echter Geschäftsnachfrage öffnen, nicht Flottenkapazität vor Verträgen einkaufen.",
};

const BRAND_MILESTONES: Record<string, string[]> = {
  beinstandplus: [
    "Before launch: approve the support scope, consent model and referral rules and contract authorised partners for regulated insurance, legal and benefits work.",
    "Months 1–2: run controlled relocation and bereavement cases with selected funding organisations and measure response time, completion and family feedback.",
    "Months 3–6: turn successful pilots into organisation subscriptions or funded support packages and build a monitored partner network.",
    "Months 7–12: expand only the support categories and German regions that maintain safe handovers, strong satisfaction and sustainable case cost.",
  ],
  traderos: [
    "Before launch: confirm market-data rights, complete UK regulatory and financial-promotion review, publish risk wording and test every signal and alert path.",
    "Months 1–2: run a controlled live-data beta, retain every signal and outcome, test alert speed and correct false or unclear explanations.",
    "Months 3–6: publish the complete live track record and convert trial users into trader subscriptions based on evidence, usability and risk discipline.",
    "Months 7–12: add only asset classes, strategies and channels that retain subscribers without weakening compliance, transparency or data quality.",
  ],
  baytcircle: [
    "Before launch: seed accurate family-venue, activity and home-education profiles in one UAE area and complete claim, correction, safeguarding and removal controls.",
    "Months 1–2: onboard anchor providers and community organisers, recruit families free and test discovery, attendance and spare-capacity bookings.",
    "Months 3–6: convert useful provider trials into subscriptions and measure filled quiet-time places, repeat family use and provider administration saved.",
    "Months 7–12: expand into nearby neighbourhoods only where family demand and verified provider coverage are dense enough to be dependable.",
  ],
  taxcenda: [
    "Before launch: verify preparer credentials and authorised e-file access, approve supported return types, complete engagement terms, security procedures and professional review checklists.",
    "Months 1–2: process a controlled set of U.S.-based and overseas client cases, measure document completeness, review corrections, rejects and filing turnaround.",
    "Months 3–6: grow fixed-fee taxpayer cases through referral partners and useful filing guidance while monitoring accuracy, client approval and support cost.",
    "Months 7–12: add states and return types only when qualified capacity, approved software and quality checks are ready.",
  ],
  merqora: [
    "Before launch: complete authorised Amazon connections, permission controls, seller-data security, action approvals and accurate sales, fee, stock and advertising reporting.",
    "Months 1–2: onboard a controlled group of sellers and agencies, compare Merqora data with their marketplace accounts and fix missing, late or unclear actions.",
    "Months 3–6: convert useful trials into subscriptions and measure time saved, retained accounts, listing improvements, avoided stock-outs and advertising actions completed.",
    "Months 7–12: add another marketplace or country only after the existing seller workflow, support cost and customer retention are dependable.",
  ],
  merqano: [
    "Before launch: stabilise Meyzaar and the KALËTHON clothing store as the first customer-store examples, then complete the central Merqano administration, separate customer dashboards and customer-data separation tests.",
    "Months 1–2: support Meyzaar and KALËTHON through real catalogue, checkout, payment and order journeys and confirm that neither customer can access the other business's customers, products or reports.",
    "Months 3–6: convert customer trials into business subscriptions and reduce the time and support effort needed to launch each additional ecommerce website.",
    "Months 7–12: expand to more customer businesses only when checkout reliability, customer-data separation, subscription retention and support cost are dependable.",
  ],
  nimah: [
    "Before launch: verify the first food outlets, complete local food-safety and payment checks, test expiry and allergen controls and make every price and collection window clear.",
    "Months 1–2: launch controlled Saudi and Pakistani districts, support every outlet closely and measure live offers, reservations, collections, no-shows, complaints and food saved.",
    "Months 3–6: convert useful outlet trials into subscriptions and improve daily offer density, sell-through, repeat customer use and recovered revenue per outlet.",
    "Months 7–12: open nearby districts only where enough paying outlets and active customers can produce a reliable daily marketplace.",
  ],
  auvaneone: [
    "Before launch: approve member and supplier terms, privacy controls, payment flows, concierge service levels and the first verified supplier network in each starting city.",
    "Months 1–2: onboard founding members and independent concierges, handle a controlled set of real requests and measure response time, confirmation rate, supplier performance, member satisfaction and gross margin by request type.",
    "Months 3–6: convert retained members and suppliers to paid plans, strengthen weak supplier categories and prove the WhatsApp-to-human-concierge workflow during evenings, weekends and urgent requests.",
    "Months 7–12: deepen coverage in the five starting markets and add no new city until fulfilment, privacy, payment accuracy, retention and service cost meet the agreed thresholds.",
  ],
  yetkiva: [
    "Before launch: approve the business-funded pricing boundary, Tashkent service zones, local operating contracts, rider and vehicle checks, safety, insurance, tax, payment, privacy and support procedures.",
    "Months 1–2: run controlled merchant, fleet and managed-delivery pilots; reconcile every order, rider payout, business invoice, proof record, service failure and delivery contribution.",
    "Months 3–6: convert useful software trials and delivery pilots into retained business contracts, improve on-time delivery, reduce dispatch intervention and prove positive contribution by client and route.",
    "Months 7–12: deepen Tashkent coverage and test Samarkand only when retained contracts, safe operations, support response and unit economics meet the agreed thresholds.",
  ],
};

const BRAND_SUCCESS_MEASURES: Record<string, string[]> = {
  beinstandplus: [
    "Funded organisation accounts and completed support cases",
    "Time to first human response and to complete important tasks",
    "Family satisfaction and safe handover to authorised specialists",
    "No unconsented sponsor access or regulated advice by unqualified staff",
    "Sustainable delivery cost per funded case",
  ],
  traderos: [
    "Paying trader subscriptions and retained subscribers",
    "Alert speed, data uptime and signal explanation completion",
    "Complete published history including losing and expired signals",
    "Subscriber use of risk limits, journal and review tools",
    "No misleading profit claims, client-money custody or unapproved promotions",
  ],
  baytcircle: [
    "Paying claimed provider profiles",
    "Verified family activities and bookable spare-capacity places per launch area",
    "Confirmed attendance, repeat family use and provider retention",
    "Measured improvement in filled off-peak capacity",
    "Safeguarding reports handled within the agreed response time",
  ],
  taxcenda: [
    "Paid and completed taxpayer cases",
    "Returns accepted without avoidable e-file rejection",
    "Preparation and review turnaround after all documents are received",
    "Current PTIN, professional and authorised e-file credentials for every assigned role",
    "No refund-percentage fee, guaranteed outcome or unsupported return accepted",
  ],
  merqora: [
    "Paying seller and agency subscriptions",
    "Connected marketplace accounts retained after the trial",
    "Accurate sales, fee, stock, advertising and account-health data",
    "Seller actions completed and measurable administration time saved",
    "No shopper fee, sales guarantee or unapproved marketplace account change",
  ],
  merqano: [
    "Paying customer-business website subscriptions",
    "Meyzaar and KALËTHON active as separately administered customer stores",
    "Time and support cost required to launch each additional customer website",
    "Successful checkouts, orders and payments with accurate customer-level reporting",
    "No cross-shop data access and no Merqano fee charged to shoppers",
  ],
  nimah: [
    "Paying food-outlet subscriptions after the trial",
    "Daily live surplus offers and successful customer collections per launch district",
    "Food-offer sell-through, repeat customers and recovered revenue for participating outlets",
    "Low no-show, refund, complaint and safety-incident rates",
    "Customers pay no Ni'mah platform fee and outlets keep their surplus-food sales income",
  ],
  auvaneone: [
    "Paying and retained member and supplier accounts",
    "Time to first human response, suitable options and confirmed arrangement",
    "Completed multi-supplier requests and member satisfaction",
    "Supplier acceptance, confirmation, failure and repeat-use rates",
    "Revenue and direct service cost by membership, supplier plan, processed payment and wholesale-rate booking",
    "No hidden fee, unapproved AI confirmation, privacy breach or unowned member request",
  ],
  yetkiva: [
    "Paying and retained merchant, marketplace and fleet accounts",
    "On-time pickup and delivery rate with accurate customer ETA",
    "Positive contribution after rider pay, vehicle, support and local operating costs",
    "Rider, vehicle and proof records complete with low fraud, accident and complaint rates",
    "Merchant and dispatcher time saved with fewer missed or manually rescued orders",
    "No customer membership, rider access fee or unapproved second paying side",
  ],
};

const DE_BRAND_MILESTONES: Record<string, string[]> = {
  beinstandplus: [
    "Vor dem Start: Leistungsumfang, Einwilligungsmodell und Weiterleitungsregeln freigeben und autorisierte Partner für regulierte Versicherungs-, Rechts- und Sozialleistungsarbeit vertraglich binden.",
    "Monate 1–2: kontrollierte Umzugs- und Trauerfälle mit ausgewählten finanzierenden Organisationen durchführen und Reaktionszeit, Abschluss und Familienfeedback messen.",
    "Monate 3–6: erfolgreiche Piloten in Organisationsabos oder finanzierte Unterstützungspakete umwandeln und ein überwachtes Partnernetz aufbauen.",
    "Monate 7–12: nur Hilfekategorien und deutsche Regionen ausweiten, die sichere Übergaben, hohe Zufriedenheit und tragfähige Fallkosten halten.",
  ],
  traderos: [
    "Vor dem Start: Marktdatenrechte bestätigen, britische Regulierungs- und Finanzwerbeprüfung abschließen, Risikohinweise veröffentlichen und jeden Signal- und Warnweg testen.",
    "Monate 1–2: kontrollierte Live-Daten-Beta durchführen, jedes Signal und Ergebnis speichern, Warnungsgeschwindigkeit prüfen und falsche oder unklare Erklärungen korrigieren.",
    "Monate 3–6: vollständige Live-Ergebnisübersicht veröffentlichen und Testnutzer aufgrund von Belegen, Bedienbarkeit und Risikodisziplin in Trader-Abos umwandeln.",
    "Monate 7–12: nur Anlageklassen, Strategien und Kanäle ergänzen, die Abonnenten halten, ohne Compliance, Transparenz oder Datenqualität zu schwächen.",
  ],
  baytcircle: [
    "Vor dem Start: genaue Profile für Familienorte, Aktivitäten und Homeschooling in einem Gebiet der VAE anlegen und Übernahme-, Korrektur-, Schutz- und Entfernungswege abschließen.",
    "Monate 1–2: Ankeranbieter und Organisatoren einrichten, Familien kostenlos gewinnen und Suche, Teilnahme sowie Buchung freier Kapazitäten testen.",
    "Monate 3–6: nützliche Anbietertests in Abos umwandeln und gefüllte ruhige Zeiten, wiederholte Familiennutzung und gesparte Verwaltung messen.",
    "Monate 7–12: nur in nahe Viertel wachsen, in denen Familiennachfrage und geprüfte Anbieterabdeckung eine verlässliche Dichte erreichen.",
  ],
  taxcenda: [
    "Vor dem Start: Erstellerberechtigungen und autorisierten E-File-Zugang prüfen, unterstützte Erklärungstypen freigeben und Mandatsbedingungen, Sicherheit und Prüfchecklisten abschließen.",
    "Monate 1–2: kontrollierte Fälle aus den USA und dem Ausland bearbeiten und Dokumentenvollständigkeit, Prüfungskorrekturen, Ablehnungen und Bearbeitungszeit messen.",
    "Monate 3–6: Festpreisfälle über Empfehlungen und nützliche Steuerinformationen steigern und dabei Genauigkeit, Kundenfreigabe und Supportkosten überwachen.",
    "Monate 7–12: Bundesstaaten und Erklärungstypen nur ergänzen, wenn qualifizierte Kapazität, zugelassene Software und Qualitätskontrollen bereitstehen.",
  ],
  merqora: [
    "Vor dem Start: autorisierte Amazon-Verbindungen, Rechtekontrollen, Verkäuferdatensicherheit, Freigaben sowie genaue Umsatz-, Gebühren-, Bestands- und Werbeberichte abschließen.",
    "Monate 1–2: eine kontrollierte Gruppe aus Verkäufern und Agenturen einrichten, Merqora-Daten mit ihren Marktplatzkonten vergleichen und fehlende, verspätete oder unklare Maßnahmen korrigieren.",
    "Monate 3–6: nützliche Tests in Abos umwandeln und gesparte Zeit, gehaltene Konten, bessere Angebote, vermiedene Fehlbestände und erledigte Werbemaßnahmen messen.",
    "Monate 7–12: erst dann einen weiteren Marktplatz oder ein weiteres Land ergänzen, wenn bestehende Abläufe, Supportkosten und Kundenbindung verlässlich sind.",
  ],
  merqano: [
    "Vor dem Start: Meyzaar und den KALËTHON-Bekleidungsshop als erste Kunden-Shop-Beispiele stabilisieren und danach zentrale Merqano-Verwaltung, getrennte Kundenbereiche und Kundendatentrennung abschließen.",
    "Monate 1–2: Meyzaar und KALËTHON bei echten Katalog-, Kassen-, Zahlungs- und Bestellabläufen begleiten und bestätigen, dass keiner auf Kunden, Produkte oder Berichte des anderen Betriebs zugreifen kann.",
    "Monate 3–6: Kundentests in Geschäftsabos umwandeln und Zeit sowie Supportaufwand für jede weitere E-Commerce-Website senken.",
    "Monate 7–12: nur bei verlässlicher Kasse, Kundendatentrennung, Abobindung und tragfähigen Supportkosten auf weitere Geschäftskunden ausweiten.",
  ],
  nimah: [
    "Vor dem Start: erste Lebensmittelbetriebe prüfen, lokale Lebensmittelsicherheits- und Zahlungskontrollen abschließen, Ablauf- und Allergenkontrollen testen und Preise sowie Abholzeiten klar darstellen.",
    "Monate 1–2: kontrollierte Gebiete in Saudi-Arabien und Pakistan starten, jeden Betrieb eng begleiten und Live-Angebote, Reservierungen, Abholungen, Nichterscheinen, Beschwerden und gerettete Lebensmittel messen.",
    "Monate 3–6: nützliche Betriebstests in Abos umwandeln und tägliche Angebotsdichte, Abverkauf, wiederholte Kundennutzung und zurückgewonnene Einnahmen je Betrieb verbessern.",
    "Monate 7–12: nahe Gebiete nur öffnen, wenn genügend zahlende Betriebe und aktive Kunden einen verlässlichen täglichen Marktplatz ermöglichen.",
  ],
  auvaneone: [
    "Vor dem Start: Mitglieder- und Anbieterbedingungen, Datenschutz, Zahlungswege, Concierge-Servicelevel und das erste geprüfte Anbieternetz in jeder Startstadt freigeben.",
    "Monate 1–2: Gründungsmitglieder und unabhängige Concierges einrichten, kontrollierte echte Wünsche bearbeiten und Reaktionszeit, Bestätigungsquote, Anbieterleistung, Mitgliederzufriedenheit und Rohmarge je Wunschtyp messen.",
    "Monate 3–6: gehaltene Mitglieder und Anbieter in bezahlte Pläne umwandeln, schwache Anbieterkategorien verstärken und den Ablauf von WhatsApp zum menschlichen Concierge abends, am Wochenende und bei dringenden Wünschen beweisen.",
    "Monate 7–12: Abdeckung in den fünf Startmärkten vertiefen und keine neue Stadt öffnen, bevor Erfüllung, Datenschutz, Zahlungsgenauigkeit, Bindung und Servicekosten die vereinbarten Schwellen erreichen.",
  ],
  yetkiva: [
    "Vor dem Start: geschäftsfinanzierte Preisgrenze, Tashkenter Lieferzonen, lokale Betriebsverträge, Fahrer- und Fahrzeugprüfungen sowie Sicherheit, Versicherung, Steuer, Zahlung, Datenschutz und Support freigeben.",
    "Monate 1–2: kontrollierte Händler-, Flotten- und Lieferpiloten durchführen und jede Bestellung, Fahrerauszahlung, Geschäftsrechnung, Zustellbestätigung, Störung und Liefermarge abstimmen.",
    "Monate 3–6: nützliche Softwaretests und Lieferpiloten in gehaltene Geschäftsverträge umwandeln, Pünktlichkeit verbessern, manuelle Disposition senken und positive Marge je Kunde und Route beweisen.",
    "Monate 7–12: Tashkent verdichten und Samarkand erst testen, wenn Vertragsbindung, Betriebssicherheit, Supportreaktion und Stückwirtschaft die vereinbarten Schwellen erfüllen.",
  ],
};

const DE_BRAND_SUCCESS_MEASURES: Record<string, string[]> = {
  beinstandplus: ["Finanzierende Organisationskonten und abgeschlossene Hilfefälle", "Zeit bis zur ersten menschlichen Antwort und bis zum Abschluss wichtiger Aufgaben", "Familienzufriedenheit und sichere Übergabe an autorisierte Fachleute", "Kein Sponsorzugriff ohne Einwilligung und keine regulierte Beratung durch unqualifizierte Mitarbeitende", "Tragfähige Kosten je finanziertem Fall"],
  traderos: ["Zahlende Trader-Abos und gehaltene Abonnenten", "Warnungsgeschwindigkeit, Datenverfügbarkeit und vollständige Signalerklärungen", "Vollständige veröffentlichte Historie einschließlich Verlust- und abgelaufener Signale", "Nutzung von Risikolimits, Tagebuch und Auswertung", "Keine irreführenden Gewinnversprechen, Kundengeldverwahrung oder ungeprüfte Werbung"],
  baytcircle: ["Zahlende übernommene Anbieterprofile", "Geprüfte Familienaktivitäten und buchbare freie Plätze je Startgebiet", "Bestätigte Teilnahme, wiederholte Familiennutzung und Anbieterbindung", "Messbar bessere Auslastung in schwachen Zeiten", "Schutzmeldungen innerhalb der vereinbarten Zeit bearbeitet"],
  taxcenda: ["Bezahlte und abgeschlossene Steuerfälle", "Ohne vermeidbare E-File-Ablehnung angenommene Erklärungen", "Erstellungs- und Prüfzeit nach Eingang aller Unterlagen", "Aktuelle PTIN-, Berufs- und E-File-Berechtigungen für jede zugewiesene Rolle", "Keine prozentuale Erstattungsgebühr, Ergebnisgarantie oder Annahme nicht unterstützter Fälle"],
  merqora: ["Zahlende Verkäufer- und Agenturabos", "Nach der Testphase gehaltene verbundene Marktplatzkonten", "Genaue Umsatz-, Gebühren-, Bestands-, Werbe- und Kontozustandsdaten", "Erledigte Verkäufermaßnahmen und messbar gesparte Verwaltungszeit", "Keine Käufergebühr, Umsatzgarantie oder ungeprüfte Änderung am Marktplatzkonto"],
  merqano: ["Zahlende Website-Abos von Geschäftskunden", "Meyzaar und KALËTHON als getrennt verwaltete aktive Kunden-Shops", "Zeit und Supportkosten für jede weitere Kundenwebsite", "Erfolgreiche Kassenabschlüsse, Bestellungen und Zahlungen mit genauen Kundenberichten", "Kein Datenzugriff zwischen Kunden-Websites und keine Merqano-Gebühr für Käufer"],
  nimah: ["Zahlende Lebensmittelbetriebsabos nach der Testphase", "Tägliche Live-Überschussangebote und erfolgreiche Abholungen je Startgebiet", "Abverkauf, wiederkehrende Kunden und zurückgewonnene Einnahmen der teilnehmenden Betriebe", "Niedrige Quoten bei Nichterscheinen, Erstattungen, Beschwerden und Sicherheitsvorfällen", "Kunden zahlen keine Ni'mah-Plattformgebühr und Betriebe behalten ihre Einnahmen aus Überschussverkäufen"],
  auvaneone: ["Zahlende und gehaltene Mitglieder- und Anbieterkonten", "Zeit bis zur ersten menschlichen Antwort, passenden Optionen und bestätigten Organisation", "Abgeschlossene Wünsche mit mehreren Anbietern und Mitgliederzufriedenheit", "Annahme-, Bestätigungs-, Ausfall- und Wiederverwendungsquote der Anbieter", "Einnahmen und direkte Servicekosten nach Mitgliedschaft, Anbieterplan, verarbeiteter Zahlung und Großhandelsbuchung", "Keine versteckte Gebühr, ungeprüfte KI-Bestätigung, Datenschutzverletzung oder unbeaufsichtigte Mitgliederanfrage"],
  yetkiva: ["Zahlende und gehaltene Händler-, Marktplatz- und Flottenkonten", "Pünktliche Abholung und Zustellung mit genauer Kunden-ETA", "Positive Marge nach Fahrervergütung, Fahrzeug-, Support- und lokalen Betriebskosten", "Vollständige Fahrer-, Fahrzeug- und Zustellnachweise bei niedrigen Betrugs-, Unfall- und Beschwerdequoten", "Gesparte Händler- und Dispositionszeit mit weniger verpassten oder manuell geretteten Aufträgen", "Keine Kundenmitgliedschaft, Fahrerzugangsgebühr oder ungeprüfte zweite zahlende Seite"],
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
  const currency = brand.id === "yetkiva" ? "$" : country === "UK" ? "£" : "€";
  const initialUsers = assumptions.initialUsers ?? brand.defaultInitialUsers;
  const arpu = assumptions.arpu ?? brand.defaultArpu;
  const userGrowth = assumptions.userGrowth ?? brand.defaultUserGrowth;
  const churn = assumptions.churn ?? brand.defaultChurn;
  const directCost = assumptions.directCost ?? brand.defaultDirectCost;
  const affiliateStore = brand.revenueUnit === "affiliate-order";
  const venueFundedSport = brand.id === "kalethon";
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
      ? brand.payerModel.side === "hybrid"
        ? `Paying groups: ${brand.payerModel.payer}. Transparency rule: ${brand.payerModel.freeSide}.`
        : `Paying side: ${brand.payerModel.payer}. Free side: ${brand.payerModel.freeSide}.`
      : simplifyInvestorLanguage(brand.audience),
    marketOpportunity: simplifyInvestorLanguage(brand.market),
    problem: affiliateStore
      ? simplifyInvestorLanguage(brand.reason)
      : (BRAND_PROBLEMS[brand.id] ?? PROBLEMS[sector]),
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
        : brand.payerModel?.side === "hybrid"
          ? (BRAND_SALES_PLANS[brand.id] ?? SALES_PLANS[sector])
        : brand.payerModel
          ? `${BRAND_SALES_PLANS[brand.id] ?? SALES_PLANS[sector]} Commercial rule: the sales team targets only ${brand.payerModel.payer}. The other side remains free, helping the paying customer receive more value without creating a second charging barrier.`
          : SALES_PLANS[sector],
    operations: affiliateStore
      ? "Affivon imports approved retailer data, creates tracked links and reports confirmed commission. A human editor remains responsible for product claims, comparison quality, disclosure and removing stale or misleading content. The retailer handles payment, delivery and returns."
      : venueFundedSport
        ? "The shared team maintains venue data, claim checks, booking technology, payments and support. Unclaimed profiles show only factual public information and cannot publish live availability. A venue must prove ownership or authority before controlling its profile. Venues set their own prices, availability and cancellation rules; Kalëthon Play organises the booking and confirmation record."
        : (BRAND_OPERATIONS[brand.id] ?? OPERATIONS[sector]),
    territoryPlan: venueFundedSport
      ? "Launch in one UK area with pound pricing, postcode and distance search, UK card payments and UK-based support. Build dense coverage across football and five-a-side, cricket, padel, tennis and pickleball before opening the next area. Complete UK GDPR, marketplace, payment, safeguarding, facility-booking and consumer terms, and give every unclaimed venue a clear correction, claim and removal route."
      : (BRAND_TERRITORY_PLANS[brand.id] ?? TERRITORY_PLANS[country]),
    expansionPlan: venueFundedSport
      ? "Expand across England postcode by postcode only after the first areas show repeated player use, useful venue occupancy gains and retained paying venues. Then localise facility rules, governing-body relationships and public-sector procurement for Wales, Scotland and Northern Ireland before considering Ireland or other countries."
      : (BRAND_EXPANSION_PLANS[brand.id] ?? EXPANSION_PLANS[country]),
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
        : (BRAND_MILESTONES[brand.id] ?? [
          `Before launch: finish the core journey, payments, local legal documents, support training and a controlled customer test in ${countryLabel(country)}.`,
          `Months 1–2: onboard the first trial customers, watch how they use the product and fix the main reasons they do not complete the journey.`,
          `Months 3–6: convert trials to paid plans and work toward ${initialUsers.toLocaleString("en-GB")} ${volumeLabel.toLowerCase()} while measuring the true cost of winning and supporting each account.`,
          "Months 7–12: grow the channels that produce retained customers, add selected partners and pause any channel that loses money.",
        ]),
    successMeasures: BRAND_SUCCESS_MEASURES[brand.id] ?? (affiliateStore
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
          "Players and organisers remain free, with no Kalëthon Play player service fee",
          "Measured improvement in filled venue hours, confirmed attendance and repeat bookings",
          `Direct monthly brand cost kept near ${currency}${directCost.toLocaleString("en-GB")}`,
        ]
        : [
          `${initialUsers.toLocaleString("en-GB")} starting ${volumeLabel.toLowerCase()} after the free-trial period`,
          `${currency}${arpu} ${revenuePerUnitLabel.toLowerCase()}`,
          `${(userGrowth * 100).toFixed(0)}% modelled monthly growth in ${volumeLabel.toLowerCase()}`,
          `${(churn * 100).toFixed(1)}% or lower ${attritionLabel.toLowerCase()}`,
          `Direct monthly brand cost kept near ${currency}${directCost.toLocaleString("en-GB")}`,
        ]),
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
  const currency = brand.id === "yetkiva" ? "$" : country === "UK" ? "£" : "€";
  const initialUsers = assumptions.initialUsers ?? brand.defaultInitialUsers;
  const arpu = assumptions.arpu ?? brand.defaultArpu;
  const userGrowth = assumptions.userGrowth ?? brand.defaultUserGrowth;
  const churn = assumptions.churn ?? brand.defaultChurn;
  const directCost = assumptions.directCost ?? brand.defaultDirectCost;
  const affiliateStore = brand.revenueUnit === "affiliate-order";
  const venueFundedSport = brand.id === "kalethon";
  const volume = brand.payerModel?.side === "consumer"
    ? "zahlende Nutzerkonten"
    : brand.payerModel?.side === "hybrid"
      ? "zahlende Mitglieder- und Anbieterkonten"
    : affiliateStore
      ? "bestätigte vermittelte Bestellungen"
      : venueFundedSport
        ? "zahlende Sportstätten"
        : "zahlende Geschäftskonten";
  const payer = brand.id === "traderos"
    ? "selbstentscheidende Trader"
    : brand.id === "taxcenda"
      ? "die Steuerpflichtigen, die eine US-Steuererklärung erstellen und einreichen lassen"
      : brand.id === "beinstandplus"
        ? "Arbeitgeber, Versicherer, Pflege- und Gemeinschaftsorganisationen"
      : brand.id === "baytcircle"
          ? "Familienorte, Aktivitätsanbieter, Tutoren, Vereine und Gemeinschaftsorganisationen"
          : brand.id === "merqora"
            ? "Amazon- und andere Online-Marktplatzverkäufer, Verkäuferagenturen und E-Commerce-Teams"
            : brand.id === "merqano"
              ? "Unternehmen und Agenturen, die eine professionelle eigene E-Commerce-Website benötigen"
              : brand.id === "nimah"
                ? "Restaurants, Cafés, Bäckereien, Hotels, Supermärkte, Caterer und andere Lebensmittelbetriebe"
                : brand.id === "auvaneone"
                  ? "Auvane-One-Mitglieder und geprüfte Anbieter für Gastgewerbe, Reisen, Lifestyle und Erlebnisse"
                : brand.id === "yetkiva"
                  ? "Marktplätze, Händler, Lieferunternehmen und Flottenbetreiber in Usbekistan"
          : brand.payerModel?.side === "consumer"
            ? "die Endnutzer"
            : affiliateStore
              ? "zugelassene Händler"
              : brand.id === "kinderstars"
                ? "registrierte Tagesmütter und Tagesväter"
                : brand.id === "kalethon"
                  ? "Sportstätten und Betreiber buchbarer Anlagen"
                  : brand.id === "criclume"
                    ? "Cricketvereine, Ligen, Wettbewerbe und Akademien"
                    : DE_BUSINESS_PAYERS[sector];
  const freeSide = brand.id === "traderos"
    ? "Broker, Börsen und Marktdatenanbieter sind Integrationen oder Lieferanten und keine zweite zahlende Kundenseite."
    : brand.id === "taxcenda"
      ? "Die IRS, Steuerbehörden und Fachpartner zahlen keine zweite Plattformgebühr."
      : brand.id === "beinstandplus"
        ? "Menschen und Familien erhalten die finanzierte Umzugs-, Alltags- oder Trauerfallhilfe ohne zweite Plattformgebühr."
        : brand.id === "baytcircle"
          ? "Familien, Homeschooling-Gruppen, Zugezogene und Einheimische nutzen Suche, Organisation und Buchung kostenlos."
          : brand.id === "merqora"
            ? "Käufer und Marktplatzkunden zahlen keine Merqora-Gebühr."
            : brand.id === "merqano"
              ? "Käufer nutzen die Website des jeweiligen Geschäftskunden ohne Merqano-Plattformgebühr."
              : brand.id === "nimah"
                ? "Kunden zahlen nur den angezeigten reduzierten Lebensmittelpreis an den Betrieb und keine Ni'mah-Mitglieds- oder Plattformgebühr."
                : brand.id === "auvaneone"
                  ? "Mitglieder- und Anbieterleistungen werden getrennt und transparent berechnet; direkte Zahlungen an Anbieter tragen keine Auvane-One-Provision."
                : brand.id === "yetkiva"
                  ? "Kunden nutzen die Sendungsverfolgung ohne Yetkiva-Mitgliedschaft; Fahrer erhalten die Arbeits-App über das Geschäftskonto und werden für ihre Arbeit bezahlt, statt für den Zugang zu Aufträgen belastet zu werden."
          : brand.payerModel?.side === "consumer"
            ? "Geschäftspartner zahlen keine zweite Plattformgebühr."
            : "Die Nutzerseite bleibt kostenlos und wird nicht zusätzlich von der Plattform belastet.";

  return {
    territory: DE_COUNTRY_LABELS[country],
    businessType: DE_SECTOR_LABELS[sector],
    stage: "Defined product",
    summary: brandPlainLanguage(brand, "de"),
    customer: brand.payerModel?.side === "hybrid"
      ? `Zahlende Gruppen sind ${payer}. Transparenzregel: ${freeSide}`
      : `Zahlender Kunde ist ${payer}. ${freeSide}`,
    marketOpportunity: `Die Geschäftsleitung sieht im Bereich ${DE_SECTOR_LABELS[sector]} in ${DE_COUNTRY_LABELS[country]} einen großen, aber noch zu bestätigenden Markt. Die Planung wird erst durch echte Kundengespräche, Testabschlüsse und belastbare lokale Quellen freigegeben.`,
    problem: DE_BRAND_PROBLEMS[brand.id] ?? DE_PROBLEMS[sector],
    solution: `${brandPlainLanguage(brand, "de")} Die erste Version deckt nur den kleinsten vollständigen Kundenweg ab. Weitere Funktionen kommen erst hinzu, wenn echte Nutzung den Bedarf zeigt.`,
    revenue: affiliateStore
      ? `Käufer nutzen den Vergleich kostenlos. Ein zugelassener Händler zahlt nach einer geeigneten vermittelten Bestellung eine Provision. Die Planung rechnet im Schnitt mit ${currency}${arpu.toFixed(2)} bestätigter Provision je Bestellung.`
      : venueFundedSport
        ? `Spieler, Organisatoren, Teams, Vereine, Trainer und Offizielle nutzen Kalëthon Play kostenlos. Nur Sportstätten zahlen nach 60 Tagen Testphase ein Abo; geplant sind durchschnittlich ${currency}${arpu} je zahlender Sportstätte und Monat.`
        : brand.id === "taxcenda"
          ? `Nur der steuerpflichtige Kunde zahlt TaxCenda. Die Planung rechnet mit durchschnittlich ${currency}${arpu} je abgeschlossenem unterstützten Steuerfall. IRS, Steuerbehörden und Fachpartner werden nicht belastet; TaxCenda erhält keinen Anteil an Erstattung oder Steuerersparnis.`
        : brand.id === "nimah"
          ? `Nur teilnehmende Lebensmittelbetriebe zahlen Ni'mah. Die Planung rechnet mit durchschnittlich ${currency}${arpu} je zahlendem Betrieb und Monat. Kunden zahlen nur den angezeigten reduzierten Lebensmittelpreis an den Betrieb; Ni'mah verlangt keine Kundenplattformgebühr und erhält keinen prozentualen Anteil am Überschussverkauf.`
        : brand.id === "auvaneone"
          ? `Auvane One ist hybrid finanziert: Mitglieder zahlen für Concierge-Zugang und geprüfte Anbieter für Plattformzugang und Geschäftswerkzeuge. Direkte Zahlungen an Anbieter tragen keine Auvane-One-Provision. Verarbeitet Auvane One die Zahlung, trägt der Anbieter die Kartenkosten und das Mitglied eine offengelegte Servicegebühr von 0,3 %. Bei vereinbarten Großhandelspreisen kann Auvane One die offengelegte Differenz zum Mitgliederpreis behalten. Die Planung rechnet mit durchschnittlich ${currency}${arpu} je zahlendem Mitglieder- oder Anbieterkonto und Monat.`
        : brand.id === "kinderstars"
          ? `Registrierte Tagesmütter und Tagesväter zahlen ein monatliches Abo. Eltern nutzen die Suche und Organisation kostenlos. Das Betreuungsgeld zahlen die Eltern oder eine berechtigte staatliche Stelle direkt an die Betreuungsperson.`
          : `Nur ${payer} zahlt. Die Planung rechnet nach zwei kostenlosen Testmonaten mit durchschnittlich ${currency}${arpu} je zahlendem Konto und Monat. ${freeSide}`,
    salesPlan: venueFundedSport
      ? "Eine Startregion lückenlos aufbauen, sachliche öffentliche Angaben zu Sportstätten aufnehmen und noch nicht übernommene Profile klar kennzeichnen. Betreiber zur Prüfung und Übernahme einladen, Spieler kostenlos über Vereine, Ligen, Schulen und Gemeinden gewinnen und dann den messbaren Nutzen für Auslastung und Verwaltung verkaufen."
      : brand.payerModel?.side === "hybrid"
        ? (DE_BRAND_SALES[brand.id] ?? DE_SALES[sector])
      : `${DE_BRAND_SALES[brand.id] ?? DE_SALES[sector]} Verkauft wird nur an die zahlende Seite; die andere Seite bleibt kostenlos.`,
    operations: affiliateStore
      ? "Affivon verwaltet zugelassene Händlerdaten, nachverfolgbare Links und bestätigte Provisionen. Menschen prüfen Aussagen, Vergleiche, Kennzeichnungen und veraltete Inhalte. Zahlung, Lieferung und Rückgabe bleiben beim Händler."
      : (DE_BRAND_OPERATIONS[brand.id] ?? DE_OPERATIONS[sector]),
    territoryPlan: venueFundedSport
      ? "In einer britischen Region mit Pfund-Preisen, Postleitzahl- und Entfernungssuche, britischen Zahlungen und Support starten. Erst dichte Abdeckung für die wichtigsten Sportarten schaffen und Datenschutz, Zahlungen, Schutzpflichten, Buchungs- und Verbraucherregeln abschließen."
      : (DE_BRAND_TERRITORY[brand.id] ?? DE_TERRITORY[country]),
    expansionPlan: venueFundedSport
      ? "Erst nach wiederholter Spielernutzung, besserer Auslastung und gehaltenen zahlenden Sportstätten Postleitzahl für Postleitzahl in England wachsen. Danach Regeln und Partnerschaften für Wales, Schottland und Nordirland anpassen."
      : (DE_BRAND_EXPANSION[brand.id] ?? DE_EXPANSION[country]),
    milestones: DE_BRAND_MILESTONES[brand.id] ?? [
      `Vor dem Start: Kernablauf, Zahlungen, lokale Verträge, Support und einen kontrollierten Kundentest in ${DE_COUNTRY_LABELS[country]} abschließen.`,
      "Monate 1–2: erste Testkunden einrichten, Nutzung beobachten und die wichtigsten Abbruchgründe beheben.",
      `Monate 3–6: Testkonten in bezahlte Konten umwandeln und auf ${initialUsers.toLocaleString("de-DE")} ${volume} hinarbeiten.`,
      "Monate 7–12: nur Vertriebskanäle ausbauen, die gehaltene Kunden bringen, und unwirtschaftliche Kanäle stoppen.",
    ],
    successMeasures: DE_BRAND_SUCCESS_MEASURES[brand.id] ?? [
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
