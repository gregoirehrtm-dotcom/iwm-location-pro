import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { models } from "@/lib/models";

export async function generateStaticParams() {
  return models.map((m) => ({ model: m.slug }));
}

export default async function ModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model: slug } = await params;
  const model = models.find((m) => m.slug === slug);
  
  if (!model) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{model.name}</h1>
        <p className="text-lg text-gray-600 mb-8">{model.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Spécifications</h2>
            <ul className="space-y-3">
              <li><strong>Hauteur:</strong> {model.height}</li>
              <li><strong>Capacité:</strong> {model.capacity}</li>
              <li><strong>Prix/jour:</strong> CHF {model.pricePerDay}</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Demande</h2>
            <ContactForm model={model.slug} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
