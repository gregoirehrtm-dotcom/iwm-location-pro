import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions générales" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1>Conditions générales</h1>
      <h3>1. Location</h3><p>La location court de la date de livraison ou de retrait jusqu&apos;au retour de la machine.</p>
      <h3>2. Prix</h3><p>Les prix sont indiqués en CHF hors TVA. Rabais : -10 % dès le 8e jour, -20 % dès le 29e jour.</p>
      <h3>3. Utilisation</h3><p>Le locataire s&apos;engage à utiliser la nacelle conformément aux consignes de sécurité et à ne pas dépasser la charge maximale.</p>
      <h3>4. Annulation</h3><p>Annulation gratuite jusqu&apos;à 48 h avant la livraison.</p>
      <h3>5. Responsabilité</h3><p>Les dommages dus à une mauvaise utilisation sont à la charge du locataire.</p>
      <h3>6. Droit applicable</h3><p>Droit suisse. For : Genève.</p>
    </div>
  );
}
