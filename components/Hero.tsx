import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-light to-white">
      <div className="section text-center">
        <h1>Location de nacelles élévatrices en Suisse</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">Dès CHF 30 par jour. Rabais automatiques de 10 % dès le 8e jour et 20 % dès le 29e jour.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/booking" className="btn-accent">Réserver maintenant</Link>
          <Link href="/models" className="btn-outline">Voir les modèles</Link>
        </div>
      </div>
    </section>
  );
}
