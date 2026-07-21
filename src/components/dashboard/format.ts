export const fmtEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

export const fmtEURk = (n: number) => {
  if (!Number.isFinite(n)) return "€0";
  if (Math.abs(n) >= 1_000_000) return `€${(n / 1_000_000).toFixed(2)}m`;
  if (Math.abs(n) >= 1_000) return `€${(n / 1_000).toFixed(0)}k`;
  return `€${n.toFixed(0)}`;
};

export const fmtNum = (n: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0);

export const fmtPct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;