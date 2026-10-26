export const SITE = {
  name: "IWM Location",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iwm-location.ch",
  phone: "076 361 66 14",
  email: "nacelles@iwm-location.ch",
  address: "Chemin des Grandes-Vies 19, 2900 Porrentruy",
  whatsapp: "https://wa.me/41763616614",
};

export interface Model {
  slug: string;
  name: string;
  height: number;
  capacity: string;
  width: string;
  weight: string;
  dailyRate: number | null; // null = sur devis
  description: string;
  images: string[];
}

const gallery = (slug: string) =>
  Array.from({ length: 6 }, (_, i) => `/images/products/${slug}-${i + 1}.svg`);

// NB: capacités/largeurs à valider avec les fiches constructeur avant lancement.
export const MODELS: Model[] = [
  { slug: "6m", name: "Nacelle IWM 6m", height: 6, capacity: "230 kg (1 personne + outils)", width: "0,76 m", weight: "1 400 kg", dailyRate: 30, description: "Compacte et électrique, idéale pour l'intérieur et les passages étroits.", images: gallery("6m") },
  { slug: "8m", name: "Nacelle IWM 8m", height: 8, capacity: "230 kg (1 personne + outils)", width: "0,81 m", weight: "1 900 kg", dailyRate: 30, description: "Polyvalente pour façades, éclairage et entretien en hauteur.", images: gallery("8m") },
  { slug: "10m", name: "Nacelle IWM 10m", height: 10, capacity: "300 kg (2 personnes)", width: "1,20 m", weight: "2 800 kg", dailyRate: null, description: "Grande hauteur de travail pour chantiers et bâtiments industriels.", images: gallery("10m") },
  { slug: "12m", name: "Nacelle IWM 12m", height: 12, capacity: "320 kg (2 personnes)", width: "1,35 m", weight: "3 600 kg", dailyRate: null, description: "Notre modèle le plus haut, pour les grands chantiers.", images: gallery("12m") },
];

export const getModel = (slug: string) => MODELS.find((m) => m.slug === slug);

/** Barème dégressif : tranches de jours et remise appliquée. */
export const DISCOUNT_TIERS = [
  { fromDay: 1, toDay: 7, discount: 0 },
  { fromDay: 8, toDay: 28, discount: 0.1 },
  { fromDay: 29, toDay: null, discount: 0.2 },
] as const;

export const TESTIMONIALS = [
  { name: "Marc Jeanneret", company: "Jeanneret Peinture SA, Delémont", text: "Nacelle livrée à l'heure et en parfait état. Le tarif dégressif a fait la différence sur notre chantier de trois semaines." },
  { name: "Sophie Berberat", company: "Berberat Électricité, Porrentruy", text: "Très pratique pour changer l'éclairage d'un entrepôt. Réservation simple et équipe réactive." },
  { name: "Luc Chappuis", company: "Chappuis Façades Sàrl, Saignelégier", text: "Le dépannage 24/24 nous a sauvés un samedi. Service sérieux et matériel propre." },
  { name: "Nadia Frossard", company: "Régie Frossard, Bienne", text: "Nous louons régulièrement pour l'entretien d'immeubles. Prix clairs, aucune mauvaise surprise." },
  { name: "Pascal Voirol", company: "Voirol Menuiserie, Moutier", text: "Le modèle 8m passe partout et se conduit facilement. Je recommande IWM Location." },
];

export type FaqItem = { category: string; q: string; a: string };
export const FAQ: FaqItem[] = [
  { category: "Tarifs", q: "Quel est le prix de location d'une nacelle 6m ou 8m ?", a: "CHF 30 par jour de base, avec -10% dès le 8e jour et -20% dès le 29e jour." },
  { category: "Tarifs", q: "Comment fonctionne la remise progressive ?", a: "Chaque jour est facturé selon sa tranche : jours 1-7 plein tarif, jours 8-28 à -10%, dès le jour 29 à -20%." },
  { category: "Tarifs", q: "Quel est le prix des modèles 10m et 12m ?", a: "Ils sont proposés sur devis selon la durée et le lieu. Contactez-nous pour une offre." },
  { category: "Tarifs", q: "Les prix incluent-ils la TVA ?", a: "Les prix affichés sont hors TVA (8,1%), ajoutée sur la facture." },
  { category: "Tarifs", q: "Faut-il verser une caution ?", a: "Une caution peut être demandée selon le profil du client et la durée de location." },
  { category: "Réservation", q: "Comment réserver une nacelle ?", a: "Via le formulaire de réservation en ligne, par téléphone ou par WhatsApp." },
  { category: "Réservation", q: "Quels documents sont nécessaires ?", a: "Une pièce d'identité, une attestation d'assurance RC et, pour les entreprises, un extrait du registre du commerce." },
  { category: "Réservation", q: "Puis-je annuler ma réservation ?", a: "Oui, gratuitement jusqu'à 48 heures avant le début de la location." },
  { category: "Réservation", q: "Puis-je prolonger la location ?", a: "Oui, sous réserve de disponibilité. Prévenez-nous au plus tôt." },
  { category: "Réservation", q: "À quelle distance réservez-vous à l'avance ?", a: "Idéalement 48 heures, mais nous essayons de satisfaire les demandes de dernière minute." },
  { category: "Livraison", q: "Proposez-vous la livraison ?", a: "Oui, forfait de livraison selon la distance. Le retrait au dépôt est gratuit." },
  { category: "Livraison", q: "Où se trouve le dépôt ?", a: "Chemin des Grandes-Vies 19, Porrentruy." },
  { category: "Livraison", q: "Quels sont les horaires de retrait et retour ?", a: "Du lundi au vendredi, en journée. Hors horaires sur demande." },
  { category: "Livraison", q: "Dois-je être présent à la livraison ?", a: "Oui, une personne doit réceptionner la machine et signer le protocole de remise." },
  { category: "Livraison", q: "Puis-je transporter la nacelle moi-même ?", a: "Les modèles 6m et 8m peuvent être tractés/transportés avec un véhicule adapté ; contactez-nous." },
  { category: "Utilisation", q: "Faut-il un permis pour utiliser la nacelle ?", a: "Une formation/instruction à la machine est requise. Nous réalisons une brève instruction à la remise." },
  { category: "Utilisation", q: "Quelle est la charge maximale ?", a: "Voir la fiche de chaque modèle (230 à 320 kg selon le modèle)." },
  { category: "Utilisation", q: "Peut-on l'utiliser à l'intérieur ?", a: "Oui, les modèles électriques 6m et 8m sont adaptés à l'intérieur." },
  { category: "Utilisation", q: "Peut-on l'utiliser par grand vent ?", a: "Non. L'utilisation est interdite au-delà des limites de vent indiquées sur la machine." },
  { category: "Utilisation", q: "Que faire en cas de panne ?", a: "Appelez notre service de dépannage 24/24 au 076 361 66 14." },
  { category: "Assurance & sécurité", q: "Suis-je assuré pendant la location ?", a: "Le client doit disposer d'une assurance RC. Une assurance casse peut être convenue au contrat." },
  { category: "Assurance & sécurité", q: "Qui est responsable en cas de dommage ?", a: "Le locataire répond des dommages causés par une utilisation non conforme." },
  { category: "Assurance & sécurité", q: "Un harnais est-il obligatoire ?", a: "Oui, le port d'un harnais est obligatoire dans la nacelle." },
  { category: "Assurance & sécurité", q: "Les machines sont-elles contrôlées ?", a: "Oui, chaque machine est inspectée avant chaque location et révisée régulièrement." },
  { category: "Paiement", q: "Quels modes de paiement acceptez-vous ?", a: "Virement bancaire sur facture, TWINT ou espèces au dépôt." },
  { category: "Paiement", q: "Facturez-vous les entreprises ?", a: "Oui, facture avec délai de paiement de 30 jours après acceptation du dossier." },
];

export const FAQ_CATEGORIES = [...new Set(FAQ.map((f) => f.category))];
