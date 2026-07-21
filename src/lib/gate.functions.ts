import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, getRequestHeader, setCookie } from "@tanstack/react-start/server";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "loungetech-gate";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type UnlockPayload = { unlocked: true; exp: number };

function cookieOptions() {
  const host = getRequestHeader("host") ?? "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");

  return {
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: (isLocalhost ? "lax" : "none") as "lax" | "none",
    partitioned: !isLocalhost,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  } as const;
}

function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload, "utf8").digest("base64url");
}

function createUnlockToken(secret: string): string {
  const payload: UnlockPayload = {
    unlocked: true,
    exp: Date.now() + COOKIE_MAX_AGE * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encodedPayload}.${signPayload(encodedPayload, secret)}`;
}

function hasValidUnlockToken(): boolean {
  const secret = process.env.SESSION_SECRET;
  const token = getCookie(COOKIE_NAME);
  if (!secret || !token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expected = signPayload(encodedPayload, secret);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as UnlockPayload;
    return payload.unlocked === true && typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export const checkUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  return { unlocked: hasValidUnlockToken() };
});

export const requireUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  return { unlocked: hasValidUnlockToken() };
});

export const unlockSite = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSWORD;
    if (!expected) throw new Error("SITE_PASSWORD is not set");
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }
    const secret = process.env.SESSION_SECRET;
    if (!secret) throw new Error("SESSION_SECRET is not set");
    const token = createUnlockToken(secret);
    setCookie(COOKIE_NAME, token, cookieOptions());
    return {
      ok: true as const,
      token,
      cookieName: COOKIE_NAME,
      maxAge: COOKIE_MAX_AGE,
    };
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: 0 });
  return { ok: true as const };
});