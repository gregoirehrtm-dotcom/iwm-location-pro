import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import { COMPANY, FAQ } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Documents, assurance, livraison, formation, dépannage : toutes les réponses sur la location de nacelles IWM.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function FaqPage() {
  return (
    <div className="section container-x max-w-3xl">
      <h1>Questions fréquentes</h1>
      <p className="mt-2 mb-8 text-muted">Une autre question ? Appelez-nous au {COMPANY.phone} ou écrivez-nous sur WhatsApp.</p>
      <FAQSection searchable />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
