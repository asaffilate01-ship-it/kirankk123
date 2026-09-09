import { clearPortfolioGateToken, readPortfolioGateToken } from "@/lib/gate-client";
import { verifyPortfolioGateToken } from "@/lib/portfolio-gate.functions";
import { t } from "@/lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

export function PortfolioGateGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const verify = useServerFn(verifyPortfolioGateToken);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const result = await verify({ data: { token: readPortfolioGateToken() } });
      if (!active) return;
      if (result.unlocked) {
        setUnlocked(true);
        return;
      }
      clearPortfolioGateToken();
      await navigate({ to: "/portfolio/unlock", search: { error: undefined }, replace: true });
    };
    check().catch(() => {
      if (active) navigate({ to: "/portfolio/unlock", search: { error: undefined }, replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate, verify]);

  if (!unlocked) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-sm text-muted-foreground">{t("Checking access…")}</p></div>;
  }

  return <>{children}</>;
}