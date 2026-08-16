import { t } from "@/lib/i18n";
import { useMemo } from "react";
import { useFinance, buildModel } from "@/lib/finance-store";
import { BRANDS } from "@/lib/brands";
import { Card } from "@/components/ui/card";
import { fmtEURk } from "./format";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ChartsPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);

  const stackData = rows.map((r) => {
    const o: Record<string, number | string> = { m: `M${r.month}` };
    BRANDS.forEach((b) => (o[b.name] = Math.round(r.perBrandRevenue[b.id] ?? 0)));
    return o;
  });

  const last = rows[rows.length - 1];
  const pieData = BRANDS.map((b) => ({
    name: b.name,
    value: Math.round(last.perBrandRevenue[b.id] ?? 0),
    color: b.color,
  })).filter((d) => d.value > 0);

  const costMix = rows.map((r) => ({
    m: `M${r.month}`,
    Direct: Math.round(r.directCosts),
    HQ: Math.round(r.hqCost),
    Tech: Math.round(r.techCost),
    Marketing: Math.round(r.marketingCost),
    "Var opex": Math.round(r.variableOpex),
    Custom: Math.round(r.customCost),
  }));

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card className="p-4">
        <h3 className="mb-2 font-semibold">{t("Revenue mix by brand (stacked, monthly)")}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stackData} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmtEURk(v)} width={60} />
              <Tooltip formatter={(v: any) => fmtEURk(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              {BRANDS.map((b) => (
                <Area
                  key={b.id}
                  type="monotone"
                  dataKey={b.name}
                  stackId="1"
                  stroke={b.color}
                  fill={b.color}
                  fillOpacity={0.7}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-2 font-semibold">Brand revenue share @ M{rows.length}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => fmtEURk(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4 xl:col-span-2">
        <h3 className="mb-2 font-semibold">{t("Cost composition (stacked, monthly)")}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costMix} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmtEURk(v)} width={60} />
              <Tooltip formatter={(v: any) => fmtEURk(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="Direct" name={t("Direct")} stackId="c" fill="#ef4444" />
              <Bar dataKey="HQ" name={t("HQ")} stackId="c" fill="#f59e0b" />
              <Bar dataKey="Tech" name={t("Tech")} stackId="c" fill="#6366f1" />
              <Bar dataKey="Marketing" name={t("Marketing")} stackId="c" fill="#ec4899" />
              <Bar dataKey="Var opex" name={t("Var opex")} stackId="c" fill="#0ea5e9" />
              <Bar dataKey="Custom" name={t("Custom")} stackId="c" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}