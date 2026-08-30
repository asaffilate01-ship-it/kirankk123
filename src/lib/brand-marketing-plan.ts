import type { Brand } from "./brands";
import type { Lang } from "./i18n";
import { brandPlainLanguage } from "./brand-investor-summary";
import { countryLabel, countryOf, sectorLabel, sectorOf, type SectorId } from "./brand-taxonomy";
import { plainBusinessPlan } from "./brand-business-plan";

export type MarketingPlan = {
  territory: string;
  sector: string;
  model: string;
  payingTarget: string;
  freeTarget: string;
  message: string;
  launchOffer: string;
  marketEntry: string;
  seo: string[];
  social: string[];
  direct: string[];
  field: string[];
  partners: string[];
  referrals: string[];
  agents: string[];
  paid: string[];
  first30: string[];
  days31to60: string[];
  days61to90: string[];
  kpis: string[];
  guardrails: string[];
};

type SectorPlaybook = {
  search: string;
  content: string;
  social: string;
  direct: string;
  field: string;
  partners: string;
  proof: string;
};

const EN: Record<SectorId, SectorPlaybook> = {
  travel: { search: "destination, route, activity and service-intent pages", content: "city guides, price explainers, itineraries and verified supplier stories", social: "short destination video, creator itineraries and customer journeys", direct: "hotels, operators, venues, agencies and concierge decision-makers", field: "visit priority suppliers with a live profile and onboarding checklist", partners: "hotels, tourism bodies, airlines, venues, concierges and diaspora groups", proof: "verified supply, response time, booking value and repeat travellers" },
  property: { search: "location, property type, landlord problem and service pages", content: "local market reports, compliance checklists, cost guides and property case studies", social: "property walkthroughs, before-and-after work and expert Q&A", direct: "agents, landlords, property managers, developers and contractors", field: "visit agencies and property operators with a portfolio-import offer", partners: "mortgage brokers, accountants, conveyancers, councils, landlord groups and contractors", proof: "live stock, qualified enquiries, time saved and completed property workflows" },
  jobs: { search: "role, skill, town and employer-hiring pages", content: "salary guides, hiring checklists, candidate advice and employer case studies", social: "vacancy clips, career tips and employer stories", direct: "employers, recruiters, colleges and workforce managers", field: "visit employers and training providers with assisted vacancy setup", partners: "colleges, chambers, trade bodies, job centres and professional communities", proof: "verified employers, active roles, qualified applicants and time-to-hire" },
  care: { search: "service, need, language and location pages", content: "eligibility, safety, funding and family decision guides", social: "trusted expert explainers, family stories and local service spotlights", direct: "registered providers, practices, carers and community organisations", field: "visit providers with verification and assisted profile setup", partners: "councils, schools, community groups, health professionals and charities", proof: "verified providers, suitable matches, safeguarding and successful enquiries" },
  education: { search: "course, qualification, destination and local tutor pages", content: "application guides, lesson plans, outcomes and learner case studies", social: "short lessons, student stories, webinars and tutor demonstrations", direct: "schools, tutors, instructors, academies and education partners", field: "visit priority providers and set up their first course or learner cohort", partners: "schools, colleges, libraries, employers and community groups", proof: "active providers, qualified learners, attendance, completion and outcomes" },
  automotive: { search: "vehicle, service, buyer need and local dealer pages", content: "buying, ownership, import, repair and cost guides", social: "vehicle walkarounds, inspections, dealer stock and practical tips", direct: "dealers, garages, fleets, recovery firms and vehicle-service operators", field: "visit operators with inventory or service-area import ready", partners: "insurers, finance brokers, garages, auction agents and motoring groups", proof: "verified stock or capacity, enquiries, bookings, jobs and retained operators" },
  food: { search: "food service, venue, event, cuisine and location pages", content: "operator guides, menus, safety explainers, surplus stories and event inspiration", social: "food video, venue tours, behind-the-scenes operations and customer stories", direct: "restaurants, caterers, venues, retailers and hospitality groups", field: "visit sites at quiet hours with a tablet demo and assisted setup", partners: "hospitality associations, wholesalers, councils, event groups and local creators", proof: "live sites, active listings, orders or enquiries, repeat use and operator savings" },
  compliance: { search: "regulation, audit, deadline, sector and problem pages", content: "plain-English checklists, templates, deadline updates and audit case studies", social: "expert explainers, compliance mistakes and product demonstrations", direct: "owners, compliance leads, accountants, advisers and multi-site operators", field: "run short on-site compliance reviews and set up a real workflow", partners: "accountants, insurers, consultants, trade bodies and training providers", proof: "completed records, audit readiness, time saved and paid site conversion" },
  finance: { search: "tax, finance, filing, seller and business-problem pages", content: "deadline guides, calculators, evidence checklists and credential-led expert content", social: "deadline reminders, myth-versus-fact and expert Q&A", direct: "accountants, agents, sellers, finance teams and regulated professionals", field: "hold verified adviser onboarding clinics and business demonstrations", partners: "accountancy bodies, banks, payroll firms, business groups and seller communities", proof: "verified professionals, qualified cases, completed workflows and retained accounts" },
  trades: { search: "trade, job type, qualification and postcode pages", content: "job-cost guides, materials advice, safety checks and trader case studies", social: "job transformations, trade tips and verified professional stories", direct: "tradespeople, contractors, builders' merchants and property operators", field: "visit merchants, trade counters and active contractors with mobile onboarding", partners: "merchants, certification bodies, insurers, colleges and landlord groups", proof: "verified subscribers, quoted jobs, accepted work and repeat customers" },
  local: { search: "category, neighbourhood, activity and near-me pages", content: "local guides, event calendars, family lists and claimed-business stories", social: "weekly local picks, community video and event coverage", direct: "local businesses, venues, community organisers and multi-site operators", field: "map one postcode area at a time and invite businesses to claim profiles", partners: "councils, schools, community groups, venues and local creators", proof: "coverage per area, claimed profiles, active users and actions to businesses" },
  commerce: { search: "product, category, seller problem and comparison pages", content: "original comparisons, buying guides, seller growth guides and category analysis", social: "product demonstrations, creator collections and seller education", direct: "retailers, marketplace sellers, brands, agencies and ecommerce operators", field: "run seller onboarding sessions and category-specific demonstrations", partners: "retailer programmes, seller groups, agencies, creators and fulfilment providers", proof: "approved retailers or sellers, indexed content, qualified traffic and attributable sales" },
  sport: { search: "sport, venue, club, league and location pages", content: "venue guides, fixture and organiser tools, coaching content and participation stories", social: "high-energy clips, club stories, venue availability and community challenges", direct: "venues, clubs, leagues, academies and sports operators", field: "visit venues and clubs with a pre-built profile and live booking or management demo", partners: "governing bodies, councils, schools, universities, coaches and kit suppliers", proof: "claimed venues or paying clubs, active teams, bookings, fixtures and retention" },
  logistics: { search: "delivery, fleet, warehouse, route and city pages", content: "cost-per-job guides, operational checklists, SLA reports and fleet case studies", social: "operations video, route stories, dashboard demonstrations and business proof", direct: "marketplaces, merchants, warehouses, couriers and fleet operators", field: "visit operating sites, map the workflow and launch a controlled pilot", partners: "vehicle suppliers, insurers, trade bodies, marketplaces and payment providers", proof: "contracted accounts, live vehicles or locations, service level and positive contribution" },
  software: { search: "workflow, integration, industry and alternative-solution pages", content: "product walkthroughs, templates, integration guides and customer case studies", social: "short product demos, founder-led education and customer workflows", direct: "owners, operations leads, agencies and multi-site businesses", field: "run vertical demonstration days with assisted data import", partners: "consultants, resellers, accountants, IT providers and industry associations", proof: "qualified demos, activated trials, weekly active teams and paid retention" },
};

const DE: Record<SectorId, SectorPlaybook> = {
  travel: { search: "Ziel-, Routen-, Aktivitäts- und Service-Seiten mit klarer Suchabsicht", content: "Stadtführer, Preiserklärungen, Reisepläne und Geschichten verifizierter Anbieter", social: "kurze Zielgebiet-Videos, Creator-Reisepläne und Kundenreisen", direct: "Hotels, Betreiber, Locations, Agenturen und Concierge-Entscheider", field: "priorisierte Anbieter mit fertigem Profil und Onboarding-Checkliste besuchen", partners: "Hotels, Tourismusstellen, Airlines, Locations, Concierges und Diaspora-Gruppen", proof: "verifiziertes Angebot, Reaktionszeit, Buchungswert und Wiederkehrer" },
  property: { search: "Standort-, Objektart-, Vermieterproblem- und Leistungsseiten", content: "lokale Marktberichte, Compliance-Checklisten, Kostenführer und Objekt-Fallstudien", social: "Objektrundgänge, Vorher-Nachher-Arbeiten und Expertenfragen", direct: "Makler, Vermieter, Verwalter, Entwickler und Handwerker", field: "Agenturen und Betreiber mit einem Portfolio-Import-Angebot besuchen", partners: "Finanzierungsvermittler, Steuerberater, Anwälte, Kommunen, Vermietergruppen und Handwerker", proof: "echter Bestand, qualifizierte Anfragen, Zeitersparnis und abgeschlossene Abläufe" },
  jobs: { search: "Stellen-, Qualifikations-, Orts- und Arbeitgeberseiten", content: "Gehaltsführer, Einstellungschecklisten, Bewerberhilfe und Arbeitgeber-Fallstudien", social: "Stellenclips, Karrieretipps und Arbeitgebergeschichten", direct: "Arbeitgeber, Recruiter, Bildungsträger und Personalverantwortliche", field: "Arbeitgeber und Bildungsträger mit unterstützter Stelleneinrichtung besuchen", partners: "Kammern, Hochschulen, Berufsverbände, Jobcenter und Fachcommunities", proof: "verifizierte Arbeitgeber, aktive Stellen, qualifizierte Bewerber und Besetzungszeit" },
  care: { search: "Leistungs-, Bedarfs-, Sprach- und Standortseiten", content: "Ratgeber zu Anspruch, Sicherheit, Finanzierung und Familienentscheidungen", social: "vertrauenswürdige Experteninfos, Familiengeschichten und lokale Anbieter", direct: "registrierte Anbieter, Praxen, Betreuungskräfte und Gemeinschaftsorganisationen", field: "Anbieter mit Verifizierung und unterstützter Profileinrichtung besuchen", partners: "Kommunen, Schulen, Gemeinschaftsgruppen, Fachkräfte und Wohlfahrtsverbände", proof: "verifizierte Anbieter, passende Vermittlungen, Schutzstandards und erfolgreiche Anfragen" },
  education: { search: "Kurs-, Abschluss-, Ziel- und lokale Lehrkraftseiten", content: "Bewerbungsführer, Lernpläne, Ergebnisse und Lerner-Fallstudien", social: "Kurzlektionen, Lernergeschichten, Webinare und Lehrer-Demos", direct: "Schulen, Lehrkräfte, Fahrlehrer, Akademien und Bildungspartner", field: "priorisierte Anbieter besuchen und ersten Kurs oder erste Kohorte einrichten", partners: "Schulen, Hochschulen, Bibliotheken, Arbeitgeber und Gemeinschaftsgruppen", proof: "aktive Anbieter, qualifizierte Lerner, Teilnahme, Abschluss und Ergebnisse" },
  automotive: { search: "Fahrzeug-, Service-, Käuferbedarfs- und lokale Händlerseiten", content: "Ratgeber zu Kauf, Besitz, Import, Reparatur und Kosten", social: "Fahrzeugrundgänge, Prüfungen, Händlerbestand und Praxistipps", direct: "Händler, Werkstätten, Flotten, Abschleppdienste und Fahrzeugdienstleister", field: "Betreiber mit fertigem Bestands- oder Servicegebiet-Import besuchen", partners: "Versicherer, Finanzierer, Werkstätten, Auktionsagenten und Automobilgruppen", proof: "verifizierter Bestand oder Kapazität, Anfragen, Buchungen, Aufträge und gehaltene Betreiber" },
  food: { search: "Gastronomie-, Location-, Event-, Küchen- und Standortseiten", content: "Betreiberführer, Menüs, Sicherheitserklärungen, Überschussgeschichten und Eventideen", social: "Food-Video, Location-Touren, Betriebsabläufe und Kundengeschichten", direct: "Restaurants, Caterer, Locations, Händler und Gastronomiegruppen", field: "Betriebe in ruhigen Zeiten mit Tablet-Demo und Einrichtungshilfe besuchen", partners: "Gastronomieverbände, Großhändler, Kommunen, Eventgruppen und lokale Creator", proof: "aktive Standorte, Live-Profile, Bestellungen oder Anfragen, Wiederholung und Einsparung" },
  compliance: { search: "Regel-, Audit-, Frist-, Branchen- und Problemseiten", content: "verständliche Checklisten, Vorlagen, Frist-Updates und Audit-Fallstudien", social: "Expertenerklärungen, Compliance-Fehler und Produktdemos", direct: "Inhaber, Compliance-Verantwortliche, Steuerberater, Berater und Filialgruppen", field: "kurze Vor-Ort-Prüfung durchführen und echten Ablauf einrichten", partners: "Steuerberater, Versicherer, Berater, Verbände und Schulungsanbieter", proof: "vollständige Nachweise, Auditbereitschaft, Zeitersparnis und zahlende Standorte" },
  finance: { search: "Steuer-, Finanz-, Einreichungs-, Verkäufer- und Geschäftsproblemseiten", content: "Fristführer, Rechner, Nachweislisten und fachlich geprüfte Experteninhalte", social: "Fristerinnerungen, Mythos-gegen-Fakt und Expertenfragen", direct: "Steuerberater, Agenten, Verkäufer, Finanzteams und regulierte Fachleute", field: "Onboarding-Sprechstunden und Geschäftsdemos mit geprüften Beratern", partners: "Berufsverbände, Banken, Lohnbüros, Unternehmensgruppen und Verkäufercommunities", proof: "verifizierte Fachleute, qualifizierte Fälle, abgeschlossene Abläufe und gehaltene Konten" },
  trades: { search: "Gewerk-, Auftrags-, Qualifikations- und Postleitzahlseiten", content: "Kostenführer, Materialtipps, Sicherheitsprüfungen und Handwerker-Fallstudien", social: "Projektverwandlungen, Handwerkstipps und verifizierte Fachleute", direct: "Handwerker, Auftragnehmer, Baustoffhändler und Immobilienbetreiber", field: "Baustoffhandel, Handwerkertheken und aktive Betriebe mit mobilem Onboarding besuchen", partners: "Händler, Zertifizierer, Versicherer, Berufsschulen und Vermietergruppen", proof: "verifizierte Abonnenten, Angebote, angenommene Aufträge und Wiederholungskunden" },
  local: { search: "Kategorie-, Viertel-, Aktivitäts- und Near-me-Seiten", content: "lokale Führer, Veranstaltungskalender, Familienlisten und Claim-Geschichten", social: "wöchentliche lokale Tipps, Community-Video und Eventberichte", direct: "lokale Betriebe, Locations, Organisatoren und Filialunternehmen", field: "jeweils ein Postleitzahlgebiet kartieren und Betriebe zum Claim einladen", partners: "Kommunen, Schulen, Gemeinschaftsgruppen, Locations und lokale Creator", proof: "Abdeckung je Gebiet, beanspruchte Profile, aktive Nutzer und Aktionen zu Betrieben" },
  commerce: { search: "Produkt-, Kategorie-, Verkäuferproblem- und Vergleichsseiten", content: "eigene Vergleiche, Kaufratgeber, Verkäufer-Wachstumsführer und Kategorieanalysen", social: "Produktdemos, Creator-Kollektionen und Verkäuferwissen", direct: "Händler, Marktplatzverkäufer, Marken, Agenturen und E-Commerce-Betreiber", field: "Verkäufer-Onboarding und kategoriespezifische Demos durchführen", partners: "Händlerprogramme, Verkäufergruppen, Agenturen, Creator und Fulfilment-Anbieter", proof: "zugelassene Händler oder Verkäufer, indexierte Inhalte, qualifizierter Traffic und zugeordnete Verkäufe" },
  sport: { search: "Sport-, Location-, Vereins-, Liga- und Standortseiten", content: "Location-Führer, Spielplan- und Organisatorhilfen, Coaching und Teilnahmestorys", social: "dynamische Clips, Vereinsgeschichten, freie Kapazität und Community-Challenges", direct: "Sportstätten, Vereine, Ligen, Akademien und Betreiber", field: "Locations und Vereine mit vorbereitetem Profil und Live-Demo besuchen", partners: "Verbände, Kommunen, Schulen, Hochschulen, Coaches und Ausrüster", proof: "beanspruchte Locations oder zahlende Vereine, Teams, Buchungen, Spiele und Bindung" },
  logistics: { search: "Liefer-, Flotten-, Lager-, Routen- und Stadtseiten", content: "Kosten-pro-Auftrag-Führer, Betriebschecklisten, SLA-Berichte und Flotten-Fallstudien", social: "Betriebsvideo, Routengeschichten, Dashboard-Demos und Geschäftsnachweise", direct: "Marktplätze, Händler, Lager, Kuriere und Flottenbetreiber", field: "Standorte besuchen, Ablauf aufnehmen und kontrollierten Pilot starten", partners: "Fahrzeuglieferanten, Versicherer, Verbände, Marktplätze und Zahlungsanbieter", proof: "vertragliche Konten, aktive Fahrzeuge oder Standorte, Servicelevel und positiver Deckungsbeitrag" },
  software: { search: "Workflow-, Integrations-, Branchen- und Alternativlösungsseiten", content: "Produktführungen, Vorlagen, Integrationshilfen und Kunden-Fallstudien", social: "kurze Produktdemos, Gründerwissen und Kundenabläufe", direct: "Inhaber, Betriebsleiter, Agenturen und Filialunternehmen", field: "vertikale Demo-Tage mit unterstütztem Datenimport durchführen", partners: "Berater, Reseller, Steuerberater, IT-Dienstleister und Branchenverbände", proof: "qualifizierte Demos, aktivierte Tests, wöchentlich aktive Teams und zahlende Bindung" },
};

const TRACTION_EN: Record<string, string> = {
  "haccora-uk": "Begin with the 3 restaurants signed for 60-day trials on 1 September 2026, then work the 30-business pipeline and turn the strongest result into a multi-site case study.",
  eventplanruk: "Onboard the cake franchise's 30 shops and the 4 beauty studios as distinct pilot groups; measure profile completion, enquiries and paid conversion separately.",
  "craftvaro-uk": "Start with the Gas Safe engineers, builders, handymen and plumbers already ready for trial; verify credentials and organise them by postcode and job type.",
  stylesyncuk: "Launch the 6 beauty salons ready for 1 September 2026 as a founding-salon cohort and collect before-and-after workflow evidence.",
  zivvouk: "Import stock and activate the 5 car dealers ready for 1 September 2026, then use live vehicle enquiries as dealer proof.",
  dishbee: "Use the 3 live sites as operating proof and onboard the next 3 September sites with the same checklist and reporting.",
  lessonahead: "Start with the 2 driving instructors ready for 1 September 2026 and use real availability, lesson and learner workflows in local search pages.",
  kinderstarsuk: "Build both sides together: recruit interested childminders while capturing opted-in demand from parents and guardians; public launch remains subject to the required registration and safeguarding readiness.",
  taxnuvia: "Verify the accountants already ready to start, complete their service profiles and route suitable free user enquiries to them.",
  gabley: "Onboard the estate agents already ready to start, import live stock and measure qualified sales, lettings and management enquiries.",
  cirqiva: "Verify the waste operators already ready to start, their licences and service areas, then market collection requests by postcode and waste type.",
  merqano: "Use Meyzaar and the KALËTHON clothing store as the first customer-store proof: document separate branding, catalogue, checkout, orders and reporting, then turn the completed builds into sales demonstrations for other retailers and brands.",
  kalethon: "Launch as Kalëthon Play using the same K master-brand identity as the clothing line. Pre-list venues, invite them to claim and verify profiles, sell the Kalëthon Venue dashboard only to venues, and keep players and organisers free.",
  criclume: "Sell to clubs, leagues, competitions and academies; keep players and supporters free and lead with scoring, administration, media and competition proof.",
  affivon: "Describe Affivon as the shared engine for multiple affiliate storefronts; recruit approved retailer relationships and publish useful original category content without referring to a fixed number of sites.",
  auvaneone: "Recruit founding suppliers across London, Paris, New York, Miami and the UAE with the 90-day, non-exclusive, 0% direct-route booking-commission pilot, then use verified supply to acquire members and independent concierges.",
  yetkiva: "Start with controlled business pilots in Tashkent: one merchant group, one marketplace or fleet partner and clear delivery economics before expanding rider or city capacity.",
};

const TRACTION_DE: Record<string, string> = {
  "haccora-uk": "Mit den 3 Restaurants beginnen, deren 60-Tage-Tests am 1. September 2026 starten, danach die Pipeline mit 30 Betrieben bearbeiten und das stärkste Ergebnis als Filial-Fallstudie nutzen.",
  eventplanruk: "Die 30 Shops des Kuchen-Franchise und die 4 Beauty-Studios als getrennte Pilotgruppen onboarden; Profilabschluss, Anfragen und bezahlte Umwandlung getrennt messen.",
  "craftvaro-uk": "Mit den bereits testbereiten Gas-Safe-Technikern, Bauunternehmen, Handwerkern und Installateuren starten; Nachweise prüfen und nach Postleitzahl und Auftragstyp ordnen.",
  stylesyncuk: "Die 6 zum 1. September 2026 bereiten Salons als Gründerkohorte starten und Vorher-Nachher-Nachweise der Abläufe sammeln.",
  zivvouk: "Bestand importieren und die 5 zum 1. September 2026 bereiten Händler aktivieren; echte Fahrzeuganfragen als Nachweis nutzen.",
  dishbee: "Die 3 Live-Standorte als Betriebsnachweis verwenden und die nächsten 3 September-Standorte mit derselben Checkliste und Berichterstattung onboarden.",
  lessonahead: "Mit den 2 zum 1. September 2026 bereiten Fahrlehrern starten und echte Verfügbarkeits-, Unterrichts- und Fahrschülerabläufe für lokale Suchseiten nutzen.",
  kinderstarsuk: "Beide Seiten gemeinsam aufbauen: interessierte Kindertagespflegepersonen gewinnen und zugleich eingewilligte Nachfrage von Eltern und Sorgeberechtigten erfassen; der öffentliche Start bleibt von Registrierung und Safeguarding-Bereitschaft abhängig.",
  taxnuvia: "Die startbereiten Steuerberater prüfen, Leistungsprofile vervollständigen und passende kostenlose Nutzeranfragen an sie leiten.",
  gabley: "Die startbereiten Makler onboarden, echten Bestand importieren und qualifizierte Verkaufs-, Vermietungs- und Verwaltungsanfragen messen.",
  cirqiva: "Startbereite Entsorger, Lizenzen und Servicegebiete prüfen und danach Abholanfragen nach Postleitzahl und Abfallart vermarkten.",
  merqano: "Meyzaar und den KALËTHON-Bekleidungsshop als erste Kunden-Shop-Nachweise verwenden: getrennte Marke, Katalog, Kasse, Bestellungen und Berichte dokumentieren und die fertigen Shops danach als Vertriebsdemo für weitere Händler und Marken nutzen.",
  kalethon: "Als Kalëthon Play mit derselben K-Masterbrand-Identität wie die Bekleidung starten. Sportstätten vorlisten, zum Claim und zur Prüfung einladen, ausschließlich das Kalëthon-Venue-Dashboard an Betreiber verkaufen und Spieler sowie Organisatoren kostenlos halten.",
  criclume: "An Vereine, Ligen, Wettbewerbe und Akademien verkaufen; Spieler und Fans bleiben kostenlos. Scoring, Verwaltung, Medien und Wettbewerbsergebnisse führen den Vertrieb.",
  affivon: "Affivon als gemeinsame Engine für mehrere Affiliate-Shops erklären; zugelassene Händlerbeziehungen gewinnen und hilfreiche eigene Kategorieinhalte veröffentlichen, ohne eine feste Zahl von Seiten zu nennen.",
  auvaneone: "Gründungspartner in London, Paris, New York, Miami und den VAE mit einem 90-tägigen, nicht exklusiven Pilot ohne Buchungsprovision auf der Direktroute gewinnen; danach Mitglieder und unabhängige Concierges über verifiziertes Angebot gewinnen.",
  yetkiva: "Mit kontrollierten Geschäftspiloten in Taschkent starten: eine Händlergruppe, ein Marktplatz- oder Flottenpartner und klare Lieferökonomie, bevor Fahrer- oder Stadtkapazität wächst.",
};

function territoryEntry(brand: Brand, lang: Lang): string {
  const country = countryOf(brand);
  if (lang === "de") {
    if (country === "UK") return "Im Vereinigten Königreich postcode- und branchennah starten; bestehende September-Piloten zuerst in Referenzkunden umwandeln, dann regional ausweiten.";
    if (country === "DE") return "In Deutschland zunächst eine Stadt oder Region mit deutschen Verträgen, Support und lokalen Partnern beweisen; erst nach messbarer Bindung skalieren.";
    if (country === "PK") return "In Pakistan stadtweise mit lokalen Sprachen, WhatsApp-unterstütztem Onboarding und vertrauenswürdigen Partnern starten.";
    if (country === "AE") return "In den VAE Emirat und Zielgruppe klar trennen; verifiziertes lokales Angebot aufbauen und Arabisch/Englisch ausspielen.";
    return "International jeweils nur eine klar definierte Stadt, Route, Kategorie oder Partnerkohorte starten; das gewinnende Muster danach in den nächsten Markt übertragen.";
  }
  if (country === "UK") return "Launch postcode by postcode and vertical by vertical in the UK; convert the existing September pilot pipeline into reference customers before expanding regionally.";
  if (country === "DE") return "Prove one German city or region first with German contracts, support and local partners; scale only after paid retention is measurable.";
  if (country === "PK") return "Launch city by city in Pakistan with local-language journeys, WhatsApp-assisted onboarding and trusted community or business partners.";
  if (country === "AE") return "Separate each UAE emirate and audience; build verified local supply and market in Arabic and English.";
  return "For international rollout, launch one defined city, route, category or partner cohort at a time, then copy the winning playbook into the next market.";
}

export function brandMarketingPlan(brand: Brand, lang: Lang): MarketingPlan {
  const sectorId = sectorOf(brand);
  const p = (lang === "de" ? DE : EN)[sectorId];
  const payer = brand.payerModel?.payer ?? brand.audience;
  const free = brand.payerModel?.freeSide ?? "";
  const isConsumer = brand.payerModel?.side === "consumer";
  const isHybrid = brand.payerModel?.side === "hybrid";
  const isAffiliate = brand.revenueUnit === "affiliate-order";
  const territory = countryLabel(countryOf(brand));
  const priceLine = brand.payerModel?.pricing?.[0] ?? brand.pricing?.[0];
  const specific = (lang === "de" ? TRACTION_DE : TRACTION_EN)[brand.id];
  const translatedCustomer = lang === "de" ? plainBusinessPlan(brand, {}, "de").customer : payer;

  const model = lang === "de"
    ? isAffiliate ? "Händlerfinanziertes Affiliate-Modell: Nutzer zahlen nicht; Umsatz entsteht aus bestätigten, berechtigten Verkäufen."
      : isHybrid ? "Zwei klar getrennte bezahlte Leistungen; jede Gebühr und der erhaltene Gegenwert werden separat erklärt."
        : isConsumer ? "Nutzerfinanziert: Der Endnutzer ist der Kunde; Unternehmen werden nicht zusätzlich für dieselbe Vermittlung belastet."
          : `Geschäftsfinanziert. ${translatedCustomer}`
    : isAffiliate ? "Retailer-funded affiliate model: users do not pay; revenue comes from confirmed eligible sales."
      : isHybrid ? "Two clearly separated paid services; every charge and the value received are explained independently."
        : isConsumer ? "User-funded: the end user is the customer; businesses are not also charged for the same exchange."
          : `Business-funded: ${payer} pay; the other side uses the relevant journey without a second platform fee.`;

  const launchOffer = lang === "de"
    ? specific ?? (priceLine
      ? `Geführter Pilot mit klarer Erfolgsdefinition; danach gilt die veröffentlichte Preislogik: ${priceLine}`
      : "Geführter 60-Tage-Pilot für die zahlende Seite, mit vereinbarten Erfolgswerten vor Umstellung auf bezahlt.")
    : specific ?? (priceLine
      ? `Guided pilot with agreed success criteria, followed by the published pricing logic: ${priceLine}`
      : "Guided 60-day pilot for the paying side, with agreed success measures before conversion to paid.");

  const brandMessage = brandPlainLanguage(brand, lang);
  const demandTerm = free || (lang === "de" ? "die Nutzerseite" : "the user side");

  return {
    territory: lang === "de" ? countryLabel(countryOf(brand)) === "Germany" ? "Deutschland" : territory === "United Kingdom" ? "Vereinigtes Königreich" : territory : territory,
    sector: lang === "de" ? sectorLabel(sectorId) : sectorLabel(sectorId),
    model,
    payingTarget: translatedCustomer,
    freeTarget: lang === "de" ? "Die kostenlose oder nicht zusätzlich belastete Seite ist in der Zahlungsregel oben ausdrücklich genannt." : demandTerm,
    message: brandMessage,
    launchOffer,
    marketEntry: territoryEntry(brand, lang),
    seo: lang === "de"
      ? [`Suchseiten aufbauen: ${p.search}.`, `Jede Seite beantwortet eine echte Frage, nennt Zielgruppe, Gebiet, Ablauf, Preislogik und klare nächste Aktion.`, `Technisches SEO: indexierbare Seiten, interne Verlinkung, Sitemap, schnelle mobile Darstellung sowie passende Organisation-, Produkt-, FAQ- oder LocalBusiness-Strukturdaten.`]
      : [`Build search pages around ${p.search}.`, "Each page answers a real question and states the audience, territory, workflow, pricing logic and one clear next action.", "Technical SEO: crawlable pages, internal links, sitemap, fast mobile experience and relevant Organization, Product, FAQ or LocalBusiness structured data."],
    social: lang === "de"
      ? [`Kernformate: ${p.social}.`, "Pro Woche: 3 kurze Videos, 2 Beweis- oder Erklärbeiträge, 1 Gründer-/Expertenbeitrag und tägliche Antworten auf echte Fragen.", `Primärkanäle nach Zielgruppe wählen: LinkedIn für B2B-Entscheider; Instagram/TikTok/YouTube für sichtbare Nutzerprobleme; Facebook und WhatsApp nur für relevante lokale oder Community-Zielgruppen.`]
      : [`Core formats: ${p.social}.`, "Weekly rhythm: 3 short videos, 2 proof or explainer posts, 1 founder/expert post and daily answers to real questions.", "Choose channels by audience: LinkedIn for B2B decision-makers; Instagram, TikTok and YouTube for visible user problems; Facebook and WhatsApp for relevant local or community audiences."],
    direct: lang === "de"
      ? [`Zielliste aufbauen: ${p.direct}.`, `Je Konto Entscheider, Problem, vorhandene Lösung, Standort, Größe, Kontaktgrund, Einwilligungs-/Widerspruchsstatus und nächsten Schritt im CRM festhalten.`, "Sequenz: personalisierte Einführung, kurzer Anruf, 15-Minuten-Demo, Pilotvorschlag, zwei Follow-ups und danach sauber schließen oder in Pflege überführen."]
      : [`Build the named-account list around ${p.direct}.`, "Record decision-maker, problem, current solution, location, size, reason for contact, permission/objection status and next action in the CRM.", "Sequence: personalised introduction, short call, 15-minute demo, pilot proposal, two follow-ups, then close cleanly or move to nurture."],
    field: lang === "de"
      ? [`Vor-Ort-Aktion: ${p.field}.`, "Besuche nach Postleitzahl clustern; vorab Termin oder Erlaubnis einholen, Demo auf echte Daten zuschneiden und Einrichtung direkt anbieten.", "Jeder Besuch endet mit einem dokumentierten nächsten Schritt: Datenimport, Teststart, Schulung, Entscheidergespräch oder begründete Absage."]
      : [`Field action: ${p.field}.`, "Cluster visits by postcode, arrange permission or an appointment, tailor the demo to real data and offer assisted setup.", "Every visit ends with a recorded next step: data import, trial start, training, decision-maker meeting or a reasoned no."],
    partners: lang === "de"
      ? [`Partnerziel: ${p.partners}.`, "Partner erhalten ein klares gemeinsames Nutzenversprechen, einen co-gebrandeten Landing-Bereich, nachverfolgbare Einführung und monatliche Ergebnisübersicht.", "Keine pauschale Provision ohne Qualität: Vergütung nur für verifizierte, geeignete Aktivierung oder transparent vereinbarten Umsatz."]
      : [`Partner targets: ${p.partners}.`, "Give each partner a shared value proposition, co-branded landing journey, trackable introduction and monthly outcome report.", "Avoid blanket commissions without quality controls; reward verified suitable activation or transparently agreed revenue."],
    referrals: lang === "de"
      ? ["Nach erfolgreicher Einrichtung und erstem nachweisbaren Nutzen aktiv um zwei passende Empfehlungen bitten.", "Geschäftsempfehlung mit Guthaben, Zusatzmonat, Service-Upgrade oder Spende belohnen; kostenlose Nutzer erhalten einen relevanten, nicht irreführenden Vorteil.", "Empfehlungen mit Code oder Link bis Aktivierung und bezahlter Bindung verfolgen; Selbstempfehlung und Missbrauch sperren."]
      : ["Ask for two relevant introductions only after setup and the first measurable result.", "Reward a business referral with credit, an extra month, service upgrade or donation; give free users a relevant non-misleading benefit.", "Track referral code or link through activation and paid retention, with self-referral and abuse controls."],
    agents: lang === "de"
      ? ["Lokale Vertriebsagenten nach Branche oder Gebiet ernennen, nicht als unkontrollierte Massenakquisiteure.", "Vertrag, Schulung, genehmigte Aussagen, CRM-Pflicht, Gebiet, Datenschutz, Vergütung nach qualifizierter Aktivierung und Rückforderung bei Missbrauch festlegen.", "Agenten dürfen Einwilligung, UWG, DSGVO oder Widerspruchslisten nicht umgehen; jede Aktivität bleibt der Marke zurechenbar."]
      : ["Appoint local sales agents by vertical or territory, not as uncontrolled bulk prospectors.", "Set contract, training, approved claims, CRM use, territory, privacy duties, payment after qualified activation and clawback for abuse.", "Agents must not bypass consent, privacy or suppression lists; their activity remains attributable to the brand."],
    paid: lang === "de"
      ? ["Bezahlte Suche nur auf Keywords mit klarer Kauf- oder Handlungsabsicht; Marken-, Wettbewerber- und Informationskampagnen getrennt führen.", "Retargeting nur mit rechtmäßiger Einwilligung; Zielseiten je Branche, Gebiet und Botschaft statt eine allgemeine Homepage.", "Budget wöchentlich nach qualifizierten Terminen, Aktivierung und bezahlter Bindung verschieben, nicht nach Klicks oder Reichweite."]
      : ["Use paid search only for clear buying or action intent; keep brand, competitor and information campaigns separate.", "Use retargeting only with lawful consent and send traffic to vertical, territory and message-specific landing pages rather than a generic homepage.", "Move budget weekly based on qualified meetings, activation and paid retention—not clicks or reach."],
    first30: lang === "de"
      ? ["Zielkunde, Nutzerseite, Gebiet, Kernbotschaft, Angebot und Ausschlusskriterien schriftlich festlegen.", "Erste 100 Zielkonten oder erste vollständige lokale Angebotskohorte aufbauen und im CRM zuordnen.", `Grundlage produzieren: ${p.content}; mindestens 6 Kernseiten, 4 kurze Demos, 2 Outreach-Skripte und 1 Pilot-Onboarding.`]
      : ["Write down the paying customer, free/user side, territory, core promise, offer and exclusion criteria.", "Build the first 100 named accounts or first complete local supply cohort and assign every record in the CRM.", `Produce the foundation: ${p.content}; at least 6 core pages, 4 short demos, 2 outreach scripts and 1 pilot onboarding journey.`],
    days31to60: lang === "de"
      ? ["Mindestens 30 personalisierte Kontakte, 10 echte Gespräche oder Demos und die erste betreute Pilotkohorte pro priorisierter Marke.", "SEO-Seiten indexieren, lokale/branchenspezifische Inhalte veröffentlichen und zwei Partnerkanäle aktivieren.", "Wöchentlich Einwände, Aktivierung, Nutzung, Supportaufwand und frühe Zahlungsbereitschaft auswerten."]
      : ["Complete at least 30 personalised contacts, 10 real conversations or demos and the first assisted pilot cohort per priority brand.", "Index the search pages, publish local/vertical content and activate two partner channels.", "Review objections, activation, usage, support load and early willingness to pay every week."],
    days61to90: lang === "de"
      ? ["Erste messbare Ergebnisse in Fallstudie, Referenz, Demo und Vertriebsskript umwandeln.", "Nur Kanäle skalieren, die qualifizierte Aktivierung und Bindung zeigen; schwache Kampagnen pausieren oder neu positionieren.", "Gebiet, Branche oder Partnerkohorte erst erweitern, wenn Onboarding, Support und Wirtschaftlichkeit wiederholbar sind."]
      : ["Turn the first measurable results into a case study, reference, demo and sales script.", "Scale only channels showing qualified activation and retention; pause or reposition weak campaigns.", "Expand territory, vertical or partner cohort only when onboarding, support and economics are repeatable."],
    kpis: lang === "de"
      ? [`Wöchentliche Reichweite: neue passende Zielkonten oder Nutzer im Zielgebiet`, "Antwortquote, gebuchte Gespräche, besuchte Betriebe und qualifizierte Demos", "Pilotstart, Aktivierung in 7 Tagen, wöchentliche Nutzung und Abschluss der Kernaktion", "Umwandlung zu bezahlt, 30-/60-/90-Tage-Bindung, Kündigungsgrund und Umsatz je Konto", `Markenspezifischer Nachweis: ${p.proof}`, "CAC und Rückflusszeit je Kanal; Partner- und Agentenqualität getrennt von Paid Media"]
      : ["Weekly reach: new suitable named accounts or users in the target territory", "Reply rate, booked conversations, business visits and qualified demos", "Pilot start, activation within 7 days, weekly use and completion of the core action", "Paid conversion, 30/60/90-day retention, cancellation reason and revenue per account", `Brand proof: ${p.proof}`, "CAC and payback by channel, with partner and agent quality separated from paid media"],
    guardrails: lang === "de"
      ? ["Keine gekauften Massen-E-Mail- oder WhatsApp-Listen. Elektronische Werbung und Telefonakquise nur nach deutschem UWG, DSGVO und dokumentierter Rechtsgrundlage; Widerspruch sofort zentral sperren.", "Keine erfundenen Nutzerzahlen, Bewertungen, Knappheit, behördliche Zulassung oder garantierten Ergebnisse. Managementannahmen, Pipeline, Pilot und zahlende Kunden klar trennen.", "Gesundheits-, Finanz-, Steuer-, Kinder-, Rechts- und Sicherheitsinhalte werden fachlich geprüft; Autor, Datum und Verantwortlichkeit sichtbar machen."]
      : ["No bought bulk email or WhatsApp blasts. Screen UK call lists against TPS/CTPS where required, record the lawful basis, identify the caller and honour objections across every brand.", "Do not invent users, reviews, scarcity, regulatory approval or guaranteed outcomes. Keep management assumptions, pipeline, pilots and paying customers clearly separate.", "Health, finance, tax, children, legal and safety content receives professional review with clear author, date and accountability."],
  };
}
