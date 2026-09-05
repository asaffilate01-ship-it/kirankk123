import { Link } from "@tanstack/react-router";
import { t } from "@/lib/i18n";
import { openCookieSettings } from "@/lib/cookie-consent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="safe-bottom border-t bg-card/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {t("iTechLounge")} — {t("iTechLounge · iTechLounge Digitallösungen GmbH (DE)")} ·{" "}
          <a href="mailto:hello@itechlounge.co.uk" className="hover:text-foreground">hello@itechlounge.co.uk</a>
        </p>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to="/privacy" className="hover:text-foreground">{t("Privacy")}</Link>
          <Link to="/terms" className="hover:text-foreground">{t("Terms")}</Link>
          <Link to="/cookies" className="hover:text-foreground">{t("Cookie policy")}</Link>
          <Link to="/imprint" className="hover:text-foreground">{t("Imprint")}</Link>
          <button type="button" onClick={openCookieSettings} className="underline hover:text-foreground">
            {t("Cookie settings")}
          </button>
        </nav>
      </div>
    </footer>
  );
}
