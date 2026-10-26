"use client";

import { useRef, useState } from "react";
import Icon from "./Icon";

/** Copie un texte ; `fallback` sélectionne le texte d'un champ quand le presse-papiers est refusé */
export default function CopyButton({
  text,
  label = "Copier",
  className = "mini",
  fallback,
}: {
  text: string;
  label?: string;
  className?: string;
  fallback?: () => HTMLTextAreaElement | null;
}) {
  const [shown, setShown] = useState(label);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flash = (message: string) => {
    setShown(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown(label), 1800);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      flash("Copié");
    } catch {
      const field = fallback?.();
      if (field) {
        field.focus();
        field.select();
        flash("Texte sélectionné");
      } else {
        flash("Copie impossible ici");
      }
    }
  };

  return (
    <button className={className} type="button" onClick={copy}>
      <Icon name="copy" />
      <span>{shown}</span>
    </button>
  );
}
