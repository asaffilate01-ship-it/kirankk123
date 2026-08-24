import { BRANDS } from "./lib/brands";
import { BRAND_LOGOS } from "./lib/brand-logos";
const miss = BRANDS.filter(b => !BRAND_LOGOS[b.id]);
console.log(miss.length, "missing of", BRANDS.length);
console.log(miss.map(b => `${b.id}|${b.name}|${b.domain ?? ""}`).join("\n"));
