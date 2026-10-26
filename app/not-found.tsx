import Link from "next/link";
export default function NotFound() {
  return <div className="container"><h1>Page introuvable</h1><p><Link href="/">Retour à l&apos;accueil</Link></p></div>;
}
