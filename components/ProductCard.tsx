import Link from "next/link";
import type { Model } from "@/lib/types";
import { formatMeters } from "@/lib/utils";
import ModelIllustration from "./ModelIllustration";

export default function ProductCard({ model }: { model: Model }) {
  return (
    <article className="card flex flex-col gap-4 fade-in">
      <div className="aspect-[4/3] overflow-hidden rounded-sm">
        <ModelIllustration model={model} />
      </div>
      <div>
        <h3 className="!text-2xl">{model.name}</h3>
        <p className="text-muted">{model.tagline}</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <dt className="text-muted">Hauteur de travail</dt><dd className="font-semibold">{formatMeters(model.workingHeight)}</dd>
        <dt className="text-muted">Hauteur de plancher</dt><dd className="font-semibold">{formatMeters(model.platformHeight)}</dd>
        <dt className="text-muted">Capacité</dt><dd className="font-semibold">{model.capacityKg ? `${model.capacityKg} kg` : "à confirmer"}</dd>
        <dt className="text-muted">Largeur</dt><dd className="font-semibold">{formatMeters(model.widthM)}</dd>
      </dl>
      <p className="mt-auto text-lg font-bold text-primary">
        {model.pricePerDay ? `dès CHF ${model.pricePerDay}.– par jour` : "Sur devis · réponse sous 24 h"}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Link href={`/booking?model=${model.slug}`} className="btn btn-accent !px-2">Réserver</Link>
        <Link href={`/models/${model.slug}`} className="btn btn-outline !px-2">Fiche complète</Link>
      </div>
    </article>
  );
}
