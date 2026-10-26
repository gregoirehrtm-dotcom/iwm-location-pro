"use client";

import { useEffect, useState } from "react";

// Ouverture du dépôt de Porrentruy, à l'heure de Zurich : 7h00–12h00 et 13h30–17h30, du lundi au vendredi
function depotStatus(now: Date): { open: boolean; text: string } {
  let weekday = "Mon";
  let minutes = 9 * 60;
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Zurich",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    weekday = get("weekday");
    minutes = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
  } catch {
    // Fuseau indisponible : on garde un statut neutre ci-dessous
  }
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(weekday);
  if (day < 0 || day > 4) return { open: false, text: "Dépôt fermé, réouverture lundi à 7h00" };
  if (minutes >= 420 && minutes < 720) return { open: true, text: "Dépôt ouvert jusqu’à 12h00" };
  if (minutes >= 810 && minutes < 1050) return { open: true, text: "Dépôt ouvert jusqu’à 17h30" };
  if (minutes < 420) return { open: false, text: "Dépôt fermé, ouverture à 7h00" };
  if (minutes < 810) return { open: false, text: "Pause de midi, réouverture à 13h30" };
  return { open: false, text: day === 4 ? "Dépôt fermé, réouverture lundi à 7h00" : "Dépôt fermé, réouverture demain à 7h00" };
}

export default function DepotStatus() {
  const [status, setStatus] = useState({ open: false, text: "Dépôt ouvert du lundi au vendredi" });

  useEffect(() => {
    const update = () => setStatus(depotStatus(new Date()));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className={`status${status.open ? " open" : ""}`}>
      <span className="dot" aria-hidden="true" />
      <span>{status.text}</span>
    </p>
  );
}
