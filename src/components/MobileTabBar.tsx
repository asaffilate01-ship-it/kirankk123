import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type MobileTabItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  /** Internal route link */
  to?: string;
  /** Optional search params for the link */
  search?: Record<string, unknown>;
  onClick?: () => void;
};

/**
 * Fixed, safe-area aware bottom tab bar shown on small screens only —
 * gives every page the same native app navigation feel.
 */
export function MobileTabBar({ items }: { items: MobileTabItem[] }) {
  return (
    <nav
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur md:hidden"
      aria-label="Primary"
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const cls = `flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium ${
            item.active ? "text-primary" : "text-muted-foreground"
          }`;
          const inner = (
            <>
              <item.icon className={`h-5 w-5 transition-transform ${item.active ? "scale-110" : ""}`} />
              <span className="truncate">{item.label}</span>
            </>
          );
          if (item.to) {
            return (
              <Link
                key={item.label}
                to={item.to}
                search={item.search as never}
                className={cls}
                aria-current={item.active ? "page" : undefined}
              >
                {inner}
              </Link>
            );
          }
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              aria-current={item.active ? "page" : undefined}
              className={cls}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
