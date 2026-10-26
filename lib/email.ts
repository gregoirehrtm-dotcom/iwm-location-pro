import { getModel } from "@/lib/models";
import { quoteSummary, type QuoteRequest } from "@/lib/quote";

// Envoie la demande de devis par e-mail via Resend (https://resend.com).
// Sans RESEND_API_KEY ni CONTACT_EMAIL_TO, la demande est seulement écrite dans les logs.
export async function sendQuoteEmail(q: QuoteRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const text = quoteSummary(q);

  if (!apiKey || !to) {
    console.log("Demande de devis (envoi d'e-mail non configuré):\n" + text);
    return;
  }

  const modelName = getModel(q.model)?.name ?? q.model;
  const subject = `Demande de devis – ${modelName} – ${q.name}`.replace(/[\r\n]+/g, " ");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_EMAIL_FROM || "IWM Location <onboarding@resend.dev>",
      to: [to],
      reply_to: q.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend a répondu ${res.status} : ${await res.text()}`);
  }
}
