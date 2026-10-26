import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À propos",
  description: "IWM Location fait partie d’IWM Industrial Welding Maintenance Sàrl, à Porrentruy.",
};

export default function AboutPage() {
  return (
    <div className="section container-x max-w-3xl">
      <h1>Entretenues par des spécialistes de la maintenance</h1>
      <p className="mt-4">IWM Location fait partie d’{COMPANY.legalName}, à Porrentruy. Nos nacelles sont suivies par nos propres techniciens, du contrôle au dépannage.</p>
      <h2 className="mt-8">Ce que demande la Suva</h2>
      <p className="mt-2">Les utilisateurs de nacelles doivent être formés pour la catégorie d’appareil et instruits sur le modèle utilisé. Une prise en main est offerte à chaque livraison. Besoin d’une formation complète ? Parlez-nous-en dans votre demande.</p>
      <h2 className="mt-8">Société</h2>
      <p className="mt-2">{COMPANY.legalName}<br />{COMPANY.address}, {COMPANY.postalCode} {COMPANY.city}<br />IDE {COMPANY.ide}</p>
    </div>
  );
}
