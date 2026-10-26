import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Réserver une nacelle",
  description: "Réservez votre nacelle en quatre étapes. Devis sous 24 h, sans engagement, annulation gratuite jusqu’à 24 h avant.",
};

export default function BookingPage() {
  return (
    <div className="section container-x max-w-3xl">
      <h1>Réservez votre nacelle</h1>
      <p className="mt-2 mb-8 text-muted">Quatre étapes, deux minutes. Devis sous 24 h, sans engagement. Une question ? {COMPANY.phone}</p>
      <Suspense fallback={<p>Chargement…</p>}><BookingForm /></Suspense>
    </div>
  );
}
