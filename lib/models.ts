export type Model = {
  slug: string;
  name: string;
  height: string;
  capacity: string;
  description: string;
};

export const models: Model[] = [
  { slug: "6m", name: "Nacelle 6 m", height: "6 m", capacity: "230 kg", description: "Nacelle compacte pour travaux en intérieur." },
  { slug: "8m", name: "Nacelle 8 m", height: "8 m", capacity: "230 kg", description: "Idéale pour entrepôts et petits chantiers." },
  { slug: "10m", name: "Nacelle 10 m", height: "10 m", capacity: "250 kg", description: "Polyvalente pour intérieur et extérieur." },
  { slug: "12m", name: "Nacelle 12 m", height: "12 m", capacity: "250 kg", description: "Grande hauteur pour chantiers exigeants." },
];

export function getModel(slug: string) {
  return models.find((m) => m.slug === slug);
}
