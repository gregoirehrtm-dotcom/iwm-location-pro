import type { Metadata } from "next";
export const metadata: Metadata = { title: "À propos" };
export default function About() {
  return (
    <div className="container">
      <h1>À propos d&apos;IWM Location</h1>
      <p>IWM Location est une entreprise jurassienne basée à Porrentruy, spécialisée dans la location de nacelles élévatrices pour les professionnels et les particuliers.</p>
      <h2>Notre histoire</h2>
      <p>Née du constat que l&apos;accès à du matériel de travail en hauteur fiable et abordable restait compliqué dans la région, IWM Location propose une gamme de nacelles de 6 à 12 mètres, entretenues avant chaque location, avec des tarifs transparents et dégressifs.</p>
      <h2>Nos engagements</h2>
      <ul><li>Matériel contrôlé et propre</li><li>Prix clairs, sans surprise</li><li>Dépannage 24/24</li><li>Instruction à la machine à chaque remise</li></ul>
    </div>
  );
}
