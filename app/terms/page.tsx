import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions générales de location" };

export default function Page() {
  return (
    <div className="section container-x max-w-3xl">
      <h1>Conditions générales de location</h1>
      <p className="mt-4">Les conditions générales de location sont en cours de rédaction. Elles seront disponibles avant la signature de votre contrat. En attendant, contactez-nous pour toute question.</p>
    </div>
  );
}
