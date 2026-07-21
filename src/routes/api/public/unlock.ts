import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/unlock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { password } = (await request.json()) as { password?: string };
          const expected = process.env.SITE_PASSWORD;
          const secret = process.env.SESSION_SECRET;

          if (!expected || !secret) {
            return Response.json({ ok: false, error: "Gate is not configured" }, { status: 500 });
          }

          const { createUnlockToken, gateSetCookieHeader, passwordMatches, GATE_COOKIE_NAME, GATE_COOKIE_MAX_AGE } = await import(
            "@/lib/gate.server"
          );

          if (!password || !passwordMatches(password, expected)) {
            return Response.json({ ok: false }, { status: 401 });
          }

          const token = createUnlockToken(secret);
          const headers = new Headers({ "Content-Type": "application/json" });
          headers.append("Set-Cookie", gateSetCookieHeader(request.headers.get("host") ?? "", token));

          return new Response(
            JSON.stringify({ ok: true, token, cookieName: GATE_COOKIE_NAME, maxAge: GATE_COOKIE_MAX_AGE }),
            { status: 200, headers },
          );
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }
      },
    },
  },
});