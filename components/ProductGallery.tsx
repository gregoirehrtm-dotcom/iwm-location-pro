"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ id, name }: { id: string; name: string }) {
  const [i, setI] = useState(1);
  return (
    <div>
      <Image src={`/images/products/${id}-${i}.svg`} alt={`${name} – vue ${i}`} width={800} height={600} unoptimized priority className="w-full rounded-xl border" />
      <div className="mt-3 grid grid-cols-6 gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Vue ${n}`} className={`overflow-hidden rounded border-2 ${n === i ? "border-primary" : "border-transparent"}`}>
            <Image src={`/images/products/${id}-${n}.svg`} alt="" width={160} height={120} loading="lazy" unoptimized />
          </button>
        ))}
      </div>
    </div>
  );
}
