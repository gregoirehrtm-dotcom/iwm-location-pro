import Image from "next/image";
import { site } from "@/lib/site";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="hero" id="accueil" aria-labelledby="t-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="where">
            <Icon name="pin" />
            Porrentruy, Jura
          </p>
          <h1 className="h1" id="t-hero">Location de nacelles ciseaux électriques</h1>
          <p className="lead">
            Quatre nacelles neuves, de 5,80 à 12&nbsp;m de hauteur de travail. Livrées sur votre chantier partout en
            Suisse, ou à retirer au dépôt.
          </p>
          <div className="cta">
            <a className="btn btn-primary" href="#devis">Demander un devis</a>
            <a className="btn btn-line num" href={site.phoneHref}>
              <Icon name="phone" />
              {site.phone}
            </a>
          </div>
          <ul className="commit">
            <li>
              <Icon name="file" />
              <span><strong>Devis sous 24&nbsp;h</strong><span>sans engagement</span></span>
            </li>
            <li>
              <Icon name="truck" />
              <span><strong>Livraison dès le jour même</strong><span>selon votre NPA</span></span>
            </li>
            <li>
              <Icon name="wrench" />
              <span><strong>Dépannage 24&nbsp;h/24</strong><span>7 jours sur 7</span></span>
            </li>
          </ul>
        </div>
        <figure className="sheet hero-fig">
          <Image
            src="/nacelle-iwm-cut.webp"
            width={900}
            height={857}
            alt="Nacelle ciseaux électrique aux couleurs IWM-LOCATION, plateforme repliée, vue de côté"
            priority
            unoptimized
          />
          <figcaption className="fig-note">Contrôlée avant chaque départ</figcaption>
          <div className="cartouche" aria-hidden="true">
            <span>Nacelle ciseaux électrique</span>
            <span>2026</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
