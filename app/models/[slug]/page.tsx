import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MODELS, getModel } from "@/lib/constants";
import ProductGallery from "@/components/Gallery";

export const dynamicParams = false;
export const generateStaticParams = () => MODELS.map((m) => ({ slug: m.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = getModel((await params).slug);
  return { title: m?.name, description: m?.description };
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = getModel((await params).slug);
  if (!m) notFound();
  return (
    <div className="container">
      <h1>{m.name}</h1>
      <p>{m.description}</p>
      <table><tbody>
        <tr><th>Hauteur de travail</th><td>{m.height} m</td></tr>
        <tr><th>Capacité</th><td>{m.capacity}</td></tr>
        <tr><th>Largeur</th><td>{m.width}</td></tr>
        <tr><th>Poids</th><td>{m.weight}</td></tr>
        <tr><th>Tarif</th><td>{m.dailyRate ? `CHF ${m.dailyRate}/jour (dégressif)` : "Sur devis"}</td></tr>
      </tbody></table>
      <p><Link className="btn" href="/booking">Réserver ce modèle</Link></p>
      <ProductGallery model={m} />
    </div>
  );
}
