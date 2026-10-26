import Link from "next/link";
import type { Metadata } from "next";
import { MODELS } from "@/lib/constants";

export const metadata: Metadata = { title: "Nos nacelles" };

export default function Models() {
  return (
    <div className="container">
      <h1>Nos nacelles</h1>
      <div className="grid">
        {MODELS.map((m) => (
          <Link key={m.slug} href={`/models/${m.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.images[0]} alt={m.name} width={800} height={600} loading="lazy" />
            <h2>{m.name}</h2><p>{m.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
