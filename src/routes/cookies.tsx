import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { Button } from "@/components/ui/button";
import { openCookieSettings } from "@/lib/cookie-consent";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — iTechLounge Dashboard" },
      { name: "description", content: "Which cookies the iTechLounge dashboard sets, what each one does, how long it lasts and how to change your consent." },
      { property: "og:title", content: "Cookie Policy — iTechLounge Dashboard" },
      { property: "og:description", content: "Full list of cookies used by the iTechLounge dashboard and how to manage your choices." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://itechlounge.co.uk/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/cookies" }],
  }),
  component: CookiesRoute,
});

const ROWS: { name: string; purpose: string; type: string; life: string }[] = [
  {
    name: "itl_gate",
    purpose: "Signed session token that proves the dashboard password was entered correctly.",
    type: "Strictly necessary",
    life: "Session / 30 days",
  },
  {
    name: "itl_consent",
    purpose: "Stores your cookie choices so we do not ask again.",
    type: "Strictly necessary",
    life: "6 months",
  },
  {
    name: "itl.lang",
    purpose: "Remembers whether you use the English or German version.",
    type: "Preferences",
    life: "Until cleared",
  },
  {
    name: "itl_analytics",
    purpose: "Anonymous usage measurement, only set if you accept analytics.",
    type: "Analytics",
    life: "12 months",
  },
];

function CookiesRoute() {
  return (
    <LegalPage title={t("Cookie Policy")}>
      <p>
        {t(
          "Cookies and similar browser storage let this dashboard keep you signed in, remember your language and — with your consent — measure usage. Strictly necessary cookies are set without consent because the dashboard cannot work without them; everything else is off until you opt in.",
        )}
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/60 text-foreground">
            <tr>
              <th className="px-3 py-2 font-semibold">{t("Name")}</th>
              <th className="px-3 py-2 font-semibold">{t("Purpose")}</th>
              <th className="px-3 py-2 font-semibold">{t("Category")}</th>
              <th className="px-3 py-2 font-semibold">{t("Duration")}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name} className="border-t align-top">
                <td className="px-3 py-2 font-mono text-foreground">{r.name}</td>
                <td className="px-3 py-2">{t(r.purpose)}</td>
                <td className="px-3 py-2">{t(r.type)}</td>
                <td className="px-3 py-2">{t(r.life)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="space-y-2">
        <h2>{t("Changing your mind")}</h2>
        <p>
          {t(
            "You can update or withdraw your consent at any time. When you turn a category off we delete the related cookies from your browser straight away. You can also clear cookies in your browser settings.",
          )}
        </p>
        <Button size="sm" variant="outline" onClick={openCookieSettings}>
          {t("Cookie settings")}
        </Button>
      </section>
    </LegalPage>
  );
}
