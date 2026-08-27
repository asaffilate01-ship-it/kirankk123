import { BRANDS, regionOf, type Brand } from "./brands";

/* ------------------------------------------------------------------ *
 * Country / market taxonomy
 * ------------------------------------------------------------------ */

export type CountryId = "DE" | "UK" | "PK" | "AE" | "INT";

export const COUNTRIES: { id: CountryId; label: string; flag: string }[] = [
  { id: "DE", label: "Germany", flag: "🇩🇪" },
  { id: "UK", label: "United Kingdom", flag: "🇬🇧" },
  { id: "PK", label: "Pakistan", flag: "🇵🇰" },
  { id: "AE", label: "UAE", flag: "🇦🇪" },
  { id: "INT", label: "International", flag: "🌍" },
];

/** Explicit country assignment where the domain TLD is not decisive. */
const COUNTRY_OVERRIDES: Record<string, CountryId> = {
  unipathway: "PK",
  ilmvero: "PK",
  baytcircle: "AE",
  tareevo: "AE",
  qiyavo: "AE",
  dubaitrips: "AE",
};

export function countryOf(b: Brand): CountryId {
  const o = COUNTRY_OVERRIDES[b.id];
  if (o) return o;
  const d = b.domain.toLowerCase();
  if (d.endsWith(".de")) return "DE";
  if (d.endsWith(".co.uk") || d.endsWith(".uk")) return "UK";
  if (d.endsWith(".pk")) return "PK";
  if (d.endsWith(".ae")) return "AE";
  return regionOf(b) === "DE" ? "DE" : regionOf(b) === "UK" ? "UK" : "INT";
}

/* ------------------------------------------------------------------ *
 * Business-type taxonomy
 * ------------------------------------------------------------------ */

export type SectorId =
  | "travel"
  | "property"
  | "jobs"
  | "care"
  | "education"
  | "automotive"
  | "food"
  | "compliance"
  | "finance"
  | "trades"
  | "local"
  | "commerce"
  | "sport"
  | "logistics"
  | "software";

export const SECTORS: { id: SectorId; label: string }[] = [
  { id: "travel", label: "Travel & tourism" },
  { id: "property", label: "Property & real estate" },
  { id: "jobs", label: "Jobs & recruitment" },
  { id: "care", label: "Care & family" },
  { id: "education", label: "Education & training" },
  { id: "automotive", label: "Automotive & mobility" },
  { id: "food", label: "Food & hospitality" },
  { id: "compliance", label: "Compliance & legal" },
  { id: "finance", label: "Finance & payments" },
  { id: "trades", label: "Trades & home services" },
  { id: "local", label: "Local discovery" },
  { id: "commerce", label: "Marketplace & retail" },
  { id: "sport", label: "Sport & wellbeing" },
  { id: "logistics", label: "Logistics & fleet" },
  { id: "software", label: "Business software" },
];

const SECTOR_MAP: Record<string, SectorId> = {
  // Travel — the whole TraveNexa network
  travenexa: "travel", farenivo: "travel", hexareve: "travel", bosporiva: "travel",
  eastamira: "travel", corazora: "travel", fiftyroam: "travel", canavelle: "travel",
  rangvaya: "travel", oceavela: "travel", savansea: "travel", nilevella: "travel",
  adrilume: "travel", marelyra: "travel", iberaviva: "travel", euralume: "travel",
  uzvoya: "travel", dubaitrips: "travel", marocways: "travel",
  niyyahnoor: "travel", viazeno: "travel", auvaneone: "travel",
  // Property
  immoviq: "property", gabley: "property", gableyretrofit: "property", hmoflow: "property", sharedbricks: "property",
  premisora: "property", dearnext: "property",
  // Jobs
  stellenxpert: "jobs", xpertjobs: "jobs", skillfinch: "jobs",
  // Care & family
  kinderstars: "care", kinderstarsuk: "care", amityos: "care", beinstandplus: "care",
  saathera: "care", nafsi: "care",
  nearcura: "care",
  // Education
  traindirekt: "education", lessonahead: "education", stemcoach: "education",
  unipathway: "education", ilmvero: "education", qiyavo: "education",
  // Automotive
  zivvo: "automotive", zivvouk: "automotive", autohashi: "automotive", motoresq: "automotive",
  recovrable: "automotive",
  // Food & hospitality
  dishbee: "food", eventplanrger: "food", eventplanruk: "food", nimah: "food",
  // Compliance & legal
  haccora: "compliance", "haccora-uk": "compliance", "docuvera-de": "compliance",
  "docuvera-uk": "compliance", lawquo: "compliance", beratermarkt: "compliance", tendryva: "compliance",
  formationgenie: "compliance", rettio: "compliance",
  // Finance
  taxnuvia: "finance", taxcenda: "finance", zorynnexus: "finance", zoryn: "finance", traderos: "finance",
  // Trades & home
  "craftvaro-de": "trades", "craftvaro-uk": "trades", tareevo: "trades",
  // Local discovery
  kiezio: "local", marktpass: "local", parkpunkt: "local", baytcircle: "local",
  // Marketplace & retail
  merqano: "commerce", merqora: "commerce", bidlumo: "commerce",
  onyngo: "commerce", cirqiva: "commerce", affivon: "commerce",
  avenesto: "commerce", gearivon: "commerce", kidevia: "commerce", glowevyn: "commerce",
  drivaryn: "commerce", fixorlyn: "commerce", tripenvo: "commerce", formevyn: "commerce",
  pawivon: "commerce", deskivon: "commerce",
  // Sport & wellbeing
  kalethon: "sport", criclume: "sport",
  stylesyncuk: "sport", stylesyncger: "sport",
  // Logistics & fleet
  depotmesh: "logistics", fleetsora: "logistics", yetkiva: "logistics",
  // Business software
  omniqora: "software", syndriva: "software",
};

export function sectorOf(b: Brand): SectorId {
  return SECTOR_MAP[b.id] ?? "software";
}

export function sectorLabel(id: SectorId): string {
  return SECTORS.find((s) => s.id === id)?.label ?? id;
}

export function countryLabel(id: CountryId): string {
  return COUNTRIES.find((c) => c.id === id)?.label ?? id;
}

/** Counts used for the filter pills. */
export function countryCounts(): Record<CountryId, number> {
  const out = { DE: 0, UK: 0, PK: 0, AE: 0, INT: 0 } as Record<CountryId, number>;
  for (const b of BRANDS) out[countryOf(b)]++;
  return out;
}

export function sectorCounts(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const b of BRANDS) {
    const s = sectorOf(b);
    out[s] = (out[s] ?? 0) + 1;
  }
  return out;
}
