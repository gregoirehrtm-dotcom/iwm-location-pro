import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold">IWM-LOCATION</p>
          <p className="mt-2 text-gray-300">
            Location de nacelles ciseaux électriques neuves, de 5,80 à 12 m, depuis Porrentruy dans toute la Suisse.
          </p>
        </div>
        <div>
          <h2 className="text-base">Société</h2>
          <address className="mt-2 not-italic text-gray-300">
            {COMPANY.legalName}<br />
            {COMPANY.address}, {COMPANY.postalCode} {COMPANY.city}<br />
            IDE {COMPANY.ide}<br />
            <a className="underline" href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a><br />
            <a className="underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </address>
        </div>
        <nav aria-label="Pied de page">
          <h2 className="text-base">Raccourcis</h2>
          <ul className="mt-2 space-y-1 text-gray-300">
            {[["/models", "Trouver ma nacelle"], ["/pricing", "Tarifs"], ["/booking", "Réserver"], ["/faq", "Questions fréquentes"], ["/terms", "Conditions générales"], ["/privacy", "Confidentialité"]].map(([h, l]) => (
              <li key={h}><Link className="inline-block py-1 hover:underline" href={h}>{l}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-t border-gray-700 py-4 text-center text-sm text-gray-300">© {new Date().getFullYear()} IWM Location</p>
    </footer>
  );
}
