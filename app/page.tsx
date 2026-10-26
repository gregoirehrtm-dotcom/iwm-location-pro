import ModelCard from "@/components/ModelCard";
import ContactForm from "@/components/ContactForm";
import { models } from "@/lib/models";

export default function Home() {
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">IWM Location</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((m) => (
          <ModelCard key={m.slug} model={m} />
        ))}
      </div>
      <h2 className="text-2xl font-semibold">Contact</h2>
      <ContactForm />
    </main>
  );
}
