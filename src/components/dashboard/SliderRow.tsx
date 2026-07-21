import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  hint?: string;
};

export function SliderRow({ label, value, min, max, step = 1, onChange, format, hint }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={Number.isFinite(value) ? value : 0}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-7 w-28 text-right text-xs"
          />
          {format && (
            <span className="w-20 text-right text-xs font-medium tabular-nums text-foreground">
              {format(value)}
            </span>
          )}
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[Math.min(max, Math.max(min, value))]}
        onValueChange={(v) => onChange(v[0])}
      />
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}