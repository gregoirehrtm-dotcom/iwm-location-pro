import type { Metadata } from "next";
export const metadata: Metadata = { title: "Conditions générales de location" };
export default function Terms() {
  const s: [string, string][] = [
    ["1. Champ d'application", "Les présentes conditions régissent toute location de nacelles élévatrices conclue avec IWM Location, Chemin des Grandes-Vies 19, 2900 Porrentruy."],
    ["2. Conclusion du contrat", "Le contrat est conclu à l'acceptation de la demande de réservation par IWM Location et à la signature du protocole de remise."],
    ["3. Prix et paiement", "Les prix sont indiqués en francs suisses, hors TVA. Le barème dégressif s'applique par jour de location. Paiement à 30 jours net sur facture, sauf accord contraire."],
    ["4. Remise et restitution", "La machine est remise en état de marche et restituée propre dans le même état, à la date convenue. Tout retard est facturé au tarif journalier en vigueur."],
    ["5. Obligations du locataire", "Le locataire utilise la machine conformément à son mode d'emploi, porte un harnais, respecte les limites de charge et de vent et ne la sous-loue pas."],
    ["6. Assurance et responsabilité", "Le locataire dispose d'une assurance responsabilité civile et répond des dommages, pertes ou vols survenant durant la location, sauf usure normale."],
    ["7. Annulation", "Annulation gratuite jusqu'à 48 heures avant le début de la location ; au-delà, une journée de location peut être facturée."],
    ["8. Pannes", "En cas de panne, le locataire contacte immédiatement le service de dépannage au 076 361 66 14. Les réparations dues à une mauvaise utilisation sont à sa charge."],
    ["9. Droit applicable et for", "Le droit suisse est applicable. Le for est à Porrentruy, sous réserve de dispositions impératives."],
  ];
  return (
    <div className="container">
      <h1>Conditions générales de location</h1>
      {s.map(([t, p]) => <section key={t}><h2>{t}</h2><p>{p}</p></section>)}
      <p><em>Ce texte est un modèle : à faire valider par un juriste avant mise en production.</em></p>
    </div>
  );
}
