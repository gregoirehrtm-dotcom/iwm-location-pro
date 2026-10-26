import nodemailer from "nodemailer";
import { COMPANY } from "./constants";

export interface MailInput {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}

/**
 * Sends through SMTP when SMTP_HOST is configured; otherwise logs to the
 * server console (development). See README for environment variables.
 */
export async function sendMail({ subject, text, replyTo, attachments }: MailInput) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log(`[mail:dev] ${subject}\n${text}`);
    return { delivered: false };
  }
  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? COMPANY.email,
    to: process.env.MAIL_TO ?? COMPANY.email,
    replyTo,
    subject,
    text,
    attachments,
  });
  return { delivered: true };
}
