const KEY = "itechlounge-gate-token";

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