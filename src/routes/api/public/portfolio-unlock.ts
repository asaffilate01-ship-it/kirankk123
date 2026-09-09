import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/portfolio-unlock")({
  server: { handlers: { POST: async ({ request }) => {
    try {
      const contentType = request.headers.get("content-type") ?? "";
      const password = contentType.includes("application/json") ? ((await request.json()) as { password?: string }).password : (await request.formData()).get("password")?.toString();
      const baseSecret = process.env.PORTFOLIO_SESSION_SECRET ?? (process.env.SESSION_SECRET ? `${process.env.SESSION_SECRET}:portfolio` : undefined);
      const acceptsHtml = !contentType.includes("application/json");
      if (!baseSecret) {
        if (acceptsHtml) return new Response(null, { status: 303, headers: { Location: "/portfolio/unlock?error=config" } });
        return Response.json({ ok: false, error: "Portfolio gate is not configured" }, { status: 500 });
      }
      const { PORTFOLIO_GATE_COOKIE_NAME, createUnlockToken, gateSetCookieHeader, portfolioPasswordMatches } = await import("@/lib/gate.server");
      if (!password || !portfolioPasswordMatches(password)) {
        if (acceptsHtml) return new Response(null, { status: 303, headers: { Location: "/portfolio/unlock?error=invalid" } });
        return Response.json({ ok: false }, { status: 401 });
      }
      const token = createUnlockToken(baseSecret, "portfolio");
      const headers = new Headers(acceptsHtml ? { Location: "/portfolio" } : { "Content-Type": "application/json" });
      headers.append("Set-Cookie", gateSetCookieHeader(request.headers.get("host") ?? "", token, undefined, PORTFOLIO_GATE_COOKIE_NAME));
      if (acceptsHtml) return new Response(null, { status: 303, headers });
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    } catch {
      return Response.json({ ok: false }, { status: 400 });
    }
  } } },
});
