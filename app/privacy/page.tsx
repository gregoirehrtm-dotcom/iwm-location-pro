import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
export const metadata: Metadata = { title: "Politique de confidentialité" };
export default function Privacy() {
  const s: [string, string][] = [
    ["1. Responsable", `IWM Location, ${SITE.address}, ${SITE.email}.`],
    ["2. Données collectées", "Nom, société, email, téléphone, adresse de livraison et contenu des messages que vous nous transmettez via les formulaires de contact, de réservation et de newsletter."],
    ["3. Finalités", "Traitement des demandes et réservations, facturation, communication et, avec votre accord, envoi de la newsletter."],
    ["4. Conservation", "Les données sont conservées le temps nécessaire à ces finalités et aux obligations légales (10 ans pour les documents comptables)."],
    ["5. Destinataires", "Vos données ne sont pas vendues. Elles peuvent être traitées par nos prestataires techniques (hébergement, messagerie, statistiques)."],
    ["6. Statistiques", "Si activé, Google Analytics 4 mesure l'audience du site de manière agrégée."],
    ["7. Vos droits", "Conformément à la loi fédérale sur la protection des données (LPD), vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous écrivant."],
  ];
  return (
    <div className="container">
      <h1>Politique de confidentialité</h1>
      {s.map(([t, p]) => <section key={t}><h2>{t}</h2><p>{p}</p></section>)}
      <p><em>Ce texte est un modèle : à faire valider par un juriste avant mise en production.</em></p>
    </div>
  );
}
