"use client";
import { useMemo, useState } from "react";
import { MODELS } from "@/lib/constants";
import { estimatePrice, formatCHF } from "@/lib/utils";

export default function PriceEstimator({ initialModel = "6m" }: { initialModel?: string }) {
  const [model, setModel] = useState(initialModel);
  const [days, setDays] = useState(7);
  const est = useMemo(() => (days >= 1 && days <= 365 ? estimatePrice(model, days) : null), [model, days]);
  return (
    <div className="card">
      <h3>Estimez votre prix</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="est-model">Modèle</label>
          <select id="est-model" className="input" value={model} onChange={(e) => setModel(e.target.value)}>
            {MODELS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select></div>
        <div><label className="label" htmlFor="est-days">Durée (jours)</label>
          <input id="est-days" type="number" min={1} max={365} className="input" value={days} onChange={(e) => setDays(Math.floor(Number(e.target.value)))} /></div>
      </div>
      <div className="mt-6 rounded-lg bg-primary-light p-4" aria-live="polite">
        {!est ? <p>Entrez une durée entre 1 et 365 jours.</p> : est.onQuote ? <p className="font-semibold">Ce modèle est disponible sur devis.</p> : (
          <>
            <p className="text-3xl font-bold text-primary">{formatCHF(est.total!)} <span className="text-sm font-normal">hors TVA</span></p>
            {est.discount > 0 && <p className="text-sm text-success">Rabais de durée : -{formatCHF(est.discount)}</p>}
          </>
        )}
      </div>
    </div>
  );
}
