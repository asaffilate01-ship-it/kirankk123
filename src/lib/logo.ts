import logoEn from "@/assets/itechlounge-logo-en.png";
import logoDe from "@/assets/itechlounge-logo-de.png";
import logoEnDark from "@/assets/itechlounge-logo-en-dark.png";
import logoDeDark from "@/assets/itechlounge-logo-de-dark.png";
import type { Lang } from "./i18n";

/** English slogan mark first for EN, German slogan mark for DE. */
export function logoFor(lang: Lang, dark = false): string {
  if (dark) return lang === "de" ? logoDeDark : logoEnDark;
  return lang === "de" ? logoDe : logoEn;
}

export { logoEn, logoDe, logoEnDark, logoDeDark };