import { BRANDS } from "../src/lib/brands";
import { brandCompetition, brandMoneyModel, brandNegatives, brandPositives } from "../src/lib/brand-insights";
import { brandPlainEnglish, brandRevenuePlainEnglish } from "../src/lib/brand-investor-summary";
import { plainBusinessPlan } from "../src/lib/brand-business-plan";
const done = new Set<string>(JSON.parse(await Bun.file("/tmp/todo.json").text()));
const set = new Set<string>();
const add=(s?:string)=>{if(s&&/[a-zA-Z]/.test(s)&&!done.has(s))set.add(s)};
for (const b of BRANDS as any[]) {
  brandPositives(b).forEach(add);
  brandNegatives(b).forEach(r=>{add(r.risk);add(r.mitigation)});
  brandCompetition(b).forEach(c=>{add(c.name);add(c.strength);add(c.counter)});
  brandMoneyModel(b).forEach(m=>{add(m.label);add(m.detail)});
  add(brandPlainEnglish(b)); add(brandRevenuePlainEnglish(b));
  const p:any = plainBusinessPlan(b, undefined as any, "en");
  for (const v of Object.values(p)) { if (typeof v==="string") add(v); else if (Array.isArray(v)) v.forEach((x:any)=>typeof x==="string"&&add(x)); }
}
const arr=[...set];
console.log("extra generated:",arr.length);
const c=Math.ceil(arr.length/6);
for(let i=0;i<6;i++) await Bun.write(`/tmp/tr${16+i}.json`, JSON.stringify(arr.slice(i*c,(i+1)*c)));
console.log("chunk",c);
