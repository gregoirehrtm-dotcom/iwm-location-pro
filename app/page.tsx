import Link from "next/link";
import MachineCard from "@/components/MachineCard";
import MachineIllustration from "@/components/MachineIllustration";
import { machines } from "@/lib/machines";
import { site } from "@/lib/site";

const advantages = [
  { title: "Livraison rapide", text: "Livraison et reprise sur votre chantier, souvent dès le lendemain." },
  { title: "Matériel contrôlé", text: "Vérifications générales périodiques à jour et machines entretenues après chaque location." },
  { title: "Avec ou sans opérateur", text: "Un opérateur qualifié CACES peut intervenir pour vous." },
  { title: "Tarifs transparents", text: "Prix à la journée, à la semaine ou au mois, sans frais cachés." },
];

const steps = [
  { n: "1", title: "Choisissez", text: "Sélectionnez la nacelle adaptée à votre hauteur de travail." },
  { n: "2", title: "Demandez un devis", text: "Réponse personnalisée sous 2 heures ouvrées." },
  { n: "3", title: "On livre", text: "Votre nacelle arrive sur chantier, prête à l'emploi." },
];

export default function HomePage() {
  // Une machine par catégorie pour montrer la variété de la flotte.
  const featured = machines.filter((m, i) => machines.findIndex((x) => x.category === m.category) === i).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="inline-block rounded-full bg-brand-500/20 px-3 py-1 text-sm font-medium text-brand-100">
              De 8 à 26 mètres de hauteur de travail
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Location de nacelles élévatrices <span className="text-brand-500">en toute sécurité</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Ciseaux, articulées, télescopiques, araignées et camions nacelles : le bon équipement pour chaque chantier,
              livré là où vous en avez besoin.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/devis" className="btn-primary text-base">Obtenir un devis gratuit</Link>
              <Link href="/catalogue" className="btn-secondary text-base">Voir le catalogue</Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Ou appelez-nous : <a href={`tel:${site.phoneHref}`} className="font-semibold text-white">{site.phone}</a>
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-3xl shadow-2xl lg:block">
            <MachineIllustration category="articulee" className="w-full" />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div key={a.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="h-10 w-10 rounded-lg bg-brand-100" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-10 w-10 p-2 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h2 className="mt-4 font-bold text-ink-900">{a.title}</h2>
              <p className="mt-2 text-sm text-ink-700">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="section-title">Nos nacelles les plus demandées</h2>
              <p className="mt-3 text-ink-700">Une flotte récente pour tous les types de travaux en hauteur.</p>
            </div>
            <Link href="/catalogue" className="font-semibold text-brand-600 hover:underline">
              Tout le catalogue →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((m) => (
              <MachineCard key={m.slug} machine={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="section-title text-center">Louer en 3 étapes</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-xl font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-ink-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-500">
        <div className="container-page flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Un chantier en vue ?</h2>
            <p className="mt-2 text-brand-50">Recevez votre devis personnalisé sous 2 heures ouvrées.</p>
          </div>
          <Link href="/devis" className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 shadow hover:bg-brand-50">
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
