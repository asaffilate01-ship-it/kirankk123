import { useMemo } from "react";
import { useFinance, buildModel, balanceSheets } from "@/lib/finance-store";
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

export function BalanceSheetPanel() {
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const bs = useMemo(() => balanceSheets(rows, state.global), [rows, state.global]);

  return (
    <Card className="p-4">
      <h3 className="mb-3 font-semibold">Year-end balance sheets</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Line item</TableHead>
              {bs.map((b) => (
                <TableHead key={b.year} className="text-right">Y{b.year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-muted-foreground">ASSETS</TableCell>
              {bs.map((b) => <TableCell key={b.year} />)}
            </TableRow>
            {[
              { k: "Cash", get: (b: any) => b.cash },
              { k: "Fixed assets", get: (b: any) => b.fixedAssets },
              { k: "Total assets", get: (b: any) => b.totalAssets, bold: true },
            ].map((r) => (
              <TableRow key={r.k}>
                <TableCell className={r.bold ? "font-semibold" : ""}>{r.k}</TableCell>
                {bs.map((b) => (
                  <TableCell key={b.year} className={`text-right tabular-nums ${r.bold ? "font-semibold" : ""}`}>
                    {fmtEURk(r.get(b))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-semibold text-muted-foreground">EQUITY & LIAB.</TableCell>
              {bs.map((b) => <TableCell key={b.year} />)}
            </TableRow>
            {[
              { k: "Paid-in capital (investor tranches)", get: (b: any) => b.paidInCapital },
              { k: "Retained earnings (founder share)", get: (b: any) => b.retainedEarnings },
              { k: "Total equity", get: (b: any) => b.totalEquity, bold: true },
              { k: "Liabilities (leases/loans)", get: (b: any) => b.liabilities },
              { k: "Total equity + liabilities", get: (b: any) => b.totalLiabAndEquity, bold: true },
            ].map((r) => (
              <TableRow key={r.k}>
                <TableCell className={r.bold ? "font-semibold" : ""}>{r.k}</TableCell>
                {bs.map((b) => (
                  <TableCell key={b.year} className={`text-right tabular-nums ${r.bold ? "font-semibold" : ""}`}>
                    {fmtEURk(r.get(b))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Simplified balance sheet. Fixed assets and matching liabilities are modelled as a small placeholder
        capitalisation; equity is composed of investor paid-in capital and founder retained earnings after the
        45% profit distribution.
      </p>
    </Card>
  );
}