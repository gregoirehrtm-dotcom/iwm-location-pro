import type { FaqItem, Model, UseCase } from "./types";

export const COMPANY = {
  name: "IWM Location",
  legalName: "IWM Industrial Welding Maintenance Sàrl",
  ide: "CHE-316.100.382",
  address: "Chemin des Grandes-Vies 19",
  postalCode: "2900",
  city: "Porrentruy",
  country: "Suisse",
  phone: "076 361 66 14",
  phoneHref: "+41763616614",
  whatsappHref: "https://wa.me/41763616614",
  email: "nacelles@iwm-location.ch",
  hours: "Lundi à vendredi, 7h00–12h00 et 13h30–17h30",
  support: "24 h/24, 7 j/7",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iwm-location.ch",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Chemin+des+Grandes-Vies+19+2900+Porrentruy",
} as const;

export const MODELS: Model[] = [
  {
    slug: "6m",
    name: "IWM 6 m",
    tagline: "Passe les portes standard",
    workingHeight: 5.8,
    platformHeight: 3.8,
    capacityKg: 230,
    widthM: 0.76,
    pricePerDay: 30,
    advantage: "Passe les portes standard",
    bestFor: "Espaces restreints, travaux en intérieur",
    description:
      "La plus compacte du parc. Avec 0,76 m de large, elle franchit les portes standard et se faufile dans les magasins, bureaux et couloirs.",
    useCases: ["Peinture et plafonds", "Aménagement de magasins", "Gaines et ventilation"],
  },
  {
    slug: "8m",
    name: "IWM 8 m",
    tagline: "Polyvalente",
    workingHeight: 8,
    platformHeight: 6,
    capacityKg: null,
    widthM: null,
    pricePerDay: 30,
    advantage: "La polyvalente idéale",
    bestFor: "Polyvalence, le modèle le plus demandé",
    description:
      "Le bon compromis entre hauteur et encombrement. Un choix sûr pour la majorité des chantiers en intérieur comme en extérieur.",
    useCases: ["Électricité et éclairage", "Événementiel et montage", "Gaines et ventilation"],
  },
  {
    slug: "10m",
    name: "IWM 10 m",
    tagline: "Deux opérateurs et leur matériel",
    workingHeight: 10,
    platformHeight: 8,
    capacityKg: null,
    widthM: null,
    pricePerDay: null,
    advantage: "Double capacité",
    bestFor: "Grands chantiers, travail en équipe",
    description:
      "Une plateforme pensée pour deux opérateurs et leur matériel, pour les halles et les grands volumes.",
    useCases: ["Maintenance de halles", "Événementiel et montage", "Électricité et éclairage"],
  },
  {
    slug: "12m",
    name: "IWM 12 m",
    tagline: "La plus haute du parc",
    workingHeight: 12,
    platformHeight: 10,
    capacityKg: null,
    widthM: null,
    pricePerDay: null,
    advantage: "Hauteur maximale",
    bestFor: "Projets en hauteur maximale",
    description:
      "Notre modèle le plus haut, pour les halles industrielles et les entrepôts de grande hauteur.",
    useCases: ["Maintenance de halles", "Entrepôts et stockage"],
  },
];

export const USE_CASES: UseCase[] = [
  { title: "Électricité et éclairage", example: "luminaires à 6,50 m", height: 6.5 },
  { title: "Peinture et plafonds", example: "plafond à 3,50 m", height: 3.5 },
  { title: "Gaines et ventilation", example: "conduits à 5 m", height: 5 },
  { title: "Maintenance de halles", example: "charpente à 10 m", height: 10 },
  { title: "Aménagement de magasins", example: "enseigne à 4 m", height: 4 },
  { title: "Événementiel et montage", example: "décor à 8 m", height: 8 },
];

export const INCLUDED = [
  "Contrôle de la machine avant chaque départ",
  "Assurance dommages, avec une franchise limitée indiquée au contrat",
  "Prise en main sur place à la livraison",
  "Dépannage 24 h/24 : intervention sous 24 h ou nacelle remplacée",
  "Maintenance préventive sur chantier pour les longues locations",
  "Annulation gratuite jusqu’à 24 h avant le départ",
];

export const CONDITIONS = [
  "Location de 1 jour à 12 mois, durée modifiable sans pénalité",
  "Retrait gratuit au dépôt, ou livraison au forfait selon la zone",
  "Pièce d’identité et attestation d’assurance RC, plus l’extrait du registre du commerce pour les entreprises",
  "Contrat signé en ligne, sans déplacement",
];

export const TRUST_BADGES = [
  { icon: "sparkles", title: "Nacelles neuves 2026", text: "100 % électriques, contrôlées avant chaque départ" },
  { icon: "headset", title: "Dépannage 24 h/24", text: "Intervention sous 24 h ou nacelle remplacée" },
  { icon: "shield", title: "Assurance incluse", text: "Franchise limitée, annulation gratuite 24 h avant" },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Nacelle livrée à l’heure, prise en main claire. Le devis correspondait au franc près.",
    author: "Exemple de témoignage",
    role: "Entreprise d’électricité, Jura",
  },
  {
    quote: "Pratique de pouvoir tout signer en ligne et de joindre quelqu’un directement par WhatsApp.",
    author: "Exemple de témoignage",
    role: "Responsable de magasin, Delémont",
  },
  {
    quote: "Machine propre, contrôlée, et un vrai conseil sur le bon modèle pour notre halle.",
    author: "Exemple de témoignage",
    role: "Maintenance industrielle, Bâle",
  },
];

export const DELIVERY_ZONES = [
  { zone: "Ajoie", delay: "Le jour même" },
  { zone: "Jura", delay: "Le jour même ou le lendemain" },
  { zone: "Arc jurassien, Bienne, Bâle, Soleure", delay: "Sous 24 h" },
  { zone: "Reste de la Suisse", delay: "Sous 48 h" },
];

export const STEPS = [
  { title: "Choisissez", text: "Votre nacelle et vos dates, en ligne, par téléphone ou sur WhatsApp." },
  { title: "Recevez votre devis", text: "Sous 24 h, avec le prix exact et sans engagement." },
  { title: "Signez en ligne", text: "Le contrat se signe électroniquement, sans déplacement." },
  { title: "Livraison ou retrait", text: "Prise en main sur place et check-list fournie." },
];

export const FAQ: FaqItem[] = [
  { category: "Matériel", question: "Quelle hauteur pouvez-vous atteindre ?", answer: "Nos nacelles atteignent de 5,80 m à 12 m de hauteur de travail selon le modèle. Avant la location, nous vérifions avec vous l’espace disponible et la charge que votre sol peut supporter." },
  { category: "Matériel", question: "Intérieur ou extérieur ?", answer: "Nos nacelles sont électriques : sans émission et silencieuses, idéales en intérieur. Pour un usage extérieur, indiquez-nous le terrain et l’exposition au vent, et nous vous conseillons le bon modèle." },
  { category: "Matériel", question: "Faut-il une formation pour utiliser une nacelle ?", answer: "Oui. La Suva demande que les utilisateurs soient formés pour la catégorie de nacelle et instruits sur le modèle utilisé. Nous offrons une prise en main à chaque livraison. Pour une formation complète, parlez-nous-en au moment du devis." },
  { category: "Réservation", question: "Quels documents faut-il fournir ?", answer: "Une pièce d’identité et une attestation d’assurance responsabilité civile. Les entreprises ajoutent un extrait du registre du commerce ou leur numéro IDE. Le contrat se signe ensuite en ligne." },
  { category: "Réservation", question: "Puis-je prolonger ma location ?", answer: "Oui. Prévenez-nous avant la date de retour prévue : nous ajustons le contrat, la facture et les livraisons suivantes." },
  { category: "Réservation", question: "Puis-je annuler sans frais ?", answer: "Oui, jusqu’à 24 h avant l’heure de départ prévue. Au-delà, seul le transport déjà engagé est facturé." },
  { category: "Livraison", question: "La livraison est-elle obligatoire ?", answer: "Non. Le retrait au dépôt de Porrentruy, équipé de rampes, est gratuit. La livraison sur chantier est facturée au forfait, y compris en zone urbaine à accès restreint." },
  { category: "Prix et assurance", question: "Comment le prix est-il calculé ?", answer: "Selon le modèle, la durée et la livraison. Le tarif démarre dès CHF 30.– par jour pour les nacelles 6 m et 8 m et devient dégressif dès la deuxième semaine. Le prix exact figure dans votre devis, envoyé sous 24 h." },
  { category: "Prix et assurance", question: "Comment fonctionne l’assurance incluse ?", answer: "Chaque location comprend une couverture des dommages matériels, selon les conditions du contrat. La franchise est limitée et indiquée dans le contrat. Signalez-nous tout incident immédiatement : nous organisons l’expertise, la réparation ou le remplacement." },
  { category: "Dépannage", question: "Que se passe-t-il en cas de panne ?", answer: "Appelez notre ligne de dépannage, joignable 24 h/24 et 7 j/7. Nous intervenons sous 24 h ou remplaçons la nacelle. Chaque machine est contrôlée avant son départ, et les longues locations comprennent une maintenance préventive sur place." },
];

export const FAQ_CATEGORIES = Array.from(new Set(FAQ.map((f) => f.category)));

export function getModel(slug: string): Model | undefined {
  return MODELS.find((m) => m.slug === slug);
}
