import Link from "next/link";
import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import ProductCard from "@/components/ProductCard";
import PriceEstimator from "@/components/PriceEstimator";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import { MODELS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <section className="section">
        <h2 className="text-center">Nos nacelles</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{MODELS.map((m) => <ProductCard key={m.id} model={m} />)}</div>
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-16"><PriceEstimator /></section>
      <Testimonials />
      <section className="section pt-0">
        <h2 className="mb-8 text-center">Questions fréquentes</h2>
        <FAQSection limit={6} searchable={false} />
        <p className="mt-6 text-center"><Link href="/faq" className="text-primary underline">Toutes les questions</Link></p>
      </section>
      <section className="bg-primary text-center text-white">
        <div className="section">
          <h2 className="text-white">Prêt à réserver ?</h2>
          <p className="mt-3">Réservez en 4 étapes simples.</p>
          <Link href="/booking" className="btn-accent mt-6">Réserver maintenant</Link>
        </div>
      </section>
    </>
  );
}
