import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1>Contact</h1>
        <p className="mt-6">{COMPANY.address}</p>
        <p><a className="text-primary" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a></p>
        <p><a className="text-primary" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
        <p>{COMPANY.hours}</p>
      </div>
      <ContactForm />
    </div>
  );
}
