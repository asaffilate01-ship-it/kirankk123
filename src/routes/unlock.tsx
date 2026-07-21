import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { unlockSite } from "@/lib/gate.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/loungetech-logo.png.asset.json";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Unlock — LoungeTech Dashboard" },
      { name: "description", content: "Password protected dashboard." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const unlock = useServerFn(unlockSite);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const password = String(new FormData(form).get("password") ?? "");
    if (!password) return;
    setBusy(true);
    setError(false);
    try {
      const { ok } = await unlock({ data: { password } });
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
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            autoFocus
            required
          />
          {error && (
            <p className="text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Unlocking…" : "Enter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}