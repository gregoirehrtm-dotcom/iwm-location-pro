"use client";
import { useState } from "react";

export default function ContactForm({ model }: { model?: string }) {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, model }),
    });
    setStatus(res.ok ? "Demande envoyée !" : "Erreur, veuillez réessayer.");
    if (res.ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-md">
      <input name="name" placeholder="Nom" required className="w-full border p-2" />
      <input name="email" type="email" placeholder="Email" required className="w-full border p-2" />
      <textarea name="message" placeholder="Message" required className="w-full border p-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Envoyer</button>
      {status && <p>{status}</p>}
    </form>
  );
}
