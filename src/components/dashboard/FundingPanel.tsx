import { t, useLang } from "@/lib/i18n";
import { useMemo, type ReactNode } from "react";
import { useFinance, buildModel } from "@/lib/finance-store";
import { fmtEURk } from "./format";
import { InvestorCalculator } from "./InvestorCalculator";
import { PanelIntro, Section } from "./Explain";
import { BRANDS } from "@/lib/brands";
import { portfolioDefinitionCounts } from "@/lib/brand-investor-summary";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Rocket,
  ShieldCheck,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

type TractionStatus = "live" | "signed" | "ready" | "pipeline" | "registration";

type TractionItem = {
  brand: string;
  status: TractionStatus;
  headline: string;
  detail: string;
  payer: string;
  next: string;
};

const TRACTION: TractionItem[] = [
  {
    brand: "KinderStars UK",
    status: "registration",
    headline:
      "Ofsted registration is under way, with interest from childminders and from parents and guardians looking for childcare.",
    detail:
      "Demand is forming on both sides of the service before launch. KinderStars provides the software and organisation for independent registered childminders and families.",
    payer:
      "Registered childminders pay the software subscription. Parents use the platform free and pay childcare fees directly to the childminder, or eligible government funding pays the childminder.",
    next: "Complete the relevant registration and compliance work, organise childminder onboarding and build the family waiting list.",
  },
  {
    brand: "Haccora UK",
    status: "signed",
    headline: "3 restaurant sites signed for a 60-day trial from 1 September 2026.",
    detail:
      "A further 30 restaurants are in the sales pipeline, before paid advertising has started.",
    payer:
      "Restaurants and other food-service sites pay a subscription per operating site; their staff use it under that account.",
    next: "Finish the production, legal, security and food-safety launch checklist, onboard the 3 signed sites, then convert successful trials.",
  },
  {
    brand: "EventPlanr UK",
    status: "ready",
    headline:
      "1 cake franchise covering 30 shops, plus 4 beauty studios, are ready for onboarding.",
    detail: "This gives EventPlanr an initial supplier base before launch advertising.",
    payer:
      "Venues, suppliers and event agencies pay. Event hosts and guests use the planning and enquiry journey free.",
    next: "Claim and verify profiles, complete onboarding and turn the initial supplier base into live local coverage.",
  },
  {
    brand: "Craftvaro UK",
    status: "ready",
    headline:
      "Gas Safe engineers, builders, handymen and plumbers are ready to join the trial from 1 September 2026.",
    detail: "The first supply group covers several common property-repair categories.",
    payer:
      "Tradespeople and trade businesses pay the subscription. Homeowners request and track work free.",
    next: "Verify each trade and service area, complete onboarding and measure accepted jobs and retained trial accounts.",
  },
  {
    brand: "StyleSync UK",
    status: "ready",
    headline: "6 beauty salons are ready to start from 1 September 2026.",
    detail:
      "The initial group can test diaries, bookings, customer management and payments in real businesses.",
    payer:
      "Salons, barbers and beauty businesses pay by location and team size. Customers book free.",
    next: "Onboard all 6 salons and measure completed bookings, staff usage and trial-to-paid conversion.",
  },
  {
    brand: "Zivvo UK",
    status: "ready",
    headline: "5 car dealers are ready to start from 1 September 2026.",
    detail:
      "This creates a starting stock base and real dealer feedback without a paid acquisition campaign.",
    payer:
      "Car dealers, dealer groups and fleet sellers pay. Private buyers and sellers use the core marketplace free.",
    next: "Load and verify dealer stock, test the full enquiry journey and convert useful dealer trials into subscriptions.",
  },
  {
    brand: "Dishbee",
    status: "live",
    headline: "Dishbee is live and trading with multiple restaurant sites, and more go live during September 2026.",
    detail: "Dishbee already has real operating sites rather than only a forecast or waiting list.",
    payer:
      "Restaurants, cafés and other food businesses pay per location. Diners are not charged a Dishbee platform fee.",
    next: "Keep the live sites performing, bring the next wave online and use real retention and support data to guide growth.",
  },
  {
    brand: "LessonAhead",
    status: "ready",
    headline: "2 driving instructors are ready to start from 1 September 2026.",
    detail:
      "They provide an initial live test of scheduling, learner records, lesson progress and billing.",
    payer:
      "Tutors, driving instructors, tuition centres and schools pay. Parents and learners use their side free.",
    next: "Onboard both instructors and measure lessons managed, learner use and trial-to-paid conversion.",
  },
  {
    brand: "TaxNuvia",
    status: "ready",
    headline: "Accountants and accountancy practices are ready to start.",
    detail:
      "This gives the accountant marketplace an initial professional supply base before coordinated marketing begins.",
    payer:
      "Accountants and accountancy practices pay the subscription. Businesses and individuals request and compare quotes free.",
    next: "Verify the practices, complete their profiles and start routing suitable enquiries through the platform.",
  },
  {
    brand: "Gabley",
    status: "ready",
    headline: "Estate agents are ready to start.",
    detail:
      "The first agencies can provide real property stock, workflow feedback and local market coverage.",
    payer:
      "Estate agents, letting agents and professional landlords pay. Buyers and tenants search and use their portal free.",
    next: "Onboard the first agencies, import their stock and test enquiries, sales, lettings and property-management workflows.",
  },
  {
    brand: "Cirqiva",
    status: "ready",
    headline: "Waste-management and waste-removal businesses are ready to start.",
    detail:
      "The first operators can test collection requests, quotes, job management, routes and compliance records.",
    payer:
      "Waste carriers, recycling facilities and service operators pay. Businesses requesting collections use their side free.",
    next: "Verify licences and service areas, onboard operators and measure collection requests and completed jobs.",
  },
  {
    brand: "UK B2B portfolio",
    status: "ready",
    headline:
      "The launch plan is to begin customer onboarding or active pipeline work across every UK B2B project from September 2026.",
    detail:
      "Interest already reaches childcare, food safety, events, trades, beauty, cars, hospitality, education, accountancy, property and waste before a coordinated advertising campaign.",
    payer:
      "Each project keeps one clearly defined paying side, normally the business receiving the software, customers or operating tools.",
    next: "Fund the central management, marketing, onboarding, administration and support team needed to operate the whole system properly.",
  },
];

const STATUS_LABELS: Record<TractionStatus, string> = {
  live: "Live now",
  signed: "Signed for trial",
  ready: "Ready for trial",
  pipeline: "Sales pipeline",
  registration: "Registration in progress",
};

const STATUS_CLASS: Record<TractionStatus, string> = {
  live: "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  signed: "border-blue-500/35 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  ready: "border-violet-500/35 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  pipeline: "border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  registration: "border-slate-500/35 bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

export function FundingPanel() {
  const { lang } = useLang();
  const definitionCounts = portfolioDefinitionCounts(BRANDS);
  const state = useFinance();
  const rows = useMemo(() => buildModel(state), [state]);
  const g = state.global;
  const totalFunding = g.upfrontFunding + g.monthlyFunding * g.fundingMonths;
  const cumInvestor = rows.reduce((sum, row) => sum + row.investorShare, 0);

  return (
    <div className="space-y-4">
      <PanelIntro
        title={t("Investment in one minute")}
        description={t(
          "The portfolio is not starting from zero. Products have been built, UK businesses are already live, signed, ready or interested, and this demand has been generated before paid advertising. Funding is now needed to fully manage, market, onboard and operate the whole system, complete compliant launches and turn the existing demand into recurring revenue.",
        )}
        tips={[
          t(
            "Real customer evidence comes first below; forecasts and return calculations come later.",
          ),
          t(
            "Live, signed, ready and pipeline are shown separately so they are not confused with revenue.",
          ),
          t(
            "From September 2026, the UK plan is to begin customer onboarding or active pipeline work across every B2B project.",
          ),
        ]}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SnapshotCard
          icon={<Building2 className="h-4 w-4" />}
          label={t("Company structure")}
          value="2"
          detail={t("iTechLounge Ltd and iTechLounge GmbH are ready to be set up.")}
        />
        <SnapshotCard
          icon={<Store className="h-4 w-4" />}
          label={t("Operating now")}
          value={t("Live and trading")}
          detail={t("Dishbee is already live and operating with multiple restaurant sites, and more go live in September 2026.")}
          tone="good"
        />
        <SnapshotCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label={t("Signed launch customers")}
          value={t("Multiple signed")}
          detail={t("Multiple restaurants have signed for Haccora trials starting 1 September 2026, with a further pipeline of interested venues before any paid advertising.")}
          tone="good"
        />

        <SnapshotCard
          icon={<TrendingUp className="h-4 w-4" />}
          label={t("UK B2B launch breadth")}
          value={t("Multiple sectors")}
          detail={t(
            "Food, events, trades, beauty, motor, education, accountancy, property, waste and childcare already have businesses or users ready or interested.",
          )}
        />
      </div>

      <Card className="border-emerald-500/25 bg-emerald-500/[0.06] p-4">
        <div className="flex gap-3">
          <Rocket className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <h2 className="text-sm font-semibold">{t("Why the early demand matters")}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t(
                "These customers were found before a structured advertising campaign. This gives the UK launch a practical starting point: real businesses can test the products, produce usage data and become reference customers. Investor funding is needed to fully manage, market and operate the whole system and accelerate demand that already exists, rather than relying only on a theoretical market forecast.",
              )}
            </p>
          </div>
        </div>
      </Card>

      <Section
        title={t("UK traction and launch evidence")}
        description={t(
          "What is live, signed, ready, in the pipeline or still waiting for registration.",
        )}
        badge={t("Management update: 26 August 2026")}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["live", "signed", "ready", "pipeline", "registration"] as TractionStatus[]).map(
              (status) => (
                <StatusBadge key={status} status={status} />
              ),
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {TRACTION.map((item) => (
              <TractionCard key={item.brand} item={item} />
            ))}
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {t(
              "These figures are management-provided commercial updates. 'Ready for trial' means a business has expressed readiness to onboard. 'Pipeline' means an active sales opportunity. Paid subscription revenue begins after the applicable free trial.",
            )}
          </p>
        </div>
      </Section>

      <Section
        title={t("Germany: the next organised growth market")}
        description={t(
          "Not launched yet; the funding case is to add the local capability needed to launch it properly.",
        )}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <SimpleCard
            icon={<Building2 className="h-4 w-4" />}
            title={t("Set up the German operation")}
            body={t(
              "iTechLounge GmbH is ready to be set up. The German portfolio should launch with German contracts, support, payments, bookkeeping and any sector-specific approvals in place.",
            )}
          />
          <SimpleCard
            icon={<Users className="h-4 w-4" />}
            title={t("Add marketing and administration")}
            body={t(
              "A focused German marketing and administration team can recruit pilot customers, onboard them locally and support them in German instead of stretching the UK team.",
            )}
          />
          <SimpleCard
            icon={<TrendingUp className="h-4 w-4" />}
            title={t("Reuse what the UK proves")}
            body={t(
              "The shared technology and UK launch learning reduce the cost and time needed for Germany. Growth can be faster with the right setup, but German demand and conversion must still be proven with local pilots.",
            )}
          />
        </div>
      </Section>

      <Section
        title={t("What the investment pays for")}
        description={t("Four simple uses of funds, in the order that creates commercial value.")}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SimpleCard
            number="1"
            icon={<ShieldCheck className="h-4 w-4" />}
            title={t("Finish launch and compliance")}
            body={t(
              "Complete production checks, contracts, privacy, security, insurance, payment setup and relevant sector registrations before each public launch.",
            )}
          />
          <SimpleCard
            number="2"
            icon={<Users className="h-4 w-4" />}
            title={t("Onboard waiting customers")}
            body={t(
              "Give the signed and trial-ready businesses hands-on setup, training and support, then measure usage and conversion to paid subscriptions.",
            )}
          />
          <SimpleCard
            number="3"
            icon={<TrendingUp className="h-4 w-4" />}
            title={t("Build repeatable sales")}
            body={t(
              "Use the first results as proof, then add targeted sales, partnerships, local search and paid marketing only where customer acquisition works.",
            )}
          />
          <SimpleCard
            number="4"
            icon={<CircleDollarSign className="h-4 w-4" />}
            title={t("Fund the route to break-even")}
            body={t(
              "Pay for the shared product, support and local operating team while trial customers convert and recurring income grows.",
            )}
          />
        </div>
      </Section>

      <Section
        title={t("Three ways to invest")}
        description={t("Choose the level that matches the part of the portfolio you want to own.")}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <DealSummary
            title={t("Whole company")}
            full="€3m"
            stake="40%"
            minimum={t("€300k for 4%")}
            scope={t("A share of iTechLounge and the performance of the whole portfolio.")}
          />
          <DealSummary
            title={t("One brand in one territory")}
            full="€50k"
            stake="25%"
            minimum={t("€5k for 2.5%")}
            scope={t("A share of one selected brand entity in one country.")}
          />
          <DealSummary
            title={t("One brand across two territories")}
            full="€80k"
            stake="25%"
            minimum={t("€8k for 2.5%")}
            scope={t(
              "A share of both the UK and German entities for an eligible dual-market brand.",
            )}
          />
        </div>
        <div className="mt-3 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
          <b className="text-foreground">{t("Payment")}: </b>
          {t("20% on signing, then the remaining 80% in equal instalments over 12 months.")}
        </div>
      </Section>

      <Section
        title={t("Detailed use of funds")}
        description={
          lang === "de"
            ? `Alle ${definitionCounts.defined} Markengesellschaften haben einen definierten Produktplan. Hier sehen Sie die vollständige Kostenlogik hinter der Finanzierungsrunde.`
            : `All ${definitionCounts.defined} brand entities have a defined product plan. This is the full cost logic behind the raise.`
        }
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            [
              "Sales, onboarding and marketing",
              "Turn the current UK commitments into successful trials and reference customers, then fund direct sales, local search, partnerships and measured paid campaigns.",
            ],
            [
              "Legal, compliance and company setup",
              "Set up the UK and German companies, record investment properly, complete data protection and contracts, and finish the relevant sector, insurance and audit work.",
            ],
            [
              "Product, apps and security",
              "Finish production releases and native apps, maintain payments and third-party connections, test security and keep the shared platform reliable.",
            ],
            [
              "Local operations and working capital",
              "Fund onboarding, support, administration, bookkeeping and a buffer for slower conversion until recurring income covers the operating cost base.",
            ],
          ].map(([head, body]) => (
            <div key={head} className="rounded-lg border p-3">
              <div className="text-sm font-semibold">{t(head)}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(body)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {t(
            "Every cost remains adjustable in the financial model. Changing launch dates, customer conversion, price, churn, staffing or marketing immediately updates the profit, cash and investor-return forecast.",
          )}
        </p>
      </Section>

      <Section
        title={t("Detailed investor terms")}
        description={t("Legal structure, dividends, reporting and investor rights.")}
        defaultOpen={false}
      >
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            {t(
              "The company round is €3m for 40% of iTechLounge. Up to 10 investors may participate at €300k for 4% each.",
            )}{" "}
            {t(
              "Every investment is paid 20% upfront, with the remaining 80% paid in equal instalments over 12 months.",
            )}
          </p>
          <ul className="space-y-1">
            {[
              "Single-location brand investment: €50k for 25%, or up to 10 investors at €5k for 2.5% each.",
              "Dual-location whole-brand investment: €80k for 25%, or up to 10 investors at €8k for 2.5% each.",
              "All shareholdings are legally recorded under the relevant country law and investors receive regular management reporting.",
              "Forecast returns are planning assumptions, not guaranteed income. Final terms remain subject to legal, financial and commercial due diligence.",
            ].map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{t(line)}</span>
              </li>
            ))}
          </ul>
          <p>
            {t(
              "Dividends start in month 13 from launch — of the brand you invest in, or of the first brand if you invest in the whole company. Everything before that stays in the business:",
            )}{" "}
            <b className="text-foreground">{t("100% retained M1–M12")}</b>.{" "}
            {t(
              "Dividends are paid only from available profit after tax and according to the final shareholder agreement.",
            )}{" "}
            {t("The model currently uses a")} {g.freeTrialMonths}
            {t("-month free trial.")}
          </p>
        </div>
      </Section>

      <Section
        title={t("Optional: detailed return calculator")}
        description={t(
          "Explore illustrative investment tickets, dividends and possible payback timings using the assumptions in the financial model.",
        )}
        defaultOpen={false}
        badge={t("Illustrative forecast")}
      >
        <InvestorCalculator />
      </Section>

      <Card className="border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs leading-relaxed text-muted-foreground">
        <b className="text-foreground">{t("Investor note")}: </b>
        {t(
          "Customer and pipeline figures above are management-provided as at 26 August 2026. They should be verified during due diligence. Live sites, signed trials, trial-ready prospects and pipeline opportunities are intentionally shown as different stages. Financial forecasts are illustrative assumptions and are not promises of revenue, profit, dividends or valuation.",
        )}
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SnapshotCard
          icon={<CircleDollarSign className="h-4 w-4" />}
          label={t("Modelled funding over the period")}
          value={fmtEURk(totalFunding)}
          detail={t(
            "This follows the editable assumptions and is separate from customer traction.",
          )}
        />
        <SnapshotCard
          icon={<TrendingUp className="h-4 w-4" />}
          label={t("Modelled investor dividends")}
          value={fmtEURk(cumInvestor)}
          detail={t(
            "Illustrative forecast only; actual dividends require profit, cash and formal approval.",
          )}
        />
      </div>
    </div>
  );
}

function SnapshotCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone?: "good";
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className={tone === "good" ? "text-emerald-600" : "text-primary"}>{icon}</span>
        {label}
      </div>
      <div
        className={`mt-2 text-xl font-semibold ${tone === "good" ? "text-emerald-600 dark:text-emerald-400" : ""}`}
      >
        {value}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </Card>
  );
}

function StatusBadge({ status }: { status: TractionStatus }) {
  return (
    <Badge variant="outline" className={STATUS_CLASS[status]}>
      {t(STATUS_LABELS[status])}
    </Badge>
  );
}

function TractionCard({ item }: { item: TractionItem }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold">{item.brand}</h3>
        <StatusBadge status={item.status} />
      </div>
      <p className="mt-3 text-sm font-medium leading-relaxed">{t(item.headline)}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(item.detail)}</p>
      <div className="mt-3 space-y-2 rounded-lg bg-muted/45 p-3 text-xs">
        <div>
          <span className="font-semibold">{t("Who pays")}: </span>
          <span className="text-muted-foreground">{t(item.payer)}</span>
        </div>
        <div>
          <span className="font-semibold">{t("Next proof point")}: </span>
          <span className="text-muted-foreground">{t(item.next)}</span>
        </div>
      </div>
    </div>
  );
}

function SimpleCard({
  icon,
  title,
  body,
  number,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  number?: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center gap-2">
        {number ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {number}
          </span>
        ) : null}
        <span className="text-primary">{icon}</span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function DealSummary({
  title,
  full,
  stake,
  minimum,
  scope,
}: {
  title: string;
  full: string;
  stake: string;
  minimum: string;
  scope: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {t("Full allocation")}
          </div>
          <div className="text-xl font-semibold">{full}</div>
        </div>
        <div className="text-lg font-semibold text-primary">{stake}</div>
      </div>
      <div className="mt-3 rounded-md bg-muted/50 p-2 text-xs font-medium">
        {t("Minimum")}: {minimum}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{scope}</p>
    </div>
  );
}
