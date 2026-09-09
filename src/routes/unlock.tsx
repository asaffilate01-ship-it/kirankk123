import { WorkspaceAccess } from "@/components/workspace-access";
import { investorDestination } from "@/lib/access-destination";
import { saveGateToken } from "@/lib/gate-client";
import { unlockSite } from "@/lib/gate.functions";
import { createFileRoute,useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

export const Route = createFileRoute("/unlock")({
  validateSearch: (search: Record<string, unknown>): { error?: string; returnTo?: string } => ({
    error: typeof search.error === "string" ? search.error : undefined,
    returnTo: investorDestination(search.returnTo),
  }),
  head: () => ({
    meta: [
      { title: "Unlock — iTechLounge Dashboard" },
      { name: "description", content: "Password protected dashboard." },
      { property: "og:title", content: "Unlock — iTechLounge Dashboard" },
      { property: "og:description", content: "Password protected iTechLounge dashboard access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const { error: searchError, returnTo } = Route.useSearch();
  const navigate = useNavigate();
  const unlock = useServerFn(unlockSite);
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
        saveGateToken(res.token);
        await navigate({ to: investorDestination(returnTo) });
      } else {
        setError("invalid");
      }
    } catch {
      setError("config");
    } finally {
      setBusy(false);
    }
  }

  return <WorkspaceAccess area="investor" action="/api/public/unlock" onSubmit={onSubmit} busy={busy} error={error} returnTo={investorDestination(returnTo)} />;
}
