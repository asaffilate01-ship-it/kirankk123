import { WorkspaceAccess } from "@/components/workspace-access";
import { saveMarketingGateToken } from "@/lib/gate-client";
import { unlockMarketing } from "@/lib/gate.functions";
import { createFileRoute,useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    if (busy) return;
    setError(undefined);
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

  return <WorkspaceAccess area="marketing" action="/api/public/marketing-unlock" onSubmit={onSubmit} busy={busy} error={error} />;
}
