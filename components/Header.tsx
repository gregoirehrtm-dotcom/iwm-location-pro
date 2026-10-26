import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">IWM Location</h1>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-blue-200">Accueil</Link>
          <Link href="/" className="hover:text-blue-200">Modèles</Link>
          <Link href="/" className="hover:text-blue-200">Tarifs</Link>
        </nav>
      </div>
    </header>
  );
}
