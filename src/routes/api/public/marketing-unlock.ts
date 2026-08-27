import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/marketing-unlock")({
  server: { handlers: { POST: async ({ request }) => {
    try {
      const contentType = request.headers.get("content-type") ?? "";
      const password = contentType.includes("application/json") ? ((await request.json()) as { password?: string }).password : (await request.formData()).get("password")?.toString();
      const expected = process.env.MARKETING_PASSWORD;
      const baseSecret = process.env.MARKETING_SESSION_SECRET ?? (process.env.SESSION_SECRET ? `${process.env.SESSION_SECRET}:marketing` : undefined);
      const acceptsHtml = !contentType.includes("application/json");
      if (!expected || !baseSecret) {
        if (acceptsHtml) return new Response(null, { status: 303, headers: { Location: "/marketing/unlock?error=config" } });
        return Response.json({ ok: false, error: "Marketing gate is not configured" }, { status: 500 });
      }
      const { MARKETING_GATE_COOKIE_NAME, createUnlockToken, gateSetCookieHeader, passwordMatches } = await import("@/lib/gate.server");
      if (!password || !passwordMatches(password, expected)) {
        if (acceptsHtml) return new Response(null, { status: 303, headers: { Location: "/marketing/unlock?error=invalid" } });
        return Response.json({ ok: false }, { status: 401 });
      }
      const token = createUnlockToken(baseSecret, "marketing");
      const headers = new Headers(acceptsHtml ? { Location: "/marketing" } : { "Content-Type": "application/json" });
      headers.append("Set-Cookie", gateSetCookieHeader(request.headers.get("host") ?? "", token, undefined, MARKETING_GATE_COOKIE_NAME));
      if (acceptsHtml) return new Response(null, { status: 303, headers });
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    } catch {
      return Response.json({ ok: false }, { status: 400 });
    }
  } } },
});
