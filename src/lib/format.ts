export const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatPercent(value: number, digits = 2) {
  return `${(value * 100).toLocaleString("id-ID", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}%`;
}

export function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;
  
  let normalized = value.trim();
  
  const hasDot = normalized.includes(".");
  const hasComma = normalized.includes(",");
  
  if (hasDot && !hasComma) {
    const parts = normalized.split(".");
    const lastPart = parts[parts.length - 1];
    const isThousandSeparator = lastPart.length === 3 && !normalized.startsWith("0.");
    
    if (!isThousandSeparator) {
      const parsed = parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : 0;
    }
  }
  
  normalized = normalized.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}
