"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch { setStatus("error"); }
  }
  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <div><label className="label" htmlFor="c-name">Nom</label><input id="c-name" name="name" required maxLength={100} className="input" /></div>
      <div><label className="label" htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required className="input" /></div>
      <div><label className="label" htmlFor="c-phone">Téléphone (optionnel)</label><input id="c-phone" name="phone" type="tel" className="input" /></div>
      <div><label className="label" htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" required maxLength={2000} rows={5} className="input h-auto py-3" /></div>
      <button className="btn-primary w-full" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : "Envoyer"}</button>
      {status === "ok" && <p role="status" className="text-success">Message envoyé, merci !</p>}
      {status === "error" && <p role="alert" className="text-red-600">Une erreur est survenue. Vérifiez les champs et réessayez.</p>}
    </form>
  );
}
