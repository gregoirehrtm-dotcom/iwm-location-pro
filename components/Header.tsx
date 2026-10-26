"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink-900" onClick={() => setOpen(false)}>
          <span className="grid h-9 place-items-center rounded-lg bg-brand-500 px-2 text-sm text-white">IWM</span>
          <span className="text-lg">Location</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-brand-600 ${
                pathname.startsWith(link.href) ? "text-brand-600" : "text-ink-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneHref}`} className="text-sm font-semibold text-ink-900">
            {site.phone}
          </a>
          <Link href="/devis" className="btn-primary">
            Devis gratuit
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink-900 md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden" aria-label="Navigation mobile">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 font-medium text-ink-800 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${site.phoneHref}`} className="px-3 py-2 font-semibold text-ink-900">
              {site.phone}
            </a>
            <Link href="/devis" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Devis gratuit
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
