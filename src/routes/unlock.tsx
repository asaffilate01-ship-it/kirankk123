import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/loungetech-logo.png.asset.json";

export const Route = createFileRoute("/unlock")({
  validateSearch: (search: Record<string, unknown>) => ({
    error: typeof search.error === "string" ? search.error : undefined,
  }),
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
  const { error } = Route.useSearch();

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
        <form method="post" action="/api/public/unlock" className="space-y-3">
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            autoFocus
            required
          />
          {error === "invalid" && (
            <p className="text-xs text-destructive">Incorrect password. Try again.</p>
          )}
          {error === "config" && (
            <p className="text-xs text-destructive">Dashboard access is temporarily unavailable.</p>
          )}
          <Button type="submit" className="w-full">
            Enter
          </Button>
        </form>
      </Card>
    </div>
  );
}