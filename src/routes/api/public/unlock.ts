import { investorDestination } from "@/lib/access-destination";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/unlock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") ?? "";
          const data = contentType.includes("application/json")
            ? (await request.json()) as { password?: string; returnTo?: string }
            : Object.fromEntries(await request.formData());
          const password = typeof data.password === "string" ? data.password : undefined;
          const destination = investorDestination(data.returnTo);
          const errorLocation = (error: string) => `/unlock?${new URLSearchParams({ error, returnTo: destination })}`;
          const expected = process.env.SITE_PASSWORD;
          const secret = process.env.SESSION_SECRET;
          const acceptsHtml = !contentType.includes("application/json");

          if (!expected || !secret) {
            if (acceptsHtml) {
              return new Response(null, { status: 303, headers: { Location: errorLocation("config") } });
            }
            return Response.json({ ok: false, error: "Gate is not configured" }, { status: 500 });
          }

          const { createUnlockToken, gateSetCookieHeader, passwordMatches } = await import(
            "@/lib/gate.server"
          );

          if (!password || !passwordMatches(password, expected)) {
            if (acceptsHtml) {
              return new Response(null, { status: 303, headers: { Location: errorLocation("invalid") } });
            }
            return Response.json({ ok: false }, { status: 401 });
          }

          const token = createUnlockToken(secret);
          const headers = new Headers(
            acceptsHtml
              ? { Location: destination }
              : { "Content-Type": "application/json" },
          );
          headers.append("Set-Cookie", gateSetCookieHeader(request.headers.get("host") ?? "", token));

          if (acceptsHtml) return new Response(null, { status: 303, headers });
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }
      },
    },
  },
});
