import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section text-center">
      <h1>404</h1>
      <p className="mt-4">Cette page est introuvable.</p>
      <Link href="/" className="btn-primary mt-8">Retour à l&apos;accueil</Link>
    </div>
  );
}
