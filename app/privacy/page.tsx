import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1>Politique de confidentialité</h1>
      <p>Nous collectons uniquement les données nécessaires au traitement de vos demandes (nom, email, téléphone, adresse, documents d&apos;identification).</p>
      <p>Ces données ne sont jamais vendues et sont conservées le temps nécessaire à la gestion de la location et aux obligations légales (LPD).</p>
      <p>Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données à info@iwm-location.ch.</p>
    </div>
  );
}
