// Remise de 10 % dès 8 jours et de 20 % dès 29 jours
export const rateTiers = [
  { from: 1, label: "1 à 7 jours", rate: 0 },
  { from: 8, label: "8 à 28 jours", rate: 0.1 },
  { from: 29, label: "Dès 29 jours", rate: 0.2 },
];

export function discountRate(days: number): number {
  return days >= 29 ? 0.2 : days >= 8 ? 0.1 : 0;
}

export function estimate(pricePerDay: number, days: number) {
  const subtotal = pricePerDay * days;
  const rate = discountRate(days);
  const discount = Math.floor(subtotal * rate);
  return { subtotal, rate, discount, total: subtotal - discount };
}
