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
      ? "h-10 w-[112px]"
      : size === "lg"
        ? "h-16 w-[200px] sm:h-20 sm:w-[240px]"
        : "h-12 w-[150px] sm:h-14 sm:w-[180px]";

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
