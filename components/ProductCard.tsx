import Image from "next/image";
import Link from "next/link";
import type { Model } from "@/lib/constants";

export default function ProductCard({ model }: { model: Model }) {
  return (
    <article className="card flex flex-col">
      <Image src={`/images/products/${model.id}-1.svg`} alt={model.name} width={800} height={600} loading="lazy" unoptimized className="mb-4 rounded-lg" />
      <h3>{model.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{model.description}</p>
      <ul className="mt-3 space-y-1 text-sm">
        <li>Hauteur de travail : <strong>{model.workingHeight}</strong></li>
        <li>Charge : <strong>{model.capacity}</strong></li>
      </ul>
      <p className="mt-4 text-2xl font-bold text-primary">{model.dailyPrice ? `CHF ${model.dailyPrice}/jour` : "Sur devis"}</p>
      <Link href={`/models/${model.id}`} className="btn-outline mt-4">Détails</Link>
    </article>
  );
}
