import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/loungetech-logo.png.asset.json";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Unlock — LoungeTech Dashboard" },
      { name: "description", content: "Password protected dashboard." },
      { property: "og:title", content: "Unlock — LoungeTech Dashboard" },
      { property: "og:description", content: "Password protected LoungeTech dashboard access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [password, setPassword] = useState("");

  async function handleUnlock() {
    if (!password) return;
    setBusy(true);
    setError(false);
    try {
      const response = await fetch("/api/public/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { ok: boolean };
      const { ok } = result;
      if (ok) {
        // Hard navigation guarantees the new session cookie is used for the
        // next request and the loader re-runs cleanly.
        window.location.assign("/");
        return;
      }
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void handleUnlock();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm space-y-5 p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={logoAsset.url} alt="LoungeTech" className="h-16 w-auto" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Enter the access password to view the financial model.
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} action="javascript:void(0)" className="space-y-3">
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            autoFocus
            required
          />
          {error && (
            <p className="text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <Button type="button" className="w-full" disabled={busy || !password} onClick={handleUnlock}>
            {busy ? "Unlocking…" : "Enter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}