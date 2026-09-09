import { investorDestination } from "@/lib/access-destination";
import { clearGateToken,readGateToken } from "@/lib/gate-client";
import { verifyGateToken } from "@/lib/gate.functions";
import { t } from "@/lib/i18n";
import { useNavigate,useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect,useState } from "react";

export function GateGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const path = useRouterState({ select: state => state.location.pathname });
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
        navigate({ to: "/unlock", search: { error: undefined, returnTo: investorDestination(path) } });
      }
    })().catch(() => {
      if (active) navigate({ to: "/unlock", search: { error: undefined, returnTo: investorDestination(path) } });
    });
    return () => {
      active = false;
    };
  }, [navigate, verify, path]);

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">{t("Checking access…")}</p>
      </div>
    );
  }

  return <>{children}</>;
}