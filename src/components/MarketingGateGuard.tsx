import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { verifyMarketingGateToken } from "@/lib/gate.functions";
import { clearMarketingGateToken, readMarketingGateToken } from "@/lib/gate-client";

export function MarketingGateGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const verify = useServerFn(verifyMarketingGateToken);
  const [state, setState] = useState<"checking" | "ok">("checking");

  useEffect(() => {
    let active = true;
    (async () => {
      const token = readMarketingGateToken();
      const { unlocked } = await verify({ data: { token } });
      if (!active) return;
      if (unlocked) setState("ok");
      else {
        clearMarketingGateToken();
        navigate({ to: "/marketing/unlock", search: { error: undefined } });
      }
    })().catch(() => {
      if (active) navigate({ to: "/marketing/unlock", search: { error: undefined } });
    });
    return () => { active = false; };
  }, [navigate, verify]);

  if (state === "checking") {
    return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-sm text-muted-foreground">{t("Checking access…")}</p></div>;
  }
  return <>{children}</>;
}
