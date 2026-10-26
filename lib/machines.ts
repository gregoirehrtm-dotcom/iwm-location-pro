export type MachineCategory = "ciseaux" | "articulee" | "telescopique" | "araignee" | "camion";

export type Machine = {
  slug: string;
  name: string;
  category: MachineCategory;
  workingHeight: number; // mètres
  outreach: number; // déport horizontal, mètres
  capacity: number; // kg
  energy: "Électrique" | "Diesel" | "Bi-énergie";
  terrain: "Intérieur" | "Tout-terrain" | "Mixte";
  license: string;
  dailyPrice: number; // € HT / jour
  weeklyPrice: number; // € HT / semaine
  description: string;
  features: string[];
};

export const categoryLabels: Record<MachineCategory, string> = {
  ciseaux: "Nacelles ciseaux",
  articulee: "Nacelles articulées",
  telescopique: "Nacelles télescopiques",
  araignee: "Nacelles araignées",
  camion: "Nacelles sur camion",
};

export const machines: Machine[] = [
  {
    slug: "ciseaux-electrique-8m",
    name: "Nacelle ciseaux électrique 8 m",
    category: "ciseaux",
    workingHeight: 8,
    outreach: 0,
    capacity: 230,
    energy: "Électrique",
    terrain: "Intérieur",
    license: "CACES R486 cat. B",
    dailyPrice: 95,
    weeklyPrice: 390,
    description:
      "Compacte et silencieuse, idéale pour les travaux en intérieur : entrepôts, magasins, plafonds, éclairage.",
    features: ["Pneus non marquants", "Passe par une porte standard", "Extension de plateforme 0,9 m", "Zéro émission"],
  },
  {
    slug: "ciseaux-electrique-12m",
    name: "Nacelle ciseaux électrique 12 m",
    category: "ciseaux",
    workingHeight: 12,
    outreach: 0,
    capacity: 320,
    energy: "Électrique",
    terrain: "Intérieur",
    license: "CACES R486 cat. B",
    dailyPrice: 130,
    weeklyPrice: 520,
    description: "Grande plateforme pour deux opérateurs et leur matériel, parfaite pour les chantiers de second œuvre.",
    features: ["Plateforme 2,3 × 0,8 m", "Pneus non marquants", "Charge 2 personnes", "Autonomie une journée"],
  },
  {
    slug: "ciseaux-diesel-15m",
    name: "Nacelle ciseaux diesel tout-terrain 15 m",
    category: "ciseaux",
    workingHeight: 15,
    outreach: 0,
    capacity: 450,
    energy: "Diesel",
    terrain: "Tout-terrain",
    license: "CACES R486 cat. B",
    dailyPrice: 190,
    weeklyPrice: 760,
    description: "Robuste et stable sur terrain accidenté, conçue pour le gros œuvre et les façades.",
    features: ["4 roues motrices", "Stabilisateurs automatiques", "Grande plateforme 4 personnes", "Pente jusqu'à 40 %"],
  },
  {
    slug: "articulee-electrique-12m",
    name: "Nacelle articulée électrique 12 m",
    category: "articulee",
    workingHeight: 12,
    outreach: 6.5,
    capacity: 200,
    energy: "Électrique",
    terrain: "Mixte",
    license: "CACES R486 cat. B",
    dailyPrice: 160,
    weeklyPrice: 640,
    description: "Contourne les obstacles grâce à son bras articulé et son pendulaire. Idéale en milieu urbain.",
    features: ["Pendulaire articulé", "Rotation 355°", "Faible encombrement", "Utilisable en intérieur"],
  },
  {
    slug: "articulee-diesel-20m",
    name: "Nacelle articulée diesel 20 m",
    category: "articulee",
    workingHeight: 20,
    outreach: 12,
    capacity: 230,
    energy: "Diesel",
    terrain: "Tout-terrain",
    license: "CACES R486 cat. B",
    dailyPrice: 260,
    weeklyPrice: 1040,
    description: "Polyvalente et puissante, pour la charpente, la couverture et l'élagage.",
    features: ["4×4 avec oscillation d'essieu", "Rotation continue", "Prise 220 V en panier", "Déport 12 m"],
  },
  {
    slug: "telescopique-diesel-26m",
    name: "Nacelle télescopique diesel 26 m",
    category: "telescopique",
    workingHeight: 26,
    outreach: 20,
    capacity: 300,
    energy: "Diesel",
    terrain: "Tout-terrain",
    license: "CACES R486 cat. B",
    dailyPrice: 390,
    weeklyPrice: 1560,
    description: "Hauteur et déport maximums pour les grands chantiers industriels et les ouvrages d'art.",
    features: ["Déport 20 m", "Panier rotatif 160°", "Charge 300 kg", "Transport sur porte-engins"],
  },
  {
    slug: "araignee-17m",
    name: "Nacelle araignée 17 m",
    category: "araignee",
    workingHeight: 17,
    outreach: 8,
    capacity: 200,
    energy: "Bi-énergie",
    terrain: "Mixte",
    license: "CACES R486 cat. A",
    dailyPrice: 290,
    weeklyPrice: 1160,
    description:
      "Sur chenilles, légère et étroite : passe par un portail de 80 cm et travaille sur sols fragiles ou en pente.",
    features: ["Largeur 0,79 m", "Chenilles non marquantes", "Mise à niveau automatique", "Moteur électrique + thermique"],
  },
  {
    slug: "camion-nacelle-20m",
    name: "Camion nacelle 20 m (permis B)",
    category: "camion",
    workingHeight: 20,
    outreach: 10,
    capacity: 200,
    energy: "Diesel",
    terrain: "Mixte",
    license: "Permis B + CACES R486 cat. A",
    dailyPrice: 280,
    weeklyPrice: 1120,
    description: "Se conduit avec un permis B. Rapide à installer pour l'éclairage public, les enseignes et l'élagage.",
    features: ["Permis B (3,5 t)", "Mise en station en 2 minutes", "Isolation électrique en option", "Coffres de rangement"],
  },
];

export function getMachine(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug);
}
