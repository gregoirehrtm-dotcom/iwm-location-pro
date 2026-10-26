import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{COMPANY.name}</p>
          <p className="mt-2 text-sm">{COMPANY.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-2">{COMPANY.address}</p>
          <p><a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a></p>
          <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          <p>{COMPANY.hours}</p>
        </div>
        <ul className="space-y-1 text-sm">
          {[["/models", "Modèles"], ["/pricing", "Tarifs"], ["/booking", "Réservation"], ["/faq", "FAQ"], ["/terms", "Conditions générales"], ["/privacy", "Confidentialité"]].map(([h, l]) => (
            <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>
          ))}
        </ul>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.</p>
    </footer>
  );
}
