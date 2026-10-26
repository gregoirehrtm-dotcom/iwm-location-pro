import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section container-x text-center">
      <h1>Page introuvable</h1>
      <p className="mt-4 text-muted">Cette page n’existe pas ou a été déplacée.</p>
      <Link href="/" className="btn btn-primary mt-8">Retour à l’accueil</Link>
    </div>
  );
}
