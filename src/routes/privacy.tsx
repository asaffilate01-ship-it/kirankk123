import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — iTechLounge Dashboard" },
      { name: "description", content: "How iTechLounge handles personal data for the investor dashboard: what we collect, why, how long we keep it and your rights." },
      { property: "og:title", content: "Privacy Notice — iTechLounge Dashboard" },
      { property: "og:description", content: "How iTechLounge handles personal data for the investor dashboard, including your data-protection rights." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyRoute,
});

function PrivacyRoute() {
  return (
    <LegalPage title={t("Privacy Notice")}>
      <p>
        {t(
          "This notice explains how iTechLounge handles personal data when you use this dashboard. It is a private, password-protected tool for shareholders, investors and internal staff.",
        )}
      </p>

      <section className="space-y-2">
        <h2>{t("Who is responsible")}</h2>
        <p>
          {t(
            "ITECHLOUNGE LTD (United Kingdom) and iTechLounge Digitallösungen GmbH (Germany) operate this dashboard. For any data-protection question, contact us at privacy@itechlounge.co.uk.",
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2>{t("What we collect")}</h2>
        <ul>
          <li>{t("Access data: the fact that a valid dashboard password was used, plus a signed session cookie.")}</li>
          <li>{t("Technical data: IP address, browser type and timestamps recorded by our hosting provider in server logs.")}</li>
          <li>{t("Your settings: language choice and the financial assumptions you adjust, stored in your browser.")}</li>
          <li>{t("Anything you send us directly, such as an email enquiry.")}</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2>{t("Why we use it")}</h2>
        <ul>
          <li>{t("To keep the dashboard secure and restricted to authorised people.")}</li>
          <li>{t("To operate the site and remember your preferences.")}</li>
          <li>{t("To understand aggregate usage, only where you have given consent.")}</li>
        </ul>
        <p>
          {t(
            "Our legal bases are legitimate interests (security and operation of a private business tool), your consent (optional cookies) and, where relevant, performance of a contract with investors.",
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2>{t("Sharing and retention")}</h2>
        <p>
          {t(
            "We do not sell personal data. Data may be processed by our hosting and infrastructure providers acting on our instructions. Server logs are retained only as long as needed for security and troubleshooting; browser-stored settings remain until you clear them.",
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2>{t("Your rights")}</h2>
        <p>
          {t(
            "Subject to applicable law, you may request access to your data, correction, deletion, restriction, portability, or object to processing, and you may withdraw cookie consent at any time via Cookie settings in the footer. You can also complain to your supervisory authority (in the UK, the ICO; in Germany, your state data-protection authority).",
          )}
        </p>
      </section>
    </LegalPage>
  );
}
