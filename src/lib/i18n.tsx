import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DE } from "./i18n-de";

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

export function t(text: string): string {
  if (currentLang === "en") return text;
  return DE[text] ?? text;
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
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}