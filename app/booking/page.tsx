import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = { title: "Réservation" };

export default async function Booking({ searchParams }: { searchParams: Promise<{ model?: string }> }) {
  const { model } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8">Réserver une nacelle</h1>
      <BookingForm initialModel={["6m", "8m", "10m", "12m"].includes(model ?? "") ? model : undefined} />
    </div>
  );
}
