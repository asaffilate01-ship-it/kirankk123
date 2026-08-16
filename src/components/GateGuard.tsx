import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { verifyGateToken } from "@/lib/gate.functions";
import { readGateToken, clearGateToken } from "@/lib/gate-client";

export function GateGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const verify = useServerFn(verifyGateToken);
  const [state, setState] = useState<"checking" | "ok">("checking");

  useEffect(() => {
    let active = true;
    (async () => {
      const token = readGateToken();
      const { unlocked } = await verify({ data: { token } });
      if (!active) return;
      if (unlocked) setState("ok");
      else {
        clearGateToken();
        navigate({ to: "/unlock", search: { error: undefined } });
      }
    })().catch(() => {
      if (active) navigate({ to: "/unlock", search: { error: undefined } });
    });
    return () => {
      active = false;
    };
  }, [navigate, verify]);

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">{t("Checking access…")}</p>
      </div>
    );
  }

  return <>{children}</>;
}