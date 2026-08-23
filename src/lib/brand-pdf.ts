import { t } from "@/lib/i18n";
import { jsPDF } from "jspdf";
import type { Brand } from "@/lib/brands";
import { SHARED_ADVANTAGE } from "@/lib/brands";

type Metrics = {
  launchMonth: number;
  users: number;
  mrr: number;
  arpu: number;
  churn: number;
  growth: number;
  horizonMonths: number;
};

export function downloadBrandPdf(brand: Brand, m: Metrics) {
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
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 100, 200);
  doc.textWithLink(brand.domain, margin, y, { url: `https://${brand.domain}` });
  y += 20;

  // Key metrics box
  ensure(70);
  doc.setDrawColor(220);
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, y, maxW, 60, 6, 6, "FD");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const cells = [
    ["Launch", `M${m.launchMonth}`],
    [`Paying customers @ M${m.horizonMonths}`, m.users.toLocaleString()],
    [`Monthly revenue @ M${m.horizonMonths}`, `€${(m.mrr / 1000).toFixed(1)}k`],
    ["Price per customer", `€${m.arpu.toFixed(0)}/mo`],
    ["Monthly growth", `${(m.growth * 100).toFixed(1)}%`],
    ["Monthly cancellations", `${(m.churn * 100).toFixed(1)}%`],
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

  subheading("Competition & how we break their strength");
  brand.competitors.forEach((c) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    ensure(14);
    doc.text(c.name, margin, y);
    y += 14;
    labelValue(t("Strength"), t(c.strength));
    labelValue(t("Counter"), t(c.counter));
    y += 2;
  });

  subheading("Competitive advantage — one team, 100+ brands");
  bullets(SHARED_ADVANTAGE.map(t));

  subheading("Risks & mitigations");
  brand.risks.forEach((r) => {
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
      `iTechLounge · ${brand.name} · ${new Date().toLocaleDateString()}`,
      margin,
      pageH - 24,
    );
    doc.text(`Page ${i} of ${pages}`, pageW - margin, pageH - 24, { align: "right" });
  }

  doc.save(`${brand.id}-loungetech.pdf`);
}