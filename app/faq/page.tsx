import type { Metadata } from "next";
import { FAQ } from "@/lib/constants";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = { title: "FAQ" };

export default function Faq() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="container">
      <h1>Questions fréquentes</h1>
      <FaqList />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
