import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — iTechLounge Dashboard" },
      { name: "description", content: "Terms of use for the private iTechLounge investor dashboard, including confidentiality and the no-investment-advice notice." },
      { property: "og:title", content: "Terms of Use — iTechLounge Dashboard" },
      { property: "og:description", content: "Conditions for accessing the private iTechLounge investor dashboard and financial model." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://itechlounge.co.uk/terms" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/terms" }],
  }),
  component: TermsRoute,
});

function TermsRoute() {
  return (
    <LegalPage title={t("Terms of Use")}>
      <section className="space-y-2">
        <h2>{t("Access")}</h2>
        <p>
          {t(
            "This dashboard is a private tool provided by iTechLounge to named investors, shareholders and staff. Access credentials are personal and must not be shared. We may withdraw access at any time.",
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2>{t("Confidentiality")}</h2>
        <p>
          {t(
            "All brand, market and financial information in this dashboard is confidential. You may not copy, publish or forward it, in whole or in part, without our written permission.",
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2>{t("Not investment advice")}</h2>
        <p>
          {t(
            "Figures shown are projections generated from editable assumptions. They are illustrative only, are not audited, and are not a forecast, guarantee, offer or recommendation to invest. Actual results will differ. Take independent professional advice before making any investment decision.",
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2>{t("Acceptable use")}</h2>
        <ul>
          <li>{t("Do not attempt to bypass the password gate or probe the site's security.")}</li>
          <li>{t("Do not scrape, reverse engineer or overload the service.")}</li>
          <li>{t("Do not upload unlawful content or use the service unlawfully.")}</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2>{t("Liability and changes")}</h2>
        <p>
          {t(
            "The dashboard is provided on an \"as is\" basis without warranties. To the extent permitted by law, we are not liable for decisions taken on the basis of the projections shown. We may update these terms; continued use means you accept the current version.",
          )}
        </p>
      </section>
    </LegalPage>
  );
}
