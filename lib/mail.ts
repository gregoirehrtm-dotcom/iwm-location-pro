import nodemailer from "nodemailer";
import { SITE } from "./constants";
import { escapeHtml } from "./utils";

export async function sendMail(subject: string, fields: Record<string, string>, replyTo?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.MAIL_TO ?? SITE.email;
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #e5e7eb">${escapeHtml(k)}</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px"><h2 style="color:#0f3d6b">${escapeHtml(subject)}</h2><table style="border-collapse:collapse;width:100%">${rows}</table><p style="color:#6b7280;font-size:12px">${SITE.name} – ${SITE.address}</p></div>`;
  const text = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
  if (!SMTP_HOST) {
    console.warn("SMTP non configuré : email non envoyé");
    return { sent: false };
  }
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  await transport.sendMail({ from: process.env.MAIL_FROM ?? to, to, replyTo, subject: `[${SITE.name}] ${subject}`, text, html });
  return { sent: true };
}
