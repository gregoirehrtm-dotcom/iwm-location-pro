export type Zone = {
  id: "z1" | "z2" | "z3" | "z4";
  name: string;
  short: string;
  delay: string;
  test: (npa: number) => boolean;
};

// Zones autour du dépôt de Porrentruy, de la plus proche à la plus éloignée
export const zones: Zone[] = [
  { id: "z1", name: "Ajoie", short: "Le jour même", delay: "Livraison possible le jour même", test: (n) => n >= 2900 && n <= 2954 },
  {
    id: "z2",
    name: "Jura",
    short: "Le jour même ou le lendemain",
    delay: "Livraison le jour même ou le lendemain",
    test: (n) => (n >= 2800 && n <= 2889) || (n >= 2336 && n <= 2364),
  },
  {
    id: "z3",
    name: "Arc jurassien, Bienne, Bâle, Soleure",
    short: "Sous 24\u00a0h",
    delay: "Livraison sous 24\u00a0h",
    test: (n) => (n >= 2000 && n <= 2799) || (n >= 4000 && n <= 4799),
  },
  { id: "z4", name: "Reste de la Suisse", short: "Sous 48\u00a0h", delay: "Livraison sous 48\u00a0h", test: (n) => n >= 1000 && n <= 9999 },
];

const places: Record<number, string> = {
  2900: "Porrentruy", 2902: "Fontenais", 2905: "Courtedoux", 2906: "Chevenez", 2915: "Bure", 2916: "Fahy",
  2926: "Boncourt", 2932: "Coeuve", 2942: "Alle", 2943: "Vendlincourt", 2944: "Bonfol", 2946: "Miécourt",
  2947: "Charmoille", 2950: "Courgenay", 2952: "Cornol",
  2800: "Delémont", 2802: "Develier", 2822: "Courroux", 2830: "Courrendlin", 2843: "Châtillon",
  2852: "Courtételle", 2853: "Courfaivre", 2854: "Bassecourt", 2856: "Boécourt", 2882: "Saint-Ursanne",
  2340: "Le Noirmont", 2345: "Les Breuleux", 2350: "Saignelégier", 2360: "Le Bémont", 2362: "Montfaucon",
  2740: "Moutier", 2710: "Tavannes", 2720: "Tramelan", 2732: "Reconvilier", 2735: "Malleray", 2610: "Saint-Imier",
  2500: "Bienne", 2502: "Bienne", 2503: "Bienne", 2504: "Bienne", 2505: "Bienne", 2540: "Granges",
  2000: "Neuchâtel", 2300: "La Chaux-de-Fonds", 2400: "Le Locle",
  4000: "Bâle", 4001: "Bâle", 4051: "Bâle", 4052: "Bâle", 4053: "Bâle", 4054: "Bâle", 4055: "Bâle",
  4056: "Bâle", 4057: "Bâle", 4058: "Bâle", 4123: "Allschwil", 4132: "Muttenz", 4153: "Reinach",
  4226: "Breitenbach", 4242: "Laufon", 4410: "Liestal", 4500: "Soleure", 4600: "Olten",
  1000: "Lausanne", 1200: "Genève", 1700: "Fribourg", 1950: "Sion", 3000: "Berne", 3250: "Lyss",
  6000: "Lucerne", 6900: "Lugano", 8000: "Zurich", 8400: "Winterthour", 9000: "Saint-Gall",
};

export type NpaInfo = { ok: true; npa: number; place: string | null; zone: Zone } | { ok: false };

export function npaInfo(value: string | undefined): NpaInfo {
  const s = String(value ?? "").trim();
  if (!/^\d{4}$/.test(s)) return { ok: false };
  const n = parseInt(s, 10);
  const zone = n >= 1000 ? zones.find((z) => z.test(n)) : undefined;
  return zone ? { ok: true, npa: n, place: places[n] ?? null, zone } : { ok: false };
}

export function placeLabel(info: { npa: number; place: string | null }): string {
  return info.place ? `${info.place} (${info.npa})` : `NPA ${info.npa}`;
}
