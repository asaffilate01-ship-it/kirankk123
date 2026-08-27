import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Imprint / Impressum — iTechLounge" },
      { name: "description", content: "Legal provider details for the iTechLounge dashboard: company entities, contact address and responsible contact." },
      { property: "og:title", content: "Imprint / Impressum — iTechLounge" },
      { property: "og:description", content: "Provider identification for the iTechLounge dashboard under § 5 DDG / UK company law." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://itechlounge.co.uk/imprint" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/imprint" }],
  }),
  component: ImprintRoute,
});

function ImprintRoute() {
  return (
    <LegalPage title={t("Imprint / Impressum")}>
      <p>{t("Provider information for this dashboard.")}</p>
      <section className="space-y-2">
        <h2>{t("United Kingdom")}</h2>
        <p>ITECHLOUNGE LTD<br />{t("Registered in England & Wales")}<br />{t("Contact details available on request")}</p>
      </section>
      <section className="space-y-2">
        <h2>{t("Germany")}</h2>
        <p>iTechLounge Digitallösungen GmbH<br />{t("Registered in Germany")}<br />{t("Contact details available on request")}</p>
      </section>
      <p className="text-xs">
        {t(
          "Company numbers, registered addresses, VAT IDs and managing-director details will be shown here once confirmed — send them to us and we will complete this page.",
        )}
      </p>
    </LegalPage>
  );
}
