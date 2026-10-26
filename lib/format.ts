// Espace insécable entre un nombre et son unité
export const NB = "\u00a0";

/** 5.8 → "5,80 m", 8 → "8 m" */
export function meters(x: number): string {
  const whole = Math.abs(x - Math.round(x)) < 1e-9;
  return (whole ? String(Math.round(x)) : x.toFixed(2).replace(".", ",")) + NB + "m";
}

/** 7.5 → "7,5 m" */
export function meters1(x: number): string {
  return x.toFixed(1).replace(".", ",") + NB + "m";
}

/** 1500 → "CHF 1’500", formaté à la main pour un rendu identique côté serveur et navigateur */
export function chf(n: number): string {
  return "CHF" + NB + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "’");
}

export function plural(n: number, word: string): string {
  return `${n}${NB}${word}${n > 1 ? "s" : ""}`;
}
