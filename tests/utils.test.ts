import { test } from "node:test";
import assert from "node:assert/strict";
import { estimate, sanitize, rateLimit } from "../lib/utils.ts";

test("6m: 5 jours = CHF 150", () => assert.equal(estimate("6m", 5).total, 150));
test("8m: jour 8 à -10%", () => assert.equal(estimate("8m", 8).total, 7 * 30 + 27));
test("6m: 29 jours, -20% dès jour 29", () => assert.equal(estimate("6m", 29).total, 7 * 30 + 21 * 27 + 24));
test("10m: sur devis", () => assert.equal(estimate("10m", 3).onQuote, true));
test("durée invalide", () => assert.throws(() => estimate("6m", 0)));
test("sanitize retire les balises", () => assert.equal(sanitize("<b>hi</b><script>x</script>"), "hix"));
test("rate limit", () => {
  for (let i = 0; i < 5; i++) assert.ok(rateLimit("k", 5, 1000, 0));
  assert.ok(!rateLimit("k", 5, 1000, 0));
});
