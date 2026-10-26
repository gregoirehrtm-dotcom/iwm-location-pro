import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { MODELS } from "@/lib/constants";

export const metadata: Metadata = { title: "Nos modèles de nacelles" };

export default function Models() {
  return (
    <div className="section">
      <h1>Nos modèles</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{MODELS.map((m) => <ProductCard key={m.id} model={m} />)}</div>
    </div>
  );
}
