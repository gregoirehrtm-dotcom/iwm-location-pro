import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de votre chantier : téléphone, WhatsApp, e-mail ou dépôt de Porrentruy.",
};

export default function ContactPage() {
  return (
    <div className="section container-x">
      <h1>Parlons de votre chantier</h1>
      <p className="mt-2 text-muted">Un conseiller vous répond, vérifie l’accès et vous propose la bonne nacelle.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card"><ContactForm /></div>
        <ul className="space-y-4">
          <li className="flex gap-3"><Phone aria-hidden /><a className="font-semibold underline" href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a></li>
          <li className="flex gap-3"><MessageCircle aria-hidden /><a className="font-semibold underline" href={COMPANY.whatsappHref}>Écrire sur WhatsApp</a></li>
          <li className="flex gap-3"><Mail aria-hidden /><a className="font-semibold underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
          <li className="flex gap-3"><MapPin aria-hidden /><span>{COMPANY.address}, {COMPANY.postalCode} {COMPANY.city} · <a className="underline" href={COMPANY.mapsHref}>Itinéraire</a></span></li>
          <li className="flex gap-3"><Clock aria-hidden /><span>{COMPANY.hours}</span></li>
          <li className="rounded-sm bg-accent/15 p-4"><strong>Dépannage {COMPANY.support}</strong><br />Intervention sous 24 h, ou nacelle remplacée.</li>
        </ul>
      </div>
    </div>
  );
}
