import type { Metadata } from "next";
import Form from "@/components/Form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h1>Contact</h1>
      <p>{SITE.address}<br />Tél. <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a> · <a href={SITE.whatsapp}>WhatsApp</a><br />Dépannage 24/24.</p>
      <Form endpoint="/api/contact" event="contact_submit" submitLabel="Envoyer">
        <label htmlFor="name">Nom</label><input id="name" name="name" required maxLength={100} autoComplete="name" />
        <label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" />
        <label htmlFor="phone">Téléphone</label><input id="phone" name="phone" type="tel" autoComplete="tel" />
        <label htmlFor="message">Message</label><textarea id="message" name="message" rows={5} required minLength={5} maxLength={3000} />
      </Form>
    </div>
  );
}
