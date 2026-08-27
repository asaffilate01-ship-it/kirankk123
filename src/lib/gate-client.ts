const KEY = "itechlounge-gate-token";
const MARKETING_KEY = "itechlounge-marketing-gate-token";

export function saveGateToken(token: string) {
  try {
    localStorage.setItem(KEY, token);
  } catch {
    /* storage unavailable */
  }
}

export function readGateToken(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearGateToken() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

export function saveMarketingGateToken(token: string) {
  try {
    localStorage.setItem(MARKETING_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

export function readMarketingGateToken(): string | null {
  try {
    return localStorage.getItem(MARKETING_KEY);
  } catch {
    return null;
  }
}

export function clearMarketingGateToken() {
  try {
    localStorage.removeItem(MARKETING_KEY);
  } catch {
    /* storage unavailable */
  }
}
