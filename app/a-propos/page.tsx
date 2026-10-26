import type { Metadata } from "next";
import Link from "next/link";
import { machines } from "@/lib/machines";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `${site.name}, spécialiste de la location de nacelles élévatrices.`,
};

export default function AboutPage() {
  const stats = [
    { value: `${machines.length}+`, label: "modèles de nacelles" },
    { value: `${Math.max(...machines.map((m) => m.workingHeight))} m`, label: "de hauteur de travail max." },
    { value: "2 h", label: "pour recevoir votre devis" },
  ];

  return (
    <div className="container-page py-14">
      <div className="max-w-3xl">
        <h1 className="section-title">À propos d&apos;{site.name}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-700">
          {site.name} accompagne les artisans, entreprises du BTP, collectivités et particuliers dans tous leurs
          travaux en hauteur. Nous mettons à disposition une flotte de nacelles entretenues et contrôlées, avec un
          conseil personnalisé pour choisir la machine la plus adaptée à votre chantier.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          La sécurité est au cœur de notre métier : chaque machine est vérifiée avant départ, et nos équipes vous
          expliquent sa prise en main à la livraison.
        </p>
      </div>
      <dl className="mt-12 grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-ink-900 p-8 text-center text-white">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-4xl font-extrabold text-brand-500">{s.value}</dd>
            <dd className="mt-2 text-slate-300">{s.label}</dd>
          </div>
        ))}
      </dl>
      <Link href="/catalogue" className="btn-primary mt-12">Découvrir nos nacelles</Link>
    </div>
  );
}
