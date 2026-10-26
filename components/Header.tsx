import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const links = [
  { href: "/models", label: "Modèles" }, { href: "/pricing", label: "Tarifs" }, { href: "/faq", label: "FAQ" },
  { href: "/about", label: "À propos" }, { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="text-xl font-bold text-primary">IWM <span className="text-alert">Location</span></Link>
        <nav aria-label="Navigation principale" className="order-3 flex w-full gap-4 overflow-x-auto text-sm font-medium md:order-none md:w-auto">
          {links.map((l) => <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-primary">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hidden text-sm font-semibold text-primary lg:block">{COMPANY.phone}</a>
          <Link href="/booking" className="rounded-lg bg-alert px-4 py-2 text-sm font-semibold text-white">Réserver</Link>
        </div>
      </div>
    </header>
  );
}
