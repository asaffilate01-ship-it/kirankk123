import { useMemo } from "react";
import { useFinance, buildModel, yearSummaries } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fmtEURk, fmtPct } from "./format";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PLPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const years = useMemo(() => yearSummaries(rows), [rows]);

  const chartData = rows.map((r) => ({
    m: `M${r.month}`,
    Revenue: Math.round(r.revenue),
    Costs: Math.round(r.totalCost),
    EBIT: Math.round(r.ebit),
    Net: Math.round(r.netProfit),
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-2 font-semibold">Revenue vs Costs (monthly)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmtEURk(v)} width={60} />
                <Tooltip formatter={(v: any) => fmtEURk(Number(v))} />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Costs" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-2 font-semibold">EBIT & Net profit (monthly)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmtEURk(v)} width={60} />
                <Tooltip formatter={(v: any) => fmtEURk(Number(v))} />
                <Legend />
                <Bar dataKey="EBIT" fill="#6366f1" />
                <Bar dataKey="Net" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="mb-3 font-semibold">Annual P&L</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line item</TableHead>
                {years.map((y) => (
                  <TableHead key={y.year} className="text-right">Y{y.year}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { k: "Revenue", get: (y: any) => y.revenue, cls: "font-semibold" },
                { k: "Total costs", get: (y: any) => -y.totalCost },
                { k: "EBIT", get: (y: any) => y.ebit, cls: "font-semibold" },
                { k: "Margin", get: (y: any) => y.margin, fmt: fmtPct },
                { k: "Tax", get: (y: any) => -y.tax },
                { k: "Net profit", get: (y: any) => y.netProfit, cls: "font-semibold" },
                { k: "Investor share (45%)", get: (y: any) => y.investorShare },
                { k: "Year-end cash", get: (y: any) => y.endCash, cls: "font-semibold" },
              ].map((row) => (
                <TableRow key={row.k}>
                  <TableCell className={row.cls}>{row.k}</TableCell>
                  {years.map((y) => (
                    <TableCell key={y.year} className={`text-right tabular-nums ${row.cls ?? ""}`}>
                      {row.fmt ? row.fmt(row.get(y)) : fmtEURk(row.get(y))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-3 font-semibold">Monthly P&L (all months)</h3>
        <div className="max-h-96 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Direct</TableHead>
                <TableHead className="text-right">HQ</TableHead>
                <TableHead className="text-right">Tech</TableHead>
                <TableHead className="text-right">Marketing</TableHead>
                <TableHead className="text-right">Var opex</TableHead>
                <TableHead className="text-right">EBIT</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.month}>
                  <TableCell>M{r.month}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.revenue)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.directCosts)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.hqCost)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.techCost)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.marketingCost)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.variableOpex)}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.ebit)}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{fmtEURk(r.netProfit)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}