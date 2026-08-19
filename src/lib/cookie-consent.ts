export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
};

export type Consent = ConsentCategories & { version: number; ts: string };

export const CONSENT_VERSION = 1;
const KEY = "itechlounge.cookie-consent";
const COOKIE = "itl_consent";

const listeners = new Set<(c: Consent | null) => void>();

function writeCookie(c: Consent) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(
    `v${c.version}:${c.analytics ? "a" : "-"}${c.preferences ? "p" : "-"}`,
  );
  document.cookie = `${COOKIE}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 180}; SameSite=Lax`;
}

function clearNonEssentialCookies(c: Consent) {
  if (typeof document === "undefined") return;
  // Anything we do not have consent for gets dropped on the client.
  const keep = new Set<string>([COOKIE, "itl_gate"]);
  if (c.analytics) keep.add("itl_analytics");
  if (c.preferences) keep.add("itl.lang");
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim();
    if (!name || keep.has(name)) continue;
    if (name.startsWith("sb-") || name.startsWith("__")) continue;
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
}

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return { ...parsed, necessary: true };
  } catch {
    return null;
  }
}

export function saveConsent(input: { analytics: boolean; preferences: boolean }): Consent {
  const consent: Consent = {
    necessary: true,
    analytics: input.analytics,
    preferences: input.preferences,
    version: CONSENT_VERSION,
    ts: new Date().toISOString(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable */
  }
  writeCookie(consent);
  clearNonEssentialCookies(consent);
  listeners.forEach((fn) => fn(consent));
  return consent;
}

export function resetConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
  listeners.forEach((fn) => fn(null));
}

export function acceptAll() {
  return saveConsent({ analytics: true, preferences: true });
}

export function rejectAll() {
  return saveConsent({ analytics: false, preferences: false });
}

export function onConsentChange(fn: (c: Consent | null) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function hasConsent(category: "analytics" | "preferences") {
  const c = readConsent();
  return Boolean(c && c[category]);
}

/** Opens the cookie settings dialog from anywhere (e.g. the footer link). */
export const OPEN_SETTINGS_EVENT = "itl:open-cookie-settings";
export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
  }
}
