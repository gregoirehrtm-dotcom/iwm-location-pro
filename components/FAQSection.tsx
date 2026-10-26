"use client";
import { useMemo, useState } from "react";
import { FAQ, FAQ_CATEGORIES } from "@/lib/constants";

export default function FAQSection({ limit, searchable = false }: { limit?: number; searchable?: boolean }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Toutes");
  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = FAQ.filter(
      (f) => (cat === "Toutes" || f.category === cat) && (!term || `${f.question} ${f.answer}`.toLowerCase().includes(term)),
    );
    return limit ? list.slice(0, limit) : list;
  }, [q, cat, limit]);

  return (
    <div>
      {searchable && (
        <div className="mb-6 space-y-4">
          <div>
            <label htmlFor="faq-search" className="label">Rechercher dans la FAQ</label>
            <input id="faq-search" type="search" className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. assurance, livraison, formation…" />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Catégories">
            {["Toutes", ...FAQ_CATEGORIES].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={`min-h-11 rounded-sm border px-4 font-medium ${cat === c ? "border-primary bg-primary text-white" : "border-line bg-white"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="divide-y divide-line border-y border-line" aria-live="polite">
        {items.map((f) => (
          <details key={f.question} className="group py-1">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 font-semibold">
              {f.question}<span aria-hidden className="text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-4 text-muted">{f.answer}</p>
          </details>
        ))}
        {items.length === 0 && <p className="py-6">Aucun résultat. Appelez-nous, nous vous répondons volontiers.</p>}
      </div>
    </div>
  );
}
