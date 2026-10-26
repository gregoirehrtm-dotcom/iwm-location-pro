import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <Link href="/" className="text-2xl font-bold">IWM Location</Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-blue-200">Accueil</Link>
          <Link href="/#modeles" className="hover:text-blue-200">Modèles</Link>
          <Link href="/#tarifs" className="hover:text-blue-200">Tarifs</Link>
          <Link href="/#devis" className="bg-white text-primary px-4 py-1 rounded font-bold hover:bg-gray-100">Devis</Link>
        </nav>
      </div>
    </header>
  );
}
