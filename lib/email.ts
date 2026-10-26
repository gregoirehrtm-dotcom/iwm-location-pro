import { models } from "@/lib/models";

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  model?: string;
};

// Envoie la demande par e-mail via Resend (https://resend.com).
// Sans RESEND_API_KEY ni CONTACT_EMAIL_TO, la demande est seulement écrite dans les logs.
export async function sendContactEmail(data: ContactRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    console.log("Contact (envoi d'e-mail non configuré):", data);
    return;
  }

  const modelName = models.find((m) => m.slug === data.model)?.name ?? data.model;
  const subject = `Demande de devis${modelName ? ` – ${modelName}` : ""} – ${data.name}`.replace(/[\r\n]+/g, " ");
  const text = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone || "—"}`,
    `Modèle : ${modelName || "—"}`,
    "",
    data.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_EMAIL_FROM || "IWM Location <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend a répondu ${res.status} : ${await res.text()}`);
  }
}
