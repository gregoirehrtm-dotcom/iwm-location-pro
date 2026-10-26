import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { getModel } from "@/lib/models";

export default function ModelPage({ slug }: { slug: string }) {
  const model = getModel(slug);
  if (!model) notFound();
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">{model.name}</h1>
      <p>{model.description}</p>
      <ul>
        <li>Hauteur de travail : {model.height}</li>
        <li>Capacité : {model.capacity}</li>
      </ul>
      <ContactForm model={model.slug} />
    </main>
  );
}
