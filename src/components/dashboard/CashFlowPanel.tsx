import { useMemo } from "react";
import { useFinance, buildModel } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fmtEURk } from "./format";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function CashFlowPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const chartData = rows.map((r) => ({
    m: `M${r.month}`,
    Cash: Math.round(r.cashBalance),
    Funding: Math.round(r.fundingIn),
    Dividend: Math.round(-r.dividendPaid),
  }));

  const minCash = rows.reduce((m, r) => Math.min(m, r.cashBalance), Infinity);
  const minMonth = rows.find((r) => r.cashBalance === minCash)?.month ?? 0;
  const investorPctLabel = `${Math.round(state.global.investorEquityPct * 100)}%`;
  const founderPctLabel = `${100 - Math.round(state.global.investorEquityPct * 100)}%`;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Cash balance over time</h3>
          <div className="text-xs text-muted-foreground">
            Trough: <b className={minCash < 0 ? "text-red-500" : "text-emerald-500"}>{fmtEURk(minCash)}</b> at M{minMonth}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="cashG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmtEURk(v)} width={70} />
              <Tooltip formatter={(v: any) => fmtEURk(Number(v))} />
              <Legend />
              <Area type="monotone" dataKey="Cash" stroke="#22c55e" fill="url(#cashG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-3 font-semibold">Cash flow statement (monthly)</h3>
        <div className="max-h-96 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Net profit</TableHead>
                <TableHead className="text-right">Funding in</TableHead>
                <TableHead className="text-right">Dividend paid</TableHead>
                <TableHead className="text-right">Investor 45%</TableHead>
                <TableHead className="text-right">Founder 55%</TableHead>
                <TableHead className="text-right">Net cash flow</TableHead>
                <TableHead className="text-right">Cash balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.month}>
                  <TableCell>M{r.month}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.netProfit)}</TableCell>
                  <TableCell className="text-right tabular-nums text-emerald-500">
                    {fmtEURk(r.fundingIn)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-red-500">
                    {r.dividendPaid ? fmtEURk(-r.dividendPaid) : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.investorShare ? fmtEURk(r.investorShare) : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.founderShare ? fmtEURk(r.founderShare) : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{fmtEURk(r.cashFlow)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${r.cashBalance < 0 ? "text-red-500" : ""}`}>
                    {fmtEURk(r.cashBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}