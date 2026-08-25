import { t } from "@/lib/i18n";
import { useMemo } from "react";
import { useFinance, buildModel } from "@/lib/finance-store";
import { fmtEURk } from "./format";
import { InvestorCalculator } from "./InvestorCalculator";
import { PanelIntro, Section } from "./Explain";
import { BRANDS } from "@/lib/brands";
import { portfolioDefinitionCounts } from "@/lib/brand-investor-summary";

export function FundingPanel() {
  const definitionCounts = portfolioDefinitionCounts(BRANDS);
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const g = state.global;
  const totalFunding = g.upfrontFunding + g.monthlyFunding * g.fundingMonths;
  const cumInvestor = rows.reduce((s, r) => s + r.investorShare, 0);

  return (
    <div className="space-y-4">
      <PanelIntro
        title={t("Investment & funding")}
        description={t("Why we are raising, where the money goes, the deal terms, and a calculator that shows your return live.")}
        tips={[
          t("Funding raised over the period: ") + fmtEURk(totalFunding),
          t("Investor dividends across the forecast: ") + fmtEURk(cumInvestor),
          t("Change any assumption and these numbers re-forecast instantly."),
        ]}
      />

      <Section
        title={t("Why we are raising — and exactly where the money goes")}
        description={`All ${definitionCounts.defined} brand entities now have a defined product plan. The raise funds product completion, native apps, legal launch work, customer acquisition and the shared team until recurring and transaction income covers the cost base.`}
      >
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            {t("Subscription brands use a free trial; transaction and affiliate brands must first produce completed bookings or retailer-confirmed orders. In every case, revenue arrives after launch spending. The raise bridges that gap and funds launch, marketing and running costs until each brand reaches break-even.")}
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                head: "Sales & marketing — buying the first customers",
                body: "The single largest use of funds. Paid search and social, app-store presence, local SEO and content per country, influencer and partner deals, referral incentives and launch campaigns for each brand, plus a small sales team for the B2B verticals. Marketing is the shared engine (base spend plus a per-brand amount) so we can push hard on the brands that respond and pull back on the ones that do not.",
              },
              {
                head: "Legal, compliance & entity set-up",
                body: `Company and subsidiary formation per market (DE, UK, EU, Gulf, US), lawyer-recorded shareholdings for every investor, trademark and domain protection across the ${BRANDS.length} brand entities, GDPR/UK-GDPR work, terms and privacy documents per launched brand, sector rules where they apply, insurance and annual audits.`,
              },
              {
                head: "Hosting & cloud infrastructure",
                body: "Servers and databases per region, protection against attacks, storage for images and documents, encrypted backups, test environments, uptime alerts, email and SMS delivery, plus domain and security-certificate renewals for the portfolio. Sharing infrastructure makes hosting cheaper than running a separate technical stack for every brand.",
              },
              {
                head: "AI running costs",
                body: "Ongoing model usage through our AI gateway: matching and ranking, search and recommendations, document and invoice extraction, translation into each market language, chat and support assistants, moderation and fraud checks, and content generation for listings and SEO. This is a real per-request cost that grows with usage, so it is budgeted as a running cost and monitored per brand — with caching and smaller models used wherever quality allows.",
              },
              {
                head: "Ongoing tech, apps & security",
                body: "Finishing and shipping the native iOS/Android apps, app-store and developer accounts, continuous release work on the shared codebase so an improvement lands in every brand at once, payments and billing fees, third-party APIs and data feeds, engineering tooling and CI, penetration testing, security reviews and bug fixing, and the on-call rota that keeps every brand online.",
              },

              {
                head: "Admin, support & operations",
                body: "Customer support and onboarding in local languages, content and translation, moderation and quality control on marketplaces, finance and bookkeeping, payroll, HR and recruitment as the team scales, investor reporting and the live investor portal, plus office, tooling and software licences.",
              },
              {
                head: "Working capital & runway buffer",
                body: "Cash held back so the plan survives slower months: later launches, a market that takes longer to convert, refunds and churn above plan, or a marketing channel that needs to be replaced. This is what keeps the cash trough above zero without asking for a second round.",
              },
              {
                head: "Why now, and why one raise",
                body: "Much of the launch cost is shared, so a portfolio can be cheaper per brand than funding every business separately. However, each defined brand still has to prove customer demand, legal readiness and profitable sales in its first territory before expansion. Reserved concepts do not receive launch spending until their plans are approved.",
              },
            ].map((b) => (
              <div key={b.head} className="rounded-lg border p-3">
                <div className="text-sm font-semibold">{t(b.head)}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(b.body)}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("Every one of these costs is visible and adjustable in the model: shared HQ, tech and marketing spend (base plus per-brand) sit in the Assumptions tab, and variable operating costs are set as a percentage of revenue. Change any of them and the P&L, cash flow and balance sheet re-forecast instantly.")}
          </p>
        </div>
      </Section>

      <Section
        title={t("Investor terms")}
        description={t("What you get, what you pay and when dividends start.")}
      >
        <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">
          {t("The company round is €3m for 40% of iTechLounge. Up to 10 investors may participate at €300k for 4% each.")}{" "}
          {t("Every investment is paid 20% upfront, with the remaining 80% paid in equal instalments over 12 months.")}
        </p>
        <ul className="space-y-1 text-muted-foreground">
          {[
            "Single-location brand investment: €50k for 25%, or up to 10 investors at €5k for 2.5% each.",
            "Dual-location whole-brand investment: €80k for 25%, or up to 10 investors at €8k for 2.5% each.",
            "A whole-brand investor receives 25% of the brand in every current location and any location added later.",
            "A location-only investor receives 25% of the purchased location and 10% of each new location added later.",
            "Funds are spent on finalising the native apps, legal & compliance, then sales & marketing — the core tech is already built.",
            "All shareholdings are legally recorded by lawyers under the relevant country law. No further investment rounds are planned.",
            "Investors can sell their equity, with first refusal to the company; valuation is set independently by auditors for full transparency.",
            "Every investor gets their own portal with live access to revenue, turnover and KPIs. Accounts are audited and shared annually.",
            "We run tech, operations and management; investors can input on defined matters, with final say resting with the company.",
            "Each brand stands on its own economics, and cross-selling across verticals compounds sales and customer trust.",
          ].map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{t(line)}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground">
          {t("Dividends start in month 13 from launch — of the brand you invest in, or of the first brand if you invest in the whole company. Everything before that stays in the business:")}{" "}
          <b>{t("100% retained M1–M12")}</b>, {t("then")} <b>{t("80% retained / 20% paid M13–M18")}</b>,{" "}
          <b>{t("70% / 30% M19–M24")}</b>, <b>{t("60% / 40% M25–M30")}</b>, <b>{t("50% / 50% M31–M36")}</b>.{" "}
          {t("Paid from net profit after tax and split pro-rata by equity; after M36 dividends are set against the cash balance.")}{" "}
          {t("Brands launch on a 3-week rolling cadence with a")} {g.freeTrialMonths}
          {t("-month free trial.")}
        </p>
        </div>
      </Section>

      <InvestorCalculator />

      <InvestorCalculator />
    </div>
  );
}
