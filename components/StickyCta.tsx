import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-line bg-white p-2 lg:hidden">
      <a href={`tel:${COMPANY.phoneHref}`} className="btn btn-outline !min-h-12 !px-2"><Phone size={18} aria-hidden />Appeler</a>
      <a href={COMPANY.whatsappHref} className="btn btn-outline !min-h-12 !px-2"><MessageCircle size={18} aria-hidden />WhatsApp</a>
      <Link href="/booking" className="btn btn-accent !min-h-12 !px-2">Réserver</Link>
    </div>
  );
}
