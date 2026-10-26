import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${site.name} pour la location de votre nacelle élévatrice.`,
};

export default function ContactPage() {
  const items = [
    { label: "Téléphone", value: site.phone, href: `tel:${site.phoneHref}` },
    { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { label: "Adresse", value: site.address },
    { label: "Horaires", value: site.hours },
  ];

  return (
    <div className="container-page py-14">
      <h1 className="section-title">Contactez-nous</h1>
      <p className="mt-3 max-w-2xl text-ink-700">
        Une question sur une machine, une disponibilité ou un tarif ? Notre équipe vous répond.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{item.label}</p>
            {item.href ? (
              <a href={item.href} className="mt-2 block break-words font-semibold text-ink-900 hover:text-brand-600">{item.value}</a>
            ) : (
              <p className="mt-2 font-semibold text-ink-900">{item.value}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-2xl bg-brand-50 p-8 text-center">
        <p className="text-lg font-semibold text-ink-900">Vous avez déjà un projet précis ?</p>
        <Link href="/devis" className="btn-primary mt-4">Faire une demande de devis</Link>
      </div>
    </div>
  );
}
