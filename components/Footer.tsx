import Link from "next/link";
import { categoryLabels } from "@/lib/machines";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed">{site.tagline}.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Nos nacelles</p>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <li key={key}>
                <Link href={`/catalogue?categorie=${key}`} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Entreprise</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/a-propos" className="hover:text-white">À propos</Link></li>
            <li><Link href="/devis" className="hover:text-white">Demander un devis</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-white">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
