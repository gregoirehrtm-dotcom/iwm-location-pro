import Link from "next/link";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white p-3 md:hidden">
      <Link href="/booking" className="btn-accent w-full">Réserver une nacelle</Link>
    </div>
  );
}
