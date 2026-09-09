import { Link } from "@tanstack/react-router";
import { t } from "@/lib/i18n";
import { openCookieSettings } from "@/lib/cookie-consent";
import { BrandLogo } from "@/components/BrandLogo";
import { Cookie, FileText, Mail, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="safe-bottom border-t bg-foreground text-background">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo className="h-12 brightness-0 invert" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-background/60">{t("Digital ideas. Beautifully built.")}</p>
          <a href="mailto:hello@itechlounge.co.uk" className="mt-5 inline-flex items-center gap-2 text-sm text-background/80 hover:text-primary"><Mail className="h-4 w-4" />hello@itechlounge.co.uk</a>
        </div>
        <nav className="grid content-start gap-3 text-sm text-background/65" aria-label={t("Legal & privacy")}>
          <p className="mb-1 text-xs font-semibold uppercase text-background">{t("Legal & privacy")}</p>
          <Link to="/privacy" className="inline-flex items-center gap-2 hover:text-primary"><ShieldCheck className="h-4 w-4" />{t("Privacy")}</Link>
          <Link to="/terms" className="inline-flex items-center gap-2 hover:text-primary"><FileText className="h-4 w-4" />{t("Terms")}</Link>
          <Link to="/cookies" className="inline-flex items-center gap-2 hover:text-primary"><Cookie className="h-4 w-4" />{t("Cookie policy")}</Link>
          <Link to="/imprint" className="hover:text-primary">{t("Imprint")}</Link>
        </nav>
        <div className="content-start text-sm text-background/65">
          <p className="mb-4 text-xs font-semibold uppercase text-background">{t("Your choices")}</p>
          <button type="button" onClick={openCookieSettings} className="border border-background/20 px-4 py-3 text-background transition-colors hover:border-primary hover:text-primary">
            {t("Cookie settings")}
          </button>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-5xl px-5 py-5 text-xs text-background/45">© {year} {t("iTechLounge")} · {t("iTechLounge Digitallösungen GmbH (DE)")}</div>
      </div>
    </footer>
  );
}
