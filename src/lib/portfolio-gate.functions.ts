import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, setCookie } from "@tanstack/react-start/server";
import { hasValidPortfolioGateCookie, isValidUnlockToken, portfolioSessionSecret, portfolioPasswordMatches, createUnlockToken, PORTFOLIO_GATE_COOKIE_NAME, gateCookieOptions } from "./gate.server";
export const requirePortfolioUnlocked = createServerFn({ method: "GET" }).handler(async () => ({ unlocked: hasValidPortfolioGateCookie() }));
export const verifyPortfolioGateToken = createServerFn({ method: "POST" })
  .inputValidator((data: { token?: string | null }) => data)
  .handler(async ({ data }) => {
    if (hasValidPortfolioGateCookie()) return { unlocked: true as const };
    return { unlocked: isValidUnlockToken(data.token ?? undefined, portfolioSessionSecret(), "portfolio") };
  });

export const unlockPortfolio = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    if (!portfolioPasswordMatches(data.password)) return { ok: false as const, token: null };
    const secret = portfolioSessionSecret();
    if (!secret) throw new Error("PORTFOLIO_SESSION_SECRET or SESSION_SECRET is not set");
    const token = createUnlockToken(secret, "portfolio");
    setCookie(PORTFOLIO_GATE_COOKIE_NAME, token, gateCookieOptions());
    return { ok: true as const, token };
  });

export const lockPortfolio = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(PORTFOLIO_GATE_COOKIE_NAME, { ...gateCookieOptions(), maxAge: 0 });
  return { ok: true as const };
});
