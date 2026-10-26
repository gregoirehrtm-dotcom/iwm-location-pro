const steps = [
  { title: "Votre demande", text: "En ligne, par téléphone ou sur WhatsApp. Nous vérifions avec vous l’accès et le sol." },
  { title: "Votre devis", text: "Sous 24\u00a0h, détaillé et sans engagement." },
  { title: "Le contrat", text: "Signé en ligne, sans déplacement." },
  { title: "La nacelle", text: "Livrée sur chantier ou retirée au dépôt, avec la prise en main." },
];

export default function Steps() {
  return (
    <section className="section" id="etapes" aria-labelledby="t-etapes">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-etapes">Comment ça marche</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="n" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
