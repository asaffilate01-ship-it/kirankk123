import { BRANDS } from "../src/lib/brands";
import { brandCompetition, brandMoneyModel, brandNegatives, brandPositives } from "../src/lib/brand-insights";
import { brandPlainEnglish, brandRevenuePlainEnglish } from "../src/lib/brand-investor-summary";
import { plainBusinessPlan } from "../src/lib/brand-business-plan";
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
const done = new Set<string>(JSON.parse(await Bun.file("/tmp/todo.json").text()));
const set = new Set<string>();
const add=(s?:string)=>{if(s&&typeof s==="string"&&/[a-zA-Z]/.test(s)&&!done.has(s)&&!DICT[s])set.add(s)};
for (const b of BRANDS as any[]) {
  brandPositives(b).forEach(add);
  brandNegatives(b).forEach((r:any)=>{add(r.risk);add(r.mitigation)});
  brandCompetition(b).forEach((c:any)=>{add(c.name);add(c.strength);add(c.counter)});
  brandMoneyModel(b).forEach((m:any)=>{add(m.label);add(m.detail)});
  add(brandPlainEnglish(b)); add(brandRevenuePlainEnglish(b));
  const p:any = plainBusinessPlan(b, undefined as any, "en");
  for (const v of Object.values(p)) { if (typeof v==="string") add(v); else if (Array.isArray(v)) v.forEach((x:any)=>typeof x==="string"&&add(x)); }
}
const arr=[...set];
console.log("extra generated (not yet in dict):",arr.length);
const c=Math.ceil(arr.length/6);
for(let i=0;i<6;i++) await Bun.write(`/tmp/tr${16+i}.json`, JSON.stringify(arr.slice(i*c,(i+1)*c)));
console.log("chunk",c);
