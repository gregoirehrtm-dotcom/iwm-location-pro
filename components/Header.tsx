"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const NAV = [
  { href: "/models", label: "Modèles" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary" onClick={() => setOpen(false)}>
          IWM-LOCATION
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="font-medium hover:text-primary">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${COMPANY.phoneHref}`} className="hidden items-center gap-2 font-semibold md:flex">
            <Phone size={18} aria-hidden /> {COMPANY.phone}
          </a>
          <Link href="/booking" className="btn btn-accent hidden sm:inline-flex">Réserver</Link>
          <button
            className="flex h-12 w-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Navigation mobile" className="border-t border-line bg-white lg:hidden">
          <ul className="container-x py-2">
            {[...NAV, { href: "/booking", label: "Réserver" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-3 text-lg font-medium" onClick={() => setOpen(false)}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
