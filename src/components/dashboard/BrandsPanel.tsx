import { t } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { BRANDS, REGIONS, regionOf } from "@/lib/brands";
import { useFinance } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { fmtEURk, fmtNum } from "./format";
import { buildModel } from "@/lib/finance-store";
import { BRAND_LOGOS } from "@/lib/brand-logos";

export function BrandsPanel() {
  const state = useFinance();
  const rows = buildModel(state);

  return (
    <div className="space-y-8">
      {REGIONS.map((region) => {
        const brands = BRANDS.filter((b) => regionOf(b) === region.id);
        if (brands.length === 0) return null;
        return (
          <section key={region.id}>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b pb-2">
              <h2 className="text-lg font-semibold tracking-tight">{t(region.label)}</h2>
              <span className="text-xs text-muted-foreground">{brands.length} {t("brands")}</span>
              <p className="text-xs text-muted-foreground">{t(region.blurb)}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((b) => {
          const a = state.brands[b.id];
          const lastRow = rows[rows.length - 1];
          const mrr = lastRow.perBrandRevenue[b.id] ?? 0;
          const users = lastRow.perBrandUsers[b.id] ?? 0;
          return (
            <Card key={b.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    {BRAND_LOGOS[b.id] ? (
                      <div className="flex h-10 w-[160px] items-center justify-center">
                        <img
                          src={BRAND_LOGOS[b.id]}
                          alt={`${b.name} logo`}
                          className="max-h-full w-auto max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ background: b.color }}
                        aria-hidden
                      />
                    )}
                    <h3 className="font-semibold">{b.name}</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{t(b.tagline)}</p>
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
                  <div className="text-muted-foreground">{t("Launch")}</div>
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
              <p className="line-clamp-3 text-xs text-muted-foreground">{t(b.description)}</p>
              <Button asChild variant="outline" size="sm" className="mt-auto">
                <Link to="/brands/$brandId" params={{ brandId: b.id }}>{t("Open brand · edit assumptions")}</Link>
              </Button>
            </Card>
          );
        })}
            </div>
          </section>
        );
      })}
    </div>
  );
}