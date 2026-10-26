import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import { INCLUDED, MODELS, getModel } from "@/lib/constants";
import { estimate, formatCHF, formatMeters } from "@/lib/utils";

type Props = { params: Promise<{ model: string }> };

export function generateStaticParams() {
  return MODELS.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModel((await params).model);
  if (!m) return {};
  return {
    title: `Location nacelle ${m.name}, ${formatMeters(m.workingHeight)} de hauteur de travail`,
    description: `${m.description} ${m.pricePerDay ? `Dès CHF ${m.pricePerDay}.– par jour.` : "Sur devis sous 24 h."}`,
  };
}

const DURATIONS = [{ l: "1 jour", d: 1 }, { l: "3 jours", d: 3 }, { l: "1 semaine", d: 7 }, { l: "2 semaines", d: 14 }, { l: "1 mois", d: 30 }];

export default async function ModelPage({ params }: Props) {
  const m = getModel((await params).model);
  if (!m) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Location nacelle ${m.name}`,
    description: m.description,
    ...(m.pricePerDay && { offers: { "@type": "Offer", priceCurrency: "CHF", price: m.pricePerDay, availability: "https://schema.org/InStock" } }),
  };

  return (
    <div className="section container-x">
      <h1>{m.name}</h1>
      <p className="mt-2 text-lg text-muted">{m.tagline}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ProductGallery model={m} />
        <div>
          <p>{m.description}</p>
          <p className="mt-4 text-2xl font-bold text-primary">{m.pricePerDay ? `dès CHF ${m.pricePerDay}.– par jour` : "Sur devis · réponse sous 24 h"}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`/booking?model=${m.slug}`} className="btn btn-accent">Réserver</Link>
            <a href={`/api/datasheet/${m.slug}`} className="btn btn-outline" download><Download size={18} aria-hidden />Fiche technique</a>
          </div>
          <h2 className="mt-8 !text-2xl">Caractéristiques</h2>
          <dl className="mt-3 grid grid-cols-2 gap-2">
            <dt className="text-muted">Hauteur de travail</dt><dd className="font-semibold">{formatMeters(m.workingHeight)}</dd>
            <dt className="text-muted">Hauteur de plancher</dt><dd className="font-semibold">{formatMeters(m.platformHeight)}</dd>
            <dt className="text-muted">Capacité</dt><dd className="font-semibold">{m.capacityKg ? `${m.capacityKg} kg` : "à confirmer"}</dd>
            <dt className="text-muted">Largeur</dt><dd className="font-semibold">{formatMeters(m.widthM)}</dd>
            <dt className="text-muted">Idéale pour</dt><dd className="font-semibold">{m.bestFor}</dd>
            <dt className="text-muted">Motorisation</dt><dd className="font-semibold">100 % électrique, modèle 2026</dd>
          </dl>
        </div>
      </div>

      <h2 className="mt-12">Tarifs par durée</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-xl border-collapse text-left">
          <thead><tr className="bg-surface"><th scope="col" className="border border-line p-3">Durée</th><th scope="col" className="border border-line p-3">Estimation</th></tr></thead>
          <tbody>
            {DURATIONS.map((d) => {
              const e = estimate(m.slug, d.d);
              return <tr key={d.d}><th scope="row" className="border border-line p-3">{d.l}</th><td className="border border-line p-3">{e.total !== null ? `à partir de ${formatCHF(e.total)}` : "Sur devis"}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">Estimation indicative, hors livraison. Le prix exact figure dans votre devis.</p>

      <h2 className="mt-12">Cas d’usage</h2>
      <ul className="mt-4 list-disc space-y-1 pl-6">{m.useCases.map((u) => <li key={u}>{u}</li>)}</ul>

      <h2 className="mt-12">Comparaison avec les autres modèles</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead><tr className="bg-surface"><th scope="col" className="border border-line p-3">Modèle</th><th scope="col" className="border border-line p-3">Hauteur de travail</th><th scope="col" className="border border-line p-3">Atout</th></tr></thead>
          <tbody>
            {MODELS.map((o) => (
              <tr key={o.slug} className={o.slug === m.slug ? "bg-primary/10 font-semibold" : ""}>
                <th scope="row" className="border border-line p-3"><Link href={`/models/${o.slug}`} className="underline">{o.name}</Link></th>
                <td className="border border-line p-3">{formatMeters(o.workingHeight)}</td>
                <td className="border border-line p-3">{o.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12">Compris dans le prix</h2>
      <ul className="mt-4 list-disc space-y-1 pl-6">{INCLUDED.map((i) => <li key={i}>{i}</li>)}</ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
