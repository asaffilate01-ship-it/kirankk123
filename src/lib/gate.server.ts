import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const GATE_COOKIE_NAME = "loungetech-gate";
export const GATE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type UnlockPayload = { unlocked: true; exp: number };

function isLocalHost(host: string) {
  return host.includes("localhost") || host.includes("127.0.0.1");
}

export function gateCookieOptions(host = getRequestHeader("host") ?? "") {
  const local = isLocalHost(host);
  return {
    httpOnly: true,
    secure: !local,
    sameSite: (local ? "lax" : "none") as "lax" | "none",
    partitioned: !local,
    path: "/",
    maxAge: GATE_COOKIE_MAX_AGE,
  } as const;
}

export function gateSetCookieHeader(host: string, token: string, maxAge = GATE_COOKIE_MAX_AGE) {
  const local = isLocalHost(host);
  const attributes = [
    `${GATE_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    `SameSite=${local ? "Lax" : "None"}`,
  ];

  if (!local) attributes.push("Secure", "Partitioned");
  return attributes.join("; ");
}

export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload, "utf8").digest("base64url");
}

export function createUnlockToken(secret: string): string {
  const payload: UnlockPayload = {
    unlocked: true,
    exp: Date.now() + GATE_COOKIE_MAX_AGE * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encodedPayload}.${signPayload(encodedPayload, secret)}`;
}

export function isValidUnlockToken(token: string | undefined, secret: string | undefined): boolean {
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

export function hasValidGateCookie(): boolean {
  return isValidUnlockToken(getCookie(GATE_COOKIE_NAME), process.env.SESSION_SECRET);
}