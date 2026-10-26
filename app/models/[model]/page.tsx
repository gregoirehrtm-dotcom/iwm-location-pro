import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import PriceEstimator from "@/components/PriceEstimator";
import { MODELS } from "@/lib/constants";
import { getModel } from "@/lib/utils";

export function generateStaticParams() {
  return MODELS.map((m) => ({ model: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const m = getModel((await params).model);
  return m ? { title: m.name, description: m.description } : {};
}

export default async function ModelPage({ params }: { params: Promise<{ model: string }> }) {
  const m = getModel((await params).model);
  if (!m) notFound();
  const specs: [string, string][] = [["Hauteur de travail", m.workingHeight], ["Hauteur de plateforme", m.platformHeight], ["Charge max", m.capacity], ["Poids", m.weight], ["Largeur", m.width], ["Motorisation", m.power]];
  return (
    <div className="section">
      <h1>{m.name}</h1>
      <p className="mt-3 text-lg text-slate-600">{m.description}</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ProductGallery id={m.id} name={m.name} />
        <div className="space-y-6">
          <p className="text-3xl font-bold text-primary">{m.dailyPrice ? `CHF ${m.dailyPrice}/jour` : "Sur devis"}</p>
          <table className="w-full text-sm"><tbody>{specs.map(([k, v]) => <tr key={k} className="border-b"><th className="py-2 text-left font-medium">{k}</th><td>{v}</td></tr>)}</tbody></table>
          <ul className="list-inside list-disc">{m.useCases.map((u) => <li key={u}>{u}</li>)}</ul>
          <div className="flex flex-wrap gap-3">
            <Link href={`/booking?model=${m.id}`} className="btn-accent">Réserver</Link>
            <a href={`/api/datasheet/${m.id}`} className="btn-outline" download>Fiche technique</a>
          </div>
        </div>
      </div>
      <h2 className="mt-16">Comparaison</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[500px] text-sm">
          <thead><tr className="border-b text-left"><th className="py-2">Modèle</th><th>Hauteur travail</th><th>Charge</th><th>Prix</th></tr></thead>
          <tbody>{MODELS.map((o) => (
            <tr key={o.id} className={`border-b ${o.id === m.id ? "bg-primary-light font-semibold" : ""}`}>
              <td className="py-2"><Link href={`/models/${o.id}`} className="underline">{o.name}</Link></td><td>{o.workingHeight}</td><td>{o.capacity}</td><td>{o.dailyPrice ? `CHF ${o.dailyPrice}/j` : "Sur devis"}</td>
            </tr>))}</tbody>
        </table>
      </div>
      <div className="mt-12 max-w-xl"><PriceEstimator initialModel={m.id} /></div>
    </div>
  );
}
