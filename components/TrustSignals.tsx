const items = [
  ["Machines contrôlées", "Inspection avant chaque location"],
  ["Livraison rapide", "Partout en Suisse"],
  ["Prix transparents", "Rabais progressifs automatiques"],
  ["Support réactif", "Assistance du lundi au vendredi"],
];

export default function TrustSignals() {
  return (
    <section className="bg-primary-light">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([t, d]) => (
          <div key={t}><p className="font-semibold text-primary-dark"><span className="text-success">✓</span> {t}</p><p className="text-sm text-slate-600">{d}</p></div>
        ))}
      </div>
    </section>
  );
}
