import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import TrustSignals from "./TrustSignals";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-dark to-primary text-white">
      <div className="container-x py-12 lg:py-20">
        <p className="inline-block rounded-sm bg-accent px-3 py-1 text-sm font-bold text-ink">Dépannage 24 h/24 · 7 j/7</p>
        <h1 className="mt-4 max-w-3xl">Location de nacelles ciseaux neuves, dès CHF 30.– par jour</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-100">
          Quatre nacelles électriques de l’année 2026, de 5,80 à 12 m de hauteur de travail. Devis sous 24 h, livraison sur votre chantier ou retrait gratuit au dépôt de Porrentruy.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="btn btn-accent">Réserver Maintenant</Link>
          <a href={`tel:${COMPANY.phoneHref}`} className="btn border-white text-white hover:bg-white hover:text-primary"><Phone size={18} aria-hidden />{COMPANY.phone}</a>
          <a href={COMPANY.whatsappHref} className="btn border-white text-white hover:bg-white hover:text-primary"><MessageCircle size={18} aria-hidden />WhatsApp</a>
        </div>
        <div className="mt-10 rounded-sm bg-white p-6 text-ink"><TrustSignals /></div>
      </div>
    </section>
  );
}
