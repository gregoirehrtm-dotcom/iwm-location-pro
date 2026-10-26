import type { Metadata } from "next";

export const metadata: Metadata = { title: "À propos" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1>À propos</h1>
      <p>IWM Location loue des nacelles élévatrices de 6 à 12 mètres aux professionnels et particuliers de toute la Suisse. Notre promesse : du matériel contrôlé, des prix transparents et un service réactif.</p>
      <p>Notre dépôt est situé à Meyrin (Genève) et nous livrons dans toute la Suisse.</p>
    </div>
  );
}
