"use client";
import { useState } from "react";
import { MODELS } from "@/lib/constants";
import { estimate, chf } from "@/lib/utils";

export default function Estimator() {
  const [model, setModel] = useState("6m");
  const [days, setDays] = useState(5);
  const valid = Number.isInteger(days) && days >= 1 && days <= 365;
  const est = valid ? estimate(model, days) : null;
  return (
    <div className="card">
      <h3>Estimateur de prix</h3>
      <label htmlFor="em">Modèle</label>
      <select id="em" value={model} onChange={(e) => setModel(e.target.value)}>
        {MODELS.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
      </select>
      <label htmlFor="ed">Durée (jours)</label>
      <input id="ed" type="number" min={1} max={365} value={days} onChange={(e) => setDays(Number(e.target.value))} />
      <p aria-live="polite"><strong>{!est ? "Durée invalide" : est.onQuote ? "Sur devis" : `${chf(est.total!)} (hors TVA)`}</strong></p>
    </div>
  );
}
