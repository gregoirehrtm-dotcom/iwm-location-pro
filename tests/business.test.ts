import test from "node:test";
import assert from "node:assert/strict";
import { estimatePrice, sanitize, rateLimit, discountRateForDay } from "../lib/utils";
import { FAQS, FAQ_CATEGORIES, TESTIMONIALS } from "../lib/constants";
import { bookingSchema } from "../lib/validations";

test("price without discount", () => assert.equal(estimatePrice("6m", 7).total, 210));
test("price with 10% from day 8", () => assert.equal(estimatePrice("8m", 8).total, 237));
test("price with 20% from day 29", () => assert.equal(estimatePrice("6m", 29).total, 7 * 30 + 21 * 27 + 24));
test("quote models", () => assert.equal(estimatePrice("12m", 3).onQuote, true));
test("invalid input throws", () => { assert.throws(() => estimatePrice("99m", 3)); assert.throws(() => estimatePrice("6m", 0)); });
test("discount tiers", () => { assert.equal(discountRateForDay(7), 0); assert.equal(discountRateForDay(8), 0.1); assert.equal(discountRateForDay(29), 0.2); });
test("sanitize strips tags", () => assert.equal(sanitize("<script>alert(1)</script>Hi"), "alert(1)Hi"));
test("rate limit", () => { const k = "t" + Math.random(); for (let i = 0; i < 3; i++) assert.ok(rateLimit(k, 3)); assert.equal(rateLimit(k, 3), false); });
test("content counts", () => { assert.equal(FAQS.length, 25); assert.equal(FAQ_CATEGORIES.length, 6); assert.equal(TESTIMONIALS.length, 5); });
test("booking validation", () => {
  const base = { model: "6m", startDate: "2026-11-01", endDate: "2026-11-05", deliveryMode: "pickup", name: "A", email: "a@b.ch", phone: "+41 22 000 00 00", signature: "A", acceptTerms: true };
  assert.ok(bookingSchema.safeParse(base).success);
  assert.ok(!bookingSchema.safeParse({ ...base, endDate: "2026-10-01" }).success);
  assert.ok(!bookingSchema.safeParse({ ...base, deliveryMode: "delivery" }).success);
});
