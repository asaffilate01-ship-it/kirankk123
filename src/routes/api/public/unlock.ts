import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/unlock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") ?? "";
          const password = contentType.includes("application/json")
            ? ((await request.json()) as { password?: string }).password
            : (await request.formData()).get("password")?.toString();
          const expected = process.env.SITE_PASSWORD;
          const secret = process.env.SESSION_SECRET;
          const acceptsHtml = !contentType.includes("application/json");

          if (!expected || !secret) {
            if (acceptsHtml) {
              return new Response(null, { status: 303, headers: { Location: "/unlock?error=config" } });
            }
            return Response.json({ ok: false, error: "Gate is not configured" }, { status: 500 });
          }

          const { createUnlockToken, gateSetCookieHeader, passwordMatches } = await import(
            "@/lib/gate.server"
          );

          if (!password || !passwordMatches(password, expected)) {
            if (acceptsHtml) {
              return new Response(null, { status: 303, headers: { Location: "/unlock?error=invalid" } });
            }
            return Response.json({ ok: false }, { status: 401 });
          }

          const token = createUnlockToken(secret);
          const headers = new Headers(
            acceptsHtml
              ? { Location: "/investment" }
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
