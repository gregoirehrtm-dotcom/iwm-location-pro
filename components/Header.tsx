"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import DepotStatus from "./DepotStatus";
import Icon from "./Icon";

const sections = [
  { id: "nacelles", label: "Nacelles" },
  { id: "tarifs", label: "Tarifs" },
  { id: "services", label: "Services" },
  { id: "livraison", label: "Livraison" },
  { id: "faq", label: "Questions" },
  { id: "contact", label: "Contact" },
];

/** Sur l'accueil, liens d'ancre vers les sections ; sur les autres pages, liens vers l'accueil. */
export default function Header({ onHome = true }: { onHome?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section en cours de lecture, soulignée dans le menu
  useEffect(() => {
    if (!onHome || !("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [onHome]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap bar">
        <a className="logo" href={onHome ? "#accueil" : "/"} aria-label="IWM Location, accueil">
          <i aria-hidden="true" />
          <b>IWM</b>
          <span>Location</span>
        </a>
        <nav className="nav" aria-label="Menu principal">
          {sections.map(({ id, label }) => (
            <a key={id} href={href(id)} aria-current={current === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="bar-actions">
          <a className="tel num" href={site.phoneHref}>
            <Icon name="phone" />
            {site.phone}
          </a>
          <a className="btn btn-primary btn-sm btn-head" href={href("devis")}>
            Demander un devis
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <div className="menu" id="menu" hidden={!open}>
        <div className="wrap">
          <nav aria-label="Menu mobile">
            <a href={href("hauteur")} onClick={close}>Quelle nacelle choisir</a>
            {sections.map(({ id, label }) => (
              <a key={id} href={href(id)} onClick={close}>
                {label}
              </a>
            ))}
          </nav>
          <DepotStatus />
          <p>
            Dépannage 24&nbsp;h/24, 7&nbsp;j/7 au <span className="num">{site.phone}</span>
          </p>
        </div>
      </div>
    </header>
  );
}
