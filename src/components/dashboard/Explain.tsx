import { useState, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, HelpCircle, Info, MoveHorizontal } from "lucide-react";
import { t } from "@/lib/i18n";

/** Plain-language intro shown at the top of a tab so non-finance readers know what they see. */
export function PanelIntro({
  title,
  description,
  tips,
}: {
  title: string;
  description: string;
  tips?: string[];
}) {
  return (
    <Card className="border-primary/25 bg-primary/[0.04] p-4">
      <div className="flex gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold leading-none">{title}</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          {tips && tips.length > 0 ? (
            <ul className="space-y-1 pt-1">
              {tips.map((tip) => (
                <li key={tip} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

/** Collapsible card section — keeps long pages short and scannable. */
export function Section({
  title,
  description,
  defaultOpen = true,
  badge,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  badge?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden p-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-muted/50"
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold">{title}</span>
            {badge ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {badge}
              </span>
            ) : null}
          </span>
          {description ? (
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className="border-t p-4">{children}</div> : null}
    </Card>
  );
}

/** Small "?" icon that explains a figure in plain language. */
export function Hint({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={text}
            className="inline-flex text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[240px] text-xs leading-relaxed">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/** Affordance above wide tables so mobile users know they can scroll sideways. */
export function ScrollHint({ label }: { label?: string }) {
  return (
    <p className="mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground md:hidden">
      <MoveHorizontal className="h-3.5 w-3.5" />
      {label ?? t("Swipe sideways to see all columns")}
    </p>
  );
}

/** Show a long list a few items at a time. */
export function ShowMore({
  children,
  moreLabel,
  lessLabel,
}: {
  children: ReactNode;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      {open ? children : null}
      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setOpen((o) => !o)}>
        {open ? (lessLabel ?? t("Show less")) : (moreLabel ?? t("Show more"))}
      </Button>
    </div>
  );
}
