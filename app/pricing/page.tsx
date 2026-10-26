import type { Metadata } from "next";
import Link from "next/link";
import PriceEstimator from "@/components/PriceEstimator";
import { CONDITIONS, INCLUDED, MODELS } from "@/lib/constants";
import { estimate, formatCHF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tarifs de location de nacelles",
  description: "Des prix bas, affichés, sans frais cachés : dès CHF 30.– par jour, dégressif dès la deuxième semaine.",
};

const DURATIONS = [{ l: "1 jour", d: 1 }, { l: "3 jours", d: 3 }, { l: "1 semaine", d: 7 }, { l: "2 semaines", d: 14 }, { l: "1 mois", d: 30 }];

export default function PricingPage() {
  return (
    <div className="section container-x">
      <h1>Des prix bas, affichés, sans frais cachés</h1>
      <p className="mt-2 max-w-2xl text-muted">Le prix dépend du modèle, de la durée et de la livraison. Il devient dégressif dès la deuxième semaine. Livraison incluse dans la zone Jura, forfait en dehors.</p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">Tarifs indicatifs par durée</caption>
          <thead>
            <tr className="bg-surface">
              <th scope="col" className="border border-line p-3">Nacelle</th>
              {DURATIONS.map((d) => <th key={d.d} scope="col" className="border border-line p-3">{d.l}</th>)}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => (
              <tr key={m.slug}>
                <th scope="row" className="border border-line p-3">{m.name}</th>
                {DURATIONS.map((d) => {
                  const e = estimate(m.slug, d.d);
                  return <td key={d.d} className="border border-line p-3">{e.total !== null ? `dès ${formatCHF(e.total)}` : "Sur devis"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">Estimations indicatives hors livraison. Le prix exact, livraison et TVA comprises, figure dans votre devis.</p>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div><h2>Compris dans le prix</h2><ul className="mt-4 list-disc space-y-1 pl-6">{INCLUDED.map((i) => <li key={i}>{i}</li>)}</ul></div>
        <div><h2>Conditions</h2><ul className="mt-4 list-disc space-y-1 pl-6">{CONDITIONS.map((i) => <li key={i}>{i}</li>)}</ul></div>
      </div>
      <div className="mt-12"><PriceEstimator /></div>
      <Link href="/booking" className="btn btn-accent mt-8">Réserver Maintenant</Link>
    </div>
  );
}
