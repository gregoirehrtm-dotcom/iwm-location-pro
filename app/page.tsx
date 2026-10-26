import Link from "next/link";
import { Check } from "lucide-react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import PriceEstimator from "@/components/PriceEstimator";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import { COMPANY, INCLUDED, MODELS, STEPS, USE_CASES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section" aria-labelledby="modeles">
        <div className="container-x">
          <h2 id="modeles">Quatre nacelles électriques, de 5,80 à 12 m</h2>
          <p className="mt-2 max-w-2xl text-muted">Toutes neuves, de l’année 2026, dessinées à la même échelle. La hauteur de travail correspond à la hauteur de plancher plus 2 m.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MODELS.map((m) => <ProductCard key={m.slug} model={m} />)}
          </div>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <PriceEstimator />
          <div>
            <h2>Compris dans le prix</h2>
            <ul className="mt-4 space-y-3">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-3"><Check className="mt-1 shrink-0 text-success-dark" aria-hidden />{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="etapes">
        <div className="container-x">
          <h2 id="etapes">Réservée en quatre étapes</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card">
                <span className="text-3xl font-bold text-primary">{i + 1}</span>
                <h3 className="!text-xl">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section bg-surface" aria-labelledby="travaux">
        <div className="container-x">
          <h2 id="travaux">Pour quels travaux ?</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <li key={u.title} className="card"><strong>{u.title}</strong><br /><span className="text-muted">Exemple : {u.example}</span></li>
            ))}
          </ul>
        </div>
      </section>
      <Testimonials />
      <section className="section" aria-labelledby="faq">
        <div className="container-x max-w-3xl">
          <h2 id="faq">Questions fréquentes</h2>
          <div className="mt-6"><FAQSection limit={5} /></div>
          <Link href="/faq" className="mt-4 inline-block font-semibold text-primary underline">Toutes les questions</Link>
        </div>
      </section>
      <section className="bg-primary py-12 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2>Réservez votre nacelle</h2>
            <p>Deux minutes, devis sous 24 h, sans engagement. Une question ? {COMPANY.phone}</p>
          </div>
          <Link href="/booking" className="btn btn-accent">Réserver Maintenant</Link>
        </div>
      </section>
    </>
  );
}
