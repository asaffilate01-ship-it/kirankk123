import { t } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { buildModel, useFinance } from "@/lib/finance-store";
import { fmtEURk, fmtNum } from "./format";

/**
 * Monthly revenue / cost / net revenue for a single brand, from its launch
 * month through the end of the model horizon (M36 by default).
 *
 * Costs shown = direct brand cost + the brand's share of shared HQ, tech and
 * marketing spend + variable opex on its own revenue.
 */
export function BrandMonthlyTable({ brandId }: { brandId: string }) {
  const state = useFinance();
  const g = state.global;
  const a = state.brands[brandId];
  const rows = buildModel(state);

  const perBrandFixed = g.hqPerBrand + g.techPerBrand + g.marketingPerBrand;

  const months = rows
    .filter((r) => r.month >= a.launchMonth)
    .map((r) => {
      const revenue = r.perBrandRevenue[brandId] ?? 0;
      const users = r.perBrandUsers[brandId] ?? 0;
      const cost = a.directCost + perBrandFixed + revenue * g.variableOpexPct;
      return { month: r.month, revenue, users, cost, net: revenue - cost };
    });

  const total = months.reduce(
    (s, m) => ({ revenue: s.revenue + m.revenue, cost: s.cost + m.cost, net: s.net + m.net }),
    { revenue: 0, cost: 0, net: 0 },
  );

  if (!a.enabled) {
    return (
      <Card className="p-4 text-xs text-muted-foreground">
        {t("Brand is switched off — enable it to see the monthly forecast.")}
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-sm font-semibold">
          {t("Monthly forecast")} · M{a.launchMonth}–M{rows.length}
        </div>
        <div className="text-[11px] text-muted-foreground">
          {t("Costs include direct brand cost plus this brand's share of HQ, tech, marketing and variable opex.")}
        </div>
      </div>
      <div className="mt-3 max-h-[420px] overflow-auto rounded-md border">
        <table className="w-full text-right text-xs">
          <thead className="sticky top-0 bg-muted/80 backdrop-blur">
            <tr>
              <th className="px-2 py-2 text-left font-medium">{t("Month")}</th>
              <th className="px-2 py-2 font-medium">{t("Paying customers")}</th>
              <th className="px-2 py-2 font-medium">{t("Monthly revenue")}</th>
              <th className="px-2 py-2 font-medium">{t("Monthly costs")}</th>
              <th className="px-2 py-2 font-medium">{t("Net revenue")}</th>
            </tr>
          </thead>
          <tbody>
            {months.map((m) => (
              <tr key={m.month} className="border-t">
                <td className="px-2 py-1.5 text-left font-medium">M{m.month}</td>
                <td className="px-2 py-1.5">{fmtNum(m.users)}</td>
                <td className="px-2 py-1.5">{fmtEURk(m.revenue)}</td>
                <td className="px-2 py-1.5">{fmtEURk(m.cost)}</td>
                <td
                  className={`px-2 py-1.5 font-semibold ${m.net >= 0 ? "text-primary" : "text-destructive"}`}
                >
                  {fmtEURk(m.net)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 border-t bg-muted/80 backdrop-blur">
            <tr>
              <td className="px-2 py-2 text-left font-semibold" colSpan={2}>
                {t("Total to M")}{rows.length}
              </td>
              <td className="px-2 py-2 font-semibold">{fmtEURk(total.revenue)}</td>
              <td className="px-2 py-2 font-semibold">{fmtEURk(total.cost)}</td>
              <td
                className={`px-2 py-2 font-semibold ${total.net >= 0 ? "text-primary" : "text-destructive"}`}
              >
                {fmtEURk(total.net)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
