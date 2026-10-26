"use client";
import { useMemo, useState } from "react";
import { FAQS, FAQ_CATEGORIES } from "@/lib/constants";

export default function FAQSection({ limit, searchable = true }: { limit?: number; searchable?: boolean }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Toutes");
  const items = useMemo(() => {
    const n = q.trim().toLowerCase();
    const r = FAQS.filter((f) => (cat === "Toutes" || f.category === cat) && (!n || `${f.q} ${f.a}`.toLowerCase().includes(n)));
    return limit ? r.slice(0, limit) : r;
  }, [q, cat, limit]);
  return (
    <div>
      {searchable && (
        <div className="mb-6 space-y-4">
          <input type="search" aria-label="Rechercher" placeholder="Rechercher une question…" className="input" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            {["Toutes", ...FAQ_CATEGORIES].map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm ${cat === c ? "border-primary bg-primary text-white" : "border-slate-300"}`}>{c}</button>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="card group">
            <summary className="cursor-pointer font-semibold text-primary-dark">{f.q} <span className="ml-2 text-xs font-normal text-slate-500">{f.category}</span></summary>
            <p className="mt-3 text-slate-700">{f.a}</p>
          </details>
        ))}
        {items.length === 0 && <p className="text-slate-600">Aucun résultat.</p>}
      </div>
    </div>
  );
}
