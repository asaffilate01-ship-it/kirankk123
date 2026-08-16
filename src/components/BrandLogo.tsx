import { t, useLang } from "@/lib/i18n";
import { logoFor } from "@/lib/logo";

/**
 * iTechLounge word-mark with a black © set at the top-right of the artwork,
 * aligned with the tip of the last bar / above the red circle at the end of the curve.
 * Download, drag and right-click save are blocked as far as the browser allows.
 */
export function BrandLogo({
  className = "h-14",
  dark = false,
  src,
  alt,
}: {
  className?: string;
  dark?: boolean;
  src?: string;
  alt?: string;
}) {
  const { lang } = useLang();
  const source = src ?? logoFor(lang, dark);
  return (
    <span className={`relative inline-block shrink-0 select-none ${className}`}>
      <img
        src={source}
        alt={alt ?? t("iTechLounge")}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="pointer-events-none h-full w-auto select-none object-contain"
        style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
      />
      {/* transparent shield so long-press / right-click never targets the image itself */}
      <span
        aria-hidden
        className="absolute inset-0"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      <span
        aria-hidden
        className={`absolute right-0 top-0 leading-none ${dark ? "text-white" : "text-black"}`}
        style={{ fontSize: "0.42em" }}
      >
        ©
      </span>
    </span>
  );
}
