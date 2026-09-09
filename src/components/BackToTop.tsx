import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getLocale, LANGUAGE_CHANGE_EVENT } from "@/lib/corporate-i18n";

const RADIUS = 20;
const STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_THRESHOLD = 240;

export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [de, setDe] = useState(false);

  useEffect(() => {
    const syncLang = () => setDe(getLocale() === "de");
    syncLang();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLang);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLang);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, pct)));
      setVisible(scrollTop > SHOW_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={de ? "Zurück nach oben" : "Back to top"}
      title={de ? "Zurück nach oben" : "Back to top"}
      className={`backToTop ${visible ? "backToTopVisible" : ""}`}
    >
      <svg className="backToTopRing" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          className="backToTopTrack"
          strokeWidth={STROKE}
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          className="backToTopProgress"
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <span className="backToTopIcon">
        <ArrowUp size={18} />
      </span>
    </button>
  );
}
