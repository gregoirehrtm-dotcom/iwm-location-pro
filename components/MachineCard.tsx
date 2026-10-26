import Link from "next/link";
import type { Machine } from "@/lib/machines";
import { categoryLabels } from "@/lib/machines";
import MachineIllustration from "./MachineIllustration";

export default function MachineCard({ machine }: { machine: Machine }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <MachineIllustration category={machine.category} className="aspect-[10/7] w-full" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {categoryLabels[machine.category]}
        </p>
        <h3 className="mt-1 text-lg font-bold text-ink-900">{machine.name}</h3>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          <Spec label="Hauteur" value={`${machine.workingHeight} m`} />
          <Spec label="Déport" value={machine.outreach ? `${machine.outreach} m` : "—"} />
          <Spec label="Charge" value={`${machine.capacity} kg`} />
        </dl>
        <div className="mt-auto flex items-end justify-between pt-5">
          <p className="text-sm text-ink-700">
            dès <span className="text-2xl font-bold text-ink-900">{machine.dailyPrice} €</span> HT/jour
          </p>
          <Link href={`/catalogue/${machine.slug}`} className="text-sm font-semibold text-brand-600 group-hover:underline">
            Détails →
          </Link>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-2 py-2">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="font-semibold text-ink-900">{value}</dd>
    </div>
  );
}
