import { getCurrentLang, t } from "@/lib/i18n";
import { jsPDF } from "jspdf";
import type { Brand } from "@/lib/brands";
import { BRANDS, SHARED_ADVANTAGE } from "@/lib/brands";
import { brandCompetition, brandMoneyModel, brandNegatives, brandPositives } from "@/lib/brand-insights";
import { plainBusinessPlan } from "@/lib/brand-business-plan";
import { brandAttritionLabel, brandRevenuePerUnitLabel, brandVolumeLabel } from "@/lib/brand-investor-summary";


type Metrics = {
  launchMonth: number;
  initialUsers: number;
  users: number;
  mrr: number;
  arpu: number;
  churn: number;
  growth: number;
  directCost: number;
  horizonMonths: number;
};

export function downloadBrandPdf(brand: Brand, m: Metrics) {
  const lang = getCurrentLang();
  const businessPlan = plainBusinessPlan(brand, {
    initialUsers: m.initialUsers,
    arpu: m.arpu,
    userGrowth: m.growth,
    churn: m.churn,
    directCost: m.directCost,
  }, lang);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxW = pageW - margin * 2;
  let y = margin;

  const ensure = (need: number) => {
    if (y + need > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const heading = (t: string, size = 16) => {
    ensure(size + 12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(20, 20, 20);
    doc.text(t, margin, y);
    y += size + 6;
  };

  const subheading = (t: string) => {
    ensure(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(t.toUpperCase(), margin, y);
    y += 14;
    doc.setDrawColor(220);
    doc.line(margin, y - 6, pageW - margin, y - 6);
  };

  const paragraph = (t: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    const lines = doc.splitTextToSize(t, maxW) as string[];
    for (const line of lines) {
      ensure(14);
      doc.text(line, margin, y);
      y += 14;
    }
    y += 4;
  };

  const bullets = (items: string[]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    for (const item of items) {
      const lines = doc.splitTextToSize(item, maxW - 14) as string[];
      lines.forEach((line, i) => {
        ensure(14);
        if (i === 0) doc.text("•", margin, y);
        doc.text(line, margin + 14, y);
        y += 14;
      });
    }
    y += 4;
  };

  const labelValue = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    ensure(14);
    doc.text(`${label}: `, margin, y);
    const labelW = doc.getTextWidth(`${label}: `);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(value, maxW - labelW) as string[];
    lines.forEach((line, i) => {
      if (i > 0) {
        ensure(14);
      }
      doc.text(line, margin + labelW, y);
      y += 14;
    });
  };

  // Header
  doc.setFillColor(brand.color);
  doc.rect(0, 0, pageW, 6, "F");
  y = margin;
  heading(brand.name, 22);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(t(brand.tagline), margin, y);
  y += 16;
  if (brand.domain) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(37, 99, 235);
    doc.text(`https://${brand.domain}`, margin, y);
    y += 14;
  }
  y += 8;

  // Key metrics box
  ensure(70);
  doc.setDrawColor(220);
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, y, maxW, 60, 6, 6, "FD");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const cells = [
    [t("Launch"), `M${m.launchMonth}`],
    [`${t(brandVolumeLabel(brand))} @ M${m.horizonMonths}`, m.users.toLocaleString(lang === "de" ? "de-DE" : "en-GB")],
    [`${t("Monthly revenue")} @ M${m.horizonMonths}`, `€${(m.mrr / 1000).toFixed(1)}k`],
    [t(brandRevenuePerUnitLabel(brand)), brand.revenueUnit === "affiliate-order" ? `€${m.arpu.toFixed(2)}` : `€${m.arpu.toFixed(0)}/${lang === "de" ? "Monat" : "mo"}`],
    [t("Monthly growth"), `${(m.growth * 100).toFixed(1)}%`],
    [t(brandAttritionLabel(brand)), `${(m.churn * 100).toFixed(1)}%`],
  ];
  const cellW = maxW / cells.length;
  cells.forEach(([lbl, val], i) => {
    const cx = margin + i * cellW + cellW / 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110, 110, 110);
    doc.text(lbl, cx, y + 22, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text(val, cx, y + 42, { align: "center" });
  });
  y += 76;

  subheading(t("Business plan in plain language"));
  labelValue(t("Status"), t(businessPlan.stage));
  labelValue(t("Territory"), businessPlan.territory);
  labelValue(t("Business type"), t(businessPlan.businessType));
  labelValue(t("What it does"), businessPlan.summary);
  labelValue(t("Who uses it"), businessPlan.customer);
  labelValue(t("Market opportunity (management estimate)"), businessPlan.marketOpportunity);
  labelValue(t("The customer problem"), businessPlan.problem);
  labelValue(t("What we provide"), businessPlan.solution);
  labelValue(t("Who pays and how we earn"), businessPlan.revenue);
  labelValue(t("How we find customers"), businessPlan.salesPlan);
  labelValue(t("How it runs day to day"), businessPlan.operations);
  labelValue(lang === "de" ? `Plan für ${businessPlan.territory}` : `Plan for ${businessPlan.territory}`, businessPlan.territoryPlan);
  labelValue(t("Expansion plan"), businessPlan.expansionPlan);
  y += 4;

  subheading(t("First 12-month plan"));
  bullets(businessPlan.milestones);

  subheading(t("Numbers that show whether it is working"));
  bullets(businessPlan.successMeasures);

  subheading(t("Why customers may choose us"));
  bullets(businessPlan.reasonsItCanWin);

  subheading(t("Main risks and our response"));
  bullets(businessPlan.mainRisks);

  subheading("Detailed product description");
  paragraph(t(brand.description));

  subheading("Why this product exists");
  paragraph(t(brand.reason));

  subheading("Proposition");
  paragraph(t(brand.proposition));

  subheading("Features");
  bullets(brand.features.map(t));

  subheading("SaaS platform & apps");
  brand.apps.forEach((app) => {
    labelValue(`${app.name} (${app.kind})`, t(app.purpose));
  });
  y += 4;

  subheading("User types");
  brand.userTypes.forEach((u) => labelValue(t(u.type), t(u.useCase)));
  y += 4;

  subheading("Market & audience");
  labelValue(t("Market"), t(brand.market));
  labelValue(t("Audience"), t(brand.audience));
  y += 4;

  subheading("How this market is served in Germany today");
  paragraph(t(brand.currentMarket.howServed));
  labelValue(t("Users today"), t(brand.currentMarket.users));
  labelValue(t("Revenue today"), t(brand.currentMarket.revenue));
  y += 4;

  subheading("Positives — why this wins");
  bullets(brandPositives(brand).map(t));

  subheading("How we make money");
  brandMoneyModel(brand).forEach((line) => {
    labelValue(t(line.label), t(line.detail));
    y += 2;
  });

  subheading("Competition & how we break their strength");
  brandCompetition(brand).forEach((c) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    ensure(14);
    doc.text(t(c.name), margin, y);
    y += 14;
    labelValue(t("Strength"), t(c.strength));
    labelValue(t("Counter"), t(c.counter));
    y += 2;
  });

  subheading(`Competitive advantage — one team, ${BRANDS.length} brands`);
  bullets(SHARED_ADVANTAGE.map(t));

  subheading("Negatives, risks & mitigations");
  brandNegatives(brand).forEach((r) => {
    labelValue(t("Risk"), t(r.risk));
    labelValue(t("Mitigation"), t(r.mitigation));
    y += 2;
  });


  // Footer with page numbers
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `iTechLounge · ${brand.name} · ${new Date().toLocaleDateString(lang === "de" ? "de-DE" : "en-GB")}`,
      margin,
      pageH - 24,
    );
    doc.text(lang === "de" ? `Seite ${i} von ${pages}` : `Page ${i} of ${pages}`, pageW - margin, pageH - 24, { align: "right" });
  }

  doc.save(`${brand.id}-loungetech.pdf`);
}
