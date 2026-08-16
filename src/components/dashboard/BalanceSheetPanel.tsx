import { t } from "@/lib/i18n";
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
      <h3 className="mb-3 font-semibold">{t("Year-end balance sheets")}</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Line item")}</TableHead>
              {bs.map((b) => (
                <TableHead key={b.year} className="text-right">Y{b.year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-muted-foreground">{t("ASSETS")}</TableCell>
              {bs.map((b) => <TableCell key={b.year} />)}
            </TableRow>
            {[
              { k: t("Cash"), get: (b: any) => b.cash },
              { k: t("Fixed assets"), get: (b: any) => b.fixedAssets },
              { k: t("Total assets"), get: (b: any) => b.totalAssets, bold: true },
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
              <TableCell className="font-semibold text-muted-foreground">{t("EQUITY & LIAB.")}</TableCell>
              {bs.map((b) => <TableCell key={b.year} />)}
            </TableRow>
            {[
              { k: t("Paid-in capital (investor tranches)"), get: (b: any) => b.paidInCapital },
              { k: t("Retained earnings (undistributed profit)"), get: (b: any) => b.retainedEarnings },
              { k: t("Total equity"), get: (b: any) => b.totalEquity, bold: true },
              { k: t("Liabilities (leases/loans)"), get: (b: any) => b.liabilities },
              { k: t("Total equity + liabilities"), get: (b: any) => b.totalLiabAndEquity, bold: true },
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
        Simplified balance sheet. Fixed assets and matching liabilities are a small placeholder
        capitalisation. Equity = investor paid-in capital + retained earnings (net profit left in
        the business after semi-annual dividends of 20%/30%/40%/40%/40%/40% at M6/12/18/24/30/36).
      </p>
    </Card>
  );
}