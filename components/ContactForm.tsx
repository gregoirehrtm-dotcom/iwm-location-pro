"use client";
import { useState } from "react";

export default function ContactForm({ model }: { model?: string }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      model: model || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("Merci! Nous vous recontacterons bientôt.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Erreur. Veuillez réessayer.");
      }
    } catch {
      setStatus("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="name"
        placeholder="Nom"
        required
        className="w-full border rounded p-3"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full border rounded p-3"
      />
      <input
        name="phone"
        type="tel"
        placeholder="Téléphone"
        className="w-full border rounded p-3"
      />
      <textarea
        name="message"
        placeholder="Message"
        rows={4}
        required
        className="w-full border rounded p-3"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>
      {status && <p className="text-sm text-center">{status}</p>}
    </form>
  );
}
