import type { Brand } from "@/lib/brands";
import { plainBusinessPlan, type BusinessPlanAssumptions } from "@/lib/brand-business-plan";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { t, useLang } from "@/lib/i18n";

export function BrandBusinessPlan({
  brand,
  assumptions,
}: {
  brand: Brand;
  assumptions?: BusinessPlanAssumptions;
}) {
  const { lang } = useLang();
  const plan = plainBusinessPlan(brand, assumptions, lang);
  const conceptOnly = plan.stage === "Concept only";

  return (
    <section className="space-y-4 rounded-xl border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">{t("Investor quick read")}</div>
          <h2 className="mt-1 text-xl font-semibold">{t("Business plan in plain language")}</h2>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={conceptOnly ? "destructive" : "secondary"}>{t(plan.stage)}</Badge>
          <Badge variant="outline">{t(plan.territory)}</Badge>
          <Badge variant="outline">{t(plan.businessType)}</Badge>
        </div>
      </div>

      <div className={conceptOnly ? "rounded-lg border border-destructive/30 bg-destructive/5 p-4" : "rounded-lg bg-primary/5 p-4"}>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("What it does")}</div>
        <p className="mt-1 text-base font-medium leading-relaxed">{plan.summary}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <PlanCard title={t("Who uses it")} body={plan.customer} />
        <PlanCard title={t("How big the opportunity is (management estimate)")} body={plan.marketOpportunity} />
        <PlanCard title={t("The customer problem")} body={plan.problem} />
        <PlanCard title={t("What we provide")} body={plan.solution} />
        <PlanCard title={t("Who pays and how we earn")} body={plan.revenue} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <PlanCard title={t("How we will find customers")} body={plan.salesPlan} />
        <PlanCard title={t("How the business runs day to day")} body={plan.operations} />
        <PlanCard title={lang === "de" ? `Plan für ${plan.territory}` : `Plan for ${plan.territory}`} body={plan.territoryPlan} />
        <PlanCard title={t("Expansion after the first market works")} body={plan.expansionPlan} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ListCard title={t("First 12-month plan")} items={plan.milestones} />
        <ListCard title={t("Numbers that show whether it is working")} items={plan.successMeasures} />
        <ListCard title={t("Why customers may choose us")} items={plan.reasonsItCanWin} />
        <ListCard title={t("Main risks and our response")} items={plan.mainRisks} />
      </div>
    </section>
  );
}

function PlanCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="p-3.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Card>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-3.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item} className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
              {index + 1}
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
