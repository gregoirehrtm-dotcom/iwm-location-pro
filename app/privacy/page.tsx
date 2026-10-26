import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Page() {
  return (
    <div className="section container-x max-w-3xl">
      <h1>Politique de confidentialité</h1>
      <p className="mt-4">Les données transmises par les formulaires (nom, e-mail, téléphone, documents) servent uniquement à établir votre devis et votre contrat de location. Elles ne sont pas transmises à des tiers. Pour toute demande d’accès ou de suppression, écrivez à nacelles@iwm-location.ch. Version complète en préparation.</p>
    </div>
  );
}
