"use client";
import Form from "./Form";

export default function NewsletterForm() {
  return (
    <Form endpoint="/api/newsletter" event="newsletter_signup" submitLabel="S'inscrire à la newsletter">
      <label htmlFor="nl">Votre email</label>
      <input id="nl" name="email" type="email" required autoComplete="email" style={{ maxWidth: 360 }} />
    </Form>
  );
}
