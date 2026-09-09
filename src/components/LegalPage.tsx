import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { SiteFooter } from "@/components/SiteFooter";
import { t } from "@/lib/i18n";
import { ArrowLeft, CalendarDays, ShieldCheck } from "lucide-react";

export function LegalPage({
  title,
  updated = "19 August 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="legal-page flex min-h-screen flex-col bg-background text-foreground">
      <header className="safe-top sticky top-0 z-30 border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-4">
          <BrandLogo className="h-11" />
          <Link to="/" className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t("Back to website")}
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:py-16">
        <div className="max-w-3xl border-b pb-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary">
            <ShieldCheck className="h-4 w-4" /> {t("Legal & privacy")}
          </span>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-4 w-4" />{t("Last updated")}: {updated}</p>
        </div>
        <div className="legal-copy mt-10 max-w-3xl space-y-8 text-[15px] leading-7 text-muted-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-foreground">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
