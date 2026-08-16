import { t } from "@/lib/i18n";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoEn from "@/assets/itechlounge-logo-en.png";
import { unlockSite } from "@/lib/gate.functions";
import { saveGateToken } from "@/lib/gate-client";

export const Route = createFileRoute("/unlock")({
  validateSearch: (search: Record<string, unknown>) => ({
    error: typeof search.error === "string" ? search.error : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Unlock — iTechLounge Dashboard" },
      { name: "description", content: "Password protected dashboard." },
      { property: "og:title", content: "Unlock — iTechLounge Dashboard" },
      { property: "og:description", content: "Password protected iTechLounge dashboard access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const { error: searchError } = Route.useSearch();
  const navigate = useNavigate();
  const unlock = useServerFn(unlockSite);
  const [error, setError] = useState<string | undefined>(searchError);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok && res.token) {
        saveGateToken(res.token);
        await navigate({ to: "/" });
      } else {
        setError("invalid");
      }
    } catch {
      setError("config");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm space-y-5 p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={logoEn} alt={t("iTechLounge")} className="h-16 w-auto" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{t("Dashboard")}</h1>
            <p className="text-xs text-muted-foreground">
              Enter the access password to view the financial model.
            </p>
          </div>
        </div>
        <form method="post" action="/api/public/unlock" onSubmit={onSubmit} className="space-y-3">
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder={t("Password")}
            autoFocus
            required
          />
          {error === "invalid" && (
            <p className="text-xs text-destructive">{t("Incorrect password. Try again.")}</p>
          )}
          {error === "config" && (
            <p className="text-xs text-destructive">{t("Dashboard access is temporarily unavailable.")}</p>
          )}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Checking…" : "Enter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}