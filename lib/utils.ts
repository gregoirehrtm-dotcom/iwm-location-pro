import { DISCOUNTS, MODELS, type Model } from "./constants";

export function getModel(id: string): Model | undefined {
  return MODELS.find((m) => m.id === id);
}

export function discountRateForDay(day: number): number {
  let rate = 0;
  for (const d of DISCOUNTS) if (day >= d.fromDay) rate = d.rate;
  return rate;
}

export interface Estimate {
  days: number;
  dailyPrice: number | null;
  subtotal: number | null;
  discount: number;
  total: number | null;
  onQuote: boolean;
}

const round = (n: number) => Math.round(n * 100) / 100;

/** Progressive pricing: each day is billed at its own tier (-10% from day 8, -20% from day 29). */
export function estimatePrice(modelId: string, days: number): Estimate {
  const model = getModel(modelId);
  if (!model || !Number.isInteger(days) || days < 1 || days > 365) throw new Error("Invalid model or duration");
  if (model.dailyPrice === null) return { days, dailyPrice: null, subtotal: null, discount: 0, total: null, onQuote: true };
  let total = 0;
  for (let d = 1; d <= days; d++) total += model.dailyPrice * (1 - discountRateForDay(d));
  const subtotal = model.dailyPrice * days;
  return { days, dailyPrice: model.dailyPrice, subtotal, discount: round(subtotal - total), total: round(total), onQuote: false };
}

export function formatCHF(n: number): string {
  return `CHF ${n.toLocaleString("fr-CH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[k] = typeof v === "string" ? sanitize(v) : v;
  return out as T;
}

const hits = new Map<string, number[]>();
export function rateLimit(key: string, limit = 5, windowMs = 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return true;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function formatRow(label: string, value: string): string {
  return `<tr><td style="padding:4px 12px 4px 0;color:#555">${escapeHtml(label)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`;
}
