import { useState } from "react";
import { useFinance, type CustomLine } from "@/lib/finance-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SliderRow } from "./SliderRow";
import { fmtEURk, fmtPct } from "./format";
import { Trash2, Plus } from "lucide-react";

export function AssumptionsPanel() {
  const s = useFinance();
  const g = s.global;
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="space-y-4 p-4">
        <h3 className="font-semibold">Funding & investor terms</h3>
        <SliderRow
          label="Tranche size"
          value={g.trancheSize}
          min={10000}
          max={500000}
          step={5000}
          onChange={(v) => s.setGlobal({ trancheSize: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="Number of tranches"
          value={g.trancheCount}
          min={1}
          max={40}
          onChange={(v) => s.setGlobal({ trancheCount: v })}
        />
        <SliderRow
          label="Investor equity %"
          value={Math.round(g.investorEquityPct * 1000) / 10}
          min={0}
          max={100}
          step={0.5}
          onChange={(v) => s.setGlobal({ investorEquityPct: v / 100 })}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <div className="rounded-md border p-3 text-xs text-muted-foreground">
          <div className="mb-1 font-medium text-foreground">Funding summary</div>
          <div>
            Total raise: {fmtEURk(g.trancheSize * g.trancheCount)} · each tranche buys{" "}
            {fmtPct(
              g.trancheSize * g.trancheCount > 0
                ? (g.investorEquityPct * g.trancheSize) / (g.trancheSize * g.trancheCount)
                : 0,
            )}{" "}
            equity ({fmtEURk(g.trancheSize)} = {fmtPct((g.investorEquityPct * g.trancheSize) / (g.trancheSize * g.trancheCount))} at full raise)
          </div>
        </div>
        <div className="rounded-md border p-3 text-xs text-muted-foreground">
          <div className="mb-1 font-medium text-foreground">Dividend schedule</div>
          Shareholders draw dividends from undistributed net profit: 20% at M6, 30% at M12,
          40% at M18/24/30/36. Split by equity (investor {Math.round(g.investorEquityPct * 100)}% / founder{" "}
          {100 - Math.round(g.investorEquityPct * 100)}%).
        </div>
        <SliderRow
          label="Opening cash"
          value={g.openingCash}
          min={0}
          max={2000000}
          step={10000}
          onChange={(v) => s.setGlobal({ openingCash: v })}
          format={fmtEURk}
        />
      </Card>

      <Card className="space-y-4 p-4">
        <h3 className="font-semibold">Shared cost engine</h3>
        <SliderRow
          label="HQ base / mo"
          value={g.hqBase}
          min={0}
          max={200000}
          step={1000}
          onChange={(v) => s.setGlobal({ hqBase: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="HQ per launched brand / mo"
          value={g.hqPerBrand}
          min={0}
          max={30000}
          step={500}
          onChange={(v) => s.setGlobal({ hqPerBrand: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="Tech base / mo"
          value={g.techBase}
          min={0}
          max={80000}
          step={500}
          onChange={(v) => s.setGlobal({ techBase: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="Tech per launched brand / mo"
          value={g.techPerBrand}
          min={0}
          max={15000}
          step={250}
          onChange={(v) => s.setGlobal({ techPerBrand: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="Marketing base / mo"
          value={g.marketingBase}
          min={0}
          max={80000}
          step={500}
          onChange={(v) => s.setGlobal({ marketingBase: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="Marketing per launched brand / mo"
          value={g.marketingPerBrand}
          min={0}
          max={30000}
          step={250}
          onChange={(v) => s.setGlobal({ marketingPerBrand: v })}
          format={fmtEURk}
        />
        <SliderRow
          label="Variable opex (% of revenue)"
          value={Math.round(g.variableOpexPct * 1000) / 10}
          min={0}
          max={40}
          step={0.5}
          onChange={(v) => s.setGlobal({ variableOpexPct: v / 100 })}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <SliderRow
          label="Corporate tax rate"
          value={Math.round(g.taxRate * 1000) / 10}
          min={0}
          max={45}
          step={0.5}
          onChange={(v) => s.setGlobal({ taxRate: v / 100 })}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <SliderRow
          label="Free trial (months)"
          value={g.freeTrialMonths}
          min={0}
          max={6}
          onChange={(v) => s.setGlobal({ freeTrialMonths: v })}
        />
        <SliderRow
          label="Forecast horizon (months)"
          value={g.months}
          min={12}
          max={60}
          onChange={(v) => s.setGlobal({ months: v })}
        />
      </Card>

      <CustomLinesEditor kind="revenue" />
      <CustomLinesEditor kind="cost" />

      <Card className="p-4 lg:col-span-2">
        <Button variant="outline" onClick={() => s.reset()}>
          Reset all assumptions
        </Button>
      </Card>
    </div>
  );
}

function CustomLinesEditor({ kind }: { kind: "revenue" | "cost" }) {
  const s = useFinance();
  const lines = kind === "revenue" ? s.customRevenues : s.customCosts;
  const add = kind === "revenue" ? s.addCustomRevenue : s.addCustomCost;
  const remove = kind === "revenue" ? s.removeCustomRevenue : s.removeCustomCost;
  const update = kind === "revenue" ? s.updateCustomRevenue : s.updateCustomCost;
  const [name, setName] = useState("");

  return (
    <Card className="space-y-3 p-4">
      <h3 className="font-semibold">
        Custom {kind === "revenue" ? "revenue" : "cost"} lines
      </h3>
      <p className="text-xs text-muted-foreground">
        Add ancillary {kind === "revenue" ? "revenue streams (ads, partnerships, upsells)" : "cost items (agencies, one-off spend, contractors)"}.
      </p>
      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={kind === "revenue" ? "e.g. Ad network" : "e.g. Legal retainer"}
          className="h-8 text-sm"
        />
        <Button
          size="sm"
          onClick={() => {
            if (!name.trim()) return;
            const line: CustomLine = {
              id: crypto.randomUUID(),
              name: name.trim(),
              amount: kind === "revenue" ? 5000 : 3000,
              startMonth: 1,
              growth: kind === "revenue" ? 0.05 : 0.01,
            };
            add(line);
            setName("");
          }}
        >
          <Plus className="mr-1 h-3 w-3" /> Add
        </Button>
      </div>
      <div className="space-y-3">
        {lines.length === 0 && (
          <p className="text-xs text-muted-foreground">No lines yet.</p>
        )}
        {lines.map((l) => (
          <div key={l.id} className="space-y-2 rounded-md border p-3">
            <div className="flex items-center justify-between gap-2">
              <Input
                value={l.name}
                onChange={(e) => update(l.id, { name: e.target.value })}
                className="h-7 text-sm"
              />
              <Button size="sm" variant="ghost" onClick={() => remove(l.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <SliderRow
              label="Amount / mo"
              value={l.amount}
              min={0}
              max={200000}
              step={100}
              onChange={(v) => update(l.id, { amount: v })}
              format={fmtEURk}
            />
            <SliderRow
              label="Start month"
              value={l.startMonth}
              min={1}
              max={s.global.months}
              onChange={(v) => update(l.id, { startMonth: v })}
            />
            <SliderRow
              label="Monthly growth %"
              value={Math.round(l.growth * 1000) / 10}
              min={-10}
              max={30}
              step={0.1}
              onChange={(v) => update(l.id, { growth: v / 100 })}
              format={(v) => `${v.toFixed(1)}%`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}