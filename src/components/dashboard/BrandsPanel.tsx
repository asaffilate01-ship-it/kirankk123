import { useState } from "react";
import { BRANDS } from "@/lib/brands";
import { useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SliderRow } from "./SliderRow";
import { fmtEUR, fmtEURk, fmtNum, fmtPct } from "./format";
import { buildModel } from "@/lib/finance-store";

export function BrandsPanel() {
  const state = useFinance();
  const rows = buildModel(state);
  const [openId, setOpenId] = useState<string | null>(null);
  const brand = BRANDS.find((b) => b.id === openId) ?? null;
  const assump = openId ? state.brands[openId] : null;

  return (
    <>
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
              <SliderRow
                label="Launch month"
                value={a.launchMonth}
                min={1}
                max={state.global.months}
                onChange={(v) => state.setBrand(b.id, { launchMonth: v })}
              />
              <SliderRow
                label="Initial paid users (post-trial)"
                value={a.initialUsers}
                min={0}
                max={2000}
                step={10}
                onChange={(v) => state.setBrand(b.id, { initialUsers: v })}
                format={fmtNum}
              />
              <SliderRow
                label="Monthly user growth"
                value={Math.round(a.userGrowth * 1000) / 10}
                min={0}
                max={40}
                step={0.5}
                onChange={(v) => state.setBrand(b.id, { userGrowth: v / 100 })}
                format={(v) => `${v.toFixed(1)}%`}
              />
              <SliderRow
                label="ARPU"
                value={a.arpu}
                min={0}
                max={500}
                step={1}
                onChange={(v) => state.setBrand(b.id, { arpu: v })}
                format={(v) => `€${v.toFixed(0)}/mo`}
              />
              <SliderRow
                label="Monthly churn"
                value={Math.round(a.churn * 1000) / 10}
                min={0}
                max={15}
                step={0.1}
                onChange={(v) => state.setBrand(b.id, { churn: v / 100 })}
                format={(v) => `${v.toFixed(1)}%`}
              />
              <SliderRow
                label="Other revenue / mo"
                value={a.addlRevenue}
                min={0}
                max={50000}
                step={100}
                onChange={(v) => state.setBrand(b.id, { addlRevenue: v })}
                format={fmtEURk}
              />
              <SliderRow
                label="Direct brand cost / mo"
                value={a.directCost}
                min={0}
                max={30000}
                step={100}
                onChange={(v) => state.setBrand(b.id, { directCost: v })}
                format={fmtEURk}
              />
              <Button variant="outline" size="sm" onClick={() => setOpenId(b.id)}>
                In-depth details
              </Button>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!brand} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {brand && assump && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: brand.color }}
                    aria-hidden
                  />
                  <DialogTitle>{brand.name}</DialogTitle>
                </div>
                <p className="text-sm text-muted-foreground">{brand.tagline}</p>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <p>{brand.description}</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <div className="text-xs font-semibold uppercase text-muted-foreground">
                      Market
                    </div>
                    <div className="mt-1">{brand.market}</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs font-semibold uppercase text-muted-foreground">
                      Audience
                    </div>
                    <div className="mt-1">{brand.audience}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-muted-foreground">
                    Competition & how we break their strength
                  </div>
                  <div className="mt-2 space-y-2">
                    {brand.competitors.map((c) => (
                      <div key={c.name} className="rounded-md border p-3">
                        <div className="font-semibold">{c.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Strength: {c.strength}
                        </div>
                        <div className="mt-1 text-xs">
                          <span className="font-semibold text-emerald-500">Counter:</span> {c.counter}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 rounded-md bg-muted/50 p-3 text-xs">
                  <div>Launch month: <b>M{assump.launchMonth}</b></div>
                  <div>Free trial: <b>{state.global.freeTrialMonths} mo</b></div>
                  <div>ARPU: <b>{fmtEUR(assump.arpu)}</b></div>
                  <div>Churn: <b>{fmtPct(assump.churn)}</b></div>
                  <div>Growth: <b>{fmtPct(assump.userGrowth)}</b></div>
                  <div>Initial users: <b>{fmtNum(assump.initialUsers)}</b></div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}