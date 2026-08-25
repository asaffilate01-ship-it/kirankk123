import json

input_file = '/tmp/chunk5.json'
output_file = '/tmp/out5.json'

with open(input_file, 'r') as f:
    original_strings = json.load(f)

translations = [
    "Ganzjährige Aufenthalte auf atlantischen Inseln, Aktivitäten-Bundles und Winter-Langzeitpakete zu Direktlieferanten-Preisen.",
    "≈16m jährliche Besucher auf den Kanarischen Inseln; starke Nachfrage nach Winter-Langzeitaufenthalten.",
    "Winter-Langzeitreisende, Familien, Remote-Mitarbeiter.",
    "CANAVELLE existiert, weil dieser Markt immer noch von fragmentierten Vermittlern, Tabellenkalkulationen und Telefonanrufen bedient wird. Käufer zahlen mehr für weniger Transparenz, und Anbieter verlieren Marge an Zwischenhändler. Eine einzige, gut konzipierte Plattform beseitigt diese Reibungsverluste.",
    "Segeln, Charter und Inselhopping",
    "Yacht- und Katamaran-Charter, Routen mit Skipper und Inselhopping-Pakete mit transparenter All-in-Preisgestaltung.",
    "≈€25bn globaler Yacht-Chartermarkt.",
    "Charter-Gruppen, Familien, Segelclubs, Firmenausflüge.",
    "OCEAVELA existiert, weil dieser Markt immer noch von fragmentierten Vermittlern, Tabellenkalkulationen und Telefonanrufen bedient wird. Käufer zahlen mehr für weniger Transparenz, und Anbieter verlieren Marge an Zwischenhändler. Eine einzige, gut konzipierte Plattform beseitigt diese Reibungsverluste.",
    "≈15m jährliche Besucher in Ägypten; Tourismus ist einer der drei wichtigsten Devisenbringer, und allein der Markt für Nilkreuzfahrten übersteigt jährlich €1.5bn.",
    "Italien und die Adria, in neuem Licht.",
    "Kuratierte Aufenthalte an der italienischen und adriatischen Küste, Segelrouten, Inseltransfers und lokale Erlebnisse, direkt bei den Eigentümern gebucht durch transparente All-in-Preisgestaltung.",
    "≈80m jährliche Besucher in Italien und der Adria-Küstenregion.",
    "Segel- und Strandreisende, Familien, Gruppen.",
    "ADRILUME existiert, weil dieser Markt immer noch von fragmentierten Vermittlern, Tabellenkalkulationen und Telefonanrufen bedient wird. Käufer zahlen mehr für weniger Transparenz, und Anbieter verlieren Marge an Zwischenhändler. Eine einzige, gut konzipierte Plattform beseitigt diese Reibungsverluste.",
    "Iberische Aktiv- und Wellnessreisen",
    "Jakobsweg-Wanderungen, Radrouten, Thermalbäder und Aktiv-Retreats in ganz Spanien und Portugal mit Gepäcktransfer und Unterstützung.",
    "≈€20bn europäischer Markt für Aktiv- und Wellnessreisen.",
    "Wanderer, Radfahrer, Käufer von Wellness-Retreats.",
    "IBERAVIVA existiert, weil dieser Markt immer noch von fragmentierten Vermittlern, Tabellenkalkulationen und Telefonanrufen bedient wird. Käufer zahlen mehr für weniger Transparenz, und Anbieter verlieren Marge an Zwischenhändler. Eine einzige, gut konzipierte Plattform beseitigt diese Reibungsverluste.",
    "Nördliche Seele. Zentraler Charme. — Europa-Touren, Aufenthalte & Transfers",
    "Länderübergreifende europäische Reisemarke für Nord- und Mitteleuropa: Stadttouren, bahnbasierte Reiserouten, Aufenthalte, Flughafentransfers und Mietwagen, mit lokalisierten Inhalten in jeder europäischen Hauptsprache und einer Partnerkonsole für lokale Betreiber.",
    "≈740m internationale Ankünfte in Europa pro Jahr; €70bn Ausgaben für Touren & Aktivitäten.",
    "Städtereisende, Bahnreisende, Familien und kleine Gruppen in ganz Europa.",
    "EURALUME existiert, weil grenzüberschreitende Europareisen immer noch aus separaten Bahn-, Hotel-, Transfer- und Aktivitäten-Websites zusammengestückelt werden. Reisende zahlen zu viel für weniger Transparenz, und lokale Betreiber verlieren Marge an Aggregatoren. Eine plattformübergreifende Lösung beseitigt diese Reibungsverluste.",
    "Eine europäische Reiseplattform: mehrsprachige SEO-Landingpages pro Reiseziel, All-in-Preisgestaltung, Anfrage-zu-Buchung-Flow, verifizierte lokale Betreiber, Reisenden-App mit Dokumenten und Reiseführern — aufgebaut auf dem gemeinsamen iTechLounge-Stack.",
    "Wo jede Reise beginnt.",
    "≈€700bn weltweite Flugreisedistribution; €120bn europäisches Bahn- und Fernbus-Ticketing.",
    "Freizeit- und KMU-Geschäftsreisende sowie die Schwester-Reisemarken, die es als Buchungsmaschine nutzen.",
    "Eine Suche über Flug, Bahn und Fernbus mit All-in-Preisgestaltung, reservierten Anfragen, persönlichem Reservierungssupport und einer Partnerkonsole — und es dient gleichzeitig als Transport-Engine hinter jeder iTechLounge-Reisemarke.",
    "Beginnen Sie mit Absicht. Reisen Sie mit Glauben. — Saudi-Arabien & religiöse Reisen",
    "Plattform für Saudi-Arabien-Reisen und religiöse Fahrten: Umrah- und Hajj-nahe Reiserouten, Aufenthalte in Medina und Mekka, Touren in Riad und AlUla, Wüstenerlebnisse, Flughafentransfers und geführte Stadttouren, mit arabischen und englischen Inhalten.",
    "≈€40bn Ziel für den Inbound-Tourismus in Saudi-Arabien bis 2030; ≈€25bn jährliche Ausgaben für Umrah- und Pilgerreisen.",
    "Muslimische Familien und Gruppen, die für Umrah- und Kulturerbereisen reisen, sowie saudische Freizeit- und Vision-2030-Touristen.",
    "NIYYAHNOOR existiert, weil religiöse Reisen immer noch über undurchsichtige Agenturpakete mit Bareinzahlungen, WhatsApp-Bestätigungen und ohne schriftliche Reiseroute verkauft werden. Familien verdienen transparente Preise, verifizierte Anbieter und eine ordnungsgemäße Dokumentation.",
    "Transparente, respektvolle Saudi-Arabien- und religiöse Reisen: verifizierte Anbieter, All-in-Preisgestaltung, schriftliche Reiserouten, gebetsbewusste Zeitplanung und arabisch/englischer Support — auf der gemeinsamen iTechLounge-Plattform.",
    "Jede Reise, intelligent verbunden. — Reisebuchungs-Engine",
    "≈€9bn Markt für Reisetechnologie und Buchungssystem-Software.",
    "Reiseveranstalter, DMCs, Reisebüros — sowie die konzerneigenen Reisemarken.",
    "Finden. Beauftragen. Erledigt. — Aufträge, Material und Lieferung für das britische Handwerk",
    "Dreiseitige Handwerkerplattform: Auftragsmanagement und Angebotserstellung für Handwerker, Materialbestellung zu Fachhandelspreisen bei Partnergroßhändlern und Lieferung am selben Tag zur Baustelle — mit einem Kundenportal für Angebote, Fortschrittsfotos und Zahlungen.",
    "≈900,000 britische Handwerksbetriebe; ≈£29bn Ausgaben im Baustoffhandel.",
    "CRAFTVARO UK existiert, weil ein Handwerker täglich etwa eine Stunde verliert, um zu einem Händler zu fahren, Angebote auf Zetteln schreibt und Rechnungen wochenlang hinterherläuft. Den Händler, den Papierkram und die Lieferung in einer Smartphone-App zu vereinen, löst alle drei Probleme auf einmal.",
    "Kostenlose Auftragssoftware, finanziert durch Material- und Liefermarge: Angebote und Rechnungen vor Ort erstellen mit automatisch kalkulierten Materialkosten, Bestellung zu ausgehandelten Fachhandelspreisen, Lieferung zur Baustelle innerhalb weniger Stunden — dieselbe Engine wie TRADEROS, lokalisiert für diesen Markt.",
    "Finden. Beauftragen. Erledigt. — Aufträge, Material und Lieferung für Handwerker",
    "≈560,000 Handwerksbetriebe in Deutschland; ≈€40bn Umsatz im Baustoffhandel.",
    "Elektriker, Installateure, Bauunternehmen, Hausbesitzer, Baustoffhändler, Fahrer.",
    "CRAFTVARO existiert, weil ein Handwerker täglich etwa eine Stunde verliert, um zu einem Händler zu fahren, Angebote auf Zetteln schreibt und Rechnungen wochenlang hinterherläuft. Den Händler, den Papierkram und die Lieferung in einer Smartphone-App zu vereinen, löst alle drei Probleme auf einmal.",
    "Mutig führen. Die Zukunft bauen. — UAE-Unternehmensgründung, Finanzierung & Compliance",
    "Betriebssystem für Geschäfte in den VAE: Unternehmensgründung in Mainland und Freizonen, Gründungsfinanzierung zu einem festen, offengelegten Gewinn über 12–18 Monate, Investoren- und Mitarbeitervisa, Bankkontoeröffnung, Buchhaltung, Körperschaftsteuer- und MwSt-Compliance, WPS-Gehaltsabrechnung und ein Partner-Marktplatz — mit englischer und arabischer Benutzeroberfläche und einer nativen mobilen App.",
    "≈90,000 neue Unternehmensregistrierungen in den VAE pro Jahr; ≈€4bn Markt für Unternehmensgründung, PRO- und Compliance-Dienstleistungen."
]

if len(original_strings) != len(translations):
    print(f"Error: length mismatch! {len(original_strings)} vs {len(translations)}")
    exit(1)

result = {orig: trans for orig, trans in zip(original_strings, translations)}

with open(output_file, 'w') as f:
    json.dump(result, f, ensure_ascii=False, indent=1)
