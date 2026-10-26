import type { Metadata } from "next";
import CatalogueGrid from "@/components/CatalogueGrid";

export const metadata: Metadata = {
  title: "Catalogue des nacelles",
  description: "Toutes nos nacelles élévatrices à la location : ciseaux, articulées, télescopiques, araignées et camions.",
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;

  return (
    <div className="container-page py-14">
      <h1 className="section-title">Catalogue des nacelles</h1>
      <p className="mt-3 max-w-2xl text-ink-700">
        Tarifs indicatifs HT, hors livraison. Tarifs dégressifs pour les locations longue durée.
      </p>
      <div className="mt-10">
        <CatalogueGrid key={categorie ?? "all"} initialCategory={categorie} />
      </div>
    </div>
  );
}
