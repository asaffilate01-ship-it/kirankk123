/**
 * Uniform logo frame — every brand logo is rendered inside the same box so cards
 * and headers line up regardless of the source artwork's aspect ratio.
 */
export function BrandLogoBox({
  src,
  name,
  color,
  size = "md",
  align = "left",
}: {
  src?: string;
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
}) {
  const box =
    size === "sm"
      ? "h-20 w-[196px]"
      : size === "lg"
        ? "h-32 w-[344px] sm:h-40 sm:w-[412px]"
        : "h-24 w-[264px] sm:h-28 sm:w-[316px]";

  if (!src) {
    return (
      <span
        className="h-4 w-4 shrink-0 rounded-full"
        style={{ background: color ?? "currentColor" }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center overflow-hidden ${box} ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        className={`max-h-full max-w-full object-contain ${
          align === "center" ? "object-center" : "object-left"
        }`}
      />
    </div>
  );
}
