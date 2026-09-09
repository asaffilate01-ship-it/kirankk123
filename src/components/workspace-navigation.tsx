import logoDe from "@/assets/itechlounge-logo-de.png";
import logoEn from "@/assets/itechlounge-logo-en.png";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLang } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Grid2X2,
  LockKeyhole,
  LogOut,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export type WorkspaceArea = "portfolio" | "investor" | "marketing";
export const workspaceAreas = [
  { id: "portfolio", to: "/portfolio", en: "Portfolio", de: "Portfolio", icon: Grid2X2 },
  { id: "investor", to: "/investment", en: "Investor", de: "Investoren", icon: TrendingUp },
  { id: "marketing", to: "/marketing", en: "Marketing", de: "Marketing", icon: Megaphone },
] as const;

export function AccessMenu() {
  const { lang } = useLang();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="access-menu-trigger">
          <LockKeyhole size={15} />
          {lang === "de" ? "Privater Zugang" : "Private access"}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel>
          {lang === "de" ? "Bereich wählen" : "Choose your area"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaceAreas.map(({ id, to, en, de, icon: Icon }) => (
          <DropdownMenuItem asChild key={id}>
            <Link to={to} reloadDocument className="flex min-h-11 items-center gap-3">
              <Icon size={16} />
              {lang === "de" ? de : en}
              <ArrowUpRight className="ml-auto" size={14} />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function WorkspaceHeader({
  area,
  title,
  subtitle,
  onLock,
  children,
}: {
  area: WorkspaceArea;
  title: string;
  subtitle?: string;
  onLock?: () => Promise<void>;
  children?: ReactNode;
}) {
  const { lang } = useLang();
  const [locking, setLocking] = useState(false);
  const [lockError, setLockError] = useState(false);
  async function lock() {
    if (!onLock || locking) return;
    setLocking(true);
    setLockError(false);
    try {
      await onLock();
    } catch {
      setLockError(true);
    } finally {
      setLocking(false);
    }
  }
  return (
    <header className="workspace-header safe-top">
      <a href="#workspace-main" className="workspace-skip">
        {lang === "de" ? "Zum Inhalt" : "Skip to content"}
      </a>
      <div className="workspace-top">
        <Link
          to="/"
          className="workspace-logo"
          aria-label={lang === "de" ? "iTechLounge Startseite" : "iTechLounge home"}
        >
          <img src={lang === "de" ? logoDe : logoEn} alt="iTechLounge" />
        </Link>
        <div className="workspace-actions">
          <Link to="/" className="workspace-home">
            <ArrowLeft size={15} />
            <span>{lang === "de" ? "Startseite" : "Home"}</span>
          </Link>
          <LanguageToggle />
          {onLock && (
            <Button variant="outline" onClick={lock} disabled={locking} className="workspace-lock">
              <LogOut size={15} />
              {locking
                ? lang === "de"
                  ? "Wird gesperrt…"
                  : "Locking…"
                : lang === "de"
                  ? "Sperren"
                  : "Lock area"}
            </Button>
          )}
        </div>
      </div>
      <div className="workspace-bottom">
        <div className="workspace-heading">
          <span>
            <LockKeyhole size={12} />
            {lang === "de" ? "Privater Bereich" : "Private workspace"}
          </span>
          <p>{title}</p>
          {subtitle && <small>{subtitle}</small>}
        </div>
        <nav
          aria-label={lang === "de" ? "Private Bereiche" : "Private areas"}
          className="workspace-tabs"
        >
          {workspaceAreas.map(({ id, to, en, de, icon: Icon }) => (
            <Link key={id} to={to} aria-current={id === area ? "page" : undefined}>
              <Icon size={16} />
              {lang === "de" ? de : en}
            </Link>
          ))}
        </nav>
      </div>
      {children && <div className="workspace-tools">{children}</div>}
      {lockError && (
        <p role="alert" className="workspace-lock-error">
          {lang === "de"
            ? "Sperren fehlgeschlagen. Bitte erneut versuchen."
            : "Could not lock this area. Please try again."}
        </p>
      )}
    </header>
  );
}
