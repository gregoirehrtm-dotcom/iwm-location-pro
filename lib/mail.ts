import nodemailer from "nodemailer";
import { COMPANY } from "./constants";
import { escapeHtml } from "./utils";

export interface MailAttachment { filename: string; content: Buffer; contentType?: string }

export function wrapHtml(title: string, body: string): string {
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto"><h2 style="color:#2B5A7B">${escapeHtml(title)}</h2>${body}<hr><p style="color:#888;font-size:12px">${COMPANY.name} – ${COMPANY.address}</p></div>`;
}

export async function sendMail(opts: { to?: string; subject: string; html: string; replyTo?: string; attachments?: MailAttachment[] }): Promise<{ sent: boolean }> {
  const to = opts.to ?? process.env.MAIL_TO ?? COMPANY.email;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
  if (!SMTP_HOST) {
    console.log("[mail:fallback] SMTP not configured", { to, subject: opts.subject, attachments: opts.attachments?.map((a) => a.filename) });
    return { sent: false };
  }
  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST, port, secure: port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  await transporter.sendMail({ from: MAIL_FROM ?? `${COMPANY.name} <${COMPANY.email}>`, to, replyTo: opts.replyTo, subject: opts.subject, html: opts.html, attachments: opts.attachments });
  return { sent: true };
}
