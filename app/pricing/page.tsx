import type { Metadata } from "next";
import Link from "next/link";
import { DISCOUNTS, MODELS } from "@/lib/constants";
import { estimatePrice, formatCHF } from "@/lib/utils";

export const metadata: Metadata = { title: "Tarifs" };

export default function Pricing() {
  return (
    <div className="section">
      <h1>Tarifs</h1>
      <p className="mt-3 text-slate-600">Prix hors TVA. Rabais progressifs automatiques : {DISCOUNTS.slice(1).map((d) => d.label).join(", ")}.</p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead><tr className="border-b"><th className="py-3">Modèle</th><th>1 jour</th><th>7 jours</th><th>14 jours</th><th>30 jours</th></tr></thead>
          <tbody>{MODELS.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="py-3 font-semibold">{m.name}</td>
              {[1, 7, 14, 30].map((d) => { const e = estimatePrice(m.id, d); return <td key={d}>{e.onQuote ? "Sur devis" : formatCHF(e.total!)}</td>; })}
            </tr>))}</tbody>
        </table>
      </div>
      <Link href="/booking" className="btn-accent mt-10">Réserver</Link>
    </div>
  );
}
