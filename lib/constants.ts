export const COMPANY = {
  name: "IWM Location",
  tagline: "Location de nacelles élévatrices en Suisse romande",
  phone: "+41 22 000 00 00",
  email: "info@iwm-location.ch",
  address: "Route de l'Industrie 12, 1217 Meyrin, Genève, Suisse",
  hours: "Lun–Ven 7h30–17h30",
};

export type ModelId = "6m" | "8m" | "10m" | "12m";

export interface Model {
  id: ModelId;
  name: string;
  workingHeight: string;
  platformHeight: string;
  capacity: string;
  weight: string;
  width: string;
  power: string;
  dailyPrice: number | null; // CHF per day, null = on quote
  description: string;
  useCases: string[];
}

export const MODELS: Model[] = [
  { id: "6m", name: "Nacelle 6 m", workingHeight: "8 m", platformHeight: "6 m", capacity: "230 kg", weight: "1 800 kg", width: "0.81 m", power: "Électrique", dailyPrice: 30,
    description: "Compacte et silencieuse, idéale pour l'intérieur, les couloirs et les petits chantiers.",
    useCases: ["Peinture intérieure", "Électricité", "Maintenance de bâtiment"] },
  { id: "8m", name: "Nacelle 8 m", workingHeight: "10 m", platformHeight: "8 m", capacity: "230 kg", weight: "2 300 kg", width: "0.81 m", power: "Électrique", dailyPrice: 30,
    description: "Polyvalente pour l'intérieur comme l'extérieur, passe les portes standard.",
    useCases: ["Entrepôts", "Façades basses", "Éclairage"] },
  { id: "10m", name: "Nacelle 10 m", workingHeight: "12 m", platformHeight: "10 m", capacity: "250 kg", weight: "2 900 kg", width: "1.17 m", power: "Électrique / Hybride", dailyPrice: null,
    description: "Pour les chantiers exigeants nécessitant plus de hauteur et de stabilité.",
    useCases: ["Façades", "Toitures", "Charpentes"] },
  { id: "12m", name: "Nacelle 12 m", workingHeight: "14 m", platformHeight: "12 m", capacity: "250 kg", weight: "3 800 kg", width: "1.20 m", power: "Hybride", dailyPrice: null,
    description: "Notre plus grande nacelle, pour les travaux en grande hauteur.",
    useCases: ["Grands entrepôts", "Bâtiments industriels", "Façades hautes"] },
];

export const DISCOUNTS = [
  { fromDay: 1, rate: 0, label: "Tarif standard" },
  { fromDay: 8, rate: 0.1, label: "-10 % dès le 8e jour" },
  { fromDay: 29, rate: 0.2, label: "-20 % dès le 29e jour" },
];

export const TESTIMONIALS = [
  { name: "Marc Dubois", company: "Dubois Peinture SA, Lausanne", text: "Livraison à l'heure et nacelle impeccable. Le tarif dégressif sur un chantier de 3 semaines a fait la différence." },
  { name: "Sandra Keller", company: "Keller Électricité GmbH, Zurich", text: "Réservation en ligne en 5 minutes. Équipe réactive et très professionnelle." },
  { name: "Thomas Brunner", company: "Brunner Bau AG, Berne", text: "Nous louons régulièrement la 10 m. Matériel récent, toujours bien entretenu." },
  { name: "Isabelle Rochat", company: "Rochat Façades Sàrl, Fribourg", text: "Devis rapide pour la 12 m et conseils précieux sur la sécurité." },
  { name: "Luca Bernasconi", company: "Bernasconi Impianti SA, Lugano", text: "Service fiable, prix transparents, aucune mauvaise surprise." },
];

export type FAQCategory = "Réservation" | "Tarifs" | "Livraison" | "Sécurité" | "Utilisation" | "Paiement";
export const FAQ_CATEGORIES: FAQCategory[] = ["Réservation", "Tarifs", "Livraison", "Sécurité", "Utilisation", "Paiement"];

const f = (category: FAQCategory, q: string, a: string) => ({ category, q, a });
export const FAQS = [
  f("Réservation", "Comment réserver une nacelle ?", "Utilisez le formulaire de réservation en ligne en 4 étapes ou appelez-nous."),
  f("Réservation", "Quel délai de réservation ?", "Idéalement 48 h à l'avance ; nous essayons de répondre aux demandes urgentes."),
  f("Réservation", "Puis-je modifier ou annuler ma réservation ?", "Oui, gratuitement jusqu'à 48 h avant la livraison."),
  f("Réservation", "Quels documents sont nécessaires ?", "Une pièce d'identité, et pour les entreprises un extrait du registre du commerce."),
  f("Tarifs", "Quel est le prix de location ?", "6 m et 8 m : CHF 30 par jour. 10 m et 12 m : sur devis."),
  f("Tarifs", "Y a-t-il des rabais de durée ?", "Oui : -10 % dès le 8e jour et -20 % dès le 29e jour."),
  f("Tarifs", "La TVA est-elle comprise ?", "Les prix sont indiqués hors TVA (8.1 %)."),
  f("Tarifs", "Une caution est-elle demandée ?", "Une caution peut être demandée selon le modèle et la durée."),
  f("Tarifs", "Comment obtenir un devis pour la 10 m ou la 12 m ?", "Via le formulaire de contact ou de réservation ; réponse sous 24 h."),
  f("Livraison", "Livrez-vous partout en Suisse ?", "Oui, la livraison est calculée selon la distance."),
  f("Livraison", "Puis-je récupérer la nacelle moi-même ?", "Oui, à notre dépôt de Meyrin, avec un véhicule adapté."),
  f("Livraison", "Qui décharge la nacelle ?", "Notre chauffeur la décharge et la positionne sur site."),
  f("Livraison", "Quels sont les horaires de livraison ?", "Du lundi au vendredi, de 7h30 à 17h30."),
  f("Sécurité", "Une formation est-elle obligatoire ?", "Une formation à l'utilisation de nacelles est recommandée (cours IPAF/SUVA)."),
  f("Sécurité", "Un harnais est-il fourni ?", "Un harnais peut être ajouté en option ; son port est obligatoire."),
  f("Sécurité", "Les nacelles sont-elles contrôlées ?", "Oui, chaque machine est inspectée avant chaque location."),
  f("Sécurité", "Quelle est la charge maximale ?", "230 à 250 kg selon le modèle (personnes + matériel)."),
  f("Utilisation", "Puis-je utiliser la nacelle en extérieur ?", "Oui, sauf en cas de vent fort ou de pluie intense."),
  f("Utilisation", "Quelle est l'autonomie de la batterie ?", "Une journée de travail normale ; un chargeur est fourni."),
  f("Utilisation", "Passe-t-elle les portes standard ?", "Les 6 m et 8 m (0.81 m de large) passent les portes standard."),
  f("Utilisation", "Que faire en cas de panne ?", "Appelez-nous : assistance ou remplacement dans les meilleurs délais."),
  f("Paiement", "Quels moyens de paiement acceptez-vous ?", "Facture à 30 jours, virement, carte bancaire ou TWINT."),
  f("Paiement", "Facturez-vous les entreprises ?", "Oui, facture avec TVA pour les entreprises."),
  f("Paiement", "Que se passe-t-il en cas de retour tardif ?", "Les jours supplémentaires sont facturés au tarif en vigueur."),
  f("Paiement", "Les dégâts sont-ils couverts ?", "Les dommages dus à une mauvaise utilisation restent à la charge du locataire."),
];

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iwm-location-pro.vercel.app";
