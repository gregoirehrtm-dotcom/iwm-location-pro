import type { Metadata } from "next";
import { MODELS, DISCOUNT_TIERS } from "@/lib/constants";
import { estimate, chf } from "@/lib/utils";
import Estimator from "@/components/Estimator";

export const metadata: Metadata = { title: "Tarifs" };

export default function Pricing() {
  const rate = 30;
  const examples = [1, 7, 8, 14, 28, 29, 60];
  return (
    <div className="container">
      <h1>Tarifs de location</h1>
      <p>Prix hors TVA. Retrait gratuit au dépôt de Porrentruy, livraison en supplément.</p>
      <h2>Modèles 6m et 8m – barème dégressif</h2>
      <table>
        <thead><tr><th>Période</th><th>Remise</th><th>Prix / jour</th></tr></thead>
        <tbody>
          {DISCOUNT_TIERS.map((t) => (
            <tr key={t.fromDay}>
              <td>{t.toDay ? `Jours ${t.fromDay} à ${t.toDay}` : `Dès le jour ${t.fromDay}`}</td>
              <td>{t.discount ? `-${t.discount * 100}%` : "–"}</td>
              <td>{chf(rate * (1 - t.discount))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Exemples de total</h2>
      <table>
        <thead><tr><th>Durée</th><th>Total</th><th>Économie</th></tr></thead>
        <tbody>
          {examples.map((d) => { const e = estimate("6m", d); return <tr key={d}><td>{d} jour{d > 1 ? "s" : ""}</td><td>{chf(e.total!)}</td><td>{chf(e.discount!)}</td></tr>; })}
        </tbody>
      </table>
      <h2>Modèles 10m et 12m</h2>
      <p>{MODELS.filter((m) => !m.dailyRate).map((m) => m.name).join(" et ")} : tarif sur devis selon la durée et le lieu. <a href="/contact">Demandez un devis</a>.</p>
      <Estimator />
    </div>
  );
}
