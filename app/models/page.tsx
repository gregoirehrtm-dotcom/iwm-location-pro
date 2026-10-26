import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { MODELS } from "@/lib/constants";
import { formatMeters } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos nacelles ciseaux : IWM 6, 8, 10 et 12 m",
  description: "Comparez nos quatre nacelles ciseaux électriques neuves de 5,80 à 12 m de hauteur de travail.",
};

export default function ModelsPage() {
  return (
    <div className="section container-x">
      <h1>Nos nacelles</h1>
      <p className="mt-2 text-muted">Quatre modèles 100 % électriques de l’année 2026.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((m) => <ProductCard key={m.slug} model={m} />)}
      </div>
      <h2 className="mt-12">Comparatif</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <caption className="sr-only">Comparatif des modèles</caption>
          <thead><tr className="bg-surface">{["Modèle", "Hauteur de travail", "Hauteur de plancher", "Capacité", "Largeur", "Tarif"].map((h) => <th key={h} scope="col" className="border border-line p-3">{h}</th>)}</tr></thead>
          <tbody>
            {MODELS.map((m) => (
              <tr key={m.slug}>
                <th scope="row" className="border border-line p-3">{m.name}</th>
                <td className="border border-line p-3">{formatMeters(m.workingHeight)}</td>
                <td className="border border-line p-3">{formatMeters(m.platformHeight)}</td>
                <td className="border border-line p-3">{m.capacityKg ? `${m.capacityKg} kg` : "à confirmer"}</td>
                <td className="border border-line p-3">{formatMeters(m.widthM)}</td>
                <td className="border border-line p-3">{m.pricePerDay ? `dès CHF ${m.pricePerDay}.–/jour` : "Sur devis"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
