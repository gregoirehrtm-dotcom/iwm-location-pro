export type Model = {
  slug: string;
  name: string;
  short: string;
  workingHeight: number; // m
  capacity: number | null; // kg, null = à confirmer
  width: number | null; // m
  length: number | null; // m, repliée
  stowedHeight: number | null; // m, repliée
  pricePerDay: number; // CHF
  tag?: string;
  description: string;
  drawing: { length: number; stages: number }; // proportions du dessin à l'échelle
};

export const models: Model[] = [
  {
    slug: "6m",
    name: "IWM 6 m",
    short: "6 m",
    workingHeight: 5.8,
    capacity: 230,
    width: 0.76,
    length: 1.46,
    stowedHeight: 1.61,
    pricePerDay: 30,
    tag: "Très compacte",
    description: "Nacelle compacte pour travaux en intérieur.",
    drawing: { length: 1.46, stages: 3 },
  },
  {
    slug: "8m",
    name: "IWM 8 m",
    short: "8 m",
    workingHeight: 8,
    capacity: null,
    width: null,
    length: 1.85,
    stowedHeight: null,
    pricePerDay: 30,
    description: "Idéale pour entrepôts et petits chantiers.",
    drawing: { length: 1.85, stages: 4 },
  },
  {
    slug: "10m",
    name: "IWM 10 m",
    short: "10 m",
    workingHeight: 10,
    capacity: null,
    width: null,
    length: null,
    stowedHeight: null,
    pricePerDay: 40,
    tag: "Deux opérateurs",
    description: "Polyvalente pour intérieur et extérieur.",
    drawing: { length: 2.3, stages: 5 },
  },
  {
    slug: "12m",
    name: "IWM 12 m",
    short: "12 m",
    workingHeight: 12,
    capacity: null,
    width: null,
    length: null,
    stowedHeight: null,
    pricePerDay: 50,
    tag: "Deux opérateurs",
    description: "Grande hauteur pour chantiers exigeants.",
    drawing: { length: 2.45, stages: 6 },
  },
];

/** La personne travaille debout sur le plancher : hauteur de travail = plancher + 2 m */
export function platformHeight(m: Model): number {
  return Math.round((m.workingHeight - 2) * 100) / 100;
}

export function getModel(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

/** Plus petite nacelle qui atteint la hauteur demandée */
export function recommend(target: number): Model {
  return models.find((m) => m.workingHeight >= target - 1e-9) ?? models[models.length - 1];
}
