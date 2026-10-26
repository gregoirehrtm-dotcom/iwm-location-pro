"use client";
import Link from "next/link";
import { useState } from "react";
import { MODELS } from "@/lib/constants";
import { estimate, formatCHF } from "@/lib/utils";
import type { ModelSlug } from "@/lib/types";

const PRESETS = [{ l: "1 jour", d: 1 }, { l: "3 jours", d: 3 }, { l: "1 semaine", d: 7 }, { l: "1 mois", d: 30 }];

export default function PriceEstimator() {
  const [model, setModel] = useState<ModelSlug>("6m");
  const [days, setDays] = useState(5);
  const est = estimate(model, days);
  const current = MODELS.find((m) => m.slug === model)!;

  return (
    <div className="card" id="estimateur">
      <h2>Estimez votre location</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="est-model" className="label">Nacelle</label>
          <select id="est-model" className="field" value={model} onChange={(e) => setModel(e.target.value as ModelSlug)}>
            {MODELS.map((m) => (
              <option key={m.slug} value={m.slug}>{m.name}, jusqu’à {String(m.workingHeight).replace(".", ",")} m</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="est-days" className="label">Durée (jours)</label>
          <input
            id="est-days" type="number" min={1} max={365} className="field" value={days}
            onChange={(e) => setDays(Math.min(365, Math.max(1, Math.floor(Number(e.target.value)) || 1)))}
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Durées courantes">
        {PRESETS.map((p) => (
          <button key={p.d} type="button" onClick={() => setDays(p.d)} aria-pressed={days === p.d}
            className={`min-h-11 rounded-sm border px-4 font-medium ${days === p.d ? "border-primary bg-primary text-white" : "border-line bg-white"}`}>
            {p.l}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-sm bg-surface p-4" aria-live="polite">
        {est.onQuote ? (
          <p className="text-lg font-bold">{current.name} : sur devis, réponse sous 24 h</p>
        ) : (
          <>
            <p className="text-sm text-muted">Estimation</p>
            <p className="text-3xl font-bold text-primary">à partir de {formatCHF(est.total!)}</p>
            <p className="text-sm text-muted">
              {days} jour{days > 1 ? "s" : ""}, soit {est.averagePerDay!.toFixed(2)} CHF/jour en moyenne
              {est.discountApplied ? " (tarif dégressif dès la 2e semaine)" : ""}. Le prix exact figure dans votre devis.
            </p>
          </>
        )}
      </div>
      <Link href={`/booking?model=${model}&days=${days}`} className="btn btn-accent mt-6 w-full sm:w-auto">Demander ce devis</Link>
    </div>
  );
}
