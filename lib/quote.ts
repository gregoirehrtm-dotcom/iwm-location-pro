import { npaInfo, placeLabel } from "./delivery";
import { meters, plural } from "./format";
import { getModel } from "./models";

export const accessOptions = [
  "Rez-de-chaussée, de plain-pied",
  "Étage, avec monte-charge",
  "Par une rampe",
  "Autre, précisé dans le message",
];

export const groundOptions = [
  "Béton ou sol industriel",
  "Carrelage ou sol fragile",
  "Enrobé",
  "Terrain naturel ou gravier",
  "Je ne sais pas",
];

export type QuoteRequest = {
  model: string;
  startDate: string; // AAAA-MM-JJ
  endDate: string;
  mode: "livraison" | "retrait";
  npa: string;
  address: string;
  access: string;
  ground: string;
  passage: string; // cm, facultatif
  clientType: "entreprise" | "particulier";
  company: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

export function daysBetween(start: string, end: string): number {
  return Math.round((Date.parse(end + "T12:00:00") - Date.parse(start + "T12:00:00")) / 864e5) + 1;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("fr-CH", { weekday: "short", day: "numeric", month: "long" });
  } catch {
    return iso;
  }
}

/** Contrôle d'une étape du formulaire (1 : nacelle et dates, 2 : livraison, 3 : coordonnées) */
export function validateStep(step: 1 | 2 | 3, q: QuoteRequest, today: string): QuoteErrors {
  const e: QuoteErrors = {};
  if (step === 1) {
    if (!q.startDate) e.startDate = "Choisissez une date de début.";
    else if (today && q.startDate < today) e.startDate = "Cette date est déjà passée.";
    if (!q.endDate) e.endDate = "Choisissez une date de fin.";
    else if (q.startDate && q.endDate < q.startDate) e.endDate = "La fin doit suivre le début.";
  }
  if (step === 2 && q.mode === "livraison") {
    if (!npaInfo(q.npa).ok) e.npa = "Entrez un NPA suisse à 4 chiffres.";
    if (q.address.trim().length < 4) e.address = "Indiquez l’adresse du chantier.";
  }
  if (step === 3) {
    if (q.clientType === "entreprise" && !q.company.trim()) e.company = "Indiquez le nom de l’entreprise.";
    if (q.name.trim().length < 2) e.name = "Indiquez votre nom.";
    if (q.phone.replace(/\D/g, "").length < 9) e.phone = "Indiquez un numéro complet.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.email.trim())) e.email = "Indiquez une adresse e-mail valide.";
  }
  return e;
}

/** Texte de la demande : corps de l'e-mail envoyé et message WhatsApp proposé au client */
export function quoteSummary(q: QuoteRequest): string {
  const m = getModel(q.model);
  const lines = [
    "Demande de devis, IWM Location",
    "",
    `Nacelle : ${m ? `${m.name} (hauteur de travail ${meters(m.workingHeight)})` : q.model}`,
    `Dates : du ${formatDate(q.startDate)} au ${formatDate(q.endDate)} (${plural(daysBetween(q.startDate, q.endDate), "jour")})`,
    "",
  ];
  if (q.mode === "livraison") {
    const info = npaInfo(q.npa);
    lines.push(`Livraison : ${q.address.trim()}, ${info.ok ? placeLabel(info) : q.npa}`);
    lines.push(`Accès : ${q.access}`, `Sol : ${q.ground}`);
    if (q.passage) lines.push(`Passage le plus étroit : ${q.passage} cm`);
  } else {
    lines.push("Retrait au dépôt de Porrentruy");
  }
  lines.push(
    "",
    `Client : ${q.clientType === "entreprise" ? `entreprise ${q.company.trim()}` : "particulier"}`,
    `Nom : ${q.name.trim()}`,
    `Téléphone : ${q.phone.trim()}`,
    `E-mail : ${q.email.trim()}`,
  );
  if (q.message.trim()) lines.push("", `Message : ${q.message.trim()}`);
  return lines.join("\n");
}
