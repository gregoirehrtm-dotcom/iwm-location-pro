import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { getMachine } from "@/lib/machines";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Devis gratuit",
  description: "Demandez votre devis de location de nacelle élévatrice. Réponse sous 2 heures ouvrées.",
};

export default async function DevisPage({ searchParams }: { searchParams: Promise<{ machine?: string }> }) {
  const { machine } = await searchParams;
  const defaultMachine = machine && getMachine(machine) ? machine : undefined;

  return (
    <div className="container-page grid gap-12 py-14 lg:grid-cols-3">
      <div>
        <h1 className="section-title">Demande de devis</h1>
        <p className="mt-4 text-ink-700">
          Décrivez votre besoin, nous vous répondons sous 2 heures ouvrées avec une offre adaptée.
        </p>
        <div className="mt-8 rounded-2xl bg-ink-900 p-6 text-white">
          <p className="font-semibold">Besoin urgent ?</p>
          <a href={`tel:${site.phoneHref}`} className="mt-2 block text-2xl font-bold text-brand-500">{site.phone}</a>
          <p className="mt-2 text-sm text-slate-300">{site.hours}</p>
        </div>
      </div>
      <div className="lg:col-span-2">
        <QuoteForm defaultMachine={defaultMachine} />
      </div>
    </div>
  );
}
