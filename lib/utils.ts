import { DISCOUNT_TIERS, getModel } from "./constants.ts";

export interface Estimate {
  model: string;
  days: number;
  onQuote: boolean;
  total: number | null;
  subtotal: number | null;
  discount: number | null;
  breakdown: { label: string; days: number; unitPrice: number; amount: number }[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function estimate(slug: string, days: number): Estimate {
  const model = getModel(slug);
  if (!model) throw new Error("Modèle inconnu");
  if (!Number.isInteger(days) || days < 1 || days > 365) throw new Error("Durée invalide (1 à 365 jours)");
  if (model.dailyRate === null) {
    return { model: slug, days, onQuote: true, total: null, subtotal: null, discount: null, breakdown: [] };
  }
  const breakdown = DISCOUNT_TIERS.flatMap((t) => {
    const end = t.toDay === null ? days : Math.min(t.toDay, days);
    const count = end - t.fromDay + 1;
    if (count <= 0) return [];
    const unitPrice = round2(model.dailyRate! * (1 - t.discount));
    return [{
      label: t.toDay === null ? `Jours ${t.fromDay}+` : `Jours ${t.fromDay}-${t.toDay}`,
      days: count,
      unitPrice,
      amount: round2(unitPrice * count),
    }];
  });
  const total = round2(breakdown.reduce((s, b) => s + b.amount, 0));
  const subtotal = round2(model.dailyRate * days);
  return { model: slug, days, onQuote: false, total, subtotal, discount: round2(subtotal - total), breakdown };
}

export const chf = (n: number) => `CHF ${n.toFixed(2)}`;

/** Supprime balises HTML et caractères de contrôle, limite la longueur. */
export function sanitize(value: unknown, max = 2000): string {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, max);
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

const hits = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, limit = 5, windowMs = 60_000, now = Date.now()): boolean {
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  h.count++;
  return h.count <= limit;
}
