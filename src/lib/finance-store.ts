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

const defaultBrands = (): Record<string, BrandAssumption> =>
  Object.fromEntries(
    BRANDS.map((b: Brand) => [
      b.id,
      {
        id: b.id,
        enabled: true,
        launchMonth: b.defaultLaunchMonth,
        initialUsers: b.defaultInitialUsers,
        userGrowth: b.defaultUserGrowth,
        arpu: b.defaultArpu,
        churn: b.defaultChurn,
        addlRevenue: b.defaultAddlRevenue,
        directCost: b.defaultDirectCost,
      },
    ]),
  );

const defaultGlobal = (): GlobalAssumptions => ({
  months: 36,
  freeTrialMonths: 2,
  taxRate: 0.3,
  variableOpexPct: 0.15,
  hqBase: 30000,
  hqPerBrand: 8000,
  techBase: 8000,
  techPerBrand: 2500,
  marketingBase: 5000,
  marketingPerBrand: 4000,
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

export const DIVIDEND_SCHEDULE: Record<number, number> = {
  6: 0.2,
  12: 0.3,
  18: 0.4,
  24: 0.4,
  30: 0.4,
  36: 0.4,
};

export function buildModel(state: State): MonthRow[] {
  const g = state.global;
  const rows: MonthRow[] = [];
  let cash = g.openingCash;
  let undistributed = 0;

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
    const dividendPct = DIVIDEND_SCHEDULE[m] ?? 0;
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