import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DE } from "./i18n-de";
import { DE_EXTRA } from "./i18n-de-extra";
import { DE_UX } from "./i18n-de-ux";
import { DE_LEGAL } from "./i18n-de-legal";
import { DE_OMNIQORA } from "./i18n-de-omniqora";
import { DE_KIEZIO } from "./i18n-de-kiezio";
import { DE_MOTORESQ } from "./i18n-de-motoresq";
import { DE_MARELYRA } from "./i18n-de-marelyra";
import { DE_EASTAMIRA } from "./i18n-de-eastamira";
import { DE_INVESTOR } from "./i18n-de-investor";
import { DE_PLAN } from "./i18n-de-plan";
import { DE_BRAND_COPY } from "./i18n-de-brand-copy";
import { DE_BRAND_COPY2 } from "./i18n-de-brand-copy2";
import { BRANDS } from "./brands";

const DICT: Record<string, string> = { ...DE, ...DE_EXTRA, ...DE_OMNIQORA, ...DE_KIEZIO, ...DE_MOTORESQ, ...DE_MARELYRA, ...DE_EASTAMIRA, ...DE_PLAN, ...DE_BRAND_COPY, ...DE_BRAND_COPY2, ...DE_UX, ...DE_LEGAL, ...DE_INVESTOR };

export type Lang = "en" | "de";

const STORAGE_KEY = "itl.lang";
const GERMAN_ZONES = [
  "Europe/Berlin",
  "Europe/Vienna",
  "Europe/Zurich",
  "Europe/Busingen",
];

/** Module-level current language so `t()` works without a hook, incl. in nested helpers. */
let currentLang: Lang = "en";

const HIDDEN_PORTFOLIO_DOMAINS = Array.from(new Set([
  ...BRANDS.map((brand) => brand.domain),
  "itechlounge.co.uk",
  "itechlounge.de",
])).sort((a, b) => b.length - a.length);

/** Keep owned sites private in investor mode without deleting them from the data model. */
export function hidePortfolioDomains(text: string): string {
  let output = text
    .replace(/(?:Live now|Currently live|Now live|Aktuell live|Jetzt live)(?:[^.!?]|\.(?!\s|$))*[.!?]?/gi, "")
    .replace(/(?:the real domains?|the production domains?|die echte Domain|die echten Domains)(?:[^.!?]|\.(?!\s|$))*[.!?]?/gi, "")
    .replace(/(?:https?:\/\/)?(?:www\.)?\b[a-z0-9.-]+\.(?:lovable\.app|lovableproject\.com)\b/gi, "")
    .replace(/(?:https?:\/\/)?(?:www\.)?\b[a-z0-9.-]+\.itechlounge\.co\.uk\b/gi, "");
  for (const domain of HIDDEN_PORTFOLIO_DOMAINS) {
    const escaped = domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(new RegExp(`(?:https?:\\/\\/)?(?:www\\.)?${escaped}`, "gi"), "");
  }
  return output
    .replace(/https?:\/\/(?:www\.)?/gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/^\s*[;,:-]+\s*/g, "")
    .replace(/\b(?:and|or|und|oder)\s+(?=[,.;:]|$)/gi, "")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/([.;:])\s*\1+/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function t(text: string): string {
  const translated = currentLang === "en" ? text : (DICT[text] ?? text);
  return hidePortfolioDomains(translated);
}

export function getCurrentLang(): Lang {
  return currentLang;
}

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "de" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && GERMAN_ZONES.includes(tz)) return "de";
  } catch {
    /* ignore */
  }
  const langs = typeof navigator !== "undefined" ? [navigator.language, ...(navigator.languages ?? [])] : [];
  if (langs.some((l) => typeof l === "string" && /^de/i.test(l))) return "de";
  return "en";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const detected = detectLang();
    currentLang = detected;
    setLangState(detected);
  }, []);

  currentLang = lang;

  const setLang = useCallback((l: Lang) => {
    currentLang = l;
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang]);
  return (
    <LangContext.Provider value={value}>
      {/* key forces a fresh render pass so module-level t() re-evaluates everywhere */}
      <Fragment key={lang}>{children}</Fragment>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
