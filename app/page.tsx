import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ModelCard from "@/components/ModelCard";
import PriceEstimator from "@/components/PriceEstimator";
import ContactForm from "@/components/ContactForm";
import { models } from "@/lib/models";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Nos Modèles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Estimateur de Prix</h2>
            <PriceEstimator />
          </div>
        </section>

        <section className="py-12 px-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Demande de Devis</h2>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
