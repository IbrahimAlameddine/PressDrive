export const transmissions = ["AUTO", "MANUAL", "CVT", "DUALCLUTCH"] as const;
export const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] as const;

export function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function getNumber(value: unknown) {
  if (value === "" || value === null || value === undefined) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export function getDate(value: unknown) {
  const text = getText(value);
  if (!text) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const [year, month, day] = text.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return undefined;
    }
    return date;
  }

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function getDateRange(body: unknown) {
  if (!body || typeof body !== "object") return undefined;
  const values = body as Record<string, unknown>;
  const singleDate = getText(values.date);
  const startDate = getDate(values.startDate || singleDate);
  const endDate = getDate(values.endDate || singleDate);
  if (!startDate || !endDate || endDate < startDate) return undefined;
  return { startDate, endDate };
}