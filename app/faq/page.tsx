import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = { title: "FAQ" };

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8">Questions fréquentes</h1>
      <FAQSection />
    </div>
  );
}
