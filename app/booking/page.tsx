import type { Metadata } from "next";
import Form from "@/components/Form";
import { MODELS } from "@/lib/constants";

export const metadata: Metadata = { title: "Réservation" };

export default function Booking() {
  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h1>Réserver une nacelle</h1>
      <Form endpoint="/api/booking" event="booking_submit" submitLabel="Envoyer ma demande">
        <label htmlFor="model">Modèle</label>
        <select id="model" name="model" required>{MODELS.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}</select>
        <label htmlFor="start">Début</label><input id="start" name="start" type="date" required />
        <label htmlFor="end">Fin</label><input id="end" name="end" type="date" required />
        <label htmlFor="delivery">Livraison (adresse) – vide pour retrait au dépôt</label><input id="delivery" name="delivery" maxLength={300} />
        <label htmlFor="name">Nom</label><input id="name" name="name" required maxLength={100} autoComplete="name" />
        <label htmlFor="company">Société</label><input id="company" name="company" maxLength={150} autoComplete="organization" />
        <label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" />
        <label htmlFor="phone">Téléphone</label><input id="phone" name="phone" type="tel" autoComplete="tel" />
        <label htmlFor="notes">Remarques</label><textarea id="notes" name="notes" rows={4} maxLength={2000} />
        <p>Documents requis à la remise : pièce d&apos;identité, assurance RC, registre du commerce (entreprises).</p>
      </Form>
    </div>
  );
}
