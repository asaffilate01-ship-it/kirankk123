import { BRANDS } from "../src/lib/brands";
import { DE } from "../src/lib/i18n-de";
import { DE_EXTRA } from "../src/lib/i18n-de-extra";
import { DE_UX } from "../src/lib/i18n-de-ux";
import { DE_LEGAL } from "../src/lib/i18n-de-legal";
import { DE_OMNIQORA } from "../src/lib/i18n-de-omniqora";
import { DE_KIEZIO } from "../src/lib/i18n-de-kiezio";
import { DE_MOTORESQ } from "../src/lib/i18n-de-motoresq";
import { DE_MARELYRA } from "../src/lib/i18n-de-marelyra";
import { DE_EASTAMIRA } from "../src/lib/i18n-de-eastamira";
import { DE_INVESTOR } from "../src/lib/i18n-de-investor";
import { DE_PLAN } from "../src/lib/i18n-de-plan";
import { DE_BRAND_COPY } from "../src/lib/i18n-de-brand-copy";
const DICT: Record<string,string> = { ...DE, ...DE_EXTRA, ...DE_OMNIQORA, ...DE_KIEZIO, ...DE_MOTORESQ, ...DE_MARELYRA, ...DE_EASTAMIRA, ...DE_PLAN, ...DE_BRAND_COPY, ...DE_UX, ...DE_LEGAL, ...DE_INVESTOR };
const set = new Set<string>();
const add = (s?: string) => { if (s && typeof s === "string" && /[a-zA-Z]/.test(s) && !DICT[s]) set.add(s); };
for (const b of BRANDS as any[]) {
  add(b.tagline); add(b.description); add(b.reason); add(b.proposition); add(b.market); add(b.audience);
  b.features?.forEach(add); b.pricing?.forEach(add);
  b.apps?.forEach((a:any)=>add(a.purpose));
  b.userTypes?.forEach((u:any)=>{add(u.type);add(u.useCase)});
  if (b.currentMarket){add(b.currentMarket.howServed);add(b.currentMarket.users);add(b.currentMarket.revenue)}
  b.positives?.forEach(add);
  b.risks?.forEach((r:any)=>{add(r.risk);add(r.mitigation)});
  b.competitors?.forEach((c:any)=>{add(c.name);add(c.strength);add(c.counter)});
  b.monetisation?.forEach(add);
  if (b.payerModel){add(b.payerModel.payer);add(b.payerModel.freeSide);add(b.payerModel.pricingBasis);add(b.payerModel.forecastVolumeLabel);add(b.payerModel.revenuePerUnitLabel);add(b.payerModel.attritionLabel);}
}
const arr=[...set];
console.log("to translate:", arr.length);
await Bun.write("/tmp/todo.json", JSON.stringify(arr,null,0));
