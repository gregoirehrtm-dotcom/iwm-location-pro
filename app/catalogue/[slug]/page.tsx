import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MachineCard from "@/components/MachineCard";
import MachineIllustration from "@/components/MachineIllustration";
import { categoryLabels, getMachine, machines } from "@/lib/machines";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) return {};
  return {
    title: `Location ${machine.name}`,
    description: `${machine.description} À partir de ${machine.dailyPrice} € HT/jour.`,
  };
}

export default async function MachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) notFound();

  const specs: [string, string][] = [
    ["Hauteur de travail", `${machine.workingHeight} m`],
    ["Déport horizontal", machine.outreach ? `${machine.outreach} m` : "—"],
    ["Charge maximale", `${machine.capacity} kg`],
    ["Énergie", machine.energy],
    ["Utilisation", machine.terrain],
    ["Habilitation", machine.license],
  ];
  const related = machines.filter((m) => m.slug !== machine.slug && m.category === machine.category).slice(0, 3);

  return (
    <div className="container-page py-14">
      <nav className="text-sm text-slate-500" aria-label="Fil d'Ariane">
        <Link href="/catalogue" className="hover:text-brand-600">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-800">{machine.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <MachineIllustration category={machine.category} className="w-full" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{categoryLabels[machine.category]}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">{machine.name}</h1>
          <p className="mt-4 text-lg text-ink-700">{machine.description}</p>

          <div className="mt-6 flex gap-4">
            <div className="rounded-xl bg-brand-50 px-5 py-4">
              <p className="text-sm text-ink-700">Jour</p>
              <p className="text-2xl font-bold text-ink-900">{machine.dailyPrice} € <span className="text-sm font-normal">HT</span></p>
            </div>
            <div className="rounded-xl bg-brand-50 px-5 py-4">
              <p className="text-sm text-ink-700">Semaine</p>
              <p className="text-2xl font-bold text-ink-900">{machine.weeklyPrice} € <span className="text-sm font-normal">HT</span></p>
            </div>
          </div>

          <dl className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between px-4 py-3 text-sm">
                <dt className="text-ink-700">{label}</dt>
                <dd className="font-semibold text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {machine.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-ink-800">
                <span className="text-brand-600" aria-hidden="true">✓</span> {f}
              </li>
            ))}
          </ul>

          <Link href={`/devis?machine=${machine.slug}`} className="btn-primary mt-8 w-full text-base sm:w-auto">
            Demander un devis pour cette nacelle
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-ink-900">Dans la même catégorie</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((m) => (
              <MachineCard key={m.slug} machine={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
