import { WorkspaceAccess } from "@/components/workspace-access";
import { unlockPortfolio } from "@/lib/portfolio-gate.functions";
import { savePortfolioGateToken } from "@/lib/gate-client";
import { createFileRoute,useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";


export const Route = createFileRoute("/portfolio_/unlock")({
  validateSearch: (search: Record<string, unknown>) => ({ error: typeof search.error === "string" ? search.error : undefined }),
  head: () => ({ meta: [{ title: "Portfolio access — iTechLounge" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: PortfolioUnlock,
});

function PortfolioUnlock() {
  const { error: searchError } = Route.useSearch();
  const navigate = useNavigate();
  const unlock = useServerFn(unlockPortfolio);
  const [error, setError] = useState<string | undefined>(searchError);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    if (busy) return;
    setError(undefined);
    setBusy(true);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok && res.token) {
        savePortfolioGateToken(res.token);
        await navigate({ to: "/portfolio" });
      } else setError("invalid");
    } catch {
      setError("config");
    } finally {
      setBusy(false);
    }
  }

  return <WorkspaceAccess area="portfolio" action="/api/public/portfolio-unlock" onSubmit={onSubmit} busy={busy} error={error} />;
}
