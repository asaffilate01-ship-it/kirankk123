import { create } from "zustand";
import { BRANDS, type Brand } from "./brands";

export type BrandAssumption = {
  id: string;
  enabled: boolean;
  launchMonth: number;
  initialUsers: number;
  userGrowth: number; // monthly
  arpu: number;
  churn: number;
  addlRevenue: number;
  directCost: number;
};

export type CustomLine = {
  id: string;
  name: string;
  amount: number; // EUR / mo
  startMonth: number;
  growth: number; // monthly
};

export type GlobalAssumptions = {
  months: number;
  freeTrialMonths: number;
  taxRate: number;
  variableOpexPct: number; // % of revenue (payment fees, hosting variable, etc.)
  hqBase: number;
  hqPerBrand: number;
  techBase: number;
  techPerBrand: number;
  marketingBase: number;
  marketingPerBrand: number;
  trancheSize: number;
  trancheCount: number;
  investorEquityPct: number;
  investorProfitSharePct: number;
  upfrontFunding: number;
  monthlyFunding: number;
  fundingMonths: number;
  openingCash: number;
};

type State = {
  brands: Record<string, BrandAssumption>;
  customRevenues: CustomLine[];
  customCosts: CustomLine[];
  global: GlobalAssumptions;
  setBrand: (id: string, patch: Partial<BrandAssumption>) => void;
  setGlobal: (patch: Partial<GlobalAssumptions>) => void;
  addCustomRevenue: (l: CustomLine) => void;
  addCustomCost: (l: CustomLine) => void;
  removeCustomRevenue: (id: string) => void;
  removeCustomCost: (id: string) => void;
  updateCustomRevenue: (id: string, patch: Partial<CustomLine>) => void;
  updateCustomCost: (id: string, patch: Partial<CustomLine>) => void;
  reset: () => void;
};

/* ------------------------------------------------------------------ *
 * Baseline assumptions — identical for every brand, adjustable per brand
 * in the UI. 100 sign-ups at launch, 15% monthly growth, 3 cancellations
 * per 100 customers, €39/mo in Germany and £39/mo (≈€45) in the UK,
 * no additional revenue, €2,000 of expenses per brand per month.
 * ------------------------------------------------------------------ */
export const BASELINE = {
  initialUsers: 100,
  userGrowth: 0.15,
  churn: 0.03,
  addlRevenue: 0,
  directCost: 2000,
  arpuEur: 39,
  arpuGbp: 39,
  gbpToEur: 1.15,
};

/** Monthly fee in EUR: €39 in Germany/international, £39 (converted) in the UK. */
export function baselineArpu(b: Brand): number {
  return b.region === "UK"
    ? Math.round(BASELINE.arpuGbp * BASELINE.gbpToEur)
    : BASELINE.arpuEur;
}

const defaultBrands = (): Record<string, BrandAssumption> =>
  Object.fromEntries(
    BRANDS.map((b: Brand) => [
      b.id,
      {
        id: b.id,
        enabled: true,
        launchMonth: b.defaultLaunchMonth,
        initialUsers: BASELINE.initialUsers,
        userGrowth: BASELINE.userGrowth,
        arpu: baselineArpu(b),
        churn: BASELINE.churn,
        addlRevenue: BASELINE.addlRevenue,
        directCost: BASELINE.directCost,
      },
    ]),
  );

const defaultGlobal = (): GlobalAssumptions => ({
  months: 36,
  freeTrialMonths: 2,
  taxRate: 0.3,
  variableOpexPct: 0.15,
  hqBase: 30000,
  hqPerBrand: 0,
  techBase: 8000,
  techPerBrand: 0,
  marketingBase: 5000,
  marketingPerBrand: 0,
  trancheSize: 300000,
  trancheCount: 10,
  investorEquityPct: 0.4,
  investorProfitSharePct: 0.4,
  upfrontFunding: 600000,
  monthlyFunding: 200000,
  fundingMonths: 12,
  openingCash: 0,
});

export const useFinance = create<State>((set) => ({
  brands: defaultBrands(),
  customRevenues: [],
  customCosts: [],
  global: defaultGlobal(),
  setBrand: (id, patch) =>
    set((s) => ({ brands: { ...s.brands, [id]: { ...s.brands[id], ...patch } } })),
  setGlobal: (patch) => set((s) => ({ global: { ...s.global, ...patch } })),
  addCustomRevenue: (l) => set((s) => ({ customRevenues: [...s.customRevenues, l] })),
  addCustomCost: (l) => set((s) => ({ customCosts: [...s.customCosts, l] })),
  removeCustomRevenue: (id) =>
    set((s) => ({ customRevenues: s.customRevenues.filter((x) => x.id !== id) })),
  removeCustomCost: (id) =>
    set((s) => ({ customCosts: s.customCosts.filter((x) => x.id !== id) })),
  updateCustomRevenue: (id, patch) =>
    set((s) => ({
      customRevenues: s.customRevenues.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    })),
  updateCustomCost: (id, patch) =>
    set((s) => ({
      customCosts: s.customCosts.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    })),
  reset: () =>
    set(() => ({
      brands: defaultBrands(),
      customRevenues: [],
      customCosts: [],
      global: defaultGlobal(),
    })),
}));

// ---------- Derived model ----------

export type MonthRow = {
  month: number;
  perBrandRevenue: Record<string, number>;
  perBrandUsers: Record<string, number>;
  brandsLaunched: number;
  brandRevenue: number;
  customRevenue: number;
  revenue: number;
  directCosts: number;
  hqCost: number;
  techCost: number;
  marketingCost: number;
  variableOpex: number;
  customCost: number;
  totalCost: number;
  ebit: number;
  tax: number;
  netProfit: number;
  dividendPct: number;
  dividendPaid: number;
  investorShare: number;
  founderShare: number;
  retainedInBusiness: number;
  fundingIn: number;
  cashFlow: number;
  cashBalance: number;
};

function lineAtMonth(l: CustomLine, m: number) {
  if (m < l.startMonth) return 0;
  return l.amount * Math.pow(1 + l.growth, m - l.startMonth);
}

/**
 * Distribution policy (months counted from launch of the brand, or from the
 * launch of the first brand when investing in the whole company):
 *  M1–M12  → 100% retained in the business (no dividends)
 *  M13–M18 → 80% retained, 20% distributed
 *  M19–M24 → 70% retained, 30% distributed
 *  M25–M30 → 60% retained, 40% distributed
 *  M31–M36 → 50% retained, 50% distributed
 * After M36 distributions are reviewed against the cash balance.
 */
export function payoutPct(monthFromStart: number): number {
  if (monthFromStart <= 12) return 0;
  if (monthFromStart <= 18) return 0.2;
  if (monthFromStart <= 24) return 0.3;
  if (monthFromStart <= 30) return 0.4;
  return 0.5;
}

export function retainedPct(monthFromStart: number): number {
  return 1 - payoutPct(monthFromStart);
}

export function firstLaunchMonth(state: State): number {
  let min = Infinity;
  for (const b of BRANDS) {
    const a = state.brands[b.id];
    if (a?.enabled) min = Math.min(min, a.launchMonth);
  }
  return Number.isFinite(min) ? min : 1;
}


export function buildModel(state: State): MonthRow[] {
  const g = state.global;
  const rows: MonthRow[] = [];
  let cash = g.openingCash;
  let undistributed = 0;
  const start = firstLaunchMonth(state);


  for (let m = 1; m <= g.months; m++) {
    const perBrandRevenue: Record<string, number> = {};
    const perBrandUsers: Record<string, number> = {};
    let brandRevenue = 0;
    let directCosts = 0;
    let brandsLaunched = 0;

    for (const b of BRANDS) {
      const a = state.brands[b.id];
      if (!a || !a.enabled) {
        perBrandRevenue[b.id] = 0;
        perBrandUsers[b.id] = 0;
        continue;
      }
      if (m >= a.launchMonth) brandsLaunched++;
      const paidStart = a.launchMonth + g.freeTrialMonths;
      let users = 0;
      let rev = 0;
      if (m >= paidStart) {
        const t = m - paidStart;
        // net growth = growth - churn on the stock; use compounding formula
        const netRate = a.userGrowth - a.churn;
        users = a.initialUsers * Math.pow(1 + netRate, t);
        rev = users * a.arpu + a.addlRevenue;
      }
      if (m >= a.launchMonth) {
        // direct cost begins at launch even during free trial
        directCosts += a.directCost;
      }
      perBrandUsers[b.id] = Math.max(0, users);
      perBrandRevenue[b.id] = Math.max(0, rev);
      brandRevenue += Math.max(0, rev);
    }

    const customRevenue = state.customRevenues.reduce((s, l) => s + lineAtMonth(l, m), 0);
    const revenue = brandRevenue + customRevenue;

    const hqCost = g.hqBase + g.hqPerBrand * brandsLaunched;
    const techCost = g.techBase + g.techPerBrand * brandsLaunched;
    const marketingCost = g.marketingBase + g.marketingPerBrand * brandsLaunched;
    const variableOpex = revenue * g.variableOpexPct;
    const customCost = state.customCosts.reduce((s, l) => s + lineAtMonth(l, m), 0);

    const totalCost = directCosts + hqCost + techCost + marketingCost + variableOpex + customCost;
    const ebit = revenue - totalCost;
    const tax = ebit > 0 ? ebit * g.taxRate : 0;
    const netProfit = ebit - tax;
    undistributed += netProfit;
    const dividendPct = payoutPct(m - start + 1);
    const dividendPaid = dividendPct > 0 && undistributed > 0 ? undistributed * dividendPct : 0;
    undistributed -= dividendPaid;
    const investorShare = dividendPaid * g.investorEquityPct;
    const founderShare = dividendPaid - investorShare;

    const fundingIn =
      (m === 1 ? g.upfrontFunding : 0) + (m <= g.fundingMonths ? g.monthlyFunding : 0);
    // Cash: netProfit + funding tranche − dividend paid out to shareholders
    const cashFlow = netProfit + fundingIn - dividendPaid;
    cash += cashFlow;

    rows.push({
      month: m,
      perBrandRevenue,
      perBrandUsers,
      brandsLaunched,
      brandRevenue,
      customRevenue,
      revenue,
      directCosts,
      hqCost,
      techCost,
      marketingCost,
      variableOpex,
      customCost,
      totalCost,
      ebit,
      tax,
      netProfit,
      dividendPct,
      dividendPaid,
      investorShare,
      founderShare,
      retainedInBusiness: undistributed,
      fundingIn,
      cashFlow,
      cashBalance: cash,
    });
  }

  return rows;
}

export type YearSummary = {
  year: number;
  revenue: number;
  totalCost: number;
  ebit: number;
  tax: number;
  netProfit: number;
  investorShare: number;
  margin: number;
  endCash: number;
};

export function yearSummaries(rows: MonthRow[]): YearSummary[] {
  const years: YearSummary[] = [];
  const totalYears = Math.ceil(rows.length / 12);
  for (let y = 0; y < totalYears; y++) {
    const slice = rows.slice(y * 12, (y + 1) * 12);
    const revenue = slice.reduce((s, r) => s + r.revenue, 0);
    const totalCost = slice.reduce((s, r) => s + r.totalCost, 0);
    const ebit = slice.reduce((s, r) => s + r.ebit, 0);
    const tax = slice.reduce((s, r) => s + r.tax, 0);
    const netProfit = slice.reduce((s, r) => s + r.netProfit, 0);
    const investorShare = slice.reduce((s, r) => s + r.investorShare, 0);
    years.push({
      year: y + 1,
      revenue,
      totalCost,
      ebit,
      tax,
      netProfit,
      investorShare,
      margin: revenue > 0 ? ebit / revenue : 0,
      endCash: slice.length ? slice[slice.length - 1].cashBalance : 0,
    });
  }
  return years;
}

export type BalanceRow = {
  year: number;
  cash: number;
  fixedAssets: number;
  totalAssets: number;
  paidInCapital: number;
  retainedEarnings: number;
  totalEquity: number;
  liabilities: number;
  totalLiabAndEquity: number;
};

export function balanceSheets(rows: MonthRow[], g: GlobalAssumptions): BalanceRow[] {
  const out: BalanceRow[] = [];
  const totalYears = Math.ceil(rows.length / 12);
  let cumInvestorPaid = 0;
  let retainedInBusiness = 0;
  for (let y = 0; y < totalYears; y++) {
    const slice = rows.slice(0, (y + 1) * 12);
    cumInvestorPaid = slice.reduce((s, r) => s + r.fundingIn, 0);
    retainedInBusiness = slice.length ? slice[slice.length - 1].retainedInBusiness : 0;
    const cash = slice.length ? slice[slice.length - 1].cashBalance : 0;
    const fixedAssets = 25000 + y * 15000; // simple placeholder capitalisation
    out.push({
      year: y + 1,
      cash,
      fixedAssets,
      totalAssets: cash + fixedAssets,
      paidInCapital: cumInvestorPaid,
      retainedEarnings: retainedInBusiness,
      totalEquity: cumInvestorPaid + retainedInBusiness,
      liabilities: fixedAssets, // balancing plug (leases/loans)
      totalLiabAndEquity: cumInvestorPaid + retainedInBusiness + fixedAssets,
    });
  }
  return out;
}