"use client";

import { useMemo, useState } from "react";
import { categoryLabels, machines, type MachineCategory } from "@/lib/machines";
import MachineCard from "./MachineCard";

type Filter = MachineCategory | "all";

export default function CatalogueGrid({ initialCategory }: { initialCategory?: string }) {
  const [category, setCategory] = useState<Filter>(
    initialCategory && initialCategory in categoryLabels ? (initialCategory as MachineCategory) : "all",
  );
  const [minHeight, setMinHeight] = useState(0);

  const filtered = useMemo(
    () =>
      machines.filter(
        (m) => (category === "all" || m.category === category) && m.workingHeight >= minHeight,
      ),
    [category, minHeight],
  );

  const options: [Filter, string][] = [["all", "Toutes"], ...(Object.entries(categoryLabels) as [Filter, string][])];

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {options.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              aria-pressed={category === value}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === value ? "bg-brand-500 text-white" : "bg-slate-100 text-ink-700 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-ink-700">
          Hauteur minimale
          <select
            value={minHeight}
            onChange={(e) => setMinHeight(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            {[0, 10, 15, 20, 25].map((h) => (
              <option key={h} value={h}>
                {h === 0 ? "Toutes" : `${h} m et +`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {filtered.length} machine{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MachineCard key={m.slug} machine={m} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-ink-700">Aucune machine ne correspond à ces critères.</p>
      )}
    </div>
  );
}
