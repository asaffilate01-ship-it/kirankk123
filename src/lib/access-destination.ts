/** Only investor-owned destinations are accepted; never external or protocol-relative URLs. */
export function investorDestination(value: unknown): string {
  if (typeof value !== "string") return "/investment";
  if (value === "/investment" || /^\/brands\/[a-zA-Z0-9_-]+$/.test(value)) return value;
  return "/investment";
}
