import { createFileRoute, useRouter } from "@tanstack/react-router";
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
      { title: "Unlock — LoungeTech Investor Dashboard" },
      { name: "description", content: "Password protected investor dashboard." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const { ok } = await unlock({ data: { password } });
      if (ok) {
        await router.navigate({ to: "/" });
        router.invalidate();
      } else {
        setError(true);
      }
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
            <h1 className="text-lg font-semibold tracking-tight">Investor dashboard</h1>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
          {error && (
            <p className="text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <Button type="submit" className="w-full" disabled={busy || !password}>
            {busy ? "Unlocking…" : "Enter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}