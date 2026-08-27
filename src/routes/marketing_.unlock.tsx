import { t } from "@/lib/i18n";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { unlockMarketing } from "@/lib/gate.functions";
import { saveMarketingGateToken } from "@/lib/gate-client";

export const Route = createFileRoute("/marketing_/unlock")({
  validateSearch: (search: Record<string, unknown>) => ({ error: typeof search.error === "string" ? search.error : undefined }),
  head: () => ({ meta: [{ title: "Marketing access — iTechLounge" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: MarketingUnlock,
});

function MarketingUnlock() {
  const { error: searchError } = Route.useSearch();
  const navigate = useNavigate();
  const unlock = useServerFn(unlockMarketing);
  const [error, setError] = useState<string | undefined>(searchError);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok && res.token) {
        saveMarketingGateToken(res.token);
        await navigate({ to: "/marketing" });
      } else setError("invalid");
    } catch {
      setError("config");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm space-y-5 p-6">
        <div className="flex justify-between"><Button asChild variant="ghost" size="sm"><Link to="/portfolio">{t("Public portfolio")}</Link></Button><LanguageToggle /></div>
        <div className="flex flex-col items-center gap-3 text-center"><BrandLogo className="h-16" /><div><h1 className="text-lg font-semibold">{t("Marketing strategy")}</h1><p className="text-xs text-muted-foreground">{t("Enter the separate marketing access password.")}</p></div></div>
        <form method="post" action="/api/public/marketing-unlock" onSubmit={onSubmit} className="space-y-3">
          <Input type="password" name="password" autoComplete="current-password" placeholder={t("Password")} autoFocus required />
          {error === "invalid" && <p className="text-xs text-destructive">{t("Incorrect password. Try again.")}</p>}
          {error === "config" && <p className="text-xs text-destructive">{t("Marketing access is temporarily unavailable.")}</p>}
          <Button type="submit" className="w-full" disabled={busy}>{busy ? t("Checking…") : t("Enter")}</Button>
        </form>
      </Card>
    </div>
  );
}
