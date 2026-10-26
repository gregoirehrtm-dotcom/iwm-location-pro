import { differenceInCalendarDays, parseISO, isValid } from "date-fns";
import { getModel } from "./constants";
import type { Estimate, ModelSlug } from "./types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCHF(amount: number) {
  return `CHF ${amount.toLocaleString("fr-CH", { maximumFractionDigits: 0 })}.–`;
}

export function formatMeters(value: number | null) {
  return value === null ? "à confirmer" : `${String(value).replace(".", ",")} m`;
}

/** Rental days, inclusive of start and end date. Returns 0 if invalid. */
export function daysBetween(start: string, end: string) {
  const s = parseISO(start);
  const e = parseISO(end);
  if (!isValid(s) || !isValid(e)) return 0;
  const d = differenceInCalendarDays(e, s) + 1;
  return d > 0 ? d : 0;
}

/**
 * Indicative price: CHF 30/day for the first week, then progressive
 * discount (-10% from day 8, -20% from day 29). The exact price is in the quote.
 */
export function estimate(model: ModelSlug, days: number): Estimate {
  const m = getModel(model);
  const n = Math.max(0, Math.floor(days));
  if (!m || m.pricePerDay === null || n === 0) {
    return { model, days: n, onQuote: !m || m.pricePerDay === null, total: null, averagePerDay: null, discountApplied: false };
  }
  const base = m.pricePerDay;
  const w1 = Math.min(n, 7);
  const w2 = Math.min(Math.max(n - 7, 0), 21);
  const w3 = Math.max(n - 28, 0);
  const total = Math.round(w1 * base + w2 * base * 0.9 + w3 * base * 0.8);
  return { model, days: n, onQuote: false, total, averagePerDay: Math.round((total / n) * 100) / 100, discountApplied: n > 7 };
}
