import { Link } from "@tanstack/react-router";
import { BRANDS } from "@/lib/brands";
import { useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { fmtEURk, fmtNum } from "./format";
import { buildModel } from "@/lib/finance-store";

export function BrandsPanel() {
  const state = useFinance();
  const rows = buildModel(state);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BRANDS.map((b) => {
          const a = state.brands[b.id];
          const lastRow = rows[rows.length - 1];
          const mrr = lastRow.perBrandRevenue[b.id] ?? 0;
          const users = lastRow.perBrandUsers[b.id] ?? 0;
          return (
            <Card key={b.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: b.color }}
                      aria-hidden
                    />
                    <h3 className="font-semibold">{b.name}</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{b.tagline}</p>
                  <a
                    href={`https://${b.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-[11px] font-medium text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {b.domain} ↗
                  </a>
                </div>
                <Switch
                  checked={a.enabled}
                  onCheckedChange={(v) => state.setBrand(b.id, { enabled: v })}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 rounded-md bg-muted/50 p-2 text-center text-xs">
                <div>
                  <div className="text-muted-foreground">Launch</div>
                  <div className="font-semibold">M{a.launchMonth}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Users @ M{rows.length}</div>
                  <div className="font-semibold">{fmtNum(users)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">MRR @ M{rows.length}</div>
                  <div className="font-semibold">{fmtEURk(mrr)}</div>
                </div>
              </div>
              <p className="line-clamp-3 text-xs text-muted-foreground">{b.description}</p>
              <Button asChild variant="outline" size="sm" className="mt-auto">
                <Link to="/brands/$brandId" params={{ brandId: b.id }}>
                  Open brand · edit assumptions
                </Link>
              </Button>
            </Card>
          );
        })}
    </div>
  );
}