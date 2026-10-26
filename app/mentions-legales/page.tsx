import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false } };

export default function LegalPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="section-title">Mentions légales</h1>
      <div className="mt-8 space-y-6 text-ink-700">
        <section>
          <h2 className="text-xl font-bold text-ink-900">Éditeur</h2>
          <p className="mt-2">
            {site.name} — {site.address}<br />
            Téléphone : {site.phone} — E-mail : {site.email}<br />
            {/* À compléter : forme juridique, capital, SIRET, RCS, n° TVA, directeur de publication */}
            SIRET : à compléter
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-ink-900">Hébergement</h2>
          <p className="mt-2">À compléter (nom, adresse et téléphone de l&apos;hébergeur).</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-ink-900">Données personnelles</h2>
          <p className="mt-2">
            Les informations transmises via le formulaire de devis servent uniquement à répondre à votre demande.
            Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification et de suppression en
            écrivant à {site.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
