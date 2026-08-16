import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, setCookie } from "@tanstack/react-start/server";
import {
  GATE_COOKIE_NAME,
  createUnlockToken,
  gateCookieOptions,
  hasValidGateCookie,
  isValidUnlockToken,
  passwordMatches,
} from "./gate.server";

export const checkUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  return { unlocked: hasValidGateCookie() };
});

export const requireUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  return { unlocked: hasValidGateCookie() };
});

export const verifyGateToken = createServerFn({ method: "POST" })
  .inputValidator((data: { token?: string | null }) => data)
  .handler(async ({ data }) => {
    if (hasValidGateCookie()) return { unlocked: true as const };
    return { unlocked: isValidUnlockToken(data.token ?? undefined, process.env.SESSION_SECRET) };
  });

export const unlockSite = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSWORD;
    if (!expected) throw new Error("SITE_PASSWORD is not set");
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const, token: null };
    }
    const secret = process.env.SESSION_SECRET;
    if (!secret) throw new Error("SESSION_SECRET is not set");
    const token = createUnlockToken(secret);
    try {
      setCookie(GATE_COOKIE_NAME, token, gateCookieOptions());
    } catch {
      /* cookie is a bonus; the returned token is the source of truth */
    }
    return { ok: true as const, token };
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(GATE_COOKIE_NAME, { ...gateCookieOptions(), maxAge: 0 });
  return { ok: true as const };
});