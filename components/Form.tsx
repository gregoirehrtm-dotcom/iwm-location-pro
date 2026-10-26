"use client";
import { FormEvent, ReactNode, useState } from "react";

export function track(event: string, params: Record<string, string> = {}) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("event", event, params);
}

export default function Form({ endpoint, event, submitLabel, children }: { endpoint: string; event: string; submitLabel: string; children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setToast({ ok: true, msg: "Merci ! Votre demande a bien été envoyée." });
      track(event);
      form.reset();
    } catch (err) {
      setToast({ ok: false, msg: (err as Error).message });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {children}
      <p><button className="btn" disabled={loading}>{loading ? "Envoi en cours…" : submitLabel}</button></p>
      {toast && <div role="status" className={`toast ${toast.ok ? "ok" : "err"}`}>{toast.msg}</div>}
    </form>
  );
}
