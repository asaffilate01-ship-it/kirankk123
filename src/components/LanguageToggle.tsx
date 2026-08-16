import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex overflow-hidden rounded-md border ${className ?? ""}`}>
      <Button
        type="button"
        size="sm"
        variant={lang === "en" ? "default" : "ghost"}
        className="h-7 rounded-none px-2 text-xs"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </Button>
      <Button
        type="button"
        size="sm"
        variant={lang === "de" ? "default" : "ghost"}
        className="h-7 rounded-none px-2 text-xs"
        aria-pressed={lang === "de"}
        onClick={() => setLang("de")}
      >
        DE
      </Button>
    </div>
  );
}